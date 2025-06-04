import React, { useEffect, useState, Suspense, lazy, useCallback } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ShoppingCart, CheckCircle, ArrowDown, Clock, ChevronLeft, ChevronRight, Shield, Award, Hourglass, Star, Gift, Target, Zap, TrendingUp } from 'lucide-react';
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
import GuaranteeSeal from '@/components/result/GuaranteeSeal';
import { useAuth } from '@/context/AuthContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import ProgressiveImage from '@/components/ui/progressive-image';
import ResourcePreloader from '@/components/result/ResourcePreloader';
import PerformanceMonitor from '@/components/result/PerformanceMonitor';

// Seções carregadas via lazy
const BeforeAfterTransformation = lazy(() => import('@/components/result/BeforeAfterTransformation'));
const MotivationSection = lazy(() => import('@/components/result/MotivationSection'));
const BonusSection = lazy(() => import('@/components/result/BonusSection'));
const Testimonials = lazy(() => import('@/components/quiz-result/sales/Testimonials'));
const GuaranteeSection = lazy(() => import('@/components/result/GuaranteeSection'));
const MentorSection = lazy(() => import('@/components/result/MentorSection'));

// Design tokens - SISTEMA APRIMORADO
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
    backgroundCard: '#ffffff',
    text: '#2C1810', // Mais escuro para melhor contraste
    textSecondary: '#5D4A3A', // Melhor hierarquia
    textMuted: '#8F7A6A',
    textLight: '#B5A394',
    success: '#4CAF50',
    successDark: '#45a049',
    warning: '#FF6B35',
    border: 'rgba(184, 155, 122, 0.15)',
    borderLight: 'rgba(184, 155, 122, 0.08)',
    overlay: 'rgba(44, 24, 16, 0.02)',
  },
  // SISTEMA DE SPACING REFINADO
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    '2xl': '2rem',   // 32px
    '3xl': '3rem',   // 48px
    '4xl': '4rem',   // 64px
    '5xl': '6rem',   // 96px
  },
  // SHADOWS MAIS SUTIS E ELEGANTES
  shadows: {
    xs: '0 1px 2px rgba(184, 155, 122, 0.05)',
    sm: '0 2px 4px rgba(184, 155, 122, 0.08)',
    md: '0 4px 12px rgba(184, 155, 122, 0.12)',
    lg: '0 8px 24px rgba(184, 155, 122, 0.15)',
    xl: '0 16px 40px rgba(184, 155, 122, 0.18)',
    cta: '0 8px 32px rgba(76, 175, 80, 0.25)',
    inner: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  },
  // BORDER RADIUS HARMONIOSO
  radius: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },
  // TIPOGRAFIA MELHORADA
  typography: {
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    }
  }
};

// Componente de título melhorado - BOLINHAS REMOVIDAS
const SectionTitle = React.memo<{
  children: React.ReactNode;
  subtitle?: string;
  size?: 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'primary' | 'secondary' | 'simple';
  centered?: boolean;
}>(({ children, subtitle, size = 'xl', className = '', variant = 'simple', centered = true }) => (
  <AnimatedWrapper 
    className={`${centered ? 'text-center' : ''} mb-8 lg:mb-12 ${className}`}
    animation="fade"
    show={true}
    duration={600}
  >
    {/* Decoração superior refinada - SEM BOLINHA */}
    {variant === 'primary' && (
      <div className="inline-flex items-center gap-3 mb-6">
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
      </div>
    )}

    {/* Título com melhor hierarquia */}
    <h2 className={`font-playfair font-bold leading-tight tracking-tight ${
      variant === 'primary' 
        ? 'bg-gradient-to-r from-[#2C1810] via-[#aa6b5d] to-[#2C1810] bg-clip-text text-transparent mb-6'
        : 'text-[#2C1810] mb-4'
    } ${
      size === 'xl' ? 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl' : 
      size === 'lg' ? 'text-xl md:text-2xl lg:text-3xl xl:text-4xl' :
      'text-lg md:text-xl lg:text-2xl xl:text-3xl'
    }`}>
      {children}
    </h2>

    {/* Subtítulo melhorado */}
    {subtitle && (
      <div className="max-w-4xl mx-auto">
        <p className="text-base md:text-lg lg:text-xl text-[#5D4A3A] leading-relaxed font-medium">
          {subtitle}
        </p>
      </div>
    )}

    {/* Linha decorativa */}
    {variant === 'primary' && (
      <div className="w-24 h-1 bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] rounded-full mx-auto mt-6 shadow-sm"></div>
    )}
  </AnimatedWrapper>
));

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

  // Estados de interação melhorados
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('primary-style');

  // Timer otimizado
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

  // Scroll tracking melhorado
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 120);

      // Tracking de seção ativa
      const sections = [
        'primary-style', 'transformations', 'motivation', 'bonuses',
        'testimonials', 'guarantee', 'mentor', 'cta'
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element?.getBoundingClientRect().top <= 250) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!primaryStyle) return <ErrorState />;
  if (isLoading) return <ResultSkeleton />;

  const { category } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category];

  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if ((window as any).ctaClickProcessing) return;
    (window as any).ctaClickProcessing = true;

    trackButtonClick('checkout_button', 'Iniciar Checkout', 'results_page');

    if (window.innerWidth >= 768) {
      window.open('https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912', '_blank');
    } else {
      window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
    }

    setTimeout(() => {
      (window as any).ctaClickProcessing = false;
    }, 1000);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundColor: tokens.colors.background,
      color: tokens.colors.text,
      fontFamily: globalStyles.fontFamily || 'Inter, system-ui, sans-serif'
    }}>
      {/* Scrollbar personalizada */}
      <style dangerouslySetInnerHTML={{
        __html: `
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: rgba(184, 155, 122, 0.1);
          }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #B89B7A, #aa6b5d);
            border-radius: 3px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #aa6b5d, #B89B7A);
          }

          /* Smooth scroll behavior */
          html {
            scroll-behavior: smooth;
          }

          /* Focus states melhorados */
          button:focus-visible,
          a:focus-visible {
            outline: 2px solid #B89B7A;
            outline-offset: 2px;
          }
        `
      }} />

      {/* Preloaders */}
      <ResourcePreloader />
      <PerformanceMonitor />

      {/* Background decorativo refinado */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[#B89B7A]/8 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#aa6b5d]/6 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/2 left-1/4 w-1/4 h-1/4 bg-gradient-to-r from-[#B89B7A]/4 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Header minimalista e elegante */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#B89B7A]/10' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto max-w-6xl px-4 py-4 lg:py-6">
          <div className="flex justify-center">
            <img
              src={globalStyles.logo}
              alt={globalStyles.logoAlt || "Logo"}
              style={{ height: globalStyles.logoHeight || '50px' }}
              className="h-auto object-contain transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </header>

      {/* Navigation dots refinada - BOLINHAS DIMINUÍDAS */}
      <div className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-500 ${
        isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}>
        <div className="flex flex-col gap-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-[#B89B7A]/20">
          {[
            { id: 'primary-style', label: 'Seu Estilo' },
            { id: 'transformations', label: 'Transformações' },
            { id: 'motivation', label: 'Motivação' },
            { id: 'bonuses', label: 'Bônus' },
            { id: 'testimonials', label: 'Depoimentos' },
            { id: 'guarantee', label: 'Garantia' },
            { id: 'cta', label: 'Adquirir' }
          ].map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`group relative w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === section.id 
                  ? 'bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] scale-125 shadow-md' 
                  : 'bg-[#B5A394] hover:bg-[#B89B7A] hover:scale-110'
              }`}
              aria-label={`Ir para seção ${section.label}`}
            >
              {/* Tooltip sem ícone */}
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-[#2C1810] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {section.label}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CONTAINER PRINCIPAL */}
      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-6xl relative z-10">
        {/* Primary Style Card - Design completamente renovado */}
        <section id="primary-style" className="scroll-mt-24 mb-16 lg:mb-24">
          <Card className="relative overflow-hidden bg-gradient-to-br from-white to-[#fff7f3] border border-[#B89B7A]/15 rounded-2xl p-6 lg:p-10" 
                style={{ boxShadow: tokens.shadows.xl }}>

            {/* Decoração de cantos elegante */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#B89B7A]/20 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#B89B7A]/20 rounded-br-2xl"></div>

            <AnimatedWrapper animation="fade" show={true} duration={600} delay={200}>
              {/* Header personalizado - BOLINHA REMOVIDA */}
              <div className="text-center mb-10 lg:mb-12">
                {user?.userName && (
                  <AnimatedWrapper className="mb-8" animation="scale" show={true} duration={500} delay={100}>
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
                    <span className="text-lg font-bold text-[#B89B7A]">{primaryStyle.percentage}%</span>
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
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                {/* Conteúdo textual */}
                <div className="space-y-8 order-2 lg:order-1">
                  <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={300}>
                    <div className="space-y-6">
                      {/* Mensagem principal */}
                      <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-xl p-6 border border-[#B89B7A]/10"
                           style={{ boxShadow: tokens.shadows.sm }}>
                        <p className="text-[#2C1810] leading-relaxed text-lg font-medium mb-4">
                          <strong className="text-[#aa6b5d]">Agora você tem clareza total</strong> sobre quem você é e como expressar sua personalidade através do seu estilo!
                        </p>

                        {/* Descrição do estilo */}
                        <div className="bg-white/60 rounded-lg p-4 border border-[#B89B7A]/5">
                          <p className="text-[#2C1810] text-base leading-relaxed">
                            <strong className="text-[#aa6b5d]">Seu estilo {category}</strong> revela uma mulher que {
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

                      {/* Call to action sutil */}
                      <div className="text-center p-4 bg-gradient-to-r from-[#B89B7A]/5 to-[#aa6b5d]/5 rounded-lg border border-[#B89B7A]/10">
                        <p className="text-base font-semibold text-[#2C1810]">
                          <strong>Chega de ficar perdida no guarda-roupa!</strong>
                        </p>
                        <p className="text-sm text-[#5D4A3A] mt-1">
                          Descubra como aplicar seu estilo no dia a dia
                        </p>
                      </div>
                    </div>
                  </AnimatedWrapper>

                  {/* Estilos secundários melhorados */}
                  <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={500}>
                    <div className="bg-gradient-to-br from-white to-[#fff7f3] rounded-xl p-6 border border-[#B89B7A]/15"
                         style={{ boxShadow: tokens.shadows.md }}>
                      <h3 className="text-xl font-semibold text-[#aa6b5d] mb-4 flex items-center gap-2">
                        Estilos que Também Influenciam Você
                      </h3>
                      <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                    </div>
                  </AnimatedWrapper>
                </div>

                {/* Imagem principal */}
                <AnimatedWrapper animation={isLowPerformance ? 'none' : 'scale'} show={true} duration={500} delay={400} className="order-1 lg:order-2">
                  <div className="relative max-w-md mx-auto"> 
                    <div className="relative overflow-hidden rounded-2xl" style={{ boxShadow: tokens.shadows.lg }}>
                      <ProgressiveImage 
                        src={`${image}?q=90&f=auto&w=500`} 
                        alt={`Estilo ${category}`} 
                        width={500} 
                        height={600} 
                        className="w-full h-auto transition-all duration-500 hover:scale-105" 
                        loading="eager" 
                        fetchPriority="high" 
                        onLoad={() => setImagesLoaded(prev => ({ ...prev, style: true }))}
                      />

                      {/* Overlay gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
                    </div>

                    {/* Badge flutuante - BOLINHA REMOVIDA */}
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-lg">
                      <span>{category}</span>
                    </div>

                    {/* Decoração de cantos */}
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-3 border-l-3 border-[#B89B7A] rounded-bl-xl opacity-60"></div>
                  </div>
                </AnimatedWrapper>
              </div>

              {/* Guia do estilo */}
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={700}>
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
                      onLoad={() => setImagesLoaded(prev => ({ ...prev, guide: true }))} 
                    />

                    {/* Badge exclusivo - BOLINHA REMOVIDA */}
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-3 py-1.5 rounded-full text-xs font-bold transform rotate-12 shadow-md">
                      EXCLUSIVO
                    </div>
                  </div>
                </div>
              </AnimatedWrapper>
            </AnimatedWrapper>
          </Card>
        </section>

        {/* Seções lazy-loaded com melhor espaçamento */}
        <section id="transformations" className="scroll-mt-24 mb-20 lg:mb-28">
          <SectionTitle 
            variant="primary"
            size="xl"
            subtitle="Veja como mulheres descobriram sua melhor versão seguindo as mesmas estratégias que você vai receber"
          >
            Resultados que Falam por Si
          </SectionTitle>
          <Suspense fallback={
            <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-[#8F7A6A] font-medium">Carregando transformações...</p>
            </div>
          }>
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
              <BeforeAfterTransformation />
            </AnimatedWrapper>
          </Suspense>
        </section>

        <section id="motivation" className="scroll-mt-24 mb-20 lg:mb-28">
          <SectionTitle 
            variant="secondary"
            size="xl"
            subtitle="Conhecer seu estilo pessoal é muito mais do que seguir tendências passageiras — é uma ferramenta poderosa de comunicação não-verbal e autoconfiança."
          >
            Por que Aplicar seu Estilo é tão Importante?
          </SectionTitle>
          <Suspense fallback={
            <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-[#8F7A6A] font-medium">Carregando conteúdo...</p>
            </div>
          }>
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
              <MotivationSection />
            </AnimatedWrapper>
          </Suspense>
        </section>

        <section id="bonuses" className="scroll-mt-24 mb-20 lg:mb-28">
          <Suspense fallback={
            <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-[#8F7A6A] font-medium">Carregando bônus...</p>
            </div>
          }>
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
              <BonusSection />
            </AnimatedWrapper>
          </Suspense>
        </section>

        <section id="testimonials" className="scroll-mt-24 mb-20 lg:mb-28">
          <Suspense fallback={
            <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-[#8F7A6A] font-medium">Carregando depoimentos...</p>
            </div>
          }>
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
              <Testimonials />
            </AnimatedWrapper>
          </Suspense>
        </section>

        <section id="guarantee" className="scroll-mt-24 mb-20 lg:mb-28">
          <Suspense fallback={
            <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-[#8F7A6A] font-medium">Carregando garantia...</p>
            </div>
          }>
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
              <GuaranteeSection />
            </AnimatedWrapper>
          </Suspense>
        </section>

        <section id="mentor" className="scroll-mt-24 mb-20 lg:mb-28">
          <SectionTitle 
            variant="simple"
            size="xl"
            subtitle="Especialista que já guiou mais de 3.000 mulheres na descoberta do seu estilo autêntico"
          >
            Conheça Sua Mentora
          </SectionTitle>
          <Suspense fallback={
            <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-[#8F7A6A] font-medium">Carregando informações da mentora...</p>
            </div>
          }>
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
              <MentorSection />
            </AnimatedWrapper>
          </Suspense>
        </section>

        {/* Seção de transição elegante */}
        <div className="mb-20 lg:mb-28">
          <div className="relative text-center py-16 lg:py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#fff7f3]/60 via-[#f9f4ef]/40 to-[#fff7f3]/60 rounded-3xl"></div>
            <div className="relative z-10">
              <div className="w-40 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent mx-auto mb-8"></div>
              <h3 className="text-3xl lg:text-4xl font-playfair font-bold text-[#2C1810] mb-6">
                Chegou o Momento de Agir
              </h3>
              <p className="text-xl font-medium max-w-2xl mx-auto text-[#5D4A3A] leading-relaxed">
                Não deixe para depois a transformação que você pode começar agora!
              </p>
              <div className="w-40 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent mx-auto mt-8"></div>
            </div>
          </div>
        </div>

        {/* CTA Final completamente redesenhada */}
        <section id="cta" className="scroll-mt-24 mb-20 lg:mb-28">
          <div className="relative overflow-hidden bg-gradient-to-br from-white via-[#fff7f3] to-[#f9f4ef] rounded-3xl p-8 lg:p-16 border border-[#B89B7A]/20 text-center"
               style={{ boxShadow: tokens.shadows.xl }}>

            {/* Background decorativo */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#B89B7A]/5 via-transparent to-[#aa6b5d]/5 pointer-events-none"></div>

            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={600} delay={200}>
              <div className="relative z-10">
                {/* Header da CTA */}
                <div className="mb-12 lg:mb-16">
                  <div className="inline-flex items-center gap-4 mb-8">
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                    <div className="w-6 h-6 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full animate-pulse shadow-lg"></div>
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                  </div>

                  <h2 className="text-4xl lg:text-6xl xl:text-7xl font-playfair font-bold leading-tight mb-8">
                    <span className="bg-gradient-to-r from-[#2C1810] via-[#aa6b5d] to-[#2C1810] bg-clip-text text-transparent block mb-4">
                      Desperte Sua Confiança
                    </span>
                    <span className="text-[#aa6b5d] block">
                      Com Seu Estilo Único!
                    </span>
                  </h2>

                  <p className="text-xl lg:text-2xl text-[#5D4A3A] font-medium mb-4">
                    Guia {category} Personalizado + Bônus Exclusivos
                  </p>

                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B89B7A]/10 to-[#aa6b5d]/10 px-4 py-2 rounded-full border border-[#B89B7A]/20">
                    <Clock className="w-4 h-4 text-[#aa6b5d]" />
                    <span className="text-sm font-medium text-[#aa6b5d]">
                      Oferta por tempo limitado
                    </span>
                  </div>
                </div>

                {/* Grid de produtos otimizado */}
                <div className="mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                    {[
                      {
                        src: (() => {
                          const guideImages = {
                            'Natural': 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071344/GUIA_NATURAL_fzp6fc.webp',
                            'Clássico': 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp',
                            'Contemporâneo': 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp',
                            'Elegante': 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071342/GUIA_ELEGANTE_asez1q.webp',
                            'Romântico': 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp',
                            'Sexy': 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071349/GUIA_SEXY_t5x2ov.webp',
                            'Dramático': 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp',
                            'Criativo': 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071342/GUIA_CRIATIVO_ntbzph.webp'
                          };
                          return guideImages[category] || guideImages['Natural'];
                        })(),
                        title: `Manual de Estilo ${category}`,
                        subtitle: 'Descubra combinações infalíveis de cores, tecidos e acessórios que valorizam sua personalidade única.',
                        badge: 'GUIA PRINCIPAL',
                        originalPrice: 'R$ 77,00',
                        priority: true
                      },
                      {
                        src: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1744911677/Cópia_de_MOCKUPS_15_-_Copia_grstwl.png',
                        title: 'Guia das Peças Estratégicas',
                        subtitle: 'Peças-chave que maximizam combinações e garantem versatilidade em qualquer situação.',
                        badge: 'BÔNUS EXCLUSIVO',
                        originalPrice: 'R$ 59,00',
                        priority: false
                      },
                      {
                        src: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1744911666/Cópia_de_Template_Dossiê_Completo_2024_15_-_Copia_ssrhu3.png',
                        title: 'Manual de Visagismo',
                        subtitle: 'Descubra os cortes ideais para seu rosto e realce sua beleza natural.',
                        badge: 'BÔNUS PREMIUM',
                        originalPrice: 'R$ 39,00',
                        priority: false
                      }
                    ].map((product, index) => (
                      <div key={index} className={`group bg-white rounded-2xl p-6 lg:p-8 border border-[#B89B7A]/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl relative ${index === 2 ? 'md:col-span-2 xl:col-span-1' : ''}`}
                           style={{ boxShadow: tokens.shadows.lg }}>

                        {/* Badge premium */}
                        <div className="absolute -top-4 -right-4 z-10">
                          <span className={`text-xs font-bold px-4 py-2 rounded-full text-white shadow-lg transform rotate-12 ${
                            index === 0 ? 'bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]' : 
                            'bg-gradient-to-r from-[#aa6b5d] to-[#B89B7A]'
                          }`}>
                            {product.badge}
                          </span>
                        </div>

                        {/* Imagem do produto */}
                        <div className="relative mb-6 bg-gradient-to-br from-[#f9f4ef] to-[#fff7f3] rounded-xl p-4 overflow-hidden"
                             style={{ 
                               boxShadow: tokens.shadows.sm,
                               aspectRatio: index === 0 ? '4.6/5' : index === 1 ? '6/3.5' : '3/4.5'
                             }}>
                          <ProgressiveImage 
                            src={product.src}
                            alt={product.title}
                            className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                            loading={product.priority ? "eager" : "lazy"}
                            fetchPriority={product.priority ? "high" : "low"}
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

                {/* Resumo de valor redesenhado */}
                <div className="max-w-lg mx-auto mb-12">
                  <div className="relative bg-white rounded-2xl p-8 lg:p-10 border-4 border-double border-[#B89B7A]/30 overflow-hidden"
                       style={{ 
                         boxShadow: '0 20px 40px rgba(184,155,122,0.15), 0 0 0 1px rgba(255,255,255,0.8) inset',
                         background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,244,239,0.95) 100%)'
                       }}>

                    {/* Background decorativo */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B89B7A]/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>

                    <div className="relative z-10 text-center space-y-6">
                      <p className="text-lg lg:text-xl font-semibold text-[#5D4A3A]">
                        De <span className="font-bold text-[#B89B7A] text-xl lg:text-2xl line-through">R$ 175,00</span> por apenas:
                      </p>

                      <div className="space-y-2">
                        <p className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                          R$ 39,90
                        </p>
                        <p className="text-lg lg:text-xl font-bold text-[#4CAF50]">
                          ou 5x de R$ 8,83
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
                        <span>Esta oferta expira quando você sair desta página</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button principal com texto responsivo */}
                <div className="text-center">
                  <Button 
                    onClick={handleCTAClick} 
                    className="group relative text-white font-bold py-6 px-8 sm:px-12 lg:px-16 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
                    style={{
                      background: 'linear-gradient(135deg, #4CAF50 0%, #43a047 50%, #388e3c 100%)',
                      boxShadow: '0 20px 40px rgba(76, 175, 80, 0.3), 0 0 0 1px rgba(255,255,255,0.2) inset',
                    }}
                    type="button"
                  >
                    <span className="flex items-center justify-center gap-2 sm:gap-3" style={{
                      fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)' // Ajuste responsivo: 14px min, 20px max
                    }}>
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                      <span className="leading-tight">Quero Transformar Meu Estilo Agora</span>
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
      </main>

      {/* Build info oculto */}
      <div className="hidden">
        <BuildInfo />
      </div>
    </div>
  );
};

export default ResultPage;