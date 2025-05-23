
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Seções carregadas via lazy
const BeforeAfterTransformation = lazy(() => import('@/components/result/BeforeAfterTransformation4'));
const MotivationSection = lazy(() => import('@/components/result/MotivationSection'));
const BonusSection = lazy(() => import('@/components/result/BonusSection'));
const Testimonials = lazy(() => import('@/components/quiz-result/sales/Testimonials'));
const GuaranteeSection = lazy(() => import('@/components/result/GuaranteeSection'));
const MentorSection = lazy(() => import('@/components/result/MentorSection'));

const ResultPage: React.FC = () => {
  const {
    primaryStyle,
    secondaryStyles
  } = useQuiz();
  const {
    globalStyles
  } = useGlobalStyles();
  const {
    user
  } = useAuth();
  
  const [imagesLoaded, setImagesLoaded] = useState({
    style: false,
    guide: false
  });
  const isLowPerformance = useIsLowPerformanceDevice();
  const {
    isLoading,
    completeLoading
  } = useLoadingState({
    minDuration: isLowPerformance ? 100 : 300,
    disableTransitions: isLowPerformance
  });

  // Button hover and scroll states
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [showScrollCue, setShowScrollCue] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [highlightSection, setHighlightSection] = useState<string | null>(null);
  
  // Monitor scroll to hide cue and track progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 200) {
        setShowScrollCue(false);
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Highlight sections based on scroll position
      const sections = document.querySelectorAll('.highlight-on-scroll');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
          setHighlightSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (!primaryStyle) return;
    window.scrollTo(0, 0);
    
    // Verificar se os resultados já foram pré-carregados
    const hasPreloadedResults = localStorage.getItem('preloadedResults') === 'true';
    
    // Se os resultados já foram pré-carregados durante o quiz, pulamos o skeleton quase que imediatamente
    if (hasPreloadedResults) {
      setImagesLoaded({ style: true, guide: true });
      completeLoading();
      return;
    } 
    
    // Definir timeout de segurança apenas se não tiver pré-carregado
    const safetyTimeout = setTimeout(() => {
      setImagesLoaded({ style: true, guide: true });
      completeLoading();
    }, 2500);

    return () => clearTimeout(safetyTimeout);
  }, [primaryStyle, globalStyles.logo, completeLoading]);
  
  useEffect(() => {
    if (imagesLoaded.style && imagesLoaded.guide) completeLoading();
  }, [imagesLoaded, completeLoading]);
  
  if (!primaryStyle) return <ErrorState />;
  if (isLoading) return <ResultSkeleton />;
  
  const {
    category
  } = primaryStyle;
  const {
    image,
    guideImage,
    description
  } = styleConfig[category];
  
  const handleCTAClick = () => {
    // Track checkout initiation
    trackButtonClick('checkout_button', 'Iniciar Checkout', 'results_page');
    window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundColor: globalStyles.backgroundColor || '#fffaf7',
      color: globalStyles.textColor || '#432818',
      fontFamily: globalStyles.fontFamily || 'inherit'
    }}>
      {/* Componentes de performance */}
      <ResourcePreloader />
      <PerformanceMonitor />
      
      {/* Decorative background elements - Enhanced */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#B89B7A]/10 to-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-[#aa6b5d]/10 to-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse"></div>
      
      {/* Novo elemento de destaque estilístico */}
      <div className="absolute top-1/4 left-0 w-24 h-24 md:w-40 md:h-40 bg-[#B89B7A]/5 -z-10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 right-0 w-32 h-32 md:w-48 md:h-48 bg-[#aa6b5d]/5 -z-10 rounded-full blur-xl"></div>
      
      {/* Header with improved shadow */}
      <Header 
        primaryStyle={primaryStyle} 
        logoHeight={globalStyles.logoHeight} 
        logo={globalStyles.logo} 
        logoAlt={globalStyles.logoAlt} 
        userName={user?.userName}
        className="shadow-sm backdrop-blur-sm bg-white/90 sticky top-0 z-50"
      />

      {/* Scroll indicator cue */}
      <AnimatePresence>
        {showScrollCue && (
          <motion.div 
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[#B89B7A]/80"
            >
              <ArrowDown size={24} />
            </motion.div>
            <span className="text-xs text-[#B89B7A]/80 mt-1">Deslize para ver mais</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        {/* ATTENTION: Primary Style Card - Enhanced Design */}
        <Card className="p-6 mb-10 bg-white shadow-lg border border-[#B89B7A]/20 card-elegant rounded-xl overflow-hidden relative">
          {/* Decorative corner elements */}
          <div className="absolute -top-1 -right-1 w-16 h-16 border-t-2 border-r-2 border-[#B89B7A]/30 rounded-tr-xl"></div>
          <div className="absolute -bottom-1 -left-1 w-16 h-16 border-b-2 border-l-2 border-[#B89B7A]/30 rounded-bl-xl"></div>
          
          <AnimatedWrapper animation="fade" show={true} duration={600} delay={300}>
            <div className="text-center mb-8">
              <h1 className="font-playfair text-2xl md:text-3xl text-[#432818] mb-2 relative inline-block">
                Seu Estilo <span className="text-[#B89B7A]">Predominante</span>
                <div className="h-1 w-3/4 mx-auto mt-2 bg-gradient-to-r from-[#B89B7A] to-transparent rounded-full"></div>
              </h1>
              
              <div className="max-w-md mx-auto mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-[#432818]">{primaryStyle.category}</span>
                  <span className="text-sm font-bold text-[#B89B7A]">{primaryStyle.percentage}%</span>
                </div>
                <Progress 
                  value={primaryStyle.percentage} 
                  className="h-3 bg-[#F3E8E6] rounded-full overflow-hidden" 
                  indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] transition-all duration-1000 ease-out"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 order-2 md:order-1">
                <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={400}>
                  <p className="text-[#432818] leading-relaxed text-base md:text-lg">
                    {description.split(' ').map((word, i) => {
                      // Highlight key words for emphasis and scannability
                      const keyWords = ['autenticidade', 'confortável', 'estilo', 'imagem', 'personalidade', 'equilíbrio', 'valorizar'];
                      const isKeyWord = keyWords.some(keyword => word.toLowerCase().includes(keyword.toLowerCase()));
                      
                      return (
                        <span key={i} className={isKeyWord ? 'font-medium text-[#aa6b5d]' : ''}>
                          {word}{' '}
                        </span>
                      );
                    })}
                  </p>
                </AnimatedWrapper>
                <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={600}>
                  <div className="bg-white rounded-lg p-4 shadow-md border border-[#B89B7A]/20 glass-panel transform hover:scale-102 transition-transform duration-300">
                    <h3 className="text-lg font-playfair text-[#432818] mb-2">Estilos que Também Influenciam Você</h3>
                    <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                  </div>
                </AnimatedWrapper>
              </div>
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'scale'} show={true} duration={500} delay={500} className="order-1 md:order-2">
                <div className="max-w-[238px] mx-auto relative"> 
                  {/* Decorative frame */}
                  <div className="absolute -inset-3 border-2 border-dashed border-[#B89B7A]/30 rounded-lg -z-10"></div>
                  
                  <ProgressiveImage 
                    src={`${image}?q=85&f=auto&w=238`} 
                    alt={`Estilo ${category}`} 
                    width={238} 
                    height={298} 
                    className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" 
                    loading="eager" 
                    fetchPriority="high" 
                    onLoad={() => setImagesLoaded(prev => ({ ...prev, style: true }))}
                  />
                  
                  {/* Style category badge */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-6 py-2 rounded-full shadow-md text-sm font-medium">
                    {category}
                  </div>
                </div>
              </AnimatedWrapper>
            </div>
            
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={800}>
              <div className="mt-12 max-w-[540px] mx-auto relative">
                <div className="text-center mb-4">
                  <h3 className="font-playfair text-lg md:text-xl text-[#432818]">
                    Seu Mapa Visual de Estilo
                  </h3>
                  <p className="text-sm text-[#8F7A6A]">Use como guia para suas escolhas de vestimenta</p>
                </div>
                
                {/* Card com sombra e borda aprimoradas */}
                <div className="rounded-lg p-2 shadow-lg border-2 border-[#B89B7A]/20 relative bg-gradient-to-br from-white to-[#F9F4EF]">
                  <ProgressiveImage 
                    src={`${guideImage}?q=85&f=auto&w=540`} 
                    alt={`Guia de Estilo ${category}`} 
                    loading="lazy" 
                    className="w-full h-auto rounded-lg hover:scale-102 transition-transform duration-300 shadow-sm" 
                    onLoad={() => setImagesLoaded(prev => ({ ...prev, guide: true }))} 
                  />
                  
                  {/* Badge de destaque aprimorado */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium transform rotate-12 animate-pulse">
                    Exclusivo
                  </div>
                </div>
              </div>
            </AnimatedWrapper>
          </AnimatedWrapper>
        </Card>

        {/* INTEREST: Before/After Transformation Section - Enhanced with ID */}
        <div id="transformation" className="highlight-on-scroll">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Suspense fallback={<LoadingSpinner size="lg" className="mx-auto py-8" />}>
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show duration={400} delay={700}>
                <BeforeAfterTransformation handleCTAClick={handleCTAClick} />
              </AnimatedWrapper>
            </Suspense>
          </motion.div>
        </div>

        {/* INTEREST: Motivation Section - Enhanced with ID */}
        <div id="motivation" className="highlight-on-scroll">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Suspense fallback={<LoadingSpinner size="lg" className="mx-auto py-8" />}>
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show duration={400} delay={800}>
                <MotivationSection />
              </AnimatedWrapper>
            </Suspense>
          </motion.div>
        </div>

        {/* INTEREST: Bonus Section - Enhanced with ID and more visibility */}
        <div id="bonus" className="highlight-on-scroll relative">
          {/* Visual emphasis with decorative elements */}
          <div className="absolute -left-5 top-1/2 h-36 w-3 bg-gradient-to-b from-[#B89B7A] to-transparent rounded-full opacity-50 transform -translate-y-1/2"></div>
          <div className="absolute -right-5 top-1/2 h-36 w-3 bg-gradient-to-b from-[#aa6b5d] to-transparent rounded-full opacity-50 transform -translate-y-1/2"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={highlightSection === 'bonus' ? 'ring-4 ring-[#B89B7A]/20 rounded-xl p-2' : ''}
          >
            <Suspense fallback={<LoadingSpinner size="lg" className="mx-auto py-8" />}>
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show duration={400} delay={850}>
                <BonusSection />
              </AnimatedWrapper>
            </Suspense>
          </motion.div>
        </div>

        {/* DESIRE: Testimonials - Enhanced with ID */}
        <div id="testimonials" className="highlight-on-scroll">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Suspense fallback={<LoadingSpinner size="lg" className="mx-auto py-8" />}>
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show duration={400} delay={900}>
                <Testimonials />
              </AnimatedWrapper>
            </Suspense>
          </motion.div>
        </div>

        {/* DESIRE: Guarantee Section - Enhanced with ID and visual emphasis */}
        <div id="guarantee" className="highlight-on-scroll relative mt-4">
          {/* Visual emphasis */}
          <div className="absolute inset-0 bg-[#fffaf7] -z-10 rounded-xl"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#B89B7A]/5 to-transparent -z-20 rounded-xl"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="p-2"
          >
            <Suspense fallback={<LoadingSpinner size="lg" className="mx-auto py-8" />}>
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show duration={400} delay={1000}>
                <GuaranteeSection />
              </AnimatedWrapper>
            </Suspense>
          </motion.div>
        </div>

        {/* DESIRE: Mentor and Trust Elements - Enhanced with ID */}
        <div id="mentor" className="highlight-on-scroll">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Suspense fallback={<LoadingSpinner size="lg" className="mx-auto py-8" />}>
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show duration={400} delay={1050}>
                <MentorSection />
              </AnimatedWrapper>
            </Suspense>
          </motion.div>
        </div>

        {/* ACTION: Final Value Proposition and CTA - Enhanced design */}
        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show duration={400} delay={1100}>
          <motion.div 
            className="text-center mt-16 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Decorative divider */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-0.5 bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent w-32"></div>
              <div className="mx-4">
                <div className="w-3 h-3 bg-[#aa6b5d] transform rotate-45"></div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent w-32"></div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-4">
              Vista-se de <span className="relative px-1">
                Você
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-gold"></span>
              </span> — na Prática
            </h2>
            
            <p className="text-[#432818] mb-8 max-w-xl mx-auto">
              Agora que você conhece seu estilo, é hora de aplicá-lo com 
              <span className="font-medium text-[#aa6b5d]"> clareza </span> 
              e 
              <span className="font-medium text-[#aa6b5d]"> intenção</span>. 
              O Guia da Gisele Galvão foi criado para mulheres como você — que querem se vestir 
              com autenticidade e transformar sua imagem em ferramenta de 
              <span className="font-medium text-[#aa6b5d]"> poder</span>.
            </p>

            <div className="bg-gradient-to-br from-[#fff7f3] to-[#f9f4ef] p-6 rounded-lg mb-8 border border-[#B89B7A]/10 shadow-md glass-panel">
              <h3 className="text-xl font-medium text-[#aa6b5d] mb-6">O Guia de Estilo e Imagem + Bônus Exclusivos</h3>
              <ul className="space-y-4 text-left max-w-xl mx-auto text-[#432818] grid md:grid-cols-2 md:gap-4 md:space-y-0">
                {["Looks com intenção e identidade", "Cores, modelagens e tecidos a seu favor", "Imagem alinhada aos seus objetivos", "Guarda-roupa funcional, sem compras por impulso"].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 h-6 w-6 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center text-white mr-3 mt-0.5 shadow-sm">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div 
              className="bg-gradient-to-br from-[#fffaf7] to-[#FAF7F4] px-4 py-8 rounded-xl shadow-lg border border-[#B89B7A]/20 text-center mb-8"
              whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(184, 155, 122, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-3">
                  Guia de Estilo e Imagem + Bônus Exclusivos
                </h2>
                <p className="text-[#3a3a3a] italic">
                  "Descubra seu estilo verdadeiro e aprenda a aplicá-lo"
                </p>
              </div>

              <div className="bg-white text-left p-6 rounded-lg shadow-md border-2 border-[#B89B7A]/10 card-elegant mb-8 max-w-md mx-auto transform hover:scale-102 transition-all duration-300">
                <h3 className="text-xl font-medium text-center text-[#aa6b5d] mb-4">O Que Você Recebe Hoje</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/20">
                    <span className="font-medium">Guia Principal</span>
                    <span className="font-medium">R$ 67,00</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/20">
                    <span>Bônus - Peças-chave</span>
                    <span className="font-medium">R$ 79,00</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/20">
                    <span>Bônus - Visagismo Facial</span>
                    <span className="font-medium">R$ 29,00</span>
                  </div>
                  <div className="flex justify-between items-center p-2 pt-3 font-bold">
                    <span>Valor Total</span>
                    <div className="relative">
                      <span>R$ 175,00</span>
                      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#ff5a5a] transform -translate-y-1/2 -rotate-3"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f9f4ef] p-6 rounded-lg space-y-4 md:space-y-0 md:flex md:items-center md:justify-between shadow-inner">
                  <div className="text-center md:text-left space-y-1">
                    <p className="text-sm text-[#aa6b5d] uppercase font-medium">Hoje por Apenas</p>
                    <p className="text-4xl font-bold text-[#aa6b5d]">5x de R$ 8,83</p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-sm text-[#432818]">Ou R$ 39,90 à vista</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced CTA button with effects */}
            <Button 
              onClick={handleCTAClick} 
              className="text-white text-sm leading-none py-3 px-6 md:py-5 md:px-10 rounded-md shadow-xl transition-all transform hover:scale-105 active:scale-95 w-full md:w-auto mb-2 relative overflow-hidden group" 
              style={{
                background: "linear-gradient(to right, #4CAF50, #45a049)",
                boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)"
              }} 
              onMouseEnter={() => setIsButtonHovered(true)} 
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              {/* Shine effect */}
              <span className="absolute top-0 left-0 w-full h-full bg-white transform -skew-x-12 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-[150%] opacity-20"></span>
              
              <span className="flex items-center justify-center gap-2 relative z-10">
                <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
                <span className="font-medium">Garantir Meu Guia + Bônus Especiais</span>
              </span>
            </Button>
            
            <SecurePurchaseElement />

            <p className="text-sm text-[#aa6b5d] mt-2 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Oferta exclusiva nesta página</span>
            </p>
            
            {/* Countdown element if needed */}
            <div className="mt-6 text-center">
              <p className="text-xs text-[#432818]/70">Promoção disponível por tempo limitado</p>
            </div>
          </motion.div>
        </AnimatedWrapper>
      </div>

      {/* Fixed scroll-to-top button that appears when scrolled */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 bg-white shadow-lg border border-[#B89B7A]/20 rounded-full p-3 z-30"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Voltar ao topo"
          >
            <ChevronUp className="w-5 h-5 text-[#B89B7A]" />
          </motion.button>
        )}
      </AnimatePresence>

      <BuildInfo />
    </div>
  );
};

export default ResultPage;
