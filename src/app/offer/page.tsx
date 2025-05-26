"use client";
// filepath: src/app/offer/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Dynamically load the legacy QuizOfferPage component
const QuizOfferPage = dynamic(
  () => import('@/pages/QuizOfferPage'),
  { ssr: false }
);

export default function OfferPageWrapper() {
  const router = useRouter();

  useEffect(() => {
    // Optional: perform any route guards or analytics
  }, []);

  return <QuizOfferPage />;
}
