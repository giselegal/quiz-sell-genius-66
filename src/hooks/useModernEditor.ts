
import { useState, useCallback, useRef } from 'react';
import { generateId } from '@/utils/idGenerator';

export interface EditorElement {
  id: string;
  type: 'heading' | 'text' | 'image' | 'button' | 'video' | 'spacer' | 'divider';
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

  const addToHistory = useCallback((newElements: EditorElement[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push([...newElements]);
      return newHistory.slice(-50); // Keep last 50 states
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [historyIndex]);

  const addElement = useCallback((type: string) => {
    const newElement: EditorElement = {
      id: generateId(),
      type: type as EditorElement['type'],
      content: getDefaultContent(type),
      style: getDefaultStyle(type),
      position: { x: 50, y: 50 },
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
    
    // Simulate save operation
    console.log('Saving editor data:', data);
    
    return data;
  }, [elements]);

  return {
    elements,
    selectedElementId,
    isPreviewMode,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    addElement,
    updateElement,
    deleteElement,
    selectElement,
    togglePreview,
    undo,
    redo,
    save
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
    divider: { style: 'solid', color: '#e5e7eb' }
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
    divider: { margin: '20px 0' }
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
    divider: { width: 400, height: 20 }
  };
  return defaults[type] || { width: 300, height: 100 };
};
