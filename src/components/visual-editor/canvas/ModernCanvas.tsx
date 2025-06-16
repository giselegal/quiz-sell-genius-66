import React from 'react';
import { EditorElement } from '@/hooks/useModernEditor';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  // Sort elements by order to ensure correct sequence
  const sortedElements = [...elements].sort((a, b) => a.order - b.order);

  const getViewportClass = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      case 'desktop':
        return 'max-w-4xl mx-auto';
      default:
        return 'max-w-4xl mx-auto';
    }
  };

  const renderElement = (element: EditorElement) => {
    const isSelected = selectedElementId === element.id;
    
    return (
      <div
        key={element.id}
        className={`
          relative group cursor-pointer transition-all
          ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50 rounded-md' : 'hover:bg-gray-50 rounded-md'}
          ${!isPreviewMode ? 'border border-dashed border-transparent hover:border-blue-300' : ''}
        `}
        onClick={() => onSelectElement(element.id)}
      >
        {renderElementContent(element)}
        
        {!isPreviewMode && (
          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteElement(element.id);
              }}
              className="bg-red-500 text-white rounded p-1 text-xs hover:bg-red-600 shadow-lg"
            >
              ×
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderElementContent = (element: EditorElement) => {
    switch (element.type) {
      case 'brand-header':
        return (
          <div className="flex flex-col items-center gap-4 p-4">
            <img 
              src={element.content.logoUrl || 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735479/57_whzmff.webp'} 
              alt={element.content.logoAlt || 'Logo'}
              className="w-24 h-24 object-cover rounded-full"
            />
            {element.content.showProgress && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all" 
                  style={{ width: `${element.content.percentage || 0}%` }}
                ></div>
              </div>
            )}
          </div>
        );
      
      case 'question-header':
        return (
          <div className="flex flex-col items-center gap-4 p-4">
            <img 
              src={element.content.logoUrl || 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735479/57_whzmff.webp'} 
              alt="Logo"
              className="w-24 h-24 object-cover rounded-full"
            />
          </div>
        );
      
      case 'progress-bar':
        return (
          <div className="w-full bg-gray-200 rounded-full h-2 my-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all" 
              style={{ width: `${element.content.percentage || 0}%` }}
            ></div>
          </div>
        );
      
      case 'quiz-hero-title':
      case 'question-title':
        return (
          <h1 className="text-3xl font-bold text-center text-gray-900 my-6">
            {element.content.title || 'Título da Questão'}
          </h1>
        );
      
      case 'quiz-hero-image':
        return (
          <div className="flex justify-center my-6">
            <img 
              src={element.content.imageUrl || 'https://via.placeholder.com/400x300'}
              alt={element.content.alt || 'Imagem'}
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        );
      
      case 'quiz-description':
        return (
          <p className="text-center text-gray-600 my-4 leading-relaxed">
            {element.content.text || 'Descrição do quiz...'}
          </p>
        );
      
      case 'quiz-input':
        return (
          <div className="my-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {element.content.label || 'Seu nome:'}
            </label>
            <input
              type="text"
              placeholder={element.content.placeholder || 'Digite seu nome'}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isPreviewMode}
            />
          </div>
        );
      
      case 'question-options-grid':
      case 'question-option-card':
        return (
          <div className="space-y-3 my-6">
            {element.content.options?.map((option: any, index: number) => (
              <button
                key={option.id || index}
                className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-all"
                disabled={isPreviewMode}
              >
                <div className="flex items-center justify-between">
                  <span dangerouslySetInnerHTML={{ __html: option.text || `Opção ${index + 1}` }} />
                </div>
              </button>
            )) || (
              <div className="text-center text-gray-500 py-8 border border-dashed border-gray-300 rounded-lg">
                Opções serão carregadas automaticamente
              </div>
            )}
          </div>
        );
      
      case 'quiz-button':
      case 'transition-continue':
      case 'cta-button':
        return (
          <button 
            className={`
              w-full py-3 px-6 rounded-md font-medium transition-all my-4
              ${element.content.variant === 'primary' 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }
              ${element.content.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            disabled={isPreviewMode || element.content.disabled}
          >
            {element.content.text || 'Botão'}
          </button>
        );
      
      case 'brand-divider':
        return (
          <div className="flex justify-center my-4">
            <div className="w-24 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
          </div>
        );
      
      case 'transition-hero':
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {element.content.title || 'Título da Transição'}
            </h2>
            <p className="text-gray-600 mb-6">
              {element.content.subtitle || 'Subtítulo da transição...'}
            </p>
            {element.content.imageUrl && (
              <img 
                src={element.content.imageUrl}
                alt="Transição"
                className="max-w-full h-auto rounded-lg shadow-md mx-auto"
              />
            )}
          </div>
        );
      
      case 'result-hero':
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {element.content.title || 'Parabéns! Resultado descoberto!'}
            </h2>
            <p className="text-gray-600">
              {element.content.subtitle || 'Seu resultado personalizado...'}
            </p>
          </div>
        );
      
      case 'result-title':
        return (
          <h1 className="text-4xl font-bold text-center text-blue-600 my-6">
            {element.content.dynamicTitle ? element.content.placeholder : element.content.title || 'Seu Estilo Descoberto'}
          </h1>
        );
      
      case 'result-subtitle':
        return (
          <p className="text-lg text-center text-gray-600 my-4">
            {element.content.dynamicDescription ? element.content.placeholder : element.content.text || 'Descrição do seu estilo...'}
          </p>
        );
      
      case 'offer-section':
        return (
          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {element.content.title || 'Oferta Especial'}
            </h3>
            <p className="text-gray-600 mb-4">
              {element.content.description || 'Descrição da oferta...'}
            </p>
            {element.content.features && (
              <ul className="space-y-2 mb-4">
                {element.content.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            {element.content.ctaText && (
              <button className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-all">
                {element.content.ctaText}
              </button>
            )}
          </div>
        );
      
      case 'price-highlight':
        return (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg text-center my-6">
            <div className="text-lg text-gray-500 line-through mb-2">
              {element.content.originalPrice || 'R$ 497'}
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {element.content.currentPrice || 'R$ 197'}
            </div>
            <div className="text-sm font-medium text-red-600">
              {element.content.discount || '60% OFF'} - {element.content.urgency || 'Oferta por tempo limitado'}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-600">
              Componente: {element.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-white">
      <ScrollArea className="h-full">
        <div className={`min-h-full p-6 ${getViewportClass()}`}>
          {!isPreviewMode && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-700">
                💡 Modo de Edição - Clique nos elementos para editá-los
              </p>
            </div>
          )}
          
          {sortedElements.length > 0 ? (
            <div className="space-y-2">
              {sortedElements.map(renderElement)}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Nenhum componente nesta etapa</p>
                <p className="text-sm text-gray-400">
                  {!isPreviewMode ? 'Adicione componentes da barra lateral ou aguarde o carregamento automático' : 'Esta etapa está vazia'}
                </p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
