import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Sparkles } from 'lucide-react'; // Crown icon removed

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
  'Natural': {
    congratsMessage: "você é uma mulher autêntica e espontânea!",
    powerMessage: "Mulheres com seu estilo conquistam admiração pela naturalidade e charme genuíno. Sua beleza está na simplicidade elegante.",
    ctaText: "QUERO POTENCIALIZAR MEU ESTILO NATURAL",
    exclusive: "Oferta Especial Natural"
  },
  'Clássico': {
    congratsMessage: "você possui elegância atemporal!",
    powerMessage: "Mulheres com seu estilo transmitem confiança e sofisticação. Você é vista como referência de bom gosto e refinamento.",
    ctaText: "QUERO APERFEIÇOAR MEU ESTILO CLÁSSICO",
    exclusive: "Oferta Especial Clássica"
  },
  'Contemporâneo': {
    congratsMessage: "você tem o equilíbrio perfeito entre moderno e prático!",
    powerMessage: "Mulheres com seu estilo são admiradas pela versatilidade e atualidade. Você sempre parece estar à frente do seu tempo.",
    ctaText: "QUERO DOMINAR MEU ESTILO CONTEMPORÂNEO",
    exclusive: "Oferta Especial Contemporânea"
  },
  'Elegante': {
    congratsMessage: "você possui presença e sofisticação únicos!",
    powerMessage: "Mulheres com seu estilo comandam respeito e admiração onde chegam. Sua elegância é sua marca registrada.",
    ctaText: "QUERO MAXIMIZAR MEU ESTILO ELEGANTE",
    exclusive: "Oferta Especial Elegante"
  },
  'Romântico': {
    congratsMessage: "você irradia feminilidade e delicadeza!",
    powerMessage: "Mulheres com seu estilo encantam pela suavidade e charme feminino. Você desperta o lado protetor das pessoas.",
    ctaText: "QUERO REALÇAR MEU ESTILO ROMÂNTICO",
    exclusive: "Oferta Especial Romântica"
  },
  'Sexy': {
    congratsMessage: "você possui magnetismo e confiança únicos!",
    powerMessage: "Mulheres com seu estilo fascinam pela presença marcante e autoconfiança. Você comanda a atenção naturalmente.",
    ctaText: "QUERO APRIMORAR MEU ESTILO SEXY",
    exclusive: "Oferta Especial Sexy"
  },
  'Dramático': {
    congratsMessage: "você tem presença e força impressionantes!",
    powerMessage: "Mulheres com seu estilo lideram e inspiram por onde passam. Sua personalidade forte é seu maior trunfo.",
    ctaText: "QUERO INTENSIFICAR MEU ESTILO DRAMÁTICO",
    exclusive: "Oferta Especial Dramática"
  },
  'Criativo': {
    congratsMessage: "você é única e expressiva!",
    powerMessage: "Mulheres com seu estilo se destacam pela originalidade e criatividade. Você é uma obra de arte viva.",
    ctaText: "QUERO LIBERAR MEU ESTILO CRIATIVO",
    exclusive: "Oferta Especial Criativa"
  }
};

export const PersonalizedHook: React.FC<PersonalizedHookProps> = ({
  styleCategory,
  userName = "Querida",
  onCTAClick
}) => {
  const messages = styleMessages[styleCategory] || styleMessages['Natural'];
  
  return (
    <Card className="bg-gradient-to-br from-[#fff8f4] via-[#faf6f1] to-[#f5f0ea] border-[#B89B7A]/40 p-4 sm:p-6 md:p-8 lg:p-10 mb-8 shadow-lg max-w-4xl mx-auto">
      <div className="text-center">
        {/* Congratulations Header - Crown icons removed, adjusted for centering */}
        <div className="flex items-center justify-center mb-4"> {/* Simplified flex layout */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair text-[#aa6b5d] leading-tight">
            Parabéns, <span className="font-bold">{userName}</span>!
          </h1>
        </div>
        
        {/* Style Revelation - Text sizes and padding adapt for mobile */}
        <div className="mb-6 px-2 sm:px-4">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#432818] mb-3 leading-snug">
            Você é <span className="font-bold text-[#B89B7A] text-xl sm:text-2xl md:text-3xl lg:text-4xl">{styleCategory}</span> —{" "}
            <span className="italic block sm:inline">{messages.congratsMessage}</span>
          </h2>
          
          <div className="bg-white/80 rounded-lg p-4 sm:p-5 md:p-6 shadow-sm border border-[#B89B7A]/20 mb-6 text-left">
            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#B89B7A] mt-1 flex-shrink-0" />
              <p className="text-[#432818] leading-relaxed text-base sm:text-lg">
                {messages.powerMessage}
              </p>
            </div>
          </div>
        </div>
        
        {/* Exclusive Offer Badge - Font size and padding adapt */}
        <div className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 sm:px-6 py-1 sm:py-2 rounded-full shadow-lg text-xs sm:text-sm md:text-base font-medium transform -rotate-2 inline-block mb-6 whitespace-nowrap">
          � {messages.exclusive} - 75% OFF
        </div>
        
        {/* Primary CTA Button - Full width on small screens, adjusts on larger screens */}
        <Button
          onClick={onCTAClick}
          className="w-full sm:w-auto text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
          style={{
            background: "linear-gradient(to right, #4CAF50, #45a049)",
            boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)"
          }}
        >
          <span className="flex items-center justify-center gap-2 sm:gap-3 leading-none"> {/* leading-none ensures compact text */}
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            {messages.ctaText}
          </span>
        </Button>
        
        {/* Urgency Message - Font size adapts, spacing for mobile */}
        <p className="text-[#ff6b6b] text-xs sm:text-sm font-medium animate-pulse mt-4">
          ⚡ Esta oferta expira quando você sair desta página
        </p>
      </div>
    </Card>
  );
};

export default PersonalizedHook;
�