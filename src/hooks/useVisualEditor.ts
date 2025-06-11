
import { useState, useCallback } from 'react';
import { BlockType, VisualElement, VisualStage } from '@/types/visualEditor';
import { v4 as uuidv4 } from 'uuid';

export const useVisualEditor = () => {
  const [elements, setElements] = useState<VisualElement[]>([]);
  const [stages, setStages] = useState<VisualStage[]>([
    {
      id: 'default-stage',
      title: 'Página Principal',
      order: 0,
      type: 'result',
      settings: {
        showHeader: true,
        showProgress: false,
        allowBack: false
      }
    }
  ]);
  const [activeStageId, setActiveStageId] = useState<string>('default-stage');
  const [history, setHistory] = useState<VisualElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveToHistory = useCallback(() => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push([...elements]);
      return newHistory.slice(-50); // Keep last 50 states
    });
    setHistoryIndex(prev => prev + 1);
  }, [elements, historyIndex]);

  const addElement = useCallback((type: BlockType, stageId?: string, position?: number) => {
    const elementId = uuidv4();
    const targetStageId = stageId || activeStageId;
    
    const newElement: VisualElement = {
      id: elementId,
      type,
      stageId: targetStageId,
      order: position ?? elements.filter(el => el.stageId === targetStageId).length,
      content: {},
      style: {},
      visible: true,
      locked: false
    };

    saveToHistory();
    setElements(prev => [...prev, newElement]);
    return elementId;
  }, [activeStageId, elements, saveToHistory]);

  const updateElement = useCallback((elementId: string, updates: Partial<VisualElement>) => {
    saveToHistory();
    setElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    ));
  }, [saveToHistory]);

  const deleteElement = useCallback((elementId: string) => {
    saveToHistory();
    setElements(prev => prev.filter(el => el.id !== elementId));
  }, [saveToHistory]);

  const moveElement = useCallback((elementId: string, direction: 'up' | 'down') => {
    saveToHistory();
    setElements(prev => {
      const element = prev.find(el => el.id === elementId);
      if (!element) return prev;

      const stageElements = prev.filter(el => el.stageId === element.stageId);
      const sortedElements = stageElements.sort((a, b) => a.order - b.order);
      const currentIndex = sortedElements.findIndex(el => el.id === elementId);

      if (direction === 'up' && currentIndex > 0) {
        const temp = sortedElements[currentIndex].order;
        sortedElements[currentIndex].order = sortedElements[currentIndex - 1].order;
        sortedElements[currentIndex - 1].order = temp;
      } else if (direction === 'down' && currentIndex < sortedElements.length - 1) {
        const temp = sortedElements[currentIndex].order;
        sortedElements[currentIndex].order = sortedElements[currentIndex + 1].order;
        sortedElements[currentIndex + 1].order = temp;
      }

      return prev.map(el => {
        const updated = sortedElements.find(se => se.id === el.id);
        return updated ? { ...el, order: updated.order } : el;
      });
    });
  }, [saveToHistory]);

  const addStage = useCallback(() => {
    const newStage: VisualStage = {
      id: uuidv4(),
      title: `Etapa ${stages.length + 1}`,
      order: stages.length,
      type: 'result',
      settings: {
        showHeader: true,
        showProgress: false,
        allowBack: false
      }
    };

    setStages(prev => [...prev, newStage]);
    return newStage.id;
  }, [stages.length]);

  const setActiveStage = useCallback((stageId: string) => {
    setActiveStageId(stageId);
  }, []);

  const replaceAllElements = useCallback((newElements: VisualElement[]) => {
    saveToHistory();
    setElements(newElements);
  }, [saveToHistory]);

  const canUndo = historyIndex >= 0;
  const canRedo = historyIndex < history.length - 1;

  const undo = useCallback(() => {
    if (canUndo) {
      const previousState = history[historyIndex];
      setElements(previousState);
      setHistoryIndex(prev => prev - 1);
    }
  }, [canUndo, history, historyIndex]);

  const redo = useCallback(() => {
    if (canRedo) {
      const nextState = history[historyIndex + 1];
      setElements(nextState);
      setHistoryIndex(prev => prev + 1);
    }
  }, [canRedo, history, historyIndex]);

  return {
    elements,
    stages,
    activeStageId,
    addElement,
    updateElement,
    deleteElement,
    moveElement,
    addStage,
    setActiveStage,
    replaceAllElements,
    canUndo,
    canRedo,
    undo,
    redo
  };
};
