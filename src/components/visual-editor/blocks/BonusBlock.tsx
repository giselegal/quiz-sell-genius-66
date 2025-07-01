
import React from 'react';
import { Card } from '@/components/ui/card';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { Gift, Award, BookOpen } from 'lucide-react';
import { tokens } from '@/config/designTokens';

interface BonusBlockProps {
  block: ResultPageBlock;
  primaryStyle: StyleResult;
  onClick?: () => void;
  isSelected?: boolean;
}

export const BonusBlock: React.FC<BonusBlockProps> = ({
  block,
  primaryStyle,
  onClick,
  isSelected
}) => {
  const { bonus } = block.content;

  const defaultBonuses = [
    {
      title: 'Guia de Peças Essenciais',
      description: 'Descubra as peças-chave que não podem faltar no seu guarda-roupa',
      value: 'R$ 79,00',
      icon: BookOpen
    },
    {
      title: 'Manual de Visagismo',
      description: 'Cortes de cabelo e maquiagem ideais para seu rosto',
      value: 'R$ 59,00',
      icon: Award
    }
  ];

  const bonuses = bonus?.bonuses || defaultBonuses;

  return (
    <Card 
      className={`p-6 cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
      }`}
      onClick={onClick}
      style={{ 
        backgroundColor: tokens.colors.backgroundCard,
        borderColor: tokens.colors.border 
      }}
    >
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Gift 
            className="w-12 h-12" 
            style={{ color: tokens.colors.primary }} 
          />
        </div>
        <h3 
          className="text-2xl font-playfair font-bold"
          style={{ color: tokens.colors.text }}
        >
          {bonus?.title || 'Bônus Exclusivos'}
        </h3>
      </div>

      <div className="space-y-4">
        {bonuses.map((bonusItem, index) => {
          const IconComponent = bonusItem.icon || Gift;
          return (
            <div 
              key={index}
              className="border rounded-lg p-4 bg-white"
              style={{ 
                borderColor: tokens.colors.border,
                boxShadow: tokens.shadows.sm 
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <IconComponent 
                    className="w-6 h-6" 
                    style={{ color: tokens.colors.secondary }} 
                  />
                </div>
                <div className="flex-1">
                  <h4 
                    className="font-semibold mb-2"
                    style={{ color: tokens.colors.text }}
                  >
                    {bonusItem.title}
                  </h4>
                  <p 
                    className="text-sm mb-2"
                    style={{ color: tokens.colors.textSecondary }}
                  >
                    {bonusItem.description}
                  </p>
                  {bonusItem.value && (
                    <p 
                      className="font-bold"
                      style={{ color: tokens.colors.primary }}
                    >
                      Valor: {bonusItem.value}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
