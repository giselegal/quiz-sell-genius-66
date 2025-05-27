
'use client';

import dynamic from 'next/dynamic';

// Dynamically load the ResultPage component
const ResultPage = dynamic(
  () => import('@/pages/ResultPage'),
  { ssr: false }
);

export default function ResultPageWrapper() {
  return <ResultPage />;
}
