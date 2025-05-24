// ✅ TESTE - Arquivo ResultPage atualizado - 23/05/2025
import React, { useEffect, useState, Suspense, lazy } from 'react';
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

// Design tokens
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
    success: '#4CAF50',
    successDark: '#45a049',
    border: 'rgba(184, 155, 122, 0.2)',
    borderLight: 'rgba(184, 155, 122, 0.1)',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    highlight: '0 0 15px rgba(184, 155, 122, 0.3)',
    cta: '0 4px 14px rgba(76, 175, 80, 0.4)',
  },
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  }
};

// Componente de título padronizado
const SectionTitle: React.FC<{
  children: React.ReactNode;
  subtitle?: string;
  size?: 'lg' | 'xl';
  className?: string;
}> = ({ children, subtitle, size = 'xl', className = '' }) => (
  <AnimatedWrapper 
    className={`text-center mb-12 ${className}`}
    animation="fade"
    show={true}
    duration={600}
  >
    {/* Decoração superior */}
    <div className="inline-flex items-center gap-3 mb-4">
      <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
      <div className="w-2 h-2 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full shadow-sm"></div>
      <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
    </div>
    
    {/* Título principal */}
    <h2 className={`font-playfair font-bold text-[#432818] mb-4 leading-tight bg-gradient-to-r from-[#432818] via-[#aa6b5d] to-[#432818] bg-clip-text text-transparent ${
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
    
    {/* Linha decorativa inferior */}
    <div className="w-20 h-1 bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] rounded-full mx-auto shadow-sm"></div>
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
        { id: 'primary-style', element: document.getElementById('primary-style') },
        { id: 'transformations', element: document.getElementById('transformations') },
        { id: 'motivation', element: document.getElementById('motivation') },
        { id: 'bonuses', element: document.getElementById('bonuses') },
        { id: 'testimonials', element: document.getElementById('testimonials') },
        { id: 'guarantee', element: document.getElementById('guarantee') },
        { id: 'mentor', element: document.getElementById('mentor') },
        { id: 'cta', element: document.getElementById('cta') },
      ];
      
      // Find the section that is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section.id);
            break;
          }
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
  
  const handleCTAClick = (e) => {
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
  
  const scrollToSection = (sectionId) => {
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
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #B89B7A, #aa6b5d);
          border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #aa6b5d, #B89B7A);
        }
      `}</style>

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

      {/* Sticky CTA - Aparece apenas no final da página */}
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
              background: `linear-gradient(to right, ${tokens.colors.success}, ${tokens.colors.successDark})`,
              boxShadow: tokens.shadows.cta,
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

      <div className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        {/* Primary Style Card - Título melhorado */}
        <section id="primary-style" className="scroll-mt-20">
          <Card className="p-6 mb-10 bg-white shadow-lg border border-[#B89B7A]/20 rounded-xl overflow-hidden relative">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#B89B7A]/30 rounded-tl-xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#B89B7A]/30 rounded-br-xl"></div>
            
            <AnimatedWrapper animation="fade" show={true} duration={600} delay={300}>
              <div className="text-center mb-8">
                {/* Nome do usuário com decoração elegante */}
                {user?.userName && (
                  <AnimatedWrapper 
                    className="mb-6"
                    animation="scale"
                    show={true}
                    duration={500}
                    delay={200}
                  >
                    <div className="inline-flex items-center gap-2 mb-3">
                      <div className="w-6 h-px bg-gradient-to-r from-transparent to-[#B89B7A]"></div>
                      <div className="w-1.5 h-1.5 bg-[#B89B7A] rounded-full"></div>
                      <div className="w-6 h-px bg-gradient-to-l from-transparent to-[#B89B7A]"></div>
                    </div>
                    <span className="text-xl md:text-2xl text-[#aa6b5d] font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                      Olá, {user.userName}!
                    </span>
                    <div className="w-12 h-px bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] mx-auto mt-2"></div>
                  </AnimatedWrapper>
                )}
                
                {/* Título principal do estilo */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-playfair text-[#432818] mb-6 leading-tight">
                  Seu Estilo Predominante é:
                </h1>
                <div className="max-w-md mx-auto mb-6">
                  <div className="flex items-center justify-end text-sm text-[#8F7A6A] mb-2">
                    <span className="font-medium">{primaryStyle.percentage}%</span>
                  </div>
                  <Progress 
                    value={primaryStyle.percentage} 
                    className="h-1.5 bg-[#F5F2EC] rounded-full overflow-hidden shadow-inner" 
                    indicatorClassName="bg-gradient-to-r from-[#B89B7A] via-[#D4B79F] to-[#A1835D] transition-all duration-700 ease-in-out shadow-sm"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6 order-2 md:order-1">
                  <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={400}>
                    <p className="text-[#432818] leading-relaxed text-base md:text-lg">
                      {description.split('você').map((part, index, array) => (
                        <React.Fragment key={index}>
                          {part}
                          {index < array.length - 1 && (
                            <span className="font-bold text-[#aa6b5d] bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                              você
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </p>
                  </AnimatedWrapper>
                  <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={600}>
                    <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-lg p-5 shadow-sm border border-[#B89B7A]/10">
                      <h3 className="text-lg font-medium text-[#aa6b5d] mb-3">Estilos que Também Influenciam Você</h3>
                      <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                    </div>
                  </AnimatedWrapper>
                </div>
                <AnimatedWrapper animation={isLowPerformance ? 'none' : 'scale'} show={true} duration={500} delay={500} className="order-1 md:order-2">
                  <div className="max-w-[214px] md:max-w-[280px] mx-auto relative"> 
                    <ProgressiveImage 
                      src={`${image}?q=85&f=auto&w=280`} 
                      alt={`Estilo ${category}`} 
                      width={280} 
                      height={350} 
                      className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" 
                      loading="eager" 
                      fetchPriority="high" 
                      onLoad={() => setImagesLoaded(prev => ({ ...prev, style: true }))}
                    />
                    {/* Elegant decorative corners - ajustados para mobile menor */}
                    <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-7 h-7 md:w-10 md:h-10 border-t-2 border-r-2 border-[#B89B7A] rounded-tr-lg"></div>
                    <div className="absolute -bottom-1 -left-1 md:-bottom-2 md:-left-2 w-7 h-7 md:w-10 md:h-10 border-b-2 border-l-2 border-[#B89B7A] rounded-bl-lg"></div>
                    
                    {/* Style badge - ajustado para mobile menor */}
                    <div className="absolute -top-1.5 -left-1.5 md:-top-3 md:-left-3 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-2.5 py-0.5 md:px-4 md:py-1 rounded-full shadow-lg text-xs md:text-sm font-medium transform -rotate-12">
                      {category}
                    </div>
                  </div>
                </AnimatedWrapper>
              </div>
              
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={800}>
                <div className="mt-10 max-w-[600px] mx-auto relative">
                  <h3 className="text-xl font-medium text-center text-[#aa6b5d] mb-4">
                    Seu Guia de Estilo Personalizado
                  </h3>
                  <ProgressiveImage 
                    src={`${guideImage}?q=85&f=auto&w=600`} 
                    alt={`Guia de Estilo ${category}`} 
                    loading="lazy" 
                    className="w-full h-auto rounded-lg shadow-lg hover:scale-102 transition-transform duration-300" 
                    onLoad={() => setImagesLoaded(prev => ({ ...prev, guide: true }))} 
                  />
                  {/* Elegant badge - mais 5% menor */}
                  <div className="absolute -top-2.5 -right-2.5 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-2.5 py-1 rounded-full shadow-lg text-xs font-medium transform rotate-12">
                    Exclusivo
                  </div>
                </div>
              </AnimatedWrapper>
            </AnimatedWrapper>
          </Card>
        </section>

        {/* Before/After Transformation Section */}
        <section id="transformations" className="scroll-mt-20 mb-16">
          <SectionTitle>
            Transformações Reais de Mulheres como Você
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

        {/* Motivation Section */}
        <section id="motivation" className="scroll-mt-20 mb-16">
          <SectionTitle 
            subtitle="Descubra o poder de se vestir com propósito e autenticidade"
          >
            A Jornada da Sua Transformação
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
        <section id="bonuses" className="scroll-mt-20 mb-12">
          <SectionTitle 
            subtitle="Materiais exclusivos para acelerar sua transformação de imagem"
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
        <section id="testimonials" className="scroll-mt-20 mb-12">
          <SectionTitle 
            subtitle="Histórias reais de mulheres que transformaram sua relação com a moda"
          >
            O Que Dizem Nossas Clientes
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
        <section id="guarantee" className="scroll-mt-20 mb-12">
          <SectionTitle 
            subtitle="Sua satisfação é nossa prioridade - compre sem riscos"
          >
            Garantia de Satisfação
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
        <section id="mentor" className="scroll-mt-20 mb-12">
          <SectionTitle 
            subtitle="Conheça a especialista que vai guiar sua transformação de imagem"
          >
            Sua Mentora de Estilo
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
        
        {/* Final CTA Section - Título melhorado */}
        <section id="cta" className="scroll-mt-20 my-10 bg-white rounded-xl shadow-lg p-8 border border-[#B89B7A]/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-light opacity-5 pointer-events-none"></div>
          <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={600} delay={300}>
            {/* Título CTA com decoração elegante */}
            <AnimatedWrapper 
              className="text-center mb-8"
              animation="fade"
              show={true}
              duration={600}
            >
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full shadow-md animate-pulse"></div>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-[#432818] mb-4 leading-tight bg-gradient-to-r from-[#432818] via-[#aa6b5d] to-[#432818] bg-clip-text text-transparent relative z-10">
                Pronta para Transformar seu Estilo?
              </h2>
              
              <p className="text-lg md:text-xl text-[#8F7A6A] leading-relaxed mb-6 relative z-10">
                Adquira agora seu guia completo personalizado para o estilo <span className="font-semibold text-[#aa6b5d]">{category}</span> e comece a transformação da sua imagem hoje mesmo.
              </p>
              
              <div className="w-24 h-1 bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] rounded-full mx-auto shadow-sm"></div>
            </AnimatedWrapper>
            
            {/* Ancoragem de valor melhorada */}
            <div className="mb-6 relative z-10">
              <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-lg p-6 mb-6 border border-[#B89B7A]/10">
                <h3 className="text-lg font-medium text-[#aa6b5d] mb-6 text-center">O que você recebe:</h3>
                
                {/* Lista organizada e alinhada */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-2 border-b border-[#B89B7A]/10">
                    <div className="flex items-center gap-3 flex-1">
                      <CheckCircle className="w-5 h-5 text-[#B89B7A] flex-shrink-0" />
                      <span className="text-[#432818] font-medium text-left">Guia de Estilo Personalizado</span>
                    </div>
                    <span className="text-[#aa6b5d] font-semibold whitespace-nowrap ml-4">R$ 97,00</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-[#B89B7A]/10">
                    <div className="flex items-center gap-3 flex-1">
                      <CheckCircle className="w-5 h-5 text-[#B89B7A] flex-shrink-0" />
                      <span className="text-[#432818] font-medium text-left">E-book Transformação de Imagem</span>
                    </div>
                    <span className="text-[#aa6b5d] font-semibold whitespace-nowrap ml-4">R$ 47,00</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-[#B89B7A]/10">
                    <div className="flex items-center gap-3 flex-1">
                      <CheckCircle className="w-5 h-5 text-[#B89B7A] flex-shrink-0" />
                      <span className="text-[#432818] font-medium text-left">Checklist de Guarda-roupa</span>
                    </div>
                    <span className="text-[#aa6b5d] font-semibold whitespace-nowrap ml-4">R$ 31,00</span>
                  </div>
                </div>
                
                {/* Total */}
                <div className="border-t-2 border-[#B89B7A]/20 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8F7A6A] font-medium">Valor total individual:</span>
                    <span className="text-xl font-bold text-[#aa6b5d] line-through whitespace-nowrap">R$ 175,00</span>
                  </div>
                </div>
              </div>
              
              <p className="text-lg font-medium text-[#432818] mb-6">
                Transforme sua vida por apenas
              </p>
              
              {/* Nova seção de preços redesenhada */}
              <div className="mb-8">
                {/* Preço principal em destaque */}
                <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-[#B89B7A]/30 mb-6 overflow-hidden">
                  {/* Elementos decorativos de fundo */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B89B7A]/5 to-transparent rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#aa6b5d]/5 to-transparent rounded-full blur-2xl"></div>
                  
                  {/* Badge de destaque */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      🔥 Oferta Especial
                    </div>
                  </div>
                  
                  <div className="relative z-10 text-center pt-6">
                    {/* Preço parcelado destacado */}
                    <div className="mb-6">
                      <p className="text-[#8F7A6A] text-sm mb-3">Parcele em até</p>
                      
                      {/* Container flex para manter preço em uma linha */}
                      <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
                        <span className="text-xl md:text-2xl font-bold text-[#aa6b5d] whitespace-nowrap">5x de</span>
                        <div className="relative">
                          <span className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent whitespace-nowrap">
                            R$ 8,83
                          </span>
                          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full opacity-50"></div>
                        </div>
                      </div>
                      
                      <p className="text-[#8F7A6A] text-sm">sem juros no cartão</p>
                    </div>
                    
                    {/* Divisor elegante */}
                    <div className="flex items-center justify-center mb-6">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#B89B7A]/30 to-transparent"></div>
                      <span className="px-4 text-[#8F7A6A] text-sm">ou</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#B89B7A]/30 to-transparent"></div>
                    </div>
                    
                    {/* Preço à vista */}
                    <div className="bg-gradient-to-r from-[#f9f4ef] to-[#fff7f3] rounded-xl p-4 md:p-6 border border-[#B89B7A]/10">
                      <p className="text-[#8F7A6A] text-sm mb-2">À vista por apenas</p>
                      
                      {/* Container flex para comparação de preços */}
                      <div className="flex items-center justify-center gap-3 mb-2 flex-wrap">
                        <span className="text-lg text-[#8F7A6A] line-through">R$ 175,00</span>
                        <span className="text-2xl md:text-3xl font-bold text-[#4CAF50] whitespace-nowrap">R$ 39,90</span>
                      </div>
                      
                      <p className="text-[#4CAF50] text-sm font-medium">
                        Economia de R$ 135,10
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Comparação com valor individual */}
                <div className="text-center mb-6">
                  <p className="text-[#8F7A6A] text-sm">
                    Valor individual dos materiais: <span className="font-semibold text-[#aa6b5d]">R$ 175,00</span>
                  </p>
                  <p className="text-[#4CAF50] text-sm font-medium mt-1">
                    ✨ Você economiza mais de 75% comprando o kit completo
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-4 mb-8 relative z-10">
              <div className="bg-gradient-to-r from-[#B89B7A]/10 to-[#aa6b5d]/10 border border-[#B89B7A]/20 text-[#432818] p-4 rounded-lg flex items-center gap-3 font-semibold text-sm shadow-inner">
                <div className="relative">
                  <Hourglass className="w-6 h-6 text-[#aa6b5d] animate-pulse" />
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                    <Hourglass className="w-6 h-6 text-[#aa6b5d] opacity-30" />
                  </div>
                </div>
                <span className="text-[#aa6b5d]">Oferta Exclusiva Válida Por Pouco Tempo</span>
              </div>
            </div>
            
            <Button
              onClick={handleCTAClick}
              className="w-full md:w-2/3 lg:w-1/2 mx-auto text-white text-lg md:text-xl py-4 px-8 rounded-full shadow-lg transition-all duration-300 relative z-10 font-bold group cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${tokens.colors.success}, ${tokens.colors.successDark})`,
                boxShadow: tokens.shadows.cta,
                transform: isButtonHovered ? 'translateY(-2px)' : 'translateY(0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              type="button"
            >
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110 pointer-events-none" />
              <span className="text-base md:text-xl pointer-events-none">Adquirir Agora</span>
              <ArrowDown className="w-4 h-4 md:w-5 md:h-5 animate-bounce-custom pointer-events-none" />
            </Button>
            <SecurePurchaseElement />
          </AnimatedWrapper>
        </section>
      </div>
    </div>
  );
};

export default ResultPage;