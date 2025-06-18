
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';

interface VerticalCanvasHeaderProps {
  logoUrl?: string;
  logoAlt?: string;
  showBackButton?: boolean;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
  onBackClick?: () => void;
}

export const VerticalCanvasHeader: React.FC<VerticalCanvasHeaderProps> = ({
  logoUrl = 'https://cakto-quiz-br01.b-cdn.net/uploads/47fd613e-91a9-48cf-bd52-a9d4e180d5ab.png',
  logoAlt = 'Logo',
  showBackButton = true,
  showProgress = true,
  currentStep = 1,
  totalSteps = 7,
  onBackClick
}) => {
  const progressValue = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className="flex flex-row w-full h-auto justify-center relative">
      {showBackButton && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 hover:bg-primary hover:text-foreground h-10 w-10"
          onClick={onBackClick}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      )}
      
      <div className="flex flex-col w-full justify-start items-center gap-4" style={{ maxWidth: '400px' }}>
        <img
          width="96"
          height="96"
          className="max-w-24 object-cover"
          alt={logoAlt}
          src={logoUrl}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjZjFmMWYxIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiPkxvZ288L3RleHQ+Cjwvc3ZnPg==';
          }}
        />
        
        {showProgress && (
          <Progress 
            value={progressValue} 
            className="w-full h-2 bg-zinc-300"
          />
        )}
      </div>
    </div>
  );
};
