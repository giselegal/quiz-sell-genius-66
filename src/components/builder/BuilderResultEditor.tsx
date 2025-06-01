// src/components/builder/BuilderResultEditor.tsx
import React, { useState, useEffect } from 'react';
import { BuilderComponent, builder } from '@builder.io/react';
import { QuizResult } from '@/types/quiz';
import { trackBuilderContentView } from '@/utils/builderAnalytics';

interface BuilderResultEditorProps {
  quizResult?: QuizResult | null;
  modelName?: string;
  className?: string;
}

export const BuilderResultEditor: React.FC<BuilderResultEditorProps> = ({ 
  quizResult,
  modelName = 'result-page',
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
        
        // Definir dados dinâmicos que serão injetados no conteúdo
        const dynamicData = {
          quizResult,
          primaryStyle: quizResult?.primaryStyle?.category || 'Não definido',
          primaryPercentage: quizResult?.primaryStyle?.percentage || 0,
          secondaryStyles: quizResult?.secondaryStyles || [],
          userName: quizResult?.userName || localStorage.getItem('userName') || 'Usuário',
          timestamp: new Date().toISOString()
        };
        
        const builderContent = await builder.get(modelName, {
          url: window.location.pathname,
          // Incluir dados do resultado do quiz no contexto
          userAttributes: dynamicData,
          includeRefs: true,
          cachebust: process.env.NODE_ENV === 'development'
        });
        
        if (builderContent) {
          setContent(builderContent);
          // Rastrear visualização do resultado
          trackBuilderContentView(builderContent.id, modelName);
        } else {
          setError('Nenhum template de resultado encontrado');
        }
      } catch (err) {
        console.error('Erro ao carregar template de resultado:', err);
        setError('Erro ao carregar template de resultado do Builder.io');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [modelName, quizResult]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-[300px] ${className || ''}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B89B7A]"></div>
        <span className="ml-2 text-[#432818]">Carregando resultado...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 bg-red-50 border border-red-200 rounded-lg ${className || ''}`}>
        <h3 className="text-lg font-semibold text-red-800 mb-2">Erro ao carregar resultado</h3>
        <p className="text-red-600">{error}</p>
        <div className="mt-4 p-4 bg-red-100 rounded">
          <p className="text-sm text-red-700">
            <strong>Solução:</strong> Verifique se:
          </p>
          <ul className="text-sm text-red-700 mt-2 list-disc list-inside">
            <li>O modelo "{modelName}" existe no Builder.io</li>
            <li>A API key está configurada corretamente</li>
            <li>Há conexão com a internet</li>
          </ul>
        </div>
      </div>
    );
  }

  if (!content) {
    // Fallback para quando não há conteúdo no Builder.io
    return (
      <div className={`p-6 bg-gray-50 border border-gray-200 rounded-lg ${className || ''}`}>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resultado do Quiz</h3>
        {quizResult ? (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-[#432818]">Seu Estilo Predominante:</h4>
              <p className="text-xl font-bold text-[#B89B7A]">
                {quizResult.primaryStyle?.category} ({quizResult.primaryStyle?.percentage}%)
              </p>
            </div>
            {quizResult.secondaryStyles && quizResult.secondaryStyles.length > 0 && (
              <div>
                <h4 className="font-medium text-[#432818] mb-2">Estilos Complementares:</h4>
                <div className="space-y-1">
                  {quizResult.secondaryStyles.map((style, index) => (
                    <p key={index} className="text-[#432818]">
                      {style.category}: {style.percentage}%
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-600">Nenhum resultado de quiz disponível.</p>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <BuilderComponent
        model={modelName}
        content={content}
        // Injetar dados do quiz result nos componentes
        data={{
          quizResult,
          primaryStyle: quizResult?.primaryStyle?.category || 'Não definido',
          primaryPercentage: quizResult?.primaryStyle?.percentage || 0,
          secondaryStyles: quizResult?.secondaryStyles || [],
          userName: quizResult?.userName || localStorage.getItem('userName') || 'Usuário'
        }}
        options={{
          includeRefs: true
        }}
      />
    </div>
  );
};

export default BuilderResultEditor;
