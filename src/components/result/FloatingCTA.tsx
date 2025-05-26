"use client";
import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { trackButtonClick } from '@/utils/analytics';

interface FloatingCTAProps {
  onClickCTA: () => void;
}
const FloatingCTA: React.FC<FloatingCTAProps> = ({ onClickCTA }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  // Detectar quando o usuário rolou além do header inicial
  useEffect(() => {
    const handleScroll = () => {
      // Mostrar o botão quando rolar além de 800px (ajustar conforme necessário)
      const threshold = 800;
      const currentScrollPosition = window.scrollY;
      
      setIsVisible(currentScrollPosition > threshold);
    };
    // Adicionar listener de scroll com throttling para performance
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    
    const throttledScrollHandler = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100); // 100ms throttle
      }
    window.addEventListener('scroll', throttledScrollHandler);
    // Limpar listener
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      if (timeoutId) clearTimeout(timeoutId);
  }, []);
  const handleClick = () => {
    trackButtonClick('floating_cta', 'Comprar via Botão Flutuante', 'results_page');
    onClickCTA();
  };
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-4 left-0 right-0 z-50 flex justify-center items-center px-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-xl border border-[#B89B7A]/20 flex items-center">
            <div className="hidden md:block mr-4 text-[#432818] font-medium">
              Transforme seu estilo hoje!
            </div>
            <Button
              onClick={handleClick}
              className="text-white text-sm py-2 px-4 md:px-6 rounded-full shadow-md transition-all btn-3d"
              style={{
                background: "linear-gradient(to right, #4CAF50, #45a049)",
                boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)",
              }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <span className="flex items-center justify-center gap-2">
                <ShoppingCart className={`w-4 h-4 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
                <span className="hidden sm:inline">Garantir Meu Guia</span>
                <span className="sm:hidden">Comprar</span>
              </span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default FloatingCTA;
