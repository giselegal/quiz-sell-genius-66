
export interface EditorState {
  selectedBlockId: string | null;
  isPreviewing: boolean;
  blocks: any[];
  isGlobalStylesOpen: boolean;
}

export interface BlockManipulationActions {
  handleAddBlock: (type: string) => string;
  handleUpdateBlock: (id: string, content: any) => void;
  handleDeleteBlock: (id: string) => void;
  handleReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
}
