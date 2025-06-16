
import React from 'react';
import { ModernVisualEditor } from '@/components/visual-editor/ModernVisualEditor';

const ModernEditorQuizPage: React.FC = () => {
  const handleSave = (data: any) => {
    console.log('Quiz descubra seu estilo salvo:', data);
    localStorage.setItem('quiz-descubra-seu-estilo-editor-data', JSON.stringify(data));
  };

  return (
    <ModernVisualEditor
      funnelId="quiz-descubra-seu-estilo"
      pageType="quiz-descubra-seu-estilo"
      onSave={handleSave}
    />
  );
};

export default ModernEditorQuizPage;
