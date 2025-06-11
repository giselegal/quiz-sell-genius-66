import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { VisualEditorToolbar } from './toolbar/VisualEditorToolbar';
import { ResultPageSidebar } from './sidebar/ResultPageSidebar';
import { ResultPageBuilderCanvas } from './canvas/ResultPageBuilderCanvas';
import { ResultPagePropertiesPanel } from './properties/ResultPagePropertiesPanel';
import { useResultPageBuilder } from '@/hooks/useResultPageBuilder';
import { StyleResult } from '@/types/quiz';

interface ResultPageBuilderProps {
  primaryStyle: StyleResult;
  secondaryStyles?: StyleResult[];
  onSave?: (config: any) => void;
  onPreview?: () => void;
}

export const ResultPageBuilder: React.FC<ResultPageBuilderProps> = ({
  primaryStyle,
  secondaryStyles,
  onSave,
  onPreview
}) => {
  const {
    blocks,
    selectedBlockId,
    isPreviewMode,
    setSelectedBlockId,
    setIsPreviewMode,
    addBlock,
    updateBlock,
    deleteBlock,
    moveBlock,
    saveConfiguration,
    loadConfiguration
  } = useResultPageBuilder(primaryStyle, secondaryStyles);

  useEffect(() => {
    loadConfiguration();
  }, [loadConfiguration]);

  const handleSave = async () => {
    const success = await saveConfiguration();
    if (success && onSave) {
      onSave({
        blocks,
        primaryStyle,
        secondaryStyles
      });
    }
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
    if (onPreview) {
      onPreview();
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        <VisualEditorToolbar
          isPreviewing={isPreviewMode}
          onPreviewToggle={handlePreview}
          onSave={handleSave}
          canUndo={false}
          canRedo={false}
          onUndo={() => {}}
          onRedo={() => {}}
          viewportMode="desktop"
          onViewportChange={() => {}}
        />
        
        <div className="flex flex-1 overflow-hidden">
          {!isPreviewMode && (
            <ResultPageSidebar
              onComponentAdd={(type) => {
                const newId = addBlock(type);
                setSelectedBlockId(newId);
              }}
              primaryStyle={primaryStyle}
            />
          )}
          
          <ResultPageBuilderCanvas
            blocks={blocks}
            primaryStyle={primaryStyle}
            secondaryStyles={secondaryStyles}
            selectedBlockId={selectedBlockId}
            isPreviewMode={isPreviewMode}
            onSelectBlock={setSelectedBlockId}
            onUpdateBlock={updateBlock}
            onDeleteBlock={deleteBlock}
            onMoveBlock={moveBlock}
          />
          
          {!isPreviewMode && selectedBlockId && (
            <ResultPagePropertiesPanel
              block={blocks.find(b => b.id === selectedBlockId) || null}
              onUpdate={(updates) => updateBlock(selectedBlockId, updates)}
              onClose={() => setSelectedBlockId(null)}
            />
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default ResultPageBuilder;
