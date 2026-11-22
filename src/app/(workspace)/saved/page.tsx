import type { Metadata } from 'next';
import { IdeaCollection } from '@/features/ideas/components/idea-collection';

export const metadata: Metadata = {
  title: 'Saved ideas',
  description: 'Review the side project ideas saved to your Sparkboard shortlist.'
};

export default function SavedIdeasPage() {
  return <IdeaCollection kind='saved' />;
}
