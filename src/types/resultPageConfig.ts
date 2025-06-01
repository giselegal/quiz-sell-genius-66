
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

export interface ResultPageConfig {
  styleType: string;
  heroSection: HeroSection;
  aboutSection: AboutSection;
  globalStyles?: GlobalStyles;
  blocks?: any[];
  header: Section;
  mainContent: Section;
  secondaryStyles: Section;
  offer: OfferSection;
  mentor?: any;
}

// Export all the missing types
export { OfferContent, StyleOptions };
