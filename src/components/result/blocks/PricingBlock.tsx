import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlockData } from '@/types/resultPageConfig';

interface PricingBlockProps {
  block: BlockData;
  onCTAClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isButtonHovered?: boolean;
  setIsButtonHovered?: (hovered: boolean) => void;
  timer?: { hours: number; minutes: number; seconds: number };
  isEditMode?: boolean;
  onClick?: () => void;
}

const PricingBlock: React.FC<PricingBlockProps> = ({ 
  block,
  onCTAClick,
  isButtonHovered,
  setIsButtonHovered,
  timer,
  isEditMode = false,
  onClick 
}) => {
  const content = block.content;
  
  // Convert StyleOptions to CSS-compatible styles
  const sectionStyles = block.style ? {
    backgroundColor: block.style.backgroundColor,
    padding: block.style.padding,
    margin: block.style.margin,
    borderRadius: block.style.borderRadius,
    fontSize: block.style.fontSize,
    fontWeight: block.style.fontWeight,
    color: block.style.color,
    textAlign: block.style.textAlign as 'left' | 'center' | 'right' | undefined,
    fontFamily: block.style.fontFamily,
    width: block.style.width
  } : {};
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`py-16 px-6 ${isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-[#B89B7A]' : ''}`}
      onClick={onClick}
      style={sectionStyles}
    >
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border border-[#B89B7A]/20 overflow-hidden"
        >
          {/* Header com Timer */}
          {timer && (
            <div className="bg-gradient-to-r from-[#ff6b6b] to-[#ee5a24] text-white text-center py-4 px-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Oferta por tempo limitado!</span>
              </div>
              <div className="text-2xl font-bold">
                {String(timer.hours).padStart(2, '0')}:
                {String(timer.minutes).padStart(2, '0')}:
                {String(timer.seconds).padStart(2, '0')}
              </div>
            </div>
          )}

          <div className="p-8 text-center">
            <h3 className="text-3xl font-playfair font-bold text-[#432818] mb-4">
              {content.title || 'Investimento Especial'}
            </h3>
            
            <div className="mb-6">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                {content.regularPrice && (
                  <span className="text-xl text-[#8F7A6A] line-through">
                    R$ {content.regularPrice}
                  </span>
                )}
              </div>
              
              <div className="text-4xl font-bold text-[#4CAF50] mb-2">
                5x R$ 8,83
              </div>
              
              <div className="text-lg text-[#8F7A6A]">
                ou R$ {content.price || '39,90'} à vista
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-center gap-2 text-[#432818]">
                <Shield className="w-5 h-5 text-[#4CAF50]" />
                <span>Garantia de 7 dias</span>
              </div>
              <div className="text-[#8F7A6A]">
                {content.description || 'Acesso imediato + Bônus exclusivos'}
              </div>
            </div>

            <Button 
              onClick={onCTAClick}
              className="w-full text-white text-lg font-semibold py-6 px-8 rounded-xl shadow-lg transition-all duration-300"
              style={{
                background: 'linear-gradient(90deg, #4CAF50 0%, #43a047 100%)',
                boxShadow: '0 8px 32px rgba(76, 175, 80, 0.4)',
                transform: isButtonHovered ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
              }}
              onMouseEnter={() => setIsButtonHovered?.(true)}
              onMouseLeave={() => setIsButtonHovered?.(false)}
            >
              <div className="flex items-center justify-center gap-3">
                <ShoppingCart className={`w-6 h-6 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
                {content.ctaText || 'Descobrir Meu Estilo Agora'}
              </div>
            </Button>

            <p className="text-sm text-[#8F7A6A] mt-4">
              🔒 Compra 100% segura e protegida
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PricingBlock;
