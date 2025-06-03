import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Block } from '@/types/editor';
import { Type, Settings, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface TextPropertyEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

export const TextPropertyEditor: React.FC<TextPropertyEditorProps> = ({ 
  block, 
  onUpdate 
}) => {
  const content = block.content;

  const alignmentIcons = {
    left: <AlignLeft className="h-4 w-4" />,
    center: <AlignCenter className="h-4 w-4" />,
    right: <AlignRight className="h-4 w-4" />
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#FAF9F7] rounded-lg">
        <Type className="h-4 w-4 text-[#B89B7A]" />
        <div>
          <div className="font-medium text-sm text-[#432818]">Bloco de Texto</div>
          <div className="text-xs text-[#8F7A6A]">Configure seu conteúdo textual</div>
        </div>
      </div>

      {/* Content Settings */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text" className="text-sm font-medium text-[#432818]">
            Conteúdo do Texto
          </Label>
          <Textarea
            id="text"
            rows={6}
            value={content.text || ''}
            onChange={(e) => onUpdate({ text: e.target.value })}
            placeholder="Digite seu texto aqui..."
            className="resize-none"
          />
          <div className="text-xs text-[#8F7A6A]">
            {content.text?.length || 0} caracteres
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#432818]">
            Alinhamento
          </Label>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {(['left', 'center', 'right'] as const).map((align) => (
              <Button
                key={align}
                variant={content.alignment === align ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onUpdate({ alignment: align })}
                className="h-8 px-3"
              >
                {alignmentIcons[align]}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      {/* Style Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-[#B89B7A]" />
          <Label className="text-sm font-medium text-[#432818]">Estilos</Label>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="fontSize" className="text-xs text-[#8F7A6A]">
              Tamanho da Fonte
            </Label>
            <Select
              value={content.style?.fontSize || 'medium'}
              onValueChange={(value) => onUpdate({ 
                style: { ...content.style, fontSize: value }
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Pequeno (14px)</SelectItem>
                <SelectItem value="medium">Médio (16px)</SelectItem>
                <SelectItem value="large">Grande (18px)</SelectItem>
                <SelectItem value="xlarge">Extra Grande (20px)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="textColor" className="text-xs text-[#8F7A6A]">
                Cor do Texto
              </Label>
              <Input
                id="textColor"
                type="color"
                value={content.style?.textColor || '#432818'}
                onChange={(e) => onUpdate({ 
                  style: { ...content.style, textColor: e.target.value }
                })}
                className="h-8 w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="backgroundColor" className="text-xs text-[#8F7A6A]">
                Cor de Fundo
              </Label>
              <Input
                id="backgroundColor"
                type="color"
                value={content.style?.backgroundColor || '#F9F5F1'}
                onChange={(e) => onUpdate({ 
                  style: { ...content.style, backgroundColor: e.target.value }
                })}
                className="h-8 w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lineHeight" className="text-xs text-[#8F7A6A]">
              Altura da Linha
            </Label>
            <Select
              value={content.style?.lineHeight || 'normal'}
              onValueChange={(value) => onUpdate({ 
                style: { ...content.style, lineHeight: value }
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tight">Compacta (1.2)</SelectItem>
                <SelectItem value="normal">Normal (1.5)</SelectItem>
                <SelectItem value="relaxed">Relaxada (1.7)</SelectItem>
              </SelectContent>
            </Select>
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
                <SelectItem value="none">Nenhum</SelectItem>
                <SelectItem value="small">Pequeno</SelectItem>
                <SelectItem value="medium">Médio</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <Label className="text-xs text-[#8F7A6A]">Modelos de Texto</Label>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({
              text: 'Baseado nas suas respostas, identificamos que você tem um estilo único e sofisticado. Aqui estão algumas recomendações especiais para você.'
            })}
            className="text-xs w-full justify-start"
          >
            Texto de Introdução
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({
              text: 'Estes produtos foram cuidadosamente selecionados para complementar seu estilo pessoal e realçar sua personalidade única.'
            })}
            className="text-xs w-full justify-start"
          >
            Texto de Produtos
          </Button>
        </div>
      </div>
    </div>
  );
};
