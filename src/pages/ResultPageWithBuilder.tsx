// src/pages/ResultPageWithBuilder.tsx
import React from 'react';
import { useBuilderContent } from '@/hooks/useBuilderContent';
import { BuilderComponent } from '@builder.io/react';
import BuilderResultPage from '@/components/builder/BuilderResultPage';
import ResultPage from '@/pages/ResultPage';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const ResultPageWithBuilder: React.FC = () => {
  const { 
    content, 
    loading, 
    error, 
    isBuilderVersion 
  } = useBuilderContent({
    model: 'resultado-page',
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
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf7]">
        <LoadingSpinner />
      </div>
    );
  }

  // Se há erro e não tem conteúdo, mostrar página original
  if (error && !content) {
    console.warn('Builder.io erro, usando página original:', error);
    return <ResultPage />;
  }

  // Se há conteúdo do Builder.io, usar versão editável
  if (content && isBuilderVersion) {
    return (
      <div className="builder-result-wrapper">
        <BuilderComponent 
          model="resultado-page"
          content={content}
          data={{
            pageType: 'result',
            version: 'builder',
            timestamp: new Date().toISOString()
          }}
        />
      </div>
    );
  }

  // Fallback para página original
  return <ResultPage />;
};

export default ResultPageWithBuilder;
