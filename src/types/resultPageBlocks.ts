
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

export interface ResultPageBlockContent {
  header?: {
    logo?: string;
    logoAlt?: string;
    logoHeight?: number;
    userName?: string;
  };
  styleResult?: {
    description?: string;
    customImage?: string;
    showSecondaryStyles?: boolean;
  };
  transformation?: {
    title?: string;
    beforeImage?: string;
    afterImage?: string;
    description?: string;
  };
  motivation?: {
    title?: string;
    subtitle?: string;
    items?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
  };
  bonus?: {
    title?: string;
    bonuses?: Array<{
      title: string;
      description: string;
      image?: string;
      value?: string;
    }>;
  };
  testimonials?: {
    title?: string;
    testimonials?: Array<{
      text: string;
      author: string;
      image?: string;
      rating?: number;
    }>;
  };
  guarantee?: {
    title?: string;
    description?: string;
    days?: number;
    icon?: string;
  };
  mentor?: {
    name?: string;
    title?: string;
    description?: string;
    image?: string;
    credentials?: string[];
  };
  cta?: {
    title?: string;
    subtitle?: string;
    regularPrice?: string;
    salePrice?: string;
    installments?: string;
    ctaText?: string;
    ctaUrl?: string;
    urgencyText?: string;
    productImage?: string;
  };
  footer?: {
    companyName?: string;
    links?: Array<{
      text: string;
      url: string;
    }>;
  };
}

export interface ResultPageBlock {
  id: string;
  type: ResultPageBlockType;
  content: ResultPageBlockContent;
  style?: Record<string, any>;
  order: number;
  visible: boolean;
}
