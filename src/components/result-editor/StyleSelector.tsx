
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface StyleSelectorProps {
  availableStyles: string[];
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({
  availableStyles,
  selectedStyle,
  onStyleChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="style-selector">Estilo</Label>
      <Select value={selectedStyle} onValueChange={onStyleChange}>
        <SelectTrigger id="style-selector">
          <SelectValue placeholder="Selecione um estilo" />
        </SelectTrigger>
        <SelectContent>
          {availableStyles.map((style) => (
            <SelectItem key={style} value={style}>
              {style}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StyleSelector;
