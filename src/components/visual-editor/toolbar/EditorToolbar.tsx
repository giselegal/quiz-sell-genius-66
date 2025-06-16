
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Save, 
  Eye, 
  Undo, 
  Redo, 
  Monitor, 
  Tablet, 
  Smartphone 
} from 'lucide-react';
import type { VisualEditorState } from '@/types/visualEditor';

interface EditorToolbarProps {
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  onSave: () => void;
  config: VisualEditorState;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  viewportMode: "desktop" | "tablet" | "mobile";
  onViewportChange: (mode: "desktop" | "tablet" | "mobile") => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  isPreviewing,
  onPreviewToggle,
  onSave,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  viewportMode,
  onViewportChange
}) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onUndo}
            disabled={!canUndo}
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRedo}
            disabled={!canRedo}
          >
            <Redo className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewportMode === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewportChange('desktop')}
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={viewportMode === 'tablet' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewportChange('tablet')}
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant={viewportMode === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewportChange('mobile')}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviewToggle}
          >
            <Eye className="w-4 h-4 mr-1" />
            {isPreviewing ? 'Editar' : 'Preview'}
          </Button>
          <Button size="sm" onClick={onSave}>
            <Save className="w-4 h-4 mr-1" />
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};
