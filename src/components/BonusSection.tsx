
import React from 'react';
import { Card } from '@/components/ui/card';

export const BonusSection: React.FC = () => {
  return (
    <Card className="p-6 bg-gradient-to-r from-[#fff8f4] to-[#faf5f0] border border-[#B89B7A]/20">
      <h3 className="text-xl font-medium text-[#aa6b5d] mb-4 text-center">
        Bônus Exclusivos
      </h3>
      <ul className="space-y-2 text-[#432818]">
        <li>✨ Guia de cores personalizadas</li>
        <li>✨ Dicas de maquiagem para seu estilo</li>
        <li>✨ Como montar looks perfeitos</li>
      </ul>
    </Card>
  );
};

export const MemorablesSection: React.FC = () => {
  return (
    <Card className="p-6 bg-white shadow-sm border border-[#B89B7A]/20">
      <h3 className="text-xl font-medium text-[#aa6b5d] mb-4">
        Momentos Memoráveis
      </h3>
      <p className="text-[#432818]">
        Cada look conta uma história. Descubra como criar momentos únicos.
      </p>
    </Card>
  );
};

export const GuaranteeSection: React.FC = () => {
  return (
    <Card className="p-6 bg-green-50 border border-green-200">
      <h3 className="text-xl font-medium text-green-800 mb-4 text-center">
        Garantia de Satisfação
      </h3>
      <p className="text-green-700 text-center">
        7 dias de garantia incondicional. Se não ficar satisfeita, devolvemos seu dinheiro.
      </p>
    </Card>
  );
};

export const SocialProofSection: React.FC = () => {
  return (
    <Card className="p-6 bg-white shadow-sm border border-[#B89B7A]/20">
      <h3 className="text-xl font-medium text-[#aa6b5d] mb-4 text-center">
        Mais de 10.000 mulheres já descobriram seu estilo
      </h3>
      <div className="text-center">
        <span className="text-2xl text-yellow-500">⭐⭐⭐⭐⭐</span>
        <p className="text-sm text-[#8F7A6A] mt-2">Avaliação média de 4.9/5</p>
      </div>
    </Card>
  );
};

export default BonusSection;
