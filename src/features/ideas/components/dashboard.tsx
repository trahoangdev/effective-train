'use client';

import { useRef, useState } from 'react';
import * as Icons from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ideaById, ideas, starterIdea } from '../catalog';
import { categories, defaultFilters, filterIdeas, pickIdea, type Filters } from '../model';
import { recordPick, useWorkspace } from '../workspace-store';
import { RecentActivity } from './activity';
import { IdeaDetail } from './idea-detail';
import { IdeaPicker } from './idea-picker';

const weekendCount = filterIdeas(ideas, { ...defaultFilters, hours: 8 }).length;

function Metric({
  title,
  value,
  description,
  icon: Icon,
  color
}: {
  title: string;
  value: number | null;
  description: string;
  icon: Icons.Icon;
  color: string;
}) {
  return (
    <Card className='gap-2 rounded-xl border border-border px-3 py-2 ring-0 sm:p-4'>
      <dt className='flex min-w-0 items-center justify-between gap-1 text-xs font-medium text-muted-foreground sm:text-sm'>
        {title}
        <span className={cn('grid size-6 shrink-0 place-items-center rounded-lg sm:size-8', color)}>
          <Icon size={18} aria-hidden='true' />
        </span>
      </dt>
      <dd className='text-xl font-semibold tracking-tight tabular-nums sm:text-3xl'>
        {value === null ? (
          <>
            <span
              className='inline-block h-5 w-8 rounded-md bg-muted align-middle'
              aria-hidden='true'
            />
            <span className='sr-only'>Loading</span>
          </>
        ) : (
          value
        )}
      </dd>
      <dd className='hidden text-xs text-muted-foreground sm:block'>{description}</dd>
    </Card>
  );
}

export function Dashboard() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const { data, ready } = useWorkspace();
  const [announcement, setAnnouncement] = useState('');
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const matches = filterIdeas(ideas, filters);
  const latestPick = data.history[0];
  const selected = ideaById.get(latestPick?.ideaId ?? '') ?? starterIdea;

  function generate() {
    const next = pickIdea(matches, selected.id);
    if (!next) return;
    recordPick(next.id);
    setAnnouncement(`${next.name} picked. The idea brief is ready.`);
  }

  return (
    <PageContainer
      pageTitle='Overview'
      pageDescription='Find a side project that fits the time and budget you have.'
    >
      <dl className='mb-4 grid grid-cols-2 gap-2 sm:mb-6 sm:grid-cols-4 sm:gap-4'>
        <Metric
          title='Ideas in library'
          value={ideas.length}
          description={`Across ${categories.length} categories`}
          icon={Icons.Lightbulb}
          color='bg-amber-wash text-accent-ink'
        />
        <Metric
          title='Weekend builds'
          value={weekendCount}
          description='8 hours or less'
          icon={Icons.Clock}
          color='bg-green-wash text-green-ink'
        />
        <Metric
          title='Ideas picked'
          value={ready ? data.history.length : null}
          description='From your pick history'
          icon={Icons.Shuffle}
          color='bg-blue-wash text-blue-ink'
        />
        <Metric
          title='Ideas saved'
          value={ready ? data.favorites.length : null}
          description='In your shortlist'
          icon={Icons.Bookmark}
          color='bg-violet-wash text-violet-ink'
        />
      </dl>

      <div className='grid items-start gap-4 sm:gap-6 xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] xl:grid-rows-[auto_1fr]'>
        <div>
          <IdeaPicker
            filters={filters}
            setFilters={setFilters}
            matchCount={matches.length}
            ready={ready}
            onPick={generate}
          />
          {latestPick && (
            <button
              type='button'
              className='interaction mt-2 flex min-h-10 w-full items-center justify-between gap-2 rounded-lg border border-border bg-card px-3 py-2 text-left text-sm font-medium hover:bg-muted xl:sr-only xl:focus:not-sr-only'
              onClick={() => resultHeading.current?.focus()}
            >
              View pick: {selected.name}{' '}
              <Icons.ArrowDownRight size={16} className='shrink-0' aria-hidden='true' />
            </button>
          )}
          <p className='sr-only' role='status' aria-live='polite' aria-atomic='true'>
            {announcement}
          </p>
        </div>
        <div className='min-w-0 xl:col-start-2 xl:row-span-2 xl:row-start-1'>
          <IdeaDetail
            key={selected.id}
            headingRef={resultHeading}
            idea={selected}
            label={latestPick ? 'Current idea' : 'Starter idea'}
            saved={data.favorites.includes(selected.id)}
            ready={ready}
          />
        </div>
        <div className='min-w-0'>
          <RecentActivity ready={ready} history={data.history} />
        </div>
      </div>
    </PageContainer>
  );
}
