import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Block } from '@/types/editor';
import { Image as ImageIcon, Settings, Upload } from 'lucide-react';

interface ImagePropertyEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

export const ImagePropertyEditor: React.FC<ImagePropertyEditorProps> = ({ 
  block, 
  onUpdate 
}) => {
  const content = block.content;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#FAF9F7] rounded-lg">
        <ImageIcon className="h-4 w-4 text-[#B89B7A]" />
        <div>
          <div className="font-medium text-sm text-[#432818]">Imagem</div>
          <div className="text-xs text-[#8F7A6A]">Configure sua imagem</div>
        </div>
      </div>

      {/* Image Settings */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="imageUrl" className="text-sm font-medium text-[#432818]">
            URL da Imagem
          </Label>
          <Input
            id="imageUrl"
            type="url"
            value={content.imageUrl || ''}
            onChange={(e) => onUpdate({ imageUrl: e.target.value })}
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageAlt" className="text-sm font-medium text-[#432818]">
            Texto Alternativo
          </Label>
          <Input
            id="imageAlt"
            value={content.imageAlt || ''}
            onChange={(e) => onUpdate({ imageAlt: e.target.value })}
            placeholder="Descrição da imagem para acessibilidade"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="caption" className="text-sm font-medium text-[#432818]">
            Legenda (opcional)
          </Label>
          <Textarea
            id="caption"
            rows={2}
            value={content.caption || ''}
            onChange={(e) => onUpdate({ caption: e.target.value })}
            placeholder="Legenda da imagem..."
            className="resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="size" className="text-sm font-medium text-[#432818]">
            Tamanho da Imagem
          </Label>
          <Select
            value={content.size || 'medium'}
            onValueChange={(value) => onUpdate({ size: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Pequeno (300px)</SelectItem>
              <SelectItem value="medium">Médio (500px)</SelectItem>
              <SelectItem value="large">Grande (700px)</SelectItem>
              <SelectItem value="full">Largura Total</SelectItem>
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

        <div className="space-y-3">
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
                <SelectItem value="full">Circular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shadow" className="text-xs text-[#8F7A6A]">
              Sombra
            </Label>
            <Select
              value={content.style?.shadow || 'none'}
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

          <div className="space-y-2">
            <Label htmlFor="border" className="text-xs text-[#8F7A6A]">
              Borda
            </Label>
            <Select
              value={content.style?.border || 'none'}
              onValueChange={(value) => onUpdate({ 
                style: { ...content.style, border: value }
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nenhuma</SelectItem>
                <SelectItem value="thin">Fina</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="thick">Grossa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {content.style?.border !== 'none' && (
            <div className="space-y-2">
              <Label htmlFor="borderColor" className="text-xs text-[#8F7A6A]">
                Cor da Borda
              </Label>
              <Input
                id="borderColor"
                type="color"
                value={content.style?.borderColor || '#B89B7A'}
                onChange={(e) => onUpdate({ 
                  style: { ...content.style, borderColor: e.target.value }
                })}
                className="h-8 w-full"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="opacity" className="text-xs text-[#8F7A6A]">
              Opacidade
            </Label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={content.style?.opacity || 100}
                onChange={(e) => onUpdate({ 
                  style: { ...content.style, opacity: parseInt(e.target.value) }
                })}
                className="flex-1"
              />
              <span className="text-sm text-[#8F7A6A] w-12">
                {content.style?.opacity || 100}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Link Settings */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-[#432818]">
          Link (opcional)
        </Label>

        <div className="space-y-2">
          <Label htmlFor="linkUrl" className="text-xs text-[#8F7A6A]">
            URL do Link
          </Label>
          <Input
            id="linkUrl"
            type="url"
            value={content.linkUrl || ''}
            onChange={(e) => onUpdate({ linkUrl: e.target.value })}
            placeholder="https://exemplo.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkTarget" className="text-xs text-[#8F7A6A]">
            Abrir Link
          </Label>
          <Select
            value={content.linkTarget || '_self'}
            onValueChange={(value) => onUpdate({ linkTarget: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_self">Mesma aba</SelectItem>
              <SelectItem value="_blank">Nova aba</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <Label className="text-xs text-[#8F7A6A]">Imagens de Exemplo</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({
              imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500',
              imageAlt: 'Pessoa elegante',
              caption: 'Estilo elegante e sofisticado'
            })}
            className="text-xs"
          >
            Estilo Elegante
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({
              imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500',
              imageAlt: 'Pessoa moderna',
              caption: 'Look moderno e atual'
            })}
            className="text-xs"
          >
            Estilo Moderno
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({
              imageUrl: 'https://images.unsplash.com/photo-1509087859087-a384654eca4d?w=500',
              imageAlt: 'Pessoa casual',
              caption: 'Estilo casual e descontraído'
            })}
            className="text-xs"
          >
            Estilo Casual
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({
              imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500',
              imageAlt: 'Pessoa clássica',
              caption: 'Look clássico atemporal'
            })}
            className="text-xs"
          >
            Estilo Clássico
          </Button>
        </div>
      </div>

      {/* Preview */}
      {content.imageUrl && (
        <div className="space-y-2">
          <Label className="text-xs text-[#8F7A6A]">Preview</Label>
          <div className="p-4 border border-[#B89B7A]/20 rounded-lg bg-gradient-to-r from-[#FAF9F7] to-white">
            <div className={`text-${content.alignment || 'center'}`}>
              <img
                src={content.imageUrl}
                alt={content.imageAlt || 'Preview'}
                className={`max-w-full h-auto rounded-lg shadow-sm`}
                style={{
                  maxWidth: content.size === 'small' ? '300px' : 
                           content.size === 'medium' ? '500px' : 
                           content.size === 'large' ? '700px' : '100%',
                  opacity: (content.style?.opacity || 100) / 100
                }}
              />
              {content.caption && (
                <div className="text-sm text-[#8F7A6A] mt-2">
                  {content.caption}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div className="space-y-2">
        <Label className="text-xs text-[#8F7A6A]">Upload de Imagem</Label>
        <div className="border-2 border-dashed border-[#B89B7A]/40 rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 mx-auto mb-2 text-[#8F7A6A]" />
          <p className="text-sm text-[#8F7A6A] mb-2">
            Arraste uma imagem aqui ou clique para selecionar
          </p>
          <Button variant="outline" size="sm">
            Selecionar Arquivo
          </Button>
          <p className="text-xs text-[#8F7A6A] mt-2">
            JPG, PNG ou GIF até 5MB
          </p>
        </div>
      </div>
    </div>
  );
};
