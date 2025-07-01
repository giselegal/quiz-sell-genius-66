
import React from 'react';
import { Button } from '@/components/ui/button';
import { VisualStage } from '@/types/visualEditor';

interface StageTabProps {
  stage: VisualStage;
  isActive: boolean;
  onClick: () => void;
}

export const StageTab: React.FC<StageTabProps> = ({ stage, isActive, onClick }) => {
  return (
    <Button
      variant={isActive ? 'default' : 'ghost'}
      size="sm"
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {stage.title}
    </Button>
  );
};
