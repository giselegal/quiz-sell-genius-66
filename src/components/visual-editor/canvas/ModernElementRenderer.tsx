import React, { useState } from 'react';
import { EditorElement } from '@/hooks/useModernEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Move, Settings, Copy } from 'lucide-react';

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
            className="border-none cursor-pointer transition-all hover:opacity-90"
            onClick={(e) => {
              if (!isPreviewMode) e.preventDefault();
            }}
          >
            {element.content.text || 'Botão'}
          </button>
        );
      
      case 'image':
        return (
          <div style={element.style} className="bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
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

      case 'pricing':
        return (
          <div style={element.style} className="max-w-sm">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">{element.content.title}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-green-600">{element.content.price}</span>
                {element.content.originalPrice && (
                  <span className="text-lg line-through text-gray-500 ml-2">{element.content.originalPrice}</span>
                )}
              </div>
              <p className="text-gray-600 mb-4">{element.content.description}</p>
              <ul className="text-sm space-y-2">
                {element.content.features?.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'testimonial':
        return (
          <div style={element.style}>
            <div className="flex items-start space-x-4">
              {element.content.avatar && (
                <img 
                  src={element.content.avatar} 
                  alt={element.content.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <p className="italic mb-3">"{element.content.text}"</p>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(element.content.rating || 5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="font-semibold">{element.content.author}</p>
                {element.content.role && (
                  <p className="text-sm text-gray-600">{element.content.role}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'countdown':
        return (
          <div style={element.style}>
            <h3 className="text-lg font-bold mb-4 text-center">{element.content.title}</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm opacity-75">Dias</div>
              </div>
              <div>
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm opacity-75">Horas</div>
              </div>
              <div>
                <div className="text-2xl font-bold">42</div>
                <div className="text-sm opacity-75">Min</div>
              </div>
              <div>
                <div className="text-2xl font-bold">18</div>
                <div className="text-sm opacity-75">Seg</div>
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div style={element.style}>
            <h3 className="text-lg font-bold mb-4">{element.content.title}</h3>
            <div className="space-y-3">
              {element.content.items?.map((item: any, index: number) => (
                <div key={index} className="border-b border-gray-200 pb-3">
                  <h4 className="font-semibold mb-2">{item.question}</h4>
                  <p className="text-gray-600 text-sm">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'input':
        return (
          <div style={element.style}>
            {element.content.label && (
              <label className="block text-sm font-medium mb-2">{element.content.label}</label>
            )}
            <Input
              type={element.content.type || 'text'}
              placeholder={element.content.placeholder}
              required={element.content.required}
              className="w-full"
            />
          </div>
        );

      case 'checkbox':
        return (
          <div style={element.style} className="flex items-center space-x-2">
            <Checkbox 
              checked={element.content.checked}
              required={element.content.required}
            />
            <label className="text-sm">{element.content.label}</label>
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
                <span className="text-xs text-gray-400">Espaçador ({element.content.height || 40}px)</span>
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
      
      case 'quiz-header':
        return (
          <div style={element.style} className="w-full">
            <div className="flex flex-col gap-4 md:gap-6 p-3 md:p-5">
              <div className="flex flex-row w-full justify-center relative">
                {element.content.showBackButton && (
                  <button className="absolute left-0 p-2 hover:bg-gray-100 rounded-md">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l-7-7 7-7M19 12H5" />
                    </svg>
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
        <div className="absolute -top-10 left-0 bg-white border border-gray-200 rounded-md shadow-lg flex items-center gap-1 p-1 z-20">
          <Button
            size="sm"
            variant="ghost"
            className="w-6 h-6 p-0 hover:bg-gray-100"
            title="Mover"
          >
            <Move className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="w-6 h-6 p-0 hover:bg-gray-100"
            title="Configurações"
          >
            <Settings className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="w-6 h-6 p-0 hover:bg-gray-100"
            title="Duplicar"
          >
            <Copy className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className="w-6 h-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
            title="Excluir"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      )}
      
      {/* Label do tipo */}
      {isSelected && (
        <div className="absolute -bottom-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded z-20">
          {element.type}
        </div>
      )}
    </div>
  );
};
