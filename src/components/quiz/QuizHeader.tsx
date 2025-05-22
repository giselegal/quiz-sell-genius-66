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
  const progressValue = showingStrategicQuestions
    ? Math.round(((totalQuestions + currentStrategicQuestionIndex + 1) / (totalQuestions + 5)) * 100) // 5 é o número de questões estratégicas, idealmente viria de props ou data
    : Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const currentStep = showingStrategicQuestions 
    ? totalQuestions + currentStrategicQuestionIndex + 1 
    : currentQuestionIndex + 1;
  
  const totalSteps = showingStrategicQuestions 
    ? totalQuestions + 5 // Assumindo 5 questões estratégicas
    : totalQuestions;

  return (
    <>
      {/* A barra de progresso dinâmica é mantida e agora considera questões estratégicas */}
      <Progress 
        value={progressValue} 
        className="w-full h-2 bg-[#B89B7A]/20 fixed top-0 left-0 z-50" // Fixada no topo
        indicatorClassName="bg-[#B89B7A]" 
      />
      
      {/* Diminuído o mb-8 para mb-4 */}
      <AnimatedWrapper className="flex justify-between items-center pt-6 pb-4 px-4">
        <h1 className="text-base font-playfair text-[#432818]">
          Olá, {userName || 'Visitante'}!
        </h1>
        <div className="text-sm text-[#1A1818]/60">
          {currentStep} de {totalSteps}
        </div>
      </AnimatedWrapper>
    </>
  );
};
