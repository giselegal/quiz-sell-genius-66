import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Block } from '@/types/editor';
import { Quote, User } from 'lucide-react';

interface TestimonialPropertyEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

export const TestimonialPropertyEditor: React.FC<TestimonialPropertyEditorProps> = ({ 
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
        <Quote className="h-4 w-4 text-[#B89B7A]" />
        <div>
          <div className="font-medium text-sm text-[#432818]">Depoimento</div>
          <div className="text-xs text-[#8F7A6A]">Configure o depoimento do cliente</div>
        </div>
      </div>

      {/* Content Settings */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text" className="text-sm font-medium text-[#432818]">
            Texto do Depoimento
          </Label>
          <Textarea
            id="text"
            rows={4}
            value={content.text || ''}
            onChange={(e) => handleUpdate('text', e.target.value)}
            placeholder="Digite o depoimento aqui..."
            className="resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-[#432818]">
              Nome do Cliente
            </Label>
            <Input
              id="name"
              value={content.name || ''}
              onChange={(e) => handleUpdate('name', e.target.value)}
              placeholder="Ex: Maria Silva"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-[#432818]">
              Cargo/Título
            </Label>
            <Input
              id="title"
              value={content.title || ''}
              onChange={(e) => handleUpdate('title', e.target.value)}
              placeholder="Ex: Cliente Satisfeita"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="avatar" className="text-sm font-medium text-[#432818]">
            URL da Foto (Opcional)
          </Label>
          <Input
            id="avatar"
            type="url"
            value={content.avatar || ''}
            onChange={(e) => handleUpdate('avatar', e.target.value)}
            placeholder="https://exemplo.com/foto.jpg"
          />
        </div>

        {content.avatar && (
          <div className="p-3 bg-[#FAF9F7] rounded-lg">
            <div className="text-xs text-[#8F7A6A] mb-2">Preview da foto:</div>
            <img 
              src={content.avatar} 
              alt="Preview" 
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
