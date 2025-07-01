
import React from 'react';
import { Card } from '@/components/ui/card';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { Award, Users, BookOpen } from 'lucide-react';
import { tokens } from '@/config/designTokens';

interface MentorBlockProps {
  block: ResultPageBlock;
  primaryStyle: StyleResult;
  onClick?: () => void;
  isSelected?: boolean;
}

export const MentorBlock: React.FC<MentorBlockProps> = ({
  block,
  primaryStyle,
  onClick,
  isSelected
}) => {
  const { mentor } = block.content;

  const defaultImage = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp";

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
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src={mentor?.image || defaultImage}
              alt={mentor?.name || 'Gisele Galvão'}
              className="w-32 h-32 rounded-full object-cover"
              style={{ boxShadow: tokens.shadows.lg }}
            />
            <div 
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: tokens.colors.primary }}
            >
              <Award className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 
            className="text-2xl font-playfair font-bold mb-2"
            style={{ color: tokens.colors.text }}
          >
            {mentor?.name || 'Gisele Galvão'}
          </h3>

          <p 
            className="text-lg font-medium mb-4"
            style={{ color: tokens.colors.primary }}
          >
            {mentor?.title || 'Consultora de Imagem e Estilo'}
          </p>

          <p 
            className="mb-6"
            style={{ color: tokens.colors.textSecondary }}
          >
            {mentor?.description || 'Especialista em coloração pessoal com certificação internacional. Mais de 10 anos ajudando mulheres a descobrirem seu estilo único.'}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg" style={{ backgroundColor: tokens.colors.backgroundAlt }}>
              <Users 
                className="w-6 h-6 mx-auto mb-2" 
                style={{ color: tokens.colors.primary }} 
              />
              <p className="text-sm font-semibold" style={{ color: tokens.colors.text }}>
                +5000
              </p>
              <p className="text-xs" style={{ color: tokens.colors.textMuted }}>
                Clientes atendidas
              </p>
            </div>

            <div className="text-center p-3 rounded-lg" style={{ backgroundColor: tokens.colors.backgroundAlt }}>
              <BookOpen 
                className="w-6 h-6 mx-auto mb-2" 
                style={{ color: tokens.colors.primary }} 
              />
              <p className="text-sm font-semibold" style={{ color: tokens.colors.text }}>
                10+ anos
              </p>
              <p className="text-xs" style={{ color: tokens.colors.textMuted }}>
                De experiência
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
