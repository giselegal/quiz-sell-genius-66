
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
import { EditorElement } from '@/hooks/useModernEditor';

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
      case 'heading':
        return (
          <h2
            style={commonStyle}
            className={`text-2xl font-bold ${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit(e.currentTarget.textContent || '')}
          >
            {element.content.text || 'Título'}
          </h2>
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
            className={`px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
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
            className="max-w-full h-auto rounded"
          />
        );

      case 'quiz-title':
        return (
          <h1
            style={commonStyle}
            className={`text-4xl font-bold text-center ${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit(e.currentTarget.textContent || '')}
          >
            {element.content.text || 'Título do Quiz'}
          </h1>
        );

      case 'quiz-description':
        return (
          <p
            style={commonStyle}
            className={`text-lg text-center ${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit(e.currentTarget.textContent || '')}
          >
            {element.content.text || 'Descrição do quiz aqui'}
          </p>
        );

      case 'start-button':
        return (
          <button
            style={commonStyle}
            className={`px-8 py-4 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition-colors ${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit(e.currentTarget.textContent || '')}
          >
            {element.content.text || 'Iniciar Quiz'}
          </button>
        );

      case 'progress-bar':
        return (
          <div style={commonStyle} className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${element.content.progress || 30}%` }}
            />
          </div>
        );

      case 'question-title':
        return (
          <h3
            style={commonStyle}
            className={`text-xl font-semibold ${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit(e.currentTarget.textContent || '')}
          >
            {element.content.text || 'Sua pergunta aqui?'}
          </h3>
        );

      case 'question-options':
        return (
          <div style={commonStyle} className="space-y-3 w-full">
            {(element.content.options || ['Opção 1', 'Opção 2', 'Opção 3']).map((option, index) => (
              <button
                key={index}
                className="w-full p-3 text-left border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                {option}
              </button>
            ))}
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
