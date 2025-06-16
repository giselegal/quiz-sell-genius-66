
import { useState, useCallback } from 'react';
import type { VisualEditorState, ElementUpdate, CanvasElement } from '@/types/visualEditor';
import { generateId } from '@/utils/idGenerator';

interface VisualEditorData {
  editorState: VisualEditorState;
  pageInfo: {
    title: string;
    description: string;
    slug: string;
    published: boolean;
  };
}

export const useEditorState = (initialData?: VisualEditorData) => {
  const [editorState, setEditorState] = useState<VisualEditorState>(() => {
    if (initialData?.editorState) {
      return initialData.editorState;
    }
    
    return {
      elements: [],
      stages: [],
      activeStageId: null,
      history: [],
      historyIndex: -1,
      globalStyles: {
        backgroundColor: '#ffffff',
        fontFamily: 'Inter, sans-serif',
        primaryColor: '#3b82f6',
        secondaryColor: '#6b7280',
        containerMaxWidth: '1200px',
        customCSS: ''
      }
    };
  });

  const addElement = useCallback((componentType: string, position?: number): string => {
    const newElement: CanvasElement = {
      id: generateId(),
      type: componentType as any,
      stageId: editorState.activeStageId || 'default',
      order: position ?? editorState.elements.length,
      content: {},
      style: {},
      visible: true,
      locked: false
    };

    setEditorState(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));

    return newElement.id;
  }, [editorState.activeStageId, editorState.elements.length]);

  const updateElement = useCallback((elementId: string, updates: ElementUpdate) => {
    setEditorState(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      )
    }));
  }, []);

  const removeElement = useCallback((elementId: string) => {
    setEditorState(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId)
    }));
  }, []);

  const moveElement = useCallback((elementId: string, direction: "up" | "down") => {
    setEditorState(prev => {
      const elements = [...prev.elements];
      const index = elements.findIndex(el => el.id === elementId);
      
      if (index === -1) return prev;
      
      const newIndex = direction === "up" ? index - 1 : index + 1;
      
      if (newIndex < 0 || newIndex >= elements.length) return prev;
      
      [elements[index], elements[newIndex]] = [elements[newIndex], elements[index]];
      
      return { ...prev, elements };
    });
  }, []);

  const duplicateElement = useCallback((elementId: string) => {
    setEditorState(prev => {
      const element = prev.elements.find(el => el.id === elementId);
      if (!element) return prev;
      
      const duplicated: CanvasElement = {
        ...element,
        id: generateId(),
        order: element.order + 1
      };
      
      return {
        ...prev,
        elements: [...prev.elements, duplicated]
      };
    });
  }, []);

  const updateGlobalStyles = useCallback((styles: any) => {
    setEditorState(prev => ({
      ...prev,
      globalStyles: { ...prev.globalStyles, ...styles }
    }));
  }, []);

  const reorderElements = useCallback((sourceIndex: number, destinationIndex: number) => {
    setEditorState(prev => {
      const elements = [...prev.elements];
      const [removed] = elements.splice(sourceIndex, 1);
      elements.splice(destinationIndex, 0, removed);
      
      return { ...prev, elements };
    });
  }, []);

  const exportState = useCallback(() => {
    return JSON.stringify(editorState);
  }, [editorState]);

  const importState = useCallback((stateJson: string) => {
    try {
      const newState = JSON.parse(stateJson);
      setEditorState(newState);
    } catch (error) {
      console.error('Failed to import state:', error);
    }
  }, []);

  return {
    editorState,
    addElement,
    updateElement,
    removeElement,
    moveElement,
    duplicateElement,
    updateGlobalStyles,
    reorderElements,
    exportState,
    importState
  };
};
