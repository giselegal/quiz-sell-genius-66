
import { Block } from './editor';
import { QuizBuilderState, QuizComponentData, QuizStage } from './quizBuilder';
import { ResultPageConfig } from './resultPageConfig';

export interface EditorHistory {
  past: Array<any>;
  present: any;
  future: Array<any>;
}

export interface UnifiedEditorState {
  activeTab: 'quiz' | 'result' | 'sales';
  isPreviewing: boolean;
  quizEditorState: {
    components: QuizComponentData[];
    stages: QuizStage[];
    activeStageId?: string;
    selectedComponentId?: string;
  };
  resultEditorState: {
    config: ResultPageConfig;
    blocks: Block[];
    selectedBlockId?: string;
  };
  salesEditorState: {
    blocks: Block[];
    selectedBlockId?: string;
  };
}

export interface UnifiedTemplateConfig {
  quiz?: QuizBuilderState;
  result?: ResultPageConfig;
  sales?: {
    blocks: Block[];
  };
}

export interface EditorConfig {
  theme: 'light' | 'dark';
  sidebarWidth: number;
  propertiesPanelWidth: number;
  autoSave: boolean;
  autoSaveInterval: number;
}
