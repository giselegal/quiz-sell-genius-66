
export interface UniversalBlock {
  id: string;
  type: string;
  content: Record<string, any>;
  settings?: Record<string, any>;
  order: number;
}

export interface Block extends UniversalBlock {}

export type BlockType = 
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'button'
  | 'title'
  | 'subtitle'
  | 'text'
  | 'styleResult'
  | 'cta'
  | 'testimonial'
  | 'carousel'
  | 'bonus'
  | 'guarantee'
  | 'divider'
  | 'spacer'
  | 'video'
  | 'benefits'
  | string;

export interface EditorBlock extends UniversalBlock {
  content: EditableContent; 
}

export interface EditableContent {
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
  caption?: string;
  buttonText?: string;
  buttonUrl?: string;
  description?: string;
  items?: string[]; // Changed from Array<Record<string, any>> to string[]
  style?: Record<string, any>;
  [key: string]: any;
}

export interface EditorConfig {
  blocks: EditorBlock[];
  globalStyles?: GlobalStyles;
  settings?: EditorSettings;
}

export interface GlobalStyles extends Record<string, any> {
  textColor?: string;
  accentColor?: string;
  secondaryColor?: string;
  buttonStyle?: string;
  headingStyle?: string;
  spacing?: string;
  borderRadius?: string;
  [key: string]: any;
}

export interface EditorSettings {
  showLogo?: boolean;
  showNavigation?: boolean;
  showFooter?: boolean;
  customVariables?: Record<string, string | number>;
  [key: string]: any;
}
