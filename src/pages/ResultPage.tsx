// src/components/result/PersonalizedHook.tsx (Exemplo de melhoria na revelação do estilo)

import React from 'react';
import { Card } from '@/components/ui/card'; // Certifique-se que Card está sendo usado como wrapper lá no ResultPage
import { Button } from '@/components/ui/button';
import { ShoppingCart, Sparkles, Crown } from 'lucide-react';

interface PersonalizedHookProps {
  styleCategory: string;
  userName?: string;
  onCTAClick: () => void;
}

const styleMessages: Record<string, {
  congratsMessage: string;
  powerMessage: string;
  ctaText: string;
  exclusive: string;
}> = {
  // ... suas mensagens
  'Natural': {
    congratsMessage: "você é uma mulher autêntica e espontânea!",
    powerMessage: "Mulheres com seu estilo conquistam admiração pela naturalidade e charme genuíno. Sua beleza está na simplicidade elegante.",
    ctaText: "QUERO POTENCIALIZAR MEU ESTILO NATURAL",
    exclusive: "Oferta Especial Natural"
  },
  // ...
};

export const PersonalizedHook: React.FC<PersonalizedHookProps> = ({
  styleCategory,
  userName = "Querida",
  onCTAClick
}) => {
  const messages = styleMessages[styleCategory] || styleMessages['Natural'];
  
  return (
    // Note: A Card externa agora é no ResultPage, aqui é só o conteúdo interno.
    <div className="text-center p-0"> {/* Removendo padding daqui, a Card pai já tem */}
      {/* Removemos o "Parabéns, [Nome]" e as coroas daqui, pois foram para o Header */}
      
      {/* Style Revelation - Esta é a GRANDE REVELAÇÃO AGORA */}
      <div className="mb-6">
        {/* Aqui, o nome da categoria é o foco principal */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair text-[#aa6b5d] font-bold leading-tight mb-2"> {/* Font size maior, Playfair, cor de destaque */}
          {styleCategory}
        </h2>
        {/* A mensagem de parabéns vem logo abaixo, um pouco menor */}
        <p className="text-lg sm:text-xl md:text-2xl text-[#432818] italic leading-relaxed">
          {messages.congratsMessage}
        </p>
        
        {/* Mensagem de Poder */}
        <div className="bg-white/80 rounded-lg p-4 sm:p-5 shadow-sm border border-[#B89B7A]/20 mt-6 mb-6 text-left"> {/* mt-6 para separar */}
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#B89B7A] mt-1 flex-shrink-0" />
            <p className="text-[#432818] leading-relaxed text-base sm:text-lg">
              {messages.powerMessage}
            </p>
          </div>
        </div>
      </div>
      
      {/* Exclusive Offer Badge */}
      <div className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-6 py-2 rounded-full shadow-lg text-sm font-medium transform -rotate-2 inline-block mb-6">
        🎯 {messages.exclusive} - 75% OFF
      </div>
      
      {/* Primary CTA Button (Ajuste a cor e sombra para um verde mais elegante se possível) */}
      <Button
        onClick={onCTAClick}
        className="w-full sm:w-auto text-white py-4 px-8 rounded-lg text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg mb-4"
        style={{
          // EXEMPLO: Um verde mais elegante (ex: um tom mais escuro/oliva)
          background: "linear-gradient(to right, #458B74, #3D7A65)", // Exemplo: um verde floresta
          boxShadow: "0 6px 20px rgba(69, 139, 116, 0.4)" // Sombra combinando com o verde
        }}
      >
        <span className="flex items-center justify-center gap-3">
          <ShoppingCart className="w-6 h-6" />
          {messages.ctaText}
        </span>
      </Button>
      
      {/* Urgency Message */}
      <p className="text-[#ff6b6b] text-sm font-medium animate-pulse">
        ⚡ Esta oferta expira quando você sair desta página
      </p>
    </div>
  );
};

export default PersonalizedHook;