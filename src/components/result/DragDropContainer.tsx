
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { BlockData } from '@/types/resultPageConfig';
import BlockRenderer from './BlockRenderer';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface DragDropContainerProps {
  blocks: BlockData[];
  onUpdateBlocks: (blocks: BlockData[]) => void;
  onEditBlock: (blockId: string) => void;
  onAddBlock: () => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  primaryStyle?: any;
  secondaryStyles?: any[];
  globalStyles?: any;
  user?: any;
  resultPageConfig?: any;
  onCTAClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isButtonHovered?: boolean;
  setIsButtonHovered?: (hovered: boolean) => void;
  timer?: { hours: number; minutes: number; seconds: number };
  imagesLoaded?: { style: boolean; guide: boolean };
  setImagesLoaded?: (state: { style: boolean; guide: boolean }) => void;
  isLowPerformance?: boolean;
  tokens?: any;
}

const DragDropContainer: React.FC<DragDropContainerProps> = ({
  blocks,
  onUpdateBlocks,
  onEditBlock,
  onAddBlock,
  isEditMode,
  onToggleEditMode,
  ...blockProps
}) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order property
    const updatedBlocks = items.map((block, index) => ({
      ...block,
      order: index
    }));

    onUpdateBlocks(updatedBlocks);
  };

  const toggleBlockVisibility = (blockId: string) => {
    const updatedBlocks = blocks.map(block =>
      block.id === blockId ? { ...block, visible: !block.visible } : block
    );
    onUpdateBlocks(updatedBlocks);
  };

  const deleteBlock = (blockId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este bloco?')) {
      const updatedBlocks = blocks.filter(block => block.id !== blockId);
      onUpdateBlocks(updatedBlocks);
    }
  };

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blocks">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-6"
            >
              {blocks
                .filter(block => block.visible)
                .sort((a, b) => a.order - b.order)
                .map((block, index) => (
                  <Draggable
                    key={block.id}
                    draggableId={block.id}
                    index={index}
                    isDragDisabled={!isEditMode}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`relative group ${isEditMode ? 'ring-2 ring-dashed ring-[#B89B7A]/40 rounded-lg' : ''}`}
                      >
                        {/* Edit Controls Overlay */}
                        {isEditMode && (
                          <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleBlockVisibility(block.id)}
                              className="bg-white/90 backdrop-blur-sm"
                            >
                              {block.visible ? (
                                <Eye className="w-4 h-4" />
                              ) : (
                                <EyeOff className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onEditBlock(block.id)}
                              className="bg-white/90 backdrop-blur-sm"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteBlock(block.id)}
                              className="bg-white/90 backdrop-blur-sm text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}

                        {/* Drag Handle */}
                        {isEditMode && (
                          <div
                            {...provided.dragHandleProps}
                            className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                          >
                            <div className="bg-white/90 backdrop-blur-sm rounded p-2 border">
                              <div className="w-4 h-4 flex flex-col justify-center">
                                <div className="h-0.5 bg-gray-400 mb-1"></div>
                                <div className="h-0.5 bg-gray-400 mb-1"></div>
                                <div className="h-0.5 bg-gray-400"></div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Block Content */}
                        <BlockRenderer
                          block={block}
                          isEditMode={isEditMode}
                          onClick={() => isEditMode && onEditBlock(block.id)}
                          {...blockProps}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DragDropContainer;
