
import React from 'react';
import { Progress } from '../ui/progress';
import { AnimatedWrapper } from '../ui/animated-wrapper';

interface QuizHeaderProps {
  userName: string | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  showingStrategicQuestions: boolean;
  currentStrategicQuestionIndex: number;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  userName,
  currentQuestionIndex,
  totalQuestions,
  showingStrategicQuestions,
  currentStrategicQuestionIndex,
}) => {
  return (
    <>
      <AnimatedWrapper>
        <Progress 
          value={Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)} 
          className="w-full h-2 bg-[#B89B7A]/20" 
          indicatorClassName="bg-[#B89B7A]" 
        />
      </AnimatedWrapper>
      
      <AnimatedWrapper className="flex justify-between items-center mb-8">
        <h1 className="text-base font-playfair text-[#432818]">
          Olá, {userName || 'Visitante'}!
        </h1>
        <div className="text-sm text-[#1A1818]/60">
          {showingStrategicQuestions 
            ? currentStrategicQuestionIndex + 1 
            : currentQuestionIndex + 1} de {totalQuestions}
        </div>
      </AnimatedWrapper>
    </>
  );
};
