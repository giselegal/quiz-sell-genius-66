import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Block } from '@/types/editor';
import { Zap, Settings, ExternalLink } from 'lucide-react';

interface CTAPropertyEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

export const CTAPropertyEditor: React.FC<CTAPropertyEditorProps> = ({ 
  block, 
  onUpdate 
}) => {
  const content = block.content;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#FAF9F7] rounded-lg">
        <Zap className="h-4 w-4 text-[#B89B7A]" />
        <div>
          <div className="font-medium text-sm text-[#432818]">Botão de Ação</div>
          <div className="text-xs text-[#8F7A6A]">Configure call-to-action</div>
        </div>
      </div>

      {/* Content Settings */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-[#432818]">
            Título (opcional)
          </Label>
          <Input
            id="title"
            value={content.title || ''}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Transforme seu estilo agora!"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-[#432818]">
            Descrição (opcional)
          </Label>
          <Textarea
            id="description"
            rows={2}
            value={content.description || ''}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Clique no botão abaixo para começar..."
            className="resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="buttonText" className="text-sm font-medium text-[#432818]">
            Texto do Botão *
          </Label>
          <Input
            id="buttonText"
            value={content.buttonText || ''}
            onChange={(e) => onUpdate({ buttonText: e.target.value })}
            placeholder="Quero Comprar Agora"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="buttonUrl" className="text-sm font-medium text-[#432818]">
            URL do Botão *
          </Label>
          <div className="relative">
            <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8F7A6A]" />
            <Input
              id="buttonUrl"
              type="url"
              value={content.buttonUrl || content.url || ''}
              onChange={(e) => onUpdate({ 
                buttonUrl: e.target.value, 
                url: e.target.value 
              })}
              placeholder="https://pay.hotmart.com/..."
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="buttonSize" className="text-sm font-medium text-[#432818]">
            Tamanho do Botão
          </Label>
          <Select
            value={content.buttonSize || 'large'}
            onValueChange={(value) => onUpdate({ buttonSize: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Pequeno</SelectItem>
              <SelectItem value="medium">Médio</SelectItem>
              <SelectItem value="large">Grande</SelectItem>
              <SelectItem value="xlarge">Extra Grande</SelectItem>
            </SelectContent>
          </Select>
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
              <SelectValue />
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
            <Label htmlFor="buttonColor" className="text-xs text-[#8F7A6A]">
              Cor do Botão
            </Label>
            <Input
              id="buttonColor"
              type="color"
              value={content.style?.buttonColor || '#B89B7A'}
              onChange={(e) => onUpdate({ 
                style: { ...content.style, buttonColor: e.target.value }
              })}
              className="h-8 w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="buttonTextColor" className="text-xs text-[#8F7A6A]">
              Cor do Texto
            </Label>
            <Input
              id="buttonTextColor"
              type="color"
              value={content.style?.buttonTextColor || '#ffffff'}
              onChange={(e) => onUpdate({ 
                style: { ...content.style, buttonTextColor: e.target.value }
              })}
              className="h-8 w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hoverColor" className="text-xs text-[#8F7A6A]">
            Cor no Hover
          </Label>
          <Input
            id="hoverColor"
            type="color"
            value={content.style?.hoverColor || '#8F7A6A'}
            onChange={(e) => onUpdate({ 
              style: { ...content.style, hoverColor: e.target.value }
            })}
            className="h-8 w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="borderRadius" className="text-xs text-[#8F7A6A]">
            Arredondamento das Bordas
          </Label>
          <Select
            value={content.style?.borderRadius || 'medium'}
            onValueChange={(value) => onUpdate({ 
              style: { ...content.style, borderRadius: value }
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
              <SelectItem value="full">Completo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shadow" className="text-xs text-[#8F7A6A]">
            Sombra
          </Label>
          <Select
            value={content.style?.shadow || 'medium'}
            onValueChange={(value) => onUpdate({ 
              style: { ...content.style, shadow: value }
            })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Nenhuma</SelectItem>
              <SelectItem value="small">Pequena</SelectItem>
              <SelectItem value="medium">Média</SelectItem>
              <SelectItem value="large">Grande</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Advanced Settings */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-[#432818]">
          Configurações Avançadas
        </Label>

        <div className="space-y-2">
          <Label htmlFor="newTab" className="text-xs text-[#8F7A6A]">
            Abrir em Nova Aba
          </Label>
          <Select
            value={content.newTab ? 'true' : 'false'}
            onValueChange={(value) => onUpdate({ newTab: value === 'true' })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="false">Mesma aba</SelectItem>
              <SelectItem value="true">Nova aba</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="trackingId" className="text-xs text-[#8F7A6A]">
            ID de Rastreamento (opcional)
          </Label>
          <Input
            id="trackingId"
            value={content.trackingId || ''}
            onChange={(e) => onUpdate({ trackingId: e.target.value })}
            placeholder="utm_source=quiz"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <Label className="text-xs text-[#8F7A6A]">Modelos de CTA</Label>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({
              title: 'Transforme seu Estilo Agora!',
              description: 'Clique no botão e descubra produtos perfeitos para você',
              buttonText: 'Quero Comprar Agora',
            })}
            className="text-xs w-full justify-start"
          >
            CTA de Compra
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({
              title: 'Não Perca Esta Oportunidade!',
              description: 'Oferta por tempo limitado',
              buttonText: 'Garantir Minha Vaga',
            })}
            className="text-xs w-full justify-start"
          >
            CTA de Urgência
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({
              buttonText: 'Saiba Mais',
              description: 'Descubra mais sobre esta oferta especial'
            })}
            className="text-xs w-full justify-start"
          >
            CTA Informativo
          </Button>
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <Label className="text-xs text-[#8F7A6A]">Preview</Label>
        <div className="p-4 border border-[#B89B7A]/20 rounded-lg bg-gradient-to-r from-[#FAF9F7] to-white text-center">
          {content.title && (
            <div className="text-lg font-semibold text-[#432818] mb-2">
              {content.title}
            </div>
          )}
          {content.description && (
            <div className="text-sm text-[#8F7A6A] mb-4">
              {content.description}
            </div>
          )}
          <Button 
            className="bg-[#B89B7A] hover:bg-[#8F7A6A] text-white px-8 py-2"
            style={{
              backgroundColor: content.style?.buttonColor || '#B89B7A',
              color: content.style?.buttonTextColor || '#ffffff'
            }}
          >
            {content.buttonText || 'Clique Aqui'}
          </Button>
        </div>
      </div>
    </div>
  );
};
