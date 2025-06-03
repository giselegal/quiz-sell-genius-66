import React from 'react';
import { motion } from 'framer-motion';
import { BlockData } from '@/types/resultPageConfig';
import { StyleResult } from '@/types/quiz';

interface HeroBlockProps {
  block: BlockData;
  primaryStyle?: StyleResult;
  isEditMode?: boolean;
  onClick?: () => void;
}

const HeroBlock: React.FC<HeroBlockProps> = ({ 
  block, 
  primaryStyle, 
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative py-12 px-6 ${isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-[#B89B7A] hover:bg-[#FAF9F7]' : ''}`}
      onClick={onClick}
      style={sectionStyles}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Principal */}
          <div className="space-y-6">
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl lg:text-5xl font-playfair font-bold text-[#432818] leading-tight"
              >
                {content.title || 'VOCÊ DESCOBRIU SEU ESTILO'}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-[#8F7A6A] leading-relaxed"
              >
                {content.subtitle || 'Agora é hora de aplicar com clareza — e se vestir de você'}
              </motion.p>
            </div>

            {primaryStyle && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="inline-block"
              >
                <div className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-6 py-3 rounded-full shadow-lg">
                  <p className="font-medium">
                    Seu estilo predominante é <span className="font-bold">{primaryStyle.category}</span>
                  </p>
                  <p className="text-sm opacity-90">
                    {primaryStyle.percentage}% de compatibilidade
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Imagem Hero */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {content.imageUrl ? (
              <div className="relative">
                <img
                  src={content.imageUrl}
                  alt="Hero"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  style={{ aspectRatio: '4/5', objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-[#B89B7A]/20 to-[#aa6b5d]/20 rounded-2xl h-96 flex items-center justify-center">
                <p className="text-[#8F7A6A]">Adicione uma imagem hero</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroBlock;
