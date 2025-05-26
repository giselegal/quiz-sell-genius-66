import React, { useEffect, useState, Suspense, lazy, useCallback } from 'react';
import { safeLocalStorage } from "@/utils/localStorage";
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ShoppingCart, CheckCircle, ArrowDown, Clock, ChevronLeft, ChevronRight, Shield, Award, Hourglass, Star, Gift, Target, Zap, TrendingUp } from 'lucide-react';
import { safeLocalStorage } from "@/utils/localStorage";
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
import ResourcePreloader from '@/components/result/ResourcePreloader';
import PerformanceMonitor from '@/components/result/PerformanceMonitor';
import EnhancedPricingSection from '@/components/result/EnhancedPricingSection';

// Seções carregadas via lazy
const BeforeAfterTransformation = lazy(() => import('@/components/result/BeforeAfterTransformation4'));
const MotivationSection = lazy(() => import('@/components/result/MotivationSection'));
const BonusSection = lazy(() => import('@/components/result/BonusSection'));
const Testimonials = lazy(() => import('@/components/quiz-result/sales/Testimonials'));
const GuaranteeSection = lazy(() => import('@/components/result/GuaranteeSection'));
const MentorSection = lazy(() => import('@/components/result/MentorSection'));

// Design tokens - SISTEMA COMPLETAMENTE PADRONIZADO
const tokens = {
  colors: {
    // CORES PRINCIPAIS - UNIFICADAS
    primary: '#B89B7A',
    primaryDark: '#A1835D',
    primaryLight: '#D4B79F',
    secondary: '#aa6b5d',
    secondaryDark: '#8F5A4D',
    secondaryLight: '#C28A7D',
    
    // BACKGROUNDS - CONSISTENTES
    background: '#fffaf7',
    backgroundCard: '#ffffff',
    backgroundAlt: '#f9f4ef',
    backgroundSection: '#fff7f3',
    
    // TEXTOS - HIERARQUIA CLARA
    text: '#432818',
    textSecondary: '#6B5B4E',
    textMuted: '#8F7A6A',
    textLight: '#A5927B',
    
    // ESTADOS E UTILIDADES
    success: '#4CAF50',
    successDark: '#45a049',
    
    // BORDAS - UNIFICADAS
    border: '#E5D5C8',
    borderLight: '#F0E6DC',
    borderAccent: 'rgba(184, 155, 122, 0.2)',
  },
  // GRADIENTES PADRONIZADOS
  gradients: {
    primary: 'linear-gradient(135deg, #B89B7A 0%, #aa6b5d 100%)',
    primaryReverse: 'linear-gradient(135deg, #aa6b5d 0%, #B89B7A 100%)',
    background: 'linear-gradient(135deg, #fff7f3 0%, #f9f4ef 100%)',
    text: 'linear-gradient(135deg, #B89B7A 0%, #aa6b5d 50%, #B89B7A 100%)',
  },
  // SISTEMA DE SPACING PADRONIZADO (4px base)
  spacing: {
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
  },
  // SHADOWS UNIFICADAS COM MARCA
  shadows: {
    sm: '0 2px 4px rgba(184, 155, 122, 0.08)',
    md: '0 4px 8px rgba(184, 155, 122, 0.12)',
    lg: '0 8px 16px rgba(184, 155, 122, 0.16)',
    xl: '0 12px 24px rgba(184, 155, 122, 0.20)',
    cta: '0 8px 32px rgba(184, 155, 122, 0.4)',
  },
  // BORDER RADIUS PADRONIZADO
  radius: {
    sm: '0.5rem',   // 8px
    md: '0.75rem',  // 12px
    lg: '1rem',     // 16px
    xl: '1.5rem',   // 24px
  },
  // BREAKPOINTS CONSISTENTES
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
};

// Componente de título padronizado - VISUAL CONSISTENCY MELHORADA
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
    {/* Decoração superior - PADRONIZADA */}
    {variant === 'primary' && (
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="w-8 h-px" style={{ background: tokens.gradients.primary }}></div>
        <div className="w-2 h-2 rounded-full shadow-sm" style={{ background: tokens.gradients.primary }}></div>
        <div className="w-8 h-px" style={{ background: tokens.gradients.primary }}></div>
      </div>
    )}
    
    {/* Título principal - CORES UNIFICADAS */}
    <h2 className={`font-playfair font-bold leading-tight ${
      size === 'xl' ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-2xl md:text-3xl lg:text-4xl'
    } mb-4`} 
    style={{ 
      color: variant === 'primary' ? 'transparent' : tokens.colors.text,
      background: variant === 'primary' ? tokens.gradients.text : 'none',
      backgroundClip: variant === 'primary' ? 'text' : 'unset',
      WebkitBackgroundClip: variant === 'primary' ? 'text' : 'unset'
    }}>
      {children}
    </h2>
    
    {/* Subtítulo opcional - COR PADRONIZADA */}
    {subtitle && (
      <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-6" 
         style={{ color: tokens.colors.textMuted }}>
        {subtitle}
      </p>
    )}
    
    {/* Linha decorativa inferior - PADRONIZADA */}
    {variant === 'primary' && (
      <div className="w-20 h-1 rounded-full mx-auto shadow-sm" 
           style={{ background: tokens.gradients.primary }}></div>
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
          // Reset timer quando chegar a zero (para manter a oferta "limitada")
          return { hours: 2, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    
    return () => clearInterval(countdownInterval);
  }, []);
  
  useEffect(() => {
    if (!primaryStyle) return;
    window.scrollTo(0, 0);
    
    const hasPreloadedResults = safeLocalStorage.getItem('preloadedResults') === 'true';
    
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
      
      // Show bottom bar only when near the end of the page
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
  
  if (!primaryStyle) return <ErrorState />;
  if (isLoading) return <ResultSkeleton />;
  
  const { category } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category];
  
  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevenir comportamento padrão e propagação
    e.preventDefault();
    e.stopPropagation();
    
    // Prevenir múltiplos cliques
    if (window.ctaClickProcessing) return;
    window.ctaClickProcessing = true;
    
    trackButtonClick('checkout_button', 'Iniciar Checkout', 'results_page');
    
    // Para desktop, usar window.open para garantir funcionamento
    if (window.innerWidth >= 768) {
      window.open('https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912', '_blank');
    } else {
      // Para mobile, usar location.href
      window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
    }
    
    // Limpar flag após delay
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
      backgroundColor: tokens.colors.background,
      color: tokens.colors.text,
      fontFamily: globalStyles.fontFamily || 'inherit'
    }}>
      {/* Custom scrollbar styles - CORES COMPLETAMENTE UNIFICADAS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: ${tokens.colors.backgroundAlt};
          }
          ::-webkit-scrollbar-thumb {
            background: ${tokens.gradients.primary};
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: ${tokens.gradients.primaryReverse};
          }
        `
      }} />

      {/* Preloaders and monitors */}
      <ResourcePreloader />
      <PerformanceMonitor />
      
      {/* Decorative background elements - CORES PADRONIZADAS */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" 
           style={{ background: 'radial-gradient(circle, rgba(184, 155, 122, 0.1) 0%, rgba(184, 155, 122, 0.05) 100%)' }}></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" 
           style={{ background: 'radial-gradient(circle, rgba(170, 107, 93, 0.1) 0%, rgba(170, 107, 93, 0.05) 100%)' }}></div>
      <div className="absolute top-1/3 left-0 w-1/5 h-1/5 rounded-full blur-3xl -translate-x-1/2" 
           style={{ background: tokens.gradients.background }}></div>
      
      {/* Header - CORES PADRONIZADAS */}
      <header className="py-4 px-6 sticky top-0 z-50" 
              style={{ backgroundColor: `${tokens.colors.backgroundCard}CC`, backdropFilter: 'blur(8px)' }}>
        <div className="container mx-auto max-w-4xl flex justify-center">
          <img
            src={globalStyles.logo}
            alt={globalStyles.logoAlt || "Logo"}
            style={{ height: globalStyles.logoHeight || '60px' }}
            className="h-auto object-contain"
          />
        </div>
      </header>

      {/* Navigation dots - CORES UNIFICADAS */}
      <div className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-50 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col gap-2">
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
              className="w-2 h-2 rounded-full transition-all duration-300 shadow-sm"
              style={{
                background: activeSection === section.id ? tokens.gradients.primary : tokens.colors.borderLight,
                transform: activeSection === section.id ? 'scale(1.25)' : 'scale(1)'
              }}
              aria-label={`Ir para seção ${section.label}`}
              title={section.label}
            />
          ))}
        </div>
      </div>

      {/* Sticky CTA - CORES UNIFICADAS */}
      <div className={`fixed bottom-0 left-0 right-0 py-3 px-4 z-40 transition-transform duration-500 ${showBottomBar ? 'translate-y-0' : 'translate-y-full'}`}
           style={{ 
             backgroundColor: tokens.colors.backgroundCard, 
             boxShadow: tokens.shadows.lg,
             borderTop: `1px solid ${tokens.colors.border}`
           }}>
        <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium" style={{ color: tokens.colors.text }}>
              Guia de Estilo e Imagem + Bônus
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span className="text-2xl font-bold whitespace-nowrap" 
                    style={{ 
                      background: tokens.gradients.primary, 
                      backgroundClip: 'text', 
                      WebkitBackgroundClip: 'text', 
                      color: 'transparent' 
                    }}>
                5x R$ 8,83
              </span>
              <span className="text-xs whitespace-nowrap" style={{ color: tokens.colors.textMuted }}>sem juros</span>
              <span className="text-xs font-normal whitespace-nowrap" style={{ color: tokens.colors.textMuted }}>ou R$ 39,90 à vista</span>
            </div>
          </div>
          <Button 
            onClick={handleCTAClick} 
            className="text-sm sm:text-base leading-none py-3 px-6 rounded-md transition-all duration-300 w-full sm:w-auto cursor-pointer border-0"
            style={{
              background: tokens.gradients.primary,
              boxShadow: tokens.shadows.cta,
              transform: isButtonHovered ? 'translateY(-2px)' : 'translateY(0)',
              color: '#ffffff' // Usando cor fixa para texto em botões
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

      {/* CONTAINER PRINCIPAL */}
      <div className="container mx-auto px-6 lg:px-8 py-8 max-w-4xl relative z-10">
        {/* Primary Style Card - CORES COMPLETAMENTE UNIFICADAS */}
        <section id="primary-style" className="scroll-mt-20">
          <Card className="p-6 lg:p-8 mb-12 rounded-xl overflow-hidden relative" 
                style={{ 
                  backgroundColor: tokens.colors.backgroundCard,
                  border: `1px solid ${tokens.colors.border}`,
                  boxShadow: tokens.shadows.lg 
                }}>
            {/* DECORATIVE CORNERS - CORES UNIFICADAS */}
            <div className="absolute top-0 left-0 w-12 lg:w-16 h-12 lg:h-16 rounded-tl-xl"
                 style={{ 
                   borderTop: `2px solid ${tokens.colors.borderAccent}`,
                   borderLeft: `2px solid ${tokens.colors.borderAccent}`
                 }}></div>
            <div className="absolute bottom-0 right-0 w-12 lg:w-16 h-12 lg:h-16 rounded-br-xl"
                 style={{ 
                   borderBottom: `2px solid ${tokens.colors.borderAccent}`,
                   borderRight: `2px solid ${tokens.colors.borderAccent}`
                 }}></div>
            
            <AnimatedWrapper animation="fade" show={true} duration={600} delay={300}>
              {/* HEADER SECTION */}
              <div className="text-center mb-8">
                {user?.userName && (
                  <AnimatedWrapper className="mb-6" animation="scale" show={true} duration={500} delay={200}>
                    <span className="text-xl lg:text-2xl font-bold"
                          style={{ 
                            background: tokens.gradients.primary, 
                            backgroundClip: 'text', 
                            WebkitBackgroundClip: 'text', 
                            color: 'transparent' 
                          }}>
                      Parabéns, {user.userName}!
                    </span>
                    <div className="w-12 h-px mx-auto mt-2" style={{ background: tokens.gradients.primary }}></div>
                  </AnimatedWrapper>
                )}
                
                {/* TÍTULO OTIMIZADO - CORES UNIFICADAS */}
                <h1 className="text-xl lg:text-3xl font-playfair mb-6 leading-tight" 
                    style={{ color: tokens.colors.text }}>
                  Descobrimos Seu Estilo Predominante:
                  <br />
                  <span className="text-2xl lg:text-4xl font-bold" 
                        style={{ 
                          background: tokens.gradients.primary, 
                          backgroundClip: 'text', 
                          WebkitBackgroundClip: 'text', 
                          color: 'transparent' 
                        }}>
                    {category}
                  </span>
                </h1>
                
                {/* PROGRESS BAR - CORES UNIFICADAS */}
                <div className="max-w-md mx-auto mb-6">
                  <div className="flex items-center justify-end text-sm mb-2">
                    <span className="font-medium" style={{ color: tokens.colors.textMuted }}>
                      {primaryStyle.percentage}%
                    </span>
                  </div>
                  <Progress 
                    value={primaryStyle.percentage} 
                    className="h-2 rounded-full overflow-hidden" 
                    style={{ backgroundColor: tokens.colors.backgroundAlt }}
                    indicatorClassName="transition-all duration-700 ease-in-out bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]" 
                  />
                </div>
              </div>

              {/* MAIN CONTENT GRID */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="space-y-6 order-2 lg:order-1">
                  <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={400}>
                    <div className="space-y-4">
                      <p className="leading-relaxed text-base lg:text-lg font-medium" 
                         style={{ color: tokens.colors.text }}>
                        <strong>Agora você tem clareza total</strong> sobre quem você é e como expressar sua personalidade através do seu estilo!
                      </p>
                      
                      {/* STYLE DESCRIPTION - CORES UNIFICADAS */}
                      <div className="rounded-lg p-4" 
                           style={{ 
                             background: tokens.gradients.background,
                             border: `1px solid ${tokens.colors.borderLight}`,
                             boxShadow: tokens.shadows.sm 
                           }}>
                        <p className="text-sm lg:text-base leading-relaxed" style={{ color: tokens.colors.text }}>
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
                      
                      <p className="text-sm lg:text-base" style={{ color: tokens.colors.textSecondary }}>
                        <strong>Chega de ficar perdida no guarda-roupa ou comprar peças que não combinam com você!</strong>
                      </p>
                    </div>
                  </AnimatedWrapper>

                  {/* SECONDARY STYLES - CORES UNIFICADAS */}
                  <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={600}>
                    <div className="rounded-lg p-5" 
                         style={{ 
                           background: tokens.gradients.background,
                           border: `1px solid ${tokens.colors.borderLight}`,
                           boxShadow: tokens.shadows.sm 
                         }}>
                      <h3 className="text-lg font-medium mb-3" style={{ color: tokens.colors.secondary }}>
                        Estilos que Também Influenciam Você
                      </h3>
                      <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                    </div>
                  </AnimatedWrapper>
                </div>

                {/* IMAGE SECTION - BORDAS UNIFICADAS */}
                <AnimatedWrapper animation={isLowPerformance ? 'none' : 'scale'} show={true} duration={500} delay={500} className="order-1 lg:order-2">
                  <div className="w-full max-w-xs lg:max-w-sm mx-auto relative"> 
                    <ProgressiveImage 
                      src={`${image}?q=85&f=auto&w=400`} 
                      alt={`Estilo ${category}`} 
                      width={400} 
                      height={500} 
                      className="w-full h-auto rounded-lg transition-transform duration-300 hover:scale-105" 
                      style={{ boxShadow: tokens.shadows.md }}
                      loading="eager" 
                      fetchPriority="high" 
                      onLoad={() => setImagesLoaded(prev => ({ ...prev, style: true }))}
                    />
                    
                    {/* DECORATIVE CORNERS - CORES UNIFICADAS */}
                    <div className="absolute -top-2 -right-2 w-8 lg:w-10 h-8 lg:h-10 rounded-tr-lg"
                         style={{ 
                           borderTop: `2px solid ${tokens.colors.primary}`,
                           borderRight: `2px solid ${tokens.colors.primary}`
                         }}></div>
                    <div className="absolute -bottom-2 -left-2 w-8 lg:w-10 h-8 lg:h-10 rounded-bl-lg"
                         style={{ 
                           borderBottom: `2px solid ${tokens.colors.primary}`,
                           borderLeft: `2px solid ${tokens.colors.primary}`
                         }}></div>
                    
                    {/* STYLE BADGE - CORES COMPLETAMENTE UNIFICADAS */}
                    <div className="absolute -top-3 -left-3 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium transform -rotate-12"
                         style={{ 
                           background: tokens.gradients.primary,
                           boxShadow: tokens.shadows.sm,
                           color: '#ffffff'
                         }}>
                      {category}
                    </div>
                  </div>
                </AnimatedWrapper>
              </div>
              
              {/* GUIDE IMAGE - CORES UNIFICADAS */}
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={800}>
                <div className="mt-12 max-w-2xl mx-auto relative">
                  <h3 className="text-xl lg:text-2xl font-medium text-center mb-6" 
                      style={{ color: tokens.colors.secondary }}>
                    Seu Guia de Estilo Personalizado
                  </h3>
                  <ProgressiveImage 
                    src={`${guideImage}?q=85&f=auto&w=800`} 
                    alt={`Guia de Estilo ${category}`} 
                    loading="lazy" 
                    className="w-full h-auto rounded-lg transition-transform duration-300 hover:scale-102" 
                    style={{ boxShadow: tokens.shadows.lg }}
                    onLoad={() => setImagesLoaded(prev => ({ ...prev, guide: true }))} 
                  />
                  
                  {/* BADGE COMPLETAMENTE UNIFICADO */}
                  <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-medium transform rotate-12"
                       style={{ 
                         background: tokens.gradients.primary,
                         boxShadow: tokens.shadows.sm,
                         color: '#ffffff'
                       }}>
                    Exclusivo
                  </div>
                </div>
              </AnimatedWrapper>
            </AnimatedWrapper>
          </Card>
        </section>

        {/* Before/After Transformation Section */}
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
              <p style={{ color: tokens.colors.textMuted }}>Carregando transformações...</p>
            </div>
          }>
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
              <BeforeAfterTransformation />
            </AnimatedWrapper>
          </Suspense>
        </section>

        {/* Motivation Section */}
        <section id="motivation" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          <SectionTitle 
            variant="secondary"
            subtitle={`Por que mulheres com seu perfil ${category} conquistam mais confiança e oportunidades`}
          >
            A Ciência Por Trás do Seu Estilo
          </SectionTitle>
          <Suspense fallback={
            <div className="py-10 flex flex-col items-center justify-center">
              <LoadingSpinner size="lg" className="mb-4" />
              <p style={{ color: tokens.colors.textMuted }}>Carregando conteúdo...</p>
            </div>
          }>
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
              <MotivationSection />
            </AnimatedWrapper>
          </Suspense>
        </section>
        
        {/* Bonus Section */}
        <section id="bonuses" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          <SectionTitle 
            variant="simple"
            subtitle={`Ferramentas extras para potencializar uma Imagem de Sucesso ${category}`}
          >
            Bônus Exclusivos
          </SectionTitle>
          <Suspense fallback={
            <div className="py-10 flex flex-col items-center justify-center">
              <LoadingSpinner size="lg" className="mb-4" />
              <p style={{ color: tokens.colors.textMuted }}>Carregando bônus...</p>
            </div>
          }>
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
              <BonusSection />
            </AnimatedWrapper>
          </Suspense>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          <SectionTitle 
            variant="simple"
            subtitle={`O que mulheres ${category} estão dizendo sobre sua transformação`}
          >
            Resultados Reais
          </SectionTitle>
          <Suspense fallback={
            <div className="py-10 flex flex-col items-center justify-center">
              <LoadingSpinner size="lg" className="mb-4" />
              <p style={{ color: tokens.colors.textMuted }}>Carregando depoimentos...</p>
            </div>
          }>
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
              <Testimonials />
            </AnimatedWrapper>
          </Suspense>
        </section>
        
        {/* Guarantee Section */}
        <section id="guarantee" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          <SectionTitle 
            variant="simple"
          >
            Garantia Total
          </SectionTitle>
          <Suspense fallback={
            <div className="py-10 flex flex-col items-center justify-center">
              <LoadingSpinner size="lg" className="mb-4" />
              <p style={{ color: tokens.colors.textMuted }}>Carregando garantia...</p>
            </div>
          }>
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
              <GuaranteeSection />
            </AnimatedWrapper>
          </Suspense>
        </section>
        
        {/* Mentor Section */}
        <section id="mentor" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          <SectionTitle 
            variant="simple"
            subtitle="Especialista que já guiou mais de 10.000 mulheres na descoberta do seu estilo autêntico"
          >
            Conheça Sua Mentora
          </SectionTitle>
          <Suspense fallback={
            <div className="py-10 flex flex-col items-center justify-center">
              <LoadingSpinner size="lg" className="mb-4" />
              <p style={{ color: tokens.colors.textMuted }}>Carregando informações da mentora...</p>
            </div>
          }>
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400}>
              <MentorSection />
            </AnimatedWrapper>
          </Suspense>
        </section>

        {/* Removendo a seção de transição melhorada */}
        {/* <div className="mb-12 md:mb-16">
          <div className="text-center py-12 md:py-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fff7f3]/50 to-[#f9f4ef]/50 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent mx-auto mb-6 md:mb-8"></div>
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-[#432818] mb-4">
                É Hora de Agir
              </h3>
              <p className="text-lg font-medium max-w-md mx-auto" style={{ color: tokens.colors.textMuted }}>
                Seu novo estilo está a um clique de distância
              </p>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent mx-auto mt-6 md:mt-8"></div>
            </div>
          </div>
        </div> */}
        
        {/* NOVA SEÇÃO DE PRICING MELHORADA */}
        <EnhancedPricingSection />

        {/* BOTTOM SPACING */}
        <div className="mb-16 md:mb-24"></div>
      </div>
    </div>
  );
};

export default ResultPage;
