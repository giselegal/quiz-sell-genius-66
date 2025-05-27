
'use client';

import React from 'react';
import QuizResult from '@/components/QuizResult';
import { QuizOfferHero } from '@/components/quiz-offer/QuizOfferHero';
import { QuizOfferCTA } from '@/components/quiz-offer/QuizOfferCTA';
import { useRouter } from 'next/navigation';

export default function ResultPage() {
  const router = useRouter();

  // Mock result data - in real app this would come from quiz state
  const mockResult = {
    primaryStyle: {
      id: 'elegante',
      name: 'Elegante',
      description: 'Seu estilo é sofisticado e atemporal.',
      characteristics: [
        'Preferência por peças clássicas',
        'Cores neutras e elegantes',
        'Qualidade sobre quantidade'
      ],
      recommendations: [
        'Invista em peças básicas de qualidade',
        'Prefira cortes clássicos',
        'Mantenha um guarda-roupa atemporal'
      ]
    }
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
