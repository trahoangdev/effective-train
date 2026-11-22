'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Icons from '@/components/icons';
import { cn } from '@/lib/utils';

const pages = [
  { href: '/', label: 'Overview', icon: Icons.Overview },
  { href: '/saved', label: 'Saved ideas', icon: Icons.Bookmark },
  { href: '/history', label: 'Pick history', icon: Icons.History }
] as const;

export function Brand() {
  return (
    <Link
      href='/'
      className='interaction inline-flex w-fit items-center gap-3 rounded-lg text-xl font-semibold tracking-tight hover:text-accent-ink'
    >
      <span className='grid size-9 place-items-center rounded-lg bg-primary text-foreground'>
        <Icons.Lightning size={21} weight='fill' aria-hidden='true' />
      </span>
      Sparkboard
    </Link>
  );
}

export function WorkspaceNav() {
  const pathname = usePathname();

  return (
    <aside className='border-border bg-card lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:border-r'>
      <div className='px-4 pt-4 sm:px-6 lg:py-6'>
        <Brand />
      </div>
      <nav aria-label='Workspace' className='px-4 pb-4 pt-3 sm:px-6 lg:px-4 lg:pt-8'>
        <p className='mb-2 hidden px-3 text-xs font-medium text-muted-foreground lg:block'>
          Workspace
        </p>
        <ul className='grid grid-cols-3 gap-1 lg:grid-cols-1'>
          {pages.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className={cn(
                  'interaction flex min-h-10 items-center justify-center gap-2 rounded-lg px-2 py-2 text-xs font-medium whitespace-nowrap hover:bg-muted sm:text-sm lg:justify-start lg:px-3',
                  pathname === href
                    ? 'bg-amber-wash text-foreground hover:bg-amber-wash'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon
                  aria-hidden='true'
                  size={17}
                  weight={pathname === href ? 'fill' : 'regular'}
                />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className='mt-auto hidden p-4 lg:block'>
        <div className='rounded-xl border border-border bg-background p-3'>
          <div className='mb-1 flex items-center gap-2 text-sm font-medium'>
            <Icons.HardDrives size={16} aria-hidden='true' />
            Stored on this device
          </div>
          <p className='text-xs text-muted-foreground'>
            Your picks and saved ideas stay in this browser.
          </p>
        </div>
      </div>
    </aside>
  );
}

export function WorkspaceHeader() {
  const pathname = usePathname();
  const page = pages.find(({ href }) => href === pathname) ?? pages[0];

  return (
    <header className='hidden min-h-16 items-center justify-between gap-4 border-b border-border bg-card px-8 lg:flex'>
      <div className='flex items-center gap-3 text-sm'>
        <span className='text-muted-foreground'>Workspace</span>
        <span className='text-muted-foreground' aria-hidden='true'>
          /
        </span>
        <span className='font-medium'>{page.label}</span>
      </div>
      <span className='flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground'>
        <span className='size-2 rounded-full bg-green-ink' />
        Local workspace
      </span>
    </header>
  );
}
