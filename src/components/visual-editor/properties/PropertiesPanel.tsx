
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { EditableContent } from '@/types/editor';

interface PropertiesPanelProps {
  selectedBlockId: string | null;
  onClose: () => void;
  onUpdate: (content: Partial<EditableContent>) => void;
  onDelete: () => void;
}

export function PropertiesPanel({
  selectedBlockId,
  onClose,
  onUpdate,
  onDelete,
}: PropertiesPanelProps) {
  if (!selectedBlockId) {
    return (
      <div className="h-full bg-white p-4">
        <div className="text-center text-[#8F7A6A] mt-8">
          Selecione um bloco para editar suas propriedades
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-medium text-[#432818]">Propriedades</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            placeholder="Digite o título"
            onChange={(e) => onUpdate({ title: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtítulo</Label>
          <Input
            id="subtitle"
            placeholder="Digite o subtítulo"
            onChange={(e) => onUpdate({ subtitle: e.target.value })}
          />
        </div>

        <div className="pt-4 border-t">
          <Button
            variant="destructive"
            className="w-full"
            onClick={onDelete}
          >
            Excluir Bloco
          </Button>
        </div>
      </div>
    </div>
  );
}
