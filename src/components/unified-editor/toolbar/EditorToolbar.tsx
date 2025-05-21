
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Save, BookTemplate, ChevronLeft, Monitor, Tablet, Smartphone } from 'lucide-react';
import { EditorTab } from '../UnifiedVisualEditor';

export interface EditorToolbarProps {
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  onSave: () => void;
  onOpenTemplateModal?: () => void;
  viewportSize?: 'sm' | 'md' | 'lg' | 'xl';
  onViewportSizeChange?: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  isSaving?: boolean;
  activeTab?: EditorTab;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  isPreviewing,
  onPreviewToggle,
  onSave,
  onOpenTemplateModal,
  viewportSize = 'lg',
  onViewportSizeChange,
  isSaving = false,
  activeTab,
}) => {
  return (
    <div className="border-b bg-white px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <a href="/admin/dashboard">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar
          </a>
        </Button>
        
        {activeTab && (
          <div className="text-sm font-medium ml-2 text-[#432818]">
            {activeTab === 'quiz' ? 'Editor de Quiz' : 
             activeTab === 'result' ? 'Editor de Resultados' : 
             'Editor de Página de Vendas'}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {onViewportSizeChange && (
          <div className="border rounded-md p-0.5 flex mr-2">
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 ${viewportSize === 'xl' ? 'bg-gray-100' : ''}`}
              onClick={() => onViewportSizeChange('xl')}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 ${viewportSize === 'md' ? 'bg-gray-100' : ''}`}
              onClick={() => onViewportSizeChange('md')}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 ${viewportSize === 'sm' ? 'bg-gray-100' : ''}`}
              onClick={() => onViewportSizeChange('sm')}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
        )}
        
        {onOpenTemplateModal && (
          <Button variant="outline" size="sm" onClick={onOpenTemplateModal}>
            <BookTemplate className="w-4 h-4 mr-1" />
            Modelos
          </Button>
        )}
        
        <Button variant="outline" size="sm" onClick={onPreviewToggle}>
          {isPreviewing ? (
            <>
              <EyeOff className="w-4 h-4 mr-1" />
              Editar
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-1" />
              Visualizar
            </>
          )}
        </Button>
        
        <Button onClick={onSave} size="sm" disabled={isSaving}>
          <Save className="w-4 h-4 mr-1" />
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </div>
  );
};
