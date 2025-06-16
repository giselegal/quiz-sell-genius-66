
import { useState, useCallback } from 'react';

interface Step {
  id: string;
  title: string;
  type: 'quiz' | 'result' | 'offer';
  order: number;
}

export const useStepsManager = () => {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 'step-1',
      title: 'Etapa 1',
      type: 'quiz',
      order: 1
    }
  ]);
  
  const [activeStepId, setActiveStepId] = useState<string>('step-1');

  const addStep = useCallback(() => {
    const newStepNumber = steps.length + 1;
    const newStep: Step = {
      id: `step-${Date.now()}`,
      title: `Etapa ${newStepNumber}`,
      type: 'quiz',
      order: newStepNumber
    };
    
    setSteps(prev => [...prev, newStep]);
    setActiveStepId(newStep.id);
  }, [steps.length]);

  const deleteStep = useCallback((stepId: string) => {
    setSteps(prev => {
      const filteredSteps = prev.filter(step => step.id !== stepId);
      // Reorder remaining steps
      return filteredSteps.map((step, index) => ({
        ...step,
        order: index + 1,
        title: `Etapa ${index + 1}`
      }));
    });
    
    // Select first step if current was deleted
    if (activeStepId === stepId && steps.length > 1) {
      const remainingSteps = steps.filter(step => step.id !== stepId);
      if (remainingSteps.length > 0) {
        setActiveStepId(remainingSteps[0].id);
      }
    }
  }, [activeStepId, steps]);

  const duplicateStep = useCallback((stepId: string) => {
    const stepToDuplicate = steps.find(step => step.id === stepId);
    if (!stepToDuplicate) return;

    const newStepNumber = steps.length + 1;
    const newStep: Step = {
      id: `step-${Date.now()}`,
      title: `${stepToDuplicate.title} (Cópia)`,
      type: stepToDuplicate.type,
      order: newStepNumber
    };
    
    setSteps(prev => [...prev, newStep]);
    setActiveStepId(newStep.id);
  }, [steps]);

  const editStep = useCallback((stepId: string) => {
    // For now, just select the step
    // In the future, this could open an edit dialog
    setActiveStepId(stepId);
  }, []);

  const reorderStep = useCallback((stepId: string, newOrder: number) => {
    setSteps(prev => {
      const step = prev.find(s => s.id === stepId);
      if (!step) return prev;

      const otherSteps = prev.filter(s => s.id !== stepId);
      const updatedStep = { ...step, order: newOrder };
      
      return [...otherSteps, updatedStep].sort((a, b) => a.order - b.order);
    });
  }, []);

  const selectStep = useCallback((stepId: string) => {
    setActiveStepId(stepId);
  }, []);

  return {
    steps,
    activeStepId,
    addStep,
    deleteStep,
    duplicateStep,
    editStep,
    reorderStep,
    selectStep
  };
};
