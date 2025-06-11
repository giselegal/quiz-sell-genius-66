
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Save, 
  Eye, 
  EyeOff, 
  Undo, 
  Redo, 
  Monitor, 
  Tablet, 
  Smartphone 
} from 'lucide-react';

interface VisualEditorToolbarProps {
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  onSave: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  viewportMode: 'desktop' | 'tablet' | 'mobile';
  onViewportChange: (mode: 'desktop' | 'tablet' | 'mobile') => void;
}

export const VisualEditorToolbar: React.FC<VisualEditorToolbarProps> = ({
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
    <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold text-gray-900">
          Editor Visual - Página de Resultado
        </h1>
      </div>

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

        <div className="h-6 w-px bg-gray-300 mx-2" />

        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewportChange('desktop')}
          className={viewportMode === 'desktop' ? 'bg-gray-100' : ''}
        >
          <Monitor className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewportChange('tablet')}
          className={viewportMode === 'tablet' ? 'bg-gray-100' : ''}
        >
          <Tablet className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewportChange('mobile')}
          className={viewportMode === 'mobile' ? 'bg-gray-100' : ''}
        >
          <Smartphone className="w-4 h-4" />
        </Button>

        <div className="h-6 w-px bg-gray-300 mx-2" />

        <Button
          variant="outline"
          size="sm"
          onClick={onPreviewToggle}
        >
          {isPreviewing ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          {isPreviewing ? 'Editar' : 'Visualizar'}
        </Button>

        <Button
          size="sm"
          onClick={onSave}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>
      </div>
    </div>
  );
};
