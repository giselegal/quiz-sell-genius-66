import React from 'react';
import { Card } from '@/components/ui/card';
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
    <Card className="bg-gradient-to-br from-[#fff8f4] via-[#faf6f1] to-[#f5f0ea] border-[#B89B7A]/40 p-8 mb-8 shadow-lg">
      <div className="text-center">
        {/* Congratulations Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Crown className="w-6 h-6 text-[#FFD700]" />
          <h1 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d]">
            Parabéns, <span className="font-bold">{userName}</span>!
          </h1>
          <Crown className="w-6 h-6 text-[#FFD700]" />
        </div>
        
        {/* Style Revelation */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl text-[#432818] mb-3">
            Você é <span className="font-bold text-[#B89B7A] text-2xl md:text-3xl">{styleCategory}</span> —{" "}
            <span className="italic">{messages.congratsMessage}</span>
          </h2>
          
          <div className="bg-white/80 rounded-lg p-4 shadow-sm border border-[#B89B7A]/20 mb-6">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#B89B7A] mt-1 flex-shrink-0" />
              <p className="text-[#432818] leading-relaxed text-lg">
                {messages.powerMessage}
              </p>
            </div>
          </div>
        </div>
        
        {/* Exclusive Offer Badge */}
        <div className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-6 py-2 rounded-full shadow-lg text-sm font-medium transform -rotate-2 inline-block mb-6">
          🎯 {messages.exclusive} - 75% OFF
        </div>
        
        {/* Primary CTA */}
        <Button
          onClick={onCTAClick}
          className="text-white py-4 px-8 rounded-lg text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg mb-4"
          style={{
            background: "linear-gradient(to right, #4CAF50, #45a049)",
            boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)"
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
    </Card>
  );
};

export default PersonalizedHook;