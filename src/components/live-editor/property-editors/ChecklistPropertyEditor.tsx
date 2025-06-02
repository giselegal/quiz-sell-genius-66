import React from 'react';
import type { Block } from '@/types/editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ChecklistPropertyEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

export const ChecklistPropertyEditor: React.FC<ChecklistPropertyEditorProps> = ({
  block,
  onUpdate
}) => {
  const content = block.content || {
    title: 'Lista de Verificação',
    subtitle: 'Confira tudo o que você precisa saber',
    items: [
      { text: 'Primeiro item da checklist', completed: true },
      { text: 'Segundo item da checklist', completed: true },
      { text: 'Terceiro item da checklist', completed: false }
    ],
    style: 'checkmarks',
    iconColor: '#10b981'
  };

  const updateContent = (field: string, value: any) => {
    onUpdate({
      ...content,
      [field]: value
    });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...content.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    updateContent('items', newItems);
  };

  const addItem = () => {
    const newItems = [...content.items, { text: 'Novo item', completed: true }];
    updateContent('items', newItems);
  };

  const removeItem = (index: number) => {
    const newItems = content.items.filter((_: any, i: number) => i !== index);
    updateContent('items', newItems);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="checklist-title">Título</Label>
        <Input
          id="checklist-title"
          value={content.title}
          onChange={(e) => updateContent('title', e.target.value)}
          placeholder="Título da checklist"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="checklist-subtitle">Subtítulo</Label>
        <Textarea
          id="checklist-subtitle"
          value={content.subtitle}
          onChange={(e) => updateContent('subtitle', e.target.value)}
          placeholder="Subtítulo da checklist"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="checklist-style">Estilo dos Ícones</Label>
        <Select
          value={content.style}
          onValueChange={(value) => updateContent('style', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Escolha o estilo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="checkmarks">Checkmarks</SelectItem>
            <SelectItem value="bullets">Bullets</SelectItem>
            <SelectItem value="numbers">Números</SelectItem>
            <SelectItem value="arrows">Setas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="checklist-color">Cor dos Ícones</Label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            id="checklist-color"
            value={content.iconColor}
            onChange={(e) => updateContent('iconColor', e.target.value)}
            className="w-10 h-8 rounded border"
          />
          <Input
            value={content.iconColor}
            onChange={(e) => updateContent('iconColor', e.target.value)}
            placeholder="#10b981"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Itens da Checklist</Label>
          <button
            onClick={addItem}
            className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Adicionar Item
          </button>
        </div>
        
        {content.items.map((item: any, index: number) => (
          <Card key={index} className="p-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Item {index + 1}</span>
              <button
                onClick={() => removeItem(index)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remover
              </button>
            </div>
            <Textarea
              value={item.text}
              onChange={(e) => updateItem(index, 'text', e.target.value)}
              placeholder="Texto do item"
              rows={2}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={(e) => updateItem(index, 'completed', e.target.checked)}
                className="w-4 h-4"
              />
              <Label className="text-sm">Item completado/destacado</Label>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
