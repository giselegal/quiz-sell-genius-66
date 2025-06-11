
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { X, Save } from 'lucide-react';

interface ResultPagePropertiesPanelProps {
  block: ResultPageBlock | null;
  onUpdate: (updates: any) => void;
  onClose: () => void;
}

export const ResultPagePropertiesPanel: React.FC<ResultPagePropertiesPanelProps> = ({
  block,
  onUpdate,
  onClose
}) => {
  const [localContent, setLocalContent] = useState(block?.content || {});

  if (!block) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <div className="text-center text-gray-500 py-8">
          Selecione um bloco para editar suas propriedades
        </div>
      </div>
    );
  }

  const handleContentChange = (section: string, field: string, value: any) => {
    const newContent = {
      ...localContent,
      [section]: {
        ...localContent[section],
        [field]: value
      }
    };
    setLocalContent(newContent);
  };

  const handleSave = () => {
    onUpdate({ content: localContent });
  };

  const renderPropertiesForm = () => {
    switch (block.type) {
      case 'header':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="logo">URL do Logo</Label>
              <Input
                id="logo"
                value={localContent.header?.logo || ''}
                onChange={(e) => handleContentChange('header', 'logo', e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label htmlFor="logoAlt">Texto alternativo do logo</Label>
              <Input
                id="logoAlt"
                value={localContent.header?.logoAlt || ''}
                onChange={(e) => handleContentChange('header', 'logoAlt', e.target.value)}
                placeholder="Logo da empresa"
              />
            </div>
            <div>
              <Label htmlFor="logoHeight">Altura do logo (px)</Label>
              <Input
                id="logoHeight"
                type="number"
                value={localContent.header?.logoHeight || 80}
                onChange={(e) => handleContentChange('header', 'logoHeight', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="userName">Nome do usuário</Label>
              <Input
                id="userName"
                value={localContent.header?.userName || ''}
                onChange={(e) => handleContentChange('header', 'userName', e.target.value)}
                placeholder="Visitante"
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
                value={localContent.styleResult?.description || ''}
                onChange={(e) => handleContentChange('styleResult', 'description', e.target.value)}
                placeholder="Descrição do resultado do estilo..."
                rows={4}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showSecondaryStyles"
                checked={localContent.styleResult?.showSecondaryStyles || false}
                onChange={(e) => handleContentChange('styleResult', 'showSecondaryStyles', e.target.checked)}
              />
              <Label htmlFor="showSecondaryStyles">Mostrar estilos secundários</Label>
            </div>
          </div>
        );

      case 'transformation':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="transformationTitle">Título</Label>
              <Input
                id="transformationTitle"
                value={localContent.transformation?.title || ''}
                onChange={(e) => handleContentChange('transformation', 'title', e.target.value)}
                placeholder="Transformações Reais"
              />
            </div>
            <div>
              <Label htmlFor="transformationDescription">Descrição</Label>
              <Textarea
                id="transformationDescription"
                value={localContent.transformation?.description || ''}
                onChange={(e) => handleContentChange('transformation', 'description', e.target.value)}
                placeholder="Veja como outras mulheres transformaram seu estilo..."
                rows={3}
              />
            </div>
          </div>
        );

      case 'motivation':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="motivationTitle">Título</Label>
              <Input
                id="motivationTitle"
                value={localContent.motivation?.title || ''}
                onChange={(e) => handleContentChange('motivation', 'title', e.target.value)}
                placeholder="Por que Descobrir seu Estilo é Importante?"
              />
            </div>
            <div>
              <Label htmlFor="motivationSubtitle">Subtítulo</Label>
              <Input
                id="motivationSubtitle"
                value={localContent.motivation?.subtitle || ''}
                onChange={(e) => handleContentChange('motivation', 'subtitle', e.target.value)}
                placeholder="Transforme sua relação com a moda"
              />
            </div>
          </div>
        );

      case 'bonus':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bonusTitle">Título</Label>
              <Input
                id="bonusTitle"
                value={localContent.bonus?.title || ''}
                onChange={(e) => handleContentChange('bonus', 'title', e.target.value)}
                placeholder="Bônus Exclusivos"
              />
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="testimonialsTitle">Título</Label>
              <Input
                id="testimonialsTitle"
                value={localContent.testimonials?.title || ''}
                onChange={(e) => handleContentChange('testimonials', 'title', e.target.value)}
                placeholder="O que nossas clientes estão dizendo"
              />
            </div>
          </div>
        );

      case 'guarantee':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="guaranteeTitle">Título</Label>
              <Input
                id="guaranteeTitle"
                value={localContent.guarantee?.title || ''}
                onChange={(e) => handleContentChange('guarantee', 'title', e.target.value)}
                placeholder="Garantia de Satisfação"
              />
            </div>
            <div>
              <Label htmlFor="guaranteeDescription">Descrição</Label>
              <Textarea
                id="guaranteeDescription"
                value={localContent.guarantee?.description || ''}
                onChange={(e) => handleContentChange('guarantee', 'description', e.target.value)}
                placeholder="Se você não ficar 100% satisfeita..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="guaranteeDays">Dias de garantia</Label>
              <Input
                id="guaranteeDays"
                type="number"
                value={localContent.guarantee?.days || 7}
                onChange={(e) => handleContentChange('guarantee', 'days', parseInt(e.target.value))}
              />
            </div>
          </div>
        );

      case 'mentor':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="mentorName">Nome</Label>
              <Input
                id="mentorName"
                value={localContent.mentor?.name || ''}
                onChange={(e) => handleContentChange('mentor', 'name', e.target.value)}
                placeholder="Gisele Galvão"
              />
            </div>
            <div>
              <Label htmlFor="mentorTitle">Título/Cargo</Label>
              <Input
                id="mentorTitle"
                value={localContent.mentor?.title || ''}
                onChange={(e) => handleContentChange('mentor', 'title', e.target.value)}
                placeholder="Consultora de Imagem e Estilo"
              />
            </div>
            <div>
              <Label htmlFor="mentorDescription">Descrição</Label>
              <Textarea
                id="mentorDescription"
                value={localContent.mentor?.description || ''}
                onChange={(e) => handleContentChange('mentor', 'description', e.target.value)}
                placeholder="Especialista em coloração pessoal..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="mentorImage">URL da imagem</Label>
              <Input
                id="mentorImage"
                value={localContent.mentor?.image || ''}
                onChange={(e) => handleContentChange('mentor', 'image', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ctaTitle">Título</Label>
              <Input
                id="ctaTitle"
                value={localContent.cta?.title || ''}
                onChange={(e) => handleContentChange('cta', 'title', e.target.value)}
                placeholder="Transforme Seu Estilo Hoje"
              />
            </div>
            <div>
              <Label htmlFor="ctaSubtitle">Subtítulo</Label>
              <Input
                id="ctaSubtitle"
                value={localContent.cta?.subtitle || ''}
                onChange={(e) => handleContentChange('cta', 'subtitle', e.target.value)}
                placeholder="Guia Completo + Bônus Exclusivos"
              />
            </div>
            <div>
              <Label htmlFor="regularPrice">Preço original</Label>
              <Input
                id="regularPrice"
                value={localContent.cta?.regularPrice || ''}
                onChange={(e) => handleContentChange('cta', 'regularPrice', e.target.value)}
                placeholder="R$ 175,00"
              />
            </div>
            <div>
              <Label htmlFor="salePrice">Preço promocional</Label>
              <Input
                id="salePrice"
                value={localContent.cta?.salePrice || ''}
                onChange={(e) => handleContentChange('cta', 'salePrice', e.target.value)}
                placeholder="R$ 39,00"
              />
            </div>
            <div>
              <Label htmlFor="ctaText">Texto do botão</Label>
              <Input
                id="ctaText"
                value={localContent.cta?.ctaText || ''}
                onChange={(e) => handleContentChange('cta', 'ctaText', e.target.value)}
                placeholder="Quero meu Guia de Estilo Agora"
              />
            </div>
            <div>
              <Label htmlFor="ctaUrl">URL do botão</Label>
              <Input
                id="ctaUrl"
                value={localContent.cta?.ctaUrl || ''}
                onChange={(e) => handleContentChange('cta', 'ctaUrl', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        );

      case 'footer':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="companyName">Nome da empresa</Label>
              <Input
                id="companyName"
                value={localContent.footer?.companyName || ''}
                onChange={(e) => handleContentChange('footer', 'companyName', e.target.value)}
                placeholder="Gisele Galvão - Consultoria de Imagem"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-4">
            Editor de propriedades não disponível para este tipo de bloco
          </div>
        );
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Propriedades</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Editando: {block.type}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="style">Estilo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4 mt-4">
            {renderPropertiesForm()}
          </TabsContent>
          
          <TabsContent value="style" className="space-y-4 mt-4">
            <div className="text-center text-gray-500 py-4">
              <p className="text-sm">
                Opções de estilo serão implementadas em breve
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
};
