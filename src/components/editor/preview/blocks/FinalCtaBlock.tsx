
import React from 'react';
import { FinalCtaBlockContent } from '@/types/resultPageBlocks';
import { Button } from '@/components/ui/button';

interface FinalCtaBlockProps {
  content: FinalCtaBlockContent;
  onClick: () => void;
}

export const FinalCtaBlock: React.FC<FinalCtaBlockProps> = ({
  content,
  onClick
}) => {
  return (
    <div
      className="border-2 border-dashed border-transparent hover:border-[#B89B7A] rounded-lg transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-gradient-to-br from-[#FAF9F7] to-[#F5F3F0] py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {content.timer?.enabled && (
            <div className="bg-red-600 text-white px-6 py-3 rounded-lg mb-8 inline-block">
              <p className="font-semibold">
                {content.timer.message || 'Oferta por tempo limitado!'}
              </p>
            </div>
          )}

          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-8 text-[#432818]">
            Transforme Seu Estilo Agora
          </h2>

          {content.products && content.products.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {content.products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl p-6 shadow-lg border border-[#B89B7A]/20">
                  <h3 className="font-semibold text-[#432818] mb-2">{product.name}</h3>
                  <p className="text-[#8F7A6A] text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-500 line-through text-sm">
                        R$ {product.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-[#B89B7A] font-bold text-xl ml-2">
                        R$ {product.salePrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {content.discount && (
            <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-8 inline-block">
              <p className="text-green-800 font-semibold">
                {content.discount.message || `${content.discount.percentage}% de desconto!`}
              </p>
            </div>
          )}

          <Button
            size="lg"
            className="text-xl px-12 py-6 rounded-xl font-bold"
            style={{ backgroundColor: content.buttonColor || '#22c55e' }}
          >
            {content.buttonText || 'QUERO TRANSFORMAR MEU ESTILO AGORA'}
          </Button>

          <p className="text-[#8F7A6A] text-sm mt-4">
            Acesso imediato após a confirmação do pagamento
          </p>
        </div>
      </div>
    </div>
  );
};
