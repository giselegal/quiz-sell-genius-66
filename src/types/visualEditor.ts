// Visual Editor specific types

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

export interface ComponentTemplate {
  id: string;
  name: string;
  category: string;
  icon: string;
  isPremium: boolean;
  defaultContent: ElementContent;
  defaultStyle: ElementStyle;
}

export interface DraggedComponent {
  type: string;
  template: ComponentTemplate;
}

export interface DropZone {
  id: string;
  elementId?: string;
  position: "before" | "after" | "inside";
}
