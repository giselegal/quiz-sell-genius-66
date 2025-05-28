
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Block } from '@/types/editor';

interface AnimationBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const AnimationBlockEditor: React.FC<AnimationBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="animationType">Tipo de Animação</Label>
        <Select
          value={content.animationType || 'fadeIn'}
          onValueChange={(value) => onUpdate({ animationType: value })}
        >
          <SelectTrigger id="animationType">
            <SelectValue placeholder="Selecione uma animação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fadeIn">Fade In</SelectItem>
            <SelectItem value="slideUp">Slide Up</SelectItem>
            <SelectItem value="slideDown">Slide Down</SelectItem>
            <SelectItem value="bounceIn">Bounce In</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="duration">Duração (ms)</Label>
        <Input
          id="duration"
          type="number"
          value={content.duration || 500}
          onChange={(e) => onUpdate({ duration: parseInt(e.target.value) })}
          placeholder="500"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="delay">Atraso (ms)</Label>
        <Input
          id="delay"
          type="number"
          value={content.delay || 0}
          onChange={(e) => onUpdate({ delay: parseInt(e.target.value) })}
          placeholder="0"
        />
      </div>
    </div>
  );
};

export default AnimationBlockEditor;
