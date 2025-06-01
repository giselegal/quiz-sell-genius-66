// src/components/builder/BuilderQuizOfferPage.tsx
import React from 'react';
import { BuilderComponent, builder } from '@builder.io/react';
import QuizOfferPage from '@/components/QuizOfferPage';

interface BuilderQuizOfferPageProps {
  model?: string;
  content?: any;
  fallback?: React.ReactNode;
}

const BuilderQuizOfferPage: React.FC<BuilderQuizOfferPageProps> = ({ 
  model = 'quiz-offer-page', 
  content,
  fallback 
}) => {
  // Se não há content do Builder.io, mostra a página original
  if (!content) {
    return fallback || <QuizOfferPage />;
  }

  return (
    <div className="builder-quiz-offer-page">
      <BuilderComponent 
        model={model} 
        content={content}
        data={{
          // Dados que podem ser usados no Builder.io
          pageType: 'quiz-offer',
          timestamp: new Date().toISOString()
        }}
      />
    </div>
  );
};

export default BuilderQuizOfferPage;
