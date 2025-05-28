
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { StagesPanel } from '../StagesPanel';
import { ComponentsSidebar } from '../ComponentsSidebar';
import { PreviewPanel } from '../PreviewPanel';
import { PropertiesPanel } from '../PropertiesPanel';

interface BuilderLayoutProps {
  components: QuizComponentData[];
  stages: QuizStage[];
  activeStageId: string | null;
  selectedComponentId: string | null;
  activeStage: QuizStage | null;
  isPreviewing: boolean;
  onComponentSelect: (type: any) => void;
  onStageAdd: (type: QuizStage['type']) => void;
  onStageSelect: (stageId: string) => void;
  onComponentMove: (draggedId: string, targetId: string) => void;
  onStageMove: (draggedId: string, targetId: string) => void;
  onStageUpdate: (id: string, updates: Partial<QuizStage>) => void;
  onStageDelete: (id: string) => void;
  onComponentUpdate: (id: string, updates: Partial<QuizComponentData>) => void;
  onComponentDelete: (id: string) => void;
  onSelectComponent: (id: string | null) => void;
}

const BuilderLayout: React.FC<BuilderLayoutProps> = ({
  components,
  stages,
  activeStageId,
  selectedComponentId,
  activeStage,
  isPreviewing,
  onComponentSelect,
  onStageAdd,
  onStageSelect,
  onComponentMove,
  onStageMove,
  onStageUpdate,
  onStageDelete,
  onComponentUpdate,
  onComponentDelete,
  onSelectComponent
}) => {
  const activeStageComponents = components.filter(c => c.stageId === activeStageId);
  const selectedComponent = selectedComponentId ? components.find(c => c.id === selectedComponentId) : null;

  return (
    <div className="flex-1 overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={15} minSize={10} maxSize={25}>
          <StagesPanel
            stages={stages}
            activeStageId={activeStageId}
            onStageSelect={onStageSelect}
            onStageAdd={onStageAdd}
            onStageMove={onStageMove}
            onStageUpdate={onStageUpdate}
            onStageDelete={onStageDelete}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={15} minSize={10} maxSize={25}>
          <ComponentsSidebar
            onComponentSelect={onComponentSelect}
            activeStage={activeStage}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={50} minSize={30}>
          <PreviewPanel
            components={activeStageComponents}
            selectedComponentId={selectedComponentId}
            onSelectComponent={onSelectComponent}
            onMoveComponent={onComponentMove}
            activeStage={activeStage}
            isPreviewing={isPreviewing}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <PropertiesPanel
            component={selectedComponent}
            stage={!selectedComponent ? activeStage : null}
            onClose={() => onSelectComponent(null)}
            onUpdate={onComponentUpdate}
            onUpdateStage={onStageUpdate}
            onDelete={onComponentDelete}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default BuilderLayout;
