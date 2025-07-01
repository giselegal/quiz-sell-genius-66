
import React from 'react';
import { Card } from '@/components/ui/card';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { 
  ShoppingCart, 
  Clock, 
  Shield, 
  CheckCircle, 
  Award, 
  ArrowDown,
  TrendingUp,
  Hourglass
} from 'lucide-react';
import { tokens } from '@/config/designTokens';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import { Button } from '@/components/ui/button';

interface CTABlockProps {
  block: ResultPageBlock;
  primaryStyle: StyleResult;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onClick?: () => void;
}

export const CTABlock: React.FC<CTABlockProps> = ({
  block,
  primaryStyle,
  isSelected,
  isPreviewMode,
  onSelect,
  onClick
}) => {
  const content = block.content.cta || {};

  return (
    <div
      className={`
        relative transition-all duration-200
        ${!isPreviewMode ? 'hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50 cursor-pointer' : ''}
        ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500' : ''}
      `}
      onClick={!isPreviewMode ? onSelect : undefined}
    >
      <section id="cta" className="scroll-mt-24 mb-24 lg:mb-28">
        <div
          className="relative overflow-hidden bg-gradient-to-br from-white via-[#fff7f3] to-[#f9f4ef] rounded-3xl p-8 lg:p-16 border border-[#B89B7A]/20 text-center"
          style={{ boxShadow: tokens.shadows.xl }}
        >
          {/* Background decorativo */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#B89B7A]/5 via-transparent to-[#aa6b5d]/5 pointer-events-none"></div>

          <AnimatedWrapper
            animation="fade"
            show={true}
            duration={600}
            delay={200}
          >
            <div className="relative z-10">
              {/* Header da CTA */}
              <div className="mb-16 lg:mb-20">
                <div className="inline-flex items-center gap-4 mb-8">
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                  <div className="w-6 h-6 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full animate-pulse shadow-lg"></div>
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                </div>

                <h2 className="text-4xl lg:text-6xl xl:text-7xl font-playfair font-bold leading-tight mb-8">
                  <span className="bg-gradient-to-r from-[#2C1810] via-[#aa6b5d] to-[#2C1810] bg-clip-text text-transparent block mb-4">
                    {content.title || "Desperte Sua Confiança"}
                  </span>
                  <span className="text-[#aa6b5d] block">
                    {content.subtitle || "Com Seu Estilo Único!"}
                  </span>
                </h2>

                <p className="text-xl lg:text-2xl text-[#5D4A3A] font-medium mb-6">
                  Guia {primaryStyle.category} Personalizado + Bônus Exclusivos
                </p>

                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B89B7A]/10 to-[#aa6b5d]/10 px-4 py-2 rounded-full border border-[#B89B7A]/20">
                  <Clock className="w-4 h-4 text-[#aa6b5d]" />
                  <span className="text-sm font-medium text-[#aa6b5d]">
                    {content.urgencyText || "Oferta por tempo limitado"}
                  </span>
                </div>
              </div>

              {/* Grid de produtos */}
              <div className="mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                  {[
                    {
                      src: content.productImage || "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071344/GUIA_NATURAL_fzp6fc.webp",
                      title: `Manual de Estilo ${primaryStyle.category}`,
                      subtitle: "Descubra combinações infalíveis de cores, tecidos e acessórios que valorizam sua personalidade única.",
                      badge: "GUIA PRINCIPAL",
                      originalPrice: "R$ 77,00",
                      priority: true,
                    },
                    {
                      src: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1744911677/Cópia_de_MOCKUPS_15_-_Copia_grstwl.png",
                      title: "Guia das Peças Estratégicas",
                      subtitle: "Peças-chave que maximizam combinações e garantem versatilidade em qualquer situação.",
                      badge: "BÔNUS EXCLUSIVO",
                      originalPrice: "R$ 59,00",
                      priority: false,
                    },
                    {
                      src: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1744911666/Cópia_de_Template_Dossiê_Completo_2024_15_-_Copia_ssrhu3.png",
                      title: "Manual de Visagismo",
                      subtitle: "Descubra os cortes ideais para seu rosto e realce sua beleza natural.",
                      badge: "BÔNUS PREMIUM",
                      originalPrice: "R$ 39,00",
                      priority: false,
                    },
                  ].map((product, index) => (
                    <div
                      key={index}
                      className={`group bg-white rounded-2xl p-6 lg:p-8 border border-[#B89B7A]/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl relative ${
                        index === 2 ? "md:col-span-2 xl:col-span-1" : ""
                      }`}
                      style={{ boxShadow: tokens.shadows.lg }}
                    >
                      {/* Badge premium */}
                      <div className="absolute -top-4 -right-4 z-10">
                        <span
                          className={`text-xs font-bold px-4 py-2 rounded-full text-white shadow-lg transform rotate-12 ${
                            index === 0
                              ? "bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]"
                              : "bg-gradient-to-r from-[#aa6b5d] to-[#B89B7A]"
                          }`}
                        >
                          {product.badge}
                        </span>
                      </div>

                      {/* Imagem do produto */}
                      <div
                        className="relative mb-6 bg-gradient-to-br from-[#f9f4ef] to-[#fff7f3] rounded-xl p-4 overflow-hidden"
                        style={{
                          boxShadow: tokens.shadows.sm,
                          aspectRatio:
                            index === 0
                              ? "4.6/5"
                              : index === 1
                              ? "6/3.5"
                              : "3/4.5",
                        }}
                      >
                        <img
                          src={product.src}
                          alt={product.title}
                          className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                        />

                        {/* Overlay de hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#B89B7A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></div>
                      </div>

                      {/* Conteúdo do produto */}
                      <div className="text-left space-y-4">
                        <h4 className="font-bold text-[#2C1810] text-lg lg:text-xl leading-tight">
                          {product.title}
                        </h4>
                        <p className="text-sm lg:text-base text-[#5D4A3A] leading-relaxed">
                          {product.subtitle}
                        </p>

                        {/* Preço original */}
                        <div className="pt-4 border-t border-[#B89B7A]/10">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#8F7A6A]">
                              Valor individual:
                            </span>
                            <span className="text-lg font-bold text-[#B89B7A] line-through">
                              {product.originalPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumo de valor */}
              <div className="max-w-lg mx-auto mb-12">
                <div
                  className="relative bg-white rounded-2xl p-8 lg:p-10 border-4 border-double border-[#B89B7A]/30 overflow-hidden"
                  style={{
                    boxShadow:
                      "0 20px 40px rgba(184,155,122,0.15), 0 0 0 1px rgba(255,255,255,0.8) inset",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,244,239,0.95) 100%)",
                  }}
                >
                  {/* Background decorativo */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B89B7A]/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>

                  <div className="relative z-10 text-center space-y-6">
                    <p className="text-lg lg:text-xl font-semibold text-[#5D4A3A]">
                      De{" "}
                      <span className="font-bold text-[#B89B7A] text-xl lg:text-2xl line-through">
                        {content.regularPrice || "R$ 175,00"}
                      </span>{" "}
                      por apenas:
                    </p>

                    <div className="space-y-2">
                      <p className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                        {content.salePrice || "R$ 39,90"}
                      </p>
                      <p className="text-lg lg:text-xl font-bold text-[#4CAF50]">
                        {content.installments || "ou 5x de R$ 8,83"}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4CAF50]/10 to-[#43a047]/10 px-4 py-2 rounded-full border border-[#4CAF50]/20">
                      <TrendingUp className="w-4 h-4 text-[#4CAF50]" />
                      <span className="text-sm font-bold text-[#4CAF50]">
                        Economia de R$ 135,10 (77% OFF)
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[#8F7A6A] text-sm">
                      <Hourglass className="w-4 h-4 animate-pulse" />
                      <span>
                        Esta oferta expira quando você sair desta página
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button principal */}
              <div className="text-center">
                <Button
                  className="group relative text-white font-bold py-6 px-8 sm:px-12 lg:px-16 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #4CAF50 0%, #43a047 50%, #388e3c 100%)",
                    boxShadow:
                      "0 20px 40px rgba(76, 175, 80, 0.3), 0 0 0 1px rgba(255,255,255,0.2) inset",
                  }}
                  type="button"
                >
                  <span
                    className="flex items-center justify-center gap-2 sm:gap-3"
                    style={{
                      fontSize: "clamp(0.875rem, 2.5vw, 1.25rem)",
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                    <span className="leading-tight">
                      {content.ctaText || "Quero Transformar Meu Estilo Agora"}
                    </span>
                    <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce flex-shrink-0" />
                  </span>

                  {/* Efeito de brilho */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
                </Button>

                {/* Garantias de segurança */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[#8F7A6A]">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#B89B7A]" />
                    <span>Pagamento 100% Seguro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#B89B7A]" />
                    <span>Acesso Imediato</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#B89B7A]" />
                    <span>Garantia de 7 Dias</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </section>
    </div>
  );
};
