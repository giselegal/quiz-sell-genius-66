import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';
import OptimizedImage from '@/components/ui/optimized-image';
import { useIsLowPerformanceDevice } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

// Extend Window interface to include custom property
declare global {
  interface Window {
    ctaClickProcessing?: boolean;
  }
}

// Design tokens centralizados - Atualizado para remover verde
const designTokens = {
  colors: {
    primary: '#B89B7A',
    secondary: '#aa6b5d',
    text: '#432818',
    textLight: '#8F7A6A',
    background: '#fffaf7',
    cardBg: '#ffffff',
    accent: '#aa6b5d',      // Substituído de #4CAF50 para #aa6b5d
    accentHover: '#96594d', // Substituído de #45a049 para um tom mais escuro
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
    cta: '0 4px 14px rgba(170, 107, 93, 0.4)', // Atualizado para usar a cor accent
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

// SIMPLIFIED TRANSFORMATIONS DATA - Corrigido para formato correto
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="h-8 bg-gradient-to-r from-[#f8f5f0] to-[#f0ebe6] rounded-lg mb-4 animate-pulse"></div>
            <div className="w-20 h-1 bg-[#f8f5f0] rounded-full mx-auto animate-pulse"></div>
          </div>
          
          <Card className="overflow-hidden border border-[#B89B7A]/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
              <div className="p-4 md:p-6 flex flex-col items-center">
                <div className="w-full aspect-[4/5] bg-[#f8f5f0] rounded-lg mb-4 animate-pulse"></div>
                <div className="flex justify-center space-x-2 mt-4">
                  {transformations.map((_, idx) => (
                    <div key={idx} className="w-3 h-3 bg-[#f8f5f0] rounded-full animate-pulse"></div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 md:p-6 bg-white space-y-4">
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

  // MAIN COMPONENT - REDESENHADO PARA MELHOR RESPONSIVIDADE
  return (
    <div className="my-8 md:my-12 lg:my-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* HEADER - Atualizado com as novas informações */}
        <motion.div 
          className="text-center mb-8 md:mb-10" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            {/* Elemento decorativo de fundo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#B89B7A]/20 to-[#aa6b5d]/10 rounded-full blur-3xl"></div>
            </div>
            
            <h3 className="relative text-xl md:text-2xl lg:text-3xl font-playfair text-[#aa6b5d] mb-4">
              <span className="bg-gradient-to-r from-[#aa6b5d] via-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                Transformações Que Inspiram
              </span>
              <br className="hidden sm:block" />
              <span className="text-lg md:text-xl lg:text-2xl font-light">
                Mulheres que Aprenderam e Praticam no dia a dia Seu Estilo de Ser
              </span>
            </h3>
          </div>
          
          <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] rounded-full mx-auto shadow-sm"></div>
          
          <p className="text-sm md:text-base text-[#8F7A6A] mt-4 max-w-2xl mx-auto px-4 font-light">
            Veja mulheres reais que descobriram seu estilo e transformaram completamente sua relação com Estilo, Imagem e Presença
          </p>
        </motion.div>
        
        {/* MAIN CARD - LAYOUT MELHORADO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden border border-[#B89B7A]/20 shadow-lg transition-all duration-300 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
              {/* SEÇÃO DA IMAGEM - Otimizada para todos os dispositivos */}
              <div className="md:col-span-1 lg:col-span-2 order-1 md:order-1 bg-gradient-to-br from-[#fff7f3] to-[#f9f4ef] p-4 md:p-6 flex flex-col items-center justify-center relative">
                {/* Badge de destaque */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-[#B89B7A] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    ✨ Transformação Real
                  </span>
                </div>
                
                <div className="relative w-full max-w-xs md:max-w-sm mx-auto">
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
                  
                  {/* NAVIGATION - Melhorada para mobile */}
                  {transformations.length > 1 && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 z-30 pointer-events-none">
                      <div className="pointer-events-auto">
                        <NavButton direction="prev" onClick={goToPrevious} />
                      </div>
                      <div className="pointer-events-auto">
                        <NavButton direction="next" onClick={goToNext} />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* INDICATORS */}
                {transformations.length > 1 && (
                  <div className="flex justify-center space-x-3 mt-4">
                    {transformations.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => navigateToTransformation(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          idx === activeIndex 
                            ? 'bg-[#B89B7A] scale-110' 
                            : 'bg-gray-300 hover:bg-[#B89B7A]/50'
                        }`}
                        aria-label={`Ver transformação ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* SEÇÃO DE CONTEÚDO - Atualizada com novos textos */}
              <div className="md:col-span-1 lg:col-span-3 order-2 md:order-2 p-4 md:p-6 bg-white flex flex-col">
                <div className="h-full flex flex-col">
                  <h4 className="text-xl md:text-2xl font-medium text-[#432818] text-center md:text-left mb-4">
                    <span className="bg-gradient-to-r from-[#432818] via-[#aa6b5d] to-[#432818] bg-clip-text text-transparent">
                      Transforme sua Imagem, Transforme sua Vida
                    </span>
                  </h4>
                  
                  <p className="text-[#8F7A6A] text-base mb-5 text-center md:text-left">
                    Seu estilo é muito mais que roupas — é a expressão da sua personalidade e o reflexo dos seus sonhos e objetivos.
                  </p>
                  
                  <div className="bg-gradient-to-r from-[#f9f4ef] to-[#fff7f3] rounded-lg p-4 md:p-6 mb-4 md:mb-6 border border-[#B89B7A]/20 shadow-sm flex-grow">
                    {/* PRODUTO PRINCIPAL */}
                    <div className="mb-4 md:mb-6">
                      <h5 className="text-lg font-semibold text-[#432818] mb-3 flex items-center gap-2">
                        ✨ <span className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">Guias de Estilo Personalizados</span>
                      </h5>
                      <ul className="space-y-2 md:space-y-3 text-[#aa6b5d]">
                        <CheckItem>Looks que expressam sua verdadeira essência</CheckItem>
                        <CheckItem>Cores e modelagens que realçam sua beleza natural</CheckItem>
                        <CheckItem>Imagem profissional alinhada aos seus objetivos</CheckItem>
                        <CheckItem>Guarda-roupa inteligente e sem desperdícios</CheckItem>
                      </ul>
                    </div>

                    {/* BÔNUS - Layout melhorado */}
                    <div className="border-t border-[#B89B7A]/20 pt-4 md:pt-6">
                      <h6 className="text-base md:text-lg font-semibold text-[#432818] mb-3 text-center">
                        🎁 <span className="text-[#aa6b5d]">BÔNUS EXCLUSIVOS</span>
                      </h6>
                      
                      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                        <div className="bg-white/80 rounded-lg p-3 border border-[#B89B7A]/10">
                          <div className="font-semibold text-[#aa6b5d] text-sm mb-1">🔥 BÔNUS #1</div>
                          <p className="text-[#432818] font-medium text-sm mb-1">Guia das Peças Estratégicas</p>
                          <p className="text-xs text-gray-600 line-through">Valor: R$ 59,00</p>
                        </div>
                        
                        <div className="bg-white/80 rounded-lg p-3 border border-[#B89B7A]/10">
                          <div className="font-semibold text-[#aa6b5d] text-sm mb-1">💄 BÔNUS #2</div>
                          <p className="text-[#432818] font-medium text-sm mb-1">Manual de Visagismo Facial</p>
                          <p className="text-xs text-gray-600 line-through">Valor: R$ 37,00</p>
                        </div>
                      </div>
                    </div>

                    {/* PREÇO - Mais compacto e efetivo */}
                    <div className="bg-gradient-to-r from-[#B89B7A]/10 to-[#aa6b5d]/10 rounded-lg p-4 mt-4 md:mt-6 text-center border border-[#aa6b5d]/30">
                      <p className="text-sm text-gray-600 mb-1">Valor Total dos Produtos:</p>
                      <p className="text-lg text-gray-500 line-through mb-1">R$ 175,00</p>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-2xl md:text-3xl font-bold text-[#aa6b5d]">R$ 39,90</span>
                        <span className="bg-[#aa6b5d] text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">77% OFF</span>
                      </div>
                      <p className="text-xs text-[#aa6b5d] font-medium">⏰ Oferta por tempo limitado</p>
                    </div>
                  </div>
                  
                  {/* CTA SECTION - Atualizada com novo texto */}
                  <div className="flex flex-col items-center space-y-3">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                      <Button
                        onClick={handleCTA}
                        onMouseEnter={() => setIsButtonHovered(true)}
                        onMouseLeave={() => setIsButtonHovered(false)}
                        className="w-full py-3 md:py-4 px-4 md:px-8 rounded-md shadow-lg transition-all duration-300 font-bold text-sm md:text-base"
                        style={{
                          background: "linear-gradient(to right, #B89B7A, #aa6b5d)",
                          boxShadow: "0 8px 20px rgba(170, 107, 93, 0.3)",
                        }}
                        type="button"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <motion.div animate={{ scale: isButtonHovered ? 1.1 : 1, rotate: isButtonHovered ? 10 : 0 }}>
                            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                          </motion.div>
                          Quero Meu Guia de Estilo
                        </span>
                      </Button>
                    </motion.div>
                    
                    {/* GARANTIAS - Mais compactas */}
                    <div className="flex flex-wrap justify-center gap-3 text-xs text-[#aa6b5d] font-medium">
                      <div className="flex items-center gap-1">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="12" fill="#aa6b5d"/>
                          <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Acesso imediato</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" fill="#aa6b5d"/>
                          <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>100% seguro</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#aa6b5d"/>
                        </svg>
                        <span>Garantia de satisfação</span>
                      </div>
                    </div>
                  
                    {/* PAYMENT METHODS - Melhor ajustadas */}
                    <div className="w-full max-w-[240px] mx-auto">
                      <img
                        src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
                        alt="Métodos de pagamento"
                        className="w-full rounded-lg shadow-sm"
                        loading="lazy"
                        width="240"
                        height="60"
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
