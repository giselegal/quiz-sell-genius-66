declare module '@lovable/react' {
  import React from 'react';
  export const LovableProvider: React.FC<{ children: React.ReactNode }>;
  export const EditorScript: React.FC;
  export const Editable: React.FC<{ id: string; children: React.ReactNode }>;
}

declare module '@lovable/editor' {
  // Caso precise de APIs específicas do editor
}
