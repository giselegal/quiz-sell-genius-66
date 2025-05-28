
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EditorBlock } from '@/types/editor';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone } from 'lucide-react';
interface PreviewPanelProps {
  blocks: EditorBlock[];
  selectedBlockId: string | null;
  onSelect: (blockId: string) => void;
}
export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  blocks,
  selectedBlockId,
  onSelect,
}) => {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'mobile'>('desktop');
  const renderBlock = (block: EditorBlock) => {
    switch (block.type) {
      case 'headline':
        return (
          <div 
            key={block.id}
            className={cn(
              'py-4 cursor-pointer', 
              selectedBlockId === block.id && 'border-2 border-blue-400 rounded'
            )}
            onClick={() => onSelect(block.id)}
            style={block.content.style as React.CSSProperties}
          >
            <h2 className="text-2xl font-bold">{block.content.title || 'Título'}</h2>
            {block.content.subtitle && <p className="text-lg">{block.content.subtitle}</p>}
          </div>
        );
        
      case 'text':
            <p>{block.content.text || 'Texto de exemplo...'}</p>
      case 'image':
            {block.content.imageUrl ? (
              <img 
                src={block.content.imageUrl} 
                alt={block.content.imageAlt || 'Imagem'} 
                className="max-w-full"
                style={block.content.style as React.CSSProperties}
              />
            ) : (
              <div className="bg-gray-200 text-gray-500 p-8 text-center">
                Imagem será exibida aqui
              </div>
      default:
              'py-4 border border-gray-200 rounded cursor-pointer', 
              selectedBlockId === block.id && 'border-2 border-blue-400'
            <p className="text-gray-500 text-center">
              Componente do tipo: {block.type}
            </p>
    }
  };
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-medium">Preview</h2>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant={viewMode === 'desktop' ? 'default' : 'outline'}
            onClick={() => setViewMode('desktop')}
            <Monitor className="w-4 h-4 mr-2" />
            Desktop
          </Button>
            variant={viewMode === 'mobile' ? 'default' : 'outline'}
            onClick={() => setViewMode('mobile')}
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
        </div>
      </div>
      <ScrollArea className="flex-1 p-4 bg-gray-50">
        <div 
          className={cn(
            "min-h-[80vh] bg-white shadow-sm rounded-lg p-6",
            viewMode === 'mobile' ? 'max-w-md mx-auto' : 'max-w-4xl mx-auto'
          )}
        >
          {blocks.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500 mb-4">
                Adicione componentes usando o painel lateral
              </p>
              <Button variant="outline">
                Adicionar Primeiro Componente
              </Button>
            </div>
          ) : (
            <div>
              {blocks.sort((a, b) => a.order - b.order).map(renderBlock)}
      </ScrollArea>
    </div>
  );
};
