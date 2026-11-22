import type { Metadata } from 'next';
import { IdeaCollection } from '@/features/ideas/components/idea-collection';

export const metadata: Metadata = {
  title: 'Pick history',
  description: 'Revisit the side projects picked in your Sparkboard workspace.'
};

export default function HistoryPage() {
  return <IdeaCollection kind='history' />;
}
