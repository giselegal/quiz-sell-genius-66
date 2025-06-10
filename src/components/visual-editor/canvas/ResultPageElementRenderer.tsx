
import React from 'react';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Trash2, MoveUp, MoveDown, Edit } from 'lucide-react';

interface ResultPageElementRendererProps {
  block: ResultPageBlock;
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
  block,
  primaryStyle,
  isSelected,
  isPreviewMode,
  onSelect,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown
}) => {
  const renderBlockContent = () => {
    switch (block.type) {
      case 'header':
        return (
          <div className="p-6 bg-white border-b">
            <div className="flex items-center justify-center">
              <img
                src={block.content.header?.logo || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"}
                alt={block.content.header?.logoAlt || "Logo"}
                style={{ height: `${block.content.header?.logoHeight || 80}px` }}
                className="h-auto"
              />
            </div>
            <div className="text-center mt-4">
              <h1 className="text-xl font-medium">
                Olá {block.content.header?.userName || 'Visitante'}, seu Estilo Predominante é:
              </h1>
              <h2 className="text-2xl font-bold text-[#B89B7A] mt-2">
                {primaryStyle.category}
              </h2>
            </div>
          </div>
        );

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
                {block.content.styleResult?.description || `Descubra tudo sobre o estilo ${primaryStyle.category}`}
              </p>
            </div>
          </div>
        );

      case 'transformation':
        return (
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4 text-center">
              {block.content.transformation?.title || 'Transformações Reais'}
            </h3>
            <p className="text-center text-gray-600">
              {block.content.transformation?.description || 'Veja como outras mulheres transformaram seu estilo'}
            </p>
          </div>
        );

      case 'motivation':
        return (
          <div className="p-6 bg-gray-50">
            <h3 className="text-xl font-bold mb-4 text-center">
              {block.content.motivation?.title || 'Por que Descobrir seu Estilo é Importante?'}
            </h3>
            <p className="text-center text-gray-600 mb-6">
              {block.content.motivation?.subtitle || 'Transforme sua relação com a moda'}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {block.content.motivation?.items?.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'bonus':
        return (
          <div className="p-6">
            <h3 className="text-xl font-bold mb-6 text-center">
              {block.content.bonus?.title || 'Bônus Exclusivos'}
            </h3>
            <div className="grid gap-4">
              {block.content.bonus?.bonuses?.map((bonus, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <h4 className="font-semibold">{bonus.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{bonus.description}</p>
                  {bonus.value && (
                    <p className="text-[#B89B7A] font-bold mt-2">{bonus.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="p-6 bg-gray-50">
            <h3 className="text-xl font-bold mb-6 text-center">
              {block.content.testimonials?.title || 'O que nossas clientes estão dizendo'}
            </h3>
            <div className="grid gap-4">
              {block.content.testimonials?.testimonials?.map((testimonial, index) => (
                <div key={index} className="bg-white p-4 rounded-lg">
                  <p className="italic mb-2">"{testimonial.text}"</p>
                  <p className="font-semibold text-sm">- {testimonial.author}</p>
                  {testimonial.rating && (
                    <div className="flex mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'guarantee':
        return (
          <div className="p-6 bg-green-50 rounded-lg">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">
                {block.content.guarantee?.title || 'Garantia de Satisfação'}
              </h3>
              <p className="text-gray-600">
                {block.content.guarantee?.description || '7 dias para testar sem risco'}
              </p>
            </div>
          </div>
        );

      case 'mentor':
        return (
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {block.content.mentor?.image && (
                <img
                  src={block.content.mentor.image}
                  alt={block.content.mentor?.name || 'Mentora'}
                  className="w-32 h-32 rounded-full object-cover"
                />
              )}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold">
                  {block.content.mentor?.name || 'Gisele Galvão'}
                </h3>
                <p className="text-[#B89B7A] font-medium mb-2">
                  {block.content.mentor?.title || 'Consultora de Imagem e Estilo'}
                </p>
                <p className="text-gray-600">
                  {block.content.mentor?.description || 'Especialista em coloração pessoal'}
                </p>
              </div>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="p-6 bg-gradient-to-br from-[#B89B7A] to-[#A08660] text-white rounded-lg">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">
                {block.content.cta?.title || 'Transforme Seu Estilo Hoje'}
              </h3>
              <p className="mb-4">
                {block.content.cta?.subtitle || 'Guia Completo + Bônus Exclusivos'}
              </p>
              <div className="mb-4">
                {block.content.cta?.regularPrice && (
                  <p className="line-through text-white/80">
                    De {block.content.cta.regularPrice}
                  </p>
                )}
                {block.content.cta?.salePrice && (
                  <p className="text-2xl font-bold">
                    Por {block.content.cta.salePrice}
                  </p>
                )}
                {block.content.cta?.installments && (
                  <p className="text-sm">
                    ou {block.content.cta.installments}
                  </p>
                )}
              </div>
              <Button className="bg-white text-[#B89B7A] hover:bg-gray-100 font-bold py-3 px-8">
                {block.content.cta?.ctaText || 'Quero meu Guia de Estilo Agora'}
              </Button>
            </div>
          </div>
        );

      case 'footer':
        return (
          <div className="p-6 bg-gray-800 text-white">
            <div className="text-center">
              <p className="mb-4">
                {block.content.footer?.companyName || 'Gisele Galvão - Consultoria de Imagem'}
              </p>
              <div className="flex justify-center gap-4 text-sm">
                {block.content.footer?.links?.map((link, index) => (
                  <a key={index} href={link.url} className="hover:text-gray-300">
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600">Componente: {block.type}</p>
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
      {/* Block Controls */}
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

      {/* Block Content */}
      <div className="w-full">
        {renderBlockContent()}
      </div>
    </div>
  );
};
