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
import ResourcePreloader from '@/components/result/ResourcePreloader';
import PerformanceMonitor from '@/components/result/PerformanceMonitor';
import CountdownTimer from '@/components/ui/countdown-timer';
import LimitedStockIndicator from '@/components/ui/limited-stock-indicator';

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
  
  // Scroll tracking for sticky header
  const [isScrolled, setIsScrolled] = useState(false);
  
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
  
  const handleCTAClick = () => {
    trackButtonClick('checkout_button', 'Iniciar Checkout', 'results_page');
    window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
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
      {/* Preloaders and monitors */}
      <ResourcePreloader />
      <PerformanceMonitor />
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#B89B7A]/10 to-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-[#aa6b5d]/10 to-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute top-1/3 left-0 w-1/5 h-1/5 bg-gradient-to-r from-[#B89B7A]/5 to-[#aa6b5d]/5 rounded-full blur-3xl -translate-x-1/2"></div>
      
      {/* Header */}
      <Header 
        primaryStyle={primaryStyle} 
        logoHeight={globalStyles.logoHeight} 
        logo={globalStyles.logo} 
        logoAlt={globalStyles.logoAlt} 
        userName={user?.userName} 
        isScrolled={isScrolled}
      />
      
      {/* Navigation dots (only visible on scroll) */}
      <div className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-50 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col gap-3">
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
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === section.id ? 'bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] scale-125 shadow-md' : 'bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Ir para seção ${section.label}`}
              title={section.label}
            />
          ))}
        </div>
      </div>

      {/* Sticky CTA (only visible on scroll) */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-[#B89B7A]/20 py-3 px-4 z-40 transition-transform duration-500 ${isScrolled ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <div className="hidden md:block">
            <p className="text-sm font-medium text-[#432818]">Guia de Estilo e Imagem + Bônus</p>
            <p className="text-sm text-[#aa6b5d] font-medium">5x de <span className="text-xl font-bold bg-gradient-to-r from-[#B2784B] to-[#D68047] bg-clip-text text-transparent">R$ 8,83</span> <span className="text-xs font-normal text-[#8F7A6A]">ou R$ 39,90 à vista</span></p>
          </div>
          <Button 
            onClick={handleCTAClick} 
            className="text-white text-sm leading-none py-3 px-6 rounded-md shadow-md transition-all duration-300 w-full md:w-auto"
            style={{
              background: `linear-gradient(to right, ${tokens.colors.success}, ${tokens.colors.successDark})`,
              boxShadow: tokens.shadows.cta,
              transform: isButtonHovered ? 'translateY(-2px)' : 'translateY(0)',
            }}
            onMouseEnter={() => setIsButtonHovered(true)} 
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <span className="flex items-center justify-center gap-2">
              <ShoppingCart className={`w-4 h-4 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
              Adquirir Agora
            </span>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        {/* Primary Style Card */}
        <section id="primary-style" className="scroll-mt-20">
          <Card className="p-6 mb-10 bg-white shadow-lg border border-[#B89B7A]/20 rounded-xl overflow-hidden relative">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#B89B7A]/30 rounded-tl-xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#B89B7A]/30 rounded-br-xl"></div>
            
            <AnimatedWrapper animation="fade" show={true} duration={600} delay={300}>
              <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-playfair text-[#432818] mb-4">
                  Seu Estilo Predominante
                </h1>
                <div className="max-w-md mx-auto mb-6">
                  <div className="flex items-center justify-between text-sm text-[#8F7A6A] mb-2">
                    <span>Compatibilidade</span>
                    <span className="font-medium">{primaryStyle.percentage}%</span>
                  </div>
                  <Progress 
                    value={primaryStyle.percentage} 
                    className="h-3 bg-[#F3E8E6] rounded-full overflow-hidden" 
                    indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] transition-all duration-500 ease-in-out"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6 order-2 md:order-1">
                  <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={400}>
                    <p className="text-[#432818] leading-relaxed text-base md:text-lg">{description}</p>
                  </AnimatedWrapper>
                  <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={600}>
                    <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-lg p-5 shadow-sm border border-[#B89B7A]/10">
                      <h3 className="text-lg font-medium text-[#aa6b5d] mb-3">Estilos que Também Influenciam Você</h3>
                      <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                    </div>
                  </AnimatedWrapper>
                </div>
                <AnimatedWrapper animation={isLowPerformance ? 'none' : 'scale'} show={true} duration={500} delay={500} className="order-1 md:order-2">
                  <div className="max-w-[280px] mx-auto relative"> 
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
                    {/* Elegant decorative corners */}
                    <div className="absolute -top-2 -right-2 w-10 h-10 border-t-2 border-r-2 border-[#B89B7A] rounded-tr-lg"></div>
                    <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-2 border-l-2 border-[#B89B7A] rounded-bl-lg"></div>
                    
                    {/* Style badge */}
                    <div className="absolute -top-3 -left-3 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-1 rounded-full shadow-lg text-sm font-medium transform -rotate-12">
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
                  {/* Elegant badge */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium transform rotate-12">
                    Exclusivo
                  </div>
                </div>
              </AnimatedWrapper>
            </AnimatedWrapper>
          </Card>
        </section>

        {/* Before/After Transformation Section */}
        <section id="transformations" className="scroll-mt-20 mb-16">
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
        <section id="bonuses" className="scroll-mt-20 mb-16">
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
        <section id="testimonials" className="scroll-mt-20 mb-16">
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
        <section id="guarantee" className="scroll-mt-20 mb-16">
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
        <section id="mentor" className="scroll-mt-20 mb-16">
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
        
        {/* Final CTA Section */}
        <section id="cta" className="scroll-mt-20 mb-16">
          <Card className="p-6 bg-white shadow-lg border border-[#B89B7A]/20 rounded-xl overflow-hidden relative">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-playfair text-[#432818] mb-6">
                Pronta para Transformar seu Estilo?
              </h2>
              <p className="text-[#432818] text-lg mb-8 max-w-2xl mx-auto">
                Adquira agora seu guia completo personalizado para o estilo <span className="font-medium text-[#aa6b5d]">{category}</span> e comece a transformação da sua imagem hoje mesmo.
              </p>
              
              <div className="flex flex-col items-center">
                <div className="mb-6 relative">
                  <div className="absolute -top-4 -right-12 bg-gradient-to-r from-[#B2784B]/20 to-[#D68047]/10 px-3 py-1 rounded-full transform rotate-6 animate-pulse shadow-sm border border-[#D68047]/20">
                    <span className="text-xs font-bold text-[#D68047]">77% OFF</span>
                  </div>
                  
                  {/* Ícone de tempo limitado */}
                  <div className="absolute -top-3 -left-16 flex items-center bg-[#FFD700]/10 px-2 py-1 rounded-full">
                    <div className="animate-pulse mr-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D68047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-[#D68047]">Por tempo limitado</span>
                  </div>
                  
                  {/* Temporizador de contagem regressiva */}
                  <div className="mb-3">
                    <div className="text-xs font-medium text-[#D68047] mb-1 flex justify-center items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 animate-pulse">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                      Oferta expira em:
                    </div>
                    <CountdownTimer className="mb-2" />
                  </div>
                  
                  {/* Indicador de estoque limitado */}
                  <LimitedStockIndicator className="mb-4" />
                  
                  <p className="text-[#8F7A6A] line-through mb-1 relative">
                    <span>De: R$ 175,00</span>
                    <span className="absolute top-0 right-0 transform translate-x-full -translate-y-1/2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-r-full">
                      -77%
                    </span>
                  </p>
                  <p className="relative text-base text-[#aa6b5d] font-medium mb-1">
                    5x de 
                    <span className="text-3xl font-bold bg-gradient-to-r from-[#B2784B] to-[#D68047] bg-clip-text text-transparent shadow-sm inline-block transform transition-transform hover:scale-105 ml-2">
                      R$ 8,83
                    </span>
                    <span className="ml-2 text-xs font-semibold bg-gradient-to-r from-[#FFD700] to-[#FFA500] px-2 py-0.5 rounded-md text-white animate-bounce inline-block shadow-sm">
                      MELHOR OFERTA
                    </span>
                    <span className="absolute -right-4 top-1/3 transform rotate-12">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D68047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </span>
                  </p>
                  <div className="mt-1 flex justify-center items-center">
                    <p className="text-sm text-[#8F7A6A]">Ou</p>
                    <p className="text-sm font-medium text-[#aa6b5d] mx-1">R$ 39,90</p>
                    <p className="text-sm text-[#8F7A6A]">à vista</p>
                    <div className="ml-2 text-[10px] bg-[#4CAF50]/20 text-[#4CAF50] px-2 py-0.5 rounded font-medium">
                      Economize R$ 4,25
                    </div>
                  </div>
                  
                  {/* Mockup do guia de estilo */}
                  <div className="mt-8 relative max-w-[220px] mx-auto">
                    <div className="relative w-full h-36 bg-gradient-to-b from-[#F5EAE0] to-[#FFF7F2] rounded-lg shadow-md flex items-center justify-center transform -rotate-3 overflow-hidden border border-[#B89B7A]/30 hover:scale-105 transition-transform duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4/5 h-4/5 bg-gradient-to-br from-[#B89B7A]/30 to-[#aa6b5d]/20 rounded-md flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xs font-bold text-[#432818] mb-1">Guia Personalizado</div>
                            <div className="text-[10px] text-[#8F7A6A]">Estilo {category}</div>
                            <div className="h-px w-16 bg-[#B89B7A]/30 my-1 mx-auto"></div>
                            <div className="mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-[#B89B7A]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-1 right-1 transform rotate-12">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B89B7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 3v4c0 2-2 4-4 4H2"></path>
                          <path d="M8 17l-6-6 6-6"></path>
                        </svg>
                      </div>
                      
                      {/* Decorações extras */}
                      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#B89B7A]/20 to-transparent rounded-br-md"></div>
                      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-bl from-[#aa6b5d]/20 to-transparent rounded-tr-md"></div>
                    </div>
                    
                    {/* Selo de garantia aprimorado */}
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-[#4CAF50] to-[#45a049] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-md border-2 border-white transform hover:rotate-12 transition-transform duration-300">
                      <div className="text-[10px] font-bold text-center leading-tight">
                        <div className="mb-0.5">7 DIAS</div>
                        <div className="h-px w-8 bg-white/50 mb-0.5 mx-auto"></div>
                        <div>GARANTIA</div>
                      </div>
                    </div>
                    
                    {/* Selos de benefícios */}
                    <div className="absolute -top-6 -left-6 flex">
                      <div className="bg-[#FFF7F2] rounded-full shadow-md p-1.5 border border-[#B89B7A]/30 transform -rotate-6 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B89B7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      </div>
                      <div className="bg-[#FFF7F2] rounded-full shadow-md p-1.5 border border-[#B89B7A]/30 transform rotate-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B89B7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCTAClick} 
                  className="mt-4 w-full max-w-md text-white py-5 px-8 rounded-md text-lg font-medium shadow-lg transition-all duration-300 relative overflow-hidden group"
                  style={{
                    background: `linear-gradient(to right, ${tokens.colors.success}, ${tokens.colors.successDark})`,
                    boxShadow: tokens.shadows.cta,
                    transform: isButtonHovered ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                  onMouseEnter={() => setIsButtonHovered(true)} 
                  onMouseLeave={() => setIsButtonHovered(false)}
                >
                  {/* Efeito de brilho no hover */}
                  <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
                  
                  {/* Efeito de pulsação */}
                  <div className="absolute inset-0 rounded-md animate-ping bg-white opacity-0 group-hover:opacity-5"></div>
                  
                  <span className="flex items-center justify-center gap-2 relative">
                    <ShoppingCart className="w-5 h-5 transform transition-transform group-hover:scale-110 group-hover:rotate-6" />
                    Adquirir Agora
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Button>
                
                <p className="text-xs text-[#8F7A6A] mt-2 mb-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Pagamento 100% seguro e criptografado
                </p>
                
                <SecurePurchaseElement className="mt-6" />
              </div>
            </div>
          </Card>
          
          <div className="text-center mt-10 text-sm text-[#8F7A6A]">
            <BuildInfo />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResultPage;