
import { useState, useCallback } from 'react';

export type StepType = 'quiz-intro' | 'quiz-question' | 'quiz-result' | 'offer-page';

interface Step {
  id: string;
  title: string;
  type: StepType;
  order: number;
  subType?: string; // Para diferentes tipos de questões
  templateComponents?: string[];
  settings?: {
    questionType?: 'multiple-choice' | 'single-choice' | 'scale' | 'text';
    showProgress?: boolean;
    allowBack?: boolean;
    autoAdvance?: boolean;
  };
}

export const useStepsManager = () => {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 'step-1',
      title: 'Capa do Quiz',
      type: 'quiz-intro',
      order: 1,
      templateComponents: [],
      settings: {
        showProgress: false,
        allowBack: false
      }
    }
  ]);
  
  const [activeStepId, setActiveStepId] = useState<string>('step-1');

  const getStepTypeInfo = (type: StepType) => {
    switch (type) {
      case 'quiz-intro':
        return {
          icon: '🏠',
          color: 'bg-blue-500',
          lightColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          label: 'Capa do Quiz'
        };
      case 'quiz-question':
        return {
          icon: '❓',
          color: 'bg-purple-500',
          lightColor: 'bg-purple-100',
          textColor: 'text-purple-700',
          label: 'Questão'
        };
      case 'quiz-result':
        return {
          icon: '🎯',
          color: 'bg-green-500',
          lightColor: 'bg-green-100',
          textColor: 'text-green-700',
          label: 'Resultado'
        };
      case 'offer-page':
        return {
          icon: '💰',
          color: 'bg-orange-500',
          lightColor: 'bg-orange-100',
          textColor: 'text-orange-700',
          label: 'Página de Oferta'
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

  const addStep = useCallback((type: StepType = 'quiz-question') => {
    const newStepNumber = steps.length + 1;
    const typeInfo = getStepTypeInfo(type);
    
    // Gerar título específico baseado no tipo
    let title = '';
    if (type === 'quiz-intro') {
      title = 'Capa do Quiz';
    } else if (type === 'quiz-question') {
      const questionNumber = steps.filter(s => s.type === 'quiz-question').length + 1;
      title = `Questão ${questionNumber}`;
    } else if (type === 'quiz-result') {
      title = 'Página de Resultado';
    } else if (type === 'offer-page') {
      title = 'Página de Oferta';
    }
    
    const newStep: Step = {
      id: `step-${Date.now()}`,
      title,
      type,
      order: newStepNumber,
      templateComponents: [],
      settings: {
        questionType: type === 'quiz-question' ? 'multiple-choice' : undefined,
        showProgress: type !== 'quiz-intro',
        allowBack: type !== 'quiz-intro',
        autoAdvance: false
      }
    };
    
    setSteps(prev => [...prev, newStep]);
    setActiveStepId(newStep.id);
    
    return newStep.id;
  }, [steps]);

  const addQuizIntroStep = useCallback(() => addStep('quiz-intro'), [addStep]);
  const addQuizQuestionStep = useCallback(() => addStep('quiz-question'), [addStep]);
  const addQuizResultStep = useCallback(() => addStep('quiz-result'), [addStep]);
  const addOfferPageStep = useCallback(() => addStep('offer-page'), [addStep]);

  const deleteStep = useCallback((stepId: string) => {
    setSteps(prev => {
      const filteredSteps = prev.filter(step => step.id !== stepId);
      // Reordenar etapas restantes
      return filteredSteps.map((step, index) => ({
        ...step,
        order: index + 1,
        title: step.type === 'quiz-question' 
          ? `Questão ${filteredSteps.filter((s, i) => i <= index && s.type === 'quiz-question').length}`
          : step.title
      }));
    });
    
    // Selecionar primeira etapa se a atual foi deletada
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
    let title = '';
    
    if (stepToDuplicate.type === 'quiz-question') {
      const questionNumber = steps.filter(s => s.type === 'quiz-question').length + 1;
      title = `Questão ${questionNumber}`;
    } else {
      title = `${stepToDuplicate.title} (Cópia)`;
    }
    
    const newStep: Step = {
      id: `step-${Date.now()}`,
      title,
      type: stepToDuplicate.type,
      order: newStepNumber,
      templateComponents: [...(stepToDuplicate.templateComponents || [])],
      settings: { ...stepToDuplicate.settings }
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
    addQuizIntroStep,
    addQuizQuestionStep,
    addQuizResultStep,
    addOfferPageStep,
    deleteStep,
    duplicateStep,
    editStep,
    updateStep,
    reorderStep,
    selectStep,
    getStepTypeInfo
  };
};
