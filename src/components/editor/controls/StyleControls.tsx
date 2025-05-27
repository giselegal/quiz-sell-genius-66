
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StyleControlsProps {
  style: Record<string, any>;
  onUpdate: (newStyle: Record<string, any>) => void;
}

export const StyleControls: React.FC<StyleControlsProps> = ({ style, onUpdate }) => {
  const updateStyle = (property: string, value: string) => {
    onUpdate({
      ...style,
      [property]: value
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="textColor">Cor do Texto</Label>
        <div className="flex gap-2 mt-1">
          <Input
            id="textColor"
            type="color"
            value={style.color || '#000000'}
            onChange={(e) => updateStyle('color', e.target.value)}
            className="w-12 h-10"
          />
          <Input
            value={style.color || '#000000'}
            onChange={(e) => updateStyle('color', e.target.value)}
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="backgroundColor">Cor de Fundo</Label>
        <div className="flex gap-2 mt-1">
          <Input
            id="backgroundColor"
            type="color"
            value={style.backgroundColor || '#ffffff'}
            onChange={(e) => updateStyle('backgroundColor', e.target.value)}
            className="w-12 h-10"
          />
          <Input
            value={style.backgroundColor || '#ffffff'}
            onChange={(e) => updateStyle('backgroundColor', e.target.value)}
            placeholder="#ffffff"
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="fontSize">Tamanho da Fonte</Label>
        <Select
          value={style.fontSize || 'medium'}
          onValueChange={(value) => updateStyle('fontSize', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Selecione o tamanho" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Pequeno</SelectItem>
            <SelectItem value="medium">Médio</SelectItem>
            <SelectItem value="large">Grande</SelectItem>
            <SelectItem value="xl">Extra Grande</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="textAlign">Alinhamento</Label>
        <Select
          value={style.textAlign || 'left'}
          onValueChange={(value) => updateStyle('textAlign', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Selecione o alinhamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Esquerda</SelectItem>
            <SelectItem value="center">Centro</SelectItem>
            <SelectItem value="right">Direita</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="padding">Espaçamento Interno</Label>
        <Input
          id="padding"
          value={style.padding || ''}
          onChange={(e) => updateStyle('padding', e.target.value)}
          placeholder="ex: 16px, 1rem"
          className="mt-1"
        />
      </div>
    </div>
  );
};
