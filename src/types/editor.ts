export interface UniversalBlock {
  id: string;
  type: string; // Could be constrained to a union of known block types if desired
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
  | 'styleResult' // Consider if this is a block or a style property
  | 'cta'
  | 'testimonial'
  | 'carousel'
  | 'bonus'
  | 'guarantee'
  | 'divider' // Added based on common use cases
  | 'spacer'  // Added based on common use cases
  | 'video'   // Added based on common use cases
  | string; // Keep for flexibility during transition

// Add missing EditorBlock type which was imported across many files
export interface EditorBlock extends UniversalBlock {
  // id, type, order, settings are inherited from UniversalBlock
  content: EditableContent; 
}

// Add missing EditableContent type
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
  items?: Array<Record<string, any>>; // More specific than any[]
  style?: Record<string, any>; // Use a generic record for style properties
  [key: string]: any;
}

// Add missing EditorConfig type
export interface EditorConfig {
  blocks: EditorBlock[]; // Should this be UniversalBlock[] or EditorBlock[]?
                           // Using EditorBlock for now as it's more specific to editor contexts.
  globalStyles?: GlobalStyles;
  settings?: EditorSettings;
}

// Define more specific types for globalStyles and settings
export interface GlobalStyles extends Record<string, any> {
  textColor?: string;
  accentColor?: string;
  secondaryColor?: string;
  buttonStyle?: string; // This could be an object with more detailed button styles
  headingStyle?: string; // Similar to buttonStyle, could be more detailed
  spacing?: string; // e.g., '8px', '1rem'
  borderRadius?: string;
  [key: string]: any;
}

export interface EditorSettings {
  showLogo?: boolean;
  showNavigation?: boolean;
  showFooter?: boolean;
  customVariables?: Record<string, string | number>; // For themeing or dynamic content
  [key: string]: any;
}
