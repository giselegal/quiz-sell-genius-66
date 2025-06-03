
'use client';

import React from 'react';
import QuizOfferHero from '@/components/quiz-offer/QuizOfferHero';
import QuizOfferCTA from '@/components/quiz-offer/QuizOfferCTA';
import { useUniversalNavigation } from '../hooks/useUniversalNavigation';

export default function QuizOfferPage() {
  const { navigate } = useUniversalNavigation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F7] via-[#F5F2EE] to-[#F0EBE5]">
      {/* Removido o cabeçalho fixo */}
      <QuizOfferHero onStartQuiz={() => navigate('/')} />
      <QuizOfferCTA onStartQuiz={() => navigate('/')} />
    </div>
  );
}
