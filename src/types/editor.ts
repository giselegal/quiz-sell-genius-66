// Tipos para o conteúdo dos elementos
export interface HeadingContent {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface TextContent {
  text: string;
}

export interface ImageContent {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ButtonContent {
  text: string;
  action: "next" | "submit" | "custom";
  customAction?: string;
}

export interface InputContent {
  label: string;
  placeholder: string;
  type: "text" | "email" | "tel" | "number";
  required: boolean;
  name: string;
}

export interface SpacerContent {
  height: number;
}

export interface VideoContent {
  src: string;
  autoplay: boolean;
  controls: boolean;
}

export type ElementContent =
  | HeadingContent
  | TextContent
  | ImageContent
  | ButtonContent
  | InputContent
  | SpacerContent
  | VideoContent;

// Tipos para estilos
export interface ElementStyles {
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right";
  padding?: string;
  margin?: string;
  borderRadius?: string;
  border?: string;
  width?: string;
  height?: string;
}

export interface EditorElement {
  id: string;
  type: "heading" | "text" | "image" | "button" | "input" | "spacer" | "video";
  content: ElementContent;
  styles: ElementStyles;
  position: number;
}

export interface EditorStep {
  id: string;
  name: string;
  elements: EditorElement[];
  settings: {
    showLogo: boolean;
    showProgress: boolean;
    allowReturn: boolean;
  };
}

export interface EditorState {
  steps: EditorStep[];
  currentStepId: string;
  selectedElementId: string | null;
  history: EditorState[];
  historyIndex: number;
}

// Actions
export type EditorAction =
  | { type: "ADD_STEP"; payload: EditorStep }
  | { type: "DELETE_STEP"; payload: string }
  | {
      type: "UPDATE_STEP";
      payload: { id: string; updates: Partial<EditorStep> };
    }
  | { type: "SET_CURRENT_STEP"; payload: string }
  | { type: "ADD_ELEMENT"; payload: { stepId: string; element: EditorElement } }
  | {
      type: "UPDATE_ELEMENT";
      payload: {
        stepId: string;
        elementId: string;
        updates: Partial<EditorElement>;
      };
    }
  | { type: "DELETE_ELEMENT"; payload: { stepId: string; elementId: string } }
  | {
      type: "REORDER_ELEMENTS";
      payload: { stepId: string; elementIds: string[] };
    }
  | { type: "SELECT_ELEMENT"; payload: string | null }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SAVE_TO_HISTORY" };

export interface Block {
  id: string;
  type: string;
  content: Record<string, unknown>;
  order: number; // Changed from optional to required to match EditorBlock
  settings?: Record<string, unknown>;
  [key: string]: unknown;
}

export type BlockType =
  | "heading"
  | "paragraph"
  | "image"
  | "button"
  | "title"
  | "subtitle"
  | "text"
  | "styleResult"
  | "cta"
  | "testimonial"
  | "carousel"
  | "bonus"
  | "guarantee"
  | string;

// Add missing EditorBlock type which was imported across many files
export interface EditorBlock extends Block {
  id: string;
  type: BlockType | "result-header" | "transition" | "final-cta";
  content: EditableContent | any; // Allow any content type for result page blocks
  order: number;
  visible?: boolean;
  settings?: Record<string, any>;
}

// Add missing EditableContent type
export interface EditableContent {
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
  caption?: string;
  buttonText?: string;
  buttonUrl?: string;
  description?: string;
  items?: any[];
  style?: {
    color?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    textAlign?: string;
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
    lineHeight?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
    display?: string;
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    boxShadow?: string;
    letterSpacing?: string;
    borderWidth?: string;
    borderStyle?: string;
    borderColor?: string;
    objectFit?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Add missing EditorConfig type
export interface EditorConfig {
  blocks: EditorBlock[];
  globalStyles?: {
    backgroundColor?: string;
    fontFamily?: string;
    textColor?: string;
    accentColor?: string;
    secondaryColor?: string;
    buttonStyle?: string;
    headingStyle?: string;
    spacing?: string;
    borderRadius?: string;
    [key: string]: any;
  };
  settings?: {
    showLogo?: boolean;
    showNavigation?: boolean;
    showFooter?: boolean;
    [key: string]: any;
  };
}

// Visual Editor Types
export interface ElementContent {
  text?: string;
  src?: string;
  alt?: string;
  href?: string;
  placeholder?: string;
  label?: string;
  options?: string[];
  value?: string | number | boolean;
  html?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  [key: string]: any;
}

export interface ElementStyle {
  width?: string | number;
  height?: string | number;
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  border?: string;
  borderRadius?: string;
  boxShadow?: string;
  display?: string;
  flexDirection?: "row" | "column";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch";
  gap?: string;
  position?: "static" | "relative" | "absolute" | "fixed";
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  zIndex?: number;
  opacity?: number;
  transform?: string;
  transition?: string;
  [key: string]: any;
}

export interface CanvasElement {
  id: string;
  type: string;
  content: ElementContent;
  style: ElementStyle;
  visible: boolean;
  locked: boolean;
  order: number;
}

export interface GlobalStyles {
  backgroundColor: string;
  fontFamily: string;
  primaryColor: string;
  secondaryColor: string;
  containerMaxWidth: string;
  customCSS: string;
}

export interface EditorSettings {
  showGrid: boolean;
  snapToGrid: boolean;
  gridSize: number;
  showRulers: boolean;
  showBoundingBoxes: boolean;
  autoSave: boolean;
  autoSaveInterval: number;
}

export interface VisualEditorState {
  elements: CanvasElement[];
  globalStyles: GlobalStyles;
  selectedElementId: string | null;
  hoveredElementId: string | null;
  viewport: "desktop" | "tablet" | "mobile";
  zoomLevel: number;
  isPreviewMode: boolean;
  settings: EditorSettings;
}

export interface VisualEditorData {
  editorState: VisualEditorState;
  pageInfo: {
    title: string;
    description: string;
    slug: string;
    published: boolean;
  };
}

export interface ElementUpdate {
  content?: Partial<ElementContent>;
  style?: Partial<ElementStyle>;
  visible?: boolean;
  locked?: boolean;
}
