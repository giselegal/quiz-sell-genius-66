
import React from 'react';
import { ResultHeaderBlockContent } from '@/types/resultPageBlocks';

interface ResultHeaderBlockProps {
  content: ResultHeaderBlockContent;
  onClick: () => void;
}

export const ResultHeaderBlock: React.FC<ResultHeaderBlockProps> = ({
  content,
  onClick
}) => {
  return (
    <div
      className="border-2 border-dashed border-transparent hover:border-[#B89B7A] rounded-lg transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {content.userName && (
            <p className="text-xl font-medium text-[#8F7A6A] mb-4">
              Olá, {content.userName}!
            </p>
          )}
          
          <h1 className="text-4xl lg:text-5xl font-playfair font-bold mb-6 text-[#432818]">
            Seu Estilo Predominante é
          </h1>
          
          <div className="inline-block bg-gradient-to-r from-[#B89B7A] to-[#8F7A6A] text-white px-8 py-4 rounded-xl mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              {content.primaryStyle?.category || 'Natural'}
            </h2>
            {content.showPersonalization && (
              <p className="text-xl mt-2">
                {content.primaryStyle?.percentage || 85}% de compatibilidade
              </p>
            )}
          </div>
          
          {content.showSecondaryStyles && content.secondaryStyles && content.secondaryStyles.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-medium text-[#432818] mb-4">
                Estilos Secundários
              </h3>
              <div className="flex justify-center gap-4 flex-wrap">
                {content.secondaryStyles.map((style, index) => (
                  <div key={index} className="bg-[#FAF9F7] px-4 py-2 rounded-lg border border-[#B89B7A]/20">
                    <span className="font-medium text-[#432818]">{style.category}</span>
                    <span className="text-[#8F7A6A] ml-2">{style.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
