
// src/components/builder/BuilderQuizEditor.tsx
import React, { useState, useEffect } from 'react';
import { BuilderComponent, builder } from '@builder.io/react';
import { trackBuilderContentView } from '@/utils/builderAnalytics';

interface BuilderQuizEditorProps {
  modelName?: string;
  className?: string;
}

export const BuilderQuizEditor: React.FC<BuilderQuizEditorProps> = ({ 
  modelName = 'quiz-page',
  className 
}) => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const builderContent = await builder.get(modelName, {
          url: window.location.pathname,
          // Opções válidas para GetContentOptions
          includeRefs: true,
          cachebust: process.env.NODE_ENV === 'development'
        });
        
        if (builderContent) {
          setContent(builderContent);
          // Rastrear visualização do conteúdo
          trackBuilderContentView(builderContent.id, modelName);
        } else {
          setError('Nenhum conteúdo encontrado para este modelo');
        }
      } catch (err) {
        console.error('Erro ao carregar conteúdo do Builder.io:', err);
        setError('Erro ao carregar conteúdo do Builder.io');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [modelName]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-[200px] ${className || ''}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B89B7A]"></div>
        <span className="ml-2 text-[#432818]">Carregando conteúdo...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 bg-red-50 border border-red-200 rounded-lg ${className || ''}`}>
        <p className="text-red-600">{error}</p>
        <p className="text-sm text-red-500 mt-2">
          Verifique se o modelo "{modelName}" existe no Builder.io e se a API key está configurada corretamente.
        </p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className={`p-4 bg-gray-50 border border-gray-200 rounded-lg ${className || ''}`}>
        <p className="text-gray-600">Nenhum conteúdo disponível para exibir.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <BuilderComponent
        model={modelName}
        content={content}
        // Props personalizadas que podem ser usadas nos componentes
        options={{
          includeRefs: true
        }}
      />
    </div>
  );
};

export default BuilderQuizEditor;
