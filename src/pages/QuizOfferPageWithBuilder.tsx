// src/pages/QuizOfferPageWithBuilder.tsx
import React from 'react';
import { useBuilderContent } from '@/hooks/useBuilderContent';
import { BuilderComponent } from '@builder.io/react';
import BuilderQuizOfferPage from '@/components/builder/BuilderQuizOfferPage';
import QuizOfferPage from '@/components/QuizOfferPage';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const QuizOfferPageWithBuilder: React.FC = () => {
  const { 
    content, 
    loading, 
    error, 
    isBuilderVersion 
  } = useBuilderContent({
    model: 'quiz-offer-page',
    enableAbTesting: true,
    fallbackToOriginal: true,
    userAttributes: {
      // Adicionar atributos do usuário para segmentação A/B
      urlPath: window.location.pathname,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    }
  });

  // Mostrar loading apenas se estiver carregando e não há fallback
  if (loading && !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF9F7] via-[#F5F2EE] to-[#F0EBE5]">
        <LoadingSpinner />
      </div>
    );
  }

  // Se há erro e não tem conteúdo, mostrar página original
  if (error && !content) {
    console.warn('Builder.io erro, usando página original:', error);
    return <QuizOfferPage />;
  }

  // Se há conteúdo do Builder.io, usar versão editável
  if (content && isBuilderVersion) {
    return (
      <div className="builder-quiz-offer-wrapper">
        <BuilderComponent 
          model="quiz-offer-page"
          content={content}
          data={{
            pageType: 'quiz-offer',
            version: 'builder',
            timestamp: new Date().toISOString()
          }}
        />
      </div>
    );
  }

  // Fallback para página original
  return <QuizOfferPage />;
};

export default QuizOfferPageWithBuilder;
