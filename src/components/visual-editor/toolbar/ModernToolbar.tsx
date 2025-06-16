
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Undo2, 
  Redo2, 
  Eye, 
  EyeOff, 
  Save, 
  Monitor, 
  Tablet, 
  Smartphone 
} from 'lucide-react';

interface ModernToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  isPreviewMode: boolean;
  viewportSize: 'sm' | 'md' | 'lg' | 'xl';
  onUndo: () => void;
  onRedo: () => void;
  onTogglePreview: () => void;
  onViewportChange: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  onSave: () => void;
}

export const ModernToolbar: React.FC<ModernToolbarProps> = ({
  canUndo,
  canRedo,
  isPreviewMode,
  viewportSize,
  onUndo,
  onRedo,
  onTogglePreview,
  onViewportChange,
  onSave
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onUndo}
            disabled={!canUndo}
          >
            <Undo2 className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onRedo}
            disabled={!canRedo}
          >
            <Redo2 className="w-4 h-4" />
          </Button>
          
          <Separator orientation="vertical" className="h-6" />
          
          <Button
            variant={isPreviewMode ? "default" : "outline"}
            size="sm"
            onClick={onTogglePreview}
          >
            {isPreviewMode ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
            {isPreviewMode ? 'Editar' : 'Preview'}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-100 rounded-md p-1">
            <Button
              variant={viewportSize === 'sm' ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewportChange('sm')}
              className="h-8 w-8 p-0"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
            
            <Button
              variant={viewportSize === 'md' ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewportChange('md')}
              className="h-8 w-8 p-0"
            >
              <Tablet className="w-4 h-4" />
            </Button>
            
            <Button
              variant={viewportSize === 'lg' || viewportSize === 'xl' ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewportChange('lg')}
              className="h-8 w-8 p-0"
            >
              <Monitor className="w-4 h-4" />
            </Button>
          </div>
          
          <Separator orientation="vertical" className="h-6" />
          
          <Button onClick={onSave} size="sm">
            <Save className="w-4 h-4 mr-1" />
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};
