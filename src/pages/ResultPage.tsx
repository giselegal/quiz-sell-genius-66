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
    text: '#2C1810',
    textSecondary: '#5D4A3A',
    textMuted: '#8F7A6A',
    textLight: '#B5A394',
    success: '#4CAF50',
    successDark: '#45a049',
    warning: '#FF6B35',
    border: 'rgba(184, 155, 122, 0.15)',
    borderLight: 'rgba(184, 155, 122, 0.08)',
    overlay: 'rgba(44, 24, 16, 0.02)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '3rem',
    '4xl': '4rem',
    '5xl': '6rem',
  },
  shadows: {
    xs: '0 1px 2px rgba(184, 155, 122, 0.05)',
    sm: '0 2px 4px rgba(184, 155, 122, 0.08)',
    md: '0 4px 12px rgba(184, 155, 122, 0.12)',
    lg: '0 8px 24px rgba(184, 155, 122, 0.15)',
    xl: '0 16px 40px rgba(184, 155, 122, 0.18)',
    cta: '0 8px 32px rgba(76, 175, 80, 0.25)',
    inner: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  },
  radius: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  typography: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    }
  }
};

// Componente de título melhorado
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
    {variant === 'primary' && (
      <div className="inline-flex items-center gap-3 mb-6">
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
        <div className="w-2 h-2 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full shadow-sm"></div>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
      </div>
    )}
    
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
    
    {subtitle && (
      <div className="max-w-4xl mx-auto">
        <p className="text-base md:text-lg lg:text-xl text-[#5D4A3A] leading-relaxed font-medium">
          {subtitle}
        </p>
      </div>
    )}
    
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

  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [activeSection, setActiveSection] = useState('primary-style');
  
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
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 120);
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrolledToBottom = scrollTop + windowHeight >= documentHeight - 1000;
      
      setShowBottomBar(scrolledToBottom);
      
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
          
          html {
            scroll-behavior: smooth;
          }
          
          button:focus-visible,
          a:focus-visible {
            outline: 2px solid #B89B7A;
            outline-offset: 2px;
          }
        `
      }} />

      <ResourcePreloader />
      <PerformanceMonitor />
      
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[#B89B7A]/8 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#aa6b5d]/6 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/2 left-1/4 w-1/4 h-1/4 bg-gradient-to-r from-[#B89B7A]/4 to-transparent rounded-full blur-2xl"></div>
      </div>
      
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

      <div className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-500 ${
        isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}>
        <div className="flex flex-col gap-3 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg border border-[#B89B7A]/20">
          {[
            { id: 'primary-style', label: 'Seu Estilo', icon: <div className="w-2 h-2 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full shadow-sm"></div> },
            { id: 'transformations', label: 'Transformações', icon: <ChevronRight className="w-4 h-4 text-[#B89B7A]" /> },
            { id: 'motivation', label: 'Motivação', icon: <TrendingUp className="w-4 h-4 text-[#B89B7A]" /> },
            { id: 'bonuses', label: 'Bônus', icon: <Gift className="w-4 h-4 text-[#B89B7A]" /> },
            { id: 'testimonials', label: 'Depoimentos', icon: <Target className="w-4 h-4 text-[#B89B7A]" /> },
            { id: 'guarantee', label: 'Garantia', icon: <Shield className="w-4 h-4 text-[#B89B7A]" /> },
            { id: 'cta', label: 'Adquirir', icon: <ShoppingCart className="w-4 h-4 text-[#B89B7A]" /> }
          ].map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`group relative w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id 
                  ? 'bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] scale-125 shadow-md' 
                  : 'bg-[#B5A394] hover:bg-[#B89B7A] hover:scale-110'
              }`}
              aria-label={`Ir para seção ${section.label}`}
            >
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-[#2C1810] text-white text-xs px-2 py-1 rounded whitespace-nowrap flex items-center gap-1">
                  {section.icon} {section.label}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Sticky CTA - BOLINHAS REMOVIDAS */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl border-t border-[#B89B7A]/20 py-4 px-4 z-40 transition-all duration-500 ${
        showBottomBar ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold text-[#2C1810] mb-1">
              Guia de Estilo Completo + Bônus Exclusivos
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                5x R$ 8,83
              </span>
              <span className="text-xs text-[#8F7A6A] bg-[#f9f4ef] px-2 py-1 rounded-full">
                ou R$ 39,90 à vista
              </span>
            </div>
          </div>
          <Button 
            onClick={handleCTAClick} 
            className="text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 w-full sm:w-auto group"
            style={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #43a047 100%)',
              boxShadow: tokens.shadows.cta,
              transform: isButtonHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
            }}
            onMouseEnter={() => setIsButtonHovered(true)} 
            onMouseLeave={() => setIsButtonHovered(false)}
            type="button"
          >
            <span className="flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              Adquirir Agora
            </span>
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-6xl relative z-10">
        <section id="primary-style" className="scroll-mt-24 mb-16 lg:mb-24">
          <Card className="relative overflow-hidden bg-gradient-to-br from-white to-[#fff7f3] border border-[#B89B7A]/15 rounded-2xl p-6 lg:p-10" 
                style={{ boxShadow: tokens.shadows.xl }}>
            
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#B89B7A]/20 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#B89B7A]/20 rounded-br-2xl"></div>
            
            <AnimatedWrapper animation="fade" show={true} duration={600} delay={200}>
              <div className="text-center mb-10 lg:mb-12">
                {user?.userName && (
                  <AnimatedWrapper className="mb-8" animation="scale" show={true} duration={500} delay={100}>
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] px-6 py-3 rounded-full border border-[#B89B7A]/20">
                      <div className="w-4 h-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full shadow-sm"></div>
                      <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                        Parabéns, {user.userName}!
                      </span>
                    </div>
                  </AnimatedWrapper>
                )}
                
                <h1 className="text-2xl lg:text-4xl xl:text-5xl font-playfair text-[#2C1810] mb-8 leading-tight">
                  Descobrimos Seu Estilo Predominante:
                  <br />
                  <span className="text-3xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] bg-clip-text text-transparent mt-2 block">
                    {category}
                  </span>
                </h1>
                
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

              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <div className="space-y-8 order-2 lg:order-1">
                  <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={300}>
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-xl p-6 border border-[#B89B7A]/10"
                           style={{ boxShadow: tokens.shadows.sm }}>
                        <p className="text-[#2C1810] leading-relaxed text-lg font-medium mb-4">
                          <strong className="text-[#aa6b5d]">Agora você tem clareza total</strong> sobre quem você é e como expressar sua personalidade através do seu estilo!
                        </p>
                        
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

                  <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={500}>
                    <div className="bg-gradient-to-br from-white to-[#fff7f3] rounded-xl p-6 border border-[#B89B7A]/15"
                         style={{ boxShadow: tokens.shadows.md }}>
                      <h3 className="text-xl font-semibold text-[#aa6b5d] mb-4 flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full shadow-sm"></div>
                        Estilos que Também Influenciam Você
                      </h3>
                      <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                    </div>
                  </AnimatedWrapper>
                </div>

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
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                    
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-lg">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-white rounded-full mr-1"></div> {category}
                      </span>
                    </div>
                    
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-3 border-l-3 border-[#B89B7A] rounded-bl-xl opacity-60"></div>
                  </div>
                </AnimatedWrapper>
              </div>
              
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={700}>
                <div className="mt-16 text-center">
                  <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-[#2C1810] mb-8">
                    Seu Guia de Estilo Personalizado
                  </h3>
                  
                  <div className="relative max-w-2xl mx-auto">
                    <div className="relative overflow-hidden rounded-2xl" style={{ boxShadow: tokens.shadows.lg }}>
                      <ProgressiveImage 
                        src={`${guideImage}?q=90&f=auto&w=800`} 
                        alt={`Guia de Estilo ${category}`} 
                        width={800} 
                        height={600} 
                        className="w-full h-auto transition-all duration-500 hover:scale-105" 
                        loading="lazy" 
                        onLoad={() => setImagesLoaded(prev => ({ ...prev, guide: true }))}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                      
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <h4 className="text-xl font-bold mb-2">Guia Completo {category}</h4>
                        <p className="text-sm opacity-90">Todas as dicas para aplicar seu estilo no dia a dia</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-lg text-[#5D4A3A] mt-8 max-w-3xl mx-auto leading-relaxed">
                    Este é apenas um <strong className="text-[#aa6b5d]">pequeno exemplo</strong> do que você encontrará no seu guia completo. 
                    Descubra como transformar completamente seu guarda-roupa e sua autoestima!
                  </p>
                </div>
              </AnimatedWrapper>
            </AnimatedWrapper>
          </Card>
        </section>

        <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>}>
          <section id="transformations" className="scroll-mt-24 mb-16 lg:mb-24">
            <BeforeAfterTransformation />
          </section>
        </Suspense>

        <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>}>
          <section id="motivation" className="scroll-mt-24 mb-16 lg:mb-24">
            <MotivationSection />
          </section>
        </Suspense>

        <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>}>
          <section id="bonuses" className="scroll-mt-24 mb-16 lg:mb-24">
            <BonusSection />
          </section>
        </Suspense>

        <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>}>
          <section id="testimonials" className="scroll-mt-24 mb-16 lg:mb-24">
            <Testimonials />
          </section>
        </Suspense>

        <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>}>
          <section id="guarantee" className="scroll-mt-24 mb-16 lg:mb-24">
            <GuaranteeSection />
          </section>
        </Suspense>

        <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>}>
          <section id="mentor" className="scroll-mt-24 mb-16 lg:mb-24">
            <MentorSection />
          </section>
        </Suspense>

        {/* CTA FINAL - BOLINHAS REMOVIDAS DOS SELOS */}
        <section id="cta" className="scroll-mt-24 mb-16">
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-[#fff7f3] to-[#f9f4ef] border-2 border-[#B89B7A]/20 rounded-3xl p-8 lg:p-12" 
                style={{ boxShadow: tokens.shadows.xl }}>
            
            <div className="absolute inset-0 bg-gradient-to-br from-[#B89B7A]/5 via-transparent to-[#aa6b5d]/5 pointer-events-none"></div>
            
            <AnimatedWrapper animation="fade" show={true} duration={600}>
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#ff8c42] text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
                    <Clock className="w-4 h-4" />
                    Oferta por tempo limitado
                  </div>
                  
                  <h2 className="text-3xl lg:text-5xl font-playfair font-bold text-[#2C1810] mb-6 leading-tight">
                    Transforme Seu Estilo
                    <br />
                    <span className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                      Hoje Mesmo!
                    </span>
                  </h2>
                  
                  <div className="bg-gradient-to-r from-[#2C1810] to-[#5D4A3A] text-white px-6 py-3 rounded-full inline-block mb-8">
                    <div className="flex items-center gap-4 text-lg font-bold">
                      <Clock className="w-5 h-5" />
                      <span>
                        {String(timer.hours).padStart(2, '0')}:
                        {String(timer.minutes).padStart(2, '0')}:
                        {String(timer.seconds).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xl text-[#5D4A3A] max-w-3xl mx-auto leading-relaxed mb-8">
                    Não perca mais tempo se sentindo perdida no guarda-roupa. 
                    <strong className="text-[#aa6b5d]"> Descubra seu estilo único</strong> e transforme sua autoestima para sempre!
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="space-y-6">
                    <div className="bg-white/80 rounded-2xl p-6 border border-[#B89B7A]/10" style={{ boxShadow: tokens.shadows.md }}>
                      <h3 className="text-2xl font-bold text-[#2C1810] mb-4">O que você vai receber:</h3>
                      <ul className="space-y-3">
                        {[
                          'Guia de Estilo Personalizado completo',
                          'Análise detalhada do seu perfil',
                          'Dicas de combinações para cada ocasião',
                          'Guia de cores que valorizam você',
                          'Bônus exclusivos (+ de R$ 200 em valor)',
                          'Acesso vitalício ao conteúdo',
                          'Suporte especializado'
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                            <span className="text-[#2C1810] font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="text-2xl text-[#8F7A6A] line-through">R$ 197,00</span>
                        <span className="text-4xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                          R$ 39,90
                        </span>
                      </div>
                      <p className="text-lg text-[#5D4A3A] mb-2">ou</p>
                      <p className="text-2xl font-bold text-[#2C1810]">
                        5x de <span className="text-[#4CAF50]">R$ 8,83</span>
                      </p>
                      <p className="text-sm text-[#8F7A6A] mt-2">sem juros no cartão</p>
                    </div>
                  </div>

                  <div className="text-center space-y-6">
                    <Button 
                      onClick={handleCTAClick} 
                      className="w-full text-white font-bold py-6 px-8 rounded-2xl shadow-2xl transition-all duration-300 group text-lg"
                      style={{
                        background: 'linear-gradient(135deg, #4CAF50 0%, #43a047 100%)',
                        boxShadow: tokens.shadows.cta,
                        fontSize: 'clamp(1rem, 4vw, 1.25rem)',
                        padding: 'clamp(1rem, 4vw, 1.5rem) clamp(1.5rem, 6vw, 2rem)',
                        transform: isButtonHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                      }}
                      onMouseEnter={() => setIsButtonHovered(true)} 
                      onMouseLeave={() => setIsButtonHovered(false)}
                      type="button"
                    >
                      <span className="flex items-center justify-center gap-3">
                        <ShoppingCart className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                        Quero Transformar Meu Estilo Agora
                      </span>
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center justify-center gap-2 bg-white/60 rounded-lg py-3 px-4 border border-[#B89B7A]/10">
                        <Shield className="w-4 h-4 text-[#4CAF50]" />
                        <span className="font-medium text-[#2C1810]">Pagamento 100% Seguro</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 bg-white/60 rounded-lg py-3 px-4 border border-[#B89B7A]/10">
                        <Zap className="w-4 h-4 text-[#4CAF50]" />
                        <span className="font-medium text-[#2C1810]">Acesso Imediato</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 bg-white/60 rounded-lg py-3 px-4 border border-[#B89B7A]/10">
                        <Award className="w-4 h-4 text-[#4CAF50]" />
                        <span className="font-medium text-[#2C1810]">Garantia de 7 Dias</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 bg-white/60 rounded-lg py-3 px-4 border border-[#B89B7A]/10">
                        <Clock className="w-4 h-4 text-[#FF6B35]" />
                        <span className="font-medium text-[#2C1810]">Oferta por tempo limitado</span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-[#4CAF50]/10 to-[#43a047]/10 rounded-xl p-4 border border-[#4CAF50]/20">
                      <p className="text-sm text-[#2C1810] font-medium">
                        <span className="text-[#4CAF50] font-bold">🎉 Desconto de 80%</span> válido apenas hoje!
                        <br />
                        <span className="text-xs text-[#5D4A3A]">Depois volta para R$ 197,00</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedWrapper>
          </Card>
        </section>
      </main>

      <BuildInfo />
    </div>
  );
};

export default ResultPage;