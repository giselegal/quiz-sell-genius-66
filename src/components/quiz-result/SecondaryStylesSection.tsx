
import React from 'react';
import { StyleResult } from '@/types/quiz';

interface SecondaryStylesSectionProps {
  secondaryStyles: StyleResult[];
}

const SecondaryStylesSection: React.FC<SecondaryStylesSectionProps> = ({ secondaryStyles }) => {
  if (!secondaryStyles || secondaryStyles.length === 0) {
    return (
      <p className="text-[#8F7A6A] text-sm">
        Nenhum estilo secundário identificado.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {secondaryStyles.slice(0, 2).map((style, index) => (
        <div key={style.category} className="flex items-center justify-between">
          <span className="text-[#2C1810] font-medium">{style.category}</span>
          <div className="flex items-center gap-2">
            <div className="w-20 bg-[#F3E8E6] rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] h-2 rounded-full transition-all duration-300" 
                style={{ width: `${style.percentage}%` }} 
              />
            </div>
            <span className="text-sm font-medium text-[#B89B7A] min-w-[3rem]">
              {style.percentage}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecondaryStylesSection;
