import React from "react";
import ResultPage from "../../../pages/ResultPage";

interface StageLayoutResultProps {
  stage: {
    id: string;
    title: string;
    subtitle?: string;
    type: string;
  };
}

export const StageLayoutResult: React.FC<StageLayoutResultProps> = ({
  stage,
}) => {
  return <ResultPage />;
};
