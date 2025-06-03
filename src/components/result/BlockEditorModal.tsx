import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BlockData } from '@/types/resultPageConfig';
import { Save, X, Palette, Type, Image } from 'lucide-react';

interface BlockEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  block: BlockData | null;
  onSave: (blockId: string, updates: Partial<BlockData>) => void;
}

const BlockEditorModal: React.FC<BlockEditorModalProps> = ({
  isOpen,
  onClose,
  block,
  onSave
}) => {
  const [editedBlock, setEditedBlock] = useState<BlockData | null>(null);

  useEffect(() => {
    if (block) {
      setEditedBlock({ ...block });
    }
  }, [block]);

  const handleSave = () => {
    if (editedBlock) {
      onSave(editedBlock.id, editedBlock);
      onClose();
    }
  };

  const updateContent = (key: string, value: any) => {
    if (editedBlock) {
      setEditedBlock({
        ...editedBlock,
        content: {
          ...editedBlock.content,
          [key]: value
        }
      });
    }
  };

  const updateStyle = (key: string, value: any) => {
    if (editedBlock) {
      setEditedBlock({
        ...editedBlock,
        style: {
          ...editedBlock.style,
          [key]: value
        }
      });
    }
  };

  if (!editedBlock) return null;

  const renderContentEditor = () => {
    switch (editedBlock.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="hero-title">Título Principal</Label>
              <Input
                id="hero-title"
                value={editedBlock.content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                placeholder="Título do hero"
              />
            </div>
            <div>
              <Label htmlFor="hero-subtitle">Subtítulo</Label>
              <Textarea
                id="hero-subtitle"
                value={editedBlock.content.subtitle || ''}
                onChange={(e) => updateContent('subtitle', e.target.value)}
                placeholder="Subtítulo do hero"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="hero-image">URL da Imagem (opcional)</Label>
              <Input
                id="hero-image"
                value={editedBlock.content.imageUrl || ''}
                onChange={(e) => updateContent('imageUrl', e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-title">Título</Label>
              <Input
                id="text-title"
                value={editedBlock.content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                placeholder="Título da seção"
              />
            </div>
            <div>
              <Label htmlFor="text-description">Conteúdo</Label>
              <Textarea
                id="text-description"
                value={editedBlock.content.description || ''}
                onChange={(e) => updateContent('description', e.target.value)}
                placeholder="Conteúdo do texto..."
                rows={5}
              />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-title">Título (opcional)</Label>
              <Input
                id="image-title"
                value={editedBlock.content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                placeholder="Título da imagem"
              />
            </div>
            <div>
              <Label htmlFor="image-url">URL da Imagem</Label>
              <Input
                id="image-url"
                value={editedBlock.content.imageUrl || ''}
                onChange={(e) => updateContent('imageUrl', e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
            <div>
              <Label htmlFor="image-alt">Texto Alternativo</Label>
              <Input
                id="image-alt"
                value={editedBlock.content.alt || ''}
                onChange={(e) => updateContent('alt', e.target.value)}
                placeholder="Descrição da imagem para acessibilidade"
              />
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cta-title">Título</Label>
              <Input
                id="cta-title"
                value={editedBlock.content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                placeholder="Título do CTA"
              />
            </div>
            <div>
              <Label htmlFor="cta-description">Descrição</Label>
              <Textarea
                id="cta-description"
                value={editedBlock.content.description || ''}
                onChange={(e) => updateContent('description', e.target.value)}
                placeholder="Descrição do CTA"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="cta-text">Texto do Botão</Label>
              <Input
                id="cta-text"
                value={editedBlock.content.ctaText || ''}
                onChange={(e) => updateContent('ctaText', e.target.value)}
                placeholder="Clique Aqui"
              />
            </div>
            <div>
              <Label htmlFor="cta-url">URL do Link</Label>
              <Input
                id="cta-url"
                value={editedBlock.content.ctaUrl || ''}
                onChange={(e) => updateContent('ctaUrl', e.target.value)}
                placeholder="https://exemplo.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cta-price">Preço</Label>
                <Input
                  id="cta-price"
                  value={editedBlock.content.price || ''}
                  onChange={(e) => updateContent('price', e.target.value)}
                  placeholder="R$ 39,90"
                />
              </div>
              <div>
                <Label htmlFor="cta-regular-price">Preço Original</Label>
                <Input
                  id="cta-regular-price"
                  value={editedBlock.content.regularPrice || ''}
                  onChange={(e) => updateContent('regularPrice', e.target.value)}
                  placeholder="R$ 59,90"
                />
              </div>
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="testimonial-title">Título da Seção</Label>
              <Input
                id="testimonial-title"
                value={editedBlock.content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                placeholder="Título dos depoimentos"
              />
            </div>
            <div>
              <Label htmlFor="testimonial-text">Depoimento</Label>
              <Textarea
                id="testimonial-text"
                value={editedBlock.content.description || ''}
                onChange={(e) => updateContent('description', e.target.value)}
                placeholder="Texto do depoimento..."
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="testimonial-author">Nome do Cliente</Label>
              <Input
                id="testimonial-author"
                value={editedBlock.content.userName || ''}
                onChange={(e) => updateContent('userName', e.target.value)}
                placeholder="Nome do Cliente"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="default-title">Título</Label>
              <Input
                id="default-title"
                value={editedBlock.content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                placeholder="Título"
              />
            </div>
            <div>
              <Label htmlFor="default-description">Descrição</Label>
              <Textarea
                id="default-description"
                value={editedBlock.content.description || ''}
                onChange={(e) => updateContent('description', e.target.value)}
                placeholder="Descrição..."
                rows={4}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Type className="w-5 h-5 text-[#B89B7A]" />
            Editar Bloco: {editedBlock.title}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="content" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Conteúdo
            </TabsTrigger>
            <TabsTrigger value="style" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Estilo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="block-title">Título do Bloco</Label>
                <Input
                  id="block-title"
                  value={editedBlock.title}
                  onChange={(e) => setEditedBlock({ ...editedBlock, title: e.target.value })}
                  placeholder="Nome do bloco"
                />
              </div>
              
              {renderContentEditor()}
            </div>
          </TabsContent>

          <TabsContent value="style" className="mt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="bg-color">Cor de Fundo</Label>
                <Input
                  id="bg-color"
                  value={editedBlock.style.backgroundColor || ''}
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                  placeholder="white, #ffffff, linear-gradient(...)"
                />
              </div>
              
              <div>
                <Label htmlFor="padding">Espaçamento Interno</Label>
                <Input
                  id="padding"
                  value={editedBlock.style.padding || ''}
                  onChange={(e) => updateStyle('padding', e.target.value)}
                  placeholder="1.5rem, 24px, 2rem 1rem"
                />
              </div>

              <div>
                <Label htmlFor="text-align">Alinhamento do Texto</Label>
                <select
                  id="text-align"
                  value={editedBlock.style.textAlign || 'left'}
                  onChange={(e) => updateStyle('textAlign', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="left">Esquerda</option>
                  <option value="center">Centro</option>
                  <option value="right">Direita</option>
                </select>
              </div>

              <div>
                <Label htmlFor="border-radius">Borda Arredondada</Label>
                <Input
                  id="border-radius"
                  value={editedBlock.style.borderRadius || ''}
                  onChange={(e) => updateStyle('borderRadius', e.target.value)}
                  placeholder="0.5rem, 8px"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 mt-6 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#B89B7A] hover:bg-[#A1835D]"
          >
            <Save className="w-4 h-4" />
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlockEditorModal;
