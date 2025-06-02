import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Block } from '@/types/editor';
import { Type, Settings } from 'lucide-react';

interface HeadlinePropertyEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

export const HeadlinePropertyEditor: React.FC<HeadlinePropertyEditorProps> = ({ 
  block, 
  onUpdate 
}) => {
  const content = block.content;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#FAF9F7] rounded-lg">
        <Type className="h-4 w-4 text-[#B89B7A]" />
        <div>
          <div className="font-medium text-sm text-[#432818]">Título & Subtítulo</div>
          <div className="text-xs text-[#8F7A6A]">Configure seu texto principal</div>
        </div>
      </div>

      {/* Content Settings */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-[#432818]">
            Título Principal
          </Label>
          <Textarea
            id="title"
            rows={2}
            value={content.title || ''}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Digite o título aqui..."
            className="resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle" className="text-sm font-medium text-[#432818]">
            Subtítulo
          </Label>
          <Textarea
            id="subtitle"
            rows={2}
            value={content.subtitle || ''}
            onChange={(e) => onUpdate({ subtitle: e.target.value })}
            placeholder="Digite o subtítulo aqui..."
            className="resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="alignment" className="text-sm font-medium text-[#432818]">
            Alinhamento
          </Label>
          <Select
            value={content.alignment || 'center'}
            onValueChange={(value) => onUpdate({ alignment: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o alinhamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Esquerda</SelectItem>
              <SelectItem value="center">Centro</SelectItem>
              <SelectItem value="right">Direita</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Style Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-[#B89B7A]" />
          <Label className="text-sm font-medium text-[#432818]">Estilos</Label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="titleColor" className="text-xs text-[#8F7A6A]">
              Cor do Título
            </Label>
            <Input
              id="titleColor"
              type="color"
              value={content.style?.titleColor || '#432818'}
              onChange={(e) => onUpdate({ 
                style: { ...content.style, titleColor: e.target.value }
              })}
              className="h-8 w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitleColor" className="text-xs text-[#8F7A6A]">
              Cor do Subtítulo
            </Label>
            <Input
              id="subtitleColor"
              type="color"
              value={content.style?.subtitleColor || '#8F7A6A'}
              onChange={(e) => onUpdate({ 
                style: { ...content.style, subtitleColor: e.target.value }
              })}
              className="h-8 w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="backgroundColor" className="text-xs text-[#8F7A6A]">
            Cor de Fundo
          </Label>
          <Input
            id="backgroundColor"
            type="color"
            value={content.style?.backgroundColor || '#ffffff'}
            onChange={(e) => onUpdate({ 
              style: { ...content.style, backgroundColor: e.target.value }
            })}
            className="h-8 w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="padding" className="text-xs text-[#8F7A6A]">
            Espaçamento Interno
          </Label>
          <Select
            value={content.style?.padding || 'medium'}
            onValueChange={(value) => onUpdate({ 
              style: { ...content.style, padding: value }
            })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Pequeno</SelectItem>
              <SelectItem value="medium">Médio</SelectItem>
              <SelectItem value="large">Grande</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <Label className="text-xs text-[#8F7A6A]">Ações Rápidas</Label>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({
              title: 'Seu Resultado Está Pronto!',
              subtitle: 'Descubra produtos perfeitos para o seu estilo único'
            })}
            className="text-xs"
          >
            Exemplo 1
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({
              title: 'Parabéns pelo seu Estilo!',
              subtitle: 'Aqui estão algumas recomendações especiais para você'
            })}
            className="text-xs"
          >
            Exemplo 2
          </Button>
        </div>
      </div>
    </div>
  );
};
