
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Save, 
  Download, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Maximize2
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface EditorToolbarProps {
  isPreviewing: boolean;
  viewportSize: 'sm' | 'md' | 'lg' | 'xl';
  onViewportSizeChange: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  onTogglePreview: () => void;
  onSave: () => void;
}

export function EditorToolbar({
  isPreviewing,
  viewportSize,
  onViewportSizeChange,
  onTogglePreview,
  onSave
}: EditorToolbarProps) {
  return (
    <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold text-[#432818] mr-4">Editor Visual</h1>
        
        <TooltipProvider>
          <div className="flex items-center bg-[#FAF9F7] rounded-md p-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewportSizeChange('sm')}
                  className={cn(
                    "w-8 h-8 rounded-md",
                    viewportSize === 'sm' && "bg-white shadow-sm"
                  )}
                >
                  <Smartphone className="w-4 h-4 text-[#8F7A6A]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mobile (sm)</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewportSizeChange('md')}
                  className={cn(
                    "w-8 h-8 rounded-md",
                    viewportSize === 'md' && "bg-white shadow-sm"
                  )}
                >
                  <Tablet className="w-4 h-4 text-[#8F7A6A]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Tablet (md)</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewportSizeChange('lg')}
                  className={cn(
                    "w-8 h-8 rounded-md",
                    viewportSize === 'lg' && "bg-white shadow-sm"
                  )}
                >
                  <Monitor className="w-4 h-4 text-[#8F7A6A]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Desktop (lg)</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewportSizeChange('xl')}
                  className={cn(
                    "w-8 h-8 rounded-md",
                    viewportSize === 'xl' && "bg-white shadow-sm"
                  )}
                >
                  <Maximize2 className="w-4 h-4 text-[#8F7A6A]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Large Desktop (xl)</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onTogglePreview}
          className="border-[#B89B7A] text-[#432818]"
        >
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewing ? "Editar" : "Visualizar"}
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={onSave}
          className="bg-[#B89B7A] hover:bg-[#8F7A6A] text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>
      </div>
    </div>
  );
}
