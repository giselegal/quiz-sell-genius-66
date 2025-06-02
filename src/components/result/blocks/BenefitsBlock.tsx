
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Heart, Zap } from 'lucide-react';
import { BlockData } from '@/types/resultPageConfig';

interface BenefitsBlockProps {
  block: BlockData;
  isEditMode?: boolean;
  onClick?: () => void;
}

const BenefitsBlock: React.FC<BenefitsBlockProps> = ({ 
  block, 
  isEditMode = false,
  onClick 
}) => {
  const content = block.content;
  const benefits = content.features || [
    'Descubra exatamente qual é o seu estilo pessoal',
    'Aprenda a montar looks que valorizam sua personalidade',
    'Economize tempo e dinheiro comprando apenas o que combina com você',
    'Ganhe confiança para se expressar através da moda',
    'Tenha um guarda-roupa funcional e versátil',
    'Desenvolva seu próprio senso de estilo único'
  ];

  const icons = [Check, Star, Heart, Zap];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`py-16 px-6 bg-gradient-to-br from-[#fffaf7] to-[#f9f4ef] ${isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-[#B89B7A]' : ''}`}
      onClick={onClick}
      style={block.style}
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-[#432818] mb-4">
            {content.title || 'O que você vai descobrir'}
          </h2>
          <p className="text-xl text-[#8F7A6A] max-w-2xl mx-auto">
            {content.description || 'Transforme sua relação com a moda e descubra o poder do seu estilo pessoal'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = icons[index % icons.length];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#B89B7A]/10 h-full transition-all duration-300 group-hover:shadow-lg group-hover:border-[#B89B7A]/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-[#432818] leading-relaxed font-medium">
                        {benefit}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default BenefitsBlock;
