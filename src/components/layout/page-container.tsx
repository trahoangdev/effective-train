import type { ReactNode, Ref } from 'react';

export default function PageContainer({
  children,
  pageTitle,
  pageDescription,
  pageTitleRef,
  pageHeaderAction
}: {
  children: ReactNode;
  pageTitle: string;
  pageDescription: string;
  pageTitleRef?: Ref<HTMLHeadingElement>;
  pageHeaderAction?: ReactNode;
}) {
  return (
    <div className='mx-auto w-full max-w-7xl p-4 sm:p-6 lg:px-8'>
      <div className='mb-4 flex flex-wrap items-end justify-between gap-3 sm:mb-6'>
        <div className='space-y-2'>
          <h1
            ref={pageTitleRef}
            tabIndex={pageTitleRef ? -1 : undefined}
            className='text-3xl font-semibold tracking-tight outline-none sm:text-4xl'
          >
            {pageTitle}
          </h1>
          <p className='text-sm text-muted-foreground sm:text-base'>{pageDescription}</p>
        </div>
        {pageHeaderAction}
      </div>
      {children}
    </div>
  );
}
