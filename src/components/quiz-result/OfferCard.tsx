
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { StyleResult } from '@/types/quiz';
import BenefitList from './sales/BenefitList';
import Testimonials from './sales/Testimonials';
import Guarantee from './sales/Guarantee';
import Logo from '../ui/logo';
import { OfferContent } from '@/types/resultPageConfig';
import { motion } from 'framer-motion';

interface OfferCardProps {
  primaryStyle: StyleResult;
  config: OfferContent;
}

const OfferCard: React.FC<OfferCardProps> = ({ primaryStyle, config }) => {
  // Defaults with fallbacks for missing config values
  const title = config?.title || "Revelamos seu estilo. Agora é hora da sua transformação elegante e autêntica.";
  const subtitle = config?.subtitle || `Descubra como expressar seu estilo ${primaryStyle.category} com confiança e naturalidade, eliminando as dúvidas do "o que vestir" para sempre. ✨`;
  const regularPrice = config?.regularPrice || "197,00";
  const salePrice = config?.price || "39,00";
  const ctaText = config?.ctaText || `Quero Meu Guia Personalizado + Bônus por R$${salePrice}`;
  const ctaUrl = config?.ctaUrl || "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912";
  
  // Images with fallbacks
  const heroImage = config?.heroImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp";
  const productsImage = config?.allProductsImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp";
  const mentorImage = config?.mentorImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp";
  const bonusImage = config?.bonusImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp";
  
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="space-y-6 bg-[#fffaf7] px-4 py-8 rounded-lg relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
      
      <div className="text-center relative z-10">
        <Logo className="h-20 mx-auto mb-8" />
      </div>

      <div className="text-center mb-8 relative z-10">
        <div className="inline-block px-6 py-1.5 bg-gradient-to-r from-[#B89B7A]/30 to-[#aa6b5d]/30 rounded-full text-[#aa6b5d] text-sm font-medium mb-3 shadow-sm transform hover:scale-105 transition-transform duration-300">
          OFERTA EXCLUSIVA E PERSONALIZADA
        </div>
        <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-4">
          {title}
        </h2>
        <div className="elegant-divider w-32 mx-auto mb-3"></div>
        <p className="text-[#3a3a3a] max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="relative z-10 group">
        <img
          src={heroImage}
          alt="Guia de Estilo Personalizado"
          className="w-full rounded-lg mb-8 transform transition-all duration-500 hover:scale-102 shadow-lg group-hover:shadow-xl"
        />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#B89B7A]/0 via-[#B89B7A]/30 to-[#aa6b5d]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur"></div>
      </div>

      <Card className="p-6 border-[#aa6b5d]/20 bg-white card-elegant relative z-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#FAF9F7]/50 to-transparent pointer-events-none"></div>
        
        <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-5 relative">
          {config?.productTitle || "Guia de Estilo Personalizado + Bônus Exclusivos"}
          <motion.div 
            className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]/80"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        </h2>
        
        <img
          src={productsImage}
          alt="Todos os produtos e bônus mockup"
          className="w-full rounded-lg mb-6 hover:scale-105 transition-transform duration-300 shadow-md"
        />

        <div className="space-y-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-6 p-6 bg-gradient-to-r from-[#fff7f3] to-[#fff9f5] rounded-lg border border-[#B89B7A]/20 shadow-sm">
            <div className="text-center md:text-right transform rotate-[-5deg]">
              <p className="text-sm text-[#3a3a3a]/70 mb-1">Valor Original</p>
              <p className="text-xl line-through text-[#3a3a3a]/70 font-medium">R$ {regularPrice}</p>
            </div>
            <div className="text-center transform rotate-[1deg] relative">
              <motion.div 
                className="absolute -inset-2 bg-gradient-to-r from-[#B89B7A]/10 to-[#aa6b5d]/10 rounded-xl blur-sm"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <p className="text-sm text-[#aa6b5d] font-medium mb-1">Oferta Exclusiva</p>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]">
                R$ {salePrice}
              </p>
              <motion.div 
                className="absolute -top-3 -right-3 bg-[#aa6b5d] text-white px-3 py-0.5 rounded-full text-xs font-bold transform rotate-12 shadow-md"
                animate={{ 
                  y: [0, -3, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                HOJE
              </motion.div>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              className="w-full bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] hover:from-[#a08968] hover:to-[#965e54] text-white py-7 rounded-md text-lg transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => window.location.href = ctaUrl}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'scale-110 rotate-12' : ''}`} />
                {ctaText}
              </span>
            </Button>
          </motion.div>
          
          {/* Elegant shadow beneath button */}
          <div className="h-2 bg-gradient-to-r from-transparent via-[#aa6b5d]/30 to-transparent rounded-full mx-auto w-3/4"></div>
        </div>
      </Card>

      <BenefitList items={config?.benefitItems} />
      
      <div className="grid md:grid-cols-2 gap-6 relative z-10">
        <div className="interactive-section">
          <img
            src={bonusImage}
            alt="Mockup celular peças-chave por dentro"
            className="w-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="interactive-section">
          <img
            src={mentorImage}
            alt="Foto Gisele Galvão"
            className="w-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      
      <Testimonials items={config?.testimonials} />
      <Guarantee text={config?.guaranteeText} />
      
      <div className="text-center mt-8 relative z-10">
        <Button 
          className="btn-elegant btn-3d text-white py-6 rounded-md text-lg px-8"
          onClick={() => window.location.href = ctaUrl}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="flex items-center gap-2">
            <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
            {ctaText}
          </span>
        </Button>
        
        <p className="text-sm text-[#aa6b5d] mt-3">
          ⏳ Oferta exclusiva por tempo limitado
        </p>
      </div>
    </div>
  );
};

export default OfferCard;
