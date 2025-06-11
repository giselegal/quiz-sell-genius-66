
import React from 'react';
import { Card } from '@/components/ui/card';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { CheckCircle, Heart, Star, Sparkles } from 'lucide-react';
import { tokens } from '@/config/designTokens';

interface MotivationBlockProps {
  block: ResultPageBlock;
  primaryStyle: StyleResult;
  onClick?: () => void;
  isSelected?: boolean;
}

export const MotivationBlock: React.FC<MotivationBlockProps> = ({
  block,
  primaryStyle,
  onClick,
  isSelected
}) => {
  const { motivation } = block.content;

  const defaultItems = [
    {
      icon: Heart,
      title: 'Autoconfiança',
      description: 'Sinta-se segura e autêntica em suas escolhas de estilo'
    },
    {
      icon: Star,
      title: 'Economia',
      description: 'Compre apenas o que combina com você, sem desperdícios'
    },
    {
      icon: Sparkles,
      title: 'Praticidade',
      description: 'Monte looks incríveis em minutos, para qualquer ocasião'
    },
    {
      icon: CheckCircle,
      title: 'Clareza',
      description: 'Tenha certeza sobre o que funciona para seu corpo e personalidade'
    }
  ];

  const items = motivation?.items || defaultItems;

  return (
    <Card 
      className={`p-6 cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
      }`}
      onClick={onClick}
      style={{ 
        backgroundColor: tokens.colors.backgroundAlt,
        borderColor: tokens.colors.border 
      }}
    >
      <div className="text-center mb-8">
        <h3 
          className="text-2xl font-playfair font-bold mb-4"
          style={{ color: tokens.colors.text }}
        >
          {motivation?.title || 'Por que Descobrir seu Estilo é Importante?'}
        </h3>
        <p style={{ color: tokens.colors.textSecondary }}>
          {motivation?.subtitle || 'Transforme sua relação com a moda e desperte sua confiança'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item, index) => {
          const IconComponent = item.icon || CheckCircle;
          return (
            <div 
              key={index}
              className="bg-white rounded-lg p-4 text-center space-y-3"
              style={{ boxShadow: tokens.shadows.sm }}
            >
              <div className="flex justify-center">
                <IconComponent 
                  className="w-8 h-8" 
                  style={{ color: tokens.colors.primary }} 
                />
              </div>
              <h4 
                className="font-semibold"
                style={{ color: tokens.colors.text }}
              >
                {item.title}
              </h4>
              <p 
                className="text-sm"
                style={{ color: tokens.colors.textSecondary }}
              >
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
