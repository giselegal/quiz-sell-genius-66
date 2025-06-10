
import React, { useState } from 'react';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import SecurePurchaseElement from '@/components/result/SecurePurchaseElement';

interface CTABlockProps {
  block: ResultPageBlock;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
}

export const CTABlock: React.FC<CTABlockProps> = ({
  block,
  isSelected,
  isPreviewMode,
  onSelect
}) => {
  const content = block.content.cta || {};
  const [isHovered, setIsHovered] = useState(false);

  const handleCTAClick = () => {
    if (content.ctaUrl) {
      window.location.href = content.ctaUrl;
    }
  };

  return (
    <div
      className={`
        relative transition-all duration-200
        ${!isPreviewMode ? 'hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50 cursor-pointer' : ''}
        ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500' : ''}
      `}
      onClick={!isPreviewMode ? onSelect : undefined}
    >
      <div className="my-14 text-center max-w-3xl mx-auto bg-[#f9f6f3] p-8 rounded-2xl shadow-md border border-[#B89B7A]/20">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-[#aa6b5d] mb-6">
          {content.title || "Descubra Como Aplicar Seu Estilo na Prática"}
        </h3>
        
        {content.subtitle && (
          <p className="text-lg text-[#432818] mb-6 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-gradient-to-r from-[#fff8f4] to-[#faf5f0] p-7 rounded-xl border border-[#B89B7A]/20 shadow-md">
            <h4 className="text-xl md:text-2xl font-medium text-[#aa6b5d] mb-5">
              O Guia de Estilo e Imagem + Bônus Exclusivos
            </h4>
          </div>

          <div className="bg-white p-7 rounded-xl shadow-xl border border-[#B89B7A]/20 max-w-md mx-auto transform hover:scale-[1.02] transition-transform duration-300">
            <h4 className="text-xl md:text-2xl font-medium text-center text-[#aa6b5d] mb-5">
              O Que Você Recebe Hoje
            </h4>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-3 border-b border-[#B89B7A]/10">
                <span className="font-medium">Guia Principal</span>
                <span className="font-semibold">R$ 67,00</span>
              </div>
              <div className="flex justify-between items-center p-3 border-b border-[#B89B7A]/10">
                <span className="font-medium">Bônus - Peças-chave</span>
                <span className="font-semibold">R$ 79,00</span>
              </div>
              <div className="flex justify-between items-center p-3 border-b border-[#B89B7A]/10">
                <span className="font-medium">Bônus - Visagismo Facial</span>
                <span className="font-semibold">R$ 29,00</span>
              </div>
              <div className="flex justify-between items-center p-3 pt-4 font-bold">
                <span className="text-lg">Valor Total</span>
                <div className="relative">
                  <span className="text-lg">{content.regularPrice || "R$ 175,00"}</span>
                  <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#ff5a5a] transform -translate-y-1/2 -rotate-3"></div>
                </div>
              </div>
            </div>

            <div className="text-center p-5 bg-[#f9f5f0] rounded-lg border border-[#B89B7A]/10">
              <p className="text-sm text-[#aa6b5d] uppercase font-medium">
                Hoje por apenas
              </p>
              <p className="text-4xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                {content.salePrice || "R$ 39,00"}
              </p>
              <p className="text-xs text-[#3a3a3a]/60 mt-1">
                Pagamento único ou em {content.installments || "4X de R$ 10,86"}
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleCTAClick}
          className="text-white py-6 px-10 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 mb-5"
          style={{
            background: "linear-gradient(to right, #4CAF50, #45a049)",
            boxShadow: "0 6px 18px rgba(76, 175, 80, 0.35)",
            fontSize: "1.25rem"
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="flex items-center justify-center gap-3">
            <ShoppingCart className={`w-6 h-6 transition-transform duration-300 ${isHovered ? 'scale-125' : ''}`} />
            <span>{content.ctaText || "Garantir Meu Guia + Bônus Especiais"}</span>
          </span>
        </Button>

        <SecurePurchaseElement />

        {content.urgencyText && (
          <p className="text-sm text-[#aa6b5d] mt-3 flex items-center justify-center gap-1.5">
            {content.urgencyText}
          </p>
        )}
      </div>
    </div>
  );
};
