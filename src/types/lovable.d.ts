
// Local Lovable type definitions
interface LovableProviderProps {
  children: React.ReactNode;
  projectId?: string;
  enableLiveMode?: boolean;
  enableRealTimeSync?: boolean;
}

interface EditorScriptProps {
  enableInlineEditing?: boolean;
  enableRealTimeSync?: boolean;
}

interface EditableProps {
  id: string;
  children: React.ReactNode;
  type?: 'text' | 'image' | 'component';
  onEdit?: (content: any) => void;
}

interface VisualEditorProps {
  componentId: string;
  children: React.ReactNode;
  enableInlineEdit?: boolean;
}

interface LivePreviewProps {
  children: React.ReactNode;
  updateMode?: 'instant' | 'debounced';
}

interface EditorAPI {
  saveComponent: (id: string, data: any) => Promise<void>;
  loadComponent: (id: string) => Promise<any>;
  enableRealTimeSync: () => void;
  disableRealTimeSync: () => void;
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
