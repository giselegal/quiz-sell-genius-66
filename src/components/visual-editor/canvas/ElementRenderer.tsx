
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChevronUp, 
  ChevronDown, 
  Trash2, 
  MoreVertical,
  Eye,
  EyeOff 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { VisualElement } from '@/types/visualEditor';

interface ElementRendererProps {
  element: VisualElement;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<VisualElement>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export const ElementRenderer: React.FC<ElementRendererProps> = ({
  element,
  isSelected,
  isPreviewMode,
  onSelect,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}) => {
  const handleContentEdit = useCallback((newContent: string) => {
    onUpdate({
      content: { ...element.content, text: newContent }
    });
  }, [element.content, onUpdate]);

  const renderElement = () => {
    const commonStyle = {
      ...element.style,
      opacity: element.visible ? 1 : 0.5
    };

    switch (element.type) {
      case 'title':
        const level = element.content.level || 'h2';
        const Tag = level as keyof JSX.IntrinsicElements;
        return (
          <Tag
            style={commonStyle}
            className={`${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit(e.currentTarget.textContent || '')}
          >
            {element.content.text || 'Título Principal'}
          </Tag>
        );

      case 'text':
        return (
          <p
            style={commonStyle}
            className={`${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit(e.currentTarget.textContent || '')}
          >
            {element.content.text || 'Clique para editar este texto'}
          </p>
        );

      case 'button':
        return (
          <button
            style={commonStyle}
            className={`${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit(e.currentTarget.textContent || '')}
          >
            {element.content.text || 'Clique Aqui'}
          </button>
        );

      case 'image':
        return (
          <img
            src={element.content.src || 'https://via.placeholder.com/400x200?text=Imagem'}
            alt={element.content.alt || 'Imagem'}
            style={commonStyle}
          />
        );

      case 'input':
      case 'email':
      case 'phone':
        return (
          <input
            type={element.content.type || 'text'}
            placeholder={element.content.placeholder || 'Digite aqui...'}
            style={commonStyle}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        );

      case 'video':
        return (
          <div style={commonStyle} className="aspect-video bg-gray-200 rounded flex items-center justify-center">
            <span className="text-gray-500">Vídeo: {element.content.src || 'URL não definida'}</span>
          </div>
        );

      case 'spacer':
        return (
          <div
            style={{ 
              ...commonStyle, 
              height: element.style.height || '2rem',
              backgroundColor: isSelected && !isPreviewMode ? '#f3f4f6' : 'transparent'
            }}
            className={isSelected && !isPreviewMode ? 'border border-dashed border-gray-400' : ''}
          >
            {isSelected && !isPreviewMode && (
              <span className="text-xs text-gray-500 p-1">Espaçador</span>
            )}
          </div>
        );

      default:
        return (
          <div style={commonStyle} className="p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded">
            <p className="text-gray-500 text-center text-sm">
              Componente: {element.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative group transition-all duration-200 ${
        !isPreviewMode ? 'hover:ring-2 hover:ring-blue-200' : ''
      } ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      } ${
        element.locked ? 'pointer-events-none' : ''
      }`}
      onClick={() => !isPreviewMode && onSelect()}
    >
      {/* Element Controls */}
      {!isPreviewMode && isSelected && (
        <div className="absolute -top-10 left-0 z-50 flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-lg shadow-lg">
          <span className="text-xs font-medium">{element.type}</span>

          <div className="flex items-center gap-1 ml-2">
            <Button
              size="sm"
              variant="ghost"
              className="w-6 h-6 p-0 text-white hover:bg-blue-700"
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
              disabled={!canMoveUp}
            >
              <ChevronUp className="w-3 h-3" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="w-6 h-6 p-0 text-white hover:bg-blue-700"
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
              disabled={!canMoveDown}
            >
              <ChevronDown className="w-3 h-3" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-6 h-6 p-0 text-white hover:bg-blue-700"
                >
                  <MoreVertical className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => onUpdate({ visible: !element.visible })}
                >
                  {element.visible ? (
                    <EyeOff className="w-4 h-4 mr-2" />
                  ) : (
                    <Eye className="w-4 h-4 mr-2" />
                  )}
                  {element.visible ? 'Ocultar' : 'Mostrar'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Deletar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      {/* Element Content */}
      <div className="p-2">
        {renderElement()}
      </div>
    </div>
  );
};
