import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Block } from '@/types/editor';
import { Target, Settings, DollarSign } from 'lucide-react';

interface PricingPropertyEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

export const PricingPropertyEditor: React.FC<PricingPropertyEditorProps> = ({ 
  block, 
  onUpdate 
}) => {
  const content = block.content;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#FAF9F7] rounded-lg">
        <Target className="h-4 w-4 text-[#B89B7A]" />
        <div>
          <div className="font-medium text-sm text-[#432818]">Seção de Preço</div>
          <div className="text-xs text-[#8F7A6A]">Configure preços e ofertas</div>
        </div>
      </div>

      {/* Content Settings */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-[#432818]">
            Título da Oferta
          </Label>
          <Input
            id="title"
            value={content.title || ''}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Oferta Especial"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-[#432818]">
            Descrição
          </Label>
          <Textarea
            id="description"
            rows={3}
            value={content.description || ''}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Descrição da oferta..."
            className="resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="originalPrice" className="text-sm font-medium text-[#432818]">
              Preço Original
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8F7A6A]" />
              <Input
                id="originalPrice"
                type="number"
                value={content.originalPrice || ''}
                onChange={(e) => onUpdate({ originalPrice: e.target.value })}
                placeholder="297"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="finalPrice" className="text-sm font-medium text-[#432818]">
              Preço Final
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8F7A6A]" />
              <Input
                id="finalPrice"
                type="number"
                value={content.finalPrice || ''}
                onChange={(e) => onUpdate({ finalPrice: e.target.value })}
                placeholder="197"
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency" className="text-sm font-medium text-[#432818]">
            Moeda
          </Label>
          <Select
            value={content.currency || 'BRL'}
            onValueChange={(value) => onUpdate({ currency: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BRL">Real (R$)</SelectItem>
              <SelectItem value="USD">Dólar ($)</SelectItem>
              <SelectItem value="EUR">Euro (€)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="discount" className="text-sm font-medium text-[#432818]">
            Texto do Desconto
          </Label>
          <Input
            id="discount"
            value={content.discount || ''}
            onChange={(e) => onUpdate({ discount: e.target.value })}
            placeholder="50% OFF por tempo limitado"
          />
        </div>
      </div>

      <Separator />

      {/* Payment Options */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-[#432818]">
          Opções de Pagamento
        </Label>

        <div className="space-y-2">
          <Label htmlFor="installments" className="text-xs text-[#8F7A6A]">
            Parcelamento
          </Label>
          <Input
            id="installments"
            value={content.installments || ''}
            onChange={(e) => onUpdate({ installments: e.target.value })}
            placeholder="12x de R$ 16,42"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentMethods" className="text-xs text-[#8F7A6A]">
            Métodos de Pagamento
          </Label>
          <Input
            id="paymentMethods"
            value={content.paymentMethods || ''}
            onChange={(e) => onUpdate({ paymentMethods: e.target.value })}
            placeholder="Cartão, PIX, Boleto"
          />
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
            <Label htmlFor="originalPriceColor" className="text-xs text-[#8F7A6A]">
              Cor Preço Original
            </Label>
            <Input
              id="originalPriceColor"
              type="color"
              value={content.style?.originalPriceColor || '#8F7A6A'}
              onChange={(e) => onUpdate({ 
                style: { ...content.style, originalPriceColor: e.target.value }
              })}
              className="h-8 w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="finalPriceColor" className="text-xs text-[#8F7A6A]">
              Cor Preço Final
            </Label>
            <Input
              id="finalPriceColor"
              type="color"
              value={content.style?.finalPriceColor || '#B89B7A'}
              onChange={(e) => onUpdate({ 
                style: { ...content.style, finalPriceColor: e.target.value }
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
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <Label className="text-xs text-[#8F7A6A]">Modelos de Preço</Label>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({
              title: 'Oferta Exclusiva',
              description: 'Desconto especial para você que fez o quiz',
              originalPrice: '297',
              finalPrice: '197',
              discount: '34% OFF',
              installments: '12x de R$ 16,42',
              paymentMethods: 'Cartão, PIX, Boleto'
            })}
            className="text-xs w-full justify-start"
          >
            Oferta com Desconto
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({
              title: 'Preço Promocional',
              description: 'Por tempo limitado apenas',
              originalPrice: '497',
              finalPrice: '297',
              discount: '40% OFF',
              installments: '10x de R$ 29,70',
              paymentMethods: 'Todas as formas de pagamento'
            })}
            className="text-xs w-full justify-start"
          >
            Promoção Limitada
          </Button>
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <Label className="text-xs text-[#8F7A6A]">Preview</Label>
        <div className="p-4 border border-[#B89B7A]/20 rounded-lg bg-gradient-to-r from-[#FAF9F7] to-white">
          <div className="text-center">
            <div className="text-sm font-medium text-[#432818] mb-1">
              {content.title || 'Oferta Especial'}
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-lg line-through text-[#8F7A6A]">
                {content.currency === 'USD' ? '$' : content.currency === 'EUR' ? '€' : 'R$'} 
                {content.originalPrice || '297'}
              </span>
              <span className="text-2xl font-bold text-[#B89B7A]">
                {content.currency === 'USD' ? '$' : content.currency === 'EUR' ? '€' : 'R$'} 
                {content.finalPrice || '197'}
              </span>
            </div>
            {content.discount && (
              <Badge className="bg-red-100 text-red-700 text-xs">
                {content.discount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
