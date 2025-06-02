import React from 'react';
import { BlockData } from '@/types/resultPageConfig';
import HeroBlock from './blocks/HeroBlock';
import BenefitsBlock from './blocks/BenefitsBlock';
import PricingBlock from './blocks/PricingBlock';
import TestimonialsBlock from './blocks/TestimonialsBlock';

interface BlockRendererProps {
  block: BlockData;
  primaryStyle?: any;
  secondaryStyles?: any[];
  globalStyles?: any;
  user?: any;
  resultPageConfig?: any;
  onCTAClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isButtonHovered?: boolean;
  setIsButtonHovered?: (hovered: boolean) => void;
  timer?: { hours: number; minutes: number; seconds: number };
  imagesLoaded?: { style: boolean; guide: boolean };
  setImagesLoaded?: (state: { style: boolean; guide: boolean }) => void;
  isLowPerformance?: boolean;
  tokens?: any;
  isEditMode?: boolean;
  onClick?: () => void;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  primaryStyle,
  secondaryStyles,
  globalStyles,
  user,
  resultPageConfig,
  onCTAClick,
  isButtonHovered,
  setIsButtonHovered,
  timer,
  imagesLoaded,
  setImagesLoaded,
  isLowPerformance,
  tokens,
  isEditMode = false,
  onClick
}) => {
  const handleImageLoad = () => {
    if (setImagesLoaded) {
      setImagesLoaded({ style: true, guide: true });
    }
  };

  const renderBlockContent = () => {
    switch (block.type) {
      case 'hero':
        return (
          <HeroBlock
            block={block}
            primaryStyle={primaryStyle}
            isEditMode={isEditMode}
            onClick={onClick}
          />
        );

      case 'benefits':
        return (
          <BenefitsBlock
            block={block}
            isEditMode={isEditMode}
            onClick={onClick}
          />
        );

      case 'pricing':
        return (
          <PricingBlock
            block={block}
            onCTAClick={onCTAClick}
            isButtonHovered={isButtonHovered}
            setIsButtonHovered={setIsButtonHovered}
            timer={timer}
            isEditMode={isEditMode}
            onClick={onClick}
          />
        );

      case 'testimonials':
        return (
          <TestimonialsBlock
            block={block}
            isEditMode={isEditMode}
            onClick={onClick}
          />
        );

      case 'text':
        return (
          <div className="prose max-w-none">
            <h3 className="text-2xl font-semibold mb-4 text-[#432818]">
              {block.content.title || 'Título do Texto'}
            </h3>
            <p className="text-[#8F7A6A] leading-relaxed">
              {block.content.description || 'Conteúdo do texto aqui...'}
            </p>
          </div>
        );

      case 'image':
        return (
          <div className="text-center">
            {block.content.imageUrl ? (
              <img 
                src={block.content.imageUrl} 
                alt={block.content.title || 'Imagem'} 
                className="mx-auto rounded-lg shadow-md"
                style={{ maxWidth: '100%' }}
                onLoad={handleImageLoad}
              />
            ) : (
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12">
                <p className="text-gray-500">Clique para adicionar imagem</p>
              </div>
            )}
            {block.content.title && (
              <p className="mt-4 text-sm text-[#8F7A6A]">{block.content.title}</p>
            )}
          </div>
        );

      case 'cta':
        return (
          <div className="text-center py-8 px-6 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-4">
              {block.content.title || 'Call to Action'}
            </h3>
            <p className="mb-6 opacity-90">
              {block.content.description || 'Descrição do call to action'}
            </p>
            <button 
              onClick={onCTAClick}
              className="bg-white text-[#B89B7A] px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              onMouseEnter={() => setIsButtonHovered?.(true)}
              onMouseLeave={() => setIsButtonHovered?.(false)}
            >
              {block.content.ctaText || 'Clique Aqui'}
            </button>
          </div>
        );

      case 'pricing':
        return (
          <div className="bg-white border border-[#B89B7A]/20 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold mb-4 text-[#432818]">
              {block.content.title || 'Preço Especial'}
            </h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-[#B89B7A]">
                {block.content.price || 'R$ 97,00'}
              </span>
              {block.content.regularPrice && (
                <span className="text-lg text-gray-500 line-through ml-2">
                  {block.content.regularPrice}
                </span>
              )}
            </div>
            <p className="text-[#8F7A6A] mb-6">
              {block.content.description || 'Oferta por tempo limitado'}
            </p>
          </div>
        );

      case 'testimonials':
        return (
          <div className="bg-[#f8f9fa] rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-center text-[#432818]">
              {block.content.title || 'Depoimentos'}
            </h3>
            <blockquote className="text-center">
              <p className="text-[#8F7A6A] italic mb-4">
                "{block.content.description || 'Produto incrível! Superou todas as minhas expectativas.'}"
              </p>
              <footer className="font-medium text-[#432818]">
                {block.content.userName || 'Cliente Satisfeito'}
              </footer>
            </blockquote>
          </div>
        );

      case 'benefits':
        return (
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center text-[#432818]">
              {block.content.title || 'Benefícios'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(block.content.features || ['Benefício 1', 'Benefício 2', 'Benefício 3']).map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-[#432818]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'guarantee':
        return (
          <div className="bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {block.content.title || 'Garantia Incondicional'}
            </h3>
            <p className="mb-4 opacity-90">
              {block.content.description || 'Teste por 30 dias sem riscos. Se não ficar satisfeito, devolvemos 100% do seu investimento.'}
            </p>
            <div className="text-lg font-semibold">
              {block.content.period || '30 dias'} de garantia
            </div>
          </div>
        );

      case 'mentor':
        return (
          <div className="bg-[#f8f9fa] rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-center text-[#432818]">
              {block.content.title || 'Conheça Seu Mentor'}
            </h3>
            <div className="text-center">
              <p className="text-[#8F7A6A] mb-4">
                {block.content.description || 'Especialista com anos de experiência'}
              </p>
              <div className="font-semibold text-[#432818]">
                {block.content.name || 'Nome do Mentor'}
              </div>
              <div className="text-sm text-[#8F7A6A]">
                {block.content.credentials || 'Credenciais profissionais'}
              </div>
            </div>
          </div>
        );

      case 'transformations':
        return (
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center text-[#432818]">
              {block.content.title || 'Transformações Possíveis'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="text-center">
                  <div className="w-16 h-16 bg-[#B89B7A] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl">✨</span>
                  </div>
                  <h4 className="font-semibold text-[#432818] mb-2">
                    Transformação {item}
                  </h4>
                  <p className="text-sm text-[#8F7A6A]">
                    Descrição da transformação que você pode alcançar
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'motivation':
        return (
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold mb-4 text-[#432818]">
              {block.content.title || 'Sua Motivação'}
            </h3>
            <p className="text-lg text-[#8F7A6A] max-w-2xl mx-auto">
              {block.content.description || 'Lembre-se: toda grande transformação começa com um primeiro passo. Este é o seu momento!'}
            </p>
          </div>
        );

      case 'bonus':
        return (
          <div className="bg-[#fff7f3] border border-[#B89B7A]/20 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-center text-[#432818]">
              {block.content.title || 'Bônus Exclusivos'}
            </h3>
            <p className="text-center text-[#8F7A6A] mb-6">
              {block.content.description || 'Além do conteúdo principal, você recebe'}
            </p>
            <div className="space-y-4">
              {(block.content.bonuses || [
                { title: 'Bônus 1', description: 'Descrição do bônus', value: 'R$ 49,90' },
                { title: 'Bônus 2', description: 'Descrição do bônus', value: 'R$ 29,90' }
              ]).map((bonus, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-4 rounded border">
                  <div>
                    <h4 className="font-semibold text-[#432818]">{bonus.title}</h4>
                    <p className="text-sm text-[#8F7A6A]">{bonus.description}</p>
                  </div>
                  <div className="text-[#B89B7A] font-bold">{bonus.value}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'secondary-styles':
        return (
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center text-[#432818]">
              {block.content.title || 'Estilos Relacionados'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {secondaryStyles?.slice(0, 3).map((style, index) => (
                <div key={index} className="bg-white border border-[#B89B7A]/20 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-[#432818] mb-2">{style.category}</h4>
                  <p className="text-sm text-[#8F7A6A]">{style.description}</p>
                </div>
              )) || (
                <div className="col-span-full text-center text-[#8F7A6A]">
                  Nenhum estilo secundário disponível
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">Tipo de bloco não reconhecido: {block.type}</p>
          </div>
        );
    }
  };

  return (
    <div 
      className="block-renderer"
      style={{
        backgroundColor: block.style?.backgroundColor,
        padding: block.style?.padding,
        margin: block.style?.margin,
        borderRadius: block.style?.borderRadius,
        fontSize: block.style?.fontSize,
        fontWeight: block.style?.fontWeight,
        color: block.style?.color,
        textAlign: block.style?.textAlign as 'left' | 'center' | 'right' | undefined,
        fontFamily: block.style?.fontFamily,
        width: block.style?.width
      }}
    >
      {renderBlockContent()}
    </div>
  );
};

export default BlockRenderer;
