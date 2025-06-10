
import React from 'react';
import { Card } from '@/components/ui/card';
import Logo from '@/components/ui/logo';
import { ResultPageBlock } from '@/types/resultPageBlocks';

interface HeaderBlockProps {
  block: ResultPageBlock;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  primaryStyle?: any;
}

export const HeaderBlock: React.FC<HeaderBlockProps> = ({
  block,
  isSelected,
  isPreviewMode,
  onSelect,
  primaryStyle
}) => {
  const content = block.content.header || {};

  return (
    <div
      className={`
        relative transition-all duration-200
        ${!isPreviewMode ? 'hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50 cursor-pointer' : ''}
        ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500' : ''}
      `}
      onClick={!isPreviewMode ? onSelect : undefined}
    >
      <Card className="bg-white shadow-sm p-6 mb-6">
        <div className="flex flex-col items-center gap-5">
          <div className="flex justify-center w-full">
            <Logo 
              src={content.logo || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"} 
              alt={content.logoAlt || "Logo Gisele Galvão"} 
              className="h-auto mx-auto" 
              style={{
                height: `${content.logoHeight || 80}px`,
                maxWidth: '100%'
              }} 
            />
          </div>
          
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-playfair text-[#432818]">
              Olá <span className="font-medium">{content.userName || 'Visitante'}</span>, seu Estilo Predominante é:
            </h1>
            
            {primaryStyle && (
              <h2 className="font-bold text-[#B89B7A] mt-2 text-2xl">
                {primaryStyle.category}
              </h2>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
