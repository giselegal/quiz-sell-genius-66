import React from "react";
import EditableQuizIntro from "../components/EditableQuizIntro";

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
  onNext,
}) => {
  return (
    <EditableQuizIntro
      title={
        stage.title ||
        "Chega de um guarda-roupa lotado e da sensação de que nada combina com Você."
      }
      subtitle={
        stage.subtitle ||
        "Em poucos minutos, descubra seu Estilo Predominante — e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança."
      }
      buttonText={stage.buttonText || "Quero Descobrir meu Estilo Agora!"}
      onStart={() => onNext?.()} // Chamada sem parâmetro nome para compatibilidade
    />
  );
};
