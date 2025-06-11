import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import ProgressiveImage from '@/components/ui/progressive-image';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import { tokens } from '@/config/designTokens';
import { styleConfig } from '@/config/styleConfig';
import { StyleResult } from '@/types/quiz';

interface ResultHeaderSectionProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  user: any;
  isLowPerformance: boolean;
  onImageLoad: (imageType: "style" | "guide") => void;
}

const ResultHeaderSection: React.FC<ResultHeaderSectionProps> = ({
  primaryStyle,
  secondaryStyles,
  user,
  isLowPerformance,
  onImageLoad,
}) => {
  const { category } = primaryStyle;
  const { image, guideImage } = styleConfig[category];

  return (
    <section id="primary-style" className="scroll-mt-24 mb-24 lg:mb-28">
      <Card
        className="relative overflow-hidden bg-gradient-to-br from-white to-[#fff7f3] border border-[#B89B7A]/15 rounded-2xl p-6 lg:p-10"
        style={{ boxShadow: tokens.shadows.xl }}
      >
        {/* Decoração de cantos elegante */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#B89B7A]/20 rounded-tl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#B89B7A]/20 rounded-br-2xl"></div>

        <AnimatedWrapper
          animation="fade"
          show={true}
          duration={600}
          delay={200}
        >
          {/* Header personalizado */}
          <div className="text-center mb-12 lg:mb-16">
            {user?.userName && (
              <AnimatedWrapper
                className="mb-8"
                animation="scale"
                show={true}
                duration={500}
                delay={100}
              >
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] px-6 py-3 rounded-full border border-[#B89B7A]/20">
                  <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                    Parabéns, {user.userName}!
                  </span>
                </div>
              </AnimatedWrapper>
            )}

            {/* Título principal melhorado */}
            <h1 className="text-2xl lg:text-4xl xl:text-5xl font-playfair text-[#2C1810] mb-8 leading-tight">
              Descobrimos Seu Estilo Predominante:
              <br />
              <span className="text-3xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] bg-clip-text text-transparent mt-2 block">
                {category}
              </span>
            </h1>

            {/* Progress bar elegante */}
            <div className="max-w-lg mx-auto mb-8">
              <div className="flex items-center justify-between text-sm font-medium text-[#5D4A3A] mb-3">
                <span>Compatibilidade</span>
                <span className="text-lg font-bold text-[#B89B7A]">
                  {primaryStyle.percentage}%
                </span>
              </div>
              <div className="relative">
                <Progress
                  value={primaryStyle.percentage}
                  className="h-3 bg-gradient-to-r from-[#f5f2ec] to-[#f0ebe3] rounded-full overflow-hidden border border-[#B89B7A]/10"
                  indicatorClassName="bg-gradient-to-r from-[#B89B7A] via-[#D4B79F] to-[#aa6b5d] transition-all duration-1000 ease-out rounded-full"
                  style={{ boxShadow: tokens.shadows.inner }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Grid principal otimizado */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Conteúdo textual */}
            <div className="space-y-8 order-2 lg:order-1">
              <AnimatedWrapper
                animation={isLowPerformance ? "none" : "fade"}
                show={true}
                duration={400}
                delay={300}
              >
                <div className="space-y-6">
                  {/* Mensagem principal */}
                  <div
                    className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-xl p-6 border border-[#B89B7A]/10"
                    style={{ boxShadow: tokens.shadows.sm }}
                  >
                    <p className="text-[#2C1810] leading-relaxed text-lg font-medium mb-6">
                      <strong className="text-[#aa6b5d]">
                        Agora você tem clareza total
                      </strong>{" "}
                      sobre quem você é e como expressar sua personalidade
                      através do seu estilo!
                    </p>

                    {/* Descrição do estilo */}
                    <div className="bg-white/60 rounded-lg p-4 border border-[#B89B7A]/5">
                      <p className="text-[#2C1810] text-base leading-relaxed">
                        <strong className="text-[#aa6b5d]">
                          Seu estilo {category}
                        </strong>{" "}
                        revela uma mulher que{" "}
                        {category === "Natural"
                          ? "valoriza autenticidade e conforto, sem abrir mão da elegância natural"
                          : category === "Clássico"
                          ? "aprecia sofisticação atemporal e peças que nunca saem de moda"
                          : category === "Contemporâneo"
                          ? "está sempre em sintonia com as tendências, mas de forma equilibrada"
                          : category === "Elegante"
                          ? "irradia refinamento e classe em cada detalhe do seu visual"
                          : category === "Romântico"
                          ? "expressa delicadeza e feminilidade através de looks encantadores"
                          : category === "Sexy"
                          ? "tem confiança para valorizar sua sensualidade de forma elegante"
                          : category === "Dramático"
                          ? "não tem medo de fazer declarações ousadas com seu estilo"
                          : "expressa criatividade e originalidade em cada combinação de roupas"}
                        .
                      </p>
                    </div>
                  </div>

                  {/* Call to action sutil */}
                  <div className="text-center p-4 bg-gradient-to-r from-[#B89B7A]/5 to-[#aa6b5d]/5 rounded-lg border border-[#B89B7A]/10">
                    <p className="text-base font-semibold text-[#2C1810] mb-2">
                      <strong>
                        Chega de ficar perdida no guarda-roupa!
                      </strong>
                    </p>
                    <p className="text-sm text-[#5D4A3A]">
                      Descubra como aplicar seu estilo no dia a dia
                    </p>
                  </div>
                </div>
              </AnimatedWrapper>

              {/* Estilos secundários melhorados */}
              <AnimatedWrapper
                animation={isLowPerformance ? "none" : "fade"}
                show={true}
                duration={400}
                delay={500}
              >
                <div
                  className="bg-gradient-to-br from-white to-[#fff7f3] rounded-xl p-6 border border-[#B89B7A]/15"
                  style={{ boxShadow: tokens.shadows.md }}
                >
                  <h3 className="text-xl font-semibold text-[#aa6b5d] mb-6 flex items-center gap-2">
                    Estilos que Também Influenciam Você
                  </h3>
                  <SecondaryStylesSection
                    secondaryStyles={secondaryStyles}
                  />
                </div>
              </AnimatedWrapper>
            </div>

            {/* Imagem principal */}
            <AnimatedWrapper
              animation={isLowPerformance ? "none" : "scale"}
              show={true}
              duration={500}
              delay={400}
              className="order-1 lg:order-2"
            >
              <div className="relative max-w-md mx-auto">
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{ boxShadow: tokens.shadows.lg }}
                >
                  <ProgressiveImage
                    src={`${image}?q=90&f=auto&w=500`}
                    alt={`Estilo ${category}`}
                    width={500}
                    height={600}
                    className="w-full h-auto transition-all duration-500 hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                    onLoad={() => onImageLoad("style")}
                  />

                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Badge flutuante */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-lg">
                  <span>{category}</span>
                </div>

                {/* Decoração de cantos */}
                <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-3 border-l-3 border-[#B89B7A] rounded-bl-xl opacity-60"></div>
              </div>
            </AnimatedWrapper>
          </div>

          {/* Guia do estilo */}
          <AnimatedWrapper
            animation={isLowPerformance ? "none" : "fade"}
            show={true}
            duration={400}
            delay={700}
          >
            <div className="mt-16 text-center">
              <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-[#aa6b5d] mb-8">
                Seu Guia de Estilo Personalizado
              </h3>
              <div className="relative max-w-3xl mx-auto">
                <ProgressiveImage
                  src={`${guideImage}?q=90&f=auto&w=900`}
                  alt={`Guia de Estilo ${category}`}
                  loading="lazy"
                  className="w-full h-auto rounded-xl transition-all duration-500 hover:scale-102"
                  style={{ boxShadow: tokens.shadows.xl }}
                  onLoad={() => onImageLoad("guide")}
                />

                {/* Badge exclusivo */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-3 py-1.5 rounded-full text-xs font-bold transform rotate-12 shadow-md">
                  EXCLUSIVO
                </div>
              </div>
            </div>
          </AnimatedWrapper>
        </AnimatedWrapper>
      </Card>
    </section>
  );
};

export { ResultHeaderSection };
export default ResultHeaderSection;
