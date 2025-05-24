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
        {/* Elegant guarantee icon with animation */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full animate-pulse opacity-30"></div>
            <div className="relative bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] p-6 rounded-full shadow-xl">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#432818] mb-2">
              Garantia de Satisfação Total
            </h2>
            <div className="bg-gradient-to-r from-[#B89B7A]/15 to-[#aa6b5d]/15 border-2 border-[#B89B7A]/30 text-[#432818] px-8 py-4 rounded-full flex items-center justify-center gap-3 font-semibold text-lg shadow-inner max-w-md mx-auto">
              <Award className="w-6 h-6 text-[#aa6b5d]" />
              <span className="text-[#aa6b5d]">7 Dias de Garantia</span>
            </div>
          </div>
        </div>

        <p className="text-base md:text-lg text-[#8F7A6A] max-w-2xl mx-auto leading-relaxed">
          Experimente nosso guia de estilo por 7 dias completos. Se não ficar totalmente satisfeita com os resultados, devolvemos 100% do seu investimento, sem perguntas ou complicações.
        </p>
        
        <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm text-[#432818]">
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