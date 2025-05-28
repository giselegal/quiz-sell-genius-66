
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PreviewPanelProps {
  primaryStyle: StyleResult;
  onSelectComponent: (id: string | null) => void;
  selectedComponentId: string | null;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  primaryStyle,
  onSelectComponent,
  selectedComponentId
}) => {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'mobile'>('desktop');
  const [isPreviewing, setIsPreviewing] = React.useState(false);

  return (
    <div className="h-full flex flex-col bg-[#FAF9F7]">
      {/* Preview Toolbar */}
      <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('desktop')}
            className={viewMode === 'desktop' ? 'bg-[#FAF9F7]' : ''}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('mobile')}
            className={viewMode === 'mobile' ? 'bg-[#FAF9F7]' : ''}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPreviewing(!isPreviewing)}
        >
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewing ? 'Editar' : 'Visualizar'}
        </Button>
      </div>

      {/* Preview Content */}
      <div className={cn(
        "flex-1 overflow-auto p-8",
        viewMode === 'mobile' && 'max-w-md mx-auto'
      )}>
        <div className="min-h-full bg-white rounded-lg shadow-sm border border-[#B89B7A]/20 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-playfair text-[#432818] mb-4">
              Preview da Página de Resultados
            </h2>
            <p className="text-[#8F7A6A]">
              Estilo principal: {primaryStyle.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
