
import React from 'react';
import { Card } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

interface GuaranteeProps {
  text?: string;
}

const Guarantee: React.FC<GuaranteeProps> = ({
  text = "Garantia incondicional de 7 dias. Teste o guia completo e todos os bônus. Se não ficar satisfeita por qualquer motivo, devolvemos 100% do seu investimento. Sem perguntas."
}) => {
  return (
    <Card className="p-6 md:p-8 my-8 glass-panel relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#B89B7A]/5"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-[#aa6b5d]/5"></div>
      
      <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#aa6b5d] to-[#B89B7A] flex items-center justify-center text-white shadow-lg">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">7 DIAS</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-medium text-[#432818] mb-2">
            Garantia Total de Satisfação
          </h3>
          <p className="text-[#432818]/80 leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Guarantee;
