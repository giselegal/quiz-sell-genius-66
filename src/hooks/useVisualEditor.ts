
import { useState, useCallback, useRef } from 'react';
import { VisualElement, VisualStage, VisualEditorState, BlockType } from '@/types/visualEditor';
import { toast } from '@/components/ui/use-toast';

export const useVisualEditor = () => {
  const [state, setState] = useState<VisualEditorState>({
    elements: [],
    stages: [{
      id: 'stage-1',
      title: 'Etapa 1',
      order: 0,
      type: 'quiz',
      settings: {
        showHeader: true,
        showProgress: true,
        allowBack: true
      }
    }],
    activeStageId: 'stage-1',
    history: [],
    historyIndex: -1
  });

  const saveToHistory = useCallback(() => {
    setState(prev => {
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      return {
        ...prev,
        history: [...newHistory, { ...prev }],
        historyIndex: newHistory.length
      };
    });
  }, []);

  const addElement = useCallback((type: BlockType, stageId?: string, position?: number) => {
    const elementId = `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const targetStageId = stageId || state.activeStageId || state.stages[0]?.id;
    
    if (!targetStageId) return elementId;

    const newElement: VisualElement = {
      id: elementId,
      type,
      stageId: targetStageId,
      order: position ?? state.elements.filter(el => el.stageId === targetStageId).length,
      content: getDefaultContent(type),
      style: getDefaultStyle(type),
      visible: true,
      locked: false
    };

    saveToHistory();
    setState(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));

    return elementId;
  }, [state.activeStageId, state.stages, state.elements, saveToHistory]);

  const updateElement = useCallback((elementId: string, updates: Partial<VisualElement>) => {
    saveToHistory();
    setState(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      )
    }));
  }, [saveToHistory]);

  const deleteElement = useCallback((elementId: string) => {
    saveToHistory();
    setState(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId)
    }));
  }, [saveToHistory]);

  const moveElement = useCallback((elementId: string, direction: 'up' | 'down') => {
    saveToHistory();
    setState(prev => {
      const element = prev.elements.find(el => el.id === elementId);
      if (!element) return prev;

      const stageElements = prev.elements
        .filter(el => el.stageId === element.stageId)
        .sort((a, b) => a.order - b.order);

      const currentIndex = stageElements.findIndex(el => el.id === elementId);
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

      if (newIndex < 0 || newIndex >= stageElements.length) return prev;

      const updatedElements = prev.elements.map(el => {
        if (el.id === elementId) {
          return { ...el, order: stageElements[newIndex].order };
        }
        if (el.id === stageElements[newIndex].id) {
          return { ...el, order: element.order };
        }
        return el;
      });

      return { ...prev, elements: updatedElements };
    });
  }, [saveToHistory]);

  const addStage = useCallback(() => {
    const stageId = `stage-${Date.now()}`;
    const newStage: VisualStage = {
      id: stageId,
      title: `Etapa ${state.stages.length + 1}`,
      order: state.stages.length,
      type: 'quiz',
      settings: {
        showHeader: true,
        showProgress: true,
        allowBack: true
      }
    };

    saveToHistory();
    setState(prev => ({
      ...prev,
      stages: [...prev.stages, newStage],
      activeStageId: stageId
    }));

    return stageId;
  }, [state.stages.length, saveToHistory]);

  const setActiveStage = useCallback((stageId: string) => {
    setState(prev => ({
      ...prev,
      activeStageId: stageId
    }));
  }, []);

  const saveProject = useCallback(async () => {
    try {
      localStorage.setItem('visual-editor-project', JSON.stringify(state));
      toast({
        title: "Projeto salvo",
        description: "Todas as alterações foram salvas com sucesso."
      });
      return true;
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o projeto.",
        variant: "destructive"
      });
      return false;
    }
  }, [state]);

  const undo = useCallback(() => {
    if (state.historyIndex > 0) {
      setState(prev => ({
        ...prev.history[prev.historyIndex - 1],
        historyIndex: prev.historyIndex - 1
      }));
    }
  }, [state.historyIndex]);

  const redo = useCallback(() => {
    if (state.historyIndex < state.history.length - 1) {
      setState(prev => ({
        ...prev.history[prev.historyIndex + 1],
        historyIndex: prev.historyIndex + 1
      }));
    }
  }, [state.historyIndex, state.history.length]);

  return {
    elements: state.elements,
    stages: state.stages,
    activeStageId: state.activeStageId,
    addElement,
    updateElement,
    deleteElement,
    moveElement,
    addStage,
    setActiveStage,
    saveProject,
    canUndo: state.historyIndex > 0,
    canRedo: state.historyIndex < state.history.length - 1,
    undo,
    redo
  };
};

const getDefaultContent = (type: BlockType): any => {
  switch (type) {
    case 'text':
      return { text: 'Clique para editar este texto' };
    case 'title':
      return { text: 'Título Principal', level: 'h2' };
    case 'button':
      return { text: 'Clique Aqui', href: '#' };
    case 'image':
      return { src: 'https://via.placeholder.com/400x200', alt: 'Imagem' };
    case 'input':
      return { placeholder: 'Digite aqui...', type: 'text' };
    case 'email':
      return { placeholder: 'seu@email.com', type: 'email' };
    case 'phone':
      return { placeholder: '(11) 99999-9999', type: 'tel' };
    default:
      return {};
  }
};

const getDefaultStyle = (type: BlockType): any => {
  switch (type) {
    case 'title':
      return { fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', margin: '1rem 0' };
    case 'text':
      return { fontSize: '1rem', lineHeight: '1.5', margin: '0.5rem 0' };
    case 'button':
      return { 
        backgroundColor: 'var(--primary-color, #3b82f6)', 
        color: 'white', 
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer'
      };
    case 'image':
      return { width: '100%', height: 'auto', borderRadius: '0.5rem' };
    default:
      return {};
  }
};
