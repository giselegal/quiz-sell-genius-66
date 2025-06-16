
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
  ArrowLeft
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
              
              {element.content.spacer && (
                <div className="py-2 border-dashed border-yellow-500 border rounded-lg" />
              )}
              
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

      case 'divider':
        return (
          <div style={element.style}>
            <hr className="border-gray-300" />
          </div>
        );

      case 'pricing':
        return (
          <div style={element.style} className="text-center space-y-4 p-6 border rounded-lg">
            <h3 className="text-xl font-bold">{element.content.title || 'Plano Premium'}</h3>
            <div className="text-3xl font-bold text-blue-600">
              {element.content.price || 'R$ 97'}
            </div>
            {element.content.originalPrice && (
              <div className="text-lg line-through text-gray-500">
                {element.content.originalPrice}
              </div>
            )}
            <p className="text-gray-600">{element.content.description}</p>
            <Button className="w-full">Comprar Agora</Button>
          </div>
        );

      case 'testimonial':
        return (
          <div style={element.style} className="p-6 bg-gray-50 rounded-lg">
            <p className="text-gray-700 mb-4">"{element.content.text}"</p>
            <div className="flex items-center gap-3">
              {element.content.avatar && (
                <img src={element.content.avatar} alt="" className="w-10 h-10 rounded-full" />
              )}
              <div>
                <div className="font-medium">{element.content.author}</div>
                <div className="text-sm text-gray-500">{element.content.role}</div>
              </div>
            </div>
          </div>
        );

      case 'countdown':
        return (
          <div style={element.style} className="text-center p-6 bg-gray-900 text-white rounded-lg">
            <h3 className="text-xl font-bold mb-4">{element.content.title}</h3>
            <div className="text-2xl font-mono">00:00:00:00</div>
          </div>
        );

      case 'faq':
        return (
          <div style={element.style} className="space-y-4">
            <h3 className="text-xl font-bold">{element.content.title}</h3>
            {(element.content.items || []).map((item: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">{item.question}</h4>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        );

      case 'input':
        return (
          <div style={element.style} className="space-y-2">
            <label className="text-sm font-medium">{element.content.label}</label>
            <Input 
              placeholder={element.content.placeholder}
              type={element.content.type || 'text'}
            />
          </div>
        );

      case 'checkbox':
        return (
          <div style={element.style} className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={element.content.checked || false}
              onChange={() => {}}
            />
            <label>{element.content.label}</label>
          </div>
        );

      case 'video':
        return (
          <div style={element.style}>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Vídeo</span>
            </div>
          </div>
        );

      default:
        return <div>Componente não suportado</div>;
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
