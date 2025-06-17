import React from 'react';
import { QuizIntro } from '../../QuizIntro';

interface StageLayoutIntroProps {
  stage: {
    id: string;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    type: string;
  };
  onNext?: () => void;
}

export const StageLayoutIntro: React.FC<StageLayoutIntroProps> = ({ 
  stage, 
  onNext 
}) => {
  return (
    <QuizIntro
      title={stage.title || "Descubra Seu Estilo Único"}
      subtitle={stage.subtitle || "Um quiz personalizado para descobrir qual estilo combina mais com você"}
      buttonText={stage.buttonText || "Começar Quiz"}
      onStart={onNext}
    />
  );
};
