
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Save, Eye, EyeOff, Undo, Redo } from 'lucide-react';
import { ResultPageWrapper } from '@/components/layout/ResultPageWrapper';
import ResultHeaderSection from '@/components/quiz-sections/ResultHeaderSection';
import { TransitionSection } from '@/components/quiz-sections/TransitionSection';
import { FinalCtaSection } from '@/components/quiz-sections/FinalCtaSection';
import SectionTitle from '@/components/common/SectionTitle';
import { EditableOverlay } from './EditableOverlay';
import { PropertiesPanel } from './PropertiesPanel';
import { useRealComponentEditor } from '@/hooks/useRealComponentEditor';

interface RealComponentVisualEditorProps {
  primaryStyle: StyleResult;
  secondaryStyles?: StyleResult[];
}

export const RealComponentVisualEditor: React.FC<RealComponentVisualEditorProps> = ({
  primaryStyle,
  secondaryStyles = []
}) => {
  const {
    isEditMode,
    selectedElementId,
    isPropertiesPanelOpen,
    sections,
    visibleSections,
    canUndo,
    canRedo,
    toggleEditMode,
    handleElementClick,
    handleSectionUpdate,
    handleSave,
    handleUndo,
    handleRedo,
    closePropertiesPanel
  } = useRealComponentEditor(primaryStyle, secondaryStyles);

  const mockUser = { userName: 'Maria' };

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
              disabled={!canUndo}
              title="Desfazer"
            >
              <Undo className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleRedo}
              disabled={!canRedo}
              title="Refazer"
            >
              <Redo className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={toggleEditMode}
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
            onClose={closePropertiesPanel}
          />
        )}
      </div>
    </div>
  );
};

export default RealComponentVisualEditor;
