import Link from 'next/link';
import * as Icons from '@/components/icons';
import { Card } from '@/components/ui/card';
import { ideaById } from '../catalog';
import { CategoryIcon } from './idea-detail';
import type { useWorkspace } from '../workspace-store';

export const pickDate = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit'
});

export function RecentActivity({
  ready,
  history
}: {
  ready: boolean;
  history: ReturnType<typeof useWorkspace>['data']['history'];
}) {
  return (
    <Card className='gap-0 rounded-2xl border border-border py-0 ring-0'>
      <section aria-labelledby='activity-title' aria-busy={!ready}>
        <div className='flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 sm:px-6'>
          <h2 id='activity-title' className='text-base font-semibold'>
            Recent activity
          </h2>
          <Link
            href='/history'
            className='interaction flex min-h-9 items-center gap-2 rounded-lg px-2 font-medium text-muted-foreground hover:bg-muted hover:text-foreground'
          >
            View history <Icons.ArrowRight size={16} aria-hidden='true' />
          </Link>
        </div>
        {!ready ? (
          <div className='p-4 sm:px-6'>
            <div className='h-10 rounded-lg bg-muted' aria-hidden='true' />
            <p className='sr-only'>Loading recent picks</p>
          </div>
        ) : history.length === 0 ? (
          <div className='flex items-center gap-3 p-4 sm:px-6'>
            <span className='grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground'>
              <Icons.History size={20} aria-hidden='true' />
            </span>
            <div>
              <p className='font-medium'>No picks yet</p>
              <p className='text-muted-foreground'>Your latest picks will appear here.</p>
            </div>
          </div>
        ) : (
          <ol className='divide-y divide-border px-4 sm:px-6'>
            {history.slice(0, 3).map((entry, index) => {
              const idea = ideaById.get(entry.ideaId);
              if (!idea) return null;
              return (
                <li
                  key={`${entry.ideaId}-${entry.pickedAt}-${history.length - index}`}
                  className='flex flex-wrap items-center justify-between gap-2 py-3'
                >
                  <div className='flex items-center gap-3'>
                    <CategoryIcon category={idea.category} />
                    <div>
                      <p className='font-medium'>{idea.name}</p>
                      <p className='text-xs text-muted-foreground'>{idea.category}</p>
                    </div>
                  </div>
                  <time
                    className='text-xs text-muted-foreground'
                    dateTime={new Date(entry.pickedAt).toISOString()}
                  >
                    {pickDate.format(entry.pickedAt)}
                  </time>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </Card>
  );
}
