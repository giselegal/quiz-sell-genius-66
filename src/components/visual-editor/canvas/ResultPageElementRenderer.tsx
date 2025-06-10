
import React from 'react';
import { ResultPageElement } from '@/types/resultPageEditor';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Trash2, MoveUp, MoveDown, Edit } from 'lucide-react';

interface ResultPageElementRendererProps {
  element: ResultPageElement;
  primaryStyle: StyleResult;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onUpdate: (updates: any) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export const ResultPageElementRenderer: React.FC<ResultPageElementRendererProps> = ({
  element,
  primaryStyle,
  isSelected,
  isPreviewMode,
  onSelect,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown
}) => {
  const renderElementContent = () => {
    switch (element.type) {
      case 'styleResult':
        return (
          <div className="p-6 bg-[#FAF9F7] rounded-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#432818] mb-2">
                Seu estilo predominante é <span className="text-[#B89B7A]">{primaryStyle.category}</span>
              </h2>
              <div className="inline-block bg-[#B89B7A] text-white px-4 py-2 rounded-full text-sm mb-4">
                {primaryStyle.percentage}% de compatibilidade
              </div>
              <p className="text-[#5A5A5A]">
                {element.content.description || `Descubra tudo sobre o estilo ${primaryStyle.category}`}
              </p>
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className="bg-[#fff7f3] rounded-lg overflow-hidden" style={element.style}>
            <div className="p-6 text-center">
              <h1 className="text-3xl font-bold text-[#aa6b5d] mb-4">
                {element.content.title || 'SEU RESULTADO ESTÁ PRONTO!'}
              </h1>
              <p className="text-[#1A1818]/80 mb-4">
                {element.content.subtitle || 'Descubra tudo sobre seu estilo único'}
              </p>
              {element.content.heroImage && (
                <img
                  src={element.content.heroImage}
                  alt="Hero"
                  className="w-full max-w-md mx-auto rounded-lg"
                />
              )}
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="text-center space-y-6 p-6 bg-[#fff7f3] rounded-lg" style={element.style}>
            <div className="space-y-2">
              {element.content.regularPrice && (
                <p className="text-[#666] line-through">
                  De R$ {element.content.regularPrice}
                </p>
              )}
              {element.content.salePrice && (
                <p className="text-2xl font-bold text-[#aa6b5d]">
                  Por R$ {element.content.salePrice}
                </p>
              )}
            </div>
            
            <Button className="w-full bg-[#aa6b5d] hover:bg-[#8f5a4c] text-white p-6 text-lg">
              {element.content.buttonText || 'COMPRAR AGORA'}
            </Button>
            
            {element.content.urgencyText && (
              <p className="text-sm text-[#aa6b5d]">{element.content.urgencyText}</p>
            )}
          </div>
        );

      case 'testimonials':
        return (
          <div style={element.style}>
            <h3 className="text-xl font-bold mb-6 text-[#aa6b5d] text-center">
              {element.content.title || 'O que estão dizendo'}
            </h3>
            {element.content.testimonialsImage ? (
              <img
                src={element.content.testimonialsImage}
                alt="Depoimentos"
                className="w-full h-auto rounded-lg mx-auto"
              />
            ) : (
              <div className="bg-gray-100 h-48 flex items-center justify-center rounded-lg">
                <p className="text-gray-400">Adicione uma imagem de depoimentos</p>
              </div>
            )}
          </div>
        );

      case 'guarantee':
        return (
          <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-[#fff7f3] rounded-lg" style={element.style}>
            {element.content.image && (
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={element.content.image}
                  alt="Garantia"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 text-[#aa6b5d]">
                {element.content.title || 'Garantia de 7 dias'}
              </h3>
              <p className="text-[#1A1818]/80">
                {element.content.text || 'Se você não ficar 100% satisfeita, devolvemos seu dinheiro.'}
              </p>
            </div>
          </div>
        );

      case 'title':
        return (
          <h2 className="text-2xl font-bold text-[#432818]" style={element.style}>
            {element.content.text || 'Título'}
          </h2>
        );

      case 'text':
        return (
          <p className="text-[#5A5A5A]" style={element.style}>
            {element.content.text || 'Texto de exemplo'}
          </p>
        );

      case 'image':
        return (
          <img
            src={element.content.src || 'https://placehold.co/400x200?text=Imagem'}
            alt={element.content.alt || 'Imagem'}
            className="w-full h-auto rounded-lg"
            style={element.style}
          />
        );

      default:
        return (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600">Componente: {element.type}</p>
          </div>
        );
    }
  };

  return (
    <div
      className={`
        relative group transition-all duration-200
        ${!isPreviewMode ? 'hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50' : ''}
        ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500' : ''}
        ${!isPreviewMode ? 'cursor-pointer' : ''}
      `}
      onClick={!isPreviewMode ? onSelect : undefined}
      style={{ margin: '8px' }}
    >
      {/* Element Controls */}
      {!isPreviewMode && isSelected && (
        <div className="absolute -top-2 -right-2 flex gap-1 z-10">
          {onMoveUp && (
            <Button size="sm" variant="outline" className="h-6 w-6 p-0" onClick={onMoveUp}>
              <MoveUp className="w-3 h-3" />
            </Button>
          )}
          {onMoveDown && (
            <Button size="sm" variant="outline" className="h-6 w-6 p-0" onClick={onMoveDown}>
              <MoveDown className="w-3 h-3" />
            </Button>
          )}
          <Button size="sm" variant="outline" className="h-6 w-6 p-0" onClick={onSelect}>
            <Edit className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="destructive" className="h-6 w-6 p-0" onClick={onDelete}>
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* Element Content */}
      <div className="w-full">
        {renderElementContent()}
      </div>
    </div>
  );
};
