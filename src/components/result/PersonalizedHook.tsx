import React from 'react';
import { Card } from '@/components/ui/card'; // Card pode ser removido se não for usado para outros fins neste arquivo
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react'; // Alterado Sparkles para Star

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
    exclusive: "Oferta Especial"
  },
  'Clássico': {
    congratsMessage: "você possui elegância atemporal!",
    powerMessage: "Mulheres com seu estilo transmitem confiança e sofisticação. Você é vista como referência de bom gosto e refinamento.",
    ctaText: "QUERO APERFEIÇOAR MEU ESTILO CLÁSSICO",
    exclusive: "Oferta Especial"
  },
  'Contemporâneo': {
    congratsMessage: "você tem o equilíbrio perfeito entre moderno e prático!",
    powerMessage: "Mulheres com seu estilo são admiradas pela versatilidade e atualidade. Você sempre parece estar à frente do seu tempo.",
    ctaText: "QUERO DOMINAR MEU ESTILO CONTEMPORÂNEO",
    exclusive: "Oferta Especial"
  },
  'Elegante': {
    congratsMessage: "você possui presença e sofisticação únicos!",
    powerMessage: "Mulheres com seu estilo comandam respeito e admiração onde chegam. Sua elegância é sua marca registrada.",
    ctaText: "QUERO MAXIMIZAR MEU ESTILO ELEGANTE",
    exclusive: "Oferta Especial"
  },
  'Romântico': {
    congratsMessage: "você irradia feminilidade e delicadeza!",
    powerMessage: "Mulheres com seu estilo encantam pela suavidade e charme feminino. Você desperta o lado protetor das pessoas.",
    ctaText: "QUERO REALÇAR MEU ESTILO ROMÂNTICO",
    exclusive: "Oferta Especial"
  },
  'Sexy': {
    congratsMessage: "você possui magnetismo e confiança únicos!",
    powerMessage: "Mulheres com seu estilo fascinam pela presença marcante e autoconfiança. Você comanda a atenção naturalmente.",
    ctaText: "QUERO APRIMORAR MEU ESTILO SEXY",
    exclusive: "Oferta Especial"
  },
  'Dramático': {
    congratsMessage: "você tem presença e força impressionantes!",
    powerMessage: "Mulheres com seu estilo lideram e inspiram por onde passam. Sua personalidade forte é seu maior trunfo.",
    ctaText: "QUERO INTENSIFICAR MEU ESTILO DRAMÁTICO",
    exclusive: "Oferta Especial"
  },
  'Criativo': {
    congratsMessage: "você é única e expressiva!",
    powerMessage: "Mulheres com seu estilo se destacam pela originalidade e criatividade. Você é uma obra de arte viva.",
    ctaText: "QUERO LIBERAR MEU ESTILO CRIATIVO",
    exclusive: "Oferta Especial"
  }
};

export const PersonalizedHook: React.FC<PersonalizedHookProps> = ({
  styleCategory,
  userName = "Querida",
  onCTAClick
}) => {
  const messages = styleMessages[styleCategory] || styleMessages['Natural'];
  
  return (
    // Removida a tag <Card> externa e seus estilos, pois ela agora é renderizada no ResultPage.tsx
    <div className="text-center p-0"> {/* Removido padding, Card pai já tem */}
      
      {/* Style Revelation - A GRANDE REVELAÇÃO AGORA */}
      <div className="mb-6">
        {/* Nome do Estilo: Grande e em destaque */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair text-[#aa6b5d] font-bold leading-tight mb-2">
          {styleCategory}
        </h2>
        {/* Mensagem de Congratulações: logo abaixo do nome do estilo */}
        <p className="text-lg sm:text-xl md:text-2xl text-[#432818] mb-4 italic leading-relaxed">
          {messages.congratsMessage}
        </p>
        
        {/* Mensagem de Poder - Usando Ícone Star mais discreto */}
        <div className="bg-white/80 rounded-lg p-4 sm:p-5 shadow-sm border border-[#B89B7A]/20 mt-6 mb-6 text-left">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-[#B89B7A] mt-1 flex-shrink-0" /> {/* Ícone Star */}
            <p className="text-[#432818] leading-relaxed text-base sm:text-lg">
              {messages.powerMessage}
            </p>
          </div>
        </div>
      </div>
      
      {/* Exclusive Offer Badge - Fundo sólido elegante, sombra suave, SEM rotação */}
      <div className="bg-[#B89B7A] text-white px-6 py-2 rounded-full shadow-sm text-sm font-medium inline-block mb-6">
        🎯 {messages.exclusive} - 78% OFF
      </div>
      
      {/* Primary CTA Button - Sombra mais suave, hover menos agressivo, e ajustes de responsividade */}
      <Button
        onClick={onCTAClick}
        className="w-full sm:w-auto text-white py-4 px-8 rounded-lg text-lg font-semibold transition-all duration-300 mb-4
                   hover:scale-102 active:scale-98" /* Ajustes de hover e active para sutileza */
        style={{
          background: "linear-gradient(to right, #458B74, #3D7A65)", // Verde floresta mais elegante
          boxShadow: "0 2px 8px rgba(61, 122, 101, 0.2)" // Sombra mais suave
        }}
      >
        <span className="flex items-center justify-center gap-3">
          <ShoppingCart className="w-6 h-6" />
          {messages.ctaText}
        </span>
      </Button>
      
      {/* Urgency Message - Removido animate-pulse */}
      <p className="text-[#ff6b6b] text-sm font-medium">
        ⚡ Esta oferta expira quando você sair desta página
      </p>
    </div>
  );
};

export default PersonalizedHook;