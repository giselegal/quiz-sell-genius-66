import { useState, useCallback } from 'react';

export interface EditorElement {
  id: string;
  type: string;
  stepId: string;
  order: number;
  visible: boolean;
  locked: boolean;
  content: {
    text?: string;
    src?: string;
    alt?: string;
    href?: string;
    placeholder?: string;
    // Support both simple string options and complex option objects
    options?: (string | { text: string; image?: string; value?: string })[];
    value?: any;
    level?: number;
    style?: Record<string, any>;
    [key: string]: any;
  };
  style: {
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
    borderRadius?: string;
    border?: string;
    display?: string;
    [key: string]: any;
  };
}

interface EditorState {
  elements: EditorElement[];
  selectedElementId: string | null;
  isPreviewMode: boolean;
  history: EditorElement[][];
  historyIndex: number;
}

export const useModernEditor = () => {
  const [state, setState] = useState<EditorState>({
    elements: [],
    selectedElementId: null,
    isPreviewMode: false,
    history: [[]],
    historyIndex: 0,
  });

  const getElements = useCallback(() => state.elements, [state.elements]);
  const getSelectedElementId = useCallback(() => state.selectedElementId, [state.selectedElementId]);
  const getIsPreviewMode = useCallback(() => state.isPreviewMode, [state.isPreviewMode]);
  const getHistory = useCallback(() => state.history, [state.history]);
  const getHistoryIndex = useCallback(() => state.historyIndex, [state.historyIndex]);

  const addElement = useCallback((type: string, position?: number, stepId?: string) => {
    const newElement: EditorElement = {
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      stepId: stepId || 'default',
      order: position !== undefined ? position : state.elements.length + 1,
      visible: true,
      locked: false,
      content: getDefaultContent(type),
      style: getDefaultStyle(type),
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
        historyIndex: newHistory.length - 1,
      };
    });

    return newElement.id;
  }, [state.elements]);

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'quiz-title':
        return {
          text: 'Descubra Seu Estilo Perfeito',
          level: 1
        };
      case 'quiz-description':
        return {
          text: 'Responda algumas perguntas e descubra qual estilo combina mais com você!'
        };
      case 'start-button':
        return {
          text: 'Começar Quiz',
          href: '#'
        };
      case 'question-title':
        return {
          text: 'Qual dessas opções mais combina com você?',
          level: 2
        };
      case 'question-options':
        return {
          options: [
            { text: 'Opção 1', image: '/placeholder-option1.jpg', value: '1' },
            { text: 'Opção 2', image: '/placeholder-option2.jpg', value: '2' },
            { text: 'Opção 3', image: '/placeholder-option3.jpg', value: '3' },
            { text: 'Opção 4', image: '/placeholder-option4.jpg', value: '4' }
          ]
        };
      case 'result-display':
        return {
          text: 'Seu Estilo é: Clássico Elegante',
          level: 1
        };
      case 'result-description':
        return {
          text: 'Você tem um gosto refinado e aprecia peças atemporais que nunca saem de moda.'
        };
      case 'offer-hero':
        return {
          text: 'Transforme Seu Guarda-Roupa',
          subtitle: 'Consultoria de Estilo Personalizada'
        };
      case 'pricing':
        return {
          price: 'R$ 297',
          originalPrice: 'R$ 497',
          title: 'Consultoria Completa'
        };
      case 'benefits-list':
        return {
          items: [
            'Análise completa do seu estilo',
            'Guia personalizado de cores',
            'Lista de peças essenciais',
            'Acompanhamento por 30 dias'
          ]
        };
      default:
        return {
          text: 'Novo elemento'
        };
    }
  };

  const getDefaultStyle = (type: string) => {
    switch (type) {
      case 'quiz-title':
        return {
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#1a1a1a',
          marginBottom: '1rem'
        };
      case 'quiz-description':
        return {
          fontSize: '1.1rem',
          textAlign: 'center',
          color: '#666',
          marginBottom: '2rem'
        };
      case 'start-button':
        return {
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '0.5rem',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          textAlign: 'center',
          border: 'none',
          cursor: 'pointer'
        };
      case 'question-options':
        return {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          marginTop: '2rem'
        };
      case 'result-display':
        return {
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#10b981',
          marginBottom: '1rem'
        };
      case 'pricing':
        return {
          backgroundColor: '#f8fafc',
          padding: '2rem',
          borderRadius: '1rem',
          textAlign: 'center',
          border: '2px solid #e2e8f0'
        };
      default:
        return {
          padding: '1rem',
          margin: '0.5rem 0'
        };
    }
  };

  const addStepTemplate = useCallback((stepType: string, stepId: string) => {
    const templates = getStepTemplates(stepType, stepId);
    
    setState(prev => {
      const newElements = [...prev.elements, ...templates];
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(newElements);
      
      return {
        ...prev,
        elements: newElements,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  const getStepTemplates = (stepType: string, stepId: string): EditorElement[] => {
    const baseId = Date.now();
    
    switch (stepType) {
      case 'quiz-intro':
        return [
          {
            id: `header-${baseId}`,
            type: 'header',
            stepId,
            order: 1,
            visible: true,
            locked: false,
            content: { text: 'Quiz de Estilo' },
            style: {
              backgroundColor: '#1a1a1a',
              color: 'white',
              padding: '1rem 2rem',
              position: 'fixed',
              top: '0',
              width: '100%',
              zIndex: '1000'
            }
          },
          {
            id: `hero-${baseId}`,
            type: 'quiz-title',
            stepId,
            order: 2,
            visible: true,
            locked: false,
            content: {
              text: 'Descubra Seu Estilo Perfeito',
              level: 1
            },
            style: {
              fontSize: '3rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#1a1a1a',
              marginTop: '5rem',
              marginBottom: '1rem'
            }
          },
          {
            id: `description-${baseId}`,
            type: 'quiz-description',
            stepId,
            order: 3,
            visible: true,
            locked: false,
            content: {
              text: 'Responda algumas perguntas rápidas e descubra qual estilo de roupa combina mais com sua personalidade!'
            },
            style: {
              fontSize: '1.2rem',
              textAlign: 'center',
              color: '#666',
              marginBottom: '3rem',
              maxWidth: '600px',
              margin: '0 auto 3rem auto'
            }
          },
          {
            id: `cta-${baseId}`,
            type: 'start-button',
            stepId,
            order: 4,
            visible: true,
            locked: false,
            content: {
              text: 'Começar Quiz Agora',
              href: '#'
            },
            style: {
              backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '1.5rem 3rem',
              borderRadius: '50px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              textAlign: 'center',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
              transform: 'translateY(0)',
              transition: 'all 0.3s ease'
            }
          }
        ];

      case 'quiz-question':
        return [
          {
            id: `progress-${baseId}`,
            type: 'progress-bar',
            stepId,
            order: 1,
            visible: true,
            locked: false,
            content: { progress: 25 },
            style: {
              width: '100%',
              height: '4px',
              backgroundColor: '#e2e8f0',
              position: 'fixed',
              top: '60px',
              zIndex: '999'
            }
          },
          {
            id: `question-${baseId}`,
            type: 'question-title',
            stepId,
            order: 2,
            visible: true,
            locked: false,
            content: {
              text: 'Qual dessas opções mais combina com você?',
              level: 2
            },
            style: {
              fontSize: '2rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#1a1a1a',
              marginTop: '8rem',
              marginBottom: '3rem'
            }
          },
          {
            id: `options-${baseId}`,
            type: 'question-options',
            stepId,
            order: 3,
            visible: true,
            locked: false,
            content: {
              options: [
                { text: 'Elegante e Clássico', image: '/placeholder-elegant.jpg', value: 'elegant' },
                { text: 'Casual e Confortável', image: '/placeholder-casual.jpg', value: 'casual' },
                { text: 'Moderno e Ousado', image: '/placeholder-modern.jpg', value: 'modern' },
                { text: 'Romântico e Feminino', image: '/placeholder-romantic.jpg', value: 'romantic' }
              ]
            },
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem',
              maxWidth: '800px',
              margin: '0 auto',
              padding: '0 2rem'
            }
          }
        ];

      case 'quiz-result':
        return [
          {
            id: `result-header-${baseId}`,
            type: 'result-display',
            stepId,
            order: 1,
            visible: true,
            locked: false,
            content: {
              text: 'Seu Estilo é: Clássico Elegante',
              level: 1
            },
            style: {
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#10b981',
              marginTop: '5rem',
              marginBottom: '2rem'
            }
          },
          {
            id: `result-desc-${baseId}`,
            type: 'result-description',
            stepId,
            order: 2,
            visible: true,
            locked: false,
            content: {
              text: 'Você tem um gosto refinado e aprecia peças atemporais que nunca saem de moda. Seu estilo reflete sofisticação e elegância.'
            },
            style: {
              fontSize: '1.1rem',
              textAlign: 'center',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto 3rem auto',
              lineHeight: '1.6'
            }
          },
          {
            id: `offer-preview-${baseId}`,
            type: 'offer-preview',
            stepId,
            order: 3,
            visible: true,
            locked: false,
            content: {
              title: 'Quer descobrir mais sobre seu estilo?',
              subtitle: 'Consultoria Personalizada Completa'
            },
            style: {
              backgroundColor: '#f8fafc',
              padding: '3rem 2rem',
              borderRadius: '1rem',
              textAlign: 'center',
              margin: '2rem auto',
              maxWidth: '600px'
            }
          }
        ];

      case 'offer-page':
        return [
          {
            id: `offer-hero-${baseId}`,
            type: 'offer-hero',
            stepId,
            order: 1,
            visible: true,
            locked: false,
            content: {
              text: 'Transforme Seu Guarda-Roupa Completamente',
              subtitle: 'Consultoria de Estilo Personalizada e Exclusiva'
            },
            style: {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '5rem 2rem',
              textAlign: 'center',
              marginTop: '4rem'
            }
          },
          {
            id: `pricing-${baseId}`,
            type: 'pricing',
            stepId,
            order: 2,
            visible: true,
            locked: false,
            content: {
              price: 'R$ 297',
              originalPrice: 'R$ 497',
              title: 'Consultoria Completa de Estilo',
              subtitle: 'Oferta por tempo limitado'
            },
            style: {
              backgroundColor: 'white',
              padding: '3rem 2rem',
              borderRadius: '1rem',
              textAlign: 'center',
              margin: '3rem auto',
              maxWidth: '500px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '3px solid #10b981'
            }
          },
          {
            id: `benefits-${baseId}`,
            type: 'benefits-list',
            stepId,
            order: 3,
            visible: true,
            locked: false,
            content: {
              title: 'O que você vai receber:',
              items: [
                '✅ Análise completa do seu biotipo e estilo',
                '✅ Guia personalizado de cores que mais favorecem você',
                '✅ Lista de peças essenciais para seu guarda-roupa',
                '✅ Dicas de combinações para diferentes ocasiões',
                '✅ Acompanhamento por 30 dias via WhatsApp',
                '✅ Acesso vitalício ao material digital'
              ]
            },
            style: {
              padding: '3rem 2rem',
              maxWidth: '700px',
              margin: '0 auto'
            }
          }
        ];

      default:
        return [];
    }
  };

  const updateElement = useCallback((id: string, updates: Partial<EditorElement>) => {
    setState(prev => {
      const newElements = prev.elements.map(element => 
        element.id === id ? { ...element, ...updates } : element
      );
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(newElements);
      
      return {
        ...prev,
        elements: newElements,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  const duplicateElement = useCallback((id: string) => {
    const element = state.elements.find(el => el.id === id);
    if (!element) return;

    const newElement: EditorElement = {
      ...element,
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      order: element.order + 0.5,
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
        historyIndex: newHistory.length - 1,
      };
    });
  }, [state.elements]);

  const deleteElement = useCallback((id: string) => {
    setState(prev => {
      const newElements = prev.elements.filter(element => element.id !== id);
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(newElements);
      
      return {
        ...prev,
        elements: newElements,
        selectedElementId: prev.selectedElementId === id ? null : prev.selectedElementId,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  const selectElement = useCallback((id: string | null) => {
    setState(prev => ({
      ...prev,
      selectedElementId: id,
    }));
  }, []);

  const togglePreview = useCallback(() => {
    setState(prev => ({
      ...prev,
      isPreviewMode: !prev.isPreviewMode,
    }));
  }, []);

  const undo = useCallback(() => {
    setState(prev => {
      if (prev.historyIndex > 0) {
        return {
          ...prev,
          elements: prev.history[prev.historyIndex - 1],
          historyIndex: prev.historyIndex - 1,
          selectedElementId: null,
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
          selectedElementId: null,
        };
      }
      return prev;
    });
  }, []);

  const save = useCallback(async () => {
    const data = {
      elements: state.elements,
      timestamp: new Date().toISOString(),
    };
    
    // Here you would typically save to a backend
    console.log('Saving editor data:', data);
    
    return data;
  }, [state.elements]);

  const getElementsByStep = useCallback((stepId: string) => {
    return state.elements.filter(element => element.stepId === stepId);
  }, [state.elements]);

  return {
    elements: state.elements,
    selectedElementId: state.selectedElementId,
    isPreviewMode: state.isPreviewMode,
    canUndo: state.historyIndex > 0,
    canRedo: state.historyIndex < state.history.length - 1,
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
