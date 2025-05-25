'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const QuizFlow = dynamic(
  () => import('@/components/QuizFlow'),
  { ssr: false }
);

export default function HomePage() {
  return <QuizFlow />;
}
