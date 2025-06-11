
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { VisualEditorToolbar } from './toolbar/VisualEditorToolbar';
import { ResultPageSidebar } from './sidebar/ResultPageSidebar';
import { useResultPageBuilder } from '@/hooks/useResultPageBuilder';
import { ResultPageBlockType } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { BlockRenderer } from '@/components/result-editor/BlockRenderer';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    saveConfiguration
  } = useResultPageBuilder(primaryStyle, secondaryStyles);

  const handleElementAdd = (type: ResultPageBlockType) => {
    const elementId = addBlock(type);
    setSelectedBlockId(elementId);
  };

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
        
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {!isPreviewMode && (
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <ResultPageSidebar
                onComponentAdd={handleElementAdd}
                primaryStyle={primaryStyle}
              />
            </ResizablePanel>
          )}
          
          {!isPreviewMode && <ResizableHandle withHandle />}
          
          <ResizablePanel defaultSize={isPreviewMode ? 100 : 55}>
            <div className="h-full bg-gray-100 p-4 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="mx-auto max-w-5xl">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="space-y-4 p-4">
                      {blocks.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                          <p className="text-xl mb-2">Nenhum componente adicionado</p>
                          <p>Clique nos componentes da sidebar para começar</p>
                        </div>
                      ) : (
                        blocks
                          .sort((a, b) => a.order - b.order)
                          .map((block) => (
                            <BlockRenderer
                              key={block.id}
                              block={block}
                              primaryStyle={primaryStyle}
                              isSelected={selectedBlockId === block.id}
                              onSelect={() => setSelectedBlockId(block.id)}
                              onUpdate={(content) => updateBlock(block.id, { content })}
                            />
                          ))
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>
          
          {!isPreviewMode && <ResizableHandle withHandle />}
          
          {!isPreviewMode && selectedBlockId && (
            <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
              <div className="h-full bg-white border-l border-gray-200 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Propriedades</h3>
                  <button
                    onClick={() => setSelectedBlockId(null)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Elemento selecionado: {selectedBlockId}
                  </p>
                  <button
                    onClick={() => deleteBlock(selectedBlockId)}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
                    Remover Componente
                  </button>
                </div>
              </div>
            </ResizablePanel>
          )}
        </ResizablePanelGroup>
      </div>
    </DndProvider>
  );
};
