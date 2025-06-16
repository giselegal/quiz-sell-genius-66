
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Monitor, Tablet, Smartphone } from 'lucide-react';
import { EditorElement } from '@/hooks/useModernEditor';

interface ModernCanvasProps {
  elements: EditorElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<EditorElement>) => void;
  onDeleteElement: (id: string) => void;
  onAddElement: (type: string) => void;
  isPreviewMode: boolean;
  viewport: 'desktop' | 'tablet' | 'mobile';
}

export const ModernCanvas: React.FC<ModernCanvasProps> = ({
  elements,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  onAddElement,
  isPreviewMode,
  viewport
}) => {
  const getViewportSize = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-sm';
      case 'tablet':
        return 'max-w-2xl';
      case 'desktop':
      default:
        return 'max-w-6xl';
    }
  };

  const getViewportIcon = () => {
    switch (viewport) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      case 'desktop':
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const renderElement = (element: EditorElement) => {
    const isSelected = selectedElementId === element.id;
    
    return (
      <div
        key={element.id}
        className={`relative p-4 border-2 border-dashed transition-colors cursor-pointer ${
          isSelected 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => onSelectElement(element.id)}
      >
        {/* Element content based on type */}
        <div className="min-h-[60px] flex items-center justify-center">
          {element.type === 'heading' && (
            <h2 className="text-2xl font-bold text-gray-800">
              {element.content.text || 'Título'}
            </h2>
          )}
          
          {element.type === 'text' && (
            <p className="text-gray-600">
              {element.content.text || 'Texto de exemplo'}
            </p>
          )}
          
          {element.type === 'image' && (
            <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded">
              {element.content.src ? (
                <img 
                  src={element.content.src} 
                  alt={element.content.alt || 'Imagem'} 
                  className="max-w-full max-h-full object-cover rounded"
                />
              ) : (
                <span className="text-gray-500">Imagem</span>
              )}
            </div>
          )}
          
          {element.type === 'button' && (
            <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              {element.content.text || 'Botão'}
            </button>
          )}
          
          {element.type === 'quiz-title' && (
            <h1 className="text-4xl font-bold text-center text-gray-800">
              {element.content.text || 'Título do Quiz'}
            </h1>
          )}
          
          {element.type === 'quiz-description' && (
            <p className="text-lg text-center text-gray-600">
              {element.content.text || 'Descrição do quiz aqui'}
            </p>
          )}
          
          {element.type === 'start-button' && (
            <button className="px-8 py-4 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition-colors">
              {element.content.text || 'Iniciar Quiz'}
            </button>
          )}
          
          {element.type === 'progress-bar' && (
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${element.content.progress || 30}%` }}
              />
            </div>
          )}
          
          {element.type === 'question-title' && (
            <h3 className="text-xl font-semibold text-gray-800">
              {element.content.text || 'Sua pergunta aqui?'}
            </h3>
          )}
          
          {element.type === 'question-options' && (
            <div className="space-y-3 w-full">
              {(element.content.options || ['Opção 1', 'Opção 2', 'Opção 3']).map((option, index) => (
                <button
                  key={index}
                  className="w-full p-3 text-left border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          
          {/* Fallback for unknown types */}
          {!['heading', 'text', 'image', 'button', 'quiz-title', 'quiz-description', 'start-button', 'progress-bar', 'question-title', 'question-options'].includes(element.type) && (
            <div className="text-gray-500 text-center">
              <div className="text-sm font-medium">{element.type}</div>
              <div className="text-xs">Componente não implementado</div>
            </div>
          )}
        </div>
        
        {/* Selection overlay */}
        {isSelected && (
          <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none" />
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Canvas Header */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getViewportIcon()}
            <span className="text-sm font-medium text-gray-700">
              {viewport === 'mobile' ? 'Mobile' : viewport === 'tablet' ? 'Tablet' : 'Desktop'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {isPreviewMode && (
              <div className="flex items-center gap-1 text-green-600">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Preview</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Canvas Content */}
      <ScrollArea className="flex-1">
        <div className="p-8">
          <div className={`mx-auto ${getViewportSize()} bg-white min-h-[600px] shadow-lg rounded-lg overflow-hidden`}>
            {elements.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-gray-500">
                <Plus className="w-12 h-12 mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum componente adicionado</h3>
                <p className="text-center mb-4">
                  Selecione componentes na barra lateral para começar a construir sua tela.
                </p>
                <Button 
                  onClick={() => onAddElement('heading')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Título
                </Button>
              </div>
            ) : (
              <div className="space-y-4 p-4">
                {elements
                  .sort((a, b) => a.order - b.order)
                  .map(renderElement)}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
