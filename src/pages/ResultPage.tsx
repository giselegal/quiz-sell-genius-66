// ✅ TESTE - Arquivo ResultPage com debug e robustez - 23/05/2025
import React, { useEffect, useState, Suspense, lazy, useCallback } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { styleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Shield, Award, Clock } from 'lucide-react';
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

// LAZY IMPORTS MAIS SEGUROS
const BeforeAfterTransformation = lazy(() => 
  import('@/components/result/BeforeAfterTransformation4')
    .then(module => ({ default: module.default }))
    .catch(error => {
      console.warn('Erro ao carregar BeforeAfterTransformation:', error);
      return { default: () => <div className="text-center py-8">Seção temporariamente indisponível</div> };
    })
);

const MotivationSection = lazy(() => 
  import('@/components/result/MotivationSection')
    .then(module => ({ default: module.default }))
    .catch(error => {
      console.warn('Erro ao carregar MotivationSection:', error);
      return { default: () => <div className="text-center py-8">Seção temporariamente indisponível</div> };
    })
);

const BonusSection = lazy(() => 
  import('@/components/result/BonusSection')
    .then(module => ({ default: module.default }))
    .catch(error => {
      console.warn('Erro ao carregar BonusSection:', error);
      return { default: () => <div className="text-center py-8">Seção temporariamente indisponível</div> };
    })
);

const Testimonials = lazy(() => 
  import('@/components/quiz-result/sales/Testimonials')
    .then(module => ({ default: module.default }))
    .catch(error => {
      console.warn('Erro ao carregar Testimonials:', error);
      return { default: () => <div className="text-center py-8">Seção temporariamente indisponível</div> };
    })
);

const GuaranteeSection = lazy(() => 
  import('@/components/result/GuaranteeSection')
    .then(module => ({ default: module.default }))
    .catch(error => {
      console.warn('Erro ao carregar GuaranteeSection:', error);
      return { default: () => <div className="text-center py-8">Seção temporariamente indisponível</div> };
    })
);

const MentorSection = lazy(() => 
  import('@/components/result/MentorSection')
    .then(module => ({ default: module.default }))
    .catch(error => {
      console.warn('Erro ao carregar MentorSection:', error);
      return { default: () => <div className="text-center py-8">Seção temporariamente indisponível</div> };
    })
);

// OPCIONAL - Componentes que podem não existir
const ResourcePreloader = lazy(() => 
  import('@/components/result/ResourcePreloader').catch(() => ({
    default: () => null
  }))
);

const PerformanceMonitor = lazy(() => 
  import('@/components/result/PerformanceMonitor').catch(() => ({
    default: () => null
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
  // DEBUG: Log inicial
  console.log('ResultPage: Iniciando renderização');

  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();
  const { user } = useAuth();
  
  // DEBUG: Log dos dados
  console.log('ResultPage: primaryStyle', primaryStyle);
  console.log('ResultPage: globalStyles', globalStyles);
  console.log('ResultPage: user', user);

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

  // HANDLERS COM TRATAMENTO DE ERRO
  const handleScroll = useCallback(() => {
    try {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrolledToBottom = scrollY + windowHeight >= documentHeight - 800;
      setShowBottomBar(scrolledToBottom);
      
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
    } catch (error) {
      console.error('Erro no handleScroll:', error);
    }
  }, []);

  // EFFECTS COM DEBUG
  useEffect(() => {
    console.log('ResultPage: useEffect - primaryStyle mudou', primaryStyle);
    
    if (!primaryStyle) {
      console.log('ResultPage: primaryStyle não existe, retornando');
      return;
    }
    
    window.scrollTo(0, 0);
    
    // LOADING MAIS AGRESSIVO
    const timer = setTimeout(() => {
      console.log('ResultPage: Completando loading');
      setImagesLoaded({ style: true, guide: true });
      completeLoading();
    }, 500); // Reduzido para 500ms

    return () => clearTimeout(timer);
  }, [primaryStyle, completeLoading]);

  useEffect(() => {
    if (imagesLoaded.style && imagesLoaded.guide) {
      console.log('ResultPage: Imagens carregadas, completando loading');
      completeLoading();
    }
  }, [imagesLoaded, completeLoading]);

  useEffect(() => {
    try {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    } catch (error) {
      console.error('Erro no useEffect scroll:', error);
    }
  }, [handleScroll]);

  // EARLY RETURNS COM DEBUG
  if (!primaryStyle) {
    console.log('ResultPage: Renderizando ErrorState - primaryStyle não existe');
    return <ErrorState />;
  }
  
  if (isLoading) {
    console.log('ResultPage: Renderizando ResultSkeleton - ainda carregando');
    return <ResultSkeleton />;
  }

  // SAFE DESTRUCTURING COM DEBUG
  const { category } = primaryStyle;
  console.log('ResultPage: category', category);
  
  const styleData = styleConfig[category];
  console.log('ResultPage: styleData', styleData);
  
  if (!styleData) {
    console.log('ResultPage: Renderizando ErrorState - styleData não existe');
    return <ErrorState />;
  }
  
  const { image, guideImage } = styleData;
  console.log('ResultPage: image', image, 'guideImage', guideImage);

  const handleCTAClick = useCallback((e: React.MouseEvent) => {
    try {
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
    } catch (error) {
      console.error('Erro no handleCTAClick:', error);
    }
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    try {
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    } catch (error) {
      console.error('Erro no scrollToSection:', error);
    }
  }, []);

  console.log('ResultPage: Renderizando página principal');

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundColor: globalStyles?.backgroundColor || '#fffaf7',
      color: globalStyles?.textColor || '#432818',
      fontFamily: globalStyles?.fontFamily || 'inherit'
    }}>
      {/* COMPONENTES OPCIONAIS COM SUSPENSE */}
      <Suspense fallback={null}>
        <ResourcePreloader />
        <PerformanceMonitor />
      </Suspense>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#B89B7A]/10 to-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-[#aa6b5d]/10 to-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute top-1/3 left-0 w-1/5 h-1/5 bg-gradient-to-r from-[#B89B7A]/5 to-[#aa6b5d]/5 rounded-full blur-3xl -translate-x-1/2"></div>
      
      {/* Header simplificado */}
      <header className="py-4 px-6 sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl flex justify-center">
          {globalStyles?.logo ? (
            <img
              src={globalStyles.logo}
              alt={globalStyles.logoAlt || "Logo"}
              style={{ height: globalStyles.logoHeight || '60px' }}
              className="h-auto object-contain"
              onError={(e) => {
                console.error('Erro ao carregar logo:', globalStyles.logo);
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="h-[60px] flex items-center text-[#432818] font-bold">
              Logo Indisponível
            </div>
          )}
        </div>
      </header>

      {/* Navigation dots */}
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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === section.id 
                  ? 'bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] scale-125 shadow-sm' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
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

      {/* CONTAINER PRINCIPAL */}
      <div className="container mx-auto px-6 lg:px-8 py-8 max-w-4xl relative z-10">
        {/* Primary Style Card SIMPLIFICADO */}
        <section id="primary-style" className="scroll-mt-20">
          <Card className="p-6 lg:p-8 mb-12 bg-white border border-[#B89B7A]/20 rounded-xl">
            <div className="text-center mb-8">
              {user?.userName && (
                <span className="text-xl lg:text-2xl text-[#aa6b5d] font-bold mb-4 block">
                  Parabéns, {user.userName}!
                </span>
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
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <div className="space-y-4">
                  <p className="text-[#432818] leading-relaxed text-base lg:text-lg font-medium">
                    <strong>Agora você tem clareza total</strong> sobre quem você é e como expressar sua personalidade através do seu estilo!
                  </p>
                  
                  <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-lg p-4 border border-[#B89B7A]/10">
                    <p className="text-[#432818] text-sm lg:text-base leading-relaxed">
                      <strong>Seu estilo {category}</strong> revela uma mulher única e especial.
                    </p>
                  </div>
                  
                  <p className="text-[#8F7A6A] text-sm lg:text-base">
                    <strong>Problema resolvido:</strong> Chega de ficar perdida no guarda-roupa!
                  </p>
                </div>

                {secondaryStyles && (
                  <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-lg p-5 border border-[#B89B7A]/10">
                    <h3 className="text-lg font-medium text-[#aa6b5d] mb-3">Estilos que Também Influenciam Você</h3>
                    <Suspense fallback={<div>Carregando...</div>}>
                      <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                    </Suspense>
                  </div>
                )}
              </div>

              <div className="order-1 lg:order-2">
                <div className="w-full max-w-xs lg:max-w-sm mx-auto relative"> 
                  {image ? (
                    <ProgressiveImage 
                      src={image} 
                      alt={`Estilo ${category}`} 
                      width={400} 
                      height={500} 
                      className="w-full h-auto rounded-lg" 
                      loading="eager" 
                      onLoad={() => {
                        console.log('Imagem do estilo carregada');
                        setImagesLoaded(prev => ({ ...prev, style: true }));
                      }}
                      onError={(e) => {
                        console.error('Erro ao carregar imagem do estilo:', image);
                        setImagesLoaded(prev => ({ ...prev, style: true }));
                      }}
                    />
                  ) : (
                    <div className="w-full aspect-[4/5] bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Imagem indisponível</span>
                    </div>
                  )}
                  
                  <div className="absolute -top-3 -left-3 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium transform -rotate-12">
                    {category}
                  </div>
                </div>
              </div>
            </div>
            
            {guideImage && (
              <div className="mt-12 max-w-2xl mx-auto relative">
                <h3 className="text-xl lg:text-2xl font-medium text-center text-[#aa6b5d] mb-6">
                  Seu Guia de Estilo Personalizado
                </h3>
                <ProgressiveImage 
                  src={guideImage} 
                  alt={`Guia de Estilo ${category}`} 
                  loading="lazy" 
                  className="w-full h-auto rounded-lg" 
                  onLoad={() => {
                    console.log('Guia de imagem carregado');
                    setImagesLoaded(prev => ({ ...prev, guide: true }));
                  }}
                  onError={(e) => {
                    console.error('Erro ao carregar guia de imagem:', guideImage);
                    setImagesLoaded(prev => ({ ...prev, guide: true }));
                  }}
                />
              </div>
            )}
          </Card>
        </section>

        {/* SEÇÕES COM SUSPENSE MAIS ROBUSTO */}
        <section id="transformations" className="scroll-mt-20 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-[#432818] mb-4">
              Transformações Que Inspiram
            </h2>
            <p className="text-lg md:text-xl text-[#8F7A6A] leading-relaxed max-w-3xl mx-auto">
              Transformações inspiradoras
            </p>
          </div>
          <Suspense fallback={
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          }>
            <BeforeAfterTransformation />
          </Suspense>
        </section>

        {/* DEMAIS SEÇÕES SIMPLIFICADAS */}
        <section id="motivation" className="scroll-mt-20 mb-20">
          <Suspense fallback={<div className="py-8 text-center">Carregando...</div>}>
            <MotivationSection />
          </Suspense>
        </section>
        
        <section id="bonuses" className="scroll-mt-20 mb-20">
          <Suspense fallback={<div className="py-8 text-center">Carregando...</div>}>
            <BonusSection />
          </Suspense>
        </section>
        
        <section id="testimonials" className="scroll-mt-20 mb-20">
          <Suspense fallback={<div className="py-8 text-center">Carregando...</div>}>
            <Testimonials />
          </Suspense>
        </section>
        
        <section id="guarantee" className="scroll-mt-20 mb-20">
          <Suspense fallback={<div className="py-8 text-center">Carregando...</div>}>
            <GuaranteeSection />
          </Suspense>
        </section>
        
        <section id="mentor" className="scroll-mt-20 mb-20">
          <Suspense fallback={<div className="py-8 text-center">Carregando...</div>}>
            <MentorSection />
          </Suspense>
        </section>

        {/* CTA SIMPLIFICADO PARA TESTE */}
        <section id="cta" className="scroll-mt-20 mb-20 bg-white rounded-xl p-6 lg:p-12 border border-[#B89B7A]/20 text-center">
          <h2 className="text-4xl lg:text-6xl font-playfair font-bold text-[#432818] mb-6">
            Transforme Seu Guarda-Roupa Hoje!
          </h2>
          
          <p className="text-xl text-[#8F7A6A] mb-8">
            Seu guia personalizado {category} + materiais exclusivos
          </p>

          {/* GRID DE PRODUTOS COM DESCRIÇÕES MELHORADAS */}
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
                  subtitle: 'Seu guia exclusivo com 50+ looks prontos, combinações certeiras e segredos para arrasar todos os dias',
                  badge: 'PRINCIPAL'
                },
                {
                  src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745515075/Espanhol_Portugu%C3%AAs_1_uru4r3.png',
                  title: 'Guia das Peças Estratégicas',
                  subtitle: 'As 15 peças-chave que toda mulher precisa ter para criar looks infinitos com poucas roupas',
                  badge: 'BÔNUS'
                },
                {
                  src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.png',
                  title: 'Manual de Visagismo Pessoal',
                  subtitle: 'Cortes, cores e acessórios que valorizam suas características únicas e realçam sua beleza natural',
                  badge: 'EXCLUSIVO'
                }
              ].map((product, index) => (
                <div key={index} className={`bg-gradient-to-br from-white to-[#fff7f3] rounded-xl p-4 border border-[#B89B7A]/10 transition-transform duration-300 hover:scale-105 relative ${index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                     style={{ boxShadow: tokens.shadows.sm }}>
                  
                  {/* BADGE DO PRODUTO */}
                  <div className="absolute -top-2 -right-2 z-10">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full text-white shadow-sm ${
                      product.badge === 'PRINCIPAL' ? 'bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]' :
                      product.badge === 'BÔNUS' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      'bg-gradient-to-r from-purple-500 to-purple-600'
                    }`}>
                      {product.badge}
                    </span>
                  </div>

                  {/* IMAGEM DO PRODUTO */}
                  <div className="aspect-[3/4] bg-white rounded-lg mb-4 flex items-center justify-center relative overflow-hidden"
                       style={{ boxShadow: tokens.shadows.sm }}>
                    <ProgressiveImage 
                      src={product.src}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>

                  {/* INFORMAÇÕES DO PRODUTO */}
                  <div className="text-left">
                    <h4 className="font-bold text-[#432818] text-sm lg:text-base mb-2 leading-tight">
                      {product.title}
                    </h4>
                    <p className="text-xs lg:text-sm text-[#8F7A6A] leading-relaxed line-clamp-3">
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
            <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-xl p-4 border border-[#B89B7A]/20 max-w-2xl mx-auto">
              <h4 className="font-bold text-[#432818] mb-2">🎁 Tudo que você recebe hoje:</h4>
              <ul className="text-sm text-[#8F7A6A] space-y-1">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#B89B7A] rounded-full flex-shrink-0"></div>
                  <span>Manual completo do estilo <strong>{category}</strong> com 50+ looks prontos</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#B89B7A] rounded-full flex-shrink-0"></div>
                  <span>Guia das 15 peças estratégicas que multiplicam seus looks</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#B89B7A] rounded-full flex-shrink-0"></div>
                  <span>Manual de visagismo para valorizar sua beleza única</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#B89B7A] rounded-full flex-shrink-0"></div>
                  <span><strong>Acesso vitalício</strong> + atualizações sem custo adicional</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleCTAClick} 
            className="text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 mx-auto block"
            style={{
              background: 'linear-gradient(135deg, #B89B7A, #aa6b5d)',
              maxWidth: '420px'
            }}
          >
            <ShoppingCart className="w-5 h-5 inline mr-2" />
            Garantir Minha Transformação
          </button>

          <div className="flex items-center justify-center gap-6 text-sm text-[#8F7A6A] mt-6">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#B89B7A]" />
              <span>100% Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#B89B7A]" />
              <span>Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B89B7A]" />
              <span>Garantia 7 dias</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResultPage;