import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import QuizIntro from '@/components/QuizIntro';
import QuizFinalTransition from '@/components/QuizFinalTransition';
import QuizResult from '@/components/QuizResult';
import QuizOfferPage from '@/components/QuizOfferPage';
import { StageConfigurationPanel } from './panels/StageConfigurationPanel';
import { OptionConfigurationPanel } from './panels/OptionConfigurationPanel';
import { StyleResult } from '@/types/quiz';
import { 
  Play, 
  Square, 
  Settings, 
  Eye, 
  Save, 
  Monitor, 
  Tablet, 
  Smartphone,
  ArrowLeft,
  ArrowRight,
  Plus
} from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  component: React.FC;
}

interface ModernVisualEditorProps {
  funnelId: string;
  onSave?: (data: any) => void;
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({
  funnelId,
  onSave
}) => {
  const [currentStage, setCurrentStage] = useState<string>('intro');
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [stages, setStages] = useState<Stage[]>([
    { id: 'intro', name: 'Intro', component: QuizIntro },
    { id: 'quiz', name: 'Quiz', component: () => <div>Quiz</div> },
    { id: 'transition', name: 'Transição', component: QuizFinalTransition },
    { id: 'result', name: 'Resultado', component: QuizResult },
    { id: 'offer', name: 'Oferta', component: QuizOfferPage },
  ]);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showOptionConfig, setShowOptionConfig] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Mock data for testing - using proper StyleResult types
  const mockPrimaryStyle: StyleResult = {
    category: 'Elegante',
    score: 85,
    percentage: 85
  };

  const mockSecondaryStyles: StyleResult[] = [
    { category: 'Romântico', score: 70, percentage: 70 },
    { category: 'Clássico', score: 65, percentage: 65 }
  ];

  useEffect(() => {
    // Auto-save every 10 seconds
    const intervalId = setInterval(() => {
      handleSave();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [handleSave]);

  const handleSave = useCallback(() => {
    // Implement your save logic here
    console.log('Saving...');
  }, []);

  const handleNextStage = () => {
    if (currentStageIndex < stages.length - 1) {
      setCurrentStageIndex(currentStageIndex + 1);
      setCurrentStage(stages[currentStageIndex + 1].id);
    }
  };

  const handlePreviousStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(currentStageIndex - 1);
      setCurrentStage(stages[currentStageIndex - 1].id);
    }
  };

  const renderCurrentStage = () => {
    switch (currentStage) {
      case 'intro':
        return <QuizIntro onStart={() => setCurrentStage('quiz')} />;
      
      case 'quiz':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz em Desenvolvimento</h2>
            <p className="text-gray-600 mb-6">Esta seção será implementada com as questões do quiz.</p>
            <Button onClick={() => setCurrentStage('transition')}>
              Simular Finalização do Quiz
            </Button>
          </div>
        );
      
      case 'transition':
        return (
          <QuizFinalTransition 
            onShowResult={() => setCurrentStage('result')}
          />
        );
      
      case 'result':
        return (
          <QuizResult
            primaryStyle={mockPrimaryStyle}
            secondaryStyles={mockSecondaryStyles}
            onViewOffer={() => setCurrentStage('offer')}
          />
        );
      
      case 'offer':
        return <QuizOfferPage />;
      
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">Editor Visual Moderno</h1>
            <Badge variant="outline" className="border-blue-500 text-blue-700">
              {funnelId}
            </Badge>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Viewport Controls */}
            <div className="flex items-center border rounded-lg">
              <Button
                variant={viewportMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewportMode('desktop')}
                className="rounded-r-none"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewportMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewportMode('tablet')}
                className="rounded-none border-x"
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewportMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewportMode('mobile')}
                className="rounded-l-none"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            {/* Preview Toggle */}
            <Button
              variant={isPreviewMode ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreviewMode ? 'Edição' : 'Preview'}
            </Button>

            {/* Save Button */}
            <Button onClick={handleSave} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Stage Navigation */}
        {!isPreviewMode && (
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900 mb-3">Etapas do Funil</h2>
              <div className="space-y-2">
                {stages.map((stage) => (
                  <Button
                    key={stage.id}
                    variant={currentStage === stage.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setCurrentStage(stage.id)}
                  >
                    {stage.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <StageConfigurationPanel
                stageName={stages.find(s => s.id === currentStage)?.name || ''}
                stageType={currentStage}
              />
            </div>
          </div>
        )}

        {/* Main Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Stage Controls */}
          {!isPreviewMode && (
            <div className="bg-gray-100 border-b border-gray-200 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousStage}
                    disabled={currentStageIndex === 0}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium">
                    Etapa {currentStageIndex + 1} de {stages.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextStage}
                    disabled={currentStageIndex === stages.length - 1}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar Etapa
                  </Button>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Componente
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Canvas Area */}
          <div className="flex-1 overflow-auto bg-gray-100 p-6">
            <div className={`mx-auto bg-white shadow-lg rounded-lg overflow-hidden ${
              viewportMode === 'desktop' ? 'max-w-6xl' :
              viewportMode === 'tablet' ? 'max-w-2xl' :
              'max-w-sm'
            }`}>
              {renderCurrentStage()}
            </div>
          </div>
        </div>

        {/* Right Panel - Component Configuration */}
        {!isPreviewMode && showOptionConfig && (
          <OptionConfigurationPanel
            isOpen={showOptionConfig}
            onClose={() => setShowOptionConfig(false)}
            optionId={selectedOptionId || ''}
            onConfigUpdate={(config) => {
              console.log('Configuração atualizada:', config);
            }}
          />
        )}
      </div>
    </div>
  );
};
