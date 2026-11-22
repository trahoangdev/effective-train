'use client';

import { Warning } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { retryStorage, useWorkspace } from '../workspace-store';

export function StorageNotice() {
  const { error } = useWorkspace();

  if (!error) return null;

  const message = {
    unavailable: 'Browser storage is unavailable. Allow site storage and retry.',
    corrupt: 'Sparkboard couldn’t read its stored data and started with an empty workspace.',
    write:
      'Changes are in this tab only. Free up browser storage or allow site storage, then retry.'
  }[error];

  return (
    <div className='mx-auto mt-4 flex max-w-7xl items-start gap-3 px-4 sm:px-6 lg:px-8'>
      <div className='flex w-full flex-wrap items-center gap-3 rounded-xl border border-amber-wash bg-amber-wash p-3'>
        <Warning size={20} className='text-accent-ink' aria-hidden='true' />
        <p role='status' className='min-w-0 flex-1 text-sm'>
          {message}
        </p>
        <Button variant='ghost' className='hover:bg-card' onClick={retryStorage}>
          {error === 'corrupt' ? 'Reset browser data' : 'Retry saving'}
        </Button>
      </div>
    </div>
  );
}
