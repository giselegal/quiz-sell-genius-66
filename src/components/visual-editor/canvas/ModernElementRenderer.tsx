
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChevronUp, 
  ChevronDown, 
  Trash2, 
  MoreVertical,
  Eye,
  EyeOff,
  Star,
  Shield,
  Clock
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
      // Quiz Intro Components
      case 'header':
        return (
          <header style={commonStyle} className="flex items-center justify-between">
            <img 
              src={element.content.logoSrc || '/lovable-uploads/ce883c46-80e0-4171-9c2d-9288f44f88eb.png'} 
              alt={element.content.logoAlt || 'Logo'} 
              className="h-10"
            />
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Início</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Sobre</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contato</a>
            </nav>
          </header>
        );

      case 'hero-background':
        return (
          <div style={commonStyle} className="relative flex items-center justify-center text-center px-4">
            <div className="max-w-4xl mx-auto">
              {/* Content will be rendered by other elements */}
            </div>
          </div>
        );

      case 'quiz-title':
        return (
          <h1
            style={commonStyle}
            className={`${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit(e.currentTarget.textContent || '')}
          >
            {element.content.text || 'Título do Quiz'}
          </h1>
        );

      case 'quiz-subtitle':
        return (
          <p
            style={commonStyle}
            className={`${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit(e.currentTarget.textContent || '')}
          >
            {element.content.text || 'Subtítulo do quiz'}
          </p>
        );

      case 'trust-indicators':
        return (
          <div style={commonStyle} className="space-y-2">
            {element.content.text?.split('\n').map((line, index) => (
              <div key={index} className="flex items-center justify-center space-x-2">
                <span>{line}</span>
              </div>
            ))}
          </div>
        );

      // Question Components
      case 'question-header':
        return (
          <div style={commonStyle} className="flex items-center justify-between">
            <img 
              src={element.content.logoSrc || '/lovable-uploads/ce883c46-80e0-4171-9c2d-9288f44f88eb.png'} 
              alt="Logo" 
              className="h-8"
            />
            <div className="text-sm text-gray-600">
              Pergunta {element.content.questionNumber || 1} de {element.content.totalQuestions || 8}
            </div>
          </div>
        );

      case 'question-image':
        return (
          <img
            src={element.content.src || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=400&fit=crop'}
            alt={element.content.alt || 'Pergunta visual'}
            style={commonStyle}
            className="rounded-lg shadow-lg"
          />
        );

      case 'question-options':
        return (
          <div style={commonStyle}>
            {(element.content.options || []).map((option: any, index: number) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-500 p-6"
              >
                {option.image && (
                  <img
                    src={option.image}
                    alt={option.text}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                )}
                <p className="text-lg font-medium text-gray-800 text-center">
                  {typeof option === 'string' ? option : option.text}
                </p>
              </div>
            ))}
          </div>
        );

      case 'question-navigation':
        return (
          <div style={commonStyle}>
            {element.content.showBack && (
              <Button variant="outline" className="px-8 py-3">
                {element.content.backText || 'Anterior'}
              </Button>
            )}
            <Button className="px-8 py-3 bg-blue-600 hover:bg-blue-700">
              {element.content.nextText || 'Próxima'}
            </Button>
          </div>
        );

      // Result Components
      case 'result-header':
        return (
          <div style={commonStyle}>
            <h1 className="text-4xl font-bold mb-4">
              {element.content.title || 'Seu Resultado Está Pronto!'}
            </h1>
            <p className="text-xl opacity-90">
              {element.content.subtitle || 'Parabéns por completar o quiz'}
            </p>
          </div>
        );

      case 'result-card':
        return (
          <div style={commonStyle}>
            <div className="relative">
              <img
                src={element.content.image || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop'}
                alt="Resultado"
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-blue-100"
              />
              <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold">
                {element.content.percentage || 85}%
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {element.content.styleType || 'Seu Estilo'}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {element.content.description || 'Descrição do seu estilo'}
            </p>
          </div>
        );

      case 'result-details':
        return (
          <div style={commonStyle}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Suas Características:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {(element.content.characteristics || []).map((char: string, index: number) => (
                <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
                  <Star className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">{char}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cta-section':
        return (
          <div style={commonStyle}>
            <h3 className="text-3xl font-bold mb-4">
              {element.content.title || 'Próximo Passo'}
            </h3>
            <p className="text-xl mb-8 opacity-90">
              {element.content.subtitle || 'Continue sua jornada'}
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
              {element.content.buttonText || 'Continuar'}
            </Button>
          </div>
        );

      // Offer Page Components
      case 'offer-hero':
        return (
          <div style={commonStyle}>
            <div className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold mb-4">
              {element.content.highlight || 'Oferta Especial'}
            </div>
            <h1 className="text-5xl font-bold mb-6">
              {element.content.title || 'Oferta Especial'}
            </h1>
            <p className="text-xl opacity-90">
              {element.content.subtitle || 'Baseado no seu resultado'}
            </p>
          </div>
        );

      case 'product-showcase':
        return (
          <div style={commonStyle}>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {(element.content.products || []).map((product: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-2xl font-bold text-blue-600">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'pricing-section':
        return (
          <div style={commonStyle}>
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-blue-600 text-white p-6 text-center">
                <div className="text-sm opacity-90">De {element.content.originalPrice}</div>
                <div className="text-4xl font-bold">{element.content.discountPrice}</div>
                <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold inline-block mt-2">
                  {element.content.discount}
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {(element.content.features || []).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case 'urgency-timer':
        return (
          <div style={commonStyle} className="flex items-center justify-center space-x-4">
            <Clock className="w-8 h-8" />
            <div>
              <div className="text-lg">{element.content.text}</div>
              <div className="text-3xl font-mono font-bold">
                {element.content.timeLeft || '00:23:45'}
              </div>
            </div>
          </div>
        );

      case 'guarantee-section':
        return (
          <div style={commonStyle}>
            <div className="max-w-2xl mx-auto text-center">
              <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                {element.content.title || 'Garantia Total'}
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                {element.content.text || 'Garantia incondicional'}
              </p>
              <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold">
                {element.content.badgeText || '100% Seguro'}
              </div>
            </div>
          </div>
        );

      // Standard Components
      case 'heading':
        const HeadingTag = `h${element.content.level || 2}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag
            style={commonStyle}
            className={`font-bold ${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit(e.currentTarget.textContent || '')}
          >
            {element.content.text || 'Título'}
          </HeadingTag>
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
      case 'start-button':
      case 'purchase-button':
        return (
          <div className="text-center">
            <button
              style={commonStyle}
              className={`inline-block px-6 py-3 rounded transition-all hover:scale-105 ${isSelected && !isPreviewMode ? 'outline-none' : ''}`}
              contentEditable={!isPreviewMode}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleContentEdit(e.currentTarget.textContent || '')}
            >
              {element.content.text || 'Clique Aqui'}
            </button>
            {element.content.subtext && (
              <p className="text-sm text-gray-500 mt-2">{element.content.subtext}</p>
            )}
          </div>
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

      case 'progress-bar':
        return (
          <div style={commonStyle}>
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${element.content.progress || 30}%` }}
            />
          </div>
        );

      default:
        return (
          <div style={commonStyle} className="p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded">
            <p className="text-gray-500 text-center text-sm">
              Componente: {element.type}
            </p>
            {element.content.text && (
              <p className="text-gray-700 text-center mt-2">{element.content.text}</p>
            )}
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
      <div className={isPreviewMode ? '' : 'p-2'}>
        {renderElement()}
      </div>
    </div>
  );
};
