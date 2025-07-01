
import React from 'react';
import { Card } from '@/components/ui/card';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { tokens } from '@/config/designTokens';

interface FooterBlockProps {
  block: ResultPageBlock;
  primaryStyle: StyleResult;
  onClick?: () => void;
  isSelected?: boolean;
}

export const FooterBlock: React.FC<FooterBlockProps> = ({
  block,
  primaryStyle,
  onClick,
  isSelected
}) => {
  const { footer } = block.content;

  const defaultLinks = [
    { text: 'Política de Privacidade', url: '/politica-privacidade' },
    { text: 'Termos de Uso', url: '/termos-uso' },
    { text: 'Contato', url: '/contato' }
  ];

  const links = footer?.links || defaultLinks;

  return (
    <Card 
      className={`p-6 cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
      }`}
      onClick={onClick}
      style={{ 
        backgroundColor: tokens.colors.text,
        borderColor: tokens.colors.border 
      }}
    >
      <div className="text-center space-y-6">
        <div 
          className="w-32 h-px mx-auto"
          style={{
            background: `linear-gradient(90deg, transparent, ${tokens.colors.primary}, transparent)`
          }}
        />

        <div>
          <p 
            className="text-lg font-medium mb-4"
            style={{ color: tokens.colors.backgroundCard }}
          >
            {footer?.companyName || 'Gisele Galvão - Consultoria de Imagem'}
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="text-sm hover:opacity-75 transition-opacity underline underline-offset-4"
                style={{ 
                  color: tokens.colors.backgroundCard,
                  textDecorationColor: `${tokens.colors.primary}80`
                }}
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>

        <div 
          className="w-32 h-px mx-auto"
          style={{
            background: `linear-gradient(90deg, transparent, ${tokens.colors.primary}, transparent)`
          }}
        />

        <p 
          className="text-sm"
          style={{ color: `${tokens.colors.backgroundCard}80` }}
        >
          © 2025 Gisele Galvão. Todos os direitos reservados.
        </p>
      </div>
    </Card>
  );
};
