
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';
import { UnifiedComponentsSidebar } from '../sidebar/UnifiedComponentsSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { QuizComponentType, QuizStage } from '@/types/quizBuilder';
import BuilderLayout from '@/components/quiz-builder/components/BuilderLayout';
import { ComponentPreviewPanel } from '@/components/quiz-builder/preview/ComponentPreviewPanel';
import { PropertiesPanel } from '@/components/quiz-builder/PropertiesPanel';

interface QuizEditorPanelProps {
  isPreviewing: boolean;
}

const QuizEditorPanel: React.FC<QuizEditorPanelProps> = ({ isPreviewing }) => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  
  const {
    components,
    stages,
    activeStageId,
    addComponent,
    updateComponent,
    deleteComponent,
    moveComponent,
    addStage,
    updateStage,
    deleteStage,
    moveStage,
    setActiveStage,
  } = useQuizBuilder();

  // Find active stage
  const activeStage = activeStageId 
    ? stages.find(s => s.id === activeStageId) 
    : null;
    
  // Filter components for the active stage
  const stageComponents = activeStageId 
    ? components.filter(c => c.stageId === activeStageId).sort((a, b) => a.order - b.order) 
    : [];

  const handleComponentSelect = (type: string) => {
    if (!activeStageId) return;
    const newComponentId = addComponent(type as QuizComponentType, activeStageId);
    setSelectedComponentId(newComponentId);
  };

  const handleMoveComponent = (draggedId: string, targetId: string) => {
    moveComponent(draggedId, targetId);
  };

  const handleUpdateComponent = (content: any) => {
    if (selectedComponentId) {
      updateComponent(selectedComponentId, { data: content });
      // Atualiza o preview em tempo real
      setLivePreview({
        componentId: selectedComponentId,
        content
      });
    }
  };
  
  const handleDeleteComponent = () => {
    if (selectedComponentId) {
      deleteComponent(selectedComponentId);
      setSelectedComponentId(null);
    }
  };

  const renderStageSelector = () => {
    return (
      <div className="border-b p-2 bg-white">
        <div className="flex flex-wrap gap-2">
          {stages.map((stage) => (
            <Button
              key={stage.id}
              variant={stage.id === activeStageId ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveStage(stage.id)}
            >
              {stage.title || `Etapa ${stage.order + 1}`}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => addStage('question')}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <BuilderLayout
      components={components}
      stages={stages}
      activeStageId={activeStageId}
      selectedComponentId={selectedComponentId}
      activeStage={activeStage}
      isPreviewing={isPreviewing}
      onComponentSelect={handleComponentSelect}
      onStageAdd={addStage}
      onStageSelect={setActiveStage}
      onComponentMove={handleMoveComponent}
      onStageMove={moveStage}
      onStageUpdate={updateStage}
      onStageDelete={deleteStage}
      onComponentUpdate={updateComponent}
      onComponentDelete={handleDeleteComponent}
      onSelectComponent={setSelectedComponentId}
    />
  );
};

export default QuizEditorPanel;
