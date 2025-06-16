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
  visible?: boolean;
  locked?: boolean;
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
      case 'brand-header':
        return {
          background: 'linear-gradient(to bottom, #ffffff, #f9fafb)',
          padding: '2rem 1rem',
          textAlign: 'center' as const,
          width: '100%',
        };
      case 'brand-logo':
        return {
          width: '120px',
          height: '50px',
          margin: '0 auto 0.5rem auto',
          display: 'block',
        };
      case 'brand-divider':
        return {
          height: '3px',
          backgroundColor: '#B89B7A',
          borderRadius: '9999px',
          width: '300px',
          maxWidth: '90%',
          margin: '0 auto',
        };
      case 'quiz-hero-title':
        return {
          fontSize: '2rem',
          fontWeight: '400',
          textAlign: 'center' as const,
          color: '#432818',
          fontFamily: '"Playfair Display", serif',
          lineHeight: '1.2',
          marginBottom: '2rem',
          padding: '0 1rem',
        };
      case 'quiz-hero-image':
        return {
          width: '100%',
          maxWidth: '300px',
          aspectRatio: '1.47',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          margin: '1rem auto',
          display: 'block',
        };
      case 'quiz-description':
        return {
          fontSize: '0.875rem',
          lineHeight: '1.6',
          color: '#6b7280',
          textAlign: 'center' as const,
          padding: '0 1rem',
          marginBottom: '2rem',
        };
      case 'quiz-form':
        return {
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto',
          padding: '0 1rem',
        };
      case 'quiz-input':
        return {
          width: '100%',
          padding: '0.625rem',
          backgroundColor: '#FEFEFE',
          borderRadius: '0.375rem',
          border: '2px solid #B89B7A',
          fontSize: '1rem',
          marginBottom: '1.5rem',
        };
      case 'quiz-button':
        return {
          width: '100%',
          padding: '0.75rem 1rem',
          backgroundColor: '#B89B7A',
          color: 'white',
          borderRadius: '0.375rem',
          border: 'none',
          fontSize: '0.875rem',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
        };
      case 'question-header':
        return {
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '1rem',
          position: 'sticky',
          top: '0',
          zIndex: '10',
        };
      case 'progress-bar':
        return {
          width: '100%',
          height: '8px',
          backgroundColor: '#f3f4f6',
          borderRadius: '9999px',
          marginBottom: '2rem',
        };
      case 'progress-fill':
        return {
          height: '100%',
          backgroundColor: '#B89B7A',
          borderRadius: '9999px',
          transition: 'width 0.3s ease',
        };
      case 'question-title':
        return {
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center' as const,
          color: '#432818',
          marginBottom: '2rem',
          fontFamily: '"Playfair Display", serif',
        };
      case 'question-options-grid':
        return {
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          margin: '2rem 0',
        };
      case 'question-option-card':
        return {
          padding: '1.5rem',
          border: '2px solid #e5e7eb',
          borderRadius: '0.75rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          textAlign: 'center' as const,
          backgroundColor: 'white',
        };
      case 'result-hero':
        return {
          background: 'linear-gradient(135deg, #B89B7A 0%, #8F7A6A 100%)',
          color: 'white',
          padding: '3rem 2rem',
          textAlign: 'center' as const,
          borderRadius: '1rem',
          margin: '2rem auto',
          maxWidth: '600px',
        };
      case 'result-title':
        return {
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          fontFamily: '"Playfair Display", serif',
        };
      case 'result-subtitle':
        return {
          fontSize: '1.25rem',
          opacity: '0.9',
          marginBottom: '2rem',
        };
      case 'offer-section':
        return {
          backgroundColor: '#FAF9F7',
          padding: '3rem 2rem',
          borderRadius: '1rem',
          margin: '2rem 0',
          textAlign: 'center' as const,
        };
      case 'price-highlight':
        return {
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#16a34a',
          marginBottom: '1rem',
          fontFamily: '"Playfair Display", serif',
        };
      case 'cta-button':
        return {
          backgroundColor: '#B89B7A',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '0.5rem',
          border: 'none',
          fontSize: '1.125rem',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(184, 155, 122, 0.3)',
          transition: 'all 0.3s ease',
          transform: 'translateY(0)',
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
      case 'brand-header':
        return { text: 'Header da Marca' };
      case 'brand-logo':
        return { 
          image: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_70,w_120,h_50,c_fit/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
          alt: 'Logo Gisele Galvão'
        };
      case 'brand-divider':
        return { text: '' };
      case 'quiz-hero-title':
        return { 
          text: 'Chega de um guarda-roupa lotado e da sensação de que nada combina com Você.',
          highlight: 'Chega'
        };
      case 'quiz-hero-image':
        return { 
          image: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_85,w_300,c_limit/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp',
          alt: 'Descubra seu estilo predominante e transforme seu guarda-roupa'
        };
      case 'quiz-description':
        return { 
          text: 'Em poucos minutos, descubra seu Estilo Predominante — e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.'
        };
      case 'quiz-form':
        return { text: 'Formulário de entrada' };
      case 'quiz-input':
        return { 
          placeholder: 'Digite seu nome',
          label: 'NOME *',
          required: true
        };
      case 'quiz-button':
        return { 
          text: 'Quero Descobrir meu Estilo Agora!',
          disabled_text: 'Digite seu nome para continuar'
        };
      case 'question-header':
        return { text: 'Cabeçalho da Questão' };
      case 'progress-bar':
        return { progress: 40 };
      case 'question-title':
        return { text: 'Qual dessas opções mais combina com você?' };
      case 'question-options-grid':
        return { text: 'Grid de Opções' };
      case 'question-option-card':
        return { 
          text: 'Opção de Resposta',
          image: 'https://via.placeholder.com/150x150?text=Opção',
          description: 'Descrição da opção'
        };
      case 'result-hero':
        return { text: 'Seção Hero do Resultado' };
      case 'result-title':
        return { text: 'Seu Estilo: Elegante' };
      case 'result-subtitle':
        return { text: 'Você tem um gosto refinado e sofisticado que se reflete em suas escolhas de moda.' };
      case 'offer-section':
        return { text: 'Seção de Oferta' };
      case 'price-highlight':
        return { 
          text: 'R$ 247',
          original_price: 'R$ 497',
          discount: '50% OFF'
        };
      case 'cta-button':
        return { 
          text: 'Garantir Minha Vaga Agora',
          href: '#comprar'
        };
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
      visible: true,
      locked: false,
    };

    const newElements = [...editorState.elements];
    if (index !== undefined) {
      newElements.splice(index, 0, newElement);
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
          { type: 'brand-header', order: 0 },
          { type: 'brand-logo', order: 1 },
          { type: 'brand-divider', order: 2 },
          { type: 'quiz-hero-title', order: 3 },
          { type: 'quiz-hero-image', order: 4 },
          { type: 'quiz-description', order: 5 },
          { type: 'quiz-form', order: 6 },
          { type: 'quiz-input', order: 7 },
          { type: 'quiz-button', order: 8 },
        ];
        break;
      case 'quiz-question':
        templateElements = [
          { type: 'question-header', order: 0 },
          { type: 'progress-bar', order: 1 },
          { type: 'question-title', order: 2 },
          { type: 'question-options-grid', order: 3 },
          { type: 'question-option-card', order: 4 },
          { type: 'question-option-card', order: 5 },
          { type: 'question-option-card', order: 6 },
          { type: 'question-option-card', order: 7 },
        ];
        break;
      case 'quiz-result':
        templateElements = [
          { type: 'brand-header', order: 0 },
          { type: 'result-hero', order: 1 },
          { type: 'result-title', order: 2 },
          { type: 'result-subtitle', order: 3 },
          { type: 'quiz-hero-image', order: 4 },
          { type: 'offer-section', order: 5 },
          { type: 'cta-button', order: 6 },
        ];
        break;
      case 'offer-page':
        templateElements = [
          { type: 'brand-header', order: 0 },
          { type: 'quiz-hero-title', order: 1 },
          { type: 'price-highlight', order: 2 },
          { type: 'offer-section', order: 3 },
          { type: 'quiz-description', order: 4 },
          { type: 'cta-button', order: 5 },
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
      visible: true,
      locked: false,
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
    
    newElements.forEach((el, i) => el.order = i);
    
    saveState(newElements);
    setEditorState(prev => ({ ...prev, selectedElementId: newElement.id }));
  }, [editorState.elements]);

  const deleteElement = useCallback((id: string) => {
    const newElements = editorState.elements.filter(el => el.id !== id);
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
    const data = {
      elements: editorState.elements,
      timestamp: new Date().toISOString(),
    };
    
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
