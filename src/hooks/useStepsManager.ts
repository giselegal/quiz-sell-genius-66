
import { useState, useCallback } from 'react';

export type StepType = 'quiz' | 'result' | 'offer';

interface Step {
  id: string;
  title: string;
  type: StepType;
  order: number;
  templateComponents?: string[]; // IDs dos componentes do template
}

export const useStepsManager = () => {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 'step-1',
      title: 'Quiz',
      type: 'quiz',
      order: 1,
      templateComponents: []
    }
  ]);
  
  const [activeStepId, setActiveStepId] = useState<string>('step-1');

  const getStepTypeInfo = (type: StepType) => {
    switch (type) {
      case 'quiz':
        return {
          icon: '❓',
          color: 'bg-blue-500',
          lightColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          label: 'Quiz'
        };
      case 'result':
        return {
          icon: '🎯',
          color: 'bg-green-500',
          lightColor: 'bg-green-100',
          textColor: 'text-green-700',
          label: 'Resultado'
        };
      case 'offer':
        return {
          icon: '💰',
          color: 'bg-orange-500',
          lightColor: 'bg-orange-100',
          textColor: 'text-orange-700',
          label: 'Oferta'
        };
      default:
        return {
          icon: '📄',
          color: 'bg-gray-500',
          lightColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          label: 'Etapa'
        };
    }
  };

  const addStep = useCallback((type: StepType = 'quiz') => {
    const newStepNumber = steps.length + 1;
    const typeInfo = getStepTypeInfo(type);
    
    const newStep: Step = {
      id: `step-${Date.now()}`,
      title: `${typeInfo.label} ${newStepNumber}`,
      type,
      order: newStepNumber,
      templateComponents: []
    };
    
    setSteps(prev => [...prev, newStep]);
    setActiveStepId(newStep.id);
    
    return newStep.id;
  }, [steps.length]);

  const addQuizStep = useCallback(() => addStep('quiz'), [addStep]);
  const addResultStep = useCallback(() => addStep('result'), [addStep]);
  const addOfferStep = useCallback(() => addStep('offer'), [addStep]);

  const deleteStep = useCallback((stepId: string) => {
    setSteps(prev => {
      const filteredSteps = prev.filter(step => step.id !== stepId);
      // Reorder remaining steps
      return filteredSteps.map((step, index) => ({
        ...step,
        order: index + 1,
        title: `${getStepTypeInfo(step.type).label} ${index + 1}`
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
    const typeInfo = getStepTypeInfo(stepToDuplicate.type);
    
    const newStep: Step = {
      id: `step-${Date.now()}`,
      title: `${typeInfo.label} ${newStepNumber} (Cópia)`,
      type: stepToDuplicate.type,
      order: newStepNumber,
      templateComponents: [...(stepToDuplicate.templateComponents || [])]
    };
    
    setSteps(prev => [...prev, newStep]);
    setActiveStepId(newStep.id);
    
    return newStep.id;
  }, [steps]);

  const updateStep = useCallback((stepId: string, updates: Partial<Step>) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ));
  }, []);

  const editStep = useCallback((stepId: string) => {
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

  // Get active step
  const activeStep = steps.find(step => step.id === activeStepId);

  return {
    steps,
    activeStepId,
    activeStep,
    addStep,
    addQuizStep,
    addResultStep,
    addOfferStep,
    deleteStep,
    duplicateStep,
    editStep,
    updateStep,
    reorderStep,
    selectStep,
    getStepTypeInfo
  };
};
