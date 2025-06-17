import React from 'react';
import { QuizQuestion } from '../../QuizQuestion';

interface StageLayoutQuestionProps {
  stage: {
    id: string;
    title: string;
    subtitle?: string;
    type: string;
    options: Array<{
      id: string;
      text: string;
      image?: string;
      value?: string;
    }>;
  };
  selectedOptions?: string[];
  onAnswer?: (optionId: string) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  showPrevious?: boolean;
  showNext?: boolean;
}

export const StageLayoutQuestion: React.FC<StageLayoutQuestionProps> = ({ 
  stage,
  selectedOptions = [],
  onAnswer,
  onNext,
  onPrevious,
  showPrevious = false,
  showNext = false
}) => {
  return (
    <QuizQuestion
      question={stage.title}
      subtitle={stage.subtitle}
      options={stage.options}
      selectedOptions={selectedOptions}
      onAnswer={onAnswer}
      onNext={onNext}
      onPrevious={onPrevious}
      showPrevious={showPrevious}
      showNext={showNext}
      multipleChoice={stage.type === 'multiple-choice'}
    />
  );
};
