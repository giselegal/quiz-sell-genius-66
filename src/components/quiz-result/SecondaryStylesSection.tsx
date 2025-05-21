
import React from 'react';
import { StyleResult } from '@/types/quiz';

interface SecondaryStylesSectionProps {
  secondaryStyles: StyleResult[];
}

const SecondaryStylesSection: React.FC<SecondaryStylesSectionProps> = ({ secondaryStyles }) => {
  return (
    <div className="space-y-1.5">
      <h3 className="text-xs font-medium text-[#432818] mb-1">
        Estilos Complementares
      </h3>
      <div className="grid grid-cols-1 gap-1.5">
        {secondaryStyles.slice(0, 2).map((style) => (
          <div key={style.category} className="flex justify-between items-center">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-0.5">
                <h4 className="text-xs text-[#432818]">{style.category}</h4>
                <span className="text-2xs font-medium text-[#8F7A6A]">{style.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-[#B89B7A] h-1 rounded-full" 
                  style={{ width: `${style.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondaryStylesSection;
