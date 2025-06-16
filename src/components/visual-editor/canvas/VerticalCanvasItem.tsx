
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Trash2, GripVertical, Edit3 } from 'lucide-react';
import { ElementRenderer } from './ElementRenderer';

interface CanvasElement {
  id: string;
  type: 'headline' | 'text' | 'image' | 'form' | 'button' | 'question-title' | 'question-options';
  content: any;
  order: number;
}

interface VerticalCanvasItemProps {
  element: CanvasElement;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onUpdate: (content: any) => void;
  onDelete: () => void;
}

export const VerticalCanvasItem: React.FC<VerticalCanvasItemProps> = ({
  element,
  isSelected,
  isPreviewMode,
  onSelect,
  onUpdate,
  onDelete
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: element.id,
    disabled: isPreviewMode
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative group mb-4 
        ${!isPreviewMode ? 'hover:bg-gray-50 hover:border border-gray-200 rounded-lg' : ''}
        ${isSelected && !isPreviewMode ? 'bg-blue-50 border-2 border-blue-300 rounded-lg' : ''}
        ${!isPreviewMode ? 'p-3' : ''}
      `}
      onClick={!isPreviewMode ? onSelect : undefined}
    >
      {/* Drag Handle and Controls */}
      {!isPreviewMode && (
        <div className="absolute -left-8 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Delete Button */}
      {!isPreviewMode && isSelected && (
        <div className="absolute -right-8 top-2 flex flex-col gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Element Content */}
      <ElementRenderer 
        type={element.type} 
        content={element.content}
        isSelected={isSelected}
        isPreviewMode={isPreviewMode}
        onUpdate={onUpdate}
      />

      {/* Element Type Badge */}
      {!isPreviewMode && isSelected && (
        <div className="absolute top-1 left-1">
          <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
            {element.type}
          </span>
        </div>
      )}
    </div>
  );
};
