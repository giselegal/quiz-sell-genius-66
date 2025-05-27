
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { QuizComponentData } from '@/types/quizBuilder';

interface TextPropertiesProps {
  data: QuizComponentData['data'];
  onUpdate: (id: string, updates: Partial<QuizComponentData>) => void;
  componentId: string;
}

export const TextProperties: React.FC<TextPropertiesProps> = ({
  data,
  onUpdate,
  componentId
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Texto</Label>
        <Textarea
          value={data.text || ''}
          onChange={(e) => onUpdate(componentId, { 
            data: { ...data, text: e.target.value } 
          })}
          placeholder="Digite o texto"
          className="min-h-[100px]"
        />
      </div>

      <div>
        <Label>Título</Label>
        <Input
          value={data.title || ''}
          onChange={(e) => onUpdate(componentId, { 
            data: { ...data, title: e.target.value } 
          })}
          placeholder="Digite o título"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={data.isHeadline || false}
          onCheckedChange={(checked) => onUpdate(componentId, { 
            data: { ...data, isHeadline: checked } 
          })}
        />
        <Label>É um título principal</Label>
      </div>
    </div>
  );
};
