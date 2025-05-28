
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Block } from '@/types/editor';
interface HeadlineBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}
const HeadlineBlockEditor: React.FC<HeadlineBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Textarea
          id="title"
          rows={2}
          value={content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Digite o título aqui"
        />
      </div>
      
        <Label htmlFor="subtitle">Subtítulo</Label>
          id="subtitle"
          value={content.subtitle || ''}
          onChange={(e) => onUpdate({ subtitle: e.target.value })}
          placeholder="Digite o subtítulo aqui"
        <Label htmlFor="textColor">Cor do texto</Label>
        <Input
          id="textColor"
          type="color"
          value={content.textColor || '#432818'}
          onChange={(e) => onUpdate({ textColor: e.target.value })}
        <Label htmlFor="alignment">Alinhamento</Label>
        <div className="flex gap-2">
          <button
            type="button"
            className={`p-2 border rounded-md ${
              (content.alignment || 'center') === 'left' ? 'bg-[#B89B7A]/20' : ''
            }`}
            onClick={() => onUpdate({ alignment: 'left' })}
          >
            Esquerda
          </button>
              (content.alignment || 'center') === 'center' ? 'bg-[#B89B7A]/20' : ''
            onClick={() => onUpdate({ alignment: 'center' })}
            Centro
              (content.alignment || 'center') === 'right' ? 'bg-[#B89B7A]/20' : ''
            onClick={() => onUpdate({ alignment: 'right' })}
            Direita
        </div>
    </div>
  );
};
export default HeadlineBlockEditor;
