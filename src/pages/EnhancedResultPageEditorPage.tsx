import React from 'react';
import { EnhancedResultPageEditorPage as EditorPageComponent } from '@/components/result-editor/EnhancedResultPageEditorWrapper';

// Este componente serve como um ponto de entrada para o editor visual aprimorado
// da página de resultados, permitindo acesso através do sistema de roteamento
// IMPORTANTE: O nome do componente deve ser igual ao nome utilizado na importação no App.tsx
const EnhancedResultPageEditor: React.FC = () => {
  return <EditorPageComponent />;
};

export default EnhancedResultPageEditor;