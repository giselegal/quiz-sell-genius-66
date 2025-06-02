import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
  selectedBlockId?: string | null;
  onSelectBlock?: (blockId: string | null) => void;
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

interface SortableBlockItemProps {
  block: BlockData;
  isEditMode: boolean;
  isSelected?: boolean;
  onEditBlock: (blockId: string) => void;
  onSelectBlock?: (blockId: string) => void;
  toggleBlockVisibility: (blockId: string) => void;
  deleteBlock: (blockId: string) => void;
  blockProps: any;
}

const SortableBlockItem: React.FC<SortableBlockItemProps> = ({
  block,
  isEditMode,
  isSelected,
  onEditBlock,
  onSelectBlock,
  toggleBlockVisibility,
  deleteBlock,
  blockProps,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id, disabled: !isEditMode });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleBlockClick = (e: React.MouseEvent) => {
    if (isEditMode && onSelectBlock) {
      e.preventDefault();
      onSelectBlock(block.id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group cursor-pointer ${
        isEditMode ? 
          `ring-2 rounded-lg ${isSelected ? 'ring-[#B89B7A] ring-solid' : 'ring-dashed ring-[#B89B7A]/40'} hover:ring-[#B89B7A]/60` : 
          ''
      }`}
      onClick={handleBlockClick}
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
          {...attributes}
          {...listeners}
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
  );
};

const DragDropContainer: React.FC<DragDropContainerProps> = ({
  blocks,
  onUpdateBlocks,
  onEditBlock,
  onAddBlock,
  isEditMode,
  onToggleEditMode,
  selectedBlockId,
  onSelectBlock,
  ...blockProps
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const reorderedBlocks = arrayMove(blocks, oldIndex, newIndex);
        
        // Update order property
        const updatedBlocks = reorderedBlocks.map((block, index) => ({
          ...block,
          order: index
        }));

        onUpdateBlocks(updatedBlocks);
      }
    }
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

  const sortedBlocks = blocks
    .filter(block => block.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortedBlocks.map(block => block.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-6">
            {sortedBlocks.map((block) => (
              <SortableBlockItem
                key={block.id}
                block={block}
                isEditMode={isEditMode}
                isSelected={selectedBlockId === block.id}
                onEditBlock={onEditBlock}
                onSelectBlock={onSelectBlock}
                toggleBlockVisibility={toggleBlockVisibility}
                deleteBlock={deleteBlock}
                blockProps={blockProps}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DragDropContainer;
