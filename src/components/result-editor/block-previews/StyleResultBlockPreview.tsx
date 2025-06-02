
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { styleConfig } from '@/config/styleConfig';
import { motion } from 'framer-motion';

interface StyleResultBlockPreviewProps {
  content: {
    description?: string;
    customImage?: string;
  };
  primaryStyle: StyleResult;
}

const StyleResultBlockPreview: React.FC<StyleResultBlockPreviewProps> = ({
  content,
  primaryStyle
}) => {
  const getStyleImage = (): string => {
    const defaultImage = 'https://placehold.co/600x400/png';
    return content.customImage || styleConfig[primaryStyle.category]?.image || defaultImage;
  };

  const getGuideImage = (): string => {
    const defaultGuideImage = 'https://placehold.co/600x400/png?text=Guia+do+Estilo';
    return styleConfig[primaryStyle.category]?.guideImage || defaultGuideImage;
  };

  return (
    <motion.div 
      className="p-6 bg-[#FAF9F7] rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h3 className="text-2xl font-playfair text-[#432818] mb-2">
          Seu estilo predominante é <span className="font-bold">{primaryStyle.category}</span>
        </h3>
        <div className="inline-block bg-[#B89B7A] text-white px-4 py-1 rounded-full text-sm">
          {primaryStyle.percentage}% de compatibilidade
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="mb-2">
            <p className="text-sm font-medium text-[#8F7A6A] mb-2">Estilo {primaryStyle.category}</p>
            <img
              src={getStyleImage()}
              alt={`Estilo ${primaryStyle.category}`}
              className="w-full h-auto object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="mb-2">
            <p className="text-sm font-medium text-[#8F7A6A] mb-2">Guia de Estilo</p>
            <img
              src={getGuideImage()}
              alt={`Guia do estilo ${primaryStyle.category}`}
              className="w-full h-auto object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p className="text-[#5A5A5A] leading-relaxed text-center">
          {content.description || styleConfig[primaryStyle.category]?.description || `O estilo ${primaryStyle.category} é caracterizado por suas qualidades únicas e distintivas.`}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default StyleResultBlockPreview;
