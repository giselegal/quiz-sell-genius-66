import React from 'react';
import { useDroppable, useSortable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layout, Trash2, Copy, GripVertical, Eye, EyeOff } from 'lucide-react';
import { getComponentDefinition } from './ComponentRegistry';

interface DropZoneCanvasProps {
  items: any[];
  previewMode: 'desktop' | 'tablet' | 'mobile';
  selectedItemId: string | null;
  onSelectItem: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
}

const SortableCanvasItem: React.FC<{
  item: any;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  previewMode: string;
}> = ({ item, isSelected, onSelect, onDelete, previewMode }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: item.id,
    data: { type: 'canvas-item' }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const componentDef = getComponentDefinition(item.type);
  const renderComponent = () => {
    switch (item.type) {
      case 'text':
        return (
          <div
            style={{
              fontSize: `${item.props.fontSize}px`,
              color: item.props.color,
              fontWeight: item.props.fontWeight,
              textAlign: item.props.textAlign,
              lineHeight: item.props.lineHeight
            }}
            className="whitespace-pre-wrap"
          >
            {item.props.content}
          </div>
        );

      case 'heading':
        const HeadingTag = `h${item.props.level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag
            style={{
              fontSize: `${item.props.fontSize}px`,
              color: item.props.color,
              fontWeight: item.props.fontWeight,
              textAlign: item.props.textAlign,
              background: item.props.gradient 
                ? `linear-gradient(135deg, ${item.props.gradientFrom}, ${item.props.gradientTo})`
                : undefined,
              WebkitBackgroundClip: item.props.gradient ? 'text' : undefined,
              WebkitTextFillColor: item.props.gradient ? 'transparent' : undefined
            }}
            className="m-0"
          >
            {item.props.content}
          </HeadingTag>
        );

      case 'image':
        return (
          <div className="text-center">
            <img
              src={item.props.src}
              alt={item.props.alt}
              style={{
                width: `${item.props.width}px`,
                height: `${item.props.height}px`,
                borderRadius: `${item.props.borderRadius}px`,
                objectFit: item.props.objectFit
              }}
              className={`inline-block ${item.props.shadow ? 'shadow-lg' : ''}`}
            />
            {item.props.caption && (
              <p className="text-sm text-gray-600 mt-2">{item.props.caption}</p>
            )}
          </div>
        );

      case 'button':
        return (
          <div className={`${item.props.fullWidth ? 'w-full' : 'inline-block'}`}>
            <button
              style={{
                backgroundColor: item.props.backgroundColor,
                color: item.props.textColor,
                borderRadius: `${item.props.borderRadius}px`,
                padding: item.props.padding,
                fontSize: `${item.props.fontSize}px`,
                fontWeight: item.props.fontWeight,
                background: item.props.gradient 
                  ? `linear-gradient(135deg, ${item.props.gradientFrom}, ${item.props.gradientTo})`
                  : item.props.backgroundColor
              }}
              className={`border-none cursor-pointer transition-opacity hover:opacity-90 ${
                item.props.fullWidth ? 'w-full' : ''
              }`}
            >
              {item.props.text}
            </button>
          </div>
        );

      case 'input':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {item.props.label}
            </label>
            <input
              type={item.props.type}
              placeholder={item.props.placeholder}
              style={{
                borderRadius: `${item.props.borderRadius}px`,
                borderColor: item.props.borderColor,
                backgroundColor: item.props.backgroundColor,
                padding: item.props.padding
              }}
              className="w-full border-2 outline-none focus:border-blue-500"
              readOnly
            />
          </div>
        );

      case 'spacer':
        return (
          <div
            style={{
              height: `${item.props.height}px`,
              backgroundColor: item.props.backgroundColor
            }}
            className="w-full"
          />
        );

      case 'alert':
        const alertColors = {
          info: 'bg-blue-50 border-blue-200 text-blue-800',
          warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
          error: 'bg-red-50 border-red-200 text-red-800',
          success: 'bg-green-50 border-green-200 text-green-800'
        };
        
        return (
          <div className={`p-4 border rounded-lg ${alertColors[item.props.variant] || alertColors.info}`}>
            {item.props.title && (
              <h4 className="font-semibold mb-2">{item.props.title}</h4>
            )}
            <p>{item.props.content}</p>
          </div>
        );

      case 'testimonial':
        return (
          <Card className="p-6 text-center">
            <div className="mb-4">
              <img
                src={item.props.avatar}
                alt={item.props.author}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <blockquote className="text-lg italic mb-4">
                "{item.props.quote}"
              </blockquote>
              <div>
                <p className="font-semibold">{item.props.author}</p>
                <p className="text-sm text-gray-600">{item.props.role}</p>
              </div>
            </div>
          </Card>
        );

      default:
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
            <componentDef?.icon className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">{componentDef?.label || 'Componente'}</p>
          </div>
        );
    }
  };

  // Responsive container
  const getContainerClass = () => {
    switch (previewMode) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'max-w-4xl mx-auto';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group mb-4 ${getContainerClass()} ${
        isDragging ? 'opacity-50' : ''
      } ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
      onClick={onSelect}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className={`absolute -left-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab ${
          isSelected ? 'opacity-100' : ''
        }`}
      >
        <div className="w-6 h-6 bg-gray-500 text-white rounded flex items-center justify-center">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Component Content */}
      <div className="relative">
        {renderComponent()}
      </div>

      {/* Actions */}
      <div className={`absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${
        isSelected ? 'opacity-100' : ''
      }`}>
        <Button
          variant="destructive"
          size="sm"
          className="w-6 h-6 p-0"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-blue-500 rounded pointer-events-none" />
      )}
    </div>
  );
};

export const DropZoneCanvas: React.FC<DropZoneCanvasProps> = ({
  items,
  previewMode,
  selectedItemId,
  onSelectItem,
  onDeleteItem
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
    data: { type: 'canvas' }
  });

  const getCanvasClass = () => {
    const baseClass = "min-h-[600px] p-8 border-2 border-dashed rounded-lg transition-colors";
    const responsiveClass = (() => {
      switch (previewMode) {
        case 'mobile':
          return 'max-w-sm mx-auto bg-white';
        case 'tablet':
          return 'max-w-2xl mx-auto bg-white';
        default:
          return 'max-w-6xl mx-auto bg-white';
      }
    })();

    return `${baseClass} ${responsiveClass} ${
      isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
    }`;
  };

  return (
    <div className="w-full">
      {/* Preview Mode Indicator */}
      <div className="text-center mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {previewMode === 'desktop' && 'Desktop (1200px+)'}
          {previewMode === 'tablet' && 'Tablet (768px - 1199px)'}
          {previewMode === 'mobile' && 'Mobile (até 767px)'}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={getCanvasClass()}
      >
        {items.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <Layout className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-medium mb-2">Canvas Vazio</h3>
            <p className="text-sm">
              Arraste componentes da sidebar para começar a construir sua página
            </p>
          </div>
        ) : (
          <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-6">
              {items.map((item) => (
                <SortableCanvasItem
                  key={item.id}
                  item={item}
                  isSelected={selectedItemId === item.id}
                  onSelect={() => onSelectItem(item.id)}
                  onDelete={() => onDeleteItem(item.id)}
                  previewMode={previewMode}
                />
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
};
