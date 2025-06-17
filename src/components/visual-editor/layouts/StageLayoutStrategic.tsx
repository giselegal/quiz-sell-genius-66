import React from "react";
import { StrategicQuestions } from "../../quiz/StrategicQuestions";

interface StageLayoutStrategicProps {
  stage: {
    id: string;
    title: string;
    subtitle?: string;
    type: string;
  };
  onNext?: () => void;
  onPrevious?: () => void;
  showPrevious?: boolean;
}

export const StageLayoutStrategic: React.FC<StageLayoutStrategicProps> = ({
  stage,
  onNext,
  onPrevious,
  showPrevious = false,
}) => {
  return (
    <StrategicQuestions
      onNext={onNext}
      onPrevious={onPrevious}
      showPrevious={showPrevious}
    />
  );
};
