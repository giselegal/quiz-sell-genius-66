
import React from 'react';
import { UnifiedEditorLayout } from '@/components/editor/UnifiedEditorLayout';
import { StyleResult } from '@/types/quiz';

const UnifiedEditorPage: React.FC = () => {
  // Obter estilo primário do localStorage ou usar padrão
  const getDefaultPrimaryStyle = (): StyleResult => {
    try {
      const savedResult = localStorage.getItem('quiz_result');
      if (savedResult) {
        const parsedResult = JSON.parse(savedResult);
        if (parsedResult?.primaryStyle) {
          return parsedResult.primaryStyle;
        }
      }
    } catch (error) {
      console.error('Erro ao carregar resultado do quiz:', error);
    }
    
    // Estilo padrão para desenvolvimento
    return {
      category: 'Elegante',
      score: 15,
      percentage: 50
    };
  };

  const primaryStyle = getDefaultPrimaryStyle();
  
  return (
    <div className="unified-editor-page h-screen overflow-hidden">
      <div className="h-full bg-gray-50">
        <UnifiedEditorLayout primaryStyle={primaryStyle} />
      </div>
    </div>
  );
};

export default UnifiedEditorPage;
