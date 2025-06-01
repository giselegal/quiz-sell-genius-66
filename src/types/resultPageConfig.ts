
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
}

export interface ResultPageConfig {
  styleType: string;
  heroSection: HeroSection;
  aboutSection: AboutSection;
  globalStyles?: GlobalStyles;
  blocks?: any[];
}
