import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Block } from '@/types/editor';
import { Move } from 'lucide-react';

interface SpacerPropertyEditorProps {
  block: Block;
  onUpdate: (blockId: string, content: any) => void;
}

export const SpacerPropertyEditor: React.FC<SpacerPropertyEditorProps> = ({ 
  block, 
  onUpdate 
}) => {
  const content = block.content || {};

  const handleUpdate = (field: string, value: any) => {
    onUpdate(block.id, {
      ...content,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#FAF9F7] rounded-lg">
        <Move className="h-4 w-4 text-[#B89B7A]" />
        <div>
          <div className="font-medium text-sm text-[#432818]">Espaçador</div>
          <div className="text-xs text-[#8F7A6A]">Espaço em branco ajustável</div>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="height" className="text-sm font-medium text-[#432818]">
            Altura (px)
          </Label>
          <Input
            id="height"
            type="number"
            min="10"
            max="200"
            value={parseInt(content.height) || 40}
            onChange={(e) => handleUpdate('height', e.target.value + 'px')}
          />
        </div>

        {/* Preview */}
        <div className="p-3 bg-[#FAF9F7] rounded-lg">
          <div className="text-xs text-[#8F7A6A] mb-2">Preview:</div>
          <div className="border border-dashed border-[#B89B7A]/40 rounded flex items-center justify-center text-[#8F7A6A] text-xs"
               style={{ height: content.height || '40px' }}>
            Espaço de {parseInt(content.height) || 40}px
          </div>
        </div>
      </div>
    </div>
  );
};
