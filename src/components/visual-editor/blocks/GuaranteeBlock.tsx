
import React from 'react';
import { Card } from '@/components/ui/card';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { Shield, CheckCircle, Clock } from 'lucide-react';
import { tokens } from '@/config/designTokens';

interface GuaranteeBlockProps {
  block: ResultPageBlock;
  primaryStyle: StyleResult;
  onClick?: () => void;
  isSelected?: boolean;
}

export const GuaranteeBlock: React.FC<GuaranteeBlockProps> = ({
  block,
  primaryStyle,
  onClick,
  isSelected
}) => {
  const { guarantee } = block.content;

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
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${tokens.colors.success}20` }}
          >
            <Shield 
              className="w-12 h-12" 
              style={{ color: tokens.colors.success }} 
            />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 
            className="text-2xl font-playfair font-bold mb-4"
            style={{ color: tokens.colors.text }}
          >
            {guarantee?.title || 'Garantia de Satisfação'}
          </h3>

          <p 
            className="text-lg mb-6"
            style={{ color: tokens.colors.textSecondary }}
          >
            {guarantee?.description || 'Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, devolvemos seu dinheiro integralmente, sem burocracia.'}
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <CheckCircle 
                className="w-5 h-5" 
                style={{ color: tokens.colors.success }} 
              />
              <span style={{ color: tokens.colors.text }}>
                Sem perguntas, sem burocracia
              </span>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Clock 
                className="w-5 h-5" 
                style={{ color: tokens.colors.success }} 
              />
              <span style={{ color: tokens.colors.text }}>
                {guarantee?.days || 7} dias para testar
              </span>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Shield 
                className="w-5 h-5" 
                style={{ color: tokens.colors.success }} 
              />
              <span style={{ color: tokens.colors.text }}>
                100% do seu dinheiro de volta
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
