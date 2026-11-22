import Link from 'next/link';
import { ArrowLeft, Lightbulb } from '@/components/icons';
import { Brand } from '@/components/layout/workspace-nav';

export default function NotFound() {
  return (
    <main className='mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-6 p-6'>
      <Brand />
      <div className='space-y-4 rounded-2xl border border-border bg-card p-6 sm:p-8'>
        <Lightbulb size={30} className='text-accent-ink' aria-hidden='true' />
        <h1 className='text-3xl font-semibold tracking-tight'>Page not found</h1>
        <p className='text-muted-foreground'>
          This page may have moved. Head back to your workspace to pick up where you left off.
        </p>
        <Link
          href='/'
          className='interaction inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold hover:bg-amber-wash'
        >
          <ArrowLeft size={17} aria-hidden='true' />
          Back to overview
        </Link>
      </div>
    </main>
  );
}
