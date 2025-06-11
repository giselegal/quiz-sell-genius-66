
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { FinalCtaBlockContent } from '@/types/resultPageBlocks';

interface FinalCtaBlockEditorProps {
  content: FinalCtaBlockContent;
  onUpdate: (content: Partial<FinalCtaBlockContent>) => void;
}

export const FinalCtaBlockEditor: React.FC<FinalCtaBlockEditorProps> = ({
  content,
  onUpdate
}) => {
  const addProduct = () => {
    const newProduct = {
      id: Date.now().toString(),
      name: "Novo Produto",
      description: "Descrição do produto",
      originalPrice: 100,
      salePrice: 50,
      image: ""
    };
    onUpdate({
      products: [...(content.products || []), newProduct]
    });
  };

  const updateProduct = (index: number, updates: any) => {
    const updatedProducts = [...(content.products || [])];
    updatedProducts[index] = { ...updatedProducts[index], ...updates };
    onUpdate({ products: updatedProducts });
  };

  const removeProduct = (index: number) => {
    const updatedProducts = content.products?.filter((_, i) => i !== index) || [];
    onUpdate({ products: updatedProducts });
  };

  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-semibold text-[#432818]">Configurações do CTA Final</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="buttonText">Texto do Botão</Label>
          <Input
            id="buttonText"
            value={content.buttonText || 'QUERO TRANSFORMAR MEU ESTILO AGORA'}
            onChange={(e) => onUpdate({ buttonText: e.target.value })}
            placeholder="Texto do botão"
          />
        </div>

        <div>
          <Label htmlFor="buttonColor">Cor do Botão</Label>
          <Input
            id="buttonColor"
            type="color"
            value={content.buttonColor || '#22c55e'}
            onChange={(e) => onUpdate({ buttonColor: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="hotmartUrl">URL do Hotmart</Label>
          <Input
            id="hotmartUrl"
            value={content.hotmartUrl || ''}
            onChange={(e) => onUpdate({ hotmartUrl: e.target.value })}
            placeholder="https://pay.hotmart.com/..."
          />
        </div>

        {/* Timer Settings */}
        <div className="border-t pt-4">
          <div className="flex items-center space-x-2 mb-3">
            <Switch
              id="timerEnabled"
              checked={content.timer?.enabled || false}
              onCheckedChange={(checked) => onUpdate({ 
                timer: { ...content.timer, enabled: checked } 
              })}
            />
            <Label htmlFor="timerEnabled">Ativar timer</Label>
          </div>
          
          {content.timer?.enabled && (
            <div className="space-y-2">
              <div>
                <Label htmlFor="timerMessage">Mensagem do Timer</Label>
                <Input
                  id="timerMessage"
                  value={content.timer?.message || 'Oferta por tempo limitado!'}
                  onChange={(e) => onUpdate({ 
                    timer: { ...content.timer, message: e.target.value } 
                  })}
                />
              </div>
              <div>
                <Label htmlFor="timerDuration">Duração (minutos)</Label>
                <Input
                  id="timerDuration"
                  type="number"
                  value={content.timer?.duration || 60}
                  onChange={(e) => onUpdate({ 
                    timer: { ...content.timer, duration: parseInt(e.target.value) } 
                  })}
                />
              </div>
            </div>
          )}
        </div>

        {/* Discount Settings */}
        <div className="border-t pt-4">
          <div>
            <Label htmlFor="discountPercentage">Desconto (%)</Label>
            <Input
              id="discountPercentage"
              type="number"
              min="0"
              max="100"
              value={content.discount?.percentage || 60}
              onChange={(e) => onUpdate({ 
                discount: { ...content.discount, percentage: parseInt(e.target.value) } 
              })}
            />
          </div>
          <div>
            <Label htmlFor="discountMessage">Mensagem do Desconto</Label>
            <Input
              id="discountMessage"
              value={content.discount?.message || '60% de desconto por tempo limitado!'}
              onChange={(e) => onUpdate({ 
                discount: { ...content.discount, message: e.target.value } 
              })}
            />
          </div>
        </div>

        {/* Products */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <Label>Produtos</Label>
            <Button onClick={addProduct} size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Adicionar
            </Button>
          </div>
          
          {content.products?.map((product, index) => (
            <Card key={product.id} className="p-3 mb-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Produto {index + 1}</Label>
                  <Button 
                    onClick={() => removeProduct(index)} 
                    size="sm" 
                    variant="outline"
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  value={product.name}
                  onChange={(e) => updateProduct(index, { name: e.target.value })}
                  placeholder="Nome do produto"
                />
                <Textarea
                  value={product.description}
                  onChange={(e) => updateProduct(index, { description: e.target.value })}
                  placeholder="Descrição do produto"
                  rows={2}
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Preço Original</Label>
                    <Input
                      type="number"
                      value={product.originalPrice}
                      onChange={(e) => updateProduct(index, { originalPrice: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Preço de Venda</Label>
                    <Input
                      type="number"
                      value={product.salePrice}
                      onChange={(e) => updateProduct(index, { salePrice: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};
