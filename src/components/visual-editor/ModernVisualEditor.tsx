
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Eye, 
  Settings, 
  Save, 
  Download,
  Upload,
  RefreshCw,
  Play
} from 'lucide-react';
import { useVisualEditor } from '@/hooks/useVisualEditor';
import { DetailedStepsPanel } from './steps/DetailedStepsPanel';
import { QuizContent } from '@/components/QuizContent';
import { useQuizLogic } from '@/hooks/useQuizLogic';
import { UserResponse } from '@/types/quiz';

interface ModernVisualEditorProps {
  funnelId: string;
  onSave?: (data: any) => void;
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({
  funnelId,
  onSave
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const {
    elements,
    stages,
    activeStageId,
    addElement,
    updateElement,
    removeElement,
    setActiveStage,
    exportState,
    importState,
    undo,
    redo
  } = useVisualEditor();

  // Quiz logic integration
  const {
    currentQuestionIndex,
    totalQuestions,
    currentQuestion,
    showingStrategicQuestions,
    currentStrategicQuestionIndex,
    totalStrategicQuestions,
    currentAnswers,
    handleAnswerSubmit,
    handleNextClick,
    handlePrevious,
    resetQuiz
  } = useQuizLogic();

  const currentStage = stages.find(stage => stage.id === activeStageId);

  // Generate stages with sub-stages for detailed navigation
  const stagesWithSubStages = stages.map(stage => {
    if (stage.id === 'quiz') {
      return {
        ...stage,
        subStages: Array.from({ length: totalQuestions }, (_, index) => ({
          id: `question-${index}`,
          name: `Questão ${index + 1}`,
          index
        }))
      };
    }
    if (stage.id === 'strategic') {
      return {
        ...stage,
        subStages: Array.from({ length: totalStrategicQuestions }, (_, index) => ({
          id: `strategic-${index}`,
          name: `Estratégica ${index + 1}`,
          index
        }))
      };
    }
    return stage;
  });

  const handleStageSelect = (stageId: string, subStageIndex?: number) => {
    setActiveStage(stageId);
    
    // If navigating to a specific question, update quiz state
    if (stageId === 'quiz' && subStageIndex !== undefined) {
      // Logic to navigate to specific question would go here
      console.log(`Navigating to quiz question ${subStageIndex}`);
    }
    if (stageId === 'strategic' && subStageIndex !== undefined) {
      console.log(`Navigating to strategic question ${subStageIndex}`);
    }
  };

  const handleSave = () => {
    const editorData = {
      elements,
      stages,
      activeStageId,
      timestamp: new Date().toISOString()
    };
    
    onSave?.(editorData);
    console.log('Editor state saved:', editorData);
  };

  const handleQuizAnswerSubmit = (response: UserResponse) => {
    handleAnswerSubmit(response);
  };

  const renderStageContent = () => {
    if (!currentStage) return null;

    switch (currentStage.id) {
      case 'intro':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Introdução do Quiz</h2>
            <p className="text-gray-600">Conteúdo da página de introdução</p>
          </div>
        );

      case 'quiz':
        return (
          <QuizContent
            user={{ userName: 'Editor User' }}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            showingStrategicQuestions={false}
            currentStrategicQuestionIndex={currentStrategicQuestionIndex}
            currentQuestion={currentQuestion}
            currentAnswers={currentAnswers}
            handleAnswerSubmit={handleQuizAnswerSubmit}
            handleNextClick={handleNextClick}
            handlePrevious={handlePrevious}
            showHeader={false}
          />
        );

      case 'strategic':
        return (
          <QuizContent
            user={{ userName: 'Editor User' }}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            showingStrategicQuestions={true}
            currentStrategicQuestionIndex={currentStrategicQuestionIndex}
            currentQuestion={currentQuestion}
            currentAnswers={currentAnswers}
            handleAnswerSubmit={handleQuizAnswerSubmit}
            handleNextClick={handleNextClick}
            handlePrevious={handlePrevious}
            showHeader={false}
          />
        );

      case 'transition':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Transição</h2>
            <p className="text-gray-600">Página de transição entre quiz e resultado</p>
          </div>
        );

      case 'result':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Resultado do Quiz</h2>
            <p className="text-gray-600">Página de apresentação dos resultados</p>
          </div>
        );

      case 'offer':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Oferta Final</h2>
            <p className="text-gray-600">Página de apresentação da oferta</p>
          </div>
        );

      default:
        return (
          <div className="p-8 text-center text-gray-500">
            Selecione uma etapa para visualizar
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex bg-[#FAF9F7]">
      {/* Left Panel - Steps */}
      <div className="w-80 border-r border-gray-200 bg-white">
        <DetailedStepsPanel
          stages={stagesWithSubStages}
          currentStage={activeStageId}
          currentSubStageIndex={showingStrategicQuestions ? currentStrategicQuestionIndex : currentQuestionIndex}
          onStageSelect={handleStageSelect}
          totalQuestions={totalQuestions}
          totalStrategicQuestions={totalStrategicQuestions}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-900">
              Editor Visual - {currentStage?.name || 'Carregando...'}
            </h1>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode('desktop')}
                className={viewMode === 'desktop' ? 'bg-gray-100' : ''}
              >
                Desktop
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode('mobile')}
                className={viewMode === 'mobile' ? 'bg-gray-100' : ''}
              >
                Mobile
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreviewMode ? 'Editar' : 'Preview'}
            </Button>
            
            <Separator orientation="vertical" className="h-6" />
            
            <Button
              variant="outline"
              size="sm"
              onClick={undo}
            >
              Desfazer
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={redo}
            >
              Refazer
            </Button>
            
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-[#B89B7A] hover:bg-[#A0895B] text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Content Preview Area */}
        <div className="flex-1 overflow-auto">
          <div className={`mx-auto transition-all duration-300 ${
            viewMode === 'mobile' ? 'max-w-md' : 'max-w-7xl'
          }`}>
            <div className="min-h-full bg-white shadow-sm">
              {renderStageContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
