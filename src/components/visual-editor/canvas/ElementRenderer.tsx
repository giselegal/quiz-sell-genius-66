
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
            className={`font-playfair text-[#432818] ${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
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
            className={`text-[#8F7A6A] ${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
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
            className={`bg-[#B89B7A] text-white px-6 py-3 rounded-lg hover:bg-[#8F7A6A] transition-colors ${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
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
            className="rounded-lg shadow-lg"
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
            className="border border-[#B89B7A]/30 rounded px-3 py-2 w-full focus:border-[#B89B7A] focus:outline-none"
          />
        );

      case 'video':
        return (
          <div style={commonStyle} className="aspect-video bg-[#FAF9F7] rounded flex items-center justify-center border border-[#B89B7A]/20">
            <span className="text-[#8F7A6A]">Vídeo: {element.content.src || 'URL não definida'}</span>
          </div>
        );

      case 'spacer':
        return (
          <div
            style={{ 
              ...commonStyle, 
              height: element.style.height || '2rem',
              backgroundColor: isSelected && !isPreviewMode ? '#FAF9F7' : 'transparent'
            }}
            className={isSelected && !isPreviewMode ? 'border border-dashed border-[#B89B7A]' : ''}
          >
            {isSelected && !isPreviewMode && (
              <span className="text-xs text-[#8F7A6A] p-1">Espaçador</span>
            )}
          </div>
        );

      default:
        return (
          <div style={commonStyle} className="p-4 bg-[#FAF9F7] border-2 border-dashed border-[#B89B7A]/30 rounded">
            <p className="text-[#8F7A6A] text-center text-sm">
              Componente: {element.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative group transition-all duration-200 ${
        !isPreviewMode ? 'hover:ring-2 hover:ring-[#B89B7A]/40' : ''
      } ${
        isSelected ? 'ring-2 ring-[#B89B7A]' : ''
      } ${
        element.locked ? 'pointer-events-none' : ''
      }`}
      onClick={() => !isPreviewMode && onSelect()}
    >
      {/* Element Controls */}
      {!isPreviewMode && isSelected && (
        <div className="absolute -top-10 left-0 z-50 flex items-center gap-1 bg-[#B89B7A] text-white px-2 py-1 rounded-lg shadow-lg">
          <span className="text-xs font-medium">{element.type}</span>

          <div className="flex items-center gap-1 ml-2">
            <Button
              size="sm"
              variant="ghost"
              className="w-6 h-6 p-0 text-white hover:bg-[#8F7A6A]"
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
              className="w-6 h-6 p-0 text-white hover:bg-[#8F7A6A]"
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
                  className="w-6 h-6 p-0 text-white hover:bg-[#8F7A6A]"
                >
                  <MoreVertical className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-[9999]">
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
