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

interface SaveResult {
  elements: EditorElement[];
  timestamp: string;
}

export const useModernEditor = () => {
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [history, setHistory] = useState<EditorElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Template components for different step types with REAL layouts
  const getTemplateComponents = (stepType: string, stepId: string): EditorElement[] => {
    const baseId = Date.now();
    
    switch (stepType) {
      case 'quiz-intro':
        return [
          {
            id: `${baseId}-1`,
            type: 'header',
            stepId,
            order: 1,
            visible: true,
            locked: false,
            content: { 
              logoSrc: '/lovable-uploads/ce883c46-80e0-4171-9c2d-9288f44f88eb.png',
              logoAlt: 'Logo'
            },
            style: { 
              backgroundColor: '#ffffff',
              padding: '20px 40px',
              borderBottom: '1px solid #e5e7eb',
              position: 'fixed',
              top: '0',
              width: '100%',
              zIndex: '50'
            }
          },
          {
            id: `${baseId}-2`,
            type: 'hero-background',
            stepId,
            order: 2,
            visible: true,
            locked: false,
            content: { 
              backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              overlayOpacity: 0.8
            },
            style: { 
              minHeight: '100vh',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              position: 'relative'
            }
          },
          {
            id: `${baseId}-3`,
            type: 'quiz-title',
            stepId,
            order: 3,
            visible: true,
            locked: false,
            content: { text: 'Descubra Qual é o Seu Estilo Único' },
            style: { 
              textAlign: 'center', 
              fontSize: '4rem', 
              fontWeight: 'bold',
              color: '#ffffff',
              marginTop: '120px',
              marginBottom: '24px',
              textShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
            }
          },
          {
            id: `${baseId}-4`,
            type: 'quiz-subtitle',
            stepId,
            order: 4,
            visible: true,
            locked: false,
            content: { text: 'Um quiz personalizado para descobrir o estilo que mais combina com sua personalidade' },
            style: { 
              textAlign: 'center', 
              fontSize: '1.5rem',
              color: '#f3f4f6',
              marginBottom: '48px',
              maxWidth: '600px',
              margin: '0 auto 48px auto'
            }
          },
          {
            id: `${baseId}-5`,
            type: 'start-button',
            stepId,
            order: 5,
            visible: true,
            locked: false,
            content: { text: 'Começar Meu Quiz Agora' },
            style: { 
              textAlign: 'center',
              backgroundColor: '#10b981',
              color: '#ffffff',
              padding: '20px 40px',
              fontSize: '1.25rem',
              fontWeight: '600',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s ease'
            }
          },
          {
            id: `${baseId}-6`,
            type: 'trust-indicators',
            stepId,
            order: 6,
            visible: true,
            locked: false,
            content: { 
              text: '✨ Mais de 10.000 pessoas já descobriram seu estilo\n🔒 100% Gratuito e Seguro\n⚡ Resultado em apenas 2 minutos' 
            },
            style: { 
              textAlign: 'center',
              color: '#e5e7eb',
              fontSize: '1rem',
              marginTop: '40px',
              lineHeight: '1.8'
            }
          }
        ];
        
      case 'quiz-question':
        return [
          {
            id: `${baseId}-1`,
            type: 'question-header',
            stepId,
            order: 1,
            visible: true,
            locked: false,
            content: { 
              logoSrc: '/lovable-uploads/ce883c46-80e0-4171-9c2d-9288f44f88eb.png',
              questionNumber: 1,
              totalQuestions: 8
            },
            style: { 
              backgroundColor: '#ffffff',
              padding: '20px 40px',
              borderBottom: '1px solid #e5e7eb',
              position: 'fixed',
              top: '0',
              width: '100%',
              zIndex: '50'
            }
          },
          {
            id: `${baseId}-2`,
            type: 'progress-bar',
            stepId,
            order: 2,
            visible: true,
            locked: false,
            content: { progress: 25 },
            style: {
              backgroundColor: '#f3f4f6',
              height: '8px',
              borderRadius: '4px',
              overflow: 'hidden',
              margin: '0 40px 40px 40px'
            }
          },
          {
            id: `${baseId}-3`,
            type: 'question-image',
            stepId,
            order: 3,
            visible: true,
            locked: false,
            content: { 
              src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=400&fit=crop',
              alt: 'Pergunta visual'
            },
            style: {
              width: '100%',
              maxWidth: '600px',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '16px',
              margin: '0 auto 32px auto',
              display: 'block'
            }
          },
          {
            id: `${baseId}-4`,
            type: 'question-title',
            stepId,
            order: 4,
            visible: true,
            locked: false,
            content: { text: 'Qual dessas situações mais combina com você?' },
            style: { 
              textAlign: 'center', 
              fontSize: '2rem', 
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '48px',
              maxWidth: '800px',
              margin: '0 auto 48px auto'
            }
          },
          {
            id: `${baseId}-5`,
            type: 'question-options',
            stepId,
            order: 5,
            visible: true,
            locked: false,
            content: { 
              options: [
                { text: 'Prefiro roupas clássicas e atemporais', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop' },
                { text: 'Gosto de seguir as últimas tendências da moda', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop' },
                { text: 'Valorizo o conforto acima de tudo', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop' },
                { text: 'Adoro ousar com cores e estampas', image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop' }
              ]
            },
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              maxWidth: '900px',
              margin: '0 auto',
              padding: '0 20px'
            }
          },
          {
            id: `${baseId}-6`,
            type: 'question-navigation',
            stepId,
            order: 6,
            visible: true,
            locked: false,
            content: { 
              backText: 'Anterior',
              nextText: 'Próxima',
              showBack: true
            },
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              maxWidth: '900px',
              margin: '60px auto 0 auto',
              padding: '0 20px'
            }
          }
        ];
        
      case 'quiz-result':
        return [
          {
            id: `${baseId}-1`,
            type: 'result-header',
            stepId,
            order: 1,
            visible: true,
            locked: false,
            content: { 
              title: 'Seu Resultado Está Pronto!',
              subtitle: 'Parabéns por completar o quiz'
            },
            style: { 
              textAlign: 'center',
              padding: '60px 20px 40px 20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#ffffff'
            }
          },
          {
            id: `${baseId}-2`,
            type: 'result-card',
            stepId,
            order: 2,
            visible: true,
            locked: false,
            content: { 
              styleType: 'Elegante Clássica',
              description: 'Seu estilo reflete sofisticação e atemporalidade. Você valoriza peças de qualidade que nunca saem de moda.',
              image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop',
              percentage: 85
            },
            style: {
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '40px',
              margin: '-40px auto 40px auto',
              maxWidth: '600px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }
          },
          {
            id: `${baseId}-3`,
            type: 'result-details',
            stepId,
            order: 3,
            visible: true,
            locked: false,
            content: { 
              characteristics: [
                'Preferência por cores neutras e clássicas',
                'Aprecia qualidade e durabilidade',
                'Estilo atemporal e sofisticado',
                'Valoriza a elegância discreta'
              ]
            },
            style: {
              backgroundColor: '#f9fafb',
              padding: '40px 20px',
              textAlign: 'center'
            }
          },
          {
            id: `${baseId}-4`,
            type: 'cta-section',
            stepId,
            order: 4,
            visible: true,
            locked: false,
            content: { 
              title: 'Quer descobrir as peças perfeitas para seu estilo?',
              subtitle: 'Veja nossa curadoria especial baseada no seu resultado',
              buttonText: 'Ver Minha Seleção Personalizada'
            },
            style: {
              backgroundColor: '#1f2937',
              color: '#ffffff',
              padding: '60px 20px',
              textAlign: 'center'
            }
          }
        ];
        
      case 'offer-page':
        return [
          {
            id: `${baseId}-1`,
            type: 'offer-hero',
            stepId,
            order: 1,
            visible: true,
            locked: false,
            content: { 
              title: 'Transforme Seu Guarda-Roupa Hoje!',
              subtitle: 'Baseado no seu resultado: Elegante Clássica',
              highlight: 'Oferta Especial por Tempo Limitado'
            },
            style: { 
              background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
              color: '#ffffff',
              textAlign: 'center',
              padding: '80px 20px'
            }
          },
          {
            id: `${baseId}-2`,
            type: 'product-showcase',
            stepId,
            order: 2,
            visible: true,
            locked: false,
            content: { 
              products: [
                { name: 'Guia de Estilo Personalizado', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop', price: 'R$ 97' },
                { name: 'Consultoria de Imagem Virtual', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop', price: 'R$ 197' },
                { name: 'Lista de Compras Inteligente', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop', price: 'R$ 67' }
              ]
            },
            style: {
              padding: '60px 20px',
              backgroundColor: '#ffffff'
            }
          },
          {
            id: `${baseId}-3`,
            type: 'pricing-section',
            stepId,
            order: 3,
            visible: true,
            locked: false,
            content: { 
              originalPrice: 'R$ 361',
              discountPrice: 'R$ 97',
              discount: '73% OFF',
              features: [
                'Guia completo baseado no seu estilo',
                'Consultoria personalizada',
                'Lista de compras inteligente',
                'Acesso vitalício',
                'Garantia de 30 dias'
              ]
            },
            style: {
              backgroundColor: '#f3f4f6',
              padding: '60px 20px',
              textAlign: 'center'
            }
          },
          {
            id: `${baseId}-4`,
            type: 'urgency-timer',
            stepId,
            order: 4,
            visible: true,
            locked: false,
            content: { 
              text: 'Esta oferta expira em:',
              timeLeft: '00:23:45'
            },
            style: {
              backgroundColor: '#ef4444',
              color: '#ffffff',
              padding: '30px 20px',
              textAlign: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }
          },
          {
            id: `${baseId}-5`,
            type: 'purchase-button',
            stepId,
            order: 5,
            visible: true,
            locked: false,
            content: { 
              text: 'Quero Transformar Meu Estilo Agora',
              subtext: 'Pagamento 100% Seguro'
            },
            style: { 
              backgroundColor: '#10b981',
              color: '#ffffff',
              padding: '20px 40px',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
              margin: '40px auto',
              display: 'block'
            }
          },
          {
            id: `${baseId}-6`,
            type: 'guarantee-section',
            stepId,
            order: 6,
            visible: true,
            locked: false,
            content: { 
              title: 'Garantia Incondicional de 30 Dias',
              text: 'Se você não ficar 100% satisfeita, devolvemos todo o seu dinheiro.',
              badgeText: '🛡️ 100% Seguro'
            },
            style: {
              backgroundColor: '#ffffff',
              padding: '60px 20px',
              textAlign: 'center',
              borderTop: '1px solid #e5e7eb'
            }
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
      visible: true,
      locked: false,
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

  const save = useCallback(async (): Promise<SaveResult> => {
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
