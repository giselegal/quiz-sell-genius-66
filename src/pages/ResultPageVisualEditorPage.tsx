
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ResultPageBuilder } from '@/components/visual-editor/ResultPageBuilder';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye } from 'lucide-react';

const ResultPageVisualEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const [primaryStyle, setPrimaryStyle] = useState<StyleResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Create a default style for the editor - will be dynamic based on user data
    const defaultStyle: StyleResult = {
      category: "Natural" as any,
      score: 100,
      percentage: 85
    };
    setPrimaryStyle(defaultStyle);
    setIsLoading(false);
  }, []);

  const handleSave = (config: any) => {
    console.log('Salvando configuração da página de resultado:', config);
  };

  const handlePreview = () => {
    window.open('/resultado', '_blank');
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg">Carregando editor...</p>
      </div>
    );
  }

  if (!primaryStyle) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Erro ao carregar o editor</p>
          <Button onClick={() => navigate('/admin')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="font-semibold">Editor Visual da Página de Resultado</h1>
            <p className="text-sm text-gray-600">Criando uma página que se adapta a qualquer estilo</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handlePreview}>
          <Eye className="w-4 h-4 mr-2" />
          Visualizar Página Real
        </Button>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <ResultPageBuilder
          primaryStyle={primaryStyle}
          onSave={handleSave}
          onPreview={handlePreview}
        />
      </div>
    </div>
  );
};

export default ResultPageVisualEditorPage;
