
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from './sidebar/ComponentsSidebar';
import { PreviewPanel } from './preview/PreviewPanel';
import { PropertiesPanel } from './properties/PropertiesPanel';
import { EditorToolbar } from './toolbar/EditorToolbar';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';

interface EnhancedEditorLayoutProps {
  blocks: Block[];
  selectedBlockId: string | null;
  isPreviewing: boolean;
  primaryStyle?: StyleResult;
  viewportSize: 'sm' | 'md' | 'lg' | 'xl';
  onViewportSizeChange: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  onSelectBlock: (id: string | null) => void;
  onAddBlock: (type: Block['type']) => void;
  onUpdateBlock: (id: string, content: any) => void;
  onDeleteBlock: (id: string) => void;
  onReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
  onTogglePreview: () => void;
  onSave: () => void;
}

export const EnhancedEditorLayout: React.FC<EnhancedEditorLayoutProps> = ({
  blocks,
  selectedBlockId,
  isPreviewing,
  primaryStyle,
  viewportSize,
  onViewportSizeChange,
  onSelectBlock,
  onAddBlock,
  onUpdateBlock,
  onDeleteBlock,
  onReorderBlocks,
  onTogglePreview,
  onSave
}) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <EditorToolbar 
        isPreviewing={isPreviewing}
        viewportSize={viewportSize}
        onViewportSizeChange={onViewportSizeChange}
        onTogglePreview={onTogglePreview}
        onSave={onSave}
      />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <ComponentsSidebar onComponentSelect={onAddBlock} />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={55}>
          <PreviewPanel
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={onSelectBlock}
            isPreviewing={isPreviewing}
            viewportSize={viewportSize}
            primaryStyle={primaryStyle}
            onReorderBlocks={onReorderBlocks}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
          <PropertiesPanel
            selectedBlockId={selectedBlockId}
            blocks={blocks}
            onClose={() => onSelectBlock(null)}
            onUpdate={onUpdateBlock}
            onDelete={onDeleteBlock}
            isMobile={viewportSize === 'sm'}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
