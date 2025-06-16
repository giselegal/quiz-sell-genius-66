
import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import QuizIntro from '@/components/QuizIntro';
import QuizFinalTransition from '@/components/QuizFinalTransition';
import QuizResult from '@/components/QuizResult';
import QuizOfferPage from '@/components/QuizOfferPage';
import { QuizContent } from '@/components/QuizContent';
import { StrategicQuestions } from '@/components/quiz/StrategicQuestions';
import { DetailedStepsPanel } from './steps/DetailedStepsPanel';
import { ComponentsPalette } from './sidebar/ComponentsPalette';
import { StageConfigurationPanel } from './panels/StageConfigurationPanel';
import { OptionConfigurationPanel } from './panels/OptionConfigurationPanel';
import { useVisualEditor } from '@/hooks/useVisualEditor';
import { useQuizLogic } from '@/hooks/useQuizLogic';
import { StyleResult, UserResponse } from '@/types/quiz';
import { 
  Eye, 
  Save, 
  Monitor, 
  Tablet, 
  Smartphone
} from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  type: 'intro' | 'quiz' | 'strategic' | 'transition' | 'result' | 'offer';
  component: React.FC<any>;
  subStages?: Array<{ id: string; name: string; index: number }>;
}

interface ModernVisualEditorProps {
  funnelId: string;
  onSave?: (data: any) => void;
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({
  funnelId,
  onSave
}) => {
  const { editorState, setActiveStage } = useVisualEditor();
  
  // Quiz logic integration
  const {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    handleAnswer,
    handleNext,
    handlePrevious,
    quizCompleted,
    strategicAnswers,
    handleStrategicAnswer,
    totalQuestions,
    isInitialLoadComplete,
    allQuestions
  } = useQuizLogic();

  const [currentStage, setCurrentStage] = useState<string>('intro');
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [currentQuestionInStage, setCurrentQuestionInStage] = useState<number>(0);
  const [currentStrategicQuestionIndex, setCurrentStrategicQuestionIndex] = useState<number>(0);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showOptionConfig, setShowOptionConfig] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [mockUser] = useState({ userName: 'Usuário de Teste' });

  // Create stages with sub-stages for quiz questions
  const [stages] = useState<Stage[]>(() => {
    const quizSubStages = allQuestions.map((question, index) => ({
      id: `quiz-question-${index + 1}`,
      name: `Questão ${index + 1}`,
      index
    }));

    const strategicSubStages = Array.from({ length: 7 }, (_, index) => ({
      id: `strategic-question-${index + 1}`,
      name: `Estratégica ${index + 1}`,
      index
    }));

    return [
      { 
        id: 'intro', 
        name: 'Intro', 
        type: 'intro',
        component: QuizIntro 
      },
      { 
        id: 'quiz', 
        name: 'Quiz', 
        type: 'quiz',
        component: QuizContent,
        subStages: quizSubStages
      },
      { 
        id: 'strategic', 
        name: 'Perguntas Estratégicas', 
        type: 'strategic',
        component: StrategicQuestions,
        subStages: strategicSubStages
      },
      { 
        id: 'transition', 
        name: 'Transição', 
        type: 'transition',
        component: QuizFinalTransition 
      },
      { 
        id: 'result', 
        name: 'Resultado', 
        type: 'result',
        component: QuizResult 
      },
      { 
        id: 'offer', 
        name: 'Oferta', 
        type: 'offer',
        component: QuizOfferPage 
      },
    ];
  });

  // Mock data for testing
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
    console.log('Saving editor state...');
    if (onSave) {
      onSave({
        stages,
        currentStage,
        editorState
      });
    }
  }, [stages, currentStage, editorState, onSave]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleSave();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [handleSave]);

  const handleStageSelect = (stageId: string, subStageIndex?: number) => {
    const stageIndex = stages.findIndex(s => s.id === stageId);
    setCurrentStage(stageId);
    setCurrentStageIndex(stageIndex);
    setActiveStage(stageId);
    
    if (stageId === 'quiz' && subStageIndex !== undefined) {
      setCurrentQuestionInStage(subStageIndex);
    } else if (stageId === 'strategic' && subStageIndex !== undefined) {
      setCurrentStrategicQuestionIndex(subStageIndex);
    }
  };

  const handleComponentSelect = (componentType: string) => {
    setSelectedComponent(componentType);
    console.log('Componente selecionado:', componentType);
  };

  const handleAnswerSubmit = (response: UserResponse) => {
    if (currentStage === 'strategic') {
      handleStrategicAnswer(response.questionId, response.selectedOptions);
    } else {
      handleAnswer(response.questionId, response.selectedOptions);
    }
  };

  const renderCurrentStage = () => {
    if (!isInitialLoadComplete && currentStage === 'quiz') {
      return (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B89B7A] mx-auto mb-4"></div>
          <p className="text-[#432818]">Carregando quiz...</p>
        </div>
      );
    }

    switch (currentStage) {
      case 'intro':
        return (
          <QuizIntro 
            onStart={(userName) => {
              console.log('Quiz iniciado por:', userName);
              setCurrentStage('quiz');
            }} 
          />
        );
      
      case 'quiz':
        return (
          <QuizContent
            user={mockUser}
            currentQuestionIndex={currentQuestionInStage}
            totalQuestions={totalQuestions}
            showingStrategicQuestions={false}
            currentStrategicQuestionIndex={0}
            currentQuestion={allQuestions[currentQuestionInStage]}
            currentAnswers={currentAnswers}
            handleAnswerSubmit={handleAnswerSubmit}
            handleNextClick={() => {
              if (currentQuestionInStage < totalQuestions - 1) {
                setCurrentQuestionInStage(prev => prev + 1);
              } else {
                setCurrentStage('strategic');
                setCurrentStrategicQuestionIndex(0);
              }
            }}
            handlePrevious={() => {
              if (currentQuestionInStage > 0) {
                setCurrentQuestionInStage(prev => prev - 1);
              }
            }}
          />
        );
      
      case 'strategic':
        return (
          <StrategicQuestions
            currentQuestionIndex={currentStrategicQuestionIndex}
            answers={strategicAnswers}
            onAnswer={handleAnswerSubmit}
          />
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
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Etapa não encontrada</h2>
            <p className="text-gray-600">A etapa selecionada não existe.</p>
          </div>
        );
    }
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
            <Badge variant="secondary">
              {stages.find(s => s.id === currentStage)?.name}
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
                stages={stages}
                currentStage={currentStage}
                currentSubStageIndex={
                  currentStage === 'quiz' ? currentQuestionInStage :
                  currentStage === 'strategic' ? currentStrategicQuestionIndex :
                  undefined
                }
                onStageSelect={handleStageSelect}
                totalQuestions={totalQuestions}
                totalStrategicQuestions={7}
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
                  stageName={stages.find(s => s.id === currentStage)?.name || ''}
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
