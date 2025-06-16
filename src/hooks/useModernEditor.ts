import { useState, useCallback, useMemo, useEffect } from 'react';
import { getStepTemplate } from '@/utils/stepTemplates';
import { quizQuestions } from '@/data/quizQuestions';
import { strategicQuestions } from '@/data/strategicQuestions';

export interface EditorElement {
  id: string;
  type: string;
  content: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
  order: number;
  stepId: string;
  style?: Record<string, any>;
}

interface EditorState {
  elements: EditorElement[];
  selectedElementId: string | null;
  isPreviewMode: boolean;
  history: EditorElement[][];
  historyIndex: number;
  populatedSteps: Set<string>;
}

export const useModernEditor = () => {
  const [state, setState] = useState<EditorState>({
    elements: [],
    selectedElementId: null,
    isPreviewMode: false,
    history: [[]],
    historyIndex: 0,
    populatedSteps: new Set()
  });

  // Auto-populate steps that haven't been populated yet
  const autoPopulateStep = useCallback((stepId: string, stepType: string) => {
    if (state.populatedSteps.has(stepId)) {
      return; // Already populated
    }

    console.log(`Auto-populating step ${stepId} with type ${stepType}`);
    
    // Get question data based on step type and ID
    let questionData = undefined;
    
    if (stepType === 'quiz-question') {
      const questionMatch = stepId.match(/step-question-(\d+)/);
      if (questionMatch) {
        const questionId = questionMatch[1];
        questionData = quizQuestions.find(q => q.id === questionId);
      }
    } else if (stepType === 'strategic-question') {
      const strategicMatch = stepId.match(/step-strategic-(.+)/);
      if (strategicMatch) {
        const questionId = strategicMatch[1];
        questionData = strategicQuestions.find(q => q.id === questionId);
      }
    }
    
    // Get the template for this step type
    const template = getStepTemplate(stepType, stepId, questionData);
    
    // Add all template components to the step
    const newElements: EditorElement[] = [];
    
    template.components.forEach((component, index) => {
      const newElement: EditorElement = {
        id: `element-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
        type: component.type || 'text',
        content: component.content || {},
        position: { x: 0, y: 0 },
        size: { width: 100, height: 50 },
        order: component.order || index,
        stepId,
        style: component.style || {}
      };
      
      newElements.push(newElement);
    });
    
    // Add all elements at once
    if (newElements.length > 0) {
      setState(prev => {
        const updatedElements = [...prev.elements, ...newElements];
        const newHistory = prev.history.slice(0, prev.historyIndex + 1);
        newHistory.push(updatedElements);
        
        const newPopulatedSteps = new Set(prev.populatedSteps);
        newPopulatedSteps.add(stepId);
        
        return {
          ...prev,
          elements: updatedElements,
          history: newHistory,
          historyIndex: newHistory.length - 1,
          populatedSteps: newPopulatedSteps
        };
      });
      
      console.log(`Successfully auto-populated ${newElements.length} template components for step ${stepId}`);
    }
  }, [state.populatedSteps]);

  const addElement = useCallback((type: string, content: any = {}, stepId: string) => {
    const newElement: EditorElement = {
      id: `element-${Date.now()}`,
      type,
      content,
      position: { x: 0, y: 0 },
      size: { width: 100, height: 50 },
      order: state.elements.filter(el => el.stepId === stepId).length,
      stepId,
      style: {}
    };

    setState(prev => {
      const newElements = [...prev.elements, newElement];
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(newElements);
      
      return {
        ...prev,
        elements: newElements,
        selectedElementId: newElement.id,
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    });

    return newElement.id;
  }, [state.elements]);

  const addStepTemplate = useCallback((stepType: string, stepId: string) => {
    autoPopulateStep(stepId, stepType);
  }, [autoPopulateStep]);

  const updateElement = useCallback((id: string, updates: Partial<EditorElement>) => {
    setState(prev => {
      const newElements = prev.elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      );
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(newElements);
      
      return {
        ...prev,
        elements: newElements,
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    });
  }, []);

  const duplicateElement = useCallback((id: string) => {
    const element = state.elements.find(el => el.id === id);
    if (!element) return;

    const newElement: EditorElement = {
      ...element,
      id: `element-${Date.now()}`,
      position: { x: element.position.x + 20, y: element.position.y + 20 }
    };

    setState(prev => {
      const newElements = [...prev.elements, newElement];
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(newElements);
      
      return {
        ...prev,
        elements: newElements,
        selectedElementId: newElement.id,
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    });
  }, [state.elements]);

  const deleteElement = useCallback((id: string) => {
    setState(prev => {
      const newElements = prev.elements.filter(el => el.id !== id);
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(newElements);
      
      return {
        ...prev,
        elements: newElements,
        selectedElementId: prev.selectedElementId === id ? null : prev.selectedElementId,
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    });
  }, []);

  const selectElement = useCallback((id: string | null) => {
    setState(prev => ({ ...prev, selectedElementId: id }));
  }, []);

  const togglePreview = useCallback(() => {
    setState(prev => ({ ...prev, isPreviewMode: !prev.isPreviewMode }));
  }, []);

  const undo = useCallback(() => {
    setState(prev => {
      if (prev.historyIndex > 0) {
        return {
          ...prev,
          elements: prev.history[prev.historyIndex - 1],
          historyIndex: prev.historyIndex - 1,
          selectedElementId: null
        };
      }
      return prev;
    });
  }, []);

  const redo = useCallback(() => {
    setState(prev => {
      if (prev.historyIndex < prev.history.length - 1) {
        return {
          ...prev,
          elements: prev.history[prev.historyIndex + 1],
          historyIndex: prev.historyIndex + 1,
          selectedElementId: null
        };
      }
      return prev;
    });
  }, []);

  const save = useCallback(async () => {
    return {
      elements: state.elements,
      timestamp: new Date().toISOString()
    };
  }, [state.elements]);

  const getElementsByStep = useCallback((stepId: string) => {
    return state.elements.filter(el => el.stepId === stepId);
  }, [state.elements]);

  const canUndo = useMemo(() => state.historyIndex > 0, [state.historyIndex]);
  const canRedo = useMemo(() => state.historyIndex < state.history.length - 1, [state.historyIndex, state.history.length]);

  return {
    elements: state.elements,
    selectedElementId: state.selectedElementId,
    isPreviewMode: state.isPreviewMode,
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
    autoPopulateStep
  };
};
