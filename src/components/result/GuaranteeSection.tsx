import React from 'react';
import { Card } from '@/components/ui/card';
import { Award, Shield, CheckCircle } from 'lucide-react'; // Ícones para o selo

const GuaranteeSection: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-[#B89B7A]/20 p-6 md:p-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fff7f3]/50 to-[#f9f4ef]/30 pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Elegant guarantee circle with enhanced design */}
        <div className="flex flex-col items-center gap-8 mb-8">
          <div className="relative">
            {/* Multiple animated borders for depth - bordas mais finas */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#B89B7A]/20 via-[#aa6b5d]/20 to-[#B89B7A]/20 blur-sm"></div>
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] animate-spin opacity-40" style={{ animationDuration: '8s' }}></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#aa6b5d] via-[#B89B7A] to-[#aa6b5d] animate-spin opacity-30" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>
            
            {/* Main circle with enhanced shadow */}
            <div className="relative bg-gradient-to-br from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] w-36 h-36 rounded-full flex items-center justify-center shadow-2xl">
              <div className="bg-gradient-to-br from-white to-[#fefefe] w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-inner border border-[#B89B7A]/10">
                <span className="text-3xl font-bold bg-gradient-to-br from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent leading-none">7</span>
                <span className="text-xs font-semibold text-[#aa6b5d] tracking-wide mt-1">dias de</span>
                <span className="text-xs font-semibold text-[#aa6b5d] tracking-wide">Garantia</span>
              </div>
            </div>
            {/* Floating particles effect */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-[#B89B7A]/60 rounded-full animate-ping"></div>
            <div className="absolute bottom-3 left-1 w-1.5 h-1.5 bg-[#aa6b5d]/60 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-0 w-1 h-1 bg-[#B89B7A]/40 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#B89B7A]"></div>
              <div className="w-2 h-2 bg-[#B89B7A] rounded-full animate-pulse"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#B89B7A]"></div>
            <h2 className="text-2xl md:text-3xl font-playfair text-[#432818] font-bold leading-tight">
              Sua Satisfação Garantida
            </h2>
            <div className="inline-flex items-center gap-3 mt-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#aa6b5d]"></div>
              <div className="w-2 h-2 bg-[#aa6b5d] rounded-full animate-pulse"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#aa6b5d]"></div>
        </div>
        <div className="space-y-6 mb-6">
          <p className="text-base md:text-lg text-[#8F7A6A] max-w-2xl mx-auto leading-relaxed">
            Acreditamos tanto na transformação que o Guia de Estilo proporciona que oferecemos uma garantia incondicional. Se por qualquer motivo você não ficar 100% satisfeita nos primeiros 7 dias, basta nos enviar um e-mail e reembolsaremos o valor integral.
          </p>
          <p className="text-base md:text-lg text-[#432818] max-w-2xl mx-auto leading-relaxed font-medium">
            Sem perguntas, sem burocracia. Seu investimento é totalmente seguro.
        
        <div className="grid md:grid-cols-2 gap-4 text-sm text-[#432818] max-w-md mx-auto">
          <div className="flex items-center gap-2 justify-center">
            <CheckCircle className="w-4 h-4 text-[#B89B7A]" />
            <span>Reembolso Total</span>
            <span>Sem Complicações</span>
      </div>
    </div>
  );
};
export default GuaranteeSection;
