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
        {/* Elegant guarantee circle with animated border */}
        <div className="flex flex-col items-center gap-6 mb-6">
          <div className="relative">
            {/* Animated border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] animate-spin opacity-30" style={{ animationDuration: '4s' }}></div>
            <div className="absolute inset-1 rounded-full bg-gradient-to-r from-[#aa6b5d] via-[#B89B7A] to-[#aa6b5d] animate-spin opacity-40" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
            
            {/* Main circle */}
            <div className="relative bg-gradient-to-br from-[#B89B7A] to-[#aa6b5d] w-32 h-32 rounded-full flex items-center justify-center shadow-xl">
              <div className="bg-white w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="text-2xl font-bold text-[#B89B7A]">7</span>
                <span className="text-sm font-medium text-[#aa6b5d]">dias</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#432818] mb-2">
              Garantia de Satisfação Total
            </h2>
          </div>
        </div>

        <p className="text-base md:text-lg text-[#8F7A6A] max-w-2xl mx-auto leading-relaxed mb-6">
          Experimente nosso guia de estilo por 7 dias completos. Se não ficar totalmente satisfeita com os resultados, devolvemos 100% do seu investimento, sem perguntas ou complicações.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 text-sm text-[#432818]">
          <div className="flex items-center gap-2 justify-center">
            <CheckCircle className="w-4 h-4 text-[#4CAF50]" />
            <span>Reembolso Total</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <CheckCircle className="w-4 h-4 text-[#4CAF50]" />
            <span>Sem Complicações</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <CheckCircle className="w-4 h-4 text-[#4CAF50]" />
            <span>Processamento Rápido</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeSection;