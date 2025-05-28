
import React from 'react';
import { QuizComponentType } from '@/types/quizBuilder';

interface ComponentItemProps {
  type: QuizComponentType;
  label: string;
  icon: React.ReactNode;
  description?: string;
  onSelect: (type: QuizComponentType) => void;
  isActive?: boolean;
}

export const ComponentItem: React.FC<ComponentItemProps> = ({
  type,
  label,
  icon,
  description,
  onSelect,
  isActive = false
}) => {
  return (
    <div
      className={`
        p-3 rounded-lg border cursor-pointer transition-all duration-200
        ${isActive 
          ? 'bg-[#B89B7A] text-white border-[#B89B7A]' 
          : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-[#B89B7A]'
        }
      `}
      onClick={() => onSelect(type)}
    >
      <div className="flex items-center gap-3">
        <div className={`text-lg ${isActive ? 'text-white' : 'text-[#B89B7A]'}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className={`font-medium text-sm ${isActive ? 'text-white' : 'text-[#432818]'}`}>
            {label}
          </h4>
          {description && (
            <p className={`text-xs mt-1 ${isActive ? 'text-white/80' : 'text-[#8F7A6A]'}`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
