
import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import QuizIntro from '@/components/QuizIntro';
import QuizFinalTransition from '@/components/QuizFinalTransition';
import QuizResult from '@/components/QuizResult';
import QuizOfferPage from '@/components/QuizOfferPage';
import { DetailedStepsPanel } from './steps/DetailedStepsPanel';
import { ComponentsPalette } from './sidebar/ComponentsPalette';
import { StageConfigurationPanel } from './panels/StageConfigurationPanel';
import { OptionConfigurationPanel } from './panels/OptionConfigurationPanel';
import { StyleResult } from '@/types/quiz';
import { 
  Eye, 
  Save, 
  Monitor, 
  Tablet, 
  Smartphone
} from 'lucide-react';

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
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showOptionConfig, setShowOptionConfig] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

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

  const handleSave = useCallback(() => {
    console.log('Saving...');
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleSave();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [handleSave]);

  const handleStageSelect = (stageId: string) => {
    setCurrentStage(stageId);
    // Update stage index based on the selected stage
    const stageMap: { [key: string]: number } = {
      'intro': 0,
      'quiz': 1,
      'q1': 1, 'q2': 1, 'q3': 1, 'q4': 1, 'q5': 1,
      'q6': 1, 'q7': 1, 'q8': 1, 'q9': 1, 'q10': 1,
      'strategic1': 2, 'strategic2': 2, 'strategic3': 2,
      'transition': 3,
      'result': 4,
      'offer': 5
    };
    setCurrentStageIndex(stageMap[stageId] || 0);
  };

  const handleComponentSelect = (componentType: string) => {
    setSelectedComponent(componentType);
    console.log('Componente selecionado:', componentType);
  };

  const handleAddQuestion = () => {
    console.log('Adicionando nova questão...');
    // Aqui você implementaria a lógica para adicionar uma nova questão
  };

  const renderCurrentStage = () => {
    switch (currentStage) {
      case 'intro':
        return <QuizIntro onStart={() => setCurrentStage('quiz')} />;
      
      case 'quiz':
      case 'q1':
      case 'q2':
      case 'q3':
      case 'q4':
      case 'q5':
      case 'q6':
      case 'q7':
      case 'q8':
      case 'q9':
      case 'q10':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              {currentStage.startsWith('q') ? `Questão ${currentStage.slice(1)}` : 'Quiz em Desenvolvimento'}
            </h2>
            <p className="text-gray-600 mb-6">
              {currentStage.startsWith('q') ? 
                'Esta questão pode ser editada inline no editor.' : 
                'Esta seção será implementada com as questões do quiz.'
              }
            </p>
            <Button onClick={() => setCurrentStage('transition')}>
              Simular Finalização do Quiz
            </Button>
          </div>
        );
      
      case 'strategic1':
      case 'strategic2':
      case 'strategic3':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Questão Estratégica</h2>
            <p className="text-gray-600 mb-6">
              Esta é uma questão estratégica para coleta de dados.
            </p>
            <Button onClick={() => setCurrentStage('transition')}>
              Próxima Questão
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
          />
        );
      
      case 'offer':
        return <QuizOfferPage />;
      
      default:
        return null;
    }
  };

  const getStageName = (stageId: string): string => {
    const stageNames: { [key: string]: string } = {
      'intro': 'Introdução',
      'quiz': 'Quiz',
      'q1': 'Questão 1', 'q2': 'Questão 2', 'q3': 'Questão 3', 'q4': 'Questão 4', 'q5': 'Questão 5',
      'q6': 'Questão 6', 'q7': 'Questão 7', 'q8': 'Questão 8', 'q9': 'Questão 9', 'q10': 'Questão 10',
      'strategic1': 'Questão Estratégica 1', 'strategic2': 'Questão Estratégica 2', 'strategic3': 'Questão Estratégica 3',
      'transition': 'Transição',
      'result': 'Resultado',
      'offer': 'Oferta'
    };
    return stageNames[stageId] || 'Etapa';
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex-shrink-0">
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

      {/* Main Content - Resizable 4 Columns Layout */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Column - Detailed Steps Panel */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full bg-white border-r border-gray-200">
              <DetailedStepsPanel
                currentStage={currentStage}
                onStageSelect={handleStageSelect}
                onAddQuestion={handleAddQuestion}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Second Column - Components Palette */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full bg-gray-50 border-r border-gray-200">
              <ComponentsPalette
                onComponentSelect={handleComponentSelect}
                selectedComponent={selectedComponent}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Third Column - Editor Canvas */}
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="h-full overflow-auto bg-gray-100 p-6">
              <div className={`mx-auto bg-white shadow-lg rounded-lg overflow-hidden ${
                viewportMode === 'desktop' ? 'max-w-6xl' :
                viewportMode === 'tablet' ? 'max-w-2xl' :
                'max-w-sm'
              }`}>
                {renderCurrentStage()}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Fourth Column - Configuration Panel */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full bg-white border-l border-gray-200">
              <div className="h-full overflow-auto">
                <StageConfigurationPanel
                  stageName={getStageName(currentStage)}
                  stageType={currentStage}
                />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Option Configuration Modal */}
      {showOptionConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <OptionConfigurationPanel
            isOpen={showOptionConfig}
            onClose={() => setShowOptionConfig(false)}
            optionId={selectedOptionId || ''}
            onConfigUpdate={(config) => {
              console.log('Configuração atualizada:', config);
            }}
          />
        </div>
      )}
    </div>
  );
};
