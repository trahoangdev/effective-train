import { WorkspaceHeader, WorkspaceNav } from '@/components/layout/workspace-nav';
import { StorageNotice } from '@/features/ideas/components/storage-notice';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-dvh lg:grid lg:grid-cols-[14rem_minmax(0,1fr)]'>
      <a
        href='#main-content'
        className='sr-only rounded-lg bg-card px-3 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50'
      >
        Skip to content
      </a>
      <WorkspaceNav />
      <div className='min-w-0 border-t border-border lg:border-t-0'>
        <WorkspaceHeader />
        <main id='main-content' tabIndex={-1} className='outline-none'>
          <StorageNotice />
          {children}
        </main>
      </div>
    </div>
  );
}
