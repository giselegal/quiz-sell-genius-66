
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Eye, 
  Save, 
  Undo, 
  Redo,
  Monitor,
  Tablet,
  Smartphone,
  Layers
} from 'lucide-react';

interface VisualEditorToolbarProps {
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  onSave: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  viewportMode?: 'desktop' | 'tablet' | 'mobile';
  onViewportChange?: (mode: 'desktop' | 'tablet' | 'mobile') => void;
}

export const VisualEditorToolbar: React.FC<VisualEditorToolbarProps> = ({
  isPreviewing,
  onPreviewToggle,
  onSave,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  viewportMode = 'desktop',
  onViewportChange
}) => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Editor Visual</h1>
          <p className="text-xs text-gray-500">Editor WYSIWYG Avançado</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {(onUndo || onRedo) && (
          <>
            <div className="flex items-center gap-1">
              {onUndo && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onUndo}
                  disabled={!canUndo}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Undo className="w-4 h-4" />
                </Button>
              )}
              {onRedo && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRedo}
                  disabled={!canRedo}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Redo className="w-4 h-4" />
                </Button>
              )}
            </div>
            <Separator orientation="vertical" className="h-6" />
          </>
        )}

        {onViewportChange && (
          <>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewportMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewportChange('desktop')}
                className="w-8 h-8 p-0"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewportMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewportChange('tablet')}
                className="w-8 h-8 p-0"
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewportMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewportChange('mobile')}
                className="w-8 h-8 p-0"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
            <Separator orientation="vertical" className="h-6" />
          </>
        )}

        <Button
          variant={isPreviewing ? 'default' : 'ghost'}
          size="sm"
          onClick={onPreviewToggle}
          className="flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          {isPreviewing ? 'Editando' : 'Visualizar'}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>
      </div>
    </div>
  );
};
