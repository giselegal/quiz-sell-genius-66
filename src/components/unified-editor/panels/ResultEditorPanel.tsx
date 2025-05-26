"use client";
import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { useBlockOperations } from '@/hooks/editor/useBlockOperations';
import { StyleResult } from '@/types/quiz';
import { UnifiedComponentsSidebar } from '../sidebar/UnifiedComponentsSidebar';
import StyleEditor from '@/components/result-editor/style-editors/StyleEditor';
import { EditorPreview } from '@/components/result-editor/EditorPreview';
import { Button } from '@/components/ui/button';

interface ResultEditorPanelProps {
  isPreviewing: boolean;
  primaryStyle: StyleResult;
}

const ResultEditorPanel: React.FC<ResultEditorPanelProps> = ({ 
  isPreviewing, 
  primaryStyle 
}) => {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  
  const {
    resultPageConfig,
    loading,
    actions: {
      updateSection
    }
  } = useResultPageEditor(primaryStyle.category);

  const {
    blocks,
    updateBlocks,
    actions: blockActions
  } = useBlockOperations();

  // Sync blocks with config when needed
  useEffect(() => {
    if (resultPageConfig?.blocks) {
      updateBlocks(resultPageConfig.blocks);
    }
  }, [resultPageConfig, updateBlocks]);

  // Update when a block is selected
  const handleBlockSelect = (blockId: string) => {
    setSelectedBlockId(blockId);
  };

  // Update block content and sync with result page config
  const handleUpdateBlock = (content: any) => {
    if (selectedBlockId) {
      blockActions.handleUpdateBlock(selectedBlockId, content);
      
      // Update resultPageConfig blocks to match
      const updatedBlocks = blocks.map(block => 
        block.id === selectedBlockId
          ? { ...block, content: { ...block.content, ...content } }
          : block
      );
      
      updateSection('blocks', updatedBlocks);
    }
  };

  // Delete block and sync with result page config
  const handleDeleteBlock = () => {
    if (selectedBlockId) {
      blockActions.handleDeleteBlock(selectedBlockId);
      setSelectedBlockId(null);
      
      // Update resultPageConfig blocks to match
      const updatedBlocks = blocks.filter(block => block.id !== selectedBlockId);
      updateSection('blocks', updatedBlocks);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-[#1A1818]/70">Carregando configurações...</p>
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <UnifiedComponentsSidebar
          activeTab="result"
          onComponentSelect={blockActions.handleAddBlock}
          activeStageType={null}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={55}>
        <EditorPreview
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          onSelectBlock={handleBlockSelect}
          isPreviewing={isPreviewing}
          primaryStyle={primaryStyle}
          onReorderBlocks={blockActions.handleReorderBlocks}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={25}>
        <div className="h-full border-l border-gray-200 bg-white overflow-auto">
          {selectedBlockId ? (
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg">Propriedades</h3>
                <Button 
                  onClick={() => setSelectedBlockId(null)} 
                  size="sm" 
                  variant="ghost"
                >
                  Fechar
                </Button>
              </div>
              
              {/* Style editor for the selected block */}
              <StyleEditor
                style={blocks.find(b => b.id === selectedBlockId)?.content?.style || {}}
                onUpdate={(style) => handleUpdateBlock({ style })}
              />
              
              <div className="mt-4 pt-4 border-t">
                <Button 
                  onClick={handleDeleteBlock} 
                  variant="destructive" 
                  size="sm"
                >
                  Remover Bloco
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Selecione um componente para editar suas propriedades
            </div>
          )}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ResultEditorPanel;
