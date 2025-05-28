
import React from 'react';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, Tablet, Eye, Save, Undo, Redo } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditorToolbarProps {
  isPreviewing: boolean;
  viewportSize: 'sm' | 'md' | 'lg' | 'xl';
  onViewportSizeChange: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  onTogglePreview: () => void;
  onSave: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  isPreviewing,
  viewportSize,
  onViewportSizeChange,
  onTogglePreview,
  onSave
}) => {
  return (
    <div className="border-b bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border rounded-md p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewportSizeChange('sm')}
              className={cn(viewportSize === 'sm' && 'bg-accent')}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewportSizeChange('md')}
              className={cn(viewportSize === 'md' && 'bg-accent')}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewportSizeChange('lg')}
              className={cn(viewportSize === 'lg' && 'bg-accent')}
            >
              <Monitor className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <Undo className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Redo className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onTogglePreview}
          >
            <Eye className="w-4 h-4 mr-2" />
            {isPreviewing ? 'Editar' : 'Visualizar'}
          </Button>
          <Button onClick={onSave}>
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};
