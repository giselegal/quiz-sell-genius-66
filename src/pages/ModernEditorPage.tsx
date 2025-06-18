import React from "react";
import { ModernVisualEditor } from "@/components/visual-editor/ModernVisualEditor";

const ModernEditorPage: React.FC = () => {
  return (
    <ModernVisualEditor 
      funnelId="quiz-descubra-seu-estilo"
      onSave={(data) => {
        console.log("Quiz saved:", data);
      }}
    />
  );
};

export default ModernEditorPage;
