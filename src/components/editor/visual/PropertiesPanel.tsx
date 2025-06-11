
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';

interface EditableSection {
  id: string;
  type: 'header' | 'title' | 'content' | 'cta' | 'transition';
  name: string;
  visible: boolean;
  order: number;
  content: any;
}

interface PropertiesPanelProps {
  section: EditableSection | null;
  onUpdate: (updates: Partial<EditableSection>) => void;
  onClose: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  section,
  onUpdate,
  onClose
}) => {
  if (!section) return null;

  const handleContentUpdate = (contentUpdates: any) => {
    onUpdate({
      content: {
        ...section.content,
        ...contentUpdates
      }
    });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-lg font-playfair text-[#432818]">Propriedades</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-6">
        {/* Basic Properties */}
        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#432818] mb-3">Configurações Básicas</h3>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="section-name" className="text-sm">Nome da Seção</Label>
              <Input
                id="section-name"
                value={section.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                className="mt-1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={section.visible}
                onCheckedChange={(visible) => onUpdate({ visible })}
              />
              <Label className="text-sm">Seção visível</Label>
            </div>
          </div>
        </Card>

        {/* Content Properties */}
        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#432818] mb-3">Conteúdo</h3>
          
          {section.type === 'title' && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="title" className="text-sm">Título</Label>
                <Input
                  id="title"
                  value={section.content.title || ''}
                  onChange={(e) => handleContentUpdate({ title: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="subtitle" className="text-sm">Subtítulo</Label>
                <Textarea
                  id="subtitle"
                  value={section.content.subtitle || ''}
                  onChange={(e) => handleContentUpdate({ subtitle: e.target.value })}
                  className="mt-1 h-20"
                />
              </div>
            </div>
          )}

          {section.type === 'header' && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="custom-title" className="text-sm">Título Personalizado</Label>
                <Input
                  id="custom-title"
                  value={section.content.customTitle || ''}
                  onChange={(e) => handleContentUpdate({ customTitle: e.target.value })}
                  placeholder="Deixe vazio para usar o padrão"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="custom-subtitle" className="text-sm">Subtítulo Personalizado</Label>
                <Textarea
                  id="custom-subtitle"
                  value={section.content.customSubtitle || ''}
                  onChange={(e) => handleContentUpdate({ customSubtitle: e.target.value })}
                  placeholder="Deixe vazio para usar o padrão"
                  className="mt-1 h-16"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={section.content.showUserName}
                  onCheckedChange={(showUserName) => handleContentUpdate({ showUserName })}
                />
                <Label className="text-sm">Mostrar nome do usuário</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={section.content.showProgress}
                  onCheckedChange={(showProgress) => handleContentUpdate({ showProgress })}
                />
                <Label className="text-sm">Mostrar barra de progresso</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={section.content.showPersonalization}
                  onCheckedChange={(showPersonalization) => handleContentUpdate({ showPersonalization })}
                />
                <Label className="text-sm">Mostrar personalização</Label>
              </div>
            </div>
          )}

          {section.type === 'cta' && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="button-text" className="text-sm">Texto do Botão</Label>
                <Input
                  id="button-text"
                  value={section.content.buttonText || ''}
                  onChange={(e) => handleContentUpdate({ buttonText: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="button-color" className="text-sm">Cor do Botão</Label>
                <Input
                  id="button-color"
                  type="color"
                  value={section.content.buttonColor || '#22c55e'}
                  onChange={(e) => handleContentUpdate({ buttonColor: e.target.value })}
                  className="mt-1 h-10"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={section.content.showTimer}
                  onCheckedChange={(showTimer) => handleContentUpdate({ showTimer })}
                />
                <Label className="text-sm">Mostrar timer</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={section.content.showGuarantees}
                  onCheckedChange={(showGuarantees) => handleContentUpdate({ showGuarantees })}
                />
                <Label className="text-sm">Mostrar garantias</Label>
              </div>

              {section.content.discount && (
                <div>
                  <Label htmlFor="discount-message" className="text-sm">Mensagem de Desconto</Label>
                  <Input
                    id="discount-message"
                    value={section.content.discount.message || ''}
                    onChange={(e) => handleContentUpdate({ 
                      discount: { 
                        ...section.content.discount, 
                        message: e.target.value 
                      }
                    })}
                    className="mt-1"
                  />
                </div>
              )}
            </div>
          )}

          {section.type === 'transition' && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="transition-title" className="text-sm">Título da Transição</Label>
                <Input
                  id="transition-title"
                  value={section.content.title || ''}
                  onChange={(e) => handleContentUpdate({ title: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="transition-subtitle" className="text-sm">Subtítulo da Transição</Label>
                <Textarea
                  id="transition-subtitle"
                  value={section.content.subtitle || ''}
                  onChange={(e) => handleContentUpdate({ subtitle: e.target.value })}
                  className="mt-1 h-16"
                />
              </div>
            </div>
          )}
        </Card>

        {/* Product Management for CTA */}
        {section.type === 'cta' && section.content.products && (
          <Card className="p-4">
            <h3 className="text-sm font-medium text-[#432818] mb-3">Produtos</h3>
            
            {section.content.products.map((product: any, index: number) => (
              <div key={product.id} className="space-y-3 p-3 border rounded mb-3">
                <div>
                  <Label className="text-sm">Nome do Produto</Label>
                  <Input
                    value={product.name || ''}
                    onChange={(e) => {
                      const updatedProducts = [...section.content.products];
                      updatedProducts[index] = { ...product, name: e.target.value };
                      handleContentUpdate({ products: updatedProducts });
                    }}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label className="text-sm">Descrição</Label>
                  <Textarea
                    value={product.description || ''}
                    onChange={(e) => {
                      const updatedProducts = [...section.content.products];
                      updatedProducts[index] = { ...product, description: e.target.value };
                      handleContentUpdate({ products: updatedProducts });
                    }}
                    className="mt-1 h-16"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-sm">Preço Original</Label>
                    <Input
                      type="number"
                      value={product.originalPrice || 0}
                      onChange={(e) => {
                        const updatedProducts = [...section.content.products];
                        updatedProducts[index] = { ...product, originalPrice: Number(e.target.value) };
                        handleContentUpdate({ products: updatedProducts });
                      }}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm">Preço Promocional</Label>
                    <Input
                      type="number"
                      value={product.salePrice || 0}
                      onChange={(e) => {
                        const updatedProducts = [...section.content.products];
                        updatedProducts[index] = { ...product, salePrice: Number(e.target.value) };
                        handleContentUpdate({ products: updatedProducts });
                      }}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
};
