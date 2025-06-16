import React, { useState, useEffect, useRef } from 'react';
import { ModernSidebar } from './sidebar/ModernSidebar';
import { ModernCanvas } from './canvas/ModernCanvas';
import { ModernToolbar } from './toolbar/ModernToolbar';
import { StepsPanel } from './steps/StepsPanel';
import { ModernPropertiesPanel } from './properties/ModernPropertiesPanel';
import { useModernEditor } from '@/hooks/useModernEditor';
import { useStepsManager } from '@/hooks/useStepsManager';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { toast } from '@/components/ui/use-toast';

interface ModernVisualEditorProps {
  funnelId: string;
  onSave?: (data: any) => void;
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({
  funnelId,
  onSave
}) => {
  const [viewportSize, setViewportSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const hasInitializedRef = useRef(false);

  const {
    elements,
    selectedElementId,
    isPreviewMode,
    canUndo,
    canRedo,
    addElement,
    addStepTemplate,
    updateElement,
    duplicateElement,
    deleteElement,
    selectElement,
    togglePreview,
    undo,
    redo,
    save,
    getElementsByStep,
    autoPopulateStep,
    resetPopulatedSteps
  } = useModernEditor();

  const {
    steps,
    activeStepId,
    activeStep,
    addQuizIntroStep,
    addQuizQuestionStep,
    addStrategicQuestionStep,
    addQuizTransitionStep,
    addQuizResultStep,
    addOfferPageStep,
    deleteStep,
    duplicateStep,
    editStep,
    updateStep,
    reorderStep,
    selectStep,
    getStepTypeInfo
  } = useStepsManager();

  // Single initialization effect to prevent multiple executions
  useEffect(() => {
    if (!hasInitializedRef.current && steps.length > 0) {
      console.log('Initializing steps auto-population...');
      hasInitializedRef.current = true;
      
      // Use a timeout to ensure stable state before population
      const initTimeout = setTimeout(() => {
        steps.forEach((step, index) => {
          setTimeout(() => {
            console.log(`Auto-populating step ${index + 1}/${steps.length}: ${step.id} (${step.type})`);
            autoPopulateStep(step.id, step.type);
          }, index * 50); // Stagger population to prevent conflicts
        });
      }, 200);

      return () => clearTimeout(initTimeout);
    }
  }, [steps, autoPopulateStep]);

  const handleAddElement = (type: string) => {
    if (activeStepId) {
      addElement(type, undefined, activeStepId);
    } else {
      toast({
        title: "Selecione uma etapa",
        description: "Selecione uma etapa antes de adicionar componentes.",
        variant: "destructive"
      });
    }
  };

  const handleStepAdd = (type: 'quiz-intro' | 'quiz-question' | 'strategic-question' | 'quiz-transition' | 'quiz-result' | 'offer-page') => {
    let stepId: string;
    
    switch (type) {
      case 'quiz-intro':
        stepId = addQuizIntroStep();
        break;
      case 'quiz-question':
        stepId = addQuizQuestionStep();
        break;
      case 'strategic-question':
        stepId = addStrategicQuestionStep();
        break;
      case 'quiz-transition':
        stepId = addQuizTransitionStep();
        break;
      case 'quiz-result':
        stepId = addQuizResultStep();
        break;
      case 'offer-page':
        stepId = addOfferPageStep();
        break;
      default:
        return;
    }
    
    // Add template elements for the new step with slight delay
    setTimeout(() => {
      addStepTemplate(type, stepId);
    }, 100);
  };

  const handleSave = async () => {
    try {
      const data = await save();
      
      const fullData = {
        elements: data.elements || [],
        timestamp: data.timestamp || new Date().toISOString(),
        steps,
        activeStepId,
        funnelId
      };
      
      onSave?.(fullData);
      
      toast({
        title: "Projeto salvo",
        description: "Todas as alterações foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar o projeto.",
        variant: "destructive"
      });
    }
  };

  const handleElementUpdate = (id: string, updates: Partial<any>) => {
    updateElement(id, updates);
  };

  // Get elements for active step with proper sorting
  const activeStepElements = activeStepId ? getElementsByStep(activeStepId) : [];
  const selectedElement = activeStepElements.find(el => el.id === selectedElementId);

  // Convert viewport size to viewport format for ModernCanvas
  const getViewport = (): 'desktop' | 'tablet' | 'mobile' => {
    switch (viewportSize) {
      case 'sm':
        return 'mobile';
      case 'md':
      case 'lg':
        return 'tablet';
      case 'xl':
        return 'desktop';
      default:
        return 'desktop';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <ModernToolbar
        canUndo={canUndo}
        canRedo={canRedo}
        isPreviewMode={isPreviewMode}
        viewportSize={viewportSize}
        onUndo={undo}
        onRedo={redo}
        onTogglePreview={togglePreview}
        onViewportChange={setViewportSize}
        onSave={handleSave}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <StepsPanel
          steps={steps}
          activeStepId={activeStepId}
          onStepSelect={selectStep}
          onStepAdd={handleStepAdd}
          onStepEdit={editStep}
          onStepDelete={deleteStep}
          onStepDuplicate={duplicateStep}
          onStepReorder={reorderStep}
          getStepTypeInfo={getStepTypeInfo}
        />
        
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <ModernSidebar 
              onAddElement={handleAddElement}
              activeStepType={activeStep?.type}
            />
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={60}>
            <ModernCanvas
              elements={activeStepElements}
              selectedElementId={selectedElementId}
              onSelectElement={selectElement}
              onUpdateElement={updateElement}
              onDeleteElement={deleteElement}
              onAddElement={handleAddElement}
              isPreviewMode={isPreviewMode}
              viewport={getViewport()}
            />
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <ModernPropertiesPanel
              selectedElement={selectedElement}
              onUpdate={(updates) => {
                if (selectedElementId) {
                  handleElementUpdate(selectedElementId, updates);
                }
              }}
              onClose={() => selectElement(null)}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
