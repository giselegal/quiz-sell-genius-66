// ✅ TESTE - Arquivo ResultPage atualizado - 23/05/2025
import React, { useEffect, useState, Suspense, lazy, useCallback } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
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
import BuildInfo from '@/components/BuildInfo';
import SecurePurchaseElement from '@/components/result/SecurePurchaseElement';
import { useAuth } from '@/context/AuthContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import ProgressiveImage from '@/components/ui/progressive-image';
import ResourcePreloader from '@/components/result/ResourcePreloader';
import PerformanceMonitor from '@/components/result/PerformanceMonitor';

// Seções carregadas via lazy
const BeforeAfterTransformation = lazy(() => import('@/components/result/BeforeAfterTransformation4'));
const MotivationSection = lazy(() => import('@/components/result/MotivationSection'));
const BonusSection = lazy(() => import('@/components/result/BonusSection'));
const Testimonials = lazy(() => import('@/components/quiz-result/sales/Testimonials'));
const GuaranteeSection = lazy(() => import('@/components/result/GuaranteeSection'));
const MentorSection = lazy(() => import('@/components/result/MentorSection'));

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
    textLight: '#8F7A6A', // Usado para subtítulos grandes ou texto menos crítico
    textMuted: '#6B5B4E', // Nova cor para melhor contraste em textos secundários menores
    success: '#4CAF50',
    successDark: '#45a049',
    border: 'rgba(184, 155, 122, 0.2)',
    borderLight: 'rgba(184, 155, 122, 0.1)',
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
      backgroundColor: globalStyles.backgroundColor || tokens.colors.background,
      color: globalStyles.textColor || tokens.colors.text,
      fontFamily: globalStyles.fontFamily || 'inherit'
    }}>
      {/* Custom scrollbar styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          ::-webkit-scrollbar {
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

      {/* Preloaders and monitors */}
      <ResourcePreloader />
      <PerformanceMonitor />
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#B89B7A]/10 to-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-[#aa6b5d]/10 to-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute top-1/3 left-0 w-1/5 h-1/5 bg-gradient-to-r from-[#B89B7A]/5 to-[#aa6b5d]/5 rounded-full blur-3xl -translate-x-1/2"></div>
      
      {/* Header - Super simplificado */}
      <header className="py-4 px-6 sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl flex justify-center">
          <img
            src={globalStyles.logo}
            alt={globalStyles.logoAlt || "Logo"}
            style={{ height: globalStyles.logoHeight || '60px' }}
            className="h-auto object-contain"
          />
        </div>
      </header>

      {/* Navigation dots (only visible on scroll) */}
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
            onClick={handleCTAClick} 
            className="text-white text-sm sm:text-base leading-none py-3 px-6 rounded-md shadow-md transition-all duration-300 w-full sm:w-auto cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${tokens.colors.primary}, ${tokens.colors.secondary})`,
              boxShadow: '0 4px 14px rgba(184, 155, 122, 0.4)',
              transform: isButtonHovered ? 'translateY(-2px)' : 'translateY(0)',
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
        {/* Primary Style Card - VISUAL CONSISTENCY */}
        <section id="primary-style" className="scroll-mt-20">
          <Card className="p-6 lg:p-8 mb-12 bg-white border border-[#B89B7A]/20 rounded-xl overflow-hidden relative" 
                style={{ boxShadow: tokens.shadows.lg }}>
            {/* DECORATIVE CORNERS - RESPONSIVOS */}
            <div className="absolute top-0 left-0 w-12 lg:w-16 h-12 lg:h-16 border-t-2 border-l-2 border-[#B89B7A]/30 rounded-tl-xl"></div>
            <div className="absolute bottom-0 right-0 w-12 lg:w-16 h-12 lg:h-16 border-b-2 border-r-2 border-[#B89B7A]/30 rounded-br-xl"></div>
            
            <AnimatedWrapper animation="fade" show={true} duration={600} delay={300}>
              {/* HEADER SECTION */}
              <div className="text-center mb-8">
                {user?.userName && (
                  <AnimatedWrapper className="mb-6" animation="scale" show={true} duration={500} delay={200}>
                    <span className="text-xl lg:text-2xl text-[#aa6b5d] font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                      Parabéns, {user.userName}!
                    </span>
                    <div className="w-12 h-px bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] mx-auto mt-2"></div>
                  </AnimatedWrapper>
                )}
                
                {/* TÍTULO OTIMIZADO */}
                <h1 className="text-xl lg:text-3xl font-playfair text-[#432818] mb-6 leading-tight">
                  Descobrimos Seu Estilo Predominante:
                  <br />
                  <span className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                    {category}
                  </span>
                </h1>
                
                {/* PROGRESS BAR - RESPONSIVO */}
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

              {/* MAIN CONTENT GRID - OTIMIZADO */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="space-y-6 order-2 lg:order-1">
                  <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={400}>
                    <div className="space-y-4">
                      <p className="text-[#432818] leading-relaxed text-base lg:text-lg font-medium">
                        <strong>Agora você tem clareza total</strong> sobre quem você é e como expressar sua personalidade através do seu estilo!
                      </p>
                      
                      {/* STYLE DESCRIPTION - MELHORADA */}
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
                      
                      <p className="text-sm lg:text-base" style={{ color: tokens.colors.textMuted }}>
                        <strong>Chega de ficar perdida no guarda-roupa ou comprar peças que não combinam com você!</strong>
                      </p>
                    </div>
                  </AnimatedWrapper>

                  {/* SECONDARY STYLES - OTIMIZADO */}
                  <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={600}>
                    <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-lg p-5 border border-[#B89B7A]/10"
                         style={{ boxShadow: tokens.shadows.sm }}>
                      <h3 className="text-lg font-medium text-[#aa6b5d] mb-3">Estilos que Também Influenciam Você</h3>
                      <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                    </div>
                  </AnimatedWrapper>
                </div>

                {/* IMAGE SECTION - OTIMIZADA */}
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
                    
                    {/* DECORATIVE CORNERS - RESPONSIVOS */}
                    <div className="absolute -top-2 -right-2 w-8 lg:w-10 h-8 lg:h-10 border-t-2 border-r-2 border-[#B89B7A] rounded-tr-lg"></div>
                    <div className="absolute -bottom-2 -left-2 w-8 lg:w-10 h-8 lg:h-10 border-b-2 border-l-2 border-[#B89B7A] rounded-bl-lg"></div>
                    
                    {/* STYLE BADGE - CONSISTENTE */}
                    <div className="absolute -top-3 -left-3 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium transform -rotate-12"
                         style={{ boxShadow: tokens.shadows.sm }}>
                      {category}
                    </div>
                  </div>
                </AnimatedWrapper>
              </div>
              
              {/* GUIDE IMAGE - OTIMIZADA */}
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={800}>
                <div className="mt-12 max-w-2xl mx-auto relative">
                  <h3 className="text-xl lg:text-2xl font-medium text-center text-[#aa6b5d] mb-6">
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
                  
                  {/* BADGE CONSISTENTE */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-3 py-1 rounded-full text-xs font-medium transform rotate-12"
                       style={{ boxShadow: tokens.shadows.sm }}>
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
            Antes e Depois na Prática
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

          {/* REMOVER CTA INTERMEDIÁRIO */}
          {/* CTA após transformações removido para não saturar */}
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
              <p className="text-[#8F7A6A]">Carregando conteúdo...</p>
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
            subtitle={`Ferramentas extras para você dominar completamente seu estilo ${category}`}
          >
            Bônus Exclusivos
          </SectionTitle>
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
              <p className="text-[#8F7A6A]">Carregando depoimentos...</p>
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
            subtitle={`Teste seu novo estilo ${category} por 7 dias. Se não amar, devolvemos seu dinheiro`}
          >
            Garantia Incondicional
          </SectionTitle>
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
        
        {/* Mentor Section */}
        <section id="mentor" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          <SectionTitle 
            variant="simple"
            subtitle="Especialista que já guiou mais de 10.000 mulheres na descoberta do seu estilo autêntico"
          >
            Quem Criou Seu Guia
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

        {/* SEÇÃO DE TRANSIÇÃO MELHORADA */}
        <div className="mb-12 md:mb-16">
          <div className="text-center py-12 md:py-16 relative">
            {/* Background decorativo */}
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
        
        {/* Final CTA Section - OTIMIZADA */}
        <section id="cta" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20 bg-white rounded-xl p-6 lg:p-12 border border-[#B89B7A]/20 text-center relative overflow-hidden"
                 style={{ boxShadow: tokens.shadows.xl }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#fff7f3]/30 to-[#f9f4ef]/30 pointer-events-none"></div>
          
          <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={600} delay={300}>
            {/* CTA HEADER - OTIMIZADO */}
            <div className="relative z-10 mb-12">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                <div className="w-4 h-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full animate-pulse"
                     style={{ boxShadow: tokens.shadows.sm }}></div>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
              </div>
              
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
            
            {/* PRODUCTS PREVIEW - GRID OTIMIZADO E RESPONSIVO MELHORADO */}
            <div className="mb-12 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-10">
                {[
                  {
                    src: (() => {
                      const guideImages = {
                        'Natural': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
                        'Clássico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp',
                        'Contemporâneo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp',
                        'Elegante': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_ELEGANTE_asez1q.webp',
                        'Romântico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp',
                        'Sexy': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071349/GUIA_SEXY_t5x2ov.webp',
                        'Dramático': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp',
                        'Criativo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_CRIATIVO_ntbzph.webp'
                      };
                      return guideImages[category] || guideImages['Natural'];
                    })(),
                    title: `Manual de Estilo ${category}`,
                    subtitle: 'Descubra combinações infalíveis de cores, tecidos e acessórios que valorizam sua personalidade única, transformando seu guarda-roupa em uma poderosa ferramenta de comunicação visual e autoexpressão.',
                    badge: 'GUIA PRINCIPAL',
                    priority: true
                  },
                  {
                    src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745515075/Espanhol_Portugu%C3%AAs_1_uru4r3.png',
                    title: 'Guia das Peças Estratégicas',
                    subtitle: 'Peças-chave cuidadosamente selecionadas que maximizam combinações, economizam dinheiro e garantem versatilidade em qualquer situação do seu dia a dia.',
                    badge: 'BÔNUS EXCLUSIVO',
                    priority: false
                  },
                  {
                    src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.png',
                    title: 'Manual de Visagismo Pessoal',
                    subtitle: 'Descubra os cortes de cabelo, cores e acessórios ideais para seu tipo facial, realçando sua beleza natural com dicas profissionais de visagismo aplicado.',
                    badge: 'BÔNUS PREMIUM',
                    priority: false
                  }
                ].map((product, index) => (
                  <div key={index} className={`bg-gradient-to-br from-white to-[#fff7f3] rounded-xl p-5 lg:p-6 border border-[#B89B7A]/15 transition-all duration-300 hover:scale-105 hover:shadow-lg relative ${index === 2 ? 'md:col-span-2 xl:col-span-1' : ''}`}
                       style={{ boxShadow: tokens.shadows.md }}>
                    
                    {/* BADGE DO PRODUTO - MELHOR CONTRASTE */}
                    <div className="absolute -top-3 -right-3 z-10">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full text-white shadow-md ${index === 0 ? 'bg-gradient-to-r from-[#aa6b5d] to-[#B89B7A]' : 'bg-gradient-to-r from-[#4CAF50] to-[#45a049]'}`}>
                        {product.badge}
                      </span>
                    </div>

                    {/* IMAGEM DO PRODUTO - PROPORÇÕES MELHORADAS */}
                    <div className="w-full bg-white rounded-lg mb-5 flex items-center justify-center relative overflow-hidden p-4"
                         style={{ 
                           boxShadow: tokens.shadows.sm,
                           minHeight: '280px',
                           maxHeight: '320px'
                         }}>
                      <ProgressiveImage 
                        src={`${product.src}?q=85&f=auto&w=400`}
                        alt={product.title}
                        className="w-full h-full object-contain rounded-lg transition-transform duration-300 hover:scale-105"
                        loading={product.priority ? "eager" : "lazy"}
                        fetchPriority={product.priority ? "high" : "low"}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          width: 'auto',
                          height: 'auto'
                        }}
                      />
                      
                      {/* OVERLAY DE HOVER */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#B89B7A]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
                    </div>

                    {/* INFORMAÇÕES DO PRODUTO - ESPAÇAMENTO MELHORADO */}
                    <div className="text-left min-h-[140px] flex flex-col">
                      <h4 className="font-bold text-[#432818] text-base lg:text-lg mb-3 leading-tight line-height-1.2">
                        {product.title}
                      </h4>
                      <p className="text-sm lg:text-base flex-1 leading-relaxed line-height-1.4" style={{ color: tokens.colors.textMuted }}>
                        {product.subtitle}
                      </p>
                    </div>

                    {/* INDICADOR DE VALOR - VISUAL MELHORADO */}
                    <div className="mt-4 pt-4 border-t border-[#B89B7A]/15">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium" style={{ color: tokens.colors.textMuted }}>
                          {index === 0 ? '📖 Produto Principal' : '🎁 Incluído Grátis'}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${index === 0 ? 'bg-gradient-to-r from-[#aa6b5d] to-[#B89B7A]' : 'bg-gradient-to-r from-[#4CAF50] to-[#45a049]'}`}></div>
                          <span className={`text-sm font-semibold ${index === 0 ? 'text-[#aa6b5d]' : 'text-[#4CAF50]'}`}>
                            {index === 0 ? 'Personalizado' : 'Bônus'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* RESUMO DO VALOR - CONTRASTE E HIERARQUIA MELHORADOS */}
              <div className="bg-gradient-to-br from-[#fff7f3] to-[#f9f4ef] rounded-2xl p-6 lg:p-8 border border-[#B89B7A]/25 max-w-3xl mx-auto relative overflow-hidden"
                   style={{ boxShadow: tokens.shadows.lg }}>
                
                {/* BACKGROUND DECORATIVO */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#B89B7A]/5 to-transparent rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#aa6b5d]/5 to-transparent rounded-full"></div>
                
                <div className="relative z-10">
                  <h4 className="font-bold text-[#432818] mb-6 text-center text-lg lg:text-xl">
                    🎯 Seu Kit Completo de Transformação
                  </h4>
                  
                  <div className="space-y-4">
                    {/* Item Principal - DESTAQUE MELHORADO */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 p-5 bg-white/80 rounded-xl border border-[#B89B7A]/20 relative"
                         style={{ boxShadow: tokens.shadows.md }}>
                      
                      {/* BADGE DE DESTAQUE */}
                      <div className="absolute -top-2 -left-2 bg-gradient-to-r from-[#aa6b5d] to-[#B89B7A] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        ⭐ PRINCIPAL
                      </div>
                      
                      <div className="flex items-start gap-4 flex-1 pt-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex-shrink-0 mt-1.5"></div>
                        <div className="leading-relaxed">
                          <span className="block text-[#432818] font-bold mb-2 text-base lg:text-lg">
                            Manual Personalizado do Estilo {category}
                          </span>
                          {secondaryStyles && secondaryStyles.length > 0 && (
                            <span className="block text-sm mb-3 leading-relaxed" style={{ color: tokens.colors.textMuted }}>
                              ✨ Inclui elementos dos estilos: <strong className="text-[#aa6b5d]">{secondaryStyles.slice(0, 2).map(style => style.category).join(' e ')}</strong>
                            </span>
                          )}
                          <span className="inline-block text-xs bg-gradient-to-r from-[#B89B7A]/15 to-[#aa6b5d]/15 text-[#432818] px-3 py-1.5 rounded-full font-medium border border-[#B89B7A]/20">
                            📚 Guia Personalizado
                          </span>
                        </div>
                      </div>
                      <div className="text-center lg:text-right flex-shrink-0">
                        <div className="text-sm">
                          <span className="text-[#aa6b5d] font-bold text-base block">INCLUÍDO</span>
                          <span className="line-through text-gray-500">de R$ 79,00</span>
                        </div>
                      </div>
                    </div>

                    {/* Bônus 1 - VISUAL CONSISTENTE */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 p-4 bg-white/60 rounded-xl border border-[#B89B7A]/10">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-2 h-2 bg-[#4CAF50] rounded-full flex-shrink-0 mt-2"></div>
                        <div className="leading-relaxed">
                          <span className="block text-[#432818] font-semibold mb-1">Guia das Peças Estratégicas</span>
                          <span className="text-sm leading-relaxed" style={{ color: tokens.colors.textMuted }}>
                            Lista das 15 peças essenciais para maximizar seu guarda-roupa
                          </span>
                        </div>
                      </div>
                      <div className="text-center lg:text-right flex-shrink-0">
                        <div className="text-sm">
                          <span className="text-[#4CAF50] font-bold">BÔNUS GRÁTIS</span>
                          <br />
                          <span className="line-through text-gray-500">R$ 59,00</span>
                        </div>
                      </div>
                    </div>

                    {/* Bônus 2 - VISUAL CONSISTENTE */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 p-4 bg-white/60 rounded-xl border border-[#B89B7A]/10">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-2 h-2 bg-[#4CAF50] rounded-full flex-shrink-0 mt-2"></div>
                        <div className="leading-relaxed">
                          <span className="block text-[#432818] font-semibold mb-1">Manual de Visagismo Personalizado</span>
                          <span className="text-sm leading-relaxed" style={{ color: tokens.colors.textMuted }}>
                            Cortes, cores e acessórios ideais para seu formato de rosto
                          </span>
                        </div>
                      </div>
                      <div className="text-center lg:text-right flex-shrink-0">
                        <div className="text-sm">
                          <span className="text-[#4CAF50] font-bold">BÔNUS GRÁTIS</span>
                          <br />
                          <span className="line-through text-gray-500">R$ 37,00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resumo Final - HIERARQUIA MELHORADA */}
                  <div className="border-t border-[#B89B7A]/25 mt-6 pt-6">
                    {/* ALERTA DE OFERTA - VISUAL MELHORADO */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4 mb-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5"></div>
                      <p className="text-red-700 text-base font-bold text-center relative z-10 flex items-center justify-center gap-2">
                        🔥 OFERTA EXCLUSIVA - QUIZ COMPLETO
                        <span className="animate-pulse">⚡</span>
                      </p>
                    </div>
                    
                    <div className="text-center space-y-3">
                      <p className="text-base leading-relaxed" style={{ color: tokens.colors.textMuted }}>
                        <span className="font-semibold text-[#432818]">Valor individual dos produtos:</span> 
                        <span className="line-through font-bold ml-2 text-lg text-gray-500">R$ 175,00</span>
                      </p>
                      
                      <div className="flex items-center justify-center gap-4 my-4">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                        <span className="text-xl font-bold text-[#432818] whitespace-nowrap">Seu Investimento Hoje</span>
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                      </div>
                      
                      <div className="mb-4">
                        <span className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                          R$ 39,90
                        </span>
                        <p className="text-base mt-2 leading-relaxed" style={{ color: tokens.colors.textMuted }}>
                          ou <strong className="text-[#432818] text-lg">5x de R$ 8,83</strong> sem juros
                        </p>
                      </div>
                      
                      <div className="inline-flex items-center gap-3 bg-green-50 px-4 py-3 rounded-xl border-2 border-green-200 mb-4">
                        <span className="text-green-700 font-bold text-base">
                          💰 Você economiza R$ 135,10 (77% OFF)
                        </span>
                      </div>
                      
                      <div className="inline-flex items-center justify-center gap-3 bg-orange-50 px-4 py-3 rounded-xl border-2 border-orange-200">
                        <Hourglass className="w-5 h-5 text-orange-600" 
                                   style={{ 
                                     animation: 'spin 3s linear infinite',
                                     transformOrigin: 'center'
                                   }} />
                        <span className="text-sm text-orange-700 font-semibold text-center leading-tight max-w-xs">
                          Esta oferta expira quando você sair desta página
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA BUTTON - ÁREA DE TOQUE MELHORADA */}
              <div className="text-center mb-10 relative z-10 flex justify-center mt-8">
                <button
                  onClick={handleCTAClick} 
                  className="text-white leading-none transition-all duration-300 cursor-pointer font-bold group relative overflow-hidden border-0 outline-none focus:outline-none focus:ring-4 focus:ring-[#B89B7A]/30 focus:ring-offset-2 text-base lg:text-lg"
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
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                    e.currentTarget.style.boxShadow = tokens.shadows.xl;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = tokens.shadows.cta;
                  }}
                  type="button"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-bold relative z-10">
                    <span className="hidden sm:inline">Garantir Minha Transformação</span>
                    <span className="sm:hidden">Garantir Transformação</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 group-hover:animate-pulse rounded-lg"></div>
                </button>
              </div>

              {/* TRUST ELEMENTS - ESPAÇAMENTO E VISUAL MELHORADOS */}
              <div className="flex items-center justify-center gap-8 text-sm flex-wrap mt-8 px-4">
                <div className="inline-flex items-center gap-3 bg-[#fff7f3] px-5 py-3 rounded-full border border-[#B89B7A]/25 transition-transform duration-300 hover:scale-105"
                     style={{ boxShadow: tokens.shadows.sm }}>
                  <div className="w-2.5 h-2.5 bg-[#aa6b5d] rounded-full animate-pulse"></div>
                  <span className="text-sm text-[#432818] font-semibold">
                    ⚡ Acesso imediato
                  </span>
                </div>
                
                <p className="text-sm font-medium max-w-md mx-auto text-center leading-relaxed" style={{ color: tokens.colors.textMuted }}>
                  🔒 <strong className="text-[#432818]">Pagamento 100% seguro</strong> • <strong className="text-[#432818]">Site confiável</strong>
                </p>
              </div>
            </div>
          </AnimatedWrapper>
        </section>

        {/* BOTTOM SPACING */}
        <div className="mb-16 md:mb-24"></div>
      </div>
    </div>
  );
};

export default ResultPage;