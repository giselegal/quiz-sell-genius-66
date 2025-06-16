
import { useState, useCallback } from 'react';

export interface EditorElement {
  id: string;
  type: string;
  stepId: string;
  order: number;
  content: {
    text?: string;
    src?: string;
    alt?: string;
    href?: string;
    options?: string[];
    progress?: number;
    [key: string]: any;
  };
  style: {
    backgroundColor?: string;
    color?: string;
    padding?: string;
    margin?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
    [key: string]: any;
  };
}

export const useModernEditor = () => {
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [history, setHistory] = useState<EditorElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Template components for different step types
  const getTemplateComponents = (stepType: string, stepId: string): EditorElement[] => {
    const baseId = Date.now();
    
    switch (stepType) {
      case 'quiz-intro':
        return [
          {
            id: `${baseId}-1`,
            type: 'quiz-title',
            stepId,
            order: 1,
            content: { text: 'Descubra Seu Estilo Pessoal' },
            style: { textAlign: 'center', fontSize: '3rem', fontWeight: 'bold' }
          },
          {
            id: `${baseId}-2`,
            type: 'quiz-description',
            stepId,
            order: 2,
            content: { text: 'Responda algumas perguntas e descubra qual estilo combina mais com você.' },
            style: { textAlign: 'center', fontSize: '1.125rem' }
          },
          {
            id: `${baseId}-3`,
            type: 'start-button',
            stepId,
            order: 3,
            content: { text: 'Começar Quiz' },
            style: { textAlign: 'center' }
          }
        ];
        
      case 'quiz-question':
        return [
          {
            id: `${baseId}-1`,
            type: 'progress-bar',
            stepId,
            order: 1,
            content: { progress: 25 },
            style: {}
          },
          {
            id: `${baseId}-2`,
            type: 'question-title',
            stepId,
            order: 2,
            content: { text: 'Qual dessas opções mais combina com você?' },
            style: { textAlign: 'center', fontSize: '1.25rem', fontWeight: '600' }
          },
          {
            id: `${baseId}-3`,
            type: 'question-options',
            stepId,
            order: 3,
            content: { options: ['Opção A', 'Opção B', 'Opção C', 'Opção D'] },
            style: {}
          }
        ];
        
      case 'quiz-result':
        return [
          {
            id: `${baseId}-1`,
            type: 'heading',
            stepId,
            order: 1,
            content: { text: 'Seu Resultado' },
            style: { textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }
          },
          {
            id: `${baseId}-2`,
            type: 'result-display',
            stepId,
            order: 2,
            content: { text: 'Seu estilo é: Elegante' },
            style: { textAlign: 'center', fontSize: '1.5rem' }
          },
          {
            id: `${baseId}-3`,
            type: 'cta-button',
            stepId,
            order: 3,
            content: { text: 'Ver Oferta Especial' },
            style: { textAlign: 'center' }
          }
        ];
        
      case 'offer-page':
        return [
          {
            id: `${baseId}-1`,
            type: 'offer-hero',
            stepId,
            order: 1,
            content: { text: 'Oferta Especial para Você!' },
            style: { textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold' }
          },
          {
            id: `${baseId}-2`,
            type: 'pricing',
            stepId,
            order: 2,
            content: { text: 'De R$ 297 por apenas R$ 97' },
            style: { textAlign: 'center', fontSize: '1.5rem' }
          },
          {
            id: `${baseId}-3`,
            type: 'purchase-button',
            stepId,
            order: 3,
            content: { text: 'Comprar Agora' },
            style: { textAlign: 'center' }
          }
        ];
        
      default:
        return [];
    }
  };

  const addElement = useCallback((type: string, position?: number, stepId?: string) => {
    const newElement: EditorElement = {
      id: `element-${Date.now()}`,
      type,
      stepId: stepId || 'default',
      order: position !== undefined ? position : elements.length,
      content: {
        text: type === 'heading' ? 'Novo Título' : 
              type === 'text' ? 'Novo texto' :
              type === 'button' ? 'Botão' : '',
        ...(type === 'image' && { src: '', alt: 'Imagem' }),
        ...(type === 'question-options' && { options: ['Opção 1', 'Opção 2'] })
      },
      style: {
        backgroundColor: '#ffffff',
        color: '#000000',
        padding: '16px',
        margin: '0px'
      }
    };

    setElements(prev => [...prev, newElement]);
    setSelectedElementId(newElement.id);
    
    return newElement.id;
  }, [elements.length]);

  const addStepTemplate = useCallback((stepType: string, stepId: string) => {
    const templateComponents = getTemplateComponents(stepType, stepId);
    setElements(prev => [...prev, ...templateComponents]);
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<EditorElement>) => {
    setElements(prev => prev.map(element => 
      element.id === id ? { ...element, ...updates } : element
    ));
  }, []);

  const duplicateElement = useCallback((id: string) => {
    const elementToDuplicate = elements.find(el => el.id === id);
    if (!elementToDuplicate) return;

    const newElement: EditorElement = {
      ...elementToDuplicate,
      id: `element-${Date.now()}`,
      order: elementToDuplicate.order + 1
    };

    setElements(prev => [...prev, newElement]);
    return newElement.id;
  }, [elements]);

  const deleteElement = useCallback((id: string) => {
    setElements(prev => prev.filter(element => element.id !== id));
    if (selectedElementId === id) {
      setSelectedElementId(null);
    }
  }, [selectedElementId]);

  const selectElement = useCallback((id: string | null) => {
    setSelectedElementId(id);
  }, []);

  const togglePreview = useCallback(() => {
    setIsPreviewMode(prev => !prev);
  }, []);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setElements(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setElements(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const save = useCallback(async () => {
    // Simulate save operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          elements,
          timestamp: new Date().toISOString()
        });
      }, 500);
    });
  }, [elements]);

  const getElementsByStep = useCallback((stepId: string) => {
    return elements.filter(element => element.stepId === stepId);
  }, [elements]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return {
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
    getElementsByStep
  };
};
