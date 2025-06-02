import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Block } from '@/types/editor';
import { Clock } from 'lucide-react';

interface CountdownPropertyEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

export const CountdownPropertyEditor: React.FC<CountdownPropertyEditorProps> = ({ 
  block, 
  onUpdate 
}) => {
  const content = block.content || {};

  const handleUpdate = (field: string, value: any) => {
    onUpdate({
      ...content,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#FAF9F7] rounded-lg">
        <Clock className="h-4 w-4 text-[#B89B7A]" />
        <div>
          <div className="font-medium text-sm text-[#432818]">Contador Regressivo</div>
          <div className="text-xs text-[#8F7A6A]">Configure o timer de urgência</div>
        </div>
      </div>

      {/* Content Settings */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-[#432818]">
            Título
          </Label>
          <Input
            id="title"
            value={content.title || ''}
            onChange={(e) => handleUpdate('title', e.target.value)}
            placeholder="Oferta por tempo limitado!"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-[#432818]">
            Descrição
          </Label>
          <Textarea
            id="description"
            rows={2}
            value={content.description || ''}
            onChange={(e) => handleUpdate('description', e.target.value)}
            placeholder="Aproveite antes que acabe!"
            className="resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="days" className="text-sm font-medium text-[#432818]">
              Dias
            </Label>
            <Input
              id="days"
              type="number"
              min="0"
              value={content.days || 0}
              onChange={(e) => handleUpdate('days', parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours" className="text-sm font-medium text-[#432818]">
              Horas
            </Label>
            <Input
              id="hours"
              type="number"
              min="0"
              max="23"
              value={content.hours || 0}
              onChange={(e) => handleUpdate('hours', parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="minutes" className="text-sm font-medium text-[#432818]">
              Minutos
            </Label>
            <Input
              id="minutes"
              type="number"
              min="0"
              max="59"
              value={content.minutes || 0}
              onChange={(e) => handleUpdate('minutes', parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seconds" className="text-sm font-medium text-[#432818]">
              Segundos
            </Label>
            <Input
              id="seconds"
              type="number"
              min="0"
              max="59"
              value={content.seconds || 0}
              onChange={(e) => handleUpdate('seconds', parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="p-3 bg-[#FAF9F7] rounded-lg">
          <div className="text-xs text-[#8F7A6A] mb-2">Preview do contador:</div>
          <div className="flex justify-center gap-2 text-sm">
            <div className="bg-white px-2 py-1 rounded">
              <div className="font-bold">{content.days || 0}</div>
              <div className="text-xs">dias</div>
            </div>
            <div className="bg-white px-2 py-1 rounded">
              <div className="font-bold">{content.hours || 0}</div>
              <div className="text-xs">horas</div>
            </div>
            <div className="bg-white px-2 py-1 rounded">
              <div className="font-bold">{content.minutes || 0}</div>
              <div className="text-xs">min</div>
            </div>
            <div className="bg-white px-2 py-1 rounded">
              <div className="font-bold">{content.seconds || 0}</div>
              <div className="text-xs">seg</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
