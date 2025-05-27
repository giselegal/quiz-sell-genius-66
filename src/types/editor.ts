
export type BlockType = 
  | 'header'
  | 'hero-section'
  | 'text'
  | 'products'
  | 'pricing'
  | 'testimonials'
  | 'benefits'
  | 'guarantee'
  | 'cta'
  | 'style-result'
  | 'secondary-styles'
  | 'bonus-carousel'
  | 'headline'
  | 'image';

export interface Block {
  id: string;
  type: BlockType;
  content: any;
  order: number;
}

export interface EditorBlock {
  id: string;
  type: BlockType;
  content: any;
  order: number;
}
