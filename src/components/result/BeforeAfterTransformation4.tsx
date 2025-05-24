import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChevronLeft, ChevronRight, Star, CheckCircle } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';
import OptimizedImage from '@/components/ui/optimized-image';
import { preloadImagesByUrls } from '@/utils/imageManager';
import { useIsLowPerformanceDevice } from '@/hooks/use-mobile';
import { useQuiz } from '@/hooks/useQuiz';
import { motion, AnimatePresence } from 'framer-motion';

// Extend Window interface to include custom property
declare global {
  interface Window {
    ctaClickProcessing?: boolean;
  }
}

// Design tokens atualizados para alinhar com a marca
const designTokens = {
  colors: {
    primary: '#B89B7A',
    secondary: '#aa6b5d',
    text: '#432818',
    textLight: '#8F7A6A',
    textMuted: '#6B5B4E',
    background: '#fffaf7',
    cardBg: '#ffffff',
    accent: '#B89B7A', // Mudança: alinhado com marca
    accentHover: '#aa6b5d', // Mudança: alinhado com marca
    success: '#4CAF50',
    divider: 'rgba(184, 155, 122, 0.2)',
    highlight: '#f9f4ef',
    gradientBg: 'linear-gradient(135deg, #B89B7A, #aa6b5d)', // Nova: gradiente da marca
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 2px 4px rgba(184, 155, 122, 0.08)',
    md: '0 4px 8px rgba(184, 155, 122, 0.12)',
    lg: '0 8px 16px rgba(184, 155, 122, 0.16)',
    xl: '0 12px 24px rgba(184, 155, 122, 0.20)',
    cta: '0 8px 32px rgba(184, 155, 122, 0.4)', // Mudança: sombra da marca
  },
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease',
  },
};

interface BeforeAfterTransformationProps {
  handleCTAClick?: () => void;
}

interface TransformationItem {
  image: string; 
  name: string;
  id: string; 
  width?: number;
  height?: number;
  style?: string; // Nova: estilo associado
  result: string; // Nova: resultado específico
}

// Componente Badge reutilizável
const Badge: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <span
    className={`absolute z-10 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm ${className}`}
    style={{ boxShadow: designTokens.shadows.sm, backgroundColor: designTokens.colors.primary }}
  >
    {children}
  </span>
);

// MEMOIZED COMPONENTS PARA PERFORMANCE
const CheckItem = React.memo<{ children: React.ReactNode }>(({ children }) => (
  <li className="flex items-start gap-3 text-[#aa6b5d] text-base justify-center md:justify-start group transition-all duration-300 hover:translate-x-1">
    <span className="min-w-[20px] mt-1 flex-shrink-0 transform transition-transform group-hover:scale-110">
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill="#aa6b5d"/>
        <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
    <span className="group-hover:text-[#432818] transition-colors">{children}</span>
  </li>
));

const NavButton = React.memo<{
  direction: 'prev' | 'next';
  onClick: () => void;
}>(({ direction, onClick }) => (
  <button
    className="bg-white/95 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-md hover:bg-[#B89B7A]/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#B89B7A] focus:ring-offset-1 z-20"
    onClick={useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }, [onClick])}
    style={{ pointerEvents: 'auto' }}
    aria-label={direction === 'prev' ? 'Anterior' : 'Próxima'}
  >
    {direction === 'prev' ? (
      <ChevronLeft size={16} className="text-[#432818] md:w-6 md:h-6" style={{ pointerEvents: 'none' }} />
    ) : (
      <ChevronRight size={16} className="text-[#432818] md:w-6 md:h-6" style={{ pointerEvents: 'none' }} />
    )}
  </button>
));

// DADOS DAS TRANSFORMAÇÕES - APRIMORADOS
const transformations: TransformationItem[] = [
  {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745519979/Captura_de_tela_2025-03-31_034324_pmdn8y.webp",
    name: "Adriana",
    id: "transformation-adriana",
    width: 600,
    height: 750,
    style: "Clássico",
    result: "Descobriu como usar cores neutras sofisticadas e passou a ser vista como líder na empresa"
  }, 
  {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745522326/Captura_de_tela_2025-03-31_034324_cpugfj.webp",
    name: "Mariangela", 
    id: "transformation-mariangela",
    width: 600,
    height: 750,
    style: "Natural",
    result: "Aprendeu a combinar conforto com elegância e ganhou confiança para reuniões importantes"
  }
];

// OPTIMIZED IMAGE PRELOADER
const useImagePreloader = (images: string[], initialIndex = 0) => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    if (images.length > 0) {
      // Pré-carregar imagem atual
      const currentImage = new Image();
      currentImage.onload = () => {
        setLoadedImages(prev => ({ ...prev, [images[initialIndex]]: true }));
      };
      currentImage.src = images[initialIndex];
      
      // Pré-carregar próxima imagem com delay
      if (images.length > 1) {
        setTimeout(() => {
          const nextIndex = (initialIndex + 1) % images.length;
          const nextImage = new Image();
          nextImage.onload = () => {
            setLoadedImages(prev => ({ ...prev, [images[nextIndex]]: true }));
          };
          nextImage.src = images[nextIndex];
        }, 1000);
      }
    }
  }, [images, initialIndex]);
  
  return { loadedImages };
};

const BeforeAfterTransformation: React.FC<BeforeAfterTransformationProps> = ({ handleCTAClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const isLowPerformance = useIsLowPerformanceDevice();
  const { primaryStyle } = useQuiz(); // Nova: pegar o estilo do quiz
  const imageUrls = transformations.map(t => t.image);
  const { loadedImages } = useImagePreloader(imageUrls, 0);
  
  const activeTransformation = transformations[activeIndex];
  const userStyleCategory = primaryStyle?.category || 'seu estilo';

  // MEMOIZED NAVIGATION FUNCTIONS
  const navigateToTransformation = useCallback((index: number) => {
    if (index >= 0 && index < transformations.length) {
      setActiveIndex(index);
    }
  }, []);

  const goToPrevious = useCallback(() => {
    const prevIndex = (activeIndex - 1 + transformations.length) % transformations.length;
    navigateToTransformation(prevIndex);
  }, [activeIndex, navigateToTransformation]);

  const goToNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % transformations.length;
    navigateToTransformation(nextIndex);
  }, [activeIndex, navigateToTransformation]);

  // LOADING STATE MANAGEMENT
  useEffect(() => {
    if (loadedImages[transformations[activeIndex].image]) {
      setIsLoading(false);
    }
  }, [loadedImages, activeIndex]);

  // CTA HANDLER OTIMIZADO
  const handleCTA = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (window.ctaClickProcessing) return;
    window.ctaClickProcessing = true;
    
    if (handleCTAClick) {
      handleCTAClick();
    } else {
      trackButtonClick('checkout_button', 'Seção Transformações', 'transformation_section');
      
      if (window.innerWidth >= 768) {
        window.open('https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912', '_blank');
      } else {
        window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
      }
    }
    
    setTimeout(() => {
      window.ctaClickProcessing = false;
    }, 1000);
  }, [handleCTAClick]);

  // LOADING SKELETON APRIMORADO
  if (isLoading) {
    return (
      <div className="my-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="h-8 bg-gradient-to-r from-[#f8f5f0] to-[#f0ebe6] rounded-lg mb-4 animate-pulse max-w-md mx-auto"></div>
            <div className="h-6 bg-gradient-to-r from-[#f8f5f0] to-[#f0ebe6] rounded-lg mb-4 animate-pulse max-w-2xl mx-auto"></div>
            <div className="w-20 h-1 bg-[#f8f5f0] rounded-full mx-auto animate-pulse"></div>
          </div>
          
          <Card className="overflow-hidden border border-[#B89B7A]/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 lg:p-8 flex flex-col items-center">
                <div className="w-full max-w-sm aspect-[4/5] bg-[#f8f5f0] rounded-xl mb-6 animate-pulse"></div>
                <div className="flex justify-center space-x-3">
                  {transformations.map((_, idx) => (
                    <div key={idx} className="w-3 h-3 bg-[#f8f5f0] rounded-full animate-pulse"></div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 lg:p-8 space-y-6">
                <div className="h-8 bg-[#f8f5f0] rounded animate-pulse"></div>
                <div className="h-20 bg-[#f8f5f0] rounded animate-pulse"></div>
                <div className="space-y-4">
                  {Array(3).fill(0).map((_, idx) => (
                    <div key={idx} className="h-16 bg-[#f8f5f0] rounded-xl animate-pulse"></div>
                  ))}
                </div>
                <div className="h-14 bg-[#f8f5f0] rounded-xl animate-pulse"></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // COMPONENTE PRINCIPAL OTIMIZADO
  return (
    <div className="my-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* HEADER PERSONALIZADO */}
        <motion.div 
          className="text-center mb-12" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          {/* Badge de Credibilidade */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] px-4 py-2 rounded-full border border-[#B89B7A]/20 mb-6">
            <Star className="w-4 h-4 text-[#B89B7A] fill-current" />
            <span className="text-sm font-medium text-[#432818]">Casos de Sucesso Reais</span>
            <Star className="w-4 h-4 text-[#B89B7A] fill-current" />
          </div>

          <h3 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-[#432818] mb-4 leading-tight">
            Mulheres{' '}
            <span className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
              {userStyleCategory}
            </span>
            {' '}Que Se Transformaram
          </h3>
          
          <p className="text-lg md:text-xl text-[#8F7A6A] leading-relaxed max-w-3xl mx-auto mb-6">
            Veja como descobrir e aplicar seu estilo {userStyleCategory.toLowerCase()} mudou completamente a vida dessas mulheres
          </p>
          
          <div className="w-20 h-1 bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] rounded-full mx-auto"></div>
        </motion.div>
        
        {/* CARD PRINCIPAL REDESENHADO */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="overflow-hidden border border-[#B89B7A]/20 rounded-2xl relative"
                style={{ boxShadow: designTokens.shadows.xl }}>
            
            {/* Background decorativo */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fff7f3]/30 to-[#f9f4ef]/30 pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              {/* SEÇÃO DE IMAGEM APRIMORADA */}
              <div className="p-6 lg:p-8 flex flex-col items-center">
                <div className="relative w-full max-w-sm mx-auto">
                  {/* Badge do resultado */}
                  <div className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
                    ✨ {activeTransformation.style}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTransformation.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="relative"
                    >
                      <OptimizedImage
                        src={activeTransformation.image}
                        alt={`Transformação de ${activeTransformation.name} - Estilo ${activeTransformation.style}`}
                        width={activeTransformation.width}
                        height={activeTransformation.height}
                        className="w-full h-auto rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                        style={{ boxShadow: designTokens.shadows.lg }}
                        priority={true}
                      />
                      
                      {/* Overlay com nome */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 border border-[#B89B7A]/20">
                        <p className="font-semibold text-[#432818] text-center">
                          {activeTransformation.name}
                        </p>
                        <p className="text-sm text-[#6B5B4E] text-center">
                          Estilo {activeTransformation.style}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* NAVEGAÇÃO MELHORADA */}
                  {transformations.length > 1 && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 z-20">
                      <NavButton direction="prev" onClick={goToPrevious} />
                      <NavButton direction="next" onClick={goToNext} />
                    </div>
                  )}
                </div>
                
                {/* INDICADORES MELHORADOS */}
                {transformations.length > 1 && (
                  <div className="flex justify-center space-x-3 mt-6">
                    {transformations.map((transformation, idx) => (
                      <button
                        key={idx}
                        onClick={() => navigateToTransformation(idx)}
                        className={`group relative transition-all duration-300 ${
                          idx === activeIndex ? 'scale-110' : 'hover:scale-105'
                        }`}
                        aria-label={`Ver transformação de ${transformation.name}`}
                      >
                        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          idx === activeIndex 
                            ? 'bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] shadow-md' 
                            : 'bg-gray-300 group-hover:bg-[#B89B7A]/50'
                        }`} />
                        {idx === activeIndex && (
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#432818] text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                            {transformation.name}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* SEÇÃO DE CONTEÚDO REDESENHADA */}
              <div className="p-6 lg:p-8 bg-white/50">
                {/* Título personalizado */}
                <div className="mb-6">
                  <h4 className="text-xl lg:text-2xl font-playfair font-bold text-[#432818] mb-3">
                    Resultado de{' '}
                    <span className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                      {activeTransformation.name}
                    </span>
                  </h4>
                  
                  <p className="text-base lg:text-lg text-[#6B5B4E] leading-relaxed">
                    "{activeTransformation.result}"
                  </p>
                </div>
                
                {/* BENEFÍCIOS PERSONALIZADOS PARA O ESTILO */}
                <div className="space-y-4 mb-8">
                  <StyleBenefit
                    icon={<CheckCircle className="w-5 h-5 text-white" />}
                    title="Looks {style} Autênticos"
                    description="Combinações que expressam sua personalidade {style} única"
                    userStyle={userStyleCategory}
                  />
                  
                  <StyleBenefit
                    icon={<Star className="w-5 h-5 text-white" />}
                    title="Cores Ideais para {style}"
                    description="Paleta personalizada que realça sua beleza natural"
                    userStyle={userStyleCategory}
                  />
                  
                  <StyleBenefit
                    icon={<ShoppingCart className="w-5 h-5 text-white" />}
                    title="Guarda-roupa {style} Inteligente"
                    description="Peças estratégicas que maximizam suas combinações"
                    userStyle={userStyleCategory}
                  />
                </div>
                
                {/* CTA OTIMIZADO */}
                <div className="space-y-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleCTA}
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                      className="w-full py-4 px-6 rounded-xl font-bold text-base lg:text-lg transition-all duration-300 cursor-pointer text-white border-0"
                      style={{
                        background: designTokens.colors.gradientBg,
                        boxShadow: designTokens.shadows.cta,
                      }}
                      type="button"
                    >
                      <span className="flex items-center justify-center gap-3" style={{ pointerEvents: 'none' }}>
                        <motion.div animate={{ scale: isButtonHovered ? 1.1 : 1 }}>
                          <ShoppingCart className="w-5 h-5" />
                        </motion.div>
                        Descobrir Meu Estilo {userStyleCategory}
                      </span>
                    </Button>
                  </motion.div>
                  
                  {/* Elementos de confiança */}
                  <div className="text-center space-y-3">
                    <p className="text-sm font-medium text-[#aa6b5d]">
                      ⚡ Acesso imediato • 🔒 Pagamento seguro
                    </p>
                    
                    <div className="flex items-center justify-center gap-2 text-xs text-[#6B5B4E]">
                      <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse"></div>
                      <span>+2.847 mulheres já descobriram seu estilo autêntico</span>
                    </div>
                  </div>
                
                  {/* MÉTODOS DE PAGAMENTO */}
                  <div className="w-full max-w-[280px] mx-auto">
                    <img
                      src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
                      alt="Métodos de pagamento aceitos"
                      className="w-full rounded-lg"
                      style={{ boxShadow: designTokens.shadows.sm }}
                      loading="lazy"
                      width="280"
                      height="70"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(BeforeAfterTransformation);
