
export interface Block {
  id: string;
  type: string;
  content: Record<string, any>;
  order: number; // Changed from optional to required to match EditorBlock
  settings?: Record<string, any>;
  [key: string]: any;
}
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
  | string;
// Add missing EditorBlock type which was imported across many files
export interface EditorBlock extends Block {
  type: BlockType;
  content: EditableContent;
  order: number;
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
  items?: any[];
  style?: {
    color?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    textAlign?: string;
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
    lineHeight?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
    display?: string;
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    boxShadow?: string;
    letterSpacing?: string;
    borderWidth?: string;
    borderStyle?: string;
    borderColor?: string;
    objectFit?: string;
    [key: string]: any;
  };
// Add missing EditorConfig type
export interface EditorConfig {
  blocks: EditorBlock[];
  globalStyles?: {
    textColor?: string;
    accentColor?: string;
    secondaryColor?: string;
    buttonStyle?: string;
    headingStyle?: string;
    spacing?: string;
  settings?: {
    showLogo?: boolean;
    showNavigation?: boolean;
    showFooter?: boolean;
