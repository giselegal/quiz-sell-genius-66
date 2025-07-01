
import React from 'react';
import { Card } from '@/components/ui/card';

const Testimonials: React.FC = () => {
  return (
    <Card className="p-6 bg-white shadow-sm border border-[#B89B7A]/20">
      <h3 className="text-xl font-medium text-[#aa6b5d] mb-4 text-center">
        O que nossas clientes dizem
      </h3>
      <div className="space-y-4">
        <div className="bg-[#f9f6f3] p-4 rounded-lg">
          <p className="text-[#432818] italic mb-2">
            "Descobrir meu estilo mudou completamente como me visto!"
          </p>
          <p className="text-sm text-[#8F7A6A]">- Maria Silva</p>
        </div>
        <div className="bg-[#f9f6f3] p-4 rounded-lg">
          <p className="text-[#432818] italic mb-2">
            "Agora tenho mais confiança e sei exatamente o que usar."
          </p>
          <p className="text-sm text-[#8F7A6A]">- Ana Costa</p>
        </div>
      </div>
    </Card>
  );
};

export default Testimonials;
