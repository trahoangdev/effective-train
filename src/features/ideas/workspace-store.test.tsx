import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { ideas, starterIdea } from './catalog';
import { IdeaDetail } from './components/idea-detail';
import {
  clearHistory,
  getWorkspaceSnapshot,
  recordPick,
  resetWorkspaceStore,
  retryStorage,
  subscribeWorkspace,
  toggleFavorite
} from './workspace-store';

const STORAGE_KEY = 'sparkboard:workspace:v1';

type StorageListener = (event: StorageEvent) => void;

function createMockWindow() {
  const store = new Map<string, string>();
  const storageListeners = new Set<StorageListener>();

  const localStorage: Storage = {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.get(key) ?? null;
    },
    key(index: number) {
      return [...store.keys()][index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    }
  };

  const mockWindow = {
    localStorage,
    addEventListener(type: string, listener: EventListenerOrEventListenerObject) {
      if (type === 'storage' && typeof listener === 'function') {
        storageListeners.add(listener as StorageListener);
      }
    },
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject) {
      if (type === 'storage' && typeof listener === 'function') {
        storageListeners.delete(listener as StorageListener);
      }
    }
  };

  function dispatchStorage(key: string | null) {
    const event = { key } as StorageEvent;
    storageListeners.forEach((listener) => listener(event));
  }

  return { mockWindow, store, dispatchStorage };
}

describe('workspace store and saved toggle synchronization', () => {
  const originalWindow = globalThis.window;
  let mock: ReturnType<typeof createMockWindow>;

  beforeEach(() => {
    mock = createMockWindow();
    Object.defineProperty(globalThis, 'window', {
      value: mock.mockWindow,
      configurable: true,
      writable: true
    });
    resetWorkspaceStore();
  });

  afterEach(() => {
    resetWorkspaceStore();
    Object.defineProperty(globalThis, 'window', {
      value: originalWindow,
      configurable: true,
      writable: true
    });
  });

  test('persists saved state across a hard reload and exposes unambiguous toggle attributes', () => {
    const unsubscribeInitial = subscribeWorkspace(() => {});
    const initialSnapshot = getWorkspaceSnapshot();
    expect(initialSnapshot.ready).toBe(true);
    expect(initialSnapshot.data.favorites).toEqual([]);

    const unsavedMarkup = renderToStaticMarkup(
      <IdeaDetail
        idea={starterIdea}
        saved={initialSnapshot.data.favorites.includes(starterIdea.id)}
        ready={initialSnapshot.ready}
      />
    );
    expect(unsavedMarkup).toContain('aria-pressed="false"');
    expect(unsavedMarkup).toContain('aria-label="Save idea"');
    expect(unsavedMarkup).toContain('>Save</button>');

    toggleFavorite(starterIdea.id);
    expect(getWorkspaceSnapshot().data.favorites).toEqual([starterIdea.id]);
    expect(JSON.parse(mock.store.get(STORAGE_KEY) ?? '{}')).toEqual({
      favorites: [starterIdea.id],
      history: []
    });

    // Simulate a hard reload: unmount subscribers, reset in-memory store, keep localStorage.
    unsubscribeInitial();
    resetWorkspaceStore();

    const unsubscribeReloaded = subscribeWorkspace(() => {});
    const reloadedSnapshot = getWorkspaceSnapshot();
    expect(reloadedSnapshot.ready).toBe(true);
    expect(reloadedSnapshot.data.favorites).toEqual([starterIdea.id]);

    const savedMarkup = renderToStaticMarkup(
      <IdeaDetail
        idea={starterIdea}
        saved={reloadedSnapshot.data.favorites.includes(starterIdea.id)}
        ready={reloadedSnapshot.ready}
      />
    );
    expect(savedMarkup).toContain('aria-pressed="true"');
    expect(savedMarkup).toContain('aria-label="Remove from saved ideas"');
    expect(savedMarkup).toContain('bg-amber-wash');
    expect(savedMarkup).toContain('>Saved</button>');

    // Removing the idea updates persisted state and resets the button markup.
    toggleFavorite(starterIdea.id);
    const removedSnapshot = getWorkspaceSnapshot();
    expect(removedSnapshot.data.favorites).toEqual([]);

    const afterRemoveMarkup = renderToStaticMarkup(
      <IdeaDetail
        idea={starterIdea}
        saved={removedSnapshot.data.favorites.includes(starterIdea.id)}
        ready={removedSnapshot.ready}
      />
    );
    expect(afterRemoveMarkup).toContain('aria-pressed="false"');
    expect(afterRemoveMarkup).toContain('aria-label="Save idea"');
    expect(afterRemoveMarkup).toContain('>Save</button>');

    unsubscribeReloaded();
  });

  test('synchronizes saved state on cross-tab storage events and resubscribe', () => {
    const target = ideas[1];
    let notifications = 0;
    const unsubscribe = subscribeWorkspace(() => {
      notifications += 1;
    });

    mock.store.set(STORAGE_KEY, JSON.stringify({ favorites: [target.id], history: [] }));
    mock.dispatchStorage(STORAGE_KEY);

    expect(notifications).toBeGreaterThan(0);
    expect(getWorkspaceSnapshot().data.favorites).toEqual([target.id]);

    // Unsubscribe all listeners, change storage while unsubscribed, and resubscribe.
    unsubscribe();
    mock.store.set(
      STORAGE_KEY,
      JSON.stringify({ favorites: [starterIdea.id, target.id], history: [] })
    );
    const resubscribe = subscribeWorkspace(() => {});
    expect(getWorkspaceSnapshot().data.favorites).toEqual([starterIdea.id, target.id]);
    resubscribe();
  });

  test('records history newest-first and preserves saved ideas when clearing history', () => {
    const unsubscribe = subscribeWorkspace(() => {});
    const [first, second] = ideas;

    toggleFavorite(first.id);
    recordPick(first.id);
    recordPick(second.id);

    expect(getWorkspaceSnapshot().data.history.map((entry) => entry.ideaId)).toEqual([
      second.id,
      first.id
    ]);
    expect(getWorkspaceSnapshot().data.favorites).toEqual([first.id]);

    clearHistory();
    expect(getWorkspaceSnapshot().data.history).toEqual([]);
    expect(getWorkspaceSnapshot().data.favorites).toEqual([first.id]);

    unsubscribe();
  });

  test('recovers safely from corrupted storage and resets cleanly on retry', () => {
    mock.store.set(STORAGE_KEY, '{corrupt-json');
    const unsubscribe = subscribeWorkspace(() => {});

    const corruptSnapshot = getWorkspaceSnapshot();
    expect(corruptSnapshot.ready).toBe(true);
    expect(corruptSnapshot.error).toBe('corrupt');
    expect(corruptSnapshot.data).toEqual({ favorites: [], history: [] });

    retryStorage();
    const recoveredSnapshot = getWorkspaceSnapshot();
    expect(recoveredSnapshot.error).toBeNull();
    expect(JSON.parse(mock.store.get(STORAGE_KEY) ?? '{}')).toEqual({
      favorites: [],
      history: []
    });

    unsubscribe();
  });
});
