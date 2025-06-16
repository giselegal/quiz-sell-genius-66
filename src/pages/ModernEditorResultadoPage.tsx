
import React from 'react';
import { ModernVisualEditor } from '@/components/visual-editor/ModernVisualEditor';

const ModernEditorResultadoPage: React.FC = () => {
  const handleSave = (data: any) => {
    console.log('Página de resultado salva:', data);
    localStorage.setItem('resultado-page-editor-data', JSON.stringify(data));
  };

  return (
    <ModernVisualEditor
      funnelId="resultado-page"
      pageType="resultado"
      onSave={handleSave}
    />
  );
};

export default ModernEditorResultadoPage;
