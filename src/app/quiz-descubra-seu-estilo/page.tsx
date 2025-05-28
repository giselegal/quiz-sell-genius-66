
'use client';

import dynamic from 'next/dynamic';

// Dynamically load the QuizOfferPage component
const QuizOfferPage = dynamic(
  () => import('@/pages/QuizOfferPage'),
  { ssr: false }
);

export default function QuizOfferPageWrapper() {
  return <QuizOfferPage />;
}
