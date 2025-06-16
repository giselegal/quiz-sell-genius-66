import React, { useState } from 'react';
import { EditorElement } from '@/hooks/useModernEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Trash2, 
  Copy, 
  Move, 
  Edit,
  ArrowLeft,
  AlertTriangle,
  Play,
  LoaderCircle
} from 'lucide-react';

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
      case 'quiz-header':
        return (
          <div style={element.style} className="w-full">
            <div className="flex flex-col gap-4 md:gap-6 p-3 md:p-5">
              <div className="flex flex-row w-full justify-center relative">
                {element.content.showBackButton && (
                  <button className="absolute left-0 p-2 hover:bg-gray-100 rounded-md">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <div className="flex flex-col w-full items-center gap-4">
                  {element.content.logo && (
                    <img 
                      src={element.content.logo} 
                      alt="Logo" 
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}
                  {element.content.title && (
                    <h1 className="text-xl font-bold text-center">
                      {element.content.title}
                    </h1>
                  )}
                  {element.content.showProgress && (
                    <div className="w-full max-w-md">
                      <div className="w-full bg-zinc-300 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${element.content.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'quiz-question':
        return (
          <div style={element.style} className="w-full">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-center">
                {element.content.question || 'Digite sua pergunta aqui'}
              </h1>
              
              <div className="flex flex-col gap-2">
                {(element.content.options || []).map((option: any, index: number) => (
                  <button
                    key={index}
                    className="w-full border border-zinc-200 bg-white hover:bg-blue-50 hover:border-blue-300 rounded-md p-4 transition-all duration-200 hover:shadow-lg text-left group"
                    onClick={(e) => !isPreviewMode && e.preventDefault()}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-600 group-hover:text-blue-600">
                          {option.id})
                        </span>
                        <span className="text-base">
                          {option.text || `Opção ${option.id}`}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <button className="w-full bg-blue-600 text-white rounded-md py-3 px-4 font-medium hover:bg-blue-700 transition-colors">
                Continuar
              </button>
            </div>
          </div>
        );

      case 'alert':
        return (
          <div style={element.style} className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <div className="text-yellow-800">
              {element.content.text || 'Mensagem de alerta importante'}
            </div>
          </div>
        );

      case 'arguments':
        return (
          <div style={element.style} className="space-y-4 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900">
              {element.content.title || 'Argumentos Principais'}
            </h3>
            <div className="space-y-3">
              {(element.content.items || ['Argumento 1', 'Argumento 2', 'Argumento 3']).map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'audio':
        return (
          <div style={element.style} className="p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-3">
              <Play className="w-6 h-6 text-gray-600" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {element.content.title || 'Arquivo de Áudio'}
                </div>
                <div className="text-xs text-gray-500">00:00 / 00:00</div>
              </div>
            </div>
          </div>
        );

      case 'loading':
        return (
          <div style={element.style} className="flex flex-col items-center gap-4 p-8">
            <LoaderCircle className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-sm text-gray-600">
              {element.content.text || 'Carregando...'}
            </p>
          </div>
        );

      case 'carousel':
        return (
          <div style={element.style} className="relative overflow-hidden rounded-lg">
            <div className="flex gap-4 p-4 bg-gray-100">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex-shrink-0 w-48 h-32 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-gray-600">Item {item}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'confetti':
        return (
          <div style={element.style} className="relative p-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-center">
            <div className="text-2xl font-bold mb-2">🎉</div>
            <p className="text-lg font-medium">
              {element.content.text || 'Parabéns!'}
            </p>
          </div>
        );

      case 'compare':
        return (
          <div style={element.style} className="grid grid-cols-2 gap-4 p-4">
            <div className="p-4 border-2 border-red-200 rounded-lg">
              <h4 className="font-bold text-red-800 mb-2">Sem o Produto</h4>
              <p className="text-red-600 text-sm">Problemas e dificuldades</p>
            </div>
            <div className="p-4 border-2 border-green-200 rounded-lg">
              <h4 className="font-bold text-green-800 mb-2">Com o Produto</h4>
              <p className="text-green-600 text-sm">Benefícios e soluções</p>
            </div>
          </div>
        );

      case 'options':
        return (
          <div style={element.style} className="space-y-3">
            <h3 className="text-lg font-bold mb-4">
              {element.content.title || 'Escolha uma opção:'}
            </h3>
            {(element.content.options || ['Opção A', 'Opção B', 'Opção C']).map((option: string, index: number) => (
              <button
                key={index}
                className="w-full p-4 text-left border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-400 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        );

      case 'marquee':
        return (
          <div style={element.style} className="bg-blue-600 text-white p-2 overflow-hidden">
            <div className="animate-pulse text-center">
              {element.content.text || 'Texto em movimento - Oferta especial!'}
            </div>
          </div>
        );

      case 'list':
        return (
          <div style={element.style} className="space-y-2">
            <h3 className="text-lg font-bold mb-3">
              {element.content.title || 'Lista de Itens'}
            </h3>
            <ul className="space-y-2">
              {(element.content.items || ['Item 1', 'Item 2', 'Item 3']).map((item: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'heading':
        const HeadingTag = element.content.level || 'h2';
        return (
          <div style={element.style}>
            <HeadingTag className="font-bold text-gray-900">
              {element.content.text || 'Novo Título'}
            </HeadingTag>
          </div>
        );

      case 'text':
        return (
          <div style={element.style}>
            <p className="text-gray-700 leading-relaxed">
              {element.content.text || 'Digite seu texto aqui...'}
            </p>
          </div>
        );

      case 'button':
        return (
          <div style={element.style}>
            <Button 
              className="w-full"
              onClick={(e) => !isPreviewMode && e.preventDefault()}
            >
              {element.content.text || 'Clique aqui'}
            </Button>
          </div>
        );

      case 'image':
        return (
          <div style={element.style}>
            <img 
              src={element.content.src || 'https://via.placeholder.com/400x200'} 
              alt={element.content.alt || 'Imagem'} 
              className="w-full h-auto rounded"
            />
          </div>
        );

      case 'spacer':
        return (
          <div 
            style={{
              ...element.style,
              height: element.content.height || 40,
              border: '2px dashed #fbbf24',
              borderRadius: '8px'
            }}
            className="w-full"
          />
        );

      case 'video':
        return (
          <div style={element.style}>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <Play className="w-12 h-12 text-gray-500" />
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
            Componente "{element.type}" não implementado ainda
          </div>
        );
    }
  };

  if (isPreviewMode) {
    return (
      <div className="w-full">
        {renderContent()}
      </div>
    );
  }

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full group transition-all cursor-pointer ${
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
        <div className="absolute top-2 right-2 flex gap-1 bg-white shadow-lg rounded border p-1 z-10">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            title="Mover"
          >
            <Move className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            title="Editar"
          >
            <Edit className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            title="Duplicar"
          >
            <Copy className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="Excluir"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      )}
      
      {/* Label do tipo */}
      {isSelected && (
        <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br">
          {element.type}
        </div>
      )}
    </div>
  );
};
