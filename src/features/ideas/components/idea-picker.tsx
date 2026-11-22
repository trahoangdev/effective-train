'use client';

import type { ReactNode, SubmitEvent } from 'react';
import * as Icons from '@/components/icons';
import { Button } from '@/components/ui/button';
import { categories, defaultFilters, difficulties, type Filters } from '../model';

function FilterField({
  label,
  value,
  onChange,
  children
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className='min-w-0 space-y-1.5'>
      <span className='block text-xs font-medium text-white'>{label}</span>
      <span className='relative block'>
        <select
          className='h-10 w-full appearance-none rounded-lg border border-panel-border bg-panel py-2 pr-8 pl-3 text-sm text-white scheme-dark outline-none hover:border-panel-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {children}
        </select>
        <Icons.CaretDown
          className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-panel-text'
          size={13}
          aria-hidden='true'
        />
      </span>
    </label>
  );
}

export function IdeaPicker({
  filters,
  setFilters,
  matchCount,
  ready,
  onPick
}: {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  matchCount: number;
  ready: boolean;
  onPick: () => void;
}) {
  const active = Boolean(
    filters.category || filters.difficulty || filters.hours !== null || filters.budget !== null
  );

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (ready && matchCount > 0) onPick();
  }

  return (
    <section
      className='overflow-hidden rounded-2xl bg-ink text-white'
      aria-labelledby='picker-title'
    >
      <div className='relative isolate overflow-hidden px-4 pt-4 pb-3 sm:px-6 sm:pt-6'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute -top-6 -right-6 -z-10 hidden size-48 items-center justify-center rounded-full border border-dashed border-panel-border text-primary sm:flex'
        >
          <div className='relative size-32 rounded-full border border-panel-border'>
            <Icons.DiceFive
              className='absolute top-5 left-4 size-16 rotate-[-18deg]'
              weight='thin'
            />
            <Icons.DiceTwo
              className='absolute right-3 bottom-3 size-12 rotate-12 rounded-xl bg-ink'
              weight='light'
            />
            <Icons.Sparkle className='absolute top-3 right-3 size-5' weight='fill' />
            <Icons.Circle className='absolute bottom-4 left-3 size-2' weight='fill' />
          </div>
        </div>
        <div className='mb-3 flex w-fit items-center gap-2 rounded-full border border-panel-border bg-panel px-3 py-1 text-xs font-medium text-primary sm:mb-4'>
          <Icons.Sparkle size={14} weight='fill' aria-hidden='true' />
          Idea picker
        </div>
        <h2
          id='picker-title'
          className='max-w-sm text-2xl font-semibold tracking-tight sm:pr-12 sm:text-3xl'
        >
          Find your next side project
        </h2>
        <p className='mt-2 max-w-xs text-sm text-panel-text'>
          Set your constraints and get a project you can start building.
        </p>
      </div>
      <form className='px-4 pt-3 pb-4 sm:px-6 sm:pb-6' onSubmit={submit}>
        <div className='grid grid-cols-2 gap-3 sm:gap-4'>
          <FilterField
            label='Category'
            value={filters.category}
            onChange={(value) => setFilters({ ...filters, category: value as Filters['category'] })}
          >
            <option value=''>Any category</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </FilterField>
          <FilterField
            label='Difficulty'
            value={filters.difficulty}
            onChange={(value) =>
              setFilters({ ...filters, difficulty: value as Filters['difficulty'] })
            }
          >
            <option value=''>Any difficulty</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty}>{difficulty}</option>
            ))}
          </FilterField>
          <FilterField
            label='Available time'
            value={filters.hours ?? ''}
            onChange={(value) =>
              setFilters({ ...filters, hours: value === '' ? null : Number(value) })
            }
          >
            <option value=''>Any time</option>
            {[4, 8, 16, 32, 60].map((hours) => (
              <option key={hours} value={hours}>
                Up to {hours} hours
              </option>
            ))}
          </FilterField>
          <FilterField
            label='Budget'
            value={filters.budget ?? ''}
            onChange={(value) =>
              setFilters({ ...filters, budget: value === '' ? null : Number(value) })
            }
          >
            <option value=''>Any budget</option>
            <option value='0'>Free only</option>
            {[25, 50, 100].map((budget) => (
              <option key={budget} value={budget}>
                Up to ${budget}
              </option>
            ))}
          </FilterField>
        </div>
        <div className='mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-panel-border pt-4'>
          <Button
            type='submit'
            disabled={!ready || matchCount === 0}
            className='h-11 gap-2 px-3 text-base font-semibold hover:bg-amber-wash focus-visible:border-primary focus-visible:ring-primary/60'
          >
            <Icons.Shuffle className='size-5' aria-hidden='true' />
            Pick an idea
          </Button>
          <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
            <p className='text-xs font-medium text-panel-text sm:text-sm' role='status'>
              {`${matchCount} ${matchCount === 1 ? 'idea matches' : 'ideas match'}`}
            </p>
            {active && (
              <Button
                type='button'
                variant='ghost'
                className='px-2 text-xs text-panel-text hover:bg-panel hover:text-white focus-visible:border-primary focus-visible:ring-primary/60 sm:text-sm'
                onClick={(event) => {
                  event.currentTarget.form?.querySelector('select')?.focus();
                  setFilters(defaultFilters);
                }}
              >
                Reset filters
              </Button>
            )}
          </div>
        </div>
        {matchCount === 0 && (
          <p
            className='mt-3 rounded-lg border border-panel-border bg-panel p-3 text-sm text-primary'
            role='alert'
          >
            No ideas match these filters. Try a larger time or budget limit, or reset the filters.
          </p>
        )}
      </form>
    </section>
  );
}
