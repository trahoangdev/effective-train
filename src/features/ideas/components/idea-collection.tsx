'use client';

import Link from 'next/link';
import { useRef, useState, type RefObject } from 'react';
import * as Icons from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ideaById } from '../catalog';
import type { Idea } from '../model';
import { clearHistory, useWorkspace } from '../workspace-store';
import { pickDate } from './activity';
import { CategoryIcon, IdeaDetail } from './idea-detail';

type CollectionKind = 'saved' | 'history';
type Item = { key: string; idea: Idea; pickedAt?: number };

const copy = {
  saved: {
    title: 'Saved ideas',
    description: 'Keep the projects you want to come back to in one place.',
    emptyTitle: 'No saved ideas yet',
    emptyDescription: 'Save an idea from its brief to add it to your shortlist.',
    icon: Icons.Bookmark
  },
  history: {
    title: 'Pick history',
    description: 'Revisit the projects you’ve picked in this browser.',
    emptyTitle: 'No picks in your history',
    emptyDescription: 'Pick an idea on the overview to start your history.',
    icon: Icons.History
  }
};

function ClearHistory({
  disabled,
  pageHeading
}: {
  disabled: boolean;
  pageHeading: RefObject<HTMLHeadingElement | null>;
}) {
  const [open, setOpen] = useState(false);
  const cancelButton = useRef<HTMLButtonElement>(null);
  const cleared = useRef(false);

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) cleared.current = false;
        setOpen(nextOpen);
      }}
    >
      <AlertDialogTrigger
        render={
          <Button type='button' variant='outline' disabled={disabled} className='h-10 gap-2 px-3'>
            <Icons.Trash aria-hidden='true' />
            Clear history
          </Button>
        }
      />
      <AlertDialogContent
        initialFocus={cancelButton}
        finalFocus={() => (cleared.current ? pageHeading.current : true)}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Clear your pick history?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes every pick from this browser and resets your pick count. Your saved ideas
            stay available.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel ref={cancelButton} className='h-10 px-3'>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            type='button'
            variant='destructive'
            className='h-10 px-3'
            onClick={() => {
              cleared.current = true;
              clearHistory();
              setOpen(false);
            }}
          >
            Clear history
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function IdeaCollection({ kind }: { kind: CollectionKind }) {
  const { data, ready } = useWorkspace();
  const [selectedKey, setSelectedKey] = useState<string>();
  const pageHeading = useRef<HTMLHeadingElement>(null);
  const detailHeading = useRef<HTMLHeadingElement>(null);
  const page = copy[kind];

  const items: Item[] =
    kind === 'saved'
      ? data.favorites.flatMap((id) => {
          const idea = ideaById.get(id);
          return idea ? [{ key: id, idea }] : [];
        })
      : data.history.flatMap(({ ideaId, pickedAt }, index) => {
          const idea = ideaById.get(ideaId);
          return idea
            ? [{ key: `${ideaId}-${pickedAt}-${data.history.length - index}`, idea, pickedAt }]
            : [];
        });
  const selected = items.find((item) => item.key === selectedKey) ?? items[0];

  return (
    <PageContainer
      pageTitle={page.title}
      pageDescription={page.description}
      pageTitleRef={pageHeading}
      pageHeaderAction={
        kind === 'history' && (
          <ClearHistory disabled={!ready || items.length === 0} pageHeading={pageHeading} />
        )
      }
    >
      <div aria-busy={!ready}>
        {!ready ? (
          <Card className='gap-3 border border-border p-4 ring-0 sm:p-6'>
            <p className='sr-only'>Loading {page.title.toLowerCase()}</p>
            <span className='h-8 w-32 rounded-lg bg-muted' aria-hidden='true' />
            <span className='h-12 rounded-lg bg-muted' aria-hidden='true' />
            <span className='h-12 rounded-lg bg-muted' aria-hidden='true' />
          </Card>
        ) : !selected ? (
          <Card className='items-start gap-3 rounded-2xl border border-border p-6 ring-0 sm:p-8'>
            <span className='grid size-12 place-items-center rounded-xl bg-amber-wash text-accent-ink'>
              <page.icon size={24} aria-hidden='true' />
            </span>
            <h2 className='text-xl font-semibold'>{page.emptyTitle}</h2>
            <p className='text-muted-foreground'>{page.emptyDescription}</p>
            <Link
              href='/'
              className='interaction mt-2 flex min-h-11 w-fit items-center gap-2 rounded-lg bg-primary px-3 py-2 text-base font-semibold hover:bg-amber-wash'
            >
              Go to the idea picker <Icons.ArrowRight size={18} aria-hidden='true' />
            </Link>
          </Card>
        ) : (
          <div className='grid items-start gap-4 sm:gap-6 xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]'>
            <Card className='gap-0 rounded-2xl border border-border py-0 ring-0'>
              <div className='border-b border-border px-4 py-3 sm:px-6'>
                <h2 className='text-base font-semibold'>
                  {items.length}{' '}
                  {kind === 'saved'
                    ? items.length === 1
                      ? 'saved idea'
                      : 'saved ideas'
                    : items.length === 1
                      ? 'pick'
                      : 'picks'}
                </h2>
              </div>
              <ul className='divide-y divide-border px-2 py-2 sm:px-3'>
                {items.map((item) => (
                  <li key={item.key} className='py-1'>
                    <button
                      type='button'
                      aria-pressed={selected.key === item.key}
                      className={cn(
                        'interaction flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-muted sm:px-3',
                        selected.key === item.key && 'bg-background'
                      )}
                      onClick={() => {
                        setSelectedKey(item.key);
                        requestAnimationFrame(() => detailHeading.current?.focus());
                      }}
                    >
                      <CategoryIcon category={item.idea.category} />
                      <span className='min-w-0 flex-1'>
                        <span className='block font-medium'>{item.idea.name}</span>
                        <span className='block text-xs text-muted-foreground'>
                          {item.idea.category}
                        </span>
                        {item.pickedAt !== undefined && (
                          <time
                            className='block text-xs text-muted-foreground'
                            dateTime={new Date(item.pickedAt).toISOString()}
                          >
                            {pickDate.format(item.pickedAt)}
                          </time>
                        )}
                      </span>
                      <Icons.ArrowRight
                        size={17}
                        className='shrink-0 text-muted-foreground'
                        aria-hidden='true'
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
            <IdeaDetail
              key={selected.key}
              idea={selected.idea}
              headingRef={detailHeading}
              saved={data.favorites.includes(selected.idea.id)}
              ready={ready}
              onFavorite={
                kind === 'saved'
                  ? () => requestAnimationFrame(() => pageHeading.current?.focus())
                  : undefined
              }
            />
          </div>
        )}
      </div>
    </PageContainer>
  );
}
