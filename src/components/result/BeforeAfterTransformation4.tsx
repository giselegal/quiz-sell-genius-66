import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';
import OptimizedImage from '@/components/ui/optimized-image';
import { preloadImagesByUrls } from '@/utils/imageManager';
import { useIsLowPerformanceDevice } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

// Extend Window interface to include custom property
declare global {
  interface Window {
    ctaClickProcessing?: boolean;
  }
}

// Design tokens centralizados
const designTokens = {
  colors: {
    primary: '#B89B7A',
    secondary: '#aa6b5d',
    text: '#432818',
    textLight: '#8F7A6A',
    background: '#fffaf7',
    cardBg: '#ffffff',
    accent: '#4CAF50',
    accentHover: '#45a049',
    divider: 'rgba(184, 155, 122, 0.2)',
    highlight: '#f9f4ef',
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
    sm: '0 1px 3px rgba(0,0,0,0.1)',
    md: '0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.05)',
    highlight: '0 0 15px rgba(184, 155, 122, 0.15)',
    cta: '0 4px 14px rgba(76, 175, 80, 0.4)',
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

// SIMPLIFIED TRANSFORMATIONS DATA
const transformations: TransformationItem[] = [
  {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745519979/Captura_de_tela_2025-03-31_034324_pmdn8y.webp",
    name: "Adriana",
    id: "transformation-adriana",
    width: 600,
    height: 750
  }, 
  {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745522326/Captura_de_tela_2025-03-31_034324_cpugfj.webp",
    name: "Mariangela", 
    id: "transformation-mariangela",
    width: 600,
    height: 750
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
  const imageUrls = transformations.map(t => t.image);
  const { loadedImages } = useImagePreloader(imageUrls, 0);
  
  const activeTransformation = transformations[activeIndex];

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

  // OPTIMIZED CTA HANDLER
  const handleCTA = useCallback((e?: React.MouseEvent) => {
    // Prevenir comportamento padrão e propagação
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Prevenir múltiplos cliques
    if (window.ctaClickProcessing) return;
    window.ctaClickProcessing = true;
    
    if (handleCTAClick) {
      handleCTAClick();
    } else {
      trackButtonClick('checkout_button', 'Iniciar Checkout', 'transformation_section');
      
      // Para desktop, usar window.open para garantir funcionamento
      if (window.innerWidth >= 768) {
        window.open('https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912', '_blank');
      } else {
        // Para mobile, usar location.href
        window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
      }
    }
    
    // Limpar flag após delay
    setTimeout(() => {
      window.ctaClickProcessing = false;
    }, 1000);
  }, [handleCTAClick]);

  // LOADING SKELETON - SIMPLIFIED
  if (isLoading) {
    return (
      <div className="my-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="h-8 bg-gradient-to-r from-[#f8f5f0] to-[#f0ebe6] rounded-lg mb-4 animate-pulse"></div>
            <div className="w-20 h-1 bg-[#f8f5f0] rounded-full mx-auto animate-pulse"></div>
          </div>
          
          <Card className="overflow-hidden border border-[#B89B7A]/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
              <div className="p-6 flex flex-col items-center">
                <div className="w-full max-w-sm aspect-[4/5] bg-[#f8f5f0] rounded-lg mb-4 animate-pulse"></div>
                <div className="flex justify-center space-x-2 mt-4">
                  {transformations.map((_, idx) => (
                    <div key={idx} className="w-3 h-3 bg-[#f8f5f0] rounded-full animate-pulse"></div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 bg-white space-y-4">
                <div className="h-6 bg-[#f8f5f0] rounded animate-pulse"></div>
                <div className="h-16 bg-[#f8f5f0] rounded animate-pulse"></div>
                <div className="space-y-3">
                  {Array(4).fill(0).map((_, idx) => (
                    <div key={idx} className="h-5 bg-[#f8f5f0] rounded animate-pulse"></div>
                  ))}
                </div>
                <div className="h-12 bg-[#f8f5f0] rounded animate-pulse"></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // MAIN COMPONENT - OPTIMIZED
  return (
    <div className="my-8 md:my-12 lg:my-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER - MELHORADO PARA RESPONSIVIDADE */}
        <motion.div 
          className="text-center mb-8 md:mb-10 lg:mb-12" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            {/* Elemento decorativo de fundo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-[#B89B7A]/20 to-[#aa6b5d]/10 rounded-full blur-3xl"></div>
            </div>
            
            <h3 className="relative text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-playfair text-[#aa6b5d] bg-gradient-to-r from-[#aa6b5d] via-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent mb-4 md:mb-6 px-4 leading-tight max-w-4xl mx-auto">
              Mulheres que Aprenderam e Praticam no dia a dia
              <br className="hidden sm:block" />
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light">
                Seu Estilo de Ser
              </span>
            </h3>
          </div>
          
          <div className="w-16 md:w-20 lg:w-24 h-1 bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] rounded-full mx-auto shadow-sm"></div>
          
          {/* Subtítulo adicional para contexto */}
          <p className="text-sm md:text-base text-[#8F7A6A] mt-4 max-w-2xl mx-auto px-4 font-light">
            Veja como outras mulheres transformaram sua imagem e conquistaram mais confiança
          </p>
        </motion.div>
        
        {/* MAIN CARD - LAYOUT ESTRATÉGICO MELHORADO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden border border-[#B89B7A]/20 shadow-lg hover:shadow-xl transition-all duration-500 bg-white backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 min-h-[500px] lg:min-h-[600px]">
              {/* SEÇÃO DA IMAGEM - 2/5 do espaço em desktop, ordem estratégica */}
              <div className="lg:col-span-2 order-2 lg:order-1 bg-gradient-to-br from-[#fff7f3] to-[#f9f4ef] p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center relative">
                {/* Badge de destaque para mobile */}
                <div className="absolute top-4 left-4 lg:hidden z-20">
                  <span className="bg-[#B89B7A] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
                    ✨ Transformação Real
                  </span>
                </div>
                
                <div className="relative w-full max-w-sm lg:max-w-none mx-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTransformation.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                      <OptimizedImage
                        src={activeTransformation.image}
                        alt={`Transformação de ${activeTransformation.name}`}
                        width={activeTransformation.width}
                        height={activeTransformation.height}
                        className="w-full h-auto rounded-lg shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                        priority={true}
                      />
                      {/* Nome da transformação no hover */}
                      <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium bg-black/50 backdrop-blur-sm rounded px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        Transformação de {activeTransformation.name}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* NAVIGATION - OTIMIZADA PARA TOUCH */}
                  {transformations.length > 1 && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-4 z-30">
                      <NavButton direction="prev" onClick={goToPrevious} />
                      <NavButton direction="next" onClick={goToNext} />
                    </div>
                  )}
                </div>
                
                {/* INDICATORS - POSICIONAMENTO ESTRATÉGICO */}
                {transformations.length > 1 && (
                  <div className="flex justify-center space-x-3 mt-6">
                    {transformations.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => navigateToTransformation(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          idx === activeIndex 
                            ? 'bg-[#B89B7A] scale-110 shadow-sm' 
                            : 'bg-gray-300 hover:bg-[#B89B7A]/50 hover:scale-105'
                        }`}
                        aria-label={`Ver transformação ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* SEÇÃO DE CONTEÚDO - 3/5 do espaço em desktop */}
              <div className="lg:col-span-3 order-1 lg:order-2 p-6 lg:p-8 xl:p-10 bg-white flex flex-col justify-center relative">
                {/* Elemento decorativo sutil */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-[#B89B7A]/10 to-[#aa6b5d]/5 rounded-full blur-xl"></div>
                
                <div className="max-w-xl mx-auto lg:mx-0 relative z-10">
                  {/* Badge de valor para desktop */}
                  <div className="hidden lg:block mb-4">
                    <span className="inline-flex items-center bg-gradient-to-r from-[#4CAF50]/10 to-[#45a049]/10 text-[#4CAF50] text-sm font-semibold px-4 py-2 rounded-full border border-[#4CAF50]/20">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Resultados Comprovados
                    </span>
                  </div>
                  
                  <h4 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-[#432818] text-center lg:text-left mb-4 lg:mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-[#432818] via-[#aa6b5d] to-[#432818] bg-clip-text text-transparent">
                      Transforme sua Imagem
                    </span>
                    <br className="hidden lg:block" />
                    <span className="text-lg md:text-xl lg:text-2xl font-normal text-[#aa6b5d] block mt-2">
                      e Conquiste seus Objetivos
                    </span>
                  </h4>
                  
                  <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-700 text-center lg:text-left mb-6 lg:mb-8 font-light">
                    Seu estilo é muito mais que roupas — é a expressão da sua <strong className="text-[#432818] font-medium">essência</strong> e uma aliada para atingir seus <strong className="text-[#432818] font-medium">objetivos profissionais</strong>.
                  </p>
                  
                  {/* BENEFITS LIST - HIERARQUIA VISUAL MELHORADA */}
                  <div className="bg-gradient-to-br from-[#f9f4ef]/70 via-[#fff7f3]/50 to-[#f9f4ef]/70 rounded-xl p-6 lg:p-7 mb-8 lg:mb-10 border border-[#B89B7A]/15 shadow-sm">
                    <h5 className="text-sm font-semibold text-[#aa6b5d] uppercase tracking-wide mb-4 text-center lg:text-left">
                      O que você vai conseguir:
                    </h5>
                    <ul className="space-y-4 text-center lg:text-left">
                      <CheckItem>Looks que expressam sua verdadeira essência</CheckItem>
                      <CheckItem>Cores e modelagens que realçam sua beleza natural</CheckItem>
                      <CheckItem>Imagem profissional alinhada aos seus objetivos</CheckItem>
                      <CheckItem>Guarda-roupa inteligente e sem desperdícios</CheckItem>
                    </ul>
                  </div>
                  
                  {/* CTA SECTION - POSICIONAMENTO ESTRATÉGICO */}
                  <div className="flex flex-col items-center lg:items-start space-y-5">
                    {/* Urgência sutil */}
                    <div className="flex items-center gap-2 text-sm text-[#aa6b5d] font-medium">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span>Últimas vagas com desconto especial</span>
                    </div>
                    
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleCTA}
                        onMouseEnter={() => setIsButtonHovered(true)}
                        onMouseLeave={() => setIsButtonHovered(false)}
                        className="w-full sm:w-auto py-4 px-8 lg:px-12 rounded-xl shadow-lg transition-all duration-300 font-semibold text-base md:text-lg lg:text-xl cursor-pointer transform hover:shadow-2xl"
                        style={{
                          background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
                          boxShadow: "0 10px 40px rgba(76, 175, 80, 0.4)",
                        }}
                        type="button"
                      >
                        <span className="flex items-center justify-center gap-3" style={{ pointerEvents: 'none' }}>
                          <motion.div animate={{ scale: isButtonHovered ? 1.2 : 1, rotate: isButtonHovered ? 15 : 0 }}>
                            <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
                          </motion.div>
                          Quero Meu Guia de Estilo
                        </span>
                      </Button>
                    </motion.div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center lg:text-left">
                      <p className="text-xs md:text-sm text-[#aa6b5d] font-medium">
                        🔒 Compra 100% segura
                      </p>
                      <div className="hidden sm:block w-1 h-1 bg-[#aa6b5d]/50 rounded-full"></div>
                      <p className="text-xs md:text-sm text-[#aa6b5d] font-medium">
                        ⏰ Oferta por tempo limitado
                      </p>
                    </div>
                  
                    {/* PAYMENT METHODS - RESPONSIVO */}
                    <div className="w-full max-w-[320px] lg:max-w-[300px] mx-auto lg:mx-0 mt-2">
                      <img
                        src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
                        alt="Métodos de pagamento aceitos: cartão, pix, boleto"
                        className="w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                        loading="lazy"
                        width="300"
                        height="75"
                      />
                    </div>
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
