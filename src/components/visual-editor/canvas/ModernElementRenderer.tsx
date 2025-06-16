
import React, { useState } from 'react';
import { EditorElement } from '@/hooks/useModernEditor';
import { Button } from '@/components/ui/button';
import { Trash2, Move, Settings } from 'lucide-react';

interface ModernElementRendererProps {
  element: EditorElement;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<EditorElement>) => void;
  onDelete: () => void;
}

export const ModernElementRenderer: React.FC<ModernElementRendererProps> = ({
  element,
  isSelected,
  isPreviewMode,
  onSelect,
  onUpdate,
  onDelete
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderContent = () => {
    switch (element.type) {
      case 'heading':
        const HeadingTag = element.content.level || 'h2';
        return (
          <HeadingTag 
            style={element.style}
            className="m-0"
          >
            {element.content.text || 'Título'}
          </HeadingTag>
        );
      
      case 'text':
        return (
          <p style={element.style} className="m-0">
            {element.content.text || 'Texto aqui...'}
          </p>
        );
      
      case 'button':
        return (
          <button
            style={element.style}
            className="border-none cursor-pointer"
            onClick={(e) => {
              if (!isPreviewMode) e.preventDefault();
            }}
          >
            {element.content.text || 'Botão'}
          </button>
        );
      
      case 'image':
        return (
          <div style={element.style} className="bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center">
            {element.content.src ? (
              <img 
                src={element.content.src} 
                alt={element.content.alt || 'Imagem'}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm">Clique para adicionar imagem</span>
            )}
          </div>
        );
      
      case 'video':
        return (
          <div style={element.style} className="bg-gray-900 rounded flex items-center justify-center">
            {element.content.src ? (
              <video 
                src={element.content.src} 
                controls
                className="w-full h-full"
              />
            ) : (
              <span className="text-white text-sm">Clique para adicionar vídeo</span>
            )}
          </div>
        );
      
      case 'spacer':
        return (
          <div 
            style={{ height: element.content.height || 40 }}
            className="w-full bg-transparent"
          >
            {!isPreviewMode && (
              <div className="w-full h-full border border-dashed border-gray-300 flex items-center justify-center">
                <span className="text-xs text-gray-400">Espaçador</span>
              </div>
            )}
          </div>
        );
      
      case 'divider':
        return (
          <hr 
            style={{
              ...element.style,
              borderStyle: element.content.style || 'solid',
              borderColor: element.content.color || '#e5e7eb',
              borderWidth: '1px 0 0 0',
              margin: 0
            }}
          />
        );
      
      default:
        return <div>Componente não suportado</div>;
    }
  };

  const elementStyle = {
    position: 'absolute' as const,
    left: element.position.x,
    top: element.position.y,
    width: element.size.width,
    height: element.type === 'spacer' ? element.content.height || 40 : element.size.height,
    cursor: isPreviewMode ? 'default' : 'pointer',
    zIndex: isSelected ? 10 : 1,
  };

  if (isPreviewMode) {
    return (
      <div style={elementStyle}>
        {renderContent()}
      </div>
    );
  }

  return (
    <div
      style={elementStyle}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group transition-all ${
        isSelected 
          ? 'ring-2 ring-blue-500 ring-offset-2' 
          : isHovered 
          ? 'ring-1 ring-gray-400' 
          : ''
      }`}
    >
      {renderContent()}
      
      {/* Toolbar de controles */}
      {(isSelected || isHovered) && (
        <div className="absolute -top-10 left-0 bg-white border border-gray-200 rounded-md shadow-sm flex items-center gap-1 p-1">
          <Button
            size="sm"
            variant="ghost"
            className="w-6 h-6 p-0"
          >
            <Move className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="w-6 h-6 p-0"
          >
            <Settings className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className="w-6 h-6 p-0 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      )}
      
      {/* Label do tipo */}
      {isSelected && (
        <div className="absolute -bottom-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          {element.type}
        </div>
      )}
    </div>
  );
};
