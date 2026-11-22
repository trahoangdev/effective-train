'use client';

import { useState, type Ref } from 'react';
import * as Icons from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { scoreIdea, type Category, type Idea } from '../model';
import { toggleFavorite } from '../workspace-store';

const categoryStyles: Record<Category, { icon: Icons.Icon; color: string }> = {
  'Developer tools': { icon: Icons.Code, color: 'bg-violet-wash text-violet-ink' },
  Productivity: { icon: Icons.Lightning, color: 'bg-amber-wash text-accent-ink' },
  'Creator tools': { icon: Icons.Sparkle, color: 'bg-violet-wash text-violet-ink' },
  'Local business': { icon: Icons.Coins, color: 'bg-green-wash text-green-ink' },
  Learning: { icon: Icons.Lightbulb, color: 'bg-blue-wash text-blue-ink' },
  'Personal life': { icon: Icons.Target, color: 'bg-amber-wash text-accent-ink' },
  Community: { icon: Icons.Stack, color: 'bg-green-wash text-green-ink' }
};

export function CategoryIcon({ category, className }: { category: Category; className?: string }) {
  const { icon: Icon, color } = categoryStyles[category];

  return (
    <span className={cn('grid size-9 shrink-0 place-items-center rounded-lg', color, className)}>
      <Icon className='size-5' aria-hidden='true' />
    </span>
  );
}

function formatBudget([min, max]: Idea['budget']) {
  if (max === 0) return 'Free';
  if (min === max) return `$${max}`;
  return `$${min} to $${max}`;
}

export function IdeaDetail({
  idea,
  headingRef,
  label = 'Idea brief',
  saved,
  ready,
  onFavorite
}: {
  idea: Idea;
  headingRef?: Ref<HTMLHeadingElement>;
  label?: string;
  saved: boolean;
  ready: boolean;
  onFavorite?: () => void;
}) {
  const score = scoreIdea(idea);
  const budget = formatBudget(idea.budget);
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'done' | 'failed'>('idle');

  async function copyBrief() {
    setCopyState('copying');
    try {
      await navigator.clipboard.writeText(
        [
          idea.name,
          idea.category,
          `Problem: ${idea.problem}`,
          `Target user: ${idea.audience}`,
          `MVP scope: ${idea.solution}`,
          `Effort: ${idea.difficulty} · ${idea.hours} hours · ${budget}`,
          `Suggested stack: ${idea.stack.join(', ')}`,
          `Monetization: ${idea.monetization}`,
          `Feasibility: ${score.total}/100`
        ].join('\n')
      );
      setCopyState('done');
    } catch {
      setCopyState('failed');
    }
  }

  return (
    <Card className='idea-reveal gap-0 rounded-2xl border border-border py-0 ring-0'>
      <article aria-labelledby='idea-heading'>
        <header className='flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6'>
          <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
            <Icons.Lightbulb size={18} aria-hidden='true' />
            {label}
          </div>
          <Button
            type='button'
            variant='outline'
            aria-pressed={saved}
            aria-label={saved ? 'Remove from saved ideas' : 'Save idea'}
            disabled={!ready}
            className={cn(
              'h-9 gap-2 px-3',
              saved && 'border-amber-wash bg-amber-wash text-foreground hover:bg-amber-wash'
            )}
            onClick={() => {
              toggleFavorite(idea.id);
              onFavorite?.();
            }}
          >
            <Icons.Bookmark
              weight={saved ? 'fill' : 'regular'}
              className={cn(saved && 'text-accent-ink')}
              aria-hidden='true'
            />
            {saved ? 'Saved' : 'Save'}
          </Button>
        </header>

        <div className='space-y-4 p-4 sm:p-6'>
          <div className='flex items-start gap-3'>
            <CategoryIcon category={idea.category} className='size-12' />
            <div className='min-w-0'>
              <p className='text-xs font-medium text-muted-foreground'>{idea.category}</p>
              <h2
                id='idea-heading'
                ref={headingRef}
                tabIndex={-1}
                className='mt-1 text-2xl font-semibold tracking-tight outline-none sm:text-3xl'
              >
                {idea.name}
              </h2>
            </div>
          </div>

          <p className='text-sm leading-relaxed text-muted-foreground'>{idea.problem}</p>

          <ul className='flex flex-wrap gap-2' aria-label='Effort and cost'>
            <li>
              <Badge variant='secondary' className='h-6 gap-2 px-2'>
                <Icons.TrendUp aria-hidden='true' />
                {idea.difficulty}
              </Badge>
            </li>
            <li>
              <Badge variant='secondary' className='h-6 gap-2 px-2'>
                <Icons.Clock aria-hidden='true' />
                {idea.hours} hours
              </Badge>
            </li>
            <li>
              <Badge variant='secondary' className='h-6 gap-2 px-2'>
                <Icons.Coins aria-hidden='true' />
                {budget}
              </Badge>
            </li>
          </ul>

          <dl className='grid gap-3 border-t border-border pt-4'>
            <div>
              <dt className='font-semibold'>Who it helps</dt>
              <dd className='mt-1 text-muted-foreground'>{idea.audience}</dd>
            </div>
            <div>
              <dt className='font-semibold'>What to build</dt>
              <dd className='mt-1 text-muted-foreground'>{idea.solution}</dd>
            </div>
            <div>
              <dt className='font-semibold'>How it could earn</dt>
              <dd className='mt-1 text-muted-foreground'>{idea.monetization}</dd>
            </div>
            <div>
              <dt className='font-semibold'>Suggested stack</dt>
              <dd className='mt-2 flex flex-wrap gap-2'>
                {idea.stack.map((tech) => (
                  <Badge key={tech} variant='outline' className='h-6 px-2'>
                    {tech}
                  </Badge>
                ))}
              </dd>
            </div>
          </dl>

          <details className='group rounded-xl border border-border bg-background'>
            <summary className='interaction flex min-h-12 list-none items-center gap-2 rounded-xl px-3 py-2 font-medium hover:bg-muted [&::-webkit-details-marker]:hidden'>
              <Icons.Target size={18} className='shrink-0 text-green-ink' aria-hidden='true' />
              <span className='min-w-0 flex-1'>Feasibility score</span>
              <span className='shrink-0 text-sm font-semibold tabular-nums text-green-ink'>
                {score.total}
                <span className='font-normal text-muted-foreground'> / 100</span>
              </span>
              <Icons.CaretDown
                size={14}
                className='shrink-0 text-muted-foreground group-open:rotate-180'
                aria-hidden='true'
              />
            </summary>
            <div className='space-y-3 px-3 pb-3'>
              <p className='text-xs text-muted-foreground'>
                Higher scores mean an easier solo build. Points come from scope, time, estimated
                cost in USD, and integrations.
              </p>
              <dl className='space-y-2'>
                {score.factors.map((factor) => (
                  <div key={factor.name} className='flex justify-between gap-2 text-xs'>
                    <div>
                      <dt className='font-medium'>{factor.name}</dt>
                      <dd className='text-muted-foreground'>{factor.label}</dd>
                    </div>
                    <dd className='shrink-0 tabular-nums'>
                      {factor.points} / {factor.max}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </details>

          <div className='flex flex-wrap items-center gap-2'>
            <Button
              type='button'
              variant='outline'
              className='h-9 px-3'
              disabled={copyState === 'copying'}
              onClick={copyBrief}
            >
              <Icons.Stack aria-hidden='true' />
              {copyState === 'copying' ? 'Copying brief…' : 'Copy brief'}
            </Button>
            <span
              role='status'
              className={cn(
                'text-xs text-muted-foreground',
                copyState === 'failed' && 'text-destructive'
              )}
            >
              {copyState === 'done' && 'Brief copied to your clipboard.'}
              {copyState === 'failed' &&
                'Clipboard access is unavailable. You can select and copy the text here.'}
            </span>
          </div>
        </div>
      </article>
    </Card>
  );
}
