
import React from 'react';
import { Block } from '@/types/editor';
import { cn } from '@/lib/utils';
import { StyleResult } from '@/types/quiz';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BlockPreviewRenderer } from './BlockPreviewRenderer';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface PreviewPanelProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string) => void;
  isPreviewing: boolean;
  viewportSize: 'sm' | 'md' | 'lg' | 'xl';
  primaryStyle?: StyleResult;
  onReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
}

const viewportWidths = {
  sm: 375, // Mobile
  md: 768, // Tablet
  lg: 1024, // Desktop
  xl: 1280, // Large Desktop
};

export function PreviewPanel({
  blocks,
  selectedBlockId,
  onSelectBlock,
  isPreviewing,
  viewportSize,
  primaryStyle,
  onReorderBlocks
}: PreviewPanelProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;
    
    const oldIndex = blocks.findIndex(block => block.id === active.id);
    const newIndex = blocks.findIndex(block => block.id === over.id);
    
    onReorderBlocks(oldIndex, newIndex);
  };

  return (
    <div className="h-full flex flex-col bg-[#FAF9F7] overflow-hidden">
      <div className="flex-1 overflow-hidden p-4">
        <div className="h-full flex justify-center">
          <div 
            className={cn(
              "bg-white rounded-md shadow overflow-hidden transition-all duration-200 h-full",
              isPreviewing ? "shadow-md" : "shadow-sm"
            )}
            style={{ 
              width: `${viewportWidths[viewportSize]}px`,
              maxWidth: '100%'
            }}
          >
            <ScrollArea className="h-full">
              <div className="p-4">
                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={blocks.map(block => block.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {blocks.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-[#B89B7A]/30 rounded-lg p-6 text-center">
                        <p className="text-[#8F7A6A]">Adicione componentes do painel esquerdo para começar</p>
                      </div>
                    ) : (
                      blocks.map(block => (
                        <BlockPreviewRenderer
                          key={block.id}
                          block={block}
                          isSelected={block.id === selectedBlockId}
                          isPreviewing={isPreviewing}
                          onSelect={() => onSelectBlock(block.id)}
                          primaryStyle={primaryStyle}
                        />
                      ))
                    )}
                  </SortableContext>
                </DndContext>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
