
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { StyleResult } from '@/types/quiz';

interface HeroSectionProps {
  primaryStyle: StyleResult;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  primaryStyle,
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-gradient-to-br from-[#FAF9F7] to-[#F5F2ED] py-16 px-4 ${className}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-playfair text-[#432818] mb-6"
        >
          Parabéns!
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-[#8F7A6A] mb-8"
        >
          Descobrimos seu estilo único
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-lg p-8 shadow-lg"
        >
          <h2 className="text-2xl font-medium text-[#432818] mb-4">
            Seu estilo predominante é
          </h2>
          <div className="text-4xl font-bold text-[#B89B7A] mb-4">
            {primaryStyle?.name || 'Elegante'}
          </div>
          <div className="text-xl text-[#8F7A6A]">
            {primaryStyle?.percentage || 65}%
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
