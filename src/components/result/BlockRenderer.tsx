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
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';

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
          <div 
            className={`py-8 px-6 ${isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-[#B89B7A] hover:bg-[#FAF9F7]' : ''}`}
            onClick={onClick}
          >
            <div className="container mx-auto max-w-4xl">
              <h3 className="text-2xl font-playfair font-bold mb-8 text-center text-[#432818]">
                {block.content.title || 'Seu Resultado Completo'}
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Estilo Predominante com Imagem */}
                {primaryStyle && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="text-xl font-semibold text-[#432818] mb-2">
                        Seu Estilo Predominante
                      </h4>
                      <div className="inline-block bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full text-lg font-medium">
                        {primaryStyle.category} - {primaryStyle.percentage}%
                      </div>
                    </div>
                    
                    {/* Imagem do Estilo Predominante */}
                    <div className="relative">
                      <img
                        src={primaryStyle.imageUrl || `https://placehold.co/400x300/B89B7A/ffffff?text=${encodeURIComponent(primaryStyle.category)}`}
                        alt={`Estilo ${primaryStyle.category}`}
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                        onLoad={handleImageLoad}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                    </div>
                    
                    {primaryStyle.description && (
                      <p className="text-[#5A5A5A] leading-relaxed text-center">
                        {primaryStyle.description}
                      </p>
                    )}
                  </div>
                )}
                
                {/* Estilos Complementares */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-[#432818] text-center mb-4">
                    Seus Estilos Complementares
                  </h4>
                  
                  {secondaryStyles && secondaryStyles.length > 0 ? (
                    <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                  ) : (
                    <div className="bg-[#fffaf7] rounded-lg p-6 text-center">
                      <p className="text-[#8F7A6A]">
                        Dados dos estilos complementares serão carregados automaticamente
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Descrição adicional */}
              {block.content.description && (
                <div className="mt-8 text-center">
                  <p className="text-[#5A5A5A] leading-relaxed max-w-2xl mx-auto">
                    {block.content.description}
                  </p>
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
