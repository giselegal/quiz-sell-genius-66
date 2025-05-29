'use client';

import React from 'react';
import { QuizOfferHero } from '@/components/quiz-offer/QuizOfferHero';
import { QuizOfferCTA } from '@/components/quiz-offer/QuizOfferCTA';
import { useUniversalNavigation } from '@/hooks/useUniversalNavigation';

export default function QuizOfferPage() {
  const { navigate } = useUniversalNavigation();

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <QuizOfferHero onStartQuizClick={() => navigate('/')} />
      <QuizOfferCTA />
    </div>
  );
}

// Esta página está disponível em /quiz-descubra-seu-estilo
