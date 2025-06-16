import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StepType } from './useStepsManager';

export interface EditorElement {
  id: string;
  type: string;
  content: Record<string, any>;
  style: Record<string, any>;
  position: { x: number; y: number };
  visible: boolean;
  locked: boolean;
  order: number;
  stepId?: string; // Associate element with step
}

export interface EditorState {
  elements: EditorElement[];
  selectedElementId: string | null;
  isPreviewMode: boolean;
  history: EditorElement[][];
  historyIndex: number;
}

export const useModernEditor = (initialData?: any) => {
  const [state, setState] = useState<EditorState>({
    elements: initialData?.elements || [],
    selectedElementId: null,
    isPreviewMode: false,
    history: [initialData?.elements || []],
    historyIndex: 0
  });

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setInterval(() => {
      if (state.elements.length > 0) {
        localStorage.setItem('modern-editor-autosave', JSON.stringify({
          elements: state.elements,
          timestamp: Date.now()
        }));
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveTimer);
  }, [state.elements]);

  const saveToHistory = useCallback((elements: EditorElement[]) => {
    setState(prev => {
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push([...elements]);
      
      return {
        ...prev,
        history: newHistory.slice(-50), // Keep last 50 states
        historyIndex: Math.min(newHistory.length - 1, 49)
      };
    });
  }, []);

  const addElement = useCallback((type: string, position?: { x: number; y: number }, stepId?: string) => {
    const newElement: EditorElement = {
      id: uuidv4(),
      type,
      content: getDefaultContent(type),
      style: {},
      position: position || { x: 0, y: 0 },
      visible: true,
      locked: false,
      order: state.elements.length,
      stepId
    };

    const newElements = [...state.elements, newElement];
    
    setState(prev => ({
      ...prev,
      elements: newElements,
      selectedElementId: newElement.id
    }));

    saveToHistory(newElements);
    
    return newElement.id;
  }, [state.elements, saveToHistory]);

  const addStepTemplate = useCallback((stepType: StepType, stepId: string) => {
    const templateElements = getStepTemplate(stepType, stepId);
    const newElements = [...state.elements, ...templateElements];
    
    setState(prev => ({
      ...prev,
      elements: newElements
    }));

    saveToHistory(newElements);
    
    return templateElements.map(el => el.id);
  }, [state.elements, saveToHistory]);

  const getStepTemplate = (stepType: StepType, stepId: string): EditorElement[] => {
    const baseOrder = state.elements.length;
    
    switch (stepType) {
      case 'quiz':
        return [
          {
            id: uuidv4(),
            type: 'header',
            content: getDefaultContent('header'),
            style: {},
            position: { x: 0, y: 0 },
            visible: true,
            locked: false,
            order: baseOrder,
            stepId
          },
          {
            id: uuidv4(),
            type: 'quiz-header',
            content: getDefaultContent('quiz-header'),
            style: {},
            position: { x: 0, y: 100 },
            visible: true,
            locked: false,
            order: baseOrder + 1,
            stepId
          },
          {
            id: uuidv4(),
            type: 'quiz-question',
            content: getDefaultContent('quiz-question'),
            style: {},
            position: { x: 0, y: 200 },
            visible: true,
            locked: false,
            order: baseOrder + 2,
            stepId
          },
          {
            id: uuidv4(),
            type: 'terms',
            content: getDefaultContent('terms'),
            style: {},
            position: { x: 0, y: 300 },
            visible: true,
            locked: false,
            order: baseOrder + 3,
            stepId
          }
        ];
        
      case 'result':
        return [
          {
            id: uuidv4(),
            type: 'header',
            content: getDefaultContent('header'),
            style: {},
            position: { x: 0, y: 0 },
            visible: true,
            locked: false,
            order: baseOrder,
            stepId
          },
          {
            id: uuidv4(),
            type: 'result-display',
            content: getDefaultContent('result-display'),
            style: {},
            position: { x: 0, y: 100 },
            visible: true,
            locked: false,
            order: baseOrder + 1,
            stepId
          },
          {
            id: uuidv4(),
            type: 'marquee',
            content: getDefaultContent('marquee'),
            style: {},
            position: { x: 0, y: 200 },
            visible: true,
            locked: false,
            order: baseOrder + 2,
            stepId
          },
          {
            id: uuidv4(),
            type: 'button',
            content: { ...getDefaultContent('button'), text: 'Ver Oferta Especial' },
            style: {},
            position: { x: 0, y: 300 },
            visible: true,
            locked: false,
            order: baseOrder + 3,
            stepId
          }
        ];
        
      case 'offer':
        return [
          {
            id: uuidv4(),
            type: 'header',
            content: getDefaultContent('header'),
            style: {},
            position: { x: 0, y: 0 },
            visible: true,
            locked: false,
            order: baseOrder,
            stepId
          },
          {
            id: uuidv4(),
            type: 'offer-hero',
            content: getDefaultContent('offer-hero'),
            style: {},
            position: { x: 0, y: 100 },
            visible: true,
            locked: false,
            order: baseOrder + 1,
            stepId
          },
          {
            id: uuidv4(),
            type: 'pricing',
            content: getDefaultContent('pricing'),
            style: {},
            position: { x: 0, y: 200 },
            visible: true,
            locked: false,
            order: baseOrder + 2,
            stepId
          },
          {
            id: uuidv4(),
            type: 'guarantee',
            content: getDefaultContent('guarantee'),
            style: {},
            position: { x: 0, y: 300 },
            visible: true,
            locked: false,
            order: baseOrder + 3,
            stepId
          },
          {
            id: uuidv4(),
            type: 'button',
            content: { ...getDefaultContent('button'), text: 'Comprar Agora' },
            style: {},
            position: { x: 0, y: 400 },
            visible: true,
            locked: false,
            order: baseOrder + 4,
            stepId
          }
        ];
        
      default:
        return [];
    }
  };

  const getDefaultContent = (type: string): Record<string, any> => {
    switch (type) {
      case 'header':
        return {
          logoUrl: 'https://cakto-quiz-br01.b-cdn.net/uploads/47fd613e-91a9-48cf-bd52-a9d4e180d5ab.png',
          logoAlt: 'Logo',
          showBackButton: true,
          showProgress: true,
          currentStep: 1,
          totalSteps: 7,
          backgroundColor: '#FFFFFF'
        };

      case 'terms':
        return {
          html: 'Ao clicar em alguma das opções, você concorda com os <b>Termos de utilização e serviço</b>, <b>Política de privacidade</b>, <b>Política de subscrição</b> e <b>Política de cookies</b>'
        };

      case 'fixed-header':
        return {
          logoUrl: 'https://cakto-quiz-br01.b-cdn.net/uploads/47fd613e-91a9-48cf-bd52-a9d4e180d5ab.png',
          logoAlt: 'Logo',
          showBackButton: true,
          showProgress: true,
          currentStep: 1,
          totalSteps: 7,
          backgroundColor: '#FFFFFF',
          logoSize: '96px'
        };

      case 'quiz-header':
        return {
          title: 'Descobrir Seu Estilo',
          subtitle: 'Responda algumas perguntas e descubra qual é o seu estilo único!'
        };
      
      case 'quiz-question':
        return {
          question: 'Qual destas opções mais combina com você?',
          options: ['Opção A', 'Opção B', 'Opção C', 'Opção D']
        };

      case 'result-display':
        return {
          title: 'Seu Estilo é',
          primaryStyle: 'Elegante',
          percentage: 85,
          description: 'Você tem um estilo sofisticado e refinado.'
        };

      case 'offer-hero':
        return {
          title: 'Oferta Especial para Você!',
          subtitle: 'Transforme seu estilo com nosso programa personalizado',
          price: 'R$ 297',
          originalPrice: 'R$ 597',
          discount: '50% OFF'
        };

      case 'pricing':
        return {
          title: 'Preço Especial',
          price: 'R$ 297',
          originalPrice: 'R$ 597',
          installments: '12x de R$ 29,70',
          features: ['Consultoria personalizada', 'Material exclusivo', 'Suporte 24/7']
        };

      case 'guarantee':
        return {
          title: 'Garantia de 30 dias',
          description: 'Se não ficar satisfeito, devolvemos 100% do seu dinheiro'
        };
      
      case 'heading':
        return {
          text: 'Título Principal',
          level: 'h2'
        };
      
      case 'text':
        return {
          text: 'Este é um parágrafo de texto. Clique duas vezes para editar.'
        };
      
      case 'button':
        return {
          text: 'Clique Aqui',
          variant: 'primary'
        };
      
      case 'image':
        return {
          src: 'https://via.placeholder.com/400x200?text=Imagem',
          alt: 'Imagem'
        };
      
      case 'video':
        return {
          src: '',
          autoplay: false,
          controls: true
        };
      
      case 'spacer':
        return {
          height: '2rem'
        };
      
      case 'marquee':
        return {
          testimonials: [
            {
              id: '1',
              name: 'Jack',
              username: '@jack',
              avatar: 'https://avatar.vercel.sh/jack',
              content: 'Nunca vi nada como isso antes. É incrível. Eu amei!'
            },
            {
              id: '2',
              name: 'Jill',
              username: '@jill',
              avatar: 'https://avatar.vercel.sh/jill',
              content: 'Não sei o que dizer. Estou sem palavras. Isso é incrível.'
            },
            {
              id: '3',
              name: 'John',
              username: '@john',
              avatar: 'https://avatar.vercel.sh/john',
              content: 'Produto fantástico! Superou todas as minhas expectativas.'
            }
          ],
          duration: '40s',
          gap: '1rem',
          direction: 'left',
          pauseOnHover: true,
          showGradients: true,
          cardWidth: '256px'
        };
      
      default:
        return {
          text: `Componente ${type}`
        };
    }
  };

  const updateElement = useCallback((id: string, updates: Partial<EditorElement>) => {
    const newElements = state.elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    );
    
    setState(prev => ({
      ...prev,
      elements: newElements
    }));

    saveToHistory(newElements);
  }, [state.elements, saveToHistory]);

  const duplicateElement = useCallback((id: string) => {
    const elementToDuplicate = state.elements.find(el => el.id === id);
    if (!elementToDuplicate) return '';

    const newElement: EditorElement = {
      ...elementToDuplicate,
      id: uuidv4(),
      position: {
        x: elementToDuplicate.position.x + 20,
        y: elementToDuplicate.position.y + 20
      },
      order: state.elements.length
    };

    const newElements = [...state.elements, newElement];
    
    setState(prev => ({
      ...prev,
      elements: newElements,
      selectedElementId: newElement.id
    }));

    saveToHistory(newElements);
    
    return newElement.id;
  }, [state.elements, saveToHistory]);

  const deleteElement = useCallback((id: string) => {
    const newElements = state.elements.filter(el => el.id !== id);
    
    setState(prev => ({
      ...prev,
      elements: newElements,
      selectedElementId: prev.selectedElementId === id ? null : prev.selectedElementId
    }));

    saveToHistory(newElements);
  }, [state.elements, saveToHistory]);

  const selectElement = useCallback((id: string | null) => {
    setState(prev => ({
      ...prev,
      selectedElementId: id
    }));
  }, []);

  const togglePreview = useCallback(() => {
    setState(prev => ({
      ...prev,
      isPreviewMode: !prev.isPreviewMode,
      selectedElementId: null
    }));
  }, []);

  const undo = useCallback(() => {
    if (state.historyIndex > 0) {
      const prevElements = state.history[state.historyIndex - 1];
      setState(prev => ({
        ...prev,
        elements: [...prevElements],
        historyIndex: prev.historyIndex - 1,
        selectedElementId: null
      }));
    }
  }, [state.historyIndex, state.history]);

  const redo = useCallback(() => {
    if (state.historyIndex < state.history.length - 1) {
      const nextElements = state.history[state.historyIndex + 1];
      setState(prev => ({
        ...prev,
        elements: [...nextElements],
        historyIndex: prev.historyIndex + 1,
        selectedElementId: null
      }));
    }
  }, [state.historyIndex, state.history]);

  const save = useCallback(async () => {
    const data = {
      elements: state.elements,
      timestamp: Date.now()
    };
    
    // Save to localStorage as backup
    localStorage.setItem('modern-editor-saved', JSON.stringify(data));
    
    return data;
  }, [state.elements]);

  const loadAutoSave = useCallback(() => {
    const autoSave = localStorage.getItem('modern-editor-autosave');
    if (autoSave) {
      const data = JSON.parse(autoSave);
      setState(prev => ({
        ...prev,
        elements: data.elements || [],
        selectedElementId: null
      }));
      saveToHistory(data.elements || []);
    }
  }, [saveToHistory]);

  const getElementsByStep = useCallback((stepId: string) => {
    return state.elements.filter(el => el.stepId === stepId);
  }, [state.elements]);

  return {
    // State
    elements: state.elements,
    selectedElementId: state.selectedElementId,
    isPreviewMode: state.isPreviewMode,
    canUndo: state.historyIndex > 0,
    canRedo: state.historyIndex < state.history.length - 1,
    
    // Actions
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
    loadAutoSave,
    getElementsByStep
  };
};
