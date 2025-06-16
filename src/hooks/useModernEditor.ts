import { useState, useCallback } from 'react';

export interface EditorElement {
  id: string;
  type: string;
  content: {
    text?: string;
    title?: string;
    subtitle?: string;
    image?: string;
    alt?: string;
    href?: string;
    buttonText?: string;
    options?: Array<{
      text: string;
      image?: string;
      value?: string;
    }>;
    [key: string]: any;
  };
  style: {
    [key: string]: any;
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: "left" | "center" | "right";
    borderRadius?: string;
    border?: string;
    display?: string;
  };
  order: number;
  stepId: string;
}

interface EditorState {
  elements: EditorElement[];
  selectedElementId: string | null;
  isPreviewMode: boolean;
  history: EditorElement[][];
  historyIndex: number;
}

export const useModernEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>({
    elements: [],
    selectedElementId: null,
    isPreviewMode: false,
    history: [[]],
    historyIndex: 0,
  });

  const generateId = () => `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const getDefaultStyle = (type: string) => {
    const baseStyles = {
      padding: '1rem',
      margin: '0.5rem 0',
    };

    switch (type) {
      case 'heading':
      case 'quiz-title':
        return {
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center' as const,
          color: '#1a1a1a',
          marginBottom: '1rem',
          ...baseStyles,
        };
      case 'text':
      case 'quiz-description':
        return {
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#4a4a4a',
          textAlign: 'left' as const,
          ...baseStyles,
        };
      case 'button':
      case 'start-button':
      case 'cta-button':
      case 'purchase-button':
        return {
          backgroundColor: '#007bff',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '600',
          textAlign: 'center' as const,
          display: 'inline-block',
          ...baseStyles,
        };
      case 'image':
      case 'logo':
        return {
          width: '100%',
          height: 'auto',
          borderRadius: '0.5rem',
          ...baseStyles,
        };
      case 'question-title':
        return {
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center' as const,
          color: '#1a1a1a',
          marginBottom: '2rem',
          ...baseStyles,
        };
      case 'question-options':
        return {
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          ...baseStyles,
        };
      default:
        return {
          ...baseStyles,
          textAlign: 'left' as const,
        };
    }
  };

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'heading':
        return { text: 'Novo Título' };
      case 'text':
        return { text: 'Novo texto. Clique para editar.' };
      case 'button':
        return { text: 'Clique aqui', href: '#' };
      case 'image':
        return { 
          image: 'https://via.placeholder.com/400x300', 
          alt: 'Imagem' 
        };
      case 'logo':
        return { 
          image: 'https://via.placeholder.com/200x100?text=LOGO', 
          alt: 'Logo' 
        };
      case 'quiz-title':
        return { text: 'Descubra Seu Estilo Pessoal' };
      case 'quiz-description':
        return { text: 'Responda algumas perguntas e descubra qual estilo combina mais com você!' };
      case 'start-button':
        return { text: 'Começar Quiz', href: '#quiz' };
      case 'question-title':
        return { text: 'Qual dessas opções mais combina com você?' };
      case 'question-options':
        return { 
          options: [
            { text: 'Opção 1', image: 'https://via.placeholder.com/150x150?text=1', value: 'option1' },
            { text: 'Opção 2', image: 'https://via.placeholder.com/150x150?text=2', value: 'option2' },
            { text: 'Opção 3', image: 'https://via.placeholder.com/150x150?text=3', value: 'option3' },
            { text: 'Opção 4', image: 'https://via.placeholder.com/150x150?text=4', value: 'option4' },
          ]
        };
      case 'result-display':
        return { text: 'Seu Estilo: Elegante', subtitle: 'Você tem um gosto refinado e sofisticado' };
      case 'offer-preview':
        return { text: 'Transforme seu guarda-roupa', subtitle: 'Consultoria personalizada baseada no seu estilo' };
      case 'cta-button':
        return { text: 'Ver Oferta Especial', href: '#offer' };
      case 'offer-hero':
        return { text: 'Oferta Especial para o Seu Estilo', subtitle: 'Consultoria personalizada com 50% de desconto' };
      case 'pricing':
        return { 
          text: 'De R$ 497 por apenas R$ 247',
          subtitle: 'Oferta válida por tempo limitado'
        };
      case 'benefits-list':
        return { 
          text: 'O que você vai receber:',
          options: [
            { text: '✓ Análise completa do seu estilo', value: 'analise' },
            { text: '✓ Consultoria personalizada', value: 'consultoria' },
            { text: '✓ Guia de compras exclusivo', value: 'guia' },
            { text: '✓ Suporte por 30 dias', value: 'suporte' },
          ]
        };
      case 'purchase-button':
        return { text: 'Garantir Minha Vaga Agora', href: '#comprar' };
      default:
        return { text: 'Conteúdo' };
    }
  };

  const saveState = (newElements: EditorElement[]) => {
    setEditorState(prev => {
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(newElements);
      return {
        ...prev,
        elements: newElements,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  };

  const addElement = useCallback((type: string, index?: number, stepId?: string) => {
    const newElement: EditorElement = {
      id: generateId(),
      type,
      content: getDefaultContent(type),
      style: getDefaultStyle(type),
      order: index !== undefined ? index : editorState.elements.length,
      stepId: stepId || 'default',
    };

    const newElements = [...editorState.elements];
    if (index !== undefined) {
      newElements.splice(index, 0, newElement);
      // Reorder elements after insertion
      newElements.forEach((el, i) => el.order = i);
    } else {
      newElements.push(newElement);
    }

    saveState(newElements);
    setEditorState(prev => ({ ...prev, selectedElementId: newElement.id }));
    
    return newElement.id;
  }, [editorState.elements]);

  const addStepTemplate = useCallback((stepType: string, stepId: string) => {
    let templateElements: Partial<EditorElement>[] = [];

    switch (stepType) {
      case 'quiz-intro':
        templateElements = [
          { type: 'header', order: 0 },
          { type: 'logo', order: 1 },
          { type: 'quiz-title', order: 2 },
          { type: 'quiz-description', order: 3 },
          { type: 'image', order: 4 },
          { type: 'start-button', order: 5 },
        ];
        break;
      case 'quiz-question':
        templateElements = [
          { type: 'header', order: 0 },
          { type: 'progress-bar', order: 1 },
          { type: 'question-title', order: 2 },
          { type: 'question-options', order: 3 },
          { type: 'navigation-buttons', order: 4 },
        ];
        break;
      case 'quiz-result':
        templateElements = [
          { type: 'header', order: 0 },
          { type: 'result-display', order: 1 },
          { type: 'result-description', order: 2 },
          { type: 'image', order: 3 },
          { type: 'offer-preview', order: 4 },
          { type: 'cta-button', order: 5 },
        ];
        break;
      case 'offer-page':
        templateElements = [
          { type: 'header', order: 0 },
          { type: 'offer-hero', order: 1 },
          { type: 'pricing', order: 2 },
          { type: 'benefits-list', order: 3 },
          { type: 'testimonials', order: 4 },
          { type: 'guarantee', order: 5 },
          { type: 'purchase-button', order: 6 },
        ];
        break;
    }

    const newElements = templateElements.map(template => ({
      id: generateId(),
      type: template.type!,
      content: getDefaultContent(template.type!),
      style: getDefaultStyle(template.type!),
      order: template.order!,
      stepId,
    }));

    const allElements = [...editorState.elements, ...newElements];
    saveState(allElements);
  }, [editorState.elements]);

  const updateElement = useCallback((id: string, updates: Partial<EditorElement>) => {
    const newElements = editorState.elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    );
    saveState(newElements);
  }, [editorState.elements]);

  const duplicateElement = useCallback((id: string) => {
    const element = editorState.elements.find(el => el.id === id);
    if (!element) return;

    const newElement: EditorElement = {
      ...element,
      id: generateId(),
      order: element.order + 1,
    };

    const newElements = [...editorState.elements];
    const insertIndex = newElements.findIndex(el => el.id === id) + 1;
    newElements.splice(insertIndex, 0, newElement);
    
    // Reorder elements after insertion
    newElements.forEach((el, i) => el.order = i);
    
    saveState(newElements);
    setEditorState(prev => ({ ...prev, selectedElementId: newElement.id }));
  }, [editorState.elements]);

  const deleteElement = useCallback((id: string) => {
    const newElements = editorState.elements.filter(el => el.id !== id);
    // Reorder elements after deletion
    newElements.forEach((el, i) => el.order = i);
    
    saveState(newElements);
    setEditorState(prev => ({ 
      ...prev, 
      selectedElementId: prev.selectedElementId === id ? null : prev.selectedElementId 
    }));
  }, [editorState.elements]);

  const selectElement = useCallback((id: string | null) => {
    setEditorState(prev => ({ ...prev, selectedElementId: id }));
  }, []);

  const togglePreview = useCallback(() => {
    setEditorState(prev => ({ ...prev, isPreviewMode: !prev.isPreviewMode }));
  }, []);

  const undo = useCallback(() => {
    setEditorState(prev => {
      if (prev.historyIndex > 0) {
        const newIndex = prev.historyIndex - 1;
        return {
          ...prev,
          elements: prev.history[newIndex],
          historyIndex: newIndex,
          selectedElementId: null,
        };
      }
      return prev;
    });
  }, []);

  const redo = useCallback(() => {
    setEditorState(prev => {
      if (prev.historyIndex < prev.history.length - 1) {
        const newIndex = prev.historyIndex + 1;
        return {
          ...prev,
          elements: prev.history[newIndex],
          historyIndex: newIndex,
          selectedElementId: null,
        };
      }
      return prev;
    });
  }, []);

  const save = useCallback(async () => {
    // Simulate save operation
    const data = {
      elements: editorState.elements,
      timestamp: new Date().toISOString(),
    };
    
    // Here you would typically send data to your backend
    console.log('Saving editor data:', data);
    
    return data;
  }, [editorState.elements]);

  const getElementsByStep = useCallback((stepId: string) => {
    return editorState.elements.filter(el => el.stepId === stepId);
  }, [editorState.elements]);

  return {
    elements: editorState.elements,
    selectedElementId: editorState.selectedElementId,
    isPreviewMode: editorState.isPreviewMode,
    canUndo: editorState.historyIndex > 0,
    canRedo: editorState.historyIndex < editorState.history.length - 1,
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
  };
};
