
import React from 'react';
import { Check, CheckCircle, CircleCheck, Star, Award, BadgeCheck, Shield, Sparkles } from 'lucide-react';

interface BenefitsBlockPreviewProps {
  content: {
    title?: string;
    items?: string[];
    useIcons?: boolean;
    icon?: string;
    iconColor?: string;
    style?: any;
  };
}

const BenefitsBlockPreview: React.FC<BenefitsBlockPreviewProps> = ({ content }) => {
  const defaultItems = [
    'Aplicar seus estilos com autenticidade',
    'Montar looks práticos para o dia a dia, trabalho e eventos',
    'Usar cores e modelagens que valorizam quem você é',
    'Parar de errar nas compras e economizar tempo'
  ];

  const items = content.items || defaultItems;
  const useIcons = content.useIcons !== false;
  const iconColor = content.iconColor || '#aa6b5d';

  const getIconComponent = (iconId: string) => {
    const iconProps = { className: "h-4 w-4", style: { color: iconColor } };
    
    switch (iconId) {
      case 'check-circle':
        return <CheckCircle {...iconProps} />;
      case 'circle-check':
        return <CircleCheck {...iconProps} />;
      case 'badge-check':
        return <BadgeCheck {...iconProps} />;
      case 'star':
        return <Star {...iconProps} />;
      case 'award':
        return <Award {...iconProps} />;
      case 'shield':
        return <Shield {...iconProps} />;
      case 'sparkles':
        return <Sparkles {...iconProps} />;
      default:
        return <Check {...iconProps} />;
    }
  };

  return (
    <div style={content.style}>
      <h3 className="text-xl font-bold mb-6 text-[#aa6b5d] text-center">
        {content.title || 'O que você vai aprender:'}
      </h3>
      
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            {useIcons && (
              <span className="flex-shrink-0 mt-0.5">
                {getIconComponent(content.icon || 'check')}
              </span>
            )}
            <span className="text-[#1A1818]/80">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BenefitsBlockPreview;
