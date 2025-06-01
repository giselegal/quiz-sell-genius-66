// src/components/builder/BuilderResultPage.tsx
import React from 'react';
import { BuilderComponent, builder } from '@builder.io/react';
import ResultPage from '@/pages/ResultPage';

interface BuilderResultPageProps {
  model?: string;
  content?: any;
  fallback?: React.ReactNode;
}

const BuilderResultPage: React.FC<BuilderResultPageProps> = ({ 
  model = 'resultado-page', 
  content,
  fallback 
}) => {
  // Se não há content do Builder.io, mostra a página original
  if (!content) {
    return fallback || <ResultPage />;
  }

  return (
    <div className="builder-result-page">
      <BuilderComponent 
        model={model} 
        content={content}
        data={{
          // Dados que podem ser usados no Builder.io
          pageType: 'result',
          timestamp: new Date().toISOString()
        }}
      />
    </div>
  );
};

export default BuilderResultPage;
