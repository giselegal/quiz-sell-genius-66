import { useContext } from "react";
import { EditorContext } from "../core/EditorProvider";

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext deve ser usado dentro de EditorProvider");
  }
  return context;
};
