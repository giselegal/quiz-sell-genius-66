
import React from 'react';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EditorBlock } from '@/types/editor';
import { BlockRenderer } from './BlockRenderer';

interface EditorPreviewProps {
  blocks: EditorBlock[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  isPreviewing: boolean;
  onPreviewToggle: () => void;
}

export function EditorPreview({
  blocks,
  selectedBlockId,
  onSelectBlock,
  isPreviewing,
  onPreviewToggle
}: EditorPreviewProps) {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="h-full flex flex-col">
      {/* Preview Controls */}
      <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('desktop')}
            className={cn(viewMode === 'desktop' && 'bg-[#FAF9F7]')}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('mobile')}
            className={cn(viewMode === 'mobile' && 'bg-[#FAF9F7]')}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </Button>
        </div>

        <Button variant="outline" size="sm" onClick={onPreviewToggle}>
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewing ? 'Editar' : 'Visualizar'}
        </Button>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-4 bg-[#FAF9F7]">
        <div className={cn(
          "min-h-full bg-white rounded-lg shadow-sm p-6",
          viewMode === 'mobile' && 'max-w-md mx-auto'
        )}>
          {blocks.map((block) => (
            <BlockRenderer
              key={block.id}
              block={block}
              isSelected={block.id === selectedBlockId}
              onSelect={() => onSelectBlock(block.id)}
              isPreview={isPreviewing}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
