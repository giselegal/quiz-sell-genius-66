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
    ctaText: "ACESSE SEU GUIA NATURAL AGORA",
    exclusive: "Oferta Especial"
  },
  'Clássico': {
    congratsMessage: "você possui elegância atemporal!",
    powerMessage: "Mulheres com seu estilo transmitem confiança e sofisticação. Você é vista como referência de bom gosto e refinamento.",
    ctaText: "ACESSE SEU GUIA CLÁSSICO AGORA",
    exclusive: "Oferta Especial"
  },
  'Contemporâneo': {
    congratsMessage: "você tem o equilíbrio perfeito entre moderno e prático!",
    powerMessage: "Mulheres com seu estilo são admiradas pela versatilidade e atualidade. Você sempre parece estar à frente do seu tempo.",
    ctaText: "ACESSE SEU GUIA CONTEMPORÂNEO AGORA",
    exclusive: "Oferta Especial"
  },
  'Elegante': {
    congratsMessage: "você possui presença e sofisticação únicos!",
    powerMessage: "Mulheres com seu estilo comandam respeito e admiração onde chegam. Sua elegância é sua marca registrada.",
    ctaText: "ACESSE SEU GUIA ELEGANTE AGORA",
    exclusive: "Oferta Especial"
  },
  'Romântico': {
    congratsMessage: "você irradia feminilidade e delicadeza!",
    powerMessage: "Mulheres com seu estilo encantam pela suavidade e charme feminino. Você desperta o lado protetor das pessoas.",
    ctaText: "ACESSE SEU GUIA ROMÂNTICO AGORA",
    exclusive: "Oferta Especial"
  },
  'Sexy': {
    congratsMessage: "você possui magnetismo e confiança únicos!",
    powerMessage: "Mulheres com seu estilo fascinam pela presença marcante e autoconfiança. Você comanda a atenção naturalmente.",
    ctaText: "ACESSE SEU GUIA SEXY AGORA",
    exclusive: "Oferta Especial"
  },
  'Dramático': {
    congratsMessage: "você tem presença e força impressionantes!",
    powerMessage: "Mulheres com seu estilo lideram e inspiram por onde passam. Sua personalidade forte é seu maior trunfo.",
    ctaText: "ACESSE SEU GUIA DRAMÁTICO AGORA",
    exclusive: "Oferta Especial"
  },
  'Criativo': {
    congratsMessage: "você é única e expressiva!",
    powerMessage: "Mulheres com seu estilo se destacam pela originalidade e criatividade. Você é uma obra de arte viva.",
    ctaText: "ACESSE SEU GUIA CRIATIVO AGORA",
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
      
      {/* Container para o Selo e o Botão CTA, forçando empilhamento vertical */}
      <div className="flex flex-col items-center justify-center gap-4 mb-4">
        {/* Exclusive Offer Badge - Fundo sólido elegante, sombra suave, SEM rotação, agora empilhado */}
        <div className="bg-[#B89B7A] text-white px-6 py-2 rounded-full shadow-sm text-sm font-medium whitespace-nowrap">
          🎯 {messages.exclusive} - 78% OFF
        </div>
        
        {/* Primary CTA Button - Fonte responsiva para mobile */}
        <Button
          onClick={onCTAClick}
          className="w-full sm:w-auto text-white py-4 px-8 rounded-lg font-semibold transition-all duration-300
                     hover:scale-102 active:scale-98 text-base sm:text-lg" /* text-base para mobile, sm:text-lg para desktop */
          style={{
            background: "linear-gradient(to right, #4CAF50, #45a049)", // Verde convencional de oferta
            boxShadow: "0 2px 8px rgba(76, 175, 80, 0.2)" // Sombra ajustada para o novo verde
          }}
        >
          <span className="flex items-center justify-center gap-3">
            <ShoppingCart className="w-6 h-6" />
            {messages.ctaText}
          </span>
        </Button>
      </div>
      
      {/* Urgency Message */}
      <p className="text-[#ff6b6b] text-sm font-medium">
        ⚡ Esta oferta expira quando você sair desta página
      </p>
    </div>
  );
};

export default PersonalizedHook;