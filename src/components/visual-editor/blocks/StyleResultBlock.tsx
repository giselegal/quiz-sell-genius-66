
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { styleConfig } from '@/config/styleConfig';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';

interface StyleResultBlockProps {
  block: ResultPageBlock;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  primaryStyle: StyleResult;
  secondaryStyles?: StyleResult[];
}

export const StyleResultBlock: React.FC<StyleResultBlockProps> = ({
  block,
  isSelected,
  isPreviewMode,
  onSelect,
  primaryStyle,
  secondaryStyles = []
}) => {
  const content = block.content.styleResult || {};
  const { category } = primaryStyle;
  const { image, description: defaultDescription } = styleConfig[category];
  
  const description = content.description || defaultDescription;
  const displayImage = content.customImage || image;

  return (
    <div
      className={`
        relative transition-all duration-200
        ${!isPreviewMode ? 'hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50 cursor-pointer' : ''}
        ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500' : ''}
      `}
      onClick={!isPreviewMode ? onSelect : undefined}
    >
      <Card className="p-6 sm:p-8 md:p-10 mb-12 bg-white/95 backdrop-blur-sm shadow-lg border border-[#B89B7A]/30 rounded-xl">
        <AnimatedWrapper animation="fade" show={true} duration={600} delay={100}>
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-playfair text-[#432818] mb-6">
              Seu Estilo Predominante
            </h1>
            <div className="max-w-md mx-auto mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm md:text-base font-medium text-[#8F7A6A]">
                  {primaryStyle.category}
                </span>
                <span className="text-[#aa6b5d] font-semibold text-lg">
                  {primaryStyle.percentage}%
                </span>
              </div>
              <Progress
                value={primaryStyle.percentage}
                className="h-3 bg-[#F3E8E6]"
                indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <p className="text-[#432818] leading-relaxed text-base md:text-lg">
                {description}
              </p>
              
              {content.showSecondaryStyles && secondaryStyles.length > 0 && (
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#B89B7A]/20">
                  <h3 className="text-lg font-medium text-[#432818] mb-4">
                    Estilos que Também Influenciam Você
                  </h3>
                  <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                </div>
              )}
            </div>

            <div className="max-w-[220px] md:max-w-[300px] mx-auto relative order-1 md:order-2">
              <img
                src={`${displayImage}?q=auto:best&f=auto&w=300`}
                alt={`Estilo ${category}`}
                width={300}
                height={390}
                className="w-full h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -top-3 -right-3 w-14 h-14 border-t-2 border-r-2 border-[#B89B7A]"></div>
              <div className="absolute -bottom-3 -left-3 w-14 h-14 border-b-2 border-l-2 border-[#B89B7A]"></div>
            </div>
          </div>
        </AnimatedWrapper>
      </Card>
    </div>
  );
};
