'use client';

import React from 'react';
import QuizResult from '@/components/QuizResult';
import { QuizOfferHero } from '@/components/quiz-offer/QuizOfferHero';
import { QuizOfferCTA } from '@/components/quiz-offer/QuizOfferCTA';
import { useRouter } from 'next/navigation';

export default function ResultPage() {
  const router = useRouter();

  // Mock result data - em app real viria do quiz state
  const mockResult = {
    primaryStyle: {
      category: 'elegante',
      name: 'Elegante',
      score: 10,
      percentage: 80,
      colorPalette: ['#fff', '#000'],
      attributes: ['Preferência por peças clássicas', 'Cores neutras e elegantes']
    },
    secondaryStyles: [
      {
        category: 'casual',
        name: 'Casual',
        score: 7,
        percentage: 20,
        colorPalette: ['#ccc', '#333'],
        attributes: ['Conforto', 'Praticidade']
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <QuizResult {...mockResult} />
      
      <div className="mt-8">
        <QuizOfferHero onStartQuizClick={() => router.push('/')} />
        <QuizOfferCTA />
      </div>
    </div>
  );
}

// Esta página está disponível em /resultado
