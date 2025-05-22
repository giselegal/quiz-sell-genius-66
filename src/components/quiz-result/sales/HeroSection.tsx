
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Card } from '@/components/ui/card';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  primaryStyle: StyleResult;
  title?: string;
  subtitle?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  primaryStyle,
  title,
  subtitle
}) => {
  return (
    <motion.div 
      className="relative space-y-8 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="text-center space-y-5"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative inline-block">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-playfair text-[#aa6b5d] mb-3 relative z-10"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 50 }}
          >
            {title || "VOCÊ DESCOBRIU SEU ESTILO"}
          </motion.h1>
          <motion.div 
            className="absolute -bottom-2 left-0 right-0 mx-auto h-3 w-4/5 bg-[#ffefec] rounded-full -z-0"
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 1.2, delay: 0.7 }}
          />
          <motion.div
            className="absolute -top-6 -right-8 text-amber-400"
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Sparkles size={28} />
          </motion.div>
        </div>
        
        <motion.p 
          className="text-xl md:text-2xl font-playfair text-[#3a3a3a] mb-6 max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {subtitle || "Agora é hora de aplicar com clareza — e se vestir de você"}
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          whileHover={{ scale: 1.03 }}
        >
          <Card className="p-5 bg-gradient-to-r from-[#fff5f2] to-[#ffefec] border-[#aa6b5d]/20 inline-block mx-auto shadow-md">
            <div className="flex items-center gap-3 text-[#aa6b5d] font-medium">
              <span>Seu estilo predominante é</span>
              <motion.span 
                className="font-bold text-lg relative"
                whileHover={{ y: -2 }}
              >
                {primaryStyle.category}
                <motion.div 
                  className="absolute -bottom-1 left-0 h-[2px] w-full bg-[#aa6b5d]/30 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </motion.span>
              <motion.div
                initial={{ x: -5, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                whileHover={{ x: 3 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-2 gap-8 items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative overflow-hidden rounded-xl shadow-lg"
        >
          <motion.img
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
            alt="Guia Completo de Estilo"
            className="w-full rounded-lg shadow-lg z-10 relative"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-[#aa6b5d]/10 to-transparent z-0"
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative overflow-hidden rounded-xl shadow-lg"
        >
          <motion.img
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp"
            alt="Gisele Galvão"
            className="w-full rounded-lg shadow-lg object-cover z-10 relative"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-[#aa6b5d]/10 to-transparent z-0"
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
};

export default HeroSection;
