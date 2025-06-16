import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface EditorElement {
  id: string;
  type: string;
  content: Record<string, any>;
  style: Record<string, any>;
  position: { x: number; y: number };
  visible: boolean;
  locked: boolean;
  order: number;
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

  const addElement = useCallback((type: string, position?: { x: number; y: number }) => {
    const newElement: EditorElement = {
      id: uuidv4(),
      type,
      content: getDefaultContent(type),
      style: {},
      position: position || { x: 0, y: 0 },
      visible: true,
      locked: false,
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

  return {
    // State
    elements: state.elements,
    selectedElementId: state.selectedElementId,
    isPreviewMode: state.isPreviewMode,
    canUndo: state.historyIndex > 0,
    canRedo: state.historyIndex < state.history.length - 1,
    
    // Actions
    addElement,
    updateElement,
    duplicateElement,
    deleteElement,
    selectElement,
    togglePreview,
    undo,
    redo,
    save,
    loadAutoSave
  };
};
