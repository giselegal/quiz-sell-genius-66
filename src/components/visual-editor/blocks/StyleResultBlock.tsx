
import React from 'react';
import { Card } from '@/components/ui/card';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { Progress } from '@/components/ui/progress';
import { tokens } from '@/config/designTokens';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';

interface StyleResultBlockProps {
  block: ResultPageBlock;
  primaryStyle: StyleResult;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onClick?: () => void;
}

export const StyleResultBlock: React.FC<StyleResultBlockProps> = ({
  block,
  primaryStyle,
  isSelected,
  isPreviewMode,
  onSelect,
  onClick
}) => {
  const content = block.content.styleResult || {};

  // Gerar estilos secundários baseados no estilo primário
  const generateSecondaryStyles = (primary: StyleResult): StyleResult[] => {
    const allStyles = ['Natural', 'Clássico', 'Contemporâneo', 'Elegante', 'Romântico', 'Sexy', 'Dramático', 'Criativo'];
    const otherStyles = allStyles.filter(style => style !== primary.category);
    
    return otherStyles.slice(0, 3).map((category, index) => ({
      category: category as any,
      score: 80 - (index * 15), // Scores decrescentes
      percentage: 75 - (index * 10) // Percentagens decrescentes
    }));
  };

  const secondaryStyles = generateSecondaryStyles(primaryStyle);

  const getStyleImage = (): string => {
    const styleImages = {
      Natural: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1745071344/GUIA_NATURAL_fzp6fc.webp",
      Clássico: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp",
      Contemporâneo: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp",
      Elegante: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1745071342/GUIA_ELEGANTE_asez1q.webp",
      Romântico: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp",
      Sexy: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1745071349/GUIA_SEXY_t5x2ov.webp",
      Dramático: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp",
      Criativo: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1745071342/GUIA_CRIATIVO_ntbzph.webp",
    };
    
    return content.customImage || styleImages[primaryStyle.category] || styleImages.Natural;
  };

  const getStyleDescription = (): string => {
    if (content.description) return content.description;
    
    const descriptions = {
      Natural: "valoriza autenticidade e conforto, sem abrir mão da elegância natural",
      Clássico: "aprecia sofisticação atemporal e peças que nunca saem de moda",
      Contemporâneo: "está sempre em sintonia com as tendências, mas de forma equilibrada",
      Elegante: "irradia refinamento e classe em cada detalhe do seu visual",
      Romântico: "expressa delicadeza e feminilidade através de looks encantadores",
      Sexy: "tem confiança para valorizar sua sensualidade de forma elegante",
      Dramático: "não tem medo de fazer declarações ousadas com seu estilo",
      Criativo: "expressa criatividade e originalidade em cada combinação de roupas"
    };
    
    return descriptions[primaryStyle.category] || descriptions.Natural;
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
              <AnimatedWrapper
                className="mb-8"
                animation="scale"
                show={true}
                duration={500}
                delay={100}
              >
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] px-6 py-3 rounded-full border border-[#B89B7A]/20">
                  <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                    Parabéns! Descobrimos seu estilo
                  </span>
                </div>
              </AnimatedWrapper>

              {/* Título principal melhorado */}
              <h1 className="text-2xl lg:text-4xl xl:text-5xl font-playfair text-[#2C1810] mb-8 leading-tight">
                Descobrimos Seu Estilo Predominante:
                <br />
                <span className="text-3xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] bg-clip-text text-transparent mt-2 block">
                  {primaryStyle.category}
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
                  animation="fade"
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
                            Seu estilo {primaryStyle.category}
                          </strong>{" "}
                          revela uma mulher que {getStyleDescription()}.
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
                {content.showSecondaryStyles !== false && (
                  <AnimatedWrapper
                    animation="fade"
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
                      
                      <div className="space-y-4">
                        {secondaryStyles.map((style, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                            <span className="font-medium text-[#2C1810]">{style.category}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-[#f5f2ec] rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] h-2 rounded-full transition-all duration-1000"
                                  style={{ width: `${style.percentage}%` }}
                                />
                              </div>
                              <span className="text-sm font-bold text-[#B89B7A] w-10 text-right">
                                {style.percentage}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimatedWrapper>
                )}
              </div>

              {/* Imagem principal */}
              <AnimatedWrapper
                animation="scale"
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
                    <img
                      src={getStyleImage()}
                      alt={`Estilo ${primaryStyle.category}`}
                      className="w-full h-auto transition-all duration-500 hover:scale-105"
                    />

                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
                  </div>

                  {/* Badge flutuante */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-lg">
                    <span>{primaryStyle.category}</span>
                  </div>

                  {/* Decoração de cantos */}
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-3 border-l-3 border-[#B89B7A] rounded-bl-xl opacity-60"></div>
                </div>
              </AnimatedWrapper>
            </div>
          </AnimatedWrapper>
        </Card>
      </section>
    </div>
  );
};
