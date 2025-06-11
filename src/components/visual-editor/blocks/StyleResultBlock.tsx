
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { tokens } from '@/config/designTokens';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import ProgressiveImage from '@/components/ui/progressive-image';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';

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
  
  // Mock secondary styles for demo
  const secondaryStyles = [
    { category: "Clássico", percentage: 65 },
    { category: "Elegante", percentage: 45 }
  ];

  // Style images mapping
  const styleImages = {
    Natural: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp",
    Clássico: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920984/Espanhol_Portugu%C3%AAs_9_dmmiuf.webp",
    Contemporâneo: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920984/Espanhol_Portugu%C3%AAs_10_ysj5jp.webp",
    Elegante: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920984/Espanhol_Portugu%C3%AAs_11_ijvajz.webp",
    Romântico: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920984/Espanhol_Portugu%C3%AAs_12_jdamcg.webp",
    Sexy: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920984/Espanhol_Portugu%C3%AAs_13_zv0vqu.webp",
    Dramático: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920984/Espanhol_Portugu%C3%AAs_14_ldofbr.webp",
    Criativo: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920984/Espanhol_Portugu%C3%AAs_15_ij4duj.webp"
  };

  const guideImages = {
    Natural: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_900/v1745071344/GUIA_NATURAL_fzp6fc.webp",
    Clássico: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_900/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp",
    Contemporâneo: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_900/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp",
    Elegante: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_900/v1745071342/GUIA_ELEGANTE_asez1q.webp",
    Romântico: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_900/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp",
    Sexy: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_900/v1745071349/GUIA_SEXY_t5x2ov.webp",
    Dramático: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_900/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp",
    Criativo: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_900/v1745071342/GUIA_CRIATIVO_ntbzph.webp"
  };

  const styleImage = styleImages[primaryStyle.category] || styleImages.Natural;
  const guideImage = guideImages[primaryStyle.category] || guideImages.Natural;

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
          className="relative overflow-hidden bg-gradient-to-br from-white to-[#fff7f3] border rounded-2xl p-6 lg:p-10"
          style={{ 
            borderColor: `${tokens.colors.primary}/15`,
            boxShadow: tokens.shadows.xl 
          }}
        >
          {/* Decoração de cantos elegante */}
          <div 
            className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 rounded-tl-2xl"
            style={{ borderColor: `${tokens.colors.primary}/20` }}
          ></div>
          <div 
            className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 rounded-br-2xl"
            style={{ borderColor: `${tokens.colors.primary}/20` }}
          ></div>

          <AnimatedWrapper animation="fade" show={true} duration={600} delay={200}>
            {/* Header personalizado */}
            <div className="text-center mb-12 lg:mb-16">
              <AnimatedWrapper className="mb-8" animation="scale" show={true} duration={500} delay={100}>
                <div 
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full border"
                  style={{
                    background: `linear-gradient(to right, ${tokens.colors.backgroundAlt}, ${tokens.colors.backgroundCard})`,
                    borderColor: `${tokens.colors.primary}/20`
                  }}
                >
                  <span 
                    className="text-lg lg:text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${tokens.colors.primary}, ${tokens.colors.secondary})`
                    }}
                  >
                    {content.greeting || "Parabéns!"}
                  </span>
                </div>
              </AnimatedWrapper>

              {/* Título principal melhorado */}
              <h1 className="text-2xl lg:text-4xl xl:text-5xl font-playfair mb-8 leading-tight" style={{ color: tokens.colors.text }}>
                Descobrimos Seu Estilo Predominante:
                <br />
                <span 
                  className="text-3xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent mt-2 block"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${tokens.colors.primary}, ${tokens.colors.secondary}, ${tokens.colors.primary})`
                  }}
                >
                  {primaryStyle.category}
                </span>
              </h1>

              {/* Progress bar elegante */}
              <div className="max-w-lg mx-auto mb-8">
                <div className="flex items-center justify-between text-sm font-medium mb-3" style={{ color: tokens.colors.textSecondary }}>
                  <span>Compatibilidade</span>
                  <span className="text-lg font-bold" style={{ color: tokens.colors.primary }}>
                    {primaryStyle.percentage}%
                  </span>
                </div>
                <div className="relative">
                  <Progress
                    value={primaryStyle.percentage}
                    className="h-3 rounded-full overflow-hidden border"
                    style={{
                      background: `linear-gradient(to right, ${tokens.colors.backgroundAlt}, ${tokens.colors.backgroundCard})`,
                      borderColor: `${tokens.colors.primary}/10`,
                      boxShadow: tokens.shadows.inner
                    }}
                    indicatorClassName="transition-all duration-1000 ease-out rounded-full"
                    indicatorStyle={{
                      background: `linear-gradient(to right, ${tokens.colors.primary}, ${tokens.colors.primaryLight}, ${tokens.colors.secondary})`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Grid principal otimizado */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Conteúdo textual */}
              <div className="space-y-8 order-2 lg:order-1">
                <AnimatedWrapper animation="fade" show={true} duration={400} delay={300}>
                  <div className="space-y-6">
                    {/* Mensagem principal */}
                    <div
                      className="rounded-xl p-6 border"
                      style={{
                        background: `linear-gradient(to right, ${tokens.colors.backgroundAlt}, ${tokens.colors.backgroundCard})`,
                        borderColor: `${tokens.colors.primary}/10`,
                        boxShadow: tokens.shadows.sm
                      }}
                    >
                      <p className="leading-relaxed text-lg font-medium mb-6" style={{ color: tokens.colors.text }}>
                        <strong style={{ color: tokens.colors.secondary }}>
                          Agora você tem clareza total
                        </strong>{" "}
                        sobre quem você é e como expressar sua personalidade através do seu estilo!
                      </p>

                      {/* Descrição do estilo */}
                      <div 
                        className="rounded-lg p-4 border"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.6)',
                          borderColor: `${tokens.colors.primary}/5`
                        }}
                      >
                        <p className="text-base leading-relaxed" style={{ color: tokens.colors.text }}>
                          <strong style={{ color: tokens.colors.secondary }}>
                            Seu estilo {primaryStyle.category}
                          </strong>{" "}
                          {content.description || `revela uma mulher que valoriza autenticidade e expressa sua personalidade única através de suas escolhas de moda.`}
                        </p>
                      </div>
                    </div>

                    {/* Call to action sutil */}
                    <div 
                      className="text-center p-4 rounded-lg border"
                      style={{
                        background: `linear-gradient(to right, ${tokens.colors.primary}05, ${tokens.colors.secondary}05)`,
                        borderColor: `${tokens.colors.primary}/10`
                      }}
                    >
                      <p className="text-base font-semibold mb-2" style={{ color: tokens.colors.text }}>
                        <strong>Chega de ficar perdida no guarda-roupa!</strong>
                      </p>
                      <p className="text-sm" style={{ color: tokens.colors.textSecondary }}>
                        Descubra como aplicar seu estilo no dia a dia
                      </p>
                    </div>
                  </div>
                </AnimatedWrapper>

                {/* Estilos secundários melhorados */}
                <AnimatedWrapper animation="fade" show={true} duration={400} delay={500}>
                  <div
                    className="rounded-xl p-6 border"
                    style={{
                      background: `linear-gradient(135deg, white, ${tokens.colors.backgroundAlt})`,
                      borderColor: `${tokens.colors.primary}/15`,
                      boxShadow: tokens.shadows.md
                    }}
                  >
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: tokens.colors.secondary }}>
                      Estilos que Também Influenciam Você
                    </h3>
                    <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                  </div>
                </AnimatedWrapper>
              </div>

              {/* Imagem principal */}
              <AnimatedWrapper animation="scale" show={true} duration={500} delay={400} className="order-1 lg:order-2">
                <div className="relative max-w-md mx-auto">
                  <div
                    className="relative overflow-hidden rounded-2xl"
                    style={{ boxShadow: tokens.shadows.lg }}
                  >
                    <ProgressiveImage
                      src={`${styleImage}?q=90&f=auto&w=500`}
                      alt={`Estilo ${primaryStyle.category}`}
                      width={500}
                      height={600}
                      className="w-full h-auto transition-all duration-500 hover:scale-105"
                      loading="eager"
                      fetchPriority="high"
                    />

                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
                  </div>

                  {/* Badge flutuante */}
                  <div 
                    className="absolute -top-4 -right-4 text-white px-4 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-lg"
                    style={{
                      background: `linear-gradient(to right, ${tokens.colors.primary}, ${tokens.colors.secondary})`
                    }}
                  >
                    <span>{primaryStyle.category}</span>
                  </div>

                  {/* Decoração de cantos */}
                  <div 
                    className="absolute -bottom-4 -left-4 w-12 h-12 border-b-3 border-l-3 rounded-bl-xl opacity-60"
                    style={{ borderColor: tokens.colors.primary }}
                  ></div>
                </div>
              </AnimatedWrapper>
            </div>

            {/* Guia do estilo */}
            <AnimatedWrapper animation="fade" show={true} duration={400} delay={700}>
              <div className="mt-16 text-center">
                <h3 className="text-2xl lg:text-3xl font-playfair font-bold mb-8" style={{ color: tokens.colors.secondary }}>
                  Seu Guia de Estilo Personalizado
                </h3>
                <div className="relative max-w-3xl mx-auto">
                  <ProgressiveImage
                    src={`${guideImage}?q=90&f=auto&w=900`}
                    alt={`Guia de Estilo ${primaryStyle.category}`}
                    loading="lazy"
                    className="w-full h-auto rounded-xl transition-all duration-500 hover:scale-102"
                    style={{ boxShadow: tokens.shadows.xl }}
                  />

                  {/* Badge exclusivo */}
                  <div 
                    className="absolute -top-3 -right-3 text-white px-3 py-1.5 rounded-full text-xs font-bold transform rotate-12 shadow-md"
                    style={{
                      background: `linear-gradient(to right, ${tokens.colors.primary}, ${tokens.colors.secondary})`
                    }}
                  >
                    EXCLUSIVO
                  </div>
                </div>
              </div>
            </AnimatedWrapper>
          </AnimatedWrapper>
        </Card>
      </section>
    </div>
  );
};
