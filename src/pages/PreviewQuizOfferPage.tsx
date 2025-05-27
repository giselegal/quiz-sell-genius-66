
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Shield, Star, Clock, Zap, Award, CheckCircle, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackButtonClick } from '@/utils/analytics';

// Design tokens para consistência
const designTokens = {
  colors: {
    primary: '#B89B7A',
    secondary: '#aa6b5d',
    accent: '#4CAF50',
    background: '#fffaf7',
    white: '#ffffff',
    textPrimary: '#432818',
    textSecondary: '#8F7A6A',
    textMuted: '#6B5B4E',
    success: '#4CAF50',
    warning: '#ff6b35',
    border: 'rgba(184, 155, 122, 0.2)',
  },
  shadows: {
    sm: '0 2px 4px rgba(184, 155, 122, 0.08)',
    md: '0 4px 8px rgba(184, 155, 122, 0.12)',
    lg: '0 8px 16px rgba(184, 155, 122, 0.16)',
    xl: '0 12px 24px rgba(184, 155, 122, 0.20)',
    cta: '0 8px 32px rgba(76, 175, 80, 0.4)',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
  }
};

const PreviewQuizOfferPage: React.FC = () => {
  const router = useRouter();
  const { styleType } = router.query;
  const [isHovered, setIsHovered] = useState(false);

  // CTA handler otimizado
  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    trackButtonClick('checkout_button', 'Preview CTA Click', 'preview_page');
    if (window.innerWidth >= 768) {
      window.open('https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912', '_blank');
    } else {
      window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
    }
  };

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{ 
        backgroundColor: designTokens.colors.background,
        color: designTokens.colors.textPrimary 
      }}
    >
      <div className="container mx-auto max-w-4xl">
        
        {/* Header com Logo */}
        <div className="text-center mb-12">
          <img
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744742025/logo-principal_a7ssqh.png"
            alt="Logo"
            className="h-16 mx-auto mb-6"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Preview da Página de Resultados
          </h1>
          <p className="text-lg text-center" style={{ color: designTokens.colors.textSecondary }}>
            Estilo: <span className="font-semibold">{styleType || 'Natural'}</span>
          </p>
        </div>

        {/* SEÇÃO VALOR REDESENHADA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          {/* Título da Seção */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
              <Star className="w-6 h-6 text-[#B89B7A]" />
              <div className="w-8 h-px bg-gradient-to-r from-[#B89B7A] via-transparent to-transparent"></div>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: designTokens.colors.textPrimary }}>
              Oferta Especial
            </h2>
            <p className="text-lg md:text-xl" style={{ color: designTokens.colors.textSecondary }}>
              Transforme seu estilo hoje mesmo
            </p>
          </div>

          {/* Card Principal de Valor */}
          <Card 
            className="relative overflow-hidden border-2 p-8 md:p-12"
            style={{ 
              borderColor: designTokens.colors.primary,
              backgroundColor: designTokens.colors.white,
              boxShadow: designTokens.shadows.xl 
            }}
          >
            {/* Badge de Urgência */}
            <motion.div
              className="absolute -top-3 -right-3 px-4 py-2 text-white text-sm font-bold rounded-full shadow-lg transform rotate-12"
              style={{ backgroundColor: designTokens.colors.warning }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Clock className="w-4 h-4 inline mr-1" />
              OFERTA LIMITADA
            </motion.div>

            {/* Decoração de Fundo */}
            <div 
              className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${designTokens.colors.primary} 0%, transparent 70%)`
              }}
            />

            <div className="relative z-10">
              {/* Breakdown de Valor */}
              <div 
                className="p-6 rounded-xl mb-8 border"
                style={{ 
                  backgroundColor: `${designTokens.colors.primary}10`,
                  borderColor: designTokens.colors.border 
                }}
              >
                <h3 className="text-xl font-bold mb-6 text-center">
                  Tudo que você vai receber:
                </h3>
                
                <div className="space-y-4">
                  {[
                    { item: 'Guia Completo de Estilo Personalizado', value: 'R$ 97,00' },
                    { item: 'Bônus: Manual de Peças Estratégicas', value: 'R$ 47,00' },
                    { item: 'Bônus: Guia de Visagismo Facial', value: 'R$ 31,00' }
                  ].map((product, index) => (
                    <motion.div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-200"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-medium">{product.item}</span>
                      </div>
                      <span className="font-bold" style={{ color: designTokens.colors.secondary }}>
                        {product.value}
                      </span>
                    </motion.div>
                  ))}
                  
                  <div className="border-t-2 pt-4 mt-6">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-bold">Valor Total:</span>
                      <div className="text-right">
                        <span 
                          className="text-2xl font-bold line-through opacity-60"
                          style={{ color: designTokens.colors.textMuted }}
                        >
                          R$ 175,00
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seção de Preço Principal */}
              <div className="text-center mb-8">
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block"
                >
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">De</p>
                      <p 
                        className="text-2xl line-through"
                        style={{ color: designTokens.colors.textMuted }}
                      >
                        R$ 175,00
                      </p>
                    </div>
                    
                    <ArrowDown className="w-6 h-6 text-green-500" />
                    
                    <div className="text-center">
                      <p className="text-sm font-medium mb-1" style={{ color: designTokens.colors.secondary }}>
                        Por apenas
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg">R$</span>
                        <span 
                          className="text-5xl md:text-6xl font-bold"
                          style={{ color: designTokens.colors.accent }}
                        >
                          39
                        </span>
                        <span className="text-2xl">,90</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                    <div 
                      className="px-4 py-2 rounded-full text-sm font-bold text-white"
                      style={{ backgroundColor: designTokens.colors.accent }}
                    >
                      💰 Economia de R$ 135,10 (77% OFF)
                    </div>
                    
                    <p className="text-sm" style={{ color: designTokens.colors.textSecondary }}>
                      ou <strong>5x de R$ 8,83</strong> sem juros
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.div
                className="text-center mb-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleCTAClick}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full md:w-auto text-white font-bold py-6 px-12 rounded-xl text-lg shadow-lg transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${designTokens.colors.accent}, #45a049)`,
                    boxShadow: designTokens.shadows.cta,
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
                  }}
                >
                  <motion.div
                    className="flex items-center gap-3"
                    animate={isHovered ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <ShoppingCart className="w-6 h-6" />
                    Transformar Meu Estilo Agora
                  </motion.div>
                </Button>
              </motion.div>

              {/* Elementos de Confiança */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Pagamento 100% Seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span>Garantia de 7 dias</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>Acesso Imediato</span>
                </div>
              </div>

              {/* Métodos de Pagamento */}
              <div className="mt-8 text-center">
                <img
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
                  alt="Métodos de pagamento"
                  className="w-full max-w-md mx-auto rounded-lg"
                  style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Footer */}
        <div className="text-center py-8 border-t" style={{ borderColor: designTokens.colors.border }}>
          <p className="text-sm" style={{ color: designTokens.colors.textMuted }}>
            Esta é uma visualização da página de resultados do quiz de estilo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreviewQuizOfferPage;
