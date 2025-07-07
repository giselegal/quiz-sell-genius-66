import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Card } from '@/components/ui/card';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import { useIsMobile } from '@/hooks/use-mobile'; // Assuming this hook works correctly for breakpoints

interface StyleResultSectionProps {
  primaryStyle: StyleResult;
  description: string;
  image: string;
  secondaryStyles: StyleResult[];
}

export const StyleResultSection: React.FC<StyleResultSectionProps> = ({
  primaryStyle,
  description,
  image,
  secondaryStyles
}) => {
  // useIsMobile() might be sufficient, but using Tailwind's own breakpoints for consistency
  // const isMobile = useIsMobile(); // You can still use this if it controls specific JS behavior

  return (
    // Card principal: padding responsivo e margem inferior para espaçamento entre seções
    <Card className="p-4 sm:p-6 md:p-8 bg-white shadow-sm border border-[#B89B7A]/20 mb-8 md:mb-12">
      {/* Barra de Progresso do Estilo Predominante */}
      <div className="w-full max-w-md mx-auto mb-6"> {/* Aumentado mb para 6 */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm sm:text-base font-medium text-[#432818]">Estilo Predominante</span>
          <span className="text-sm sm:text-base font-medium text-[#B89B7A]">{primaryStyle.percentage}%</span>
        </div>
        <div className="w-full bg-[#F3E8E6] rounded-full h-2">
          <div 
            className="bg-[#B89B7A] h-2 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${primaryStyle.percentage}%` }} 
          />
        </div>
      </div>
      
      {/* Layout Principal: Imagem e Descrição */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 mb-6"> {/* Flex-col em mobile, flex-row em md+ */}
        {/* Imagem principal */}
        <div className="w-full md:w-1/2 flex-shrink-0"> {/* Ocupa toda largura em mobile, metade em md+ */}
          <img 
            src={image} 
            alt={`Estilo ${primaryStyle.category}`}
            className="w-full h-auto rounded-lg shadow-md mx-auto max-w-[238px] md:max-w-none" // max-w para controlar o tamanho máximo em mobile
          />
        </div>

        {/* Descrição do estilo */}
        <div className="flex-1"> {/* Ocupa o restante do espaço disponível */}
          <p className="text-base sm:text-lg text-[#432818] leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Estilos Secundários: Visíveis SEMPRE, mas com layout diferente */}
      {/* Em Mobile: Aparece abaixo da imagem/descrição */}
      {/* Em Desktop: Se sobrepõe à imagem (o layout original) */}
      <div className="relative">
        {/* Este div contém a seção de estilos secundários */}
        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-[#B89B7A]/10 mt-4 md:mt-0"> {/* Margem top para mobile, ou 0 em desktop */}
          <h3 className="text-base sm:text-lg font-medium text-[#432818] mb-2">Estilos que Também Influenciam Você</h3>
          <SecondaryStylesSection secondaryStyles={secondaryStyles} />
        </div>
      </div>
    </Card>
  );
};