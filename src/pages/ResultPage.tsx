'use client';

import React from 'react';
import QuizResult from '@/components/QuizResult';
import { QuizOfferHero } from '@/components/quiz-offer/QuizOfferHero';
import { QuizOfferCTA } from '@/components/quiz-offer/QuizOfferCTA';
import { useNavigate } from 'react-router-dom';

export default function ResultPage() {
  const navigate = useNavigate();

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
      ],
      category: 'estilo_principal', // Adicionado
      score: 100, // Adicionado
      percentage: 100 // Adicionado
    },
    secondaryStyles: [] // Adicionado secondaryStyles como um array vazio
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <QuizResult {...mockResult} />
      
      <div className="mt-8">
        <QuizOfferHero onStartQuizClick={() => navigate('/')} />
        <QuizOfferCTA />
      </div>
    </div>
  );
}
