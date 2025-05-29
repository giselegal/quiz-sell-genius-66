import React from 'react';
import { Award } from 'lucide-react';

// Interface simplificada
interface GuaranteeSealProps {
  className?: string;
}

// Componente simplificado sem variantes
const GuaranteeSeal: React.FC<GuaranteeSealProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      <div className="text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="relative mb-2">
            <div className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] w-16 h-16 rounded-full flex items-center justify-center">
              <div className="bg-white w-12 h-12 rounded-full flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-[#B89B7A]">7</span>
                <span className="text-xs font-medium text-[#aa6b5d] -mt-1">DIAS</span>
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-[#432818]">
            Garantia de Satisfação
          </h3>
          
          <p className="text-sm text-[#6B5B4E] max-w-xs mx-auto">
            Se não ficar satisfeita com o conteúdo, devolvemos seu investimento sem perguntas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeSeal;
