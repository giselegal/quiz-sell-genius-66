
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RealComponentVisualEditor } from '@/components/editor/visual/RealComponentVisualEditor';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const ResultPageEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const [primaryStyle, setPrimaryStyle] = useState<StyleResult | null>(null);
  const [secondaryStyles, setSecondaryStyles] = useState<StyleResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to get real quiz data first, fallback to mock data
    const savedQuizResult = localStorage.getItem('quiz_result');
    
    if (savedQuizResult) {
      try {
        const result = JSON.parse(savedQuizResult);
        setPrimaryStyle(result.primaryStyle);
        setSecondaryStyles(result.secondaryStyles || []);
      } catch {
        // Use mock data if parsing fails
        setMockData();
      }
    } else {
      // Use mock data for development
      setMockData();
    }
    
    setIsLoading(false);
  }, []);

  const setMockData = () => {
    const mockPrimaryStyle: StyleResult = {
      category: "Elegante" as any,
      score: 100,
      percentage: 85
    };

    const mockSecondaryStyles: StyleResult[] = [
      {
        category: "Romântico" as any,
        score: 75,
        percentage: 60
      },
      {
        category: "Clássico" as any,
        score: 50,
        percentage: 40
      }
    ];

    setPrimaryStyle(mockPrimaryStyle);
    setSecondaryStyles(mockSecondaryStyles);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-lg">Carregando editor...</p>
        </div>
      </div>
    );
  }

  if (!primaryStyle) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Erro ao carregar dados do estilo</p>
          <Button onClick={() => navigate('/admin')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Admin
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-xl font-playfair text-[#432818]">
              Editor Visual - Componentes Reais
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('/resultado', '_blank')}
            >
              Ver Página Real
            </Button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <RealComponentVisualEditor
          primaryStyle={primaryStyle}
          secondaryStyles={secondaryStyles}
        />
      </div>
    </div>
  );
};

export default ResultPageEditorPage;
