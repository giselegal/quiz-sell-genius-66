
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EditorTab } from '../UnifiedVisualEditor';
import {
  Eye,
  EyeOff,
  Save,
  Undo,
  Redo,
  LayoutTemplate,
  Monitor,
  Tablet,
  Smartphone
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EditorToolbarProps {
  activeTab?: EditorTab;
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  onSave: () => void;
  onOpenTemplateModal: () => void;
  viewportSize?: 'sm' | 'md' | 'lg' | 'xl';
  onViewportSizeChange?: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  activeTab,
  isPreviewing,
  onPreviewToggle,
  onSave,
  onOpenTemplateModal,
  viewportSize = 'lg',
  onViewportSizeChange
}) => {
  return (
    <div className="h-14 border-b bg-white flex items-center justify-between px-4">
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onPreviewToggle}
              >
                {isPreviewing ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    <span>Editar</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    <span>Visualizar</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isPreviewing ? 'Voltar ao modo de edição' : 'Visualizar a página final'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="h-6 border-r border-gray-200" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onSave}
              >
                <Save className="h-4 w-4 mr-2" />
                <span>Salvar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Salvar alterações
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onOpenTemplateModal}
              >
                <LayoutTemplate className="h-4 w-4 mr-2" />
                <span>Templates</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Escolher um template
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="h-6 border-r border-gray-200" />
        
        <TooltipProvider>
          <div className="flex items-center space-x-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={viewportSize === 'xl' ? 'secondary' : 'ghost'}
                  size="icon" 
                  className="w-8 h-8"
                  onClick={() => onViewportSizeChange?.('xl')}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Desktop
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={viewportSize === 'md' ? 'secondary' : 'ghost'}
                  size="icon" 
                  className="w-8 h-8"
                  onClick={() => onViewportSizeChange?.('md')}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Tablet
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={viewportSize === 'sm' ? 'secondary' : 'ghost'}
                  size="icon" 
                  className="w-8 h-8"
                  onClick={() => onViewportSizeChange?.('sm')}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Mobile
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      <div className="flex items-center space-x-2">
        {activeTab && (
          <div className="bg-gray-100 px-3 py-1 rounded-md text-sm text-gray-600 font-medium">
            Editor de {activeTab === 'quiz' ? 'Quiz' : activeTab === 'result' ? 'Resultado' : 'Página de Vendas'}
          </div>
        )}
      </div>
    </div>
  );
};
