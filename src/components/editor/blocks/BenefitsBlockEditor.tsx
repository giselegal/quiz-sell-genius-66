
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { BlockEditorProps } from './types';

export const BenefitsBlockEditor: React.FC<BlockEditorProps> = ({
  block,
  onUpdate
}) => {
  const benefits = block.content.items || [''];

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    onUpdate({ items: newBenefits });
  };

  const addBenefit = () => {
    onUpdate({ items: [...benefits, ''] });
  };

  const removeBenefit = (index: number) => {
    const newBenefits = benefits.filter((_, i) => i !== index);
    onUpdate({ items: newBenefits });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`${block.id}-title`}>Título dos Benefícios</Label>
        <Input
          id={`${block.id}-title`}
          value={block.content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="mt-1"
          placeholder="Benefícios"
        />
      </div>
      
      <div>
        <Label>Lista de Benefícios</Label>
        <div className="space-y-2 mt-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={benefit}
                onChange={(e) => updateBenefit(index, e.target.value)}
                placeholder={`Benefício ${index + 1}`}
                className="flex-1"
              />
              {benefits.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeBenefit(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addBenefit}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Benefício
          </Button>
        </div>
      </div>
    </div>
  );
};
