import { useState, useCallback, useRef, useEffect } from 'react';
import { generateId } from '@/utils/idGenerator';

export interface EditorElement {
  id: string;
  type: 'heading' | 'text' | 'image' | 'button' | 'video' | 'spacer' | 'divider' | 'pricing' | 'testimonial' | 'countdown' | 'faq' | 'input' | 'checkbox';
  content: Record<string, any>;
  style: Record<string, any>;
  position: { x: number; y: number };
  size: { width: number; height: number };
  locked?: boolean;
}

export const useModernEditor = (initialData?: any) => {
  const [elements, setElements] = useState<EditorElement[]>(initialData?.elements || []);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [history, setHistory] = useState<EditorElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDragging, setIsDragging] = useState(false);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    
    autoSaveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('modern-editor-autosave', JSON.stringify({
        elements,
        timestamp: Date.now()
      }));
    }, 2000);

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [elements]);

  const addToHistory = useCallback((newElements: EditorElement[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push([...newElements]);
      return newHistory.slice(-50);
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [historyIndex]);

  const addElement = useCallback((type: string, position?: { x: number; y: number }) => {
    const defaultPosition = position || { x: 50 + elements.length * 20, y: 50 + elements.length * 20 };
    
    const newElement: EditorElement = {
      id: generateId(),
      type: type as EditorElement['type'],
      content: getDefaultContent(type),
      style: getDefaultStyle(type),
      position: defaultPosition,
      size: getDefaultSize(type)
    };

    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
    
    return newElement.id;
  }, [elements, addToHistory]);

  const updateElement = useCallback((id: string, updates: Partial<EditorElement>) => {
    const newElements = elements.map(el =>
      el.id === id ? { ...el, ...updates } : el
    );
    setElements(newElements);
    addToHistory(newElements);
  }, [elements, addToHistory]);

  const duplicateElement = useCallback((id: string) => {
    const elementToDuplicate = elements.find(el => el.id === id);
    if (!elementToDuplicate) return;

    const newElement: EditorElement = {
      ...elementToDuplicate,
      id: generateId(),
      position: {
        x: elementToDuplicate.position.x + 20,
        y: elementToDuplicate.position.y + 20
      }
    };

    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
    return newElement.id;
  }, [elements, addToHistory]);

  const deleteElement = useCallback((id: string) => {
    const newElements = elements.filter(el => el.id !== id);
    setElements(newElements);
    addToHistory(newElements);
    if (selectedElementId === id) {
      setSelectedElementId(null);
    }
  }, [elements, selectedElementId, addToHistory]);

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
    const data = {
      elements,
      timestamp: Date.now(),
      version: '1.0'
    };
    
    localStorage.setItem('modern-editor-save', JSON.stringify(data));
    console.log('Saving editor data:', data);
    
    return data;
  }, [elements]);

  const loadAutoSave = useCallback(() => {
    const autoSave = localStorage.getItem('modern-editor-autosave');
    if (autoSave) {
      const data = JSON.parse(autoSave);
      setElements(data.elements || []);
      addToHistory(data.elements || []);
    }
  }, [addToHistory]);

  return {
    elements,
    selectedElementId,
    isPreviewMode,
    isDragging,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    addElement,
    updateElement,
    duplicateElement,
    deleteElement,
    selectElement,
    togglePreview,
    setIsDragging,
    undo,
    redo,
    save,
    loadAutoSave
  };
};

const getDefaultContent = (type: string) => {
  const defaults: Record<string, any> = {
    heading: { text: 'Novo Título', level: 'h2' },
    text: { text: 'Digite seu texto aqui...' },
    button: { text: 'Clique aqui', url: '#' },
    image: { src: '', alt: 'Imagem' },
    video: { src: '', thumbnail: '' },
    spacer: { height: 40 },
    divider: { style: 'solid', color: '#e5e7eb' },
    'quiz-question': {
      question: 'Como você define o seu jeito de Ser?',
      options: [
        { id: 'A', text: 'Sou espontânea e descontraída, adoro coisas simples.', styleCategory: 'Natural' },
        { id: 'B', text: 'Gosto de organização, sou uma pessoa séria e conservadora.', styleCategory: 'Clássico' },
        { id: 'C', text: 'Sou prática e objetiva, valorizo a funcionalidade.', styleCategory: 'Contemporâneo' },
        { id: 'D', text: 'Sou exigente e sofisticada, cuidadosa nas minhas escolhas.', styleCategory: 'Elegante' }
      ],
      multiSelect: false,
      required: true
    },
    'quiz-header': {
      logo: 'https://cakto-quiz-br01.b-cdn.net/uploads/47fd613e-91a9-48cf-bd52-a9d4e180d5ab.png',
      showProgress: true,
      progress: 25,
      showBackButton: true,
      title: 'Quiz de Estilo'
    },
    pricing: { 
      title: 'Plano Premium',
      price: 'R$ 97',
      originalPrice: 'R$ 197',
      description: 'Acesso completo por 12 meses',
      features: ['Acesso vitalício', 'Suporte premium', 'Atualizações gratuitas']
    },
    testimonial: {
      text: 'Este produto mudou minha vida! Recomendo para todos.',
      author: 'João Silva',
      role: 'Empresário',
      avatar: '',
      rating: 5
    },
    countdown: {
      title: 'Oferta especial termina em:',
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: true
    },
    faq: {
      title: 'Perguntas Frequentes',
      items: [
        { question: 'Como funciona?', answer: 'É muito simples de usar...' },
        { question: 'Quanto custa?', answer: 'Temos vários planos...' }
      ]
    },
    input: {
      label: 'Seu nome',
      placeholder: 'Digite seu nome...',
      type: 'text',
      required: true
    },
    checkbox: {
      label: 'Eu aceito os termos de uso',
      checked: false,
      required: true
    }
  };
  return defaults[type] || {};
};

const getDefaultStyle = (type: string) => {
  const defaults: Record<string, any> = {
    heading: { fontSize: '24px', fontWeight: 'bold', color: '#1f2937' },
    text: { fontSize: '16px', color: '#374151', lineHeight: '1.6' },
    button: { 
      backgroundColor: '#3b82f6', 
      color: '#ffffff', 
      padding: '12px 24px',
      borderRadius: '6px'
    },
    image: { borderRadius: '4px' },
    video: { borderRadius: '8px' },
    spacer: {},
    divider: { margin: '20px 0' },
    'quiz-question': {
      padding: '0px',
      backgroundColor: 'transparent'
    },
    'quiz-header': {
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '0px'
    },
    pricing: {
      backgroundColor: '#ffffff',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      padding: '24px',
      textAlign: 'center'
    },
    testimonial: {
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #e5e7eb'
    },
    countdown: {
      backgroundColor: '#1f2937',
      color: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      textAlign: 'center'
    },
    faq: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '20px'
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '6px',
      border: '1px solid #d1d5db'
    },
    checkbox: {
      padding: '12px'
    }
  };
  return defaults[type] || {};
};

const getDefaultSize = (type: string) => {
  const defaults: Record<string, any> = {
    heading: { width: 400, height: 60 },
    text: { width: 400, height: 100 },
    button: { width: 200, height: 50 },
    image: { width: 300, height: 200 },
    video: { width: 400, height: 225 },
    spacer: { width: 400, height: 40 },
    divider: { width: 400, height: 20 },
    'quiz-question': { width: 600, height: 400 },
    'quiz-header': { width: 600, height: 120 },
    pricing: { width: 320, height: 400 },
    testimonial: { width: 400, height: 200 },
    countdown: { width: 400, height: 150 },
    faq: { width: 400, height: 300 },
    input: { width: 300, height: 50 },
    checkbox: { width: 250, height: 40 }
  };
  return defaults[type] || { width: 300, height: 100 };
};
