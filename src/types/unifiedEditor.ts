
import { QuizComponentData } from './quiz';
import { Block } from './editor';
export interface UnifiedEditorState {
  activeTab: 'quiz' | 'result' | 'sales';
  isPreviewing: boolean;
  quizEditorState: {
    components: QuizComponentData[];
    stages: any[];
    previewMode?: boolean;
  };
  resultEditorState: {
    config: any;
    blocks: Block[];
  salesEditorState: {
}
export interface ResultPageConfig {
  styleType: string;
  title?: string;
  header: {
    visible: boolean;
    content: Record<string, any>;
  mainContent: {
  offer: {
    hero: {
      visible: boolean;
      content: Record<string, any>;
    };
    benefits: {
    products: {
    pricing: {
    testimonials: {
    guarantee: {
