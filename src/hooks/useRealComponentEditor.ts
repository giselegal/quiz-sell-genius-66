
import { useState, useCallback } from 'react';
import { StyleResult } from '@/types/quiz';
import { toast } from '@/components/ui/use-toast';

interface EditableSection {
  id: string;
  type: 'header' | 'title' | 'content' | 'cta' | 'transition';
  name: string;
  visible: boolean;
  order: number;
  content: any;
}

interface EditorHistory {
  sections: EditableSection[];
  timestamp: number;
}

export const useRealComponentEditor = (primaryStyle: StyleResult, secondaryStyles: StyleResult[] = []) => {
  const [isEditMode, setIsEditMode] = useState(true);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isPropertiesPanelOpen, setIsPropertiesPanelOpen] = useState(false);
  const [sections, setSections] = useState<EditableSection[]>([
    {
      id: 'header',
      type: 'header',
      name: 'Cabeçalho do Resultado',
      visible: true,
      order: 0,
      content: { 
        showUserName: true, 
        showProgress: true,
        customTitle: '',
        customSubtitle: '',
        showPersonalization: true
      }
    },
    {
      id: 'transformations-title',
      type: 'title',
      name: 'Título - Transformações',
      visible: true,
      order: 1,
      content: {
        title: 'Resultados que Falam por Si',
        subtitle: 'Veja como mulheres descobriram sua melhor versão seguindo as mesmas estratégias que você vai receber'
      }
    },
    {
      id: 'motivation-title',
      type: 'title',
      name: 'Título - Motivação',
      visible: true,
      order: 2,
      content: {
        title: 'Por que Aplicar seu Estilo é tão Importante?',
        subtitle: 'Conhecer seu estilo pessoal é muito mais do que seguir tendências passageiras — é uma ferramenta poderosa de comunicação não-verbal e autoconfiança.'
      }
    },
    {
      id: 'transition',
      type: 'transition',
      name: 'Seção de Transição',
      visible: true,
      order: 3,
      content: {
        title: 'Chegou o Momento de Agir',
        subtitle: 'Não deixe para depois a transformação que você pode começar agora!'
      }
    },
    {
      id: 'cta',
      type: 'cta',
      name: 'Call to Action Final',
      visible: true,
      order: 4,
      content: { 
        showTimer: true, 
        showGuarantees: true,
        products: [
          {
            id: 'main-product',
            name: 'Guia Completo de Estilo Pessoal',
            description: 'Tudo o que você precisa para aplicar seu estilo no dia a dia',
            originalPrice: 197,
            salePrice: 97,
            features: ['Análise completa do seu estilo', 'Guia de combinações', 'Cartela de cores personalizada']
          }
        ],
        buttonText: 'QUERO TRANSFORMAR MEU ESTILO AGORA',
        buttonColor: '#22c55e',
        discount: {
          percentage: 50,
          message: '50% de desconto por tempo limitado!'
        }
      }
    }
  ]);

  const [history, setHistory] = useState<EditorHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveToHistory = useCallback(() => {
    const newHistoryEntry: EditorHistory = {
      sections: JSON.parse(JSON.stringify(sections)),
      timestamp: Date.now()
    };

    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newHistoryEntry);
      return newHistory.slice(-20);
    });
    setHistoryIndex(prev => Math.min(prev + 1, 19));
  }, [sections, historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const previousState = history[historyIndex - 1];
      setSections(previousState.sections);
      setHistoryIndex(prev => prev - 1);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setSections(nextState.sections);
      setHistoryIndex(prev => prev + 1);
    }
  }, [history, historyIndex]);

  const handleElementClick = useCallback((elementId: string) => {
    if (isEditMode) {
      setSelectedElementId(elementId);
      setIsPropertiesPanelOpen(true);
    }
  }, [isEditMode]);

  const handleSectionUpdate = useCallback((sectionId: string, updates: Partial<EditableSection>) => {
    saveToHistory();
    setSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  }, [saveToHistory]);

  const handleSave = useCallback(() => {
    const config = {
      sections,
      primaryStyle,
      secondaryStyles,
      lastModified: Date.now()
    };
    
    localStorage.setItem('realComponentEditorConfig', JSON.stringify(config));
    
    toast({
      title: "Configuração salva",
      description: "As alterações foram salvas com sucesso.",
      duration: 3000
    });
  }, [sections, primaryStyle, secondaryStyles]);

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
    if (isEditMode) {
      setSelectedElementId(null);
      setIsPropertiesPanelOpen(false);
    }
  }, [isEditMode]);

  const closePropertiesPanel = useCallback(() => {
    setIsPropertiesPanelOpen(false);
    setSelectedElementId(null);
  }, []);

  return {
    // State
    isEditMode,
    selectedElementId,
    isPropertiesPanelOpen,
    sections,
    history,
    historyIndex,
    
    // Actions
    toggleEditMode,
    handleElementClick,
    handleSectionUpdate,
    handleSave,
    handleUndo,
    handleRedo,
    closePropertiesPanel,
    
    // Computed
    visibleSections: sections.filter(section => section.visible).sort((a, b) => a.order - b.order),
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1
  };
};
