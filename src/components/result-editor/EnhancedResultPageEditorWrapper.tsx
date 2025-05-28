
"use client";
import React, { useState, useEffect } from 'react';
import { EnhancedResultPageEditor } from './EnhancedResultPageEditor';
import { StyleResult } from '@/types/quiz';
import { QuizFunnel } from '@/types/quizResult';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface EnhancedResultPageEditorWrapperProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  initialFunnel?: QuizFunnel;
}

export const EnhancedResultPageEditorWrapper: React.FC<EnhancedResultPageEditorWrapperProps> = ({
  primaryStyle,
  secondaryStyles,
  initialFunnel
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [savedFunnel, setSavedFunnel] = useState<QuizFunnel | null>(null);

  const handleSaveFunnel = (funnel: QuizFunnel) => {
    setIsLoading(true);
    
    try {
      localStorage.setItem('currentQuizFunnel', JSON.stringify(funnel));
      setSavedFunnel(funnel);
      toast({
        title: "Funil salvo com sucesso",
        description: "Todas as alterações foram salvas e estão prontas para uso.",
      });
    } catch (error) {
      console.error('Erro ao salvar funil:', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as alterações. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialFunnel) {
      try {
        const savedFunnelData = localStorage.getItem('currentQuizFunnel');
        if (savedFunnelData) {
          const parsedFunnel = JSON.parse(savedFunnelData);
          setSavedFunnel(parsedFunnel);
        }
      } catch (error) {
        console.error('Erro ao carregar funil salvo:', error);
      }
    }
  }, [initialFunnel]);

  return (
    <div className="h-screen flex flex-col">
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg">Salvando alterações...</p>
          </div>
        </div>
      )}
      <EnhancedResultPageEditor
        primaryStyle={primaryStyle}
        secondaryStyles={secondaryStyles}
        initialFunnel={initialFunnel || savedFunnel || undefined}
        onSave={handleSaveFunnel}
      />
    </div>
  );
};

export const EnhancedResultPageEditorPage: React.FC = () => {
  const [primaryStyle, setPrimaryStyle] = useState<StyleResult | null>(null);
  const [secondaryStyles, setSecondaryStyles] = useState<StyleResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedResult = localStorage.getItem('quizResult');
      if (savedResult) {
        const parsedResult = JSON.parse(savedResult);
        
        if (parsedResult?.primaryStyle) {
          setPrimaryStyle(parsedResult.primaryStyle);
          setSecondaryStyles(parsedResult.secondaryStyles || []);
        } else {
          const defaultStyle: StyleResult = {
            category: 'Natural',
            score: 10,
            percentage: 100
          };
          
          setPrimaryStyle(defaultStyle);
          setSecondaryStyles([]);
        }
      } else {
        const defaultStyle: StyleResult = {
          category: 'Natural',
          score: 10,
          percentage: 100
        };
        setPrimaryStyle(defaultStyle);
        setSecondaryStyles([]);
      }
    } catch (error) {
      console.error("Erro ao carregar resultados:", error);
      const defaultStyle: StyleResult = {
        category: 'Natural',
        score: 10,
        percentage: 100
      };
      setPrimaryStyle(defaultStyle);
      setSecondaryStyles([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando editor...</p>
      </div>
    );
  }

  if (!primaryStyle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Erro: Nenhum resultado encontrado para editar</p>
          <Button onClick={() => router.push('/resultado')}>
            Voltar para Resultados
          </Button>
        </div>
      </div>
    );
  }

  return (
    <EnhancedResultPageEditorWrapper 
      primaryStyle={primaryStyle} 
      secondaryStyles={secondaryStyles} 
    />
  );
};

export default EnhancedResultPageEditorPage;
