
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { BlockEditorProps } from './types';

export const BonusCarouselBlockEditor: React.FC<BlockEditorProps> = ({
  block,
  onUpdate
}) => {
  const bonusImages = block.content.bonusImages || [{ url: '', alt: '', title: '' }];

  const updateBonusImage = (index: number, field: string, value: string) => {
    const newImages = [...bonusImages];
    newImages[index] = { ...newImages[index], [field]: value };
    onUpdate({ bonusImages: newImages });
  };

  const addBonusImage = () => {
    onUpdate({ 
      bonusImages: [...bonusImages, { url: '', alt: '', title: '' }] 
    });
  };

  const removeBonusImage = (index: number) => {
    const newImages = bonusImages.filter((_, i) => i !== index);
    onUpdate({ bonusImages: newImages });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`${block.id}-title`}>Título do Carrossel</Label>
        <Input
          id={`${block.id}-title`}
          value={block.content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="mt-1"
          placeholder="Título do carrossel de bônus"
        />
      </div>
      
      <div>
        <Label>Imagens de Bônus</Label>
        <div className="space-y-4 mt-2">
          {bonusImages.map((image, index) => (
            <div key={index} className="border p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Bônus {index + 1}</h4>
                {bonusImages.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeBonusImage(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <Input
                value={image.url}
                onChange={(e) => updateBonusImage(index, 'url', e.target.value)}
                placeholder="URL da imagem"
              />
              
              <Input
                value={image.title}
                onChange={(e) => updateBonusImage(index, 'title', e.target.value)}
                placeholder="Título do bônus"
              />
              
              <Input
                value={image.alt}
                onChange={(e) => updateBonusImage(index, 'alt', e.target.value)}
                placeholder="Texto alternativo"
              />
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addBonusImage}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Bônus
          </Button>
        </div>
      </div>
    </div>
  );
};
