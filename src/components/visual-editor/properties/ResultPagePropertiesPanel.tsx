
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';
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
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <p className="text-gray-500">Nenhum bloco selecionado</p>
      </div>
    );
  }

  const updateContent = (path: string, value: any) => {
    const [section, field] = path.split('.');
    onUpdate(blockId, {
      content: {
        ...block.content,
        [section]: {
          ...block.content[section as keyof typeof block.content],
          [field]: value
        }
      }
    });
  };

  const renderHeaderProperties = () => {
    const content = block.content.header || {};
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="logo">URL do Logo</Label>
          <Input
            id="logo"
            value={content.logo || ''}
            onChange={(e) => updateContent('header.logo', e.target.value)}
            placeholder="URL da imagem do logo"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="logoAlt">Texto Alternativo</Label>
          <Input
            id="logoAlt"
            value={content.logoAlt || ''}
            onChange={(e) => updateContent('header.logoAlt', e.target.value)}
            placeholder="Texto alternativo do logo"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="logoHeight">Altura do Logo (px)</Label>
          <Input
            id="logoHeight"
            type="number"
            value={content.logoHeight || 80}
            onChange={(e) => updateContent('header.logoHeight', parseInt(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="userName">Nome do Usuário</Label>
          <Input
            id="userName"
            value={content.userName || ''}
            onChange={(e) => updateContent('header.userName', e.target.value)}
            placeholder="Nome que aparecerá no cabeçalho"
          />
        </div>
      </div>
    );
  };

  const renderStyleResultProperties = () => {
    const content = block.content.styleResult || {};
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Descrição Personalizada</Label>
          <Textarea
            id="description"
            rows={4}
            value={content.description || ''}
            onChange={(e) => updateContent('styleResult.description', e.target.value)}
            placeholder="Descrição personalizada para o estilo..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="customImage">Imagem Personalizada (URL)</Label>
          <Input
            id="customImage"
            value={content.customImage || ''}
            onChange={(e) => updateContent('styleResult.customImage', e.target.value)}
            placeholder="URL da imagem personalizada"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="showSecondaryStyles"
            checked={content.showSecondaryStyles !== false}
            onCheckedChange={(checked) => updateContent('styleResult.showSecondaryStyles', checked)}
          />
          <Label htmlFor="showSecondaryStyles">Mostrar Estilos Secundários</Label>
        </div>
      </div>
    );
  };

  const renderCTAProperties = () => {
    const content = block.content.cta || {};
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={content.title || ''}
            onChange={(e) => updateContent('cta.title', e.target.value)}
            placeholder="Título do CTA"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtítulo</Label>
          <Textarea
            id="subtitle"
            rows={2}
            value={content.subtitle || ''}
            onChange={(e) => updateContent('cta.subtitle', e.target.value)}
            placeholder="Subtítulo do CTA"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label htmlFor="regularPrice">Preço Normal</Label>
            <Input
              id="regularPrice"
              value={content.regularPrice || ''}
              onChange={(e) => updateContent('cta.regularPrice', e.target.value)}
              placeholder="R$ 175,00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salePrice">Preço Promocional</Label>
            <Input
              id="salePrice"
              value={content.salePrice || ''}
              onChange={(e) => updateContent('cta.salePrice', e.target.value)}
              placeholder="R$ 39,00"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="installments">Parcelamento</Label>
          <Input
            id="installments"
            value={content.installments || ''}
            onChange={(e) => updateContent('cta.installments', e.target.value)}
            placeholder="4X de R$ 10,86"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ctaText">Texto do Botão</Label>
          <Input
            id="ctaText"
            value={content.ctaText || ''}
            onChange={(e) => updateContent('cta.ctaText', e.target.value)}
            placeholder="Texto do botão de ação"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ctaUrl">URL do Botão</Label>
          <Input
            id="ctaUrl"
            value={content.ctaUrl || ''}
            onChange={(e) => updateContent('cta.ctaUrl', e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>
    );
  };

  const renderProperties = () => {
    switch (block.type) {
      case 'header':
        return renderHeaderProperties();
      case 'styleResult':
        return renderStyleResultProperties();
      case 'cta':
        return renderCTAProperties();
      default:
        return (
          <div className="text-gray-500 text-center py-8">
            <p>Propriedades para "{block.type}" não implementadas ainda</p>
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

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Tipo</h4>
            <p className="text-sm text-gray-600 capitalize">{block.type}</p>
          </div>

          {renderProperties()}

          <div className="pt-4 border-t border-gray-200">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(block.id)}
              className="w-full"
            >
              Excluir Bloco
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
