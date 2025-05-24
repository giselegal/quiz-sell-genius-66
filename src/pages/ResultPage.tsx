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
    textLight: '#706156', // Ajuste no contraste do texto
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
                        <p className="text-[#504136] text-sm lg:text-base leading-relaxed">
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
                      
                      <p className="text-[#8F7A6A] text-sm lg:text-base">
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
                      srcSet={`${image}?q=85&f=auto&w=400 400w, ${image}?q=85&f=auto&w=800 800w`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33.3vw"
                      alt={`Estilo ${category}`} 
                      width={400} 
                      height={500} 
                      className="w-full h-auto rounded-lg transition-transform duration-300 hover:scale-105" 
                      style={{ boxShadow: tokens.shadows.md }}
                      loading="eager" 
                      fetchPriority="high" 
                      // Adicionando role e aria-label para acessibilidade
                      role="img"
                      aria-label={`Imagem do estilo ${category}`}
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
                    // Adicionando role e aria-label para acessibilidade
                    role="img"
                    aria-label={`Guia de Estilo ${category}`}
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
        <section id="transformations" className="scroll-mt-20 mb-20">
          <SectionTitle 
            variant="simple"
            subtitle="Veja mulheres reais que descobriram seu estilo e transformaram completamente sua relação com Estilo, Imagem e Presença"
          >
            Transformações Que Inspiram
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
        <section id="motivation" className="scroll-mt-20 mb-20">
          <SectionTitle 
            variant="secondary"
            subtitle="Sua jornada de autoconhecimento através do Estilo e Imagem começa agora"
          >
            O Poder de Vestir-se de Você
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
        <section id="bonuses" className="scroll-mt-20 mb-20">
          <SectionTitle 
            variant="simple"
            subtitle="Materiais exclusivos para acelerar sua transformação (sem custo adicional)"
          >
            Bônus Especiais Inclusos
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
        <section id="testimonials" className="scroll-mt-20 mb-20">
          <SectionTitle 
            variant="simple"
            subtitle="Histórias reais de mulheres que saíram da frustração para a confiança total"
          >
            Resultados Que Falam Por Si
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
        <section id="guarantee" className="scroll-mt-20 mb-20">
          <SectionTitle 
            variant="simple"
            subtitle="Teste por 7 dias. Se não transformar sua relação com seu Estilo e Presença, devolvemos seu dinheiro"
          >
            Garantia Blindada
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
        <section id="mentor" className="scroll-mt-20 mb-20">
          <SectionTitle 
            variant="simple"
            subtitle="A especialista que já ajudou +de 3.000 mulheres a descobrirem seu estilo autêntico"
          >
            Sua Mentora de Imagem e Estilo
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
        <div className="mb-16">
          <div className="text-center py-16 relative">
            {/* Background decorativo */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#fff7f3]/50 to-[#f9f4ef]/50 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent mx-auto mb-8"></div>
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-[#432818] mb-4">
                Chegou o Momento de Agir
              </h3>
              <p className="text-lg text-[#8F7A6A] font-medium max-w-md mx-auto">
                Tudo que você precisa para aplicar seu Estilo Pessoal
              </p>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent mx-auto mt-8"></div>
            </div>
          </div>
        </div>
        
        {/* Final CTA Section - OTIMIZADA */}
        <section id="cta" className="scroll-mt-20 mb-20 bg-white rounded-xl p-6 lg:p-12 border border-[#B89B7A]/20 text-center relative overflow-hidden"
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
                  Transforme Seu Guarda-Roupa
                </span>
                <br />
                <span className="text-[#aa6b5d]">Hoje Mesmo!</span>
              </h2>
              
              <p className="text-xl text-[#8F7A6A] mb-8">
                Seu Guia personalizado {category} + materiais exclusivos de Estilo e Imagem
              </p>
            </div>
            
            {/* PRODUCTS PREVIEW - GRID OTIMIZADO */}
            <div className="mb-12 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto mb-10">
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
                    badge: 'GUIA'
                  },
                  {
                    src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745515075/Espanhol_Portugu%C3%AAs_1_uru4r3.png',
                    title: 'Guia das Peças Estratégicas',
                    subtitle: 'Peças-chave cuidadosamente selecionadas que maximizam combinações, economizam dinheiro e garantem versatilidade em qualquer situação',
                    badge: 'BÔNUS EXCLUSIVO'
                  },
                  {
                    src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.png',
                    title: 'Manual de Visagismo Pessoal',
                    subtitle: 'Descubra os cortes de cabelo e acessórios ideais para seu tipo facial, realçando sua beleza natural com dicas profissionais de visagismo',
                    badge: 'BÔNUS PREMIUM'
                  }
                ].map((product, index) => (
                  <div key={index} className={`bg-gradient-to-br from-white to-[#fff7f3] rounded-xl p-4 border border-[#B89B7A]/10 transition-transform duration-300 hover:scale-105 relative ${index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                       style={{ boxShadow: tokens.shadows.sm }}>
                    
                    {/* BADGE DO PRODUTO */}
                    <div className="absolute -top-2 -right-2 z-10">
                      <span className="text-xs font-bold px-2 py-1 rounded-full text-white shadow-sm bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]">
                        {product.badge}
                      </span>
                    </div>

                    {/* IMAGEM DO PRODUTO */}
                    <div className="aspect-[4/5] bg-white rounded-lg mb-4 flex items-center justify-center relative overflow-hidden"
                         style={{ boxShadow: tokens.shadows.sm }}>
                      <ProgressiveImage 
                        src={product.src}
                        alt={product.title}
                        className="w-full h-full object-contain rounded-lg"
                        loading="lazy"
                      />
                    </div>

                    {/* INFORMAÇÕES DO PRODUTO - LAYOUT MELHORADO */}
                    <div className="text-left min-h-[120px] flex flex-col">
                      <h4 className="font-bold text-[#432818] text-sm lg:text-base mb-2 leading-tight">
                        {product.title}
                      </h4>
                      <p className="text-xs lg:text-sm text-[#8F7A6A] leading-relaxed flex-1 overflow-hidden">
                        {product.subtitle}
                      </p>
                    </div>

                    {/* INDICADOR DE VALOR */}
                    <div className="mt-3 pt-3 border-t border-[#B89B7A]/10">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#8F7A6A]">
                          {index === 0 ? 'Produto Principal' : 'Incluído Grátis'}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full"></div>
                          <span className="text-xs font-medium text-[#aa6b5d]">
                            {index === 0 ? 'Personalizado' : 'Bônus'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* RESUMO DO VALOR MELHORADO */}
              <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-xl p-4 lg:p-6 border border-[#B89B7A]/20 max-w-2xl mx-auto">
                <h4 className="font-bold text-[#432818] mb-4 text-center lg:text-left">Tudo que você recebe hoje:</h4>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 p-3 bg-white/50 rounded-lg">
                    <div className="flex items-start gap-2 flex-1">
                      <div className="w-1.5 h-1.5 bg-[#B89B7A] rounded-full flex-shrink-0 mt-2"></div>
                      <div className="text-sm text-[#8F7A6A] leading-relaxed">
                        <span className="block">Manual completo do seu <strong>Estilo {category}</strong> Predominante </span>
                        {secondaryStyles && secondaryStyles.length > 0 && (
                          <span className="block text-xs mt-1">+ <strong>{secondaryStyles.slice(0, 2).map(style => style.category).join(' + ')}</strong> - Complementares</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right sm:text-right ml-auto sm:ml-0 flex-shrink-0">
                      <div className="text-xs text-[#8F7A6A]">
                        <span className="line-through block">R$ 79,00</span>
                        <span className="text-[#aa6b5d] font-medium">Incluído</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-white/50 rounded-lg">
                    <div className="flex items-start gap-2 flex-1">
                      <div className="w-1.5 h-1.5 bg-[#B89B7A] rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-sm text-[#8F7A6A] leading-relaxed">Guia das Peças Estratégicas</span>
                    </div>
                    <div className="text-right ml-auto sm:ml-0 flex-shrink-0">
                      <div className="text-xs text-[#8F7A6A]">
                        <span className="line-through block">R$ 59,00</span>
                        <span className="text-[#aa6b5d] font-medium">Bônus Grátis</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-white/50 rounded-lg">
                    <div className="flex items-start gap-2 flex-1">
                      <div className="w-1.5 h-1.5 bg-[#B89B7A] rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-sm text-[#8F7A6A] leading-relaxed">Manual de visagismo para valorizar sua beleza única</span>
                    </div>
                    <div className="text-right ml-auto sm:ml-0 flex-shrink-0">
                      <div className="text-xs text-[#8F7A6A]">
                        <span className="line-through block">R$ 37,00</span>
                        <span className="text-[#aa6b5d] font-medium">Bônus Grátis</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#B89B7A]/20 mt-4 pt-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      <p className="text-red-700 text-sm font-bold">
                        🔥 OFERTA EXCLUSIVA PARA QUEM FEZ O QUIZ
                      </p>
                    </div>
                    
                    <p className="text-sm text-[#8F7A6A] mb-2">Tudo isso deveria custar: <span className="line-through font-medium">R$ 175,00</span></p>
                    <p className="text-lg font-bold text-[#432818] mb-4">Seu preço Especial Hoje:</p>
                    <div className="mb-4">
                      <span className="text-5xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                        R$ 39,90
                      </span>
                      <p className="text-sm text-[#8F7A6A] mt-2">ou 5x de R$ 8,83</p>
                    </div>
                    
                    <div className="inline-flex items-center gap-2 mb-4">
                      <span className="text-[#aa6b5d] text-xs font-bold">
                        Economia de R$ 135,10 (77% OFF)
                      </span>
                    </div>
                    
                    <div className="inline-flex items-center justify-center gap-2 bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
                      <Hourglass className="w-4 h-4 text-orange-600 animate-spin" 
                                 style={{ 
                                   animation: 'spin 3s linear infinite',
                                   transformOrigin: 'center'
                                 }} />
                      <span className="text-xs text-orange-700 font-medium text-center leading-tight">
                        Esta oferta expira quando você sair desta página
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA BUTTON - OTIMIZADO */}
              <div className="text-center mb-10 relative z-10 flex justify-center">
                <button
                  onClick={handleCTAClick} 
                  className="text-white leading-none transition-all duration-300 cursor-pointer font-bold group relative overflow-hidden border-0 outline-none focus:outline-none focus:ring-2 focus:ring-[#B89B7A]/50 focus:ring-offset-2 text-sm sm:text-base lg:text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.secondary})`,
                    boxShadow: tokens.shadows.cta,
                    borderRadius: tokens.radius.lg,
                    padding: '0.875rem 1.5rem',
                    minHeight: '48px',
                    width: '100%',
                    maxWidth: '420px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = tokens.shadows.xl;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = tokens.shadows.cta;
                  }}
                  type="button"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold">
                    <span className="hidden sm:inline">Garantir Minha Transformação</span>
                    <span className="sm:hidden">Garantir Transformação</span>
                  </span>
                </button>
              </div>

              {/* TRUST ELEMENTS - SPACING PADRONIZADO */}
              <div className="flex items-center justify-center gap-6 lg:gap-8 text-sm text-[#8F7A6A] flex-wrap mt-8 px-4">
                <div className="mt-6 inline-flex items-center gap-2 bg-[#fff7f3] px-4 py-2 rounded-full border border-[#B89B7A]/20"
                     style={{ boxShadow: tokens.shadows.sm }}>
                  <div className="w-2 h-2 bg-[#aa6b5d] rounded-full animate-pulse"></div>
                  <span className="text-sm text-[#432818] font-medium">
                    ⚡ Acesso imediato
                  </span>
                </div>
                
                <p className="text-xs text-[#8F7A6A] mt-6 max-w-md mx-auto">
                  🔒 <strong>Pagamento 100% seguro</strong> • <strong>Site confiável</strong>
                </p>
              </div>
            </AnimatedWrapper>
        </section>

        {/* BOTTOM SPACING */}
        <div className="mb-24"></div>
      </div>
    </div>
  );
};

export default ResultPage;