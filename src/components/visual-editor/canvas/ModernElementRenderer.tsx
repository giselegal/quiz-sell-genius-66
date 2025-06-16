
import React, { useState } from 'react';
import { EditorElement } from '@/hooks/useModernEditor';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Trash2, 
  Copy, 
  ArrowUp, 
  ArrowDown,
  Edit,
  Settings
} from 'lucide-react';

interface ModernElementRendererProps {
  element: EditorElement;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<EditorElement>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export const ModernElementRenderer: React.FC<ModernElementRendererProps> = ({
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
  const [isEditing, setIsEditing] = useState(false);

  // Don't render if element is not visible
  if (element.visible === false && !isSelected) {
    return null;
  }

  const handleContentChange = (newContent: any) => {
    onUpdate({ content: { ...element.content, ...newContent } });
  };

  const handleStyleChange = (newStyle: any) => {
    onUpdate({ style: { ...element.style, ...newStyle } });
  };

  const renderElementContent = () => {
    switch (element.type) {
      case 'heading':
      case 'quiz-title':
      case 'question-title':
        return (
          <h1 
            style={element.style}
            className={`${isEditing ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => !isPreviewMode && setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onInput={(e) => {
              if (isEditing) {
                handleContentChange({ text: e.currentTarget.textContent });
              }
            }}
          >
            {element.content.text || 'Título'}
          </h1>
        );

      case 'text':
      case 'quiz-description':
        return (
          <p 
            style={element.style}
            className={`${isEditing ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => !isPreviewMode && setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onInput={(e) => {
              if (isEditing) {
                handleContentChange({ text: e.currentTarget.textContent });
              }
            }}
          >
            {element.content.text || 'Texto'}
          </p>
        );

      case 'button':
      case 'start-button':
      case 'cta-button':
      case 'purchase-button':
        return (
          <button 
            style={element.style}
            className={`${isEditing ? 'ring-2 ring-blue-500' : ''}`}
            onClick={(e) => {
              if (!isPreviewMode) {
                e.preventDefault();
                setIsEditing(true);
              }
            }}
            onBlur={() => setIsEditing(false)}
          >
            {isEditing ? (
              <input
                type="text"
                value={element.content.text || 'Botão'}
                onChange={(e) => handleContentChange({ text: e.target.value })}
                className="bg-transparent border-none outline-none text-center w-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsEditing(false);
                  }
                }}
                autoFocus
              />
            ) : (
              element.content.text || 'Botão'
            )}
          </button>
        );

      case 'image':
      case 'logo':
        return (
          <div style={element.style}>
            <img 
              src={element.content.image || 'https://via.placeholder.com/400x300'} 
              alt={element.content.alt || 'Imagem'} 
              style={{ width: '100%', height: 'auto' }}
              className={`${isEditing ? 'ring-2 ring-blue-500' : ''}`}
            />
            {!isPreviewMode && (
              <div className="mt-2">
                <input
                  type="url"
                  placeholder="URL da imagem"
                  value={element.content.image || ''}
                  onChange={(e) => handleContentChange({ image: e.target.value })}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
            )}
          </div>
        );

      case 'question-options':
        return (
          <div style={element.style} className="grid gap-4">
            {element.content.options?.map((option, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                {option.image && (
                  <img 
                    src={option.image} 
                    alt={option.text} 
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <p className="text-center font-medium">{option.text}</p>
              </div>
            )) || <div className="text-gray-500">Nenhuma opção definida</div>}
          </div>
        );

      case 'result-display':
        return (
          <div style={element.style} className="text-center">
            <h2 className="text-2xl font-bold mb-4">{element.content.text || 'Resultado'}</h2>
            {element.content.subtitle && (
              <p className="text-gray-600">{element.content.subtitle}</p>
            )}
          </div>
        );

      case 'offer-preview':
      case 'offer-hero':
        return (
          <div style={element.style} className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">{element.content.text || 'Oferta Especial'}</h2>
            {element.content.subtitle && (
              <p className="text-xl opacity-90">{element.content.subtitle}</p>
            )}
          </div>
        );

      case 'pricing':
        return (
          <div style={element.style} className="text-center bg-green-50 p-6 rounded-lg border-2 border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {element.content.text || 'R$ 247'}
            </div>
            {element.content.subtitle && (
              <p className="text-gray-600">{element.content.subtitle}</p>
            )}
          </div>
        );

      case 'benefits-list':
        return (
          <div style={element.style}>
            <h3 className="text-xl font-bold mb-4">{element.content.text || 'Benefícios'}</h3>
            <ul className="space-y-2">
              {element.content.options?.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {benefit.text}
                </li>
              )) || <li className="text-gray-500">Nenhum benefício definido</li>}
            </ul>
          </div>
        );

      case 'header':
        return (
          <header style={element.style} className="bg-white shadow-sm border-b p-4">
            <div className="container mx-auto">
              <h1 className="text-xl font-bold">{element.content.text || 'Cabeçalho'}</h1>
            </div>
          </header>
        );

      case 'progress-bar':
        return (
          <div style={element.style} className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${element.content.progress || 0}%` }}
            ></div>
          </div>
        );

      case 'navigation-buttons':
        return (
          <div style={element.style} className="flex justify-between gap-4">
            <Button variant="outline">Anterior</Button>
            <Button>Próximo</Button>
          </div>
        );

      case 'spacer':
        return (
          <div 
            style={{ 
              height: element.style.height || '2rem',
              ...element.style 
            }} 
            className="w-full"
          />
        );

      default:
        return (
          <div style={element.style} className="p-4 border-2 border-dashed border-gray-300 rounded">
            <p className="text-gray-500 text-center">
              Componente: {element.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div 
      className={`relative group transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      } ${element.visible === false ? 'opacity-50' : ''} ${
        element.locked ? 'pointer-events-none' : ''
      }`}
      onClick={onSelect}
    >
      {/* Element Content */}
      <div className={element.locked ? 'opacity-60' : ''}>
        {renderElementContent()}
      </div>

      {/* Controls Overlay (only in edit mode) */}
      {!isPreviewMode && isSelected && (
        <div className="absolute -top-10 left-0 right-0 flex items-center justify-between bg-white border rounded-lg shadow-lg p-2 z-10">
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onUpdate({ visible: !element.visible });
              }}
            >
              {element.visible !== false ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onUpdate({ locked: !element.locked });
              }}
            >
              {element.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
              disabled={!canMoveUp}
            >
              <ArrowUp className="h-3 w-3" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
              disabled={!canMoveDown}
            >
              <ArrowDown className="h-3 w-3" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Locked indicator */}
      {element.locked && !isPreviewMode && (
        <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded">
          <Lock className="h-3 w-3" />
        </div>
      )}
    </div>
  );
};
