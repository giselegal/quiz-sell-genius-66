
import React from 'react';
import { Card } from '@/components/ui/card';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { Heart, Star, Sparkles, CheckCircle } from 'lucide-react';
import { tokens } from '@/config/designTokens';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import { SectionTitle } from '@/components/visual-editor/components/SectionTitle';

interface MotivationBlockProps {
  block: ResultPageBlock;
  primaryStyle: StyleResult;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onClick?: () => void;
}

export const MotivationBlock: React.FC<MotivationBlockProps> = ({
  block,
  primaryStyle,
  isSelected,
  isPreviewMode,
  onSelect,
  onClick
}) => {
  const content = block.content.motivation || {};

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

  const items = content.items || defaultItems;

  return (
    <div
      className={`
        relative transition-all duration-200
        ${!isPreviewMode ? 'hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50 cursor-pointer' : ''}
        ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500' : ''}
      `}
      onClick={!isPreviewMode ? onSelect : undefined}
    >
      <section id="motivation" className="scroll-mt-24 mb-24 lg:mb-28">
        <SectionTitle
          variant="secondary"
          size="xl"
          subtitle="Conhecer seu estilo pessoal é muito mais do que seguir tendências passageiras — é uma ferramenta poderosa de comunicação não-verbal e autoconfiança."
        >
          {content.title || "Por que Aplicar seu Estilo é tão Importante?"}
        </SectionTitle>
        
        <AnimatedWrapper animation="fade" show={true} duration={400}>
          <Card
            className="rounded-2xl p-6 lg:p-12"
            style={{
              backgroundColor: tokens.colors.backgroundAlt,
              borderColor: `${tokens.colors.primary}/15`,
              boxShadow: tokens.shadows.lg
            }}
          >
            <div className="text-center mb-8">
              <h3 
                className="text-2xl font-playfair font-bold mb-4"
                style={{ color: tokens.colors.text }}
              >
                {content.subtitle || 'Transforme sua relação com a moda e desperte sua confiança'}
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {items.map((item, index) => {
                const IconComponent = item.icon || CheckCircle;
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-lg p-6 text-center space-y-4 transition-all duration-300 hover:scale-105"
                    style={{ boxShadow: tokens.shadows.sm }}
                  >
                    <div className="flex justify-center">
                      <IconComponent 
                        className="w-12 h-12" 
                        style={{ color: tokens.colors.primary }} 
                      />
                    </div>
                    <h4 
                      className="text-xl font-semibold"
                      style={{ color: tokens.colors.text }}
                    >
                      {item.title}
                    </h4>
                    <p 
                      className="text-base leading-relaxed"
                      style={{ color: tokens.colors.textSecondary }}
                    >
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>
        </AnimatedWrapper>
      </section>
    </div>
  );
};
