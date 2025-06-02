import React, { Suspense, lazy } from 'react';
import { BlockData } from '@/types/resultPageConfig';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ShoppingCart, CheckCircle, Star, Gift, Shield, Award } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import ProgressiveImage from '@/components/ui/progressive-image';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';

// Lazy load components
const BeforeAfterTransformation = lazy(() => import('@/components/result/BeforeAfterTransformation'));
const MotivationSection = lazy(() => import('@/components/result/MotivationSection'));
const BonusSection = lazy(() => import('@/components/result/BonusSection'));
const Testimonials = lazy(() => import('@/components/quiz-result/sales/Testimonials'));
const GuaranteeSection = lazy(() => import('@/components/result/GuaranteeSection'));
const MentorSection = lazy(() => import('@/components/result/MentorSection'));

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
}

// Componente de título padronizado
const SectionTitle: React.FC<{
  children: React.ReactNode;
  subtitle?: string;
  size?: 'lg' | 'xl';
  className?: string;
  variant?: 'primary' | 'secondary' | 'simple';
}> = ({ children, subtitle, size = 'xl', className = '', variant = 'simple' }) => (
  <AnimatedWrapper 
    className={`text-center mb-12 ${className}`}
    animation="fade"
    show={true}
    duration={600}
  >
    {variant === 'primary' && (
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
        <div className="w-2 h-2 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full shadow-sm"></div>
        <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
      </div>
    )}
    
    <h2 className={`font-playfair font-bold leading-tight ${
      variant === 'primary' 
        ? 'text-[#432818] mb-4 bg-gradient-to-r from-[#432818] via-[#aa6b5d] to-[#432818] bg-clip-text text-transparent'
        : variant === 'secondary'
        ? 'text-[#432818] mb-4'
        : 'text-[#432818] mb-4'
    } ${
      size === 'xl' ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-2xl md:text-3xl lg:text-4xl'
    }`}>
      {children}
    </h2>
    
    {subtitle && (
      <p className="text-lg md:text-xl text-[#8F7A6A] leading-relaxed max-w-3xl mx-auto mb-6">
        {subtitle}
      </p>
    )}
    
    {variant === 'primary' && (
      <div className="w-20 h-1 bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] rounded-full mx-auto shadow-sm"></div>
    )}
  </AnimatedWrapper>
);

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
  tokens 
}) => {
  const renderBlockContent = () => {
    switch (block.type) {
      case 'hero':
        return (
          <section id="primary-style" className="scroll-mt-20">
            <Card className="p-6 lg:p-8 mb-12 bg-white border border-[#B89B7A]/20 rounded-xl overflow-hidden relative" 
                  style={{ boxShadow: tokens?.shadows?.lg }}>
              <div className="absolute top-0 left-0 w-12 lg:w-16 h-12 lg:h-16 border-t-2 border-l-2 border-[#B89B7A]/30 rounded-tl-xl"></div>
              <div className="absolute bottom-0 right-0 w-12 lg:w-16 h-12 lg:h-16 border-b-2 border-r-2 border-[#B89B7A]/30 rounded-br-xl"></div>
              
              <AnimatedWrapper animation="fade" show={true} duration={600} delay={300}>
                <div className="text-center mb-8">
                  {user?.userName && (
                    <AnimatedWrapper className="mb-6" animation="scale" show={true} duration={500} delay={200}>
                      <span className="text-xl lg:text-2xl text-[#aa6b5d] font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                        Parabéns, {user.userName}!
                      </span>
                      <div className="w-12 h-px bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] mx-auto mt-2"></div>
                    </AnimatedWrapper>
                  )}
                  
                  <h1 className="text-xl lg:text-3xl font-playfair text-[#432818] mb-6 leading-tight">
                    {resultPageConfig?.heroSection?.title || "Descobrimos Seu Estilo Predominante:"}
                    <br />
                    <span className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                      {primaryStyle?.category}
                    </span>
                  </h1>
                  
                  <div className="max-w-md mx-auto mb-6">
                    <div className="flex items-center justify-end text-sm text-[#8F7A6A] mb-2">
                      <span className="font-medium">{primaryStyle?.percentage}%</span>
                    </div>
                    <Progress 
                      value={primaryStyle?.percentage} 
                      className="h-2 bg-[#F5F2EC] rounded-full overflow-hidden" 
                      indicatorClassName="bg-gradient-to-r from-[#B89B7A] via-[#D4B79F] to-[#A1835D] transition-all duration-700 ease-in-out"
                      style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}
                    />
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="space-y-6 order-2 lg:order-1">
                    <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={400}>
                      <div className="space-y-4">
                        <p className="text-[#432818] leading-relaxed text-base lg:text-lg font-medium">
                          <strong>Agora você tem clareza total</strong> sobre quem você é e como expressar sua personalidade através do seu estilo!
                        </p>
                        
                        <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-lg p-4 border border-[#B89B7A]/10"
                             style={{ boxShadow: tokens?.shadows?.sm }}>
                          <p className="text-[#432818] text-sm lg:text-base leading-relaxed">
                            <strong>Seu estilo {primaryStyle?.category}</strong> revela uma mulher que {
                              primaryStyle?.category === 'Natural' ? 'valoriza autenticidade e conforto, sem abrir mão da elegância natural' :
                              primaryStyle?.category === 'Clássico' ? 'aprecia sofisticação atemporal e peças que nunca saem de moda' :
                              primaryStyle?.category === 'Contemporâneo' ? 'está sempre em sintonia com as tendências, mas de forma equilibrada' :
                              primaryStyle?.category === 'Elegante' ? 'irradia refinamento e classe em cada detalhe do seu visual' :
                              primaryStyle?.category === 'Romântico' ? 'expressa delicadeza e feminilidade através de looks encantadores' :
                              primaryStyle?.category === 'Sexy' ? 'tem confiança para valorizar sua sensualidade de forma elegante' :
                              primaryStyle?.category === 'Dramático' ? 'não tem medo de fazer declarações ousadas com seu estilo' :
                              'expressa criatividade e originalidade em cada combinação de roupas'
                            }.
                          </p>
                        </div>
                        
                        <p className="text-sm lg:text-base" style={{ color: tokens?.colors?.textMuted }}>
                          <strong>Chega de ficar perdida no guarda-roupa ou comprar peças que não combinam com você!</strong>
                        </p>
                      </div>
                    </AnimatedWrapper>

                    {secondaryStyles && secondaryStyles.length > 0 && (
                      <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={600}>
                        <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-lg p-5 border border-[#B89B7A]/10"
                             style={{ boxShadow: tokens?.shadows?.sm }}>
                          <h3 className="text-lg font-medium text-[#aa6b5d] mb-3">Estilos que Também Influenciam Você</h3>
                          <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                        </div>
                      </AnimatedWrapper>
                    )}
                  </div>

                  <AnimatedWrapper animation={isLowPerformance ? 'none' : 'scale'} show={true} duration={500} delay={500} className="order-1 lg:order-2">
                    <div className="w-full max-w-xs lg:max-w-sm mx-auto relative"> 
                      {primaryStyle?.category && (
                        <ProgressiveImage 
                          src={`${getStyleImage(primaryStyle.category)}?q=85&f=auto&w=400`} 
                          alt={`Estilo ${primaryStyle.category}`} 
                          width={400} 
                          height={500} 
                          className="w-full h-auto rounded-lg transition-transform duration-300 hover:scale-105" 
                          style={{ boxShadow: tokens?.shadows?.md }}
                          loading="eager" 
                          fetchPriority="high" 
                          onLoad={() => setImagesLoaded && setImagesLoaded(prev => ({ ...prev, style: true }))}
                        />
                      )}
                      
                      <div className="absolute -top-2 -right-2 w-8 lg:w-10 h-8 lg:h-10 border-t-2 border-r-2 border-[#B89B7A] rounded-tr-lg"></div>
                      <div className="absolute -bottom-2 -left-2 w-8 lg:w-10 h-8 lg:h-10 border-b-2 border-l-2 border-[#B89B7A] rounded-bl-lg"></div>
                      
                      <div className="absolute -top-3 -left-3 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium transform -rotate-12"
                           style={{ boxShadow: tokens?.shadows?.sm }}>
                        {primaryStyle?.category}
                      </div>
                    </div>
                  </AnimatedWrapper>
                </div>
                
                {primaryStyle?.category && (
                  <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={800}>
                    <div className="mt-12 max-w-2xl mx-auto relative">
                      <h3 className="text-xl lg:text-2xl font-medium text-center text-[#aa6b5d] mb-6">
                        Seu Guia de Estilo Personalizado
                      </h3>
                      <ProgressiveImage 
                        src={`${getGuideImage(primaryStyle.category)}?q=85&f=auto&w=800`} 
                        alt={`Guia de Estilo ${primaryStyle.category}`} 
                        loading="lazy" 
                        className="w-full h-auto rounded-lg transition-transform duration-300 hover:scale-102" 
                        style={{ boxShadow: tokens?.shadows?.lg }}
                        onLoad={() => setImagesLoaded && setImagesLoaded(prev => ({ ...prev, guide: true }))} 
                      />
                      
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-3 py-1 rounded-full text-xs font-medium transform rotate-12"
                           style={{ boxShadow: tokens?.shadows?.sm }}>
                        Exclusivo
                      </div>
                    </div>
                  </AnimatedWrapper>
                )}
              </AnimatedWrapper>
            </Card>
          </section>
        );

      case 'text':
        return (
          <div className="mb-8">
            <div 
              className="prose prose-lg max-w-none"
              style={{ color: block.style?.color || tokens?.colors?.text }}
              dangerouslySetInnerHTML={{ __html: block.content.text || 'Texto personalizado aqui...' }}
            />
          </div>
        );

      case 'image':
        return (
          <div className="mb-8 text-center">
            {block.content.imageUrl && (
              <ProgressiveImage
                src={block.content.imageUrl}
                alt={block.content.alt || 'Imagem'}
                className="w-full h-auto rounded-lg"
                style={{ maxWidth: block.style?.maxWidth || '100%' }}
              />
            )}
            {block.content.caption && (
              <p className="text-sm text-gray-600 mt-2">{block.content.caption}</p>
            )}
          </div>
        );

      case 'cta':
        return (
          <div className="mb-8 text-center">
            <Button
              onClick={onCTAClick}
              className="text-white px-8 py-4 rounded-md shadow-md transition-all duration-300"
              style={{
                background: block.style?.backgroundColor || 'linear-gradient(90deg, #4CAF50 0%, #43a047 100%)',
                fontSize: block.style?.fontSize || '16px',
                transform: isButtonHovered ? 'translateY(-2px)' : 'translateY(0)',
              }}
              onMouseEnter={() => setIsButtonHovered && setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered && setIsButtonHovered(false)}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {block.content.text || 'Adquirir Agora'}
            </Button>
          </div>
        );

      case 'transformations':
        return (
          <section id="transformations" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
            <SectionTitle 
              variant="simple"
              subtitle="Veja como mulheres descobriram sua melhor versão seguindo as mesmas estratégias que você vai receber"
            >
              Resultados que Falam por Si
            </SectionTitle>
            <Suspense fallback={
              <div className="py-10 flex flex-col items-center justify-center">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A]">Carregando transformações...</p>
              </div>
            }>
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
                <BeforeAfterTransformation />
              </AnimatedWrapper>
            </Suspense>
          </section>
        );

      case 'motivation':
        return (
          <section id="motivation" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
            <SectionTitle 
              variant="secondary"
              subtitle="Conhecer seu estilo pessoal é muito mais do que seguir tendências passageiras — é uma ferramenta poderosa de comunicação não-verbal e autoconfiança."
            >
              Por que Aplicar o seu Estilo é tão importante?
            </SectionTitle>
            <Suspense fallback={
              <div className="py-10 flex flex-col items-center justify-center">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A]">Carregando conteúdo...</p>
              </div>
            }>
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
                <MotivationSection />
              </AnimatedWrapper>
            </Suspense>
          </section>
        );

      case 'bonuses':
        return (
          <section id="bonuses" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
            <Suspense fallback={
              <div className="py-10 flex flex-col items-center justify-center">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A]">Carregando bônus...</p>
              </div>
            }>
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
                <BonusSection />
              </AnimatedWrapper>
            </Suspense>
          </section>
        );

      case 'testimonials':
        return (
          <section id="testimonials" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
            <Suspense fallback={
              <div className="py-10 flex flex-col items-center justify-center">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A]">Carregando depoimentos...</p>
              </div>
            }>
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
                <Testimonials />
              </AnimatedWrapper>
            </Suspense>
          </section>
        );

      case 'guarantee':
        return (
          <section id="guarantee" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
            <Suspense fallback={
              <div className="py-10 flex flex-col items-center justify-center">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A]">Carregando garantia...</p>
              </div>
            }>
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
                <GuaranteeSection />
              </AnimatedWrapper>
            </Suspense>
          </section>
        );

      case 'mentor':
        return (
          <section id="mentor" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
            <SectionTitle 
              variant="simple"
              subtitle="Especialista que já guiou +de 3.000 mulheres na descoberta do seu estilo autêntico"
            >
              Conheça Sua Mentora
            </SectionTitle>
            <Suspense fallback={
              <div className="py-10 flex flex-col items-center justify-center">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A]">Carregando informações da mentora...</p>
              </div>
            }>
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
                <MentorSection />
              </AnimatedWrapper>
            </Suspense>
          </section>
        );

      case 'pricing':
        return (
          <section id="cta" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20 bg-white rounded-xl p-6 lg:p-12 border border-[#B89B7A]/20 text-center relative overflow-hidden"
                   style={{ boxShadow: tokens?.shadows?.xl }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#fff7f3]/30 to-[#f9f4ef]/30 pointer-events-none"></div>
            
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={600} delay={300}>
              <div className="relative z-10 mb-12">
                <div className="inline-flex items-center gap-4 mb-6">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                  <div className="w-4 h-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full animate-pulse"
                       style={{ boxShadow: tokens?.shadows?.sm }}></div>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                </div>
                
                <h2 className="text-4xl lg:text-6xl font-playfair font-bold text-[#432818] mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-[#432818] via-[#aa6b5d] to-[#432818] bg-clip-text text-transparent">
                    Desperte Sua Confiança
                  </span>
                  <br />
                  <span className="text-[#aa6b5d]">Com Seu Estilo Único!</span>
                </h2>
                
                <p className="text-xl mb-8" style={{ color: tokens?.colors?.textMuted }}>
                  Guia {primaryStyle?.category} Personalizado + Bônus exclusivos
                </p>
              </div>

              {/* Pricing content with products preview */}
              <div className="mb-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-10">
                  {renderProductCards(primaryStyle?.category, tokens)}
                </div>
              </div>

              {/* Price summary */}
              <div className="max-w-sm mx-auto space-y-4 sm:space-y-6 bg-gradient-to-br from-[#fff7f3] to-[#f9f4ef] p-6 sm:p-8 rounded-xl border border-[#B89B7A]/20 mt-10 mb-10"
                   style={{ boxShadow: tokens?.shadows?.sm }}>
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-double border-[#B89B7A]/30 bg-white/80 backdrop-blur-md px-4 py-8 sm:px-10 sm:py-10 flex flex-col items-center gap-4 sm:gap-5"
                  style={{
                    boxShadow: '0 8px 32px 0 rgba(184,155,122,0.18), 0 1.5px 0 0 #fff inset',
                    background: 'linear-gradient(135deg,rgba(255,255,255,0.85) 60%,rgba(184,155,122,0.10) 100%)',
                    border: '4px double #B89B7A',
                    borderRadius: tokens?.radius?.xl,
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <p className="text-base sm:text-lg font-semibold text-[#8F7A6A] mb-2 sm:mb-2.5 tracking-wide">
                    De <span className="font-bold text-[#B89B7A] text-lg sm:text-xl line-through">R$ 175,00</span> por apenas:
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent drop-shadow-lg mt-1 sm:mt-2">
                    R$ 39,90
                  </p>
                  <p className="text-[11px] sm:text-[11px] text-[#2d7d32] font-medium mt-2 sm:mt-2.5">
                    Economia de R$ 135,10 (77% OFF)
                  </p>
                  <p className="flex items-center justify-center gap-2 text-[#8F7A6A] text-xs sm:text-sm mt-2 sm:mt-3">
                    <span className="w-5 h-5 sm:w-6 sm:h-6">⏰</span>
                    Esta oferta expira quando você sair desta página
                  </p>
                </div>
              </div>
            </AnimatedWrapper>
          </section>
        );

      default:
        return (
          <div className="mb-8 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <p className="text-gray-600">Tipo de bloco não reconhecido: {block.type}</p>
            <p className="text-sm text-gray-500 mt-2">Conteúdo: {JSON.stringify(block.content)}</p>
          </div>
        );
    }
  };

  return (
    <div className="block-renderer">
      {renderBlockContent()}
    </div>
  );
};

// Helper functions
const getStyleImage = (category: string) => {
  const styleImages = {
    'Natural': 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745071344/GUIA_NATURAL_fzp6fc.webp',
    'Clássico': 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp',
    'Contemporâneo': 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp',
    'Elegante': 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745071342/GUIA_ELEGANTE_asez1q.webp',
    'Romântico': 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp',
    'Sexy': 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745071349/GUIA_SEXY_t5x2ov.webp',
    'Dramático': 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp',
    'Criativo': 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745071342/GUIA_CRIATIVO_ntbzph.webp'
  };
  return styleImages[category as keyof typeof styleImages] || styleImages['Natural'];
};

const getGuideImage = (category: string) => {
  // Use the same images for guide, or create separate ones if needed
  return getStyleImage(category);
};

const renderProductCards = (category: string, tokens: any) => {
  return [
    {
      src: getStyleImage(category),
      title: `Manual de Estilo ${category}`,
      subtitle: 'Descubra combinações infalíveis de cores, tecidos e acessórios que valorizam sua personalidade única, transformando seu guarda-roupa em uma poderosa ferramenta de comunicação visual e autoexpressão.',
      badge: 'GUIA COMPLETO',
      priority: true
    },
    {
      src: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1744911677/Cópia_de_MOCKUPS_15_-_Copia_grstwl.png',
      title: 'Guia das Peças Estratégicas',
      subtitle: 'Peças-chave cuidadosamente selecionadas que maximizam combinações, economizam dinheiro e garantem versatilidade em qualquer situação do seu dia a dia.',
      badge: 'BÔNUS EXCLUSIVO',
      priority: false
    },
    {
      src: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1744911666/Cópia_de_Template_Dossiê_Completo_2024_15_-_Copia_ssrhu3.png',
      title: 'Manual de Visagismo',
      subtitle: 'Descubra os cortes de cabelo, acessórios ideais para seu tipo facial, realçando sua beleza natural com dicas profissionais de visagismo aplicado.',
      badge: 'BÔNUS PREMIUM',
      priority: false
    }
  ].map((product, index) => (
    <div key={index} className={`bg-gradient-to-br from-white to-[#fff7f3] rounded-xl p-5 lg:p-6 border border-[#B89B7A]/15 transition-all duration-300 hover:scale-105 hover:shadow-lg relative ${index === 2 ? 'md:col-span-2 xl:col-span-1' : ''}`}
         style={{ boxShadow: tokens?.shadows?.md }}>
      
      <div className="absolute -top-3 -right-3 z-10">
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full text-white shadow-md ${index === 0 ? 'bg-gradient-to-r from-[#aa6b5d] to-[#B89B7A]' : 'bg-gradient-to-r from-[#aa6b5d] to-[#B89B7A]'}`}>
          {product.badge}
        </span>
      </div>

      <div className="w-full bg-white rounded-lg mb-5 flex items-center justify-center relative overflow-hidden"
           style={{ 
             boxShadow: tokens?.shadows?.sm,
             height: 'auto',
             aspectRatio: index === 0 ? '4.6/5' : index === 1 ? '6/3.5' : index === 2 ? '3/4.5' : '3/4'
           }}
      >
        <ProgressiveImage 
          src={`${product.src}?q=85&f=auto&w=800`}
          alt={product.title}
          className="w-full h-full object-contain rounded-lg transition-transform duration-300 hover:scale-105"
          loading={product.priority ? "eager" : "lazy"}
          fetchPriority={product.priority ? "high" : "low"}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#B89B7A]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
      </div>

      <div className="text-left min-h-[140px] flex flex-col">
        <h4 className="font-bold text-[#432818] text-base lg:text-lg mb-3 leading-tight line-height-1.2">
          {product.title}
        </h4>
        <p className="text-sm lg:text-base flex-1 leading-relaxed line-height-1.4" style={{ color: tokens?.colors?.textMuted }}>
          {product.subtitle}
        </p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-[#B89B7A]/15">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: tokens?.colors?.textMuted }}>
            {index === 0 ? 'Guia Completo' : index === 1 ? 'Guia Bônus' : 'Manual Premium'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-[#B89B7A] line-through">
              {index === 0 ? 'R$ 77,00' : index === 1 ? 'R$ 59,00' : 'R$ 39,00'}
            </span>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default BlockRenderer;
