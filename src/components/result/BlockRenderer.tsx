import React from 'react';
import { BlockData } from '@/types/resultPageConfig';
import HeroBlock from './blocks/HeroBlock';
import BenefitsBlock from './blocks/BenefitsBlock';
import PricingBlock from './blocks/PricingBlock';
import TestimonialsBlock from './blocks/TestimonialsBlock';
import MotivationBlock from './blocks/MotivationBlock';
import BonusBlock from './blocks/BonusBlock';
import GuaranteeBlock from './blocks/GuaranteeBlock';
import MentorBlock from './blocks/MentorBlock';
import TransformationsBlock from './blocks/TransformationsBlock';

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

      case 'guarantee':
        return (
          <GuaranteeBlock
            block={block}
            isEditMode={isEditMode}
            onClick={onClick}
          />
        );

      case 'mentor':
        return (
          <MentorBlock
            block={block}
            isEditMode={isEditMode}
            onClick={onClick}
          />
        );

      case 'transformations':
        return (
          <TransformationsBlock
            block={block}
            isEditMode={isEditMode}
            onClick={onClick}
          />
        );

      case 'motivation':
        return (
          <MotivationBlock
            block={block}
            isEditMode={isEditMode}
            onClick={onClick}
          />
        );

      case 'bonus':
        return (
          <BonusBlock
            block={block}
            isEditMode={isEditMode}
            onClick={onClick}
          />
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
