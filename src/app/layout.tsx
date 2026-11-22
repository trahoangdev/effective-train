import '@fontsource-variable/geist';
import '@/styles/globals.css';
import type { Metadata } from 'next';

const description =
  'Pick a buildable side project by category, difficulty, time, and budget. Save your favorites on this device.';

export const metadata: Metadata = {
  title: { default: 'Sparkboard | Side project ideas', template: '%s | Sparkboard' },
  description,
  applicationName: 'Sparkboard',
  openGraph: {
    title: 'Sparkboard',
    description,
    type: 'website',
    siteName: 'Sparkboard'
  },
  twitter: { card: 'summary', title: 'Sparkboard', description }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
