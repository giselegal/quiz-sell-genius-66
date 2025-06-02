
export interface HeroSection {
  title: string;
  subtitle: string;
  imageUrl?: string;
  ctaText?: string;
  backgroundColor?: string;
}

export interface AboutSection {
  title: string;
  description: string;
  imageUrl?: string;
}

export interface GlobalStyles {
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface StyleOptions {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  paddingY?: string;
  paddingX?: string;
  margin?: string;
  width?: string;
  maxWidth?: string;
  borderRadius?: string;
  textAlign?: string;
  fontFamily?: string;
}

export interface SectionContent {
  title?: string;
  subtitle?: string;
  description?: string;
  userName?: string;
  customImage?: string;
  price?: string;
  regularPrice?: string;
  ctaText?: string;
  ctaUrl?: string;
  imageUrl?: string;
  features?: string[];
  bonuses?: Array<{
    title: string;
    description: string;
    value: string;
  }>;
  name?: string;
  credentials?: string;
  period?: string;
  type?: string;
  [key: string]: any;
}

export interface Section {
  visible: boolean;
  style: StyleOptions;
  content: SectionContent;
  appearance?: any;
}

export interface OfferContent {
  title?: string;
  subtitle?: string;
  price?: string;
  regularPrice?: string;
  ctaText?: string;
  ctaUrl?: string;
  heroImage?: string;
  heroImage2?: string;
  [key: string]: any;
}

export interface OfferSection {
  hero: Section;
  products: Section;
  benefits: Section;
  pricing: Section;
  testimonials: Section;
  guarantee: Section;
}

// Sistema de Blocos Drag-and-Drop
export interface BlockData {
  id: string;
  type: 'hero' | 'text' | 'image' | 'cta' | 'testimonials' | 'pricing' | 'benefits' | 'guarantee' | 'mentor' | 'transformations' | 'bonus' | 'motivation' | 'secondary-styles';
  title: string;
  content: SectionContent;
  style: StyleOptions;
  visible: boolean;
  order: number;
  editable: boolean;
}

export interface DragDropConfig {
  blocks: BlockData[];
  globalStyles: GlobalStyles;
}

export interface ResultPageConfig {
  styleType: string;
  heroSection: HeroSection;
  aboutSection: AboutSection;
  globalStyles?: GlobalStyles;
  blocks?: BlockData[];
  dragDropConfig?: DragDropConfig;
  header: Section;
  mainContent: Section;
  secondaryStyles: Section;
  offer: OfferSection;
  mentor?: any;
}

// Export types properly for isolatedModules
export type { OfferContent as OfferContentType, StyleOptions as StyleOptionsType };
