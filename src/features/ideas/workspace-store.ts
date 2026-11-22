'use client';

import { useSyncExternalStore } from 'react';
import { ideaById } from './catalog';

const storageKey = 'sparkboard:workspace:v1';

type Pick = { ideaId: string; pickedAt: number };
type Workspace = { favorites: string[]; history: Pick[] };
type Snapshot = {
  data: Workspace;
  ready: boolean;
  error: 'unavailable' | 'corrupt' | 'write' | null;
};

const empty: Workspace = { favorites: [], history: [] };
const serverSnapshot: Snapshot = { data: empty, ready: false, error: null };
let snapshot = serverSnapshot;
const listeners = new Set<() => void>();

function sameWorkspace(a: Workspace, b: Workspace) {
  return (
    a.favorites.length === b.favorites.length &&
    a.favorites.every((id, index) => id === b.favorites[index]) &&
    a.history.length === b.history.length &&
    a.history.every(
      (pick, index) =>
        pick.ideaId === b.history[index]?.ideaId && pick.pickedAt === b.history[index]?.pickedAt
    )
  );
}

function sameSnapshot(a: Snapshot, b: Snapshot) {
  return a.ready === b.ready && a.error === b.error && sameWorkspace(a.data, b.data);
}

function publish(next: Snapshot) {
  if (sameSnapshot(snapshot, next)) return;
  snapshot = next;
  listeners.forEach((listener) => listener());
}

function isKnownIdeaId(value: unknown): value is string {
  return typeof value === 'string' && ideaById.has(value);
}

function isPick(value: unknown): value is Pick {
  return (
    typeof value === 'object' &&
    value !== null &&
    'ideaId' in value &&
    isKnownIdeaId(value.ideaId) &&
    'pickedAt' in value &&
    typeof value.pickedAt === 'number' &&
    value.pickedAt >= 0 &&
    value.pickedAt <= 8.64e15
  );
}

function refresh() {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(storageKey);
  } catch {
    publish({ ...snapshot, ready: true, error: 'unavailable' });
    return;
  }

  try {
    const parsed: unknown = raw === null ? empty : JSON.parse(raw);
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('favorites' in parsed) ||
      !Array.isArray(parsed.favorites) ||
      !('history' in parsed) ||
      !Array.isArray(parsed.history)
    ) {
      throw new Error('Invalid Sparkboard workspace');
    }

    publish({
      data: {
        favorites: [...new Set(parsed.favorites.filter(isKnownIdeaId))],
        history: parsed.history.filter(isPick)
      },
      ready: true,
      error: null
    });
  } catch {
    publish({ data: empty, ready: true, error: 'corrupt' });
  }
}

function onStorage(event: StorageEvent) {
  if (event.key === storageKey || event.key === null) refresh();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    window.addEventListener('storage', onStorage);
    if (snapshot.error !== 'write') refresh();
  }

  return () => {
    listeners.delete(listener);
    if (!listeners.size) window.removeEventListener('storage', onStorage);
  };
}

function update(change: (data: Workspace) => Workspace) {
  // Read any newer changes from another tab before writing. Keep in-memory edits
  // from a failed write so a later successful write can persist them.
  if (snapshot.error !== 'write') refresh();
  const data = change(snapshot.data);

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(data));
    publish({ data, ready: true, error: null });
  } catch {
    publish({ data, ready: true, error: 'write' });
  }
}

export function useWorkspace() {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => serverSnapshot
  );
}

export function recordPick(ideaId: string) {
  const pickedAt = Date.now();
  update((data) => ({ ...data, history: [{ ideaId, pickedAt }, ...data.history] }));
}

export function toggleFavorite(ideaId: string) {
  update((data) => ({
    ...data,
    favorites: data.favorites.includes(ideaId)
      ? data.favorites.filter((id) => id !== ideaId)
      : [ideaId, ...data.favorites]
  }));
}

export function clearHistory() {
  update((data) => ({ ...data, history: [] }));
}

export function retryStorage() {
  update((data) => data);
}

export function getWorkspaceSnapshot() {
  return snapshot;
}

export function subscribeWorkspace(listener: () => void) {
  return subscribe(listener);
}

export function resetWorkspaceStore() {
  if (listeners.size && typeof window !== 'undefined') {
    window.removeEventListener('storage', onStorage);
  }
  listeners.clear();
  snapshot = serverSnapshot;
}
