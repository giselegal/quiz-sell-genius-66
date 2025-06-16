import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { getStepTemplate } from '@/utils/stepTemplates';
import { quizQuestions } from '@/data/quizQuestions';
import { strategicQuestions } from '@/data/strategicQuestions';
import { generateComponentId } from '@/utils/idGenerator';

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

  const isPopulatingRef = useRef(false);
  const populationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced auto-populate to prevent multiple executions
  const debouncedAutoPopulate = useCallback((stepId: string, stepType: string) => {
    if (populationTimeoutRef.current) {
      clearTimeout(populationTimeoutRef.current);
    }

    populationTimeoutRef.current = setTimeout(() => {
      if (!state.populatedSteps.has(stepId) && !isPopulatingRef.current) {
        autoPopulateStep(stepId, stepType);
      }
    }, 100);
  }, [state.populatedSteps]);

  // Clean up existing elements for a step before adding new ones
  const cleanStepElements = useCallback((stepId: string) => {
    setState(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.stepId !== stepId)
    }));
  }, []);

  // Auto-populate steps with proper locking mechanism
  const autoPopulateStep = useCallback((stepId: string, stepType: string) => {
    if (state.populatedSteps.has(stepId) || isPopulatingRef.current) {
      return;
    }

    isPopulatingRef.current = true;
    console.log(`Auto-populating step ${stepId} with type ${stepType}`);
    
    // Clean existing elements for this step first
    cleanStepElements(stepId);
    
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
    
    // Add all template components to the step with proper ordering
    const newElements: EditorElement[] = [];
    
    template.components.forEach((component, index) => {
      const newElement: EditorElement = {
        id: generateComponentId(stepId, component.type || 'unknown', index),
        type: component.type || 'text',
        content: component.content || {},
        position: { x: 0, y: 0 },
        size: { width: 100, height: 50 },
        order: index, // Use index as order to ensure proper sequence
        stepId,
        style: component.style || {}
      };
      
      newElements.push(newElement);
    });
    
    // Add all elements at once with proper state update
    if (newElements.length > 0) {
      setTimeout(() => {
        setState(prev => {
          const filteredElements = prev.elements.filter(el => el.stepId !== stepId);
          const updatedElements = [...filteredElements, ...newElements].sort((a, b) => {
            if (a.stepId === b.stepId) {
              return a.order - b.order;
            }
            return 0;
          });
          
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
        
        isPopulatingRef.current = false;
        console.log(`Successfully auto-populated ${newElements.length} template components for step ${stepId}`);
      }, 50);
    } else {
      isPopulatingRef.current = false;
    }
  }, [state.populatedSteps, cleanStepElements]);

  const addElement = useCallback((type: string, content: any = {}, stepId: string) => {
    const stepElements = state.elements.filter(el => el.stepId === stepId);
    const nextOrder = stepElements.length;

    const newElement: EditorElement = {
      id: generateComponentId(stepId, type, nextOrder),
      type,
      content,
      position: { x: 0, y: 0 },
      size: { width: 100, height: 50 },
      order: nextOrder,
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
    debouncedAutoPopulate(stepId, stepType);
  }, [debouncedAutoPopulate]);

  // Reset populated steps (for debugging/testing)
  const resetPopulatedSteps = useCallback(() => {
    setState(prev => ({
      ...prev,
      populatedSteps: new Set(),
      elements: []
    }));
  }, []);

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

    const stepElements = state.elements.filter(el => el.stepId === element.stepId);
    const nextOrder = stepElements.length;

    const newElement: EditorElement = {
      ...element,
      id: generateComponentId(element.stepId, element.type, nextOrder),
      position: { x: element.position.x + 20, y: element.position.y + 20 },
      order: nextOrder
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
    return state.elements
      .filter(el => el.stepId === stepId)
      .sort((a, b) => a.order - b.order);
  }, [state.elements]);

  const canUndo = useMemo(() => state.historyIndex > 0, [state.historyIndex]);
  const canRedo = useMemo(() => state.historyIndex < state.history.length - 1, [state.historyIndex, state.history.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (populationTimeoutRef.current) {
        clearTimeout(populationTimeoutRef.current);
      }
    };
  }, []);

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
    autoPopulateStep,
    resetPopulatedSteps
  };
};
