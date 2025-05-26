"use client";
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
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px',
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.1)',
    md: '0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.05)',
    highlight: '0 0 15px rgba(184, 155, 122, 0.15)',
    cta: '0 4px 14px rgba(76, 175, 80, 0.4)',
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease',
};
interface BeforeAfterTransformationProps {
  handleCTAClick?: () => void;
interface TransformationItem {
  image: string; 
  name: string;
  id: string; 
  width?: number;
  height?: number;
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
CheckItem.displayName = 'CheckItem';
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
    {direction === 'prev' ? (
      <ChevronLeft size={16} className="text-[#432818] md:w-6 md:h-6" style={{ pointerEvents: 'none' }} />
    ) : (
      <ChevronRight size={16} className="text-[#432818] md:w-6 md:h-6" style={{ pointerEvents: 'none' }} />
    )}
  </button>
// SIMPLIFIED TRANSFORMATIONS DATA
const transformations: TransformationItem[] = [
  {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745519979/Captura_de_tela_2025-03-31_034324_pmdn8y.webp",
    name: "Adriana",
    id: "transformation-adriana",
    width: 600,
    height: 750
  }, 
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745522326/Captura_de_tela_2025-03-31_034324_cpugfj.webp",
    name: "Mariangela", 
    id: "transformation-mariangela",
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
  }, []);
  const goToPrevious = useCallback(() => {
    const prevIndex = (activeIndex - 1 + transformations.length) % transformations.length;
    navigateToTransformation(prevIndex);
  }, [activeIndex, navigateToTransformation]);
  const goToNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % transformations.length;
    navigateToTransformation(nextIndex);
  // LOADING STATE MANAGEMENT
    if (loadedImages[transformations[activeIndex].image]) {
      setIsLoading(false);
  }, [loadedImages, activeIndex]);
  // OPTIMIZED CTA HANDLER
  const handleCTA = useCallback((e?: React.MouseEvent) => {
    // Prevenir comportamento padrão e propagação
    if (e) {
    
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
                <div className="h-12 bg-[#f8f5f0] rounded animate-pulse"></div>
            </div>
          </Card>
        </div>
      </div>
    );
  // MAIN COMPONENT - OPTIMIZED
  return (
    <div className="my-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* HEADER */}
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h3 className="text-xl md:text-2xl font-playfair text-[#aa6b5d] bg-gradient-to-r from-[#aa6b5d] via-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent mb-4">
            Mulheres que Aprenderam e Praticam no dia a dia Seu Estilo de Ser
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] rounded-full mx-auto"></div>
        </motion.div>
        
        {/* MAIN CARD */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="overflow-hidden border border-[#B89B7A]/20 shadow-lg transition-all duration-300">
              {/* IMAGE SECTION */}
                <div className="relative w-full max-w-sm mx-auto">
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
                        alt={`Transformação de ${activeTransformation.name}`}
                        width={activeTransformation.width}
                        height={activeTransformation.height}
                        className="w-full h-auto rounded-lg shadow-md"
                        priority={true}
                      />
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* NAVIGATION - OPTIMIZED */}
                  {transformations.length > 1 && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-1 md:px-2 z-20">
                      <NavButton direction="prev" onClick={goToPrevious} />
                      <NavButton direction="next" onClick={goToNext} />
                    </div>
                  )}
                
                {/* INDICATORS */}
                {transformations.length > 1 && (
                  <div className="flex justify-center space-x-3 mt-4">
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
                    ))}
                  </div>
                )}
              {/* CONTENT SECTION - SIMPLIFIED */}
              <div className="p-6 bg-white">
                <h4 className="text-lg md:text-xl font-medium text-[#432818] text-center md:text-left mb-4">
                  <span className="bg-gradient-to-r from-[#432818] via-[#aa6b5d] to-[#432818] bg-clip-text text-transparent">
                    Transforme sua Imagem
                  </span>
                </h4>
                <p className="text-gray-700 text-base md:text-lg text-center md:text-left mb-5">
                  Seu estilo é muito mais que roupas — é a expressão da sua essência e uma aliada para atingir seus objetivos.
                </p>
                {/* BENEFITS LIST */}
                <div className="bg-[#f9f4ef]/70 rounded-lg p-5 mb-6 border border-[#B89B7A]/10">
                  <ul className="space-y-3 text-center md:text-left">
                    <CheckItem>Looks que expressam sua verdadeira essência</CheckItem>
                    <CheckItem>Cores e modelagens que realçam sua beleza natural</CheckItem>
                    <CheckItem>Imagem profissional alinhada aos seus objetivos</CheckItem>
                    <CheckItem>Guarda-roupa inteligente e sem desperdícios</CheckItem>
                  </ul>
                {/* CTA SECTION */}
                <div className="flex flex-col items-center md:items-start">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleCTA}
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                      className="w-full md:w-auto py-4 px-6 rounded-md shadow-md transition-all duration-300 font-semibold text-sm md:text-base mb-2 cursor-pointer"
                      style={{
                        background: "linear-gradient(to right, #4CAF50, #45a049)",
                        boxShadow: "0 8px 32px rgba(76, 175, 80, 0.4)",
                      }}
                      type="button"
                      <span className="flex items-center justify-center gap-2" style={{ pointerEvents: 'none' }}>
                        <motion.div animate={{ scale: isButtonHovered ? 1.1 : 1, rotate: isButtonHovered ? 10 : 0 }}>
                          <ShoppingCart className="w-5 h-5" />
                        </motion.div>
                        Quero Meu Guia de Estilo
                      </span>
                    </Button>
                  </motion.div>
                  <p className="text-xs text-[#aa6b5d] font-medium text-center md:text-left mb-4">
                    Oferta por tempo limitado
                  </p>
                  {/* PAYMENT METHODS */}
                  <div className="w-full max-w-[280px] mx-auto md:mx-0">
                    <img
                      src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
                      alt="Métodos de pagamento"
                      className="w-full rounded-lg shadow-sm"
                      loading="lazy"
                      width="280"
                      height="70"
                    />
    </div>
  );
export default React.memo(BeforeAfterTransformation);
