declare module '@lovable/react' {
  import React from 'react';
  export const LovableProvider: React.FC<{ children: React.ReactNode }>;
  export const EditorScript: React.FC;
  export const Editable: React.FC<{ id: string; children: React.ReactNode }>;
}

declare module '@lovable/editor' {
  // Caso precise de APIs específicas do editor
// Estende o objeto Window para incluir propriedades do Lovable
interface LovableConfig {
  projectId: string;
  apiBaseUrl: string;
  authToken?: string;
  [key: string]: any;
declare global {
  interface Window {
    LOVABLE_CONFIG?: LovableConfig;
  }
