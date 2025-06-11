
export type ResultPageBlockType = 
  | 'header'
  | 'styleResult'
  | 'transformation'
  | 'motivation'
  | 'bonus'
  | 'testimonials'
  | 'guarantee'
  | 'mentor'
  | 'cta'
  | 'footer';

export interface ResultPageBlock {
  id: string;
  type: ResultPageBlockType;
  content: any;
  order: number;
  visible: boolean;
}

export interface ResultPageConfig {
  blocks: ResultPageBlock[];
  primaryStyle: any;
  secondaryStyles?: any[];
}
