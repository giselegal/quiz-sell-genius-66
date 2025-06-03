import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Block } from '@/types/editor';
import { Minus } from 'lucide-react';

interface DividerPropertyEditorProps {
  block: Block;
  onUpdate: (blockId: string, content: any) => void;
}

export const DividerPropertyEditor: React.FC<DividerPropertyEditorProps> = ({ 
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
        <Minus className="h-4 w-4 text-[#B89B7A]" />
        <div>
          <div className="font-medium text-sm text-[#432818]">Divisor</div>
          <div className="text-xs text-[#8F7A6A]">Linha separadora decorativa</div>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#432818]">
            Estilo da Linha
          </Label>
          <Select
            value={content.style || 'solid'}
            onValueChange={(value) => handleUpdate('style', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solid">Sólida</SelectItem>
              <SelectItem value="dashed">Tracejada</SelectItem>
              <SelectItem value="dotted">Pontilhada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="thickness" className="text-sm font-medium text-[#432818]">
            Espessura (px)
          </Label>
          <Input
            id="thickness"
            type="number"
            min="1"
            max="10"
            value={content.thickness || 2}
            onChange={(e) => handleUpdate('thickness', e.target.value + 'px')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="color" className="text-sm font-medium text-[#432818]">
            Cor
          </Label>
          <div className="flex gap-2">
            <Input
              id="color"
              type="color"
              value={content.color || '#B89B7A'}
              onChange={(e) => handleUpdate('color', e.target.value)}
              className="w-16 h-10"
            />
            <Input
              value={content.color || '#B89B7A'}
              onChange={(e) => handleUpdate('color', e.target.value)}
              placeholder="#B89B7A"
              className="flex-1"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="p-3 bg-[#FAF9F7] rounded-lg">
          <div className="text-xs text-[#8F7A6A] mb-2">Preview:</div>
          <div className="flex justify-center">
            <div 
              className="w-32 border-t-2"
              style={{
                borderStyle: content.style || 'solid',
                borderColor: content.color || '#B89B7A',
                borderWidth: content.thickness || '2px'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
