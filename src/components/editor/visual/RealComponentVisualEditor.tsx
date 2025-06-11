
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Save, Eye, EyeOff, Edit3, Settings, Undo, Redo } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { ResultPageWrapper } from '@/components/layout/ResultPageWrapper';
import ResultHeaderSection from '@/components/quiz-sections/ResultHeaderSection';
import { TransitionSection } from '@/components/quiz-sections/TransitionSection';
import { FinalCtaSection } from '@/components/quiz-sections/FinalCtaSection';
import SectionTitle from '@/components/common/SectionTitle';
import { EditableOverlay } from './EditableOverlay';
import { PropertiesPanel } from './PropertiesPanel';

interface RealComponentVisualEditorProps {
  primaryStyle: StyleResult;
  secondaryStyles?: StyleResult[];
}

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

export const RealComponentVisualEditor: React.FC<RealComponentVisualEditorProps> = ({
  primaryStyle,
  secondaryStyles = []
}) => {
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
  const mockUser = { userName: 'Maria' };

  // Save current state to history
  const saveToHistory = useCallback(() => {
    const newHistoryEntry: EditorHistory = {
      sections: JSON.parse(JSON.stringify(sections)),
      timestamp: Date.now()
    };

    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newHistoryEntry);
      return newHistory.slice(-20); // Keep only last 20 entries
    });
    setHistoryIndex(prev => Math.min(prev + 1, 19));
  }, [sections, historyIndex]);

  // Undo functionality
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const previousState = history[historyIndex - 1];
      setSections(previousState.sections);
      setHistoryIndex(prev => prev - 1);
    }
  }, [history, historyIndex]);

  // Redo functionality
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

  const visibleSections = sections.filter(section => section.visible).sort((a, b) => a.order - b.order);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Enhanced Toolbar */}
      <div className="border-b bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-playfair text-[#432818]">
              Editor Visual - Componentes Reais
            </h1>
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {primaryStyle.category}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              title="Desfazer"
            >
              <Undo className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              title="Refazer"
            >
              <Redo className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditMode(!isEditMode)}
              className={isEditMode ? 'bg-blue-50 border-blue-300' : ''}
            >
              {isEditMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {isEditMode ? 'Preview' : 'Editar'}
            </Button>
            
            <Button onClick={handleSave} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Editor Area */}
        <div className="flex-1 overflow-auto relative">
          <ResultPageWrapper>
            {visibleSections.map((section) => {
              const isSelected = selectedElementId === section.id;
              
              return (
                <div key={section.id} className="relative">
                  {/* Editable Overlay */}
                  {isEditMode && (
                    <EditableOverlay
                      isSelected={isSelected}
                      onSelect={() => handleElementClick(section.id)}
                      sectionName={section.name}
                    />
                  )}
                  
                  {/* Real Components */}
                  {section.type === 'header' && (
                    <ResultHeaderSection
                      primaryStyle={primaryStyle}
                      secondaryStyles={secondaryStyles}
                      user={mockUser}
                      isLowPerformance={false}
                      onImageLoad={() => {}}
                    />
                  )}

                  {section.type === 'title' && (
                    <section className="scroll-mt-24 mb-24 lg:mb-28">
                      <SectionTitle
                        variant="primary"
                        size="xl"
                        subtitle={section.content.subtitle}
                      >
                        {section.content.title}
                      </SectionTitle>
                    </section>
                  )}

                  {section.type === 'transition' && (
                    <TransitionSection isLowPerformance={false} />
                  )}

                  {section.type === 'cta' && (
                    <FinalCtaSection
                      category={primaryStyle.category}
                      primaryStyle={primaryStyle}
                    />
                  )}
                </div>
              );
            })}
          </ResultPageWrapper>
        </div>

        {/* Properties Panel */}
        {isPropertiesPanelOpen && selectedElementId && (
          <PropertiesPanel
            section={sections.find(s => s.id === selectedElementId) || null}
            onUpdate={(updates) => {
              if (selectedElementId) {
                handleSectionUpdate(selectedElementId, updates);
              }
            }}
            onClose={() => {
              setIsPropertiesPanelOpen(false);
              setSelectedElementId(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RealComponentVisualEditor;
