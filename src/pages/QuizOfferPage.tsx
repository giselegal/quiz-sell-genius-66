
'use client';

import React from 'react';
import { QuizOfferHero } from '@/components/quiz-offer/QuizOfferHero';
import { QuizOfferCTA } from '@/components/quiz-offer/QuizOfferCTA';
import { useRouter } from 'next/navigation';

export default function QuizOfferPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <QuizOfferHero onStartQuizClick={() => router.push('/')} />
      <QuizOfferCTA />
    </div>
  );
}
