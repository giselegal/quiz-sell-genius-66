
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { QuizComponentData } from '@/types/quizBuilder';

interface StylePropertiesProps {
  style: QuizComponentData['style'];
  onUpdate: (id: string, updates: Partial<QuizComponentData>) => void;
  componentId: string;
}

export const StyleProperties: React.FC<StylePropertiesProps> = ({
  style,
  onUpdate,
  componentId
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Cor de fundo</Label>
        <Input
          type="color"
          value={style?.backgroundColor || '#FFFAF0'}
          onChange={(e) => onUpdate(componentId, { 
            style: { ...style, backgroundColor: e.target.value } 
          })}
        />
      </div>

      <div>
        <Label>Cor do texto</Label>
        <Input
          type="color"
          value={style?.textColor || '#432818'}
          onChange={(e) => onUpdate(componentId, { 
            style: { ...style, textColor: e.target.value } 
          })}
        />
      </div>

      <div>
        <Label>Raio da borda (px)</Label>
        <Input
          type="number"
          value={style?.borderRadius || 0}
          onChange={(e) => onUpdate(componentId, { 
            style: { ...style, borderRadius: e.target.value } 
          })}
        />
      </div>

      <div>
        <Label>Padding horizontal (px)</Label>
        <Input
          type="number"
          value={style?.paddingX || 16}
          onChange={(e) => onUpdate(componentId, { 
            style: { ...style, paddingX: e.target.value } 
          })}
        />
      </div>

      <div>
        <Label>Padding vertical (px)</Label>
        <Input
          type="number"
          value={style?.paddingY || 16}
          onChange={(e) => onUpdate(componentId, { 
            style: { ...style, paddingY: e.target.value } 
          })}
        />
      </div>
    </div>
  );
};
