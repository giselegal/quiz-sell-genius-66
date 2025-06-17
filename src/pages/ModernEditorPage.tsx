import React from "react";
import { EditorProvider } from "@/contexts/EditorContext.tsx";
import { VisualEditor } from "@/components/editor/VisualEditor";

const ModernEditorPage: React.FC = () => {
  return (
    <EditorProvider>
      <VisualEditor />
    </EditorProvider>
  );
};

export default ModernEditorPage;
