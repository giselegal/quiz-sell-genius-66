
import React, { useState, useCallback } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Save, Eye, EyeOff, Plus, Settings } from 'lucide-react';
import { StyleResult } from '@/types/quiz';
import { toast } from '@/components/ui/use-toast';
import { ResultPageWrapper } from '@/components/layout/ResultPageWrapper';
import ResultHeaderSection from '@/components/quiz-sections/ResultHeaderSection';
import { TransitionSection } from '@/components/quiz-sections/TransitionSection';
import { FinalCtaSection } from '@/components/quiz-sections/FinalCtaSection';
import SectionTitle from '@/components/common/SectionTitle';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';

interface UnifiedResultPageEditorProps {
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

export const UnifiedResultPageEditor: React.FC<UnifiedResultPageEditorProps> = ({
  primaryStyle,
  secondaryStyles = []
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [sections, setSections] = useState<EditableSection[]>([
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
  ]);

  const handleSave = useCallback(() => {
    // Save the current configuration
    const config = {
      sections,
      primaryStyle,
      secondaryStyles,
      lastModified: Date.now()
    };
    
    localStorage.setItem('resultPageConfig', JSON.stringify(config));
    
    toast({
      title: "Configuração salva",
      description: "As alterações foram salvas com sucesso.",
      duration: 3000
    });
  }, [sections, primaryStyle, secondaryStyles]);

  const handleSectionUpdate = useCallback((sectionId: string, updates: Partial<EditableSection>) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  }, []);

  const handleSectionToggle = useCallback((sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, visible: !section.visible } : section
    ));
  }, []);

  const visibleSections = sections.filter(section => section.visible).sort((a, b) => a.order - b.order);

  // Mock user data for preview
  const mockUser = { userName: 'Maria' };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Toolbar */}
      <div className="border-b bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-playfair text-[#432818]">
              Editor Unificado - Página de Resultado
            </h1>
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {primaryStyle.category}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              {isPreviewMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {isPreviewMode ? 'Editar' : 'Preview'}
            </Button>
            
            <Button onClick={handleSave} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Sidebar - Sections */}
          {!isPreviewMode && (
            <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
              <div className="h-full bg-white border-r border-gray-200 p-4">
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Seções</h3>
                </div>
                
                <div className="space-y-2">
                  {sections.map((section) => (
                    <div
                      key={section.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedSection === section.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedSection(section.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          {section.name}
                        </span>
                        <input
                          type="checkbox"
                          checked={section.visible}
                          onChange={() => handleSectionToggle(section.id)}
                          className="rounded"
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {section.type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ResizablePanel>
          )}

          {!isPreviewMode && <ResizableHandle withHandle />}

          {/* Center - Preview */}
          <ResizablePanel defaultSize={isPreviewMode ? 100 : 55}>
            <div className="h-full overflow-auto">
              <ResultPageWrapper>
                {visibleSections.map((section) => {
                  switch (section.type) {
                    case 'header':
                      return (
                        <div key={section.id} className={selectedSection === section.id ? 'ring-2 ring-blue-500' : ''}>
                          <ResultHeaderSection
                            primaryStyle={primaryStyle}
                            secondaryStyles={secondaryStyles}
                            user={mockUser}
                            isLowPerformance={false}
                            onImageLoad={() => {}}
                          />
                        </div>
                      );

                    case 'title':
                      return (
                        <section key={section.id} className={`scroll-mt-24 mb-24 lg:mb-28 ${selectedSection === section.id ? 'ring-2 ring-blue-500' : ''}`}>
                          <SectionTitle
                            variant="primary"
                            size="xl"
                            subtitle={section.content.subtitle}
                          >
                            {section.content.title}
                          </SectionTitle>
                        </section>
                      );

                    case 'transition':
                      return (
                        <div key={section.id} className={selectedSection === section.id ? 'ring-2 ring-blue-500' : ''}>
                          <TransitionSection isLowPerformance={false} />
                        </div>
                      );

                    case 'cta':
                      return (
                        <div key={section.id} className={selectedSection === section.id ? 'ring-2 ring-blue-500' : ''}>
                          <FinalCtaSection
                            category={primaryStyle.category}
                            primaryStyle={primaryStyle}
                          />
                        </div>
                      );

                    default:
                      return null;
                  }
                })}
              </ResultPageWrapper>
            </div>
          </ResizablePanel>

          {!isPreviewMode && <ResizableHandle withHandle />}

          {/* Right Sidebar - Properties */}
          {!isPreviewMode && selectedSection && (
            <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
              <div className="h-full bg-white border-l border-gray-200 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Propriedades</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSection(null)}
                  >
                    ✕
                  </Button>
                </div>
                
                {(() => {
                  const section = sections.find(s => s.id === selectedSection);
                  if (!section) return null;

                  return (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome da Seção
                        </label>
                        <input
                          type="text"
                          value={section.name}
                          onChange={(e) => handleSectionUpdate(section.id, { name: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      {section.type === 'title' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Título
                            </label>
                            <input
                              type="text"
                              value={section.content.title}
                              onChange={(e) => handleSectionUpdate(section.id, {
                                content: { ...section.content, title: e.target.value }
                              })}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Subtítulo
                            </label>
                            <textarea
                              value={section.content.subtitle}
                              onChange={(e) => handleSectionUpdate(section.id, {
                                content: { ...section.content, subtitle: e.target.value }
                              })}
                              className="w-full p-2 border border-gray-300 rounded-md h-20"
                            />
                          </div>
                        </>
                      )}

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`visible-${section.id}`}
                          checked={section.visible}
                          onChange={() => handleSectionToggle(section.id)}
                          className="rounded"
                        />
                        <label htmlFor={`visible-${section.id}`} className="text-sm text-gray-700">
                          Seção visível
                        </label>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </ResizablePanel>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default UnifiedResultPageEditor;
