
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
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Editor Visual</h1>
          <p className="text-xs text-gray-500">Quiz, Resultado e Oferta</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onUndo}
            disabled={!canUndo}
            className="text-gray-600 hover:text-gray-900"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRedo}
            disabled={!canRedo}
            className="text-gray-600 hover:text-gray-900"
          >
            <Redo className="w-4 h-4" />
          </Button>
        </div>
        
        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <Button
            variant={viewportSize === 'xl' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewportChange('xl')}
            className="w-8 h-8 p-0"
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={viewportSize === 'lg' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewportChange('lg')}
            className="w-8 h-8 p-0"
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant={viewportSize === 'sm' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewportChange('sm')}
            className="w-8 h-8 p-0"
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>
        
        <Separator orientation="vertical" className="h-6" />

        <Button
          variant={isPreviewMode ? 'default' : 'ghost'}
          size="sm"
          onClick={onTogglePreview}
          className="flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          {isPreviewMode ? 'Editando' : 'Visualizar'}
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
