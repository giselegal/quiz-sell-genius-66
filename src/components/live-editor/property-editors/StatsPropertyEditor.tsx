import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Block } from '@/types/editor';
import { BarChart3, Plus, Trash2 } from 'lucide-react';

interface StatsPropertyEditorProps {
  block: Block;
  onUpdate: (blockId: string, content: any) => void;
}

export const StatsPropertyEditor: React.FC<StatsPropertyEditorProps> = ({ 
  block, 
  onUpdate 
}) => {
  const content = block.content || {};
  const stats = content.stats || [
    { number: '10K+', label: 'Clientes Satisfeitos' },
    { number: '95%', label: 'Taxa de Sucesso' },
    { number: '24/7', label: 'Suporte Disponível' }
  ];

  const handleUpdate = (field: string, value: any) => {
    onUpdate(block.id, {
      ...content,
      [field]: value
    });
  };

  const updateStat = (index: number, field: 'number' | 'label', value: string) => {
    const updatedStats = [...stats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    handleUpdate('stats', updatedStats);
  };

  const addStat = () => {
    const newStats = [...stats, { number: '', label: '' }];
    handleUpdate('stats', newStats);
  };

  const removeStat = (index: number) => {
    const newStats = stats.filter((_: any, i: number) => i !== index);
    handleUpdate('stats', newStats);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#FAF9F7] rounded-lg">
        <BarChart3 className="h-4 w-4 text-[#B89B7A]" />
        <div>
          <div className="font-medium text-sm text-[#432818]">Estatísticas</div>
          <div className="text-xs text-[#8F7A6A]">Números e métricas importantes</div>
        </div>
      </div>

      {/* Stats Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-[#432818]">
            Estatísticas
          </Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addStat}
            className="h-8"
          >
            <Plus className="h-3 w-3 mr-1" />
            Adicionar
          </Button>
        </div>

        {stats.map((stat: any, index: number) => (
          <div key={index} className="p-4 border border-[#B89B7A]/20 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#432818]">
                Estatística {index + 1}
              </span>
              {stats.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeStat(index)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-[#8F7A6A]">Número</Label>
                <Input
                  value={stat.number || ''}
                  onChange={(e) => updateStat(index, 'number', e.target.value)}
                  placeholder="Ex: 10K+, 95%, 24/7"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-[#8F7A6A]">Rótulo</Label>
                <Input
                  value={stat.label || ''}
                  onChange={(e) => updateStat(index, 'label', e.target.value)}
                  placeholder="Ex: Clientes Satisfeitos"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview */}
      <div className="p-3 bg-[#FAF9F7] rounded-lg">
        <div className="text-xs text-[#8F7A6A] mb-3">Preview:</div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {stats.slice(0, 3).map((stat: any, index: number) => (
            <div key={index} className="bg-white p-2 rounded text-xs">
              <div className="font-bold text-[#D4B996]">{stat.number || '—'}</div>
              <div className="text-[#8F7A6A] text-[10px]">{stat.label || '—'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
