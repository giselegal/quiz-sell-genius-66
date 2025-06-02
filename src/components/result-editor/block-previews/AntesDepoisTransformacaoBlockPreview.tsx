import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface AntesDepoisTransformacaoBlockPreviewProps {
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    transformations?: Array<{
      image: string;
      name: string;
      id: string;
      width: number;
      height: number;
    }>;
    benefits?: string[];
    ctaText?: string;
    ctaUrl?: string;
    style?: any;
  };
}

// Design tokens seguindo o padrão do BeforeAfterTransformation4
const designTokens = {
  colors: {
    primary: '#432818',
    accent: '#aa6b5d',
    accent2: '#B89B7A',
    accentHover: '#96594d',
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
    cta: '0 4px 14px rgba(170, 107, 93, 0.4)',
  },
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease',
  },
};

// Dados padrão de transformações
const defaultTransformations = [
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

// Benefícios padrão
const defaultBenefits = [
  "Looks que expressam sua verdadeira essência",
  "Cores e modelagens que realçam sua beleza natural",
  "Imagem profissional alinhada aos seus objetivos",
  "Guarda-roupa inteligente e sem desperdícios"
];

// Componente Badge reutilizável
const Badge: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <span
    className={`absolute z-10 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm ${className}`}
    style={{ boxShadow: designTokens.shadows.sm, backgroundColor: designTokens.colors.accent }}
  >
    {children}
  </span>
);

// CheckItem component otimizado
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

// Navigation Button otimizado
const NavButton = React.memo<{
  direction: 'prev' | 'next';
  onClick: () => void;
}>(({ direction, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white/90 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-md hover:bg-[#B89B7A]/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#B89B7A] focus:ring-offset-2"
    aria-label={direction === 'prev' ? 'Anterior' : 'Próxima'}
  >
    {direction === 'prev' ? (
      <ChevronLeft size={16} className="text-[#432818] md:w-6 md:h-6" style={{ pointerEvents: 'none' }} />
    ) : (
      <ChevronRight size={16} className="text-[#432818] md:w-6 md:h-6" style={{ pointerEvents: 'none' }} />
    )}
  </button>
));

const AntesDepoisTransformacaoBlockPreview: React.FC<AntesDepoisTransformacaoBlockPreviewProps> = ({
  content
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Dados derivados do content ou valores padrão
  const title = content.title || "Transformações Que Inspiram";
  const subtitle = content.subtitle || "Mulheres que Aprenderam e Praticam no dia a dia Seu Estilo de Ser";
  const description = content.description || "Seu estilo é muito mais que roupas — é a expressão da sua personalidade e o reflexo dos seus sonhos e objetivos.";
  const transformations = content.transformations || defaultTransformations;
  const benefits = content.benefits || defaultBenefits;
  const ctaText = content.ctaText || "Quero Meu Guia de Estilo";
  const ctaUrl = content.ctaUrl || "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912";

  const activeTransformation = transformations[activeIndex];

  // Image preloading effect
  useEffect(() => {
    const preloadImages = async () => {
      const promises = transformations.map((transformation) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => ({ ...prev, [transformation.image]: true }));
            resolve();
          };
          img.onerror = () => resolve();
          img.src = transformation.image;
        });
      });

      await Promise.all(promises);
      setIsLoading(false);
    };

    preloadImages();
  }, [transformations]);

  // Navigation handlers
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % transformations.length);
  };

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
  };

  const navigateToTransformation = (index: number) => {
    setActiveIndex(index);
  };

  const handleCTAClick = () => {
    if (ctaUrl) {
      window.open(ctaUrl, '_blank');
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Card className="p-6 bg-white mb-8 shadow-lg border-0 overflow-hidden">
          <div className="max-w-5xl mx-auto">
            {/* Header skeleton */}
            <div className="text-center mb-8 md:mb-10">
              <div className="h-8 bg-[#f8f5f0] rounded animate-pulse mb-4 w-3/4 mx-auto"></div>
              <div className="h-6 bg-[#f8f5f0] rounded animate-pulse mb-4 w-1/2 mx-auto"></div>
              <div className="w-16 md:w-20 h-1 bg-[#f8f5f0] rounded-full mx-auto animate-pulse"></div>
            </div>

            {/* Main content skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
              {/* Image section skeleton */}
              <div className="md:col-span-1 lg:col-span-2 bg-gradient-to-br from-[#fff7f3] to-[#f9f4ef] p-4 md:p-6 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-xs md:max-w-sm mx-auto">
                  <div className="w-full aspect-[4/5] bg-[#f8f5f0] rounded-lg animate-pulse"></div>
                  <div className="flex justify-center space-x-2 mt-4">
                    {transformations.map((_, idx) => (
                      <div key={idx} className="w-3 h-3 bg-[#f8f5f0] rounded-full animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Content section skeleton */}
              <div className="md:col-span-1 lg:col-span-3 p-4 md:p-6 bg-white space-y-4">
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
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <Card className="p-6 bg-white mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          {/* HEADER */}
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
              
              <motion.h3 
                className="relative text-xl md:text-2xl lg:text-3xl font-playfair text-[#aa6b5d] mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-[#aa6b5d] via-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                  {title}
                </span>
                <br className="hidden sm:block" />
                <span className="text-lg md:text-xl lg:text-2xl font-light">
                  {subtitle}
                </span>
              </motion.h3>
            </div>
            
            <motion.div 
              className="w-16 md:w-20 h-1 bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] rounded-full mx-auto shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 1, delay: 0.4 }}
            />
            
            <motion.p 
              className="text-sm md:text-base text-[#8F7A6A] mt-4 max-w-2xl mx-auto px-4 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Veja mulheres reais que descobriram seu estilo e transformaram completamente sua relação com Estilo, Imagem e Presença
            </motion.p>
          </motion.div>
          
          {/* MAIN CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="overflow-hidden border border-[#B89B7A]/20 shadow-lg transition-all duration-300 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
                {/* SEÇÃO DA IMAGEM */}
                <div className="md:col-span-1 lg:col-span-2 order-1 md:order-1 bg-gradient-to-br from-[#fff7f3] to-[#f9f4ef] p-4 md:p-6 flex flex-col items-center justify-center relative">
                  {/* Badge de destaque */}
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="bg-[#B89B7A] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                      ✨ Transformação Real
                    </Badge>
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
                    
                    {/* NAVIGATION */}
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
                
                {/* SEÇÃO DE CONTEÚDO */}
                <div className="md:col-span-1 lg:col-span-3 order-2 md:order-2 p-4 md:p-6 bg-white flex flex-col">
                  <div className="h-full flex flex-col">
                    <motion.h4 
                      className="text-xl md:text-2xl font-medium text-[#432818] text-center md:text-left mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, delay: 0.8 }}
                    >
                      <span className="bg-gradient-to-r from-[#432818] via-[#aa6b5d] to-[#432818] bg-clip-text text-transparent">
                        Transforme sua Imagem, Transforme sua Vida
                      </span>
                    </motion.h4>
                    
                    <motion.p 
                      className="text-[#8F7A6A] text-base mb-5 text-center md:text-left"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1 }}
                    >
                      {description}
                    </motion.p>
                    
                    <motion.div 
                      className="bg-gradient-to-r from-[#f9f4ef] to-[#fff7f3] rounded-lg p-4 md:p-6 mb-4 md:mb-6 border border-[#B89B7A]/20 shadow-sm flex-grow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                    >
                      <div className="mb-4 md:mb-6">
                        <h5 className="text-lg font-semibold text-[#432818] mb-3 flex items-center gap-2">
                          ✨ <span className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">Guias de Estilo Personalizados</span>
                        </h5>
                        
                        <ul className="space-y-2 md:space-y-3 text-[#aa6b5d]">
                          {benefits.map((benefit, index) => (
                            <CheckItem key={index}>{benefit}</CheckItem>
                          ))}
                        </ul>
                      </div>

                      {/* PREÇO */}
                      <div className="bg-gradient-to-r from-[#B89B7A]/10 to-[#aa6b5d]/10 rounded-lg p-4 mt-4 md:mt-6 text-center border border-[#aa6b5d]/30">
                        <p className="text-sm text-gray-600 mb-1">Valor Total dos Produtos:</p>
                        <p className="text-lg text-gray-500 line-through mb-1">R$ 175,00</p>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-2xl md:text-3xl font-bold text-[#aa6b5d]">R$ 39,90</span>
                          <span className="bg-[#aa6b5d] text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">77% OFF</span>
                        </div>
                        <p className="text-xs text-green-600 font-semibold whitespace-nowrap">
                          Economia de R$ 135,10 (77% OFF)
                        </p>
                      </div>

                      {/* CTA BUTTON */}
                      <motion.div
                        className="mt-4 md:mt-6"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={handleCTAClick}
                          onMouseEnter={() => setIsButtonHovered(true)}
                          onMouseLeave={() => setIsButtonHovered(false)}
                          className="w-full py-3 px-4 rounded-md shadow-md font-semibold text-base mb-2 focus:outline-none focus:ring-2 focus:ring-[#B89B7A] focus:ring-offset-2 transition-all duration-200 leading-none animate-gradient-x select-none relative overflow-hidden animate-cta-pulse !flex !items-center !justify-center z-10"
                          style={{
                            background: "linear-gradient(90deg, #B89B7A 0%, #aa6b5d 100%)",
                            boxShadow: designTokens.shadows.cta,
                            color: "#fff",
                            border: "none",
                            backgroundSize: "200% 200%",
                            backgroundPosition: "left center",
                            transition: "background-position 0.5s cubic-bezier(0.4,0,0.2,1)"
                          }}
                          type="button"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <motion.div animate={{ scale: isButtonHovered ? 1.1 : 1, rotate: isButtonHovered ? 10 : 0 }}>
                              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                            </motion.div>
                            {ctaText}
                          </span>
                        </Button>
                      </motion.div>
                      
                      {/* GARANTIAS */}
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
                    
                      {/* PAYMENT METHODS */}
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
      </Card>
    </motion.div>
  );
};

export default AntesDepoisTransformacaoBlockPreview;
