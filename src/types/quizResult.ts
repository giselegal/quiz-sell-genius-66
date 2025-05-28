
import { StyleResult } from './quiz';
export interface ResultPageBlock {
  id: string;
  type: 'title' | 'subtitle' | 'styleResult' | 'image' | 'text' | 'cta' | 'testimonial' | 'bonus' | 'guarantee' | 'carousel';
  content: string;
  imageUrl?: string;
  order: number;
  settings?: Record<string, any>;
  abTestVariant?: string;
  isVisible?: boolean;
  
  // Additional properties for specific block types
  styleCategory?: string;
  percentage?: number;
  description?: string;
  buttonText?: string;
  url?: string;
  pixelId?: string;
  backgroundColor?: string;
  textColor?: string;
  author?: string;
  authorImage?: string;
  rating?: number;
  items?: Array<{
    id: string;
    imageUrl: string;
    caption?: string;
  }>;
}
export interface StyleResultBlock extends ResultPageBlock {
  type: 'styleResult';
  styleCategory: string;
export interface CTABlock extends ResultPageBlock {
  type: 'cta';
  buttonText: string;
  url: string;
export interface TestimonialBlock extends ResultPageBlock {
  type: 'testimonial';
  author: string;
export interface CarouselBlock extends ResultPageBlock {
  type: 'carousel';
  items: {
  }[];
export interface ResultPage {
  title: string;
  blocks: ResultPageBlock[];
  settings: {
    backgroundColor?: string;
    backgroundImage?: string;
    fontFamily?: string;
    primaryColor?: string;
    secondaryColor?: string;
    showSecondaryStyles?: boolean;
    abTestEnabled?: boolean;
    abTestVariants?: string[];
  };
export interface OfferPage {
export interface QuizFunnel {
  name: string;
  quizQuestions: string[];
  resultPage: ResultPage;
  offerPage?: OfferPage;
  createdAt: Date;
  updatedAt: Date;
