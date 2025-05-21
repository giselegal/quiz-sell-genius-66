
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface BenefitItem {
  title: string;
  description: string;
}

interface BenefitListProps {
  items?: BenefitItem[];
}

const defaultBenefits = [
  {
    title: "Peças que revelam sua essência",
    description: "Descobrir as roupas e acessórios que comunicam quem você realmente é, valorizando seu corpo e sua personalidade."
  },
  {
    title: "Compras com propósito",
    description: "Parar de acumular peças que não combinam e investir no que faz sentido para o seu momento."
  },
  {
    title: "Versatilidade sem esforço",
    description: "Criar combinações que expressam quem você é com menos esforço e mais impacto."
  },
  {
    title: "Autoconfiança visível",
    description: "Sentir segurança no que veste porque cada escolha tem harmonia com quem você é."
  }
];

const BenefitList: React.FC<BenefitListProps> = ({ items }) => {
  const benefitsToShow = items || defaultBenefits;
  
  return (
    <Card className="p-6 bg-white space-y-5">
      <h3 className="text-xl font-medium text-[#432818] mb-4">
        O que você vai transformar com esse material:
      </h3>

      <div className="space-y-4">
        {benefitsToShow.map((benefit, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#fce8e3] flex items-center justify-center">
              <Check className="w-4 h-4 text-[#aa6b5d]" />
            </div>
            <div>
              <h4 className="font-medium text-[#432818] mb-1">{benefit.title}</h4>
              <p className="text-[#6b605a] text-sm">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BenefitList;
