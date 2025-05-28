
import React from 'react';
import { Card } from '@/components/ui/card';

const MotivationSection: React.FC = () => {
  return (
    <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 card-elegant">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#B89B7A]"></div>
          <div className="w-2 h-2 bg-[#B89B7A] rounded-full animate-pulse"></div>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#B89B7A]"></div>
        </div>
        <h2 className="text-2xl md:text-3xl font-playfair text-[#432818] mb-4 bg-gradient-to-r from-[#432818] via-[#aa6b5d] to-[#432818] bg-clip-text text-transparent">
          Por que definir seu estilo é tão importante?
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full mx-auto mb-4"></div>
        <p className="text-base md:text-lg text-[#8F7A6A] max-w-3xl mx-auto leading-relaxed">
          Conhecer seu estilo pessoal é muito mais do que seguir tendências passageiras — é uma ferramenta poderosa de comunicação não-verbal e autoconfiança.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 text-left">
        <div className="bg-[#fff7f3] p-4 rounded-lg border border-[#B89B7A]/10">
          <h3 className="font-medium text-[#aa6b5d] mb-2">Quando você não conhece seu estilo...</h3>
          <ul className="text-[#432818] space-y-2">
            <li>• Compra peças por impulso que não combinam entre si</li>
            <li>• Sente que tem um guarda-roupa cheio, mas "nada para vestir"</li>
            <li>• Investe em tendências que não valorizam sua imagem</li>
            <li>• Tem dificuldade em criar uma imagem coerente e autêntica</li>
          </ul>
        </div>
        <div className="bg-[#f9f4ef] p-4 rounded-lg border border-[#B89B7A]/10">
          <h3 className="font-medium text-[#aa6b5d] mb-2">Quando você domina seu estilo...</h3>
          <ul className="text-[#432818] space-y-2">
            <li>• Economiza tempo e dinheiro em compras conscientes</li>
            <li>• Projeta a imagem que realmente representa você</li>
            <li>• Aumenta sua confiança em qualquer ambiente</li>
            <li>• Cria looks harmoniosos com menos peças</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default MotivationSection;
