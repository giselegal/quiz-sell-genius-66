
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ShoppingCart, CheckCircle, ArrowDown, Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import ErrorState from '@/components/result/ErrorState';
import { Button } from '@/components/ui/button';
import { useLoadingState } from '@/hooks/useLoadingState';
import { useIsLowPerformanceDevice } from '@/hooks/use-mobile';
import ResultSkeleton from '@/components/result/ResultSkeleton';
import { trackButtonClick } from '@/utils/analytics';
import BuildInfo from '@/components/BuildInfo';
import SecurePurchaseElement from '@/components/result/SecurePurchaseElement';
import { useAuth } from '@/context/AuthContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import ProgressiveImage from '@/components/ui/progressive-image';

// Seções carregadas via lazy para melhor performance
const BeforeAfterTransformation = lazy(() => import('@/components/result/BeforeAfterTransformation4'));
const MotivationSection = lazy(() => import('@/components/result/MotivationSection'));
const BonusSection = lazy(() => import('@/components/result/BonusSection'));
const Testimonials = lazy(() => import('@/components/quiz-result/sales/Testimonials'));
const GuaranteeSection = lazy(() => import('@/components/result/GuaranteeSection'));
const MentorSection = lazy(() => import('@/components/result/MentorSection'));

const ResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();
  const { user } = useAuth();
  const [imagesLoaded, setImagesLoaded] = useState({ style: false, guide: false });
  const isLowPerformance = useIsLowPerformanceDevice();
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  const { isLoading, completeLoading } = useLoadingState({
    minDuration: isLowPerformance ? 50 : 200, // Reduzido drasticamente
    disableTransitions: isLowPerformance
  });

  useEffect(() => {
    if (!primaryStyle) return;
    window.scrollTo(0, 0);
    
    // Carregamento instantâneo se já pré-carregado
    const hasPreloadedResults = localStorage.getItem('preloadedResults') === 'true';
    if (hasPreloadedResults) {
      setImagesLoaded({ style: true, guide: true });
      completeLoading();
      return;
    }
    
    // Timeout de segurança muito reduzido
    const safetyTimeout = setTimeout(() => {
      setImagesLoaded({ style: true, guide: true });
      completeLoading();
    }, 1000); // Reduzido de 2500ms para 1000ms

    return () => clearTimeout(safetyTimeout);
  }, [primaryStyle, globalStyles.logo, completeLoading]);
  
  useEffect(() => {
    if (imagesLoaded.style && imagesLoaded.guide) completeLoading();
  }, [imagesLoaded, completeLoading]);
  
  if (!primaryStyle) return <ErrorState />;
  if (isLoading) return <ResultSkeleton />;
  
  const { category } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category];
  
  const handleCTAClick = () => {
    trackButtonClick('checkout_button', 'Iniciar Checkout', 'results_page');
    window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundColor: globalStyles.backgroundColor || '#fffaf7',
      color: globalStyles.textColor || '#432818',
      fontFamily: globalStyles.fontFamily || 'inherit'
    }}>
      {/* Background elements otimizados */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#B89B7A]/3 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#aa6b5d]/3 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
      
      <Header primaryStyle={primaryStyle} logoHeight={globalStyles.logoHeight} logo={globalStyles.logo} logoAlt={globalStyles.logoAlt} userName={user?.userName} />

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-4xl relative z-10">
        {/* Card principal otimizado para mobile */}
        <Card className="p-4 sm:p-6 mb-6 sm:mb-10 bg-white shadow-md border border-[#B89B7A]/20 card-elegant">
          <AnimatedWrapper animation="fade" show={true} duration={600} delay={100}>
            <div className="text-center mb-6 sm:mb-8">
              <div className="max-w-sm mx-auto mb-4 sm:mb-6">
                <div className="text-sm text-[#8F7A6A] text-center mb-2">
                  Seu estilo predominante
                </div>
                <Progress 
                  value={primaryStyle.percentage} 
                  className="h-2 sm:h-3 bg-[#F3E8E6] rounded-full overflow-hidden" 
                  indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] transition-all duration-500 ease-in-out"
                />
                <div className="text-right text-sm text-[#8F7A6A] mt-1">
                  {primaryStyle.percentage}%
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="space-y-3 sm:space-y-4 order-2 md:order-1">
                <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={200}>
                  <p className="text-[#432818] leading-relaxed text-sm sm:text-base">{description}</p>
                </AnimatedWrapper>
                <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={300}>
                  <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-[#B89B7A]/10">
                    <h3 className="text-base sm:text-lg font-medium text-[#432818] mb-2">Estilos que Também Influenciam Você</h3>
                    <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                  </div>
                </AnimatedWrapper>
              </div>
              
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'scale'} show={true} duration={500} delay={250} className="order-1 md:order-2">
                <div className="max-w-[180px] sm:max-w-[220px] md:max-w-[260px] mx-auto relative">
                  <ProgressiveImage 
                    src={image} 
                    alt={`Estilo ${category}`} 
                    width={260} 
                    height={325} 
                    className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" 
                    loading="eager" 
                    fetchPriority="high" 
                    onLoad={() => setImagesLoaded(prev => ({ ...prev, style: true }))}
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[#B89B7A]"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[#B89B7A]"></div>
                </div>
              </AnimatedWrapper>
            </div>
            
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={400}>
              <div className="mt-6 sm:mt-8 max-w-[90%] sm:max-w-[480px] md:max-w-[540px] mx-auto relative">
                <ProgressiveImage 
                  src={guideImage} 
                  alt={`Guia de Estilo ${category}`} 
                  loading="lazy" 
                  className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" 
                  onLoad={() => setImagesLoaded(prev => ({ ...prev, guide: true }))} 
                />
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-3 py-1.5 rounded-full shadow-lg text-xs sm:text-sm font-medium transform rotate-12">
                  Exclusivo
                </div>
              </div>
            </AnimatedWrapper>
          </AnimatedWrapper>
        </Card>

        {/* Seções lazy-loaded */}
        <Suspense fallback={<LoadingSpinner size="lg" className="mx-auto py-6" />}>
          <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show duration={400} delay={500}>
            <BeforeAfterTransformation handleCTAClick={handleCTAClick} />
          </AnimatedWrapper>
        </Suspense>

        <Suspense fallback={<div className="h-4" />}>
          <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show duration={400} delay={600}>
            <MotivationSection />
          </AnimatedWrapper>
        </Suspense>

        <Suspense fallback={<div className="h-4" />}>
          <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show duration={400} delay={700}>
            <BonusSection />
          </AnimatedWrapper>
        </Suspense>

        <Suspense fallback={<div className="h-4" />}>
          <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show duration={400} delay={800}>
            <Testimonials />
          </AnimatedWrapper>
        </Suspense>

        <Suspense fallback={<div className="h-4" />}>
          <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show duration={400} delay={900}>
            <GuaranteeSection />
          </AnimatedWrapper>
        </Suspense>

        <Suspense fallback={<div className="h-4" />}>
          <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show duration={400} delay={1000}>
            <MentorSection />
          </AnimatedWrapper>
        </Suspense>

        {/* CTA final otimizado */}
        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show duration={400} delay={1100}>
          <div className="text-center mt-8 sm:mt-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-3 sm:mb-4">
              Vista-se de Você — na Prática
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full mx-auto mb-4 sm:mb-6"></div>
            <p className="text-[#432818] mb-4 sm:mb-6 max-w-xl mx-auto text-sm sm:text-base px-2">
              Agora que você conhece seu estilo, é hora de aplicá-lo com clareza e intenção. 
              O Guia da Gisele Galvão foi criado para mulheres como você.
            </p>

            {/* Oferta compacta para mobile */}
            <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 border border-[#B89B7A]/10">
              <h3 className="text-lg sm:text-xl font-medium text-[#aa6b5d] mb-3 sm:mb-4">
                Guia de Estilo + Bônus Exclusivos
              </h3>
              
              {/* Card de preço compacto */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-[#B89B7A]/20 max-w-sm mx-auto mb-4">
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-[#aa6b5d] uppercase font-medium mb-1">Hoje por Apenas</p>
                  <p className="text-2xl sm:text-3xl font-bold text-[#aa6b5d] mb-2">R$ 39,00</p>
                  <p className="text-xs text-[#432818]/60">ou 4x de R$ 10,86</p>
                  <div className="mt-3 text-xs text-gray-500 line-through">De R$ 175,00</div>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleCTAClick} 
              className="text-white text-sm sm:text-base py-3 sm:py-4 px-6 sm:px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto mb-3"
              style={{
                background: "linear-gradient(to right, #4CAF50, #45a049)",
                boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)"
              }}
              onMouseEnter={() => setIsButtonHovered(true)} 
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <span className="flex items-center justify-center gap-2">
                <ShoppingCart className={`w-4 h-4 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
                <span>Garantir Meu Guia + Bônus</span>
              </span>
            </Button>
            
            <SecurePurchaseElement />

            <p className="text-xs sm:text-sm text-[#aa6b5d] mt-2 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Oferta exclusiva nesta página</span>
            </p>
          </div>
        </AnimatedWrapper>
      </div>

      <BuildInfo />
    </div>
  );
};

export default ResultPage;
