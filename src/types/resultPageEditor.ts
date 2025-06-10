
import { VisualElement, VisualStage, BlockType } from './visualEditor';
import { StyleResult } from './quiz';

export type ResultPageBlockType = 
  | 'styleResult'
  | 'hero'
  | 'pricing' 
  | 'testimonials'
  | 'guarantee'
  | 'benefits'
  | 'offer'
  | 'mentor'
  | BlockType;

export interface ResultPageElement extends Omit<VisualElement, 'type'> {
  type: ResultPageBlockType;
}

export interface ResultPageEditorState {
  elements: ResultPageElement[];
  stages: VisualStage[];
  activeStageId: string | null;
  primaryStyle: StyleResult;
  secondaryStyles?: StyleResult[];
  globalStyles?: {
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
  };
}

export interface ResultPageEditorProps {
  primaryStyle: StyleResult;
  secondaryStyles?: StyleResult[];
  onSave?: (config: any) => void;
  onPreview?: () => void;
}
