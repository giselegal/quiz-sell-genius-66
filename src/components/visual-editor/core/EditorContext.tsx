import { createContext } from "react";

export interface EditorContextValue {
  // Context pode ser estendido se necessário
  editorId: string;
  mode: "basic" | "advanced" | "unified";
}

export const EditorContext = createContext<EditorContextValue | null>(null);
