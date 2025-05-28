
import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../QuizQuestion';
import { UserResponse } from '@/types/quiz';
import { strategicQuestions } from '@/data/strategicQuestions';
import { AnimatedWrapper } from '../ui/animated-wrapper';

interface StrategicQuestionsProps {
  currentQuestionIndex: number;
  answers: Record<string, string[]>;
  onAnswer: (response: UserResponse) => void;
  onNextClick?: () => void;
}

export const StrategicQuestions: React.FC<StrategicQuestionsProps> = ({
  currentQuestionIndex,
  answers,
  onAnswer,
  onNextClick
}) => {
  const [mountKey, setMountKey] = useState(Date.now());
  
  console.log('Rendering strategic question:', strategicQuestions[currentQuestionIndex]?.id);
  console.log('Question has image:', !!strategicQuestions[currentQuestionIndex]?.imageUrl);
  
  // Remount component when question changes to ensure clean state
  useEffect(() => {
    setMountKey(Date.now());
  }, [currentQuestionIndex]);

  if (currentQuestionIndex >= strategicQuestions.length) return null;

  return (
    <AnimatedWrapper key={mountKey}>
      <QuizQuestion
        question={strategicQuestions[currentQuestionIndex]}
        onAnswer={onAnswer}
        currentAnswers={answers[strategicQuestions[currentQuestionIndex].id] || []}
        autoAdvance={true}
        onNextClick={onNextClick}
        showQuestionImage={true}
      />
    </AnimatedWrapper>
  );
};
