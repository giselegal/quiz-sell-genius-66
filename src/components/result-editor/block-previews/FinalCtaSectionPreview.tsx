
import React, { useState, useEffect } from 'react';
import { FinalCtaBlockContent } from '@/types/resultPageBlocks';
import { Button } from '@/components/ui/button';
import { Clock, Star, Shield, Zap } from 'lucide-react';

interface FinalCtaSectionPreviewProps {
  content: FinalCtaBlockContent;
}

export const FinalCtaSectionPreview: React.FC<FinalCtaSectionPreviewProps> = ({
  content
}) => {
  const [timeLeft, setTimeLeft] = useState(content.timer?.duration ? content.timer.duration * 60 : 3600);

  useEffect(() => {
    if (!content.timer?.enabled) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [content.timer?.enabled]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalOriginalPrice = content.products?.reduce((sum, product) => sum + product.originalPrice, 0) || 0;
  const totalSalePrice = content.products?.reduce((sum, product) => sum + product.salePrice, 0) || 0;
  const totalSavings = totalOriginalPrice - totalSalePrice;

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-[#FAF9F7] via-white to-[#F5F3F0] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-[#B89B7A] to-[#8F7A6A] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-[#8F7A6A] to-[#B89B7A] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-[#D4C5B9] to-[#B89B7A] rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Timer */}
          {content.timer?.enabled && (
            <div className="text-center mb-12">
              <div className="inline-block bg-red-600 text-white px-8 py-4 rounded-2xl shadow-2xl animate-pulse">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6" />
                  <div>
                    <p className="font-bold text-lg">
                      {content.timer.message || 'Oferta por tempo limitado!'}
                    </p>
                    <div className="text-2xl font-mono font-bold mt-2">
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-playfair font-bold mb-6 text-[#432818] leading-tight">
              Transforme Seu Estilo Agora
            </h2>
            <p className="text-xl lg:text-2xl text-[#8F7A6A] max-w-3xl mx-auto leading-relaxed">
              Acesso completo ao método que já transformou milhares de mulheres
            </p>
          </div>

          {/* Products grid */}
          {content.products && content.products.length > 0 && (
            <div className="mb-16">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
                {content.products.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-2xl p-8 shadow-xl border border-[#B89B7A]/10 hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="text-center">
                      {product.image && (
                        <div className="mb-6">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-[#B89B7A]/20"
                          />
                        </div>
                      )}
                      
                      <h3 className="text-xl font-playfair font-bold text-[#432818] mb-4 group-hover:text-[#B89B7A] transition-colors">
                        {product.name}
                      </h3>
                      
                      <p className="text-[#8F7A6A] text-sm leading-relaxed mb-6">
                        {product.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-gray-500 line-through text-lg">
                            R$ {product.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-[#B89B7A] font-bold text-2xl">
                            R$ {product.salePrice.toFixed(2)}
                          </span>
                        </div>
                        <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)}% OFF
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total value */}
              <div className="bg-gradient-to-r from-[#B89B7A] to-[#8F7A6A] text-white rounded-2xl p-8 text-center shadow-2xl">
                <h3 className="text-2xl font-playfair font-bold mb-4">Valor Total do Pacote</h3>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-xl line-through opacity-75">
                    R$ {totalOriginalPrice.toFixed(2)}
                  </span>
                  <span className="text-4xl font-bold">
                    R$ {totalSalePrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-xl opacity-90">
                  Você economiza R$ {totalSavings.toFixed(2)}
                </p>
              </div>
            </div>
          )}

          {/* Discount highlight */}
          {content.discount && (
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6" />
                  <p className="text-xl font-bold">
                    {content.discount.message || `${content.discount.percentage}% de desconto!`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main CTA */}
          <div className="text-center mb-12">
            <Button
              size="lg"
              className="text-xl lg:text-2xl px-12 py-8 rounded-2xl font-bold shadow-2xl hover:scale-105 transition-all duration-300 min-w-[400px]"
              style={{ backgroundColor: content.buttonColor || '#22c55e' }}
            >
              {content.buttonText || 'QUERO TRANSFORMAR MEU ESTILO AGORA'}
            </Button>
            
            <div className="mt-6 space-y-2">
              <p className="text-[#8F7A6A] text-sm">
                ✅ Acesso imediato após a confirmação do pagamento
              </p>
              <p className="text-[#8F7A6A] text-sm">
                ✅ Garantia de 7 dias ou seu dinheiro de volta
              </p>
              <p className="text-[#8F7A6A] text-sm">
                ✅ Suporte especializado incluído
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#B89B7A]/10 rounded-full flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-[#B89B7A]" />
              </div>
              <p className="text-sm font-medium text-[#432818]">Compra Segura</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#B89B7A]/10 rounded-full flex items-center justify-center mb-3">
                <Star className="w-6 h-6 text-[#B89B7A]" />
              </div>
              <p className="text-sm font-medium text-[#432818]">Nota 5 Estrelas</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#B89B7A]/10 rounded-full flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 text-[#B89B7A]" />
              </div>
              <p className="text-sm font-medium text-[#432818]">Acesso Imediato</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#B89B7A]/10 rounded-full flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-[#B89B7A]" />
              </div>
              <p className="text-sm font-medium text-[#432818]">Suporte 24h</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
