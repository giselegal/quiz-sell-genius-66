
declare module '@lovable/react' {
  import React from 'react';

  interface LovableProviderProps {
    children: React.ReactNode;
    projectId?: string;
    enableLiveMode?: boolean;
    enableRealTimeSync?: boolean;
  }
  export const LovableProvider: (props: LovableProviderProps) => JSX.Element;

  // Script do editor aprimorado
  interface EditorScriptProps {
    enableInlineEditing?: boolean;
    enableRealTimeSync?: boolean;
  }
  export const EditorScript: (props?: EditorScriptProps) => JSX.Element;

  interface EditableProps {
    id: string;
    children: React.ReactNode;
    type?: 'text' | 'image' | 'component';
    onEdit?: (content: any) => void;
  }
  export const Editable: (props: EditableProps) => JSX.Element;

  // Novos componentes para versão 2.1.0
  interface VisualEditorProps {
    componentId: string;
    children: React.ReactNode;
    enableInlineEdit?: boolean;
  }
  export const VisualEditor: (props: VisualEditorProps) => JSX.Element;

  interface LivePreviewProps {
    children: React.ReactNode;
    updateMode?: 'instant' | 'debounced';
  }
  export const LivePreview: (props: LivePreviewProps) => JSX.Element;
}

declare module '@lovable/editor' {
  export interface EditorAPI {
    saveComponent: (id: string, data: any) => Promise<void>;
    loadComponent: (id: string) => Promise<any>;
    enableRealTimeSync: () => void;
    disableRealTimeSync: () => void;
  }
  
  export const useEditorAPI: () => EditorAPI;
}

// Configurações globais aprimoradas
interface LovableConfig {
  projectId: string;
  apiBaseUrl: string;
  authToken?: string;
  enableLiveMode?: boolean;
  enableRealTimeSync?: boolean;
  version?: string;
  features?: {
    componentTagger?: boolean;
    liveEditing?: boolean;
    enhancedSync?: boolean;
    visualEditor?: boolean;
    realTimeCollaboration?: boolean;
  };
  [key: string]: any;
}

declare global {
  interface Window {
    LOVABLE_CONFIG?: LovableConfig;
    __LOVABLE_VERSION__?: string;
    __LOVABLE_FEATURES__?: string[];
  }
}

export {};
