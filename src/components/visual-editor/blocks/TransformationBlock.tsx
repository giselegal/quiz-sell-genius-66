
import React from 'react';
import { Card } from '@/components/ui/card';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { tokens } from '@/config/designTokens';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import { SectionTitle } from '@/components/visual-editor/components/SectionTitle';

interface TransformationBlockProps {
  block: ResultPageBlock;
  primaryStyle: StyleResult;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onClick?: () => void;
}

export const TransformationBlock: React.FC<TransformationBlockProps> = ({
  block,
  primaryStyle,
  isSelected,
  isPreviewMode,
  onSelect,
  onClick
}) => {
  const content = block.content.transformation || {};

  return (
    <div
      className={`
        relative transition-all duration-200
        ${!isPreviewMode ? 'hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50 cursor-pointer' : ''}
        ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500' : ''}
      `}
      onClick={!isPreviewMode ? onSelect : undefined}
    >
      <section id="transformations" className="scroll-mt-24 mb-24 lg:mb-28">
        <SectionTitle
          variant="primary"
          size="xl"
          subtitle="Veja como mulheres descobriram sua melhor versão seguindo as mesmas estratégias que você vai receber"
        >
          {content.title || "Resultados que Falam por Si"}
        </SectionTitle>
        
        <AnimatedWrapper animation="fade" show={true} duration={400}>
          <Card
            className="overflow-hidden rounded-2xl p-8 lg:p-12"
            style={{
              background: `linear-gradient(135deg, ${tokens.colors.backgroundCard}, ${tokens.colors.backgroundAlt})`,
              borderColor: `${tokens.colors.primary}/15`,
              boxShadow: tokens.shadows.lg
            }}
          >
            {/* Grid de transformações */}
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((index) => (
                <div 
                  key={index}
                  className="relative group"
                >
                  <div 
                    className="aspect-[4/3] rounded-xl overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${tokens.colors.backgroundAlt}, ${tokens.colors.backgroundCard})`,
                      boxShadow: tokens.shadows.md
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <div 
                          className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                          style={{ backgroundColor: `${tokens.colors.primary}20` }}
                        >
                          <span className="text-2xl font-bold" style={{ color: tokens.colors.primary }}>
                            {index}
                          </span>
                        </div>
                        <p className="text-sm font-medium" style={{ color: tokens.colors.textSecondary }}>
                          Transformação {index}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Badge de resultado */}
                  <div 
                    className="absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                    style={{
                      background: `linear-gradient(45deg, ${tokens.colors.success}, ${tokens.colors.successDark})`
                    }}
                  >
                    ANTES/DEPOIS
                  </div>
                </div>
              ))}
            </div>

            {/* Descrição adicional */}
            <div className="text-center mt-12">
              <p 
                className="text-lg font-medium max-w-3xl mx-auto leading-relaxed"
                style={{ color: tokens.colors.textSecondary }}
              >
                {content.description || "Cada uma dessas mulheres descobriu seu estilo único e transformou completamente sua relação com a moda. Agora é a sua vez!"}
              </p>
            </div>
          </Card>
        </AnimatedWrapper>
      </section>
    </div>
  );
};
