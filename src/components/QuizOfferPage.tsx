// Componente migrado de src/pages_backup/QuizOfferPage.tsx para uso no roteador SPA
'use client';

import React from 'react';
import { QuizOfferHero } from '@/components/quiz-offer/QuizOfferHero';
import { QuizOfferCTA } from '@/components/quiz-offer/QuizOfferCTA';
import { useNavigate } from 'react-router-dom';

export default function QuizOfferPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <QuizOfferHero onStartQuizClick={() => navigate('/')} />
      <QuizOfferCTA />
    </div>
  );
}
