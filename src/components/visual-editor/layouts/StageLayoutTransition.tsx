import React from "react";
import QuizTransition from "../../QuizTransition";

interface StageLayoutTransitionProps {
  stage: {
    id: string;
    title: string;
    subtitle?: string;
    type: string;
  };
  onNext?: () => void;
}

export const StageLayoutTransition: React.FC<StageLayoutTransitionProps> = ({
  stage,
  onNext,
}) => {
  return (
    <QuizTransition
      title={stage.title || "Analisando suas respostas..."}
      subtitle={
        stage.subtitle || "Estamos preparando seu resultado personalizado"
      }
      onNext={onNext}
    />
  );
};
