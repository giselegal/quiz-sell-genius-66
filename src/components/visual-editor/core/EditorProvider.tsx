import React, { useContext, ReactNode } from "react";
import { useEditorStore, useAutoSave } from "@/store/editorStore";
import { EditorContext, EditorContextValue } from "./EditorContext";

interface EditorProviderProps {
  children: ReactNode;
  editorId?: string;
  mode?: "basic" | "advanced" | "unified";
  autoSaveInterval?: number;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({
  children,
  editorId = "default",
  mode = "advanced",
  autoSaveInterval = 5000,
}) => {
  // Carregar estado ao inicializar
  React.useEffect(() => {
    const { loadState } = useEditorStore.getState();
    loadState();
  }, []);

  // Auto-save hook
  useAutoSave(autoSaveInterval);

  const contextValue: EditorContextValue = {
    editorId,
    mode,
  };

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext deve ser usado dentro de EditorProvider");
  }
  return context;
};

export default EditorProvider;
