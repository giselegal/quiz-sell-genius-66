'use client';

import ResultPageWrapper from '@/components/ResultPageWrapper';

export default function ResultRoute({ params }: { params: { id: string } }) {
  return <ResultPageWrapper id={params.id} />;
}