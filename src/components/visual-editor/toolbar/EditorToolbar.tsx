
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Eye, 
  Save, 
  Download, 
  Undo, 
  Redo,
  Monitor,
  Tablet,
  Smartphone,
  Share,
  Settings,
  Layers,
  EyeOff
} from 'lucide-react';
import { exportProjectAsJson } from '@/utils/exportUtils';

interface EditorToolbarProps {
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  onSave: () => void;
  config?: any;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  viewportMode?: 'desktop' | 'tablet' | 'mobile';
  onViewportChange?: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  onShare?: () => void;
  onSettings?: () => void;
}

export function EditorToolbar({
  isPreviewing,
  onPreviewToggle,
  onSave,
  config,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  viewportMode = 'desktop',
  onViewportChange,
  onShare,
  onSettings
}: EditorToolbarProps) {
  const handleExport = () => {
    if (config) {
      exportProjectAsJson(config);
    }
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
      {/* Logo e Título */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Quiz Editor</h1>
          <p className="text-xs text-gray-500">Editor Visual Avançado</p>
        </div>
      </div>

      {/* Controles Centrais */}
      <div className="flex items-center gap-2">
        {/* Undo/Redo */}
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

        {/* Viewport Controls */}
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

        {/* Preview Mode */}
        <Button
          variant={isPreviewing ? 'default' : 'ghost'}
          size="sm"
          onClick={onPreviewToggle}
          className="flex items-center gap-2"
        >
          {isPreviewing ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {isPreviewing ? 'Editar' : 'Visualizar'}
        </Button>
      </div>

      {/* Controles da Direita */}
      <div className="flex items-center gap-2">
        {/* Actions */}
        <div className="flex items-center gap-1">
          {onShare && (
            <Button variant="ghost" size="sm" onClick={onShare}>
              <Share className="w-4 h-4" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExport}
          >
            <Download className="w-4 h-4" />
          </Button>
          
          {onSettings && (
            <Button variant="ghost" size="sm" onClick={onSettings}>
              <Settings className="w-4 h-4" />
            </Button>
          )}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Save */}
        <Button onClick={onSave} className="bg-purple-600 hover:bg-purple-700">
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>
      </div>
    </div>
  );
};
