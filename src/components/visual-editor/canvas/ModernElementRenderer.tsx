import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChevronUp, 
  ChevronDown, 
  Trash2, 
  MoreVertical,
  Eye,
  EyeOff,
  Copy,
  ArrowLeft
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EditorElement } from '@/hooks/useModernEditor';
import { MarqueeElement } from './elements/MarqueeElement';
import { FixedHeaderElement } from './elements/FixedHeaderElement';
import { Progress } from '@/components/ui/progress';

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
  const [isEditing, setIsEditing] = useState(false);

  const handleContentEdit = useCallback((newContent: string, field: string = 'text') => {
    onUpdate({
      content: { ...element.content, [field]: newContent }
    });
    setIsEditing(false);
  }, [element.content, onUpdate]);

  const handleDoubleClick = useCallback(() => {
    if (!isPreviewMode && ['text', 'heading', 'button', 'terms'].includes(element.type)) {
      setIsEditing(true);
    }
  }, [isPreviewMode, element.type]);

  // Handle special components
  if (element.type === 'marquee') {
    return (
      <MarqueeElement
        element={element}
        isSelected={isSelected}
        isPreviewMode={isPreviewMode}
        onSelect={onSelect}
        onUpdate={onUpdate}
      />
    );
  }

  if (element.type === 'fixed-header') {
    return (
      <FixedHeaderElement
        element={element}
        isSelected={isSelected}
        isPreviewMode={isPreviewMode}
        onSelect={onSelect}
        onUpdate={onUpdate}
      />
    );
  }

  const renderElement = () => {
    const commonStyle = {
      ...element.style,
      opacity: element.visible ? 1 : 0.5
    };

    switch (element.type) {
      case 'header':
        const {
          logoUrl = 'https://cakto-quiz-br01.b-cdn.net/uploads/47fd613e-91a9-48cf-bd52-a9d4e180d5ab.png',
          logoAlt = 'Logo',
          showBackButton = true,
          showProgress = true,
          currentStep = 1,
          totalSteps = 7,
          backgroundColor = '#FFFFFF'
        } = element.content;

        const progressValue = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

        return (
          <div 
            style={{...commonStyle, backgroundColor}}
            className="grid gap-4 opacity-100"
          >
            <div className="flex flex-row w-full h-auto justify-center relative">
              {showBackButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ghost hover:bg-primary hover:text-foreground h-10 w-10 absolute left-0"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              
              <div className="flex flex-col w-full max-w-sm justify-start items-center gap-4">
                <img
                  width="96"
                  height="96"
                  className="max-w-24 object-cover"
                  alt={logoAlt}
                  src={logoUrl}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/96x96?text=Logo';
                  }}
                />
                
                {showProgress && (
                  <Progress 
                    value={progressValue} 
                    className="relative w-full overflow-hidden rounded-full bg-zinc-300 h-2"
                  />
                )}
              </div>
            </div>
          </div>
        );

      case 'terms':
        return (
          <p
            style={commonStyle}
            className="w-full text-xs opacity-75 text-center max-w-sm mx-auto my-2"
            contentEditable={!isPreviewMode && isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              const newText = e.currentTarget.innerHTML;
              handleContentEdit(newText, 'html');
            }}
            onDoubleClick={handleDoubleClick}
            dangerouslySetInnerHTML={{
              __html: element.content.html || 'Ao clicar em alguma das opções, você concorda com os <b>Termos de utilização e serviço</b>, <b>Política de privacidade</b>, <b>Política de subscrição</b> e <b>Política de cookies</b>'
            }}
          />
        );

      case 'quiz-header':
        return (
          <div 
            style={commonStyle}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg text-center"
          >
            <h1 className="text-3xl font-bold mb-4">
              {element.content.title || 'Título do Quiz'}
            </h1>
            <p className="text-xl opacity-90">
              {element.content.subtitle || 'Descubra mais sobre você!'}
            </p>
          </div>
        );

      case 'quiz-question':
        return (
          <div style={commonStyle} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {element.content.question || 'Pergunta do Quiz'}
            </h2>
            <div className="space-y-3">
              {(element.content.options || ['Opção A', 'Opção B', 'Opção C']).map((option: string, index: number) => (
                <button
                  key={index}
                  className="w-full p-3 text-left bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 'heading':
        const level = element.content.level || 'h2';
        const Tag = level as keyof JSX.IntrinsicElements;
        return (
          <Tag
            style={commonStyle}
            className={`font-bold ${
              level === 'h1' ? 'text-4xl' :
              level === 'h2' ? 'text-3xl' :
              level === 'h3' ? 'text-2xl' :
              level === 'h4' ? 'text-xl' :
              level === 'h5' ? 'text-lg' : 'text-base'
            } ${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
            contentEditable={!isPreviewMode && isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit(e.currentTarget.textContent || '')}
            onDoubleClick={handleDoubleClick}
          >
            {element.content.text || 'Título Principal'}
          </Tag>
        );

      case 'text':
        return (
          <p
            style={commonStyle}
            className={`leading-relaxed ${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
            contentEditable={!isPreviewMode && isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit(e.currentTarget.textContent || '')}
            onDoubleClick={handleDoubleClick}
          >
            {element.content.text || 'Clique duas vezes para editar este texto'}
          </p>
        );

      case 'button':
        return (
          <button
            style={commonStyle}
            className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
              isSelected && !isPreviewMode ? 'outline-none ring-2 ring-blue-300' : ''
            }`}
            contentEditable={!isPreviewMode && isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit(e.currentTarget.textContent || '')}
            onDoubleClick={handleDoubleClick}
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
            className="rounded-lg max-w-full h-auto"
          />
        );

      case 'video':
        return (
          <div style={commonStyle} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            {element.content.src ? (
              <video 
                src={element.content.src} 
                controls 
                className="w-full h-full rounded-lg"
              />
            ) : (
              <span className="text-gray-500">
                📹 Adicione uma URL de vídeo
              </span>
            )}
          </div>
        );

      case 'spacer':
        return (
          <div
            style={{ 
              ...commonStyle, 
              height: element.content.height || '2rem',
              backgroundColor: isSelected && !isPreviewMode ? '#f3f4f6' : 'transparent'
            }}
            className={isSelected && !isPreviewMode ? 'border border-dashed border-gray-400 rounded' : ''}
          >
            {isSelected && !isPreviewMode && (
              <div className="flex items-center justify-center h-full">
                <span className="text-xs text-gray-500">Espaçador</span>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div style={commonStyle} className="p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 text-center text-sm">
              Componente: {element.type}
            </p>
            <p className="text-xs text-gray-400 text-center mt-1">
              {element.content.text || 'Clique para editar'}
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative group transition-all duration-200 ${
        !isPreviewMode ? 'hover:ring-1 hover:ring-blue-300' : ''
      } ${
        isSelected && !isPreviewMode ? 'ring-2 ring-blue-500' : ''
      } ${
        element.locked ? 'pointer-events-none opacity-50' : ''
      }`}
      onClick={() => !isPreviewMode && onSelect()}
    >
      {/* Element Controls */}
      {!isPreviewMode && isSelected && (
        <div className="absolute -top-10 left-0 z-50 flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-lg shadow-lg">
          <span className="text-xs font-medium">{element.type}</span>

          <div className="flex items-center gap-1 ml-2">
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
              <DropdownMenuContent align="start">
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
                  onClick={() => {
                    // TODO: Implement duplicate functionality
                    console.log('Duplicate element:', element.id);
                  }}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicar
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
