import React from 'react';
import { BlockData } from '@/types/resultPageConfig';
import Testimonials from '@/components/quiz-result/sales/Testimonials';

interface TransformationsBlockProps {
  block: BlockData;
  isEditMode?: boolean;
  onClick?: () => void;
}

const TransformationsBlock: React.FC<TransformationsBlockProps> = ({
  block,
  isEditMode = false,
  onClick
}) => {
  const handleClick = () => {
    if (isEditMode && onClick) {
      onClick();
    }
  };

  // Dados reais de depoimentos/transformações
  const testimonials = [
    {
      name: "Mariangela",
      role: "Engenheira",
      text: "Antes, a roupa me vestia. Hoje, eu me visto com intenção. Essa jornada me reconectou com a mulher que sempre fui."
    },
    {
      name: "Patrícia Paranhos",
      role: "Advogada",
      text: "Aprendi a reconhecer meu valor e refletir isso na forma como me apresento. As pessoas começaram a me enxergar diferente — porque eu estava diferente."
    },
    {
      name: "Sônia Spier",
      role: "Terapeuta",
      text: "O guia me deu clareza sobre cores, formas e estilos que realmente harmonizam comigo. Agora sei exatamente o que me valoriza."
    }
  ];

  return (
    <div 
      className={`transformations-block ${isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-[#B89B7A] hover:ring-opacity-50 rounded-lg' : ''}`}
      onClick={handleClick}
      style={{
        backgroundColor: block.style?.backgroundColor,
        padding: block.style?.padding,
        margin: block.style?.margin,
        borderRadius: block.style?.borderRadius,
      }}
    >
      <Testimonials items={testimonials} />
    </div>
  );
};

export default TransformationsBlock;
