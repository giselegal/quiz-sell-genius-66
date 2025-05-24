// ✅ TESTE - Arquivo ResultPage atualizado - 23/05/2025
import React, { useEffect, useState, Suspense, lazy, useCallback } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { styleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ShoppingCart, CheckCircle, ArrowDown, Clock, ChevronLeft, ChevronRight, Shield, Award, Hourglass } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import ErrorState from '@/components/result/ErrorState';
import { Button } from '@/components/ui/button';
import { useLoadingState } from '@/hooks/useLoadingState';
import { useIsLowPerformanceDevice } from '@/hooks/use-mobile';
import ResultSkeleton from '@/components/result/ResultSkeleton';
import { trackButtonClick } from '@/utils/analytics';
import { useAuth } from '@/context/AuthContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import ProgressiveImage from '@/components/ui/progressive-image';

// Fallback components para lazy loading
const TransformationFallback = React.memo(() => (
  <div className="text-center py-8">
    <p className="text-gray-600">Seção de transformações em desenvolvimento</p>
  </div>
));

const MotivationFallback = React.memo(() => (
  <div className="text-center py-8">
    <p className="text-gray-600">Seção de motivação em desenvolvimento</p>
  </div>
));

const BonusFallback = React.memo(() => (
  <div className="text-center py-8">
    <p className="text-gray-600">Seção de bônus em desenvolvimento</p>
  </div>
));

const TestimonialsFallback = React.memo(() => (
  <div className="text-center py-8">
    <p className="text-gray-600">Depoimentos em desenvolvimento</p>
  </div>
));

const GuaranteeFallback = React.memo(() => (
  <div className="text-center py-8">
    <p className="text-gray-600">Seção de garantia em desenvolvimento</p>
  </div>
));

const MentorFallback = React.memo(() => (
  <div className="text-center py-8">
    <p className="text-gray-600">Seção da mentora em desenvolvimento</p>
  </div>
));

// Lazy loading com fallback seguro
const BeforeAfterTransformation = lazy(() => 
  import('@/components/result/BeforeAfterTransformation4').catch(() => ({
    default: TransformationFallback
  }))
);

const MotivationSection = lazy(() =>
  import('@/components/result/MotivationSection').catch(() => ({
    default: MotivationFallback
  }))
);

const BonusSection = lazy(() =>
  import('@/components/result/BonusSection').catch(() => ({
    default: BonusFallback
  }))
);

const Testimonials = lazy(() =>
  import('@/components/quiz-result/sales/Testimonials').catch(() => ({
    default: TestimonialsFallback
  }))
);

const GuaranteeSection = lazy(() =>
  import('@/components/result/GuaranteeSection').catch(() => ({
    default: GuaranteeFallback
  }))
);

const MentorSection = lazy(() =>
  import('@/components/result/MentorSection').catch(() => ({
    default: MentorFallback
  }))
);

// Design tokens - SISTEMA PADRONIZADO
const tokens = {
  colors: {
    primary: '#B89B7A',
    primaryDark: '#A1835D',
    primaryLight: '#D4B79F',
    secondary: '#aa6b5d',
    secondaryDark: '#8F5A4D',
    secondaryLight: '#C28A7D',
    background: '#fffaf7',
    backgroundAlt: '#f9f4ef',
    text: '#432818',
    textLight: '#8F7A6A',
    textMuted: '#6B5B4E',
    success: '#4CAF50',
    successDark: '#45a049',
    border: 'rgba(184, 155, 122, 0.2)',
    borderLight: 'rgba(184, 155, 122, 0.1)',
  },
  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
  },
  shadows: {
    sm: '0 2px 4px rgba(184, 155, 122, 0.08)',
    md: '0 4px 8px rgba(184, 155, 122, 0.12)',
    lg: '0 8px 16px rgba(184, 155, 122, 0.16)',
    xl: '0 12px 24px rgba(184, 155, 122, 0.20)',
    cta: '0 8px 32px rgba(184, 155, 122, 0.4)',
  },
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
};

// Componente de título padronizado - SIMPLIFICADO
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
    {/* Decoração superior - APENAS para títulos principais */}
    {variant === 'primary' && (
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
        <div className="w-2 h-2 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full shadow-sm"></div>
        <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
      </div>
    )}
    
    {/* Título principal - estilos diferenciados */}
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
    
    {/* Subtítulo opcional */}
    {subtitle && (
      <p className="text-lg md:text-xl text-[#8F7A6A] leading-relaxed max-w-3xl mx-auto mb-6">
        {subtitle}
      </p>
    )}
    
    {/* Linha decorativa inferior - APENAS para título principal */}
    {variant === 'primary' && (
      <div className="w-20 h-1 bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] rounded-full mx-auto shadow-sm"></div>
    )}
  </AnimatedWrapper>
);

const ResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();
  const { user } = useAuth();
  const [imagesLoaded, setImagesLoaded] = useState({
    style: false,
    guide: false
  });
  const isLowPerformance = useIsLowPerformanceDevice();
  const { isLoading, completeLoading } = useLoadingState({
    minDuration: isLowPerformance ? 100 : 300,
    disableTransitions: isLowPerformance
  });

  // Button hover state
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  // Scroll tracking for sticky header and bottom bar
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(false);
  
  // Active section tracking
  const [activeSection, setActiveSection] = useState('primary-style');
  
  // Temporizador de contagem regressiva
  const [timer, setTimer] = useState({
    hours: 2,
    minutes: 59,
    seconds: 59
  });
  
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer.seconds > 0) {
          return { ...prevTimer, seconds: prevTimer.seconds - 1 };
        } else if (prevTimer.minutes > 0) {
          return { ...prevTimer, minutes: prevTimer.minutes - 1, seconds: 59 };
        } else if (prevTimer.hours > 0) {
          return { hours: prevTimer.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    
    return () => clearInterval(countdownInterval);
  }, []);
  
  useEffect(() => {
    if (!primaryStyle) return;
    window.scrollTo(0, 0);
    
    const hasPreloadedResults = localStorage.getItem('preloadedResults') === 'true';
    
    if (hasPreloadedResults) {
      setImagesLoaded({ style: true, guide: true });
      completeLoading();
      return;
    } 
    
    const safetyTimeout = setTimeout(() => {
      setImagesLoaded({ style: true, guide: true });
      completeLoading();
    }, 2500);

    return () => clearTimeout(safetyTimeout);
  }, [primaryStyle, globalStyles.logo, completeLoading]);
  
  useEffect(() => {
    if (imagesLoaded.style && imagesLoaded.guide) completeLoading();
  }, [imagesLoaded, completeLoading]);
  
  // Scroll tracking effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrolledToBottom = scrollTop + windowHeight >= documentHeight - 800; // Show 800px before end
      setShowBottomBar(scrolledToBottom);
      
      // Track active section
      const sections = [
        'primary-style', 'transformations', 'motivation', 'bonuses',
        'testimonials', 'guarantee', 'mentor', 'cta'
      ];
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element?.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); 
  }, []);
  
  // Verificações de segurança
  if (!primaryStyle) {
    return <ErrorState />;
  }

  if (isLoading) {
    return <ResultSkeleton />;
  }
  
  const { category } = primaryStyle;
  
  // Verificação de segurança para styleConfig
  const styleData = styleConfig[category];
  if (!styleData) {
    console.error(`Style config not found for category: ${category}`);
    return <ErrorState />;
  }
  
  const { image, guideImage, description } = styleData;

  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.ctaClickProcessing) return;
    window.ctaClickProcessing = true;
    
    trackButtonClick('checkout_button', 'Iniciar Checkout', 'results_page');
    
    if (window.innerWidth >= 768) {
      window.open('https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912', '_blank');
    } else {
      window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
    }
    
    setTimeout(() => {
      window.ctaClickProcessing = false;
    }, 1000);
  };
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundColor: globalStyles?.backgroundColor || tokens.colors.background,
      color: globalStyles?.textColor || tokens.colors.text,
      fontFamily: globalStyles?.fontFamily || 'inherit'
    }}>
      {/* Custom scrollbar styles */}
      <style dangerouslySetInnerHTML={{
        __html: `::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #B89B7A, #aa6b5d);
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #aa6b5d, #B89B7A);
          }
        `
      }} />

      {/* Header - Verificação de segurança simplificada */}
      <header className="py-4 px-6 sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl flex justify-center">
          {globalStyles?.logo ? (
            <img
              src={globalStyles.logo}
              alt={globalStyles.logoAlt || "Logo"}
              style={{ height: globalStyles.logoHeight || '60px' }}
              className="h-auto object-contain"
              onError={(e) => {
                console.error('Logo failed to load');
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="h-[60px] flex items-center">
              <span className="text-xl font-bold text-[#B89B7A]">Quiz de Estilo</span>
            </div>
          )}
        </div>
      </header>

      {/* Navigation dots (only visible on scroll) */}
      <div className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-50 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col gap-2">
          {[{ id: 'primary-style', label: 'Seu Estilo' },
            { id: 'transformations', label: 'Transformações' },
            { id: 'motivation', label: 'Motivação' },
            { id: 'bonuses', label: 'Bônus' },
            { id: 'testimonials', label: 'Depoimentos' },
            { id: 'guarantee', label: 'Garantia' },
            { id: 'mentor', label: 'Mentor' },
            { id: 'cta', label: 'Adquirir' }
          ].map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === section.id ? 'bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] scale-125 shadow-sm' : 'bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Ir para seção ${section.label}`}
              title={section.label}
            />
          ))}
        </div>
      </div>

      {/* Sticky CTA - COR DA MARCA */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-[#B89B7A]/20 py-3 px-4 z-40 transition-transform duration-500 ${showBottomBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-[#432818]">Guia de Estilo e Imagem + Bônus</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span className="text-xs text-[#8F7A6A] whitespace-nowrap">5x de</span>
              <span className="text-xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent whitespace-nowrap">R$ 8,83</span>
              <span className="text-xs font-normal text-[#8F7A6A] whitespace-nowrap">ou R$ 39,90 à vista</span>
            </div>
          </div>
          <Button 
            className="text-white text-sm sm:text-base leading-none py-3 px-6 rounded-md shadow-md transition-all duration-300 w-full sm:w-auto cursor-pointer"
            onClick={handleCTAClick}
            style={{
              background: `linear-gradient(to right, ${tokens.colors.primary}, ${tokens.colors.secondary})`,
              transform: isButtonHovered ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: '0 4px 14px rgba(184, 155, 122, 0.4)',
            }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            type="button"
          >
            <span className="flex items-center justify-center gap-2">
              <ShoppingCart className={`w-4 h-4 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
              Adquirir Agora
            </span>
          </Button>
        </div>
      </div>

      {/* CONTAINER PRINCIPAL - SPACING OTIMIZADO */}
      <div className="container mx-auto px-6 lg:px-8 py-8 max-w-4xl relative z-10">
        {/* Primary Style Card - Simplificado */}
        <section id="primary-style" className="scroll-mt-20">
          <Card className="p-6 lg:p-8 mb-12 bg-white border border-[#B89B7A]/20 rounded-xl overflow-hidden relative" 
                style={{ boxShadow: tokens.shadows.lg }}>
            {/* HEADER SECTION - Simplificado */}
            <div className="text-center mb-8">
              {user?.userName && (
                <div className="mb-6">
                  <span className="text-xl lg:text-2xl text-[#aa6b5d] font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                    Parabéns, {user.userName}!
                  </span>
                  <div className="w-12 h-px bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] mx-auto mt-2"></div>
                </div>
              )}
              <h1 className="text-xl lg:text-3xl font-playfair text-[#432818] mb-6 leading-tight">
                Descobrimos Seu Estilo Predominante:
                <br />
                <span className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                  {category}
                </span>
              </h1>
              <div className="max-w-md mx-auto mb-6">
                <div className="flex items-center justify-end text-sm text-[#8F7A6A] mb-2">
                  <span className="font-medium">{primaryStyle.percentage}%</span>
                </div>
                <Progress 
                  value={primaryStyle.percentage} 
                  className="h-2 bg-[#F5F2EC] rounded-full overflow-hidden"
                  indicatorClassName="bg-gradient-to-r from-[#B89B7A] via-[#D4B79F] to-[#A1835D] transition-all duration-700 ease-in-out"
                  style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}
                /> 
              </div>
            </div>

            {/* MAIN CONTENT GRID - Simplificado */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <div className="space-y-4">
                  <p className="text-[#432818] leading-relaxed text-base lg:text-lg font-medium">
                    <strong>Agora você tem clareza total</strong> sobre quem você é e como expressar sua personalidade através do seu estilo!
                  </p>
                  <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-lg p-4 border border-[#B89B7A]/10"
                       style={{ boxShadow: tokens.shadows.sm }}>
                    <p className="text-[#432818] text-sm lg:text-base leading-relaxed">
                      <strong>Seu estilo {category}</strong> revela uma mulher que {
                        category === 'Natural' ? 'valoriza autenticidade e conforto, sem abrir mão da elegância natural' :
                        category === 'Clássico' ? 'aprecia sofisticação atemporal e peças que nunca saem de moda' :
                        category === 'Contemporâneo' ? 'está sempre em sintonia com as tendências, mas de forma equilibrada' :
                        category === 'Elegante' ? 'irradia refinamento e classe em cada detalhe do seu visual' :
                        category === 'Romântico' ? 'expressa delicadeza e feminilidade através de looks encantadores' :
                        category === 'Sexy' ? 'tem confiança para valorizar sua sensualidade de forma elegante' :
                        category === 'Dramático' ? 'não tem medo de fazer declarações ousadas com seu estilo' :
                        'expressa criatividade e originalidade em cada combinação de roupas'
                      }.
                    </p>
                  </div>
                </div>

                {/* SECONDARY STYLES - Simplificado */}
                <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-lg p-5 border border-[#B89B7A]/10"
                     style={{ boxShadow: tokens.shadows.sm }}>
                  <h3 className="text-lg font-medium text-[#aa6b5d] mb-3">Estilos que Também Influenciam Você</h3>
                  {secondaryStyles && secondaryStyles.length > 0 ? (
                    <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                  ) : (
                    <p className="text-sm text-gray-600">Carregando estilos secundários...</p>
                  )}
                </div>
              </div>

              {/* IMAGE SECTION - Simplificado */}
              <div className="order-1 lg:order-2">
                <div className="w-full max-w-xs lg:max-w-sm mx-auto relative"> 
                  {image ? (
                    <img 
                      src={`${image}?q=85&f=auto&w=400`} 
                      alt={`Estilo ${category}`} 
                      className="w-full h-auto rounded-lg transition-transform duration-300 hover:scale-105" 
                      style={{ boxShadow: tokens.shadows.md }}
                      onLoad={() => setImagesLoaded(prev => ({ ...prev, style: true }))}
                      onError={(e) => {
                        console.error('Style image failed to load');
                        setImagesLoaded(prev => ({ ...prev, style: true }));
                      }}
                    />
                  ) : (
                    <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">Imagem não disponível</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* GUIDE IMAGE - Simplificado */}
            <div className="mt-12 max-w-2xl mx-auto relative">
              <h3 className="text-xl lg:text-2xl font-medium text-center text-[#aa6b5d] mb-6">
                Seu Guia de Estilo Personalizado
              </h3>
              {guideImage ? (
                <img 
                  src={`${guideImage}?q=85&f=auto&w=800`} 
                  alt={`Guia de Estilo ${category}`} 
                  className="w-full h-auto rounded-lg transition-transform duration-300 hover:scale-102" 
                  style={{ boxShadow: tokens.shadows.lg }}
                  onLoad={() => setImagesLoaded(prev => ({ ...prev, guide: true }))}
                  onError={(e) => {
                    console.error('Guide image failed to load');
                    setImagesLoaded(prev => ({ ...prev, guide: true }));
                  }}
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-600">Guia não disponível</p>
                </div>
              )}
            </div>
          </Card>
        </section>

        {/* Seções com Suspense simplificado */}
        <section id="transformations" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          <SectionTitle 
            variant="simple"
            subtitle="Veja como mulheres descobriram sua melhor versão seguindo as mesmas estratégias que você vai receber"
          >
            Antes e Depois: Estilo {category} na Prática
          </SectionTitle>
          <Suspense fallback={
            <div className="py-12 flex flex-col items-center justify-center bg-white rounded-xl border border-[#B89B7A]/20">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-[#8F7A6A]">Carregando transformações...</p>
            </div>
          }>
            <BeforeAfterTransformation />
          </Suspense>
        </section>

        <section id="motivation" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          <SectionTitle 
            variant="secondary"
            subtitle={`Por que mulheres com seu perfil ${category} conquistam mais confiança e oportunidades`}
          >
            A Ciência Por Trás do Seu Estilo {category}
          </SectionTitle>
          <Suspense fallback={
            <div className="py-12 flex flex-col items-center justify-center bg-white rounded-xl border border-[#B89B7A]/20">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-[#8F7A6A]">Carregando conteúdo...</p>
            </div>
          }>
            <MotivationSection />
          </Suspense>
        </section>
        
        <section id="bonuses" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          <SectionTitle 
            variant="simple"
            subtitle={`Ferramentas extras para você dominar completamente seu estilo ${category}`}
          >
            Bônus Exclusivos Para o Estilo {category}
          </SectionTitle>
          <Suspense fallback={
            <div className="py-12 flex flex-col items-center justify-center bg-white rounded-xl border border-[#B89B7A]/20">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-[#8F7A6A]">Carregando bônus...</p>
            </div>
          }>
            <BonusSection />
          </Suspense>
        </section>
        
        <section id="testimonials" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          <SectionTitle 
            variant="simple"
            subtitle={`O que mulheres ${category} estão dizendo sobre sua transformação`}
          >
            Resultados Reais de Mulheres Como Você
          </SectionTitle>
          <Suspense fallback={
            <div className="py-12 flex flex-col items-center justify-center bg-white rounded-xl border border-[#B89B7A]/20">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-[#8F7A6A]">Carregando depoimentos...</p>
            </div>
          }>
            <Testimonials />
          </Suspense>
        </section>
        
        <section id="guarantee" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          <SectionTitle 
            variant="simple"
            subtitle={`Teste seu novo estilo ${category} por 7 dias. Se não amar, devolvemos seu dinheiro`}
          >
            Garantia Incondicional de 7 Dias
          </SectionTitle>
          <Suspense fallback={
            <div className="py-12 flex flex-col items-center justify-center bg-white rounded-xl border border-[#B89B7A]/20">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-[#8F7A6A]">Carregando garantia...</p>
            </div>
          }>
            <GuaranteeSection />
          </Suspense>
        </section>
        
        <section id="mentor" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          <SectionTitle 
            variant="simple"
            subtitle="Especialista que já guiou mais de 10.000 mulheres na descoberta do seu estilo autêntico"
          >
            Quem Criou Seu Guia Personalizado
          </SectionTitle>
          <Suspense fallback={
            <div className="py-12 flex flex-col items-center justify-center bg-white rounded-xl border border-[#B89B7A]/20">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-[#8F7A6A]">Carregando informações da mentora...</p>
            </div>
          }>
            <MentorSection />
          </Suspense>
        </section>

        {/* SEÇÃO DE TRANSIÇÃO MELHORADA */}
        <div className="mb-12 md:mb-16">
          <div className="text-center py-12 md:py-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fff7f3]/50 to-[#f9f4ef]/50 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent mx-auto mb-6 md:mb-8"></div>
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-[#432818] mb-4">
                É Hora de Decidir
              </h3>
              <p className="text-lg font-medium max-w-md mx-auto" style={{ color: tokens.colors.textMuted }}>
                Seu novo estilo está a um clique de distância
              </p>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent mx-auto mt-6 md:mt-8"></div>
            </div>
          </div>
        </div>
        
        {/* Final CTA Section - Manter apenas o essencial */}
        <section id="cta" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20 bg-white rounded-xl p-6 lg:p-12 border border-[#B89B7A]/20 text-center relative overflow-hidden" style={{ boxShadow: tokens.shadows.xl }}>
          <div className="relative z-10 mb-12">
            <h2 className="text-4xl lg:text-6xl font-playfair font-bold text-[#432818] mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#432818] via-[#aa6b5d] to-[#432818] bg-clip-text text-transparent">
                Desperte Sua Confiança
              </span>
              <br />
              <span className="text-[#aa6b5d]">Com Seu Estilo Único!</span>
            </h2>
            
            <p className="text-xl mb-8" style={{ color: tokens.colors.textMuted }}>
              Guia {category} personalizado + materiais de apoio inclusos
            </p>
          </div>

          {/* CTA Button simplificado */}
          <div className="text-center mb-10 relative z-10 flex justify-center">
            <button
              onClick={handleCTAClick}
              className="text-white leading-none transition-all duration-300 cursor-pointer font-bold group relative overflow-hidden border-0 outline-none focus:outline-none text-base lg:text-lg"
              style={{
                background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.secondary})`,
                boxShadow: tokens.shadows.cta,
                borderRadius: tokens.radius.lg,
                padding: '1rem 2rem',
                minHeight: '56px',
                width: '100%',
                maxWidth: '480px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
              type="button"
            >
              <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0" />
              <span className="hidden sm:inline">Garantir Minha Transformação</span>
              <span className="sm:hidden">Garantir Transformação</span>
            </button>
          </div>

          {/* Preço simplificado */}
          <div className="text-center space-y-3 mb-6">
            <div className="mb-4">
              <span className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                R$ 39,90
              </span>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
              <p className="text-base mt-2 leading-relaxed" style={{ color: tokens.colors.textMuted }}>
                ou <strong className="text-[#432818] text-lg">5x de R$ 8,83</strong> sem juros
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM SPACING */}
        <div className="mb-16 md:mb-24"></div>
      </div>
    </div>
  );
};

export default ResultPage;