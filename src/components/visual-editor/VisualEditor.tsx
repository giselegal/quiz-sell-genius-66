
import React, { useState } from 'react';
import { ComponentsSidebar } from './sidebar/ComponentsSidebar';
import { PreviewPanel } from './preview/PreviewPanel';
import { PropertiesPanel } from './properties/PropertiesPanel';
import { useEditor } from '@/hooks/useEditor';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import { BlockType } from '@/types/editor';

export function VisualEditor() {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const { config, addBlock, updateBlock, deleteBlock, reorderBlocks, saveConfig } = useEditor();

  const handleComponentSelect = (type: BlockType) => {
    const newBlockId = addBlock(type);
    setSelectedBlockId(newBlockId);
  };

  const handleBlockSelect = (id: string) => {
    setSelectedBlockId(id);
  };

  const handleUpdateBlock = (content: any) => {
    if (selectedBlockId) {
      updateBlock(selectedBlockId, content);
    }
  };

  const handleDeleteBlock = () => {
    if (selectedBlockId) {
      deleteBlock(selectedBlockId);
      setSelectedBlockId(null);
    }
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      {/* Sidebar */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <ComponentsSidebar onComponentSelect={handleComponentSelect} />
      </ResizablePanel>
      <ResizableHandle withHandle />

      {/* Preview */}
      <ResizablePanel defaultSize={55}>
        <PreviewPanel
          blocks={config.blocks}
          selectedBlockId={selectedBlockId}
          onSelect={handleBlockSelect}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />

      {/* Properties */}
      <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
        <PropertiesPanel
          selectedBlockId={selectedBlockId}
          onClose={() => setSelectedBlockId(null)}
          onUpdate={handleUpdateBlock}
          onDelete={handleDeleteBlock}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
