import React from 'react';
import { Card } from '@/components/ui/card';

const GuaranteeSection: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 relative">
      <div className="text-center">
        <h2 className="text-2xl font-playfair text-[#432818] font-bold leading-tight mb-2">
          Sua Satisfação 100% Garantida
        </h2>
        
        <p className="text-lg text-[#aa6b5d] font-medium mb-4">
          7 dias de garantia • Risco Zero
        </p>
        
        <div className="max-w-xl mx-auto">
          <p className="text-[#6B5B4E] leading-relaxed mb-6">
            Se por qualquer motivo você não ficar 100% satisfeita dentro do período de 7 dias, 
            reembolsamos o valor integral sem perguntas.
          </p>
        </div>
        
        {/* Elemento visual elegante com a cor da marca */}
        <div className="flex justify-center items-center space-x-4 text-[#432818]">
          <div className="flex items-center">
            <span className="text-[#B89B7A] mr-2">✓</span>
            <span>Sem perguntas</span>
          </div>
          <div className="flex items-center">
            <span className="text-[#B89B7A] mr-2">✓</span>
            <span>Sem burocracia</span>
          </div>
          <div className="flex items-center">
            <span className="text-[#B89B7A] mr-2">✓</span>
            <span>Reembolso fácil</span>
          </div>
        </div>

        {/* Elemento decorativo responsivo */}
        <div className="mt-6 flex justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-xl md:text-2xl font-bold">100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeSection;