
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';

interface CanvasHeaderProps {
  logoUrl?: string;
  logoAlt?: string;
  currentStep?: number;
  totalSteps?: number;
  onBack?: () => void;
}

export const CanvasHeader: React.FC<CanvasHeaderProps> = ({
  logoUrl,
  logoAlt = 'Logo',
  currentStep = 1,
  totalSteps = 10,
  onBack
}) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
  
  return (
    <div className="flex flex-row w-full h-auto justify-center relative" data-sentry-component="VerticalCanvasHeader">
      {onBack && (
        <Button 
          variant="ghost" 
          className="absolute left-0 h-10 w-10"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      )}
      
      <div className="flex flex-col w-full customizable-width justify-start items-center gap-4">
        {logoUrl && (
          <img 
            width="96" 
            height="96" 
            className="max-w-24 object-cover" 
            alt={logoAlt} 
            src={logoUrl}
          />
        )}
        
        <Progress 
          value={progressPercentage}
          className="w-full h-2 bg-zinc-300"
        />
      </div>
    </div>
  );
};
