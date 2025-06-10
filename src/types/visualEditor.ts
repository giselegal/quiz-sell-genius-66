
export type BlockType = 
  | 'text' 
  | 'title' 
  | 'image' 
  | 'video' 
  | 'audio' 
  | 'button' 
  | 'input' 
  | 'email' 
  | 'phone' 
  | 'checkbox' 
  | 'radio' 
  | 'option' 
  | 'testimonial' 
  | 'price' 
  | 'alert' 
  | 'arguments' 
  | 'carousel' 
  | 'chart' 
  | 'progress' 
  | 'script' 
  | 'spacer' 
  | 'terms';

export interface VisualElement {
  id: string;
  type: BlockType;
  stageId: string;
  order: number;
  content: {
    text?: string;
    html?: string;
    src?: string;
    alt?: string;
    href?: string;
    placeholder?: string;
    options?: string[];
    value?: any;
    [key: string]: any;
  };
  style: {
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
    borderRadius?: string;
    border?: string;
    [key: string]: any;
  };
  visible: boolean;
  locked: boolean;
}

export interface VisualStage {
  id: string;
  title: string;
  order: number;
  type: 'quiz' | 'result' | 'sales';
  settings: {
    showHeader: boolean;
    showProgress: boolean;
    allowBack: boolean;
    backgroundColor?: string;
    [key: string]: any;
  };
}

export interface VisualEditorState {
  elements: VisualElement[];
  stages: VisualStage[];
  activeStageId: string | null;
  history: VisualEditorState[];
  historyIndex: number;
}
