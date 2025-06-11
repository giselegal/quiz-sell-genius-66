
import { useState, useCallback, useEffect } from 'react';
import { StyleResult } from '@/types/quiz';

export interface EditorSection {
  id: string;
  type: 'header' | 'title' | 'content' | 'cta' | 'transition';
  name: string;
  visible: boolean;
  order: number;
  content: any;
}

export interface EditorConfig {
  sections: EditorSection[];
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  lastModified: number;
}

export const useUnifiedResultPageEditor = (primaryStyle: StyleResult, secondaryStyles: StyleResult[] = []) => {
  const [sections, setSections] = useState<EditorSection[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize default sections
  useEffect(() => {
    const defaultSections: EditorSection[] = [
      {
        id: 'header',
        type: 'header',
        name: 'Cabeçalho do Resultado',
        visible: true,
        order: 0,
        content: { showUserName: true, showProgress: true }
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
        content: { showTimer: true, showGuarantees: true }
      }
    ];

    // Try to load saved configuration
    const saved = localStorage.getItem('resultPageConfig');
    if (saved) {
      try {
        const config: EditorConfig = JSON.parse(saved);
        setSections(config.sections || defaultSections);
      } catch {
        setSections(defaultSections);
      }
    } else {
      setSections(defaultSections);
    }
  }, []);

  const handleSectionUpdate = useCallback((sectionId: string, updates: Partial<EditorSection>) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  }, []);

  const handleSectionToggle = useCallback((sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, visible: !section.visible } : section
    ));
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      const config: EditorConfig = {
        sections,
        primaryStyle,
        secondaryStyles,
        lastModified: Date.now()
      };
      
      localStorage.setItem('resultPageConfig', JSON.stringify(config));
      return true;
    } catch (error) {
      console.error('Error saving configuration:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [sections, primaryStyle, secondaryStyles]);

  const togglePreview = useCallback(() => {
    setIsPreviewMode(prev => !prev);
  }, []);

  const getVisibleSections = useCallback(() => {
    return sections.filter(section => section.visible).sort((a, b) => a.order - b.order);
  }, [sections]);

  return {
    sections,
    selectedSection,
    isPreviewMode,
    isSaving,
    setSelectedSection,
    handleSectionUpdate,
    handleSectionToggle,
    handleSave,
    togglePreview,
    getVisibleSections
  };
};
