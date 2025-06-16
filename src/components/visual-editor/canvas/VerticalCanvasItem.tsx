
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EditableHeading } from './editable/EditableHeading';
import { EditableImage } from './editable/EditableImage';
import { EditableInput } from './editable/EditableInput';
import { EditableButton } from './editable/EditableButton';
import { EditableText } from './editable/EditableText';

interface CanvasElement {
  id: string;
  type: 'headline' | 'text' | 'image' | 'form' | 'button';
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

  const renderElement = () => {
    const commonProps = {
      content: element.content,
      isSelected,
      isPreviewMode,
      onUpdate,
    };

    switch (element.type) {
      case 'headline':
        return <EditableHeading {...commonProps} />;
      case 'text':
        return <EditableText {...commonProps} />;
      case 'image':
        return <EditableImage {...commonProps} />;
      case 'form':
        return <EditableInput {...commonProps} />;
      case 'button':
        return <EditableButton {...commonProps} />;
      default:
        return <div>Tipo de elemento desconhecido: {element.type}</div>;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(!isPreviewMode ? listeners : {})}
      className={`
        group/canvas-item max-w-full canvas-item min-h-[1.25rem] relative self-auto mr-auto
        ${!isPreviewMode ? 'cursor-move' : ''}
      `}
      onClick={!isPreviewMode ? onSelect : undefined}
    >
      <div
        className={`
          min-h-[1.25rem] min-w-full relative self-auto box-border
          ${!isPreviewMode ? 'group-hover/canvas-item:border-2 border-dashed hover:border-2' : ''}
          ${isSelected && !isPreviewMode ? 'border-2 border-blue-500' : 'border-transparent'}
          rounded-md transition-all duration-200
        `}
        style={{ 
          opacity: 1,
          willChange: 'transform',
          flexBasis: '100%'
        }}
      >
        {renderElement()}
      </div>

      {/* Delete button for editor mode */}
      {!isPreviewMode && isSelected && (
        <button
          className="absolute top-2 right-2 z-10 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};
