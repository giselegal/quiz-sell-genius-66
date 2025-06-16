
import React from 'react';
import { ModernVisualEditor } from '@/components/visual-editor/ModernVisualEditor';

const ModernEditorPage: React.FC = () => {
  const handleSave = (data: any) => {
    console.log('Editor data saved:', data);
    // Aqui você pode implementar a lógica de salvamento
  };

  return (
    <ModernVisualEditor
      funnelId="demo-funnel-001"
      onSave={handleSave}
    />
  );
};

export default ModernEditorPage;
