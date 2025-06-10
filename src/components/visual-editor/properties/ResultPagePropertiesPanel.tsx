
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { X, Trash2 } from 'lucide-react';
import { ResultPageBlock } from '@/types/resultPageBlocks';

interface ResultPagePropertiesPanelProps {
  blockId: string;
  blocks: ResultPageBlock[];
  onUpdate: (blockId: string, updates: Partial<ResultPageBlock>) => void;
  onClose: () => void;
  onDelete: (blockId: string) => void;
}

export const ResultPagePropertiesPanel: React.FC<ResultPagePropertiesPanelProps> = ({
  blockId,
  blocks,
  onUpdate,
  onClose,
  onDelete
}) => {
  const block = blocks.find(b => b.id === blockId);

  if (!block) {
    return null;
  }

  const handleContentUpdate = (path: string, value: any) => {
    const pathArray = path.split('.');
    const updatedContent = { ...block.content };
    
    let current = updatedContent;
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!current[pathArray[i]]) {
        current[pathArray[i]] = {};
      }
      current = current[pathArray[i]];
    }
    current[pathArray[pathArray.length - 1]] = value;

    onUpdate(blockId, { content: updatedContent });
  };

  const renderPropertiesForType = () => {
    switch (block.type) {
      case 'header':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="logo">URL do Logo</Label>
              <Input
                id="logo"
                value={block.content.header?.logo || ''}
                onChange={(e) => handleContentUpdate('header.logo', e.target.value)}
                placeholder="URL da imagem do logo"
              />
            </div>
            <div>
              <Label htmlFor="logoAlt">Texto Alternativo do Logo</Label>
              <Input
                id="logoAlt"
                value={block.content.header?.logoAlt || ''}
                onChange={(e) => handleContentUpdate('header.logoAlt', e.target.value)}
                placeholder="Texto alternativo"
              />
            </div>
            <div>
              <Label htmlFor="logoHeight">Altura do Logo (px)</Label>
              <Input
                id="logoHeight"
                type="number"
                value={block.content.header?.logoHeight || 80}
                onChange={(e) => handleContentUpdate('header.logoHeight', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="userName">Nome do Usuário</Label>
              <Input
                id="userName"
                value={block.content.header?.userName || ''}
                onChange={(e) => handleContentUpdate('header.userName', e.target.value)}
                placeholder="Nome para exibir"
              />
            </div>
          </div>
        );

      case 'styleResult':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={block.content.styleResult?.description || ''}
                onChange={(e) => handleContentUpdate('styleResult.description', e.target.value)}
                placeholder="Descrição do resultado do estilo"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="customImage">Imagem Personalizada</Label>
              <Input
                id="customImage"
                value={block.content.styleResult?.customImage || ''}
                onChange={(e) => handleContentUpdate('styleResult.customImage', e.target.value)}
                placeholder="URL da imagem personalizada"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="showSecondaryStyles"
                checked={block.content.styleResult?.showSecondaryStyles || false}
                onCheckedChange={(checked) => handleContentUpdate('styleResult.showSecondaryStyles', checked)}
              />
              <Label htmlFor="showSecondaryStyles">Mostrar estilos secundários</Label>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={block.content.cta?.title || ''}
                onChange={(e) => handleContentUpdate('cta.title', e.target.value)}
                placeholder="Título do CTA"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtítulo</Label>
              <Input
                id="subtitle"
                value={block.content.cta?.subtitle || ''}
                onChange={(e) => handleContentUpdate('cta.subtitle', e.target.value)}
                placeholder="Subtítulo"
              />
            </div>
            <div>
              <Label htmlFor="regularPrice">Preço Regular</Label>
              <Input
                id="regularPrice"
                value={block.content.cta?.regularPrice || ''}
                onChange={(e) => handleContentUpdate('cta.regularPrice', e.target.value)}
                placeholder="R$ 175,00"
              />
            </div>
            <div>
              <Label htmlFor="salePrice">Preço Promocional</Label>
              <Input
                id="salePrice"
                value={block.content.cta?.salePrice || ''}
                onChange={(e) => handleContentUpdate('cta.salePrice', e.target.value)}
                placeholder="R$ 39,00"
              />
            </div>
            <div>
              <Label htmlFor="ctaText">Texto do Botão</Label>
              <Input
                id="ctaText"
                value={block.content.cta?.ctaText || ''}
                onChange={(e) => handleContentUpdate('cta.ctaText', e.target.value)}
                placeholder="Texto do botão"
              />
            </div>
            <div>
              <Label htmlFor="ctaUrl">URL do Botão</Label>
              <Input
                id="ctaUrl"
                value={block.content.cta?.ctaUrl || ''}
                onChange={(e) => handleContentUpdate('cta.ctaUrl', e.target.value)}
                placeholder="URL de destino"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-4">
            <p>Propriedades para o tipo "{block.type}" ainda não implementadas</p>
          </div>
        );
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Propriedades</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium capitalize">
              {block.type} Block
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {renderPropertiesForType()}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="visible"
              checked={block.visible}
              onCheckedChange={(checked) => onUpdate(blockId, { visible: checked })}
            />
            <Label htmlFor="visible">Visível</Label>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(blockId)}
          className="w-full"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Excluir Bloco
        </Button>
      </div>
    </div>
  );
};
