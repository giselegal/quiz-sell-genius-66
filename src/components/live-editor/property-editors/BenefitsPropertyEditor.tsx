import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Plus, X, Star, CheckCircle, Award, Sparkles } from 'lucide-react';
import { Block } from '@/types/editor';

interface BenefitsPropertyEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

export const BenefitsPropertyEditor: React.FC<BenefitsPropertyEditorProps> = ({ 
  block, 
  onUpdate 
}) => {
  const content = block.content;
  const [newBenefit, setNewBenefit] = useState('');

  const benefits = content.items || [];

  const addBenefit = () => {
    if (newBenefit.trim()) {
      const updatedItems = [...benefits, newBenefit.trim()];
      onUpdate({ items: updatedItems });
      setNewBenefit('');
    }
  };

  const removeBenefit = (index: number) => {
    const updatedItems = benefits.filter((_: any, i: number) => i !== index);
    onUpdate({ items: updatedItems });
  };

  const updateBenefit = (index: number, value: string) => {
    const updatedItems = benefits.map((item: any, i: number) => 
      i === index ? value : item
    );
    onUpdate({ items: updatedItems });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addBenefit();
    }
  };

  const iconOptions = [
    { id: 'check-circle', component: <CheckCircle className="h-4 w-4" />, name: 'Check Circle' },
    { id: 'star', component: <Star className="h-4 w-4" />, name: 'Estrela' },
    { id: 'award', component: <Award className="h-4 w-4" />, name: 'Prêmio' },
    { id: 'sparkles', component: <Sparkles className="h-4 w-4" />, name: 'Brilho' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#FAF9F7] rounded-lg">
        <Star className="h-4 w-4 text-[#B89B7A]" />
        <div>
          <div className="font-medium text-sm text-[#432818]">Lista de Benefícios</div>
          <div className="text-xs text-[#8F7A6A]">Configure vantagens e benefícios</div>
        </div>
      </div>

      {/* Title Settings */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-[#432818]">
            Título da Seção
          </Label>
          <Input
            id="title"
            value={content.title || ''}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="O que você vai ganhar:"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="iconType" className="text-sm font-medium text-[#432818]">
            Ícone dos Benefícios
          </Label>
          <Select
            value={content.iconType || 'check-circle'}
            onValueChange={(value) => onUpdate({ iconType: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((icon) => (
                <SelectItem key={icon.id} value={icon.id}>
                  <div className="flex items-center gap-2">
                    {icon.component}
                    <span>{icon.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Benefits List */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-[#432818]">
          Lista de Benefícios ({benefits.length})
        </Label>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {benefits.map((benefit: string, index: number) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-[#FAF9F7] rounded-lg">
              <div className="flex-shrink-0 text-[#B89B7A]">
                {iconOptions.find(icon => icon.id === (content.iconType || 'check-circle'))?.component}
              </div>
              <Input
                value={benefit}
                onChange={(e) => updateBenefit(index, e.target.value)}
                placeholder={`Benefício ${index + 1}`}
                className="flex-1 border-none bg-transparent focus:bg-white"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeBenefit(index)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Add New Benefit */}
        <div className="flex gap-2">
          <Input
            placeholder="Adicionar novo benefício..."
            value={newBenefit}
            onChange={(e) => setNewBenefit(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={addBenefit}
            size="sm"
            className="bg-[#B89B7A] hover:bg-[#8F7A6A]"
            disabled={!newBenefit.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Style Settings */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-[#432818]">Estilos</Label>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="titleColor" className="text-xs text-[#8F7A6A]">
              Cor do Título
            </Label>
            <Input
              id="titleColor"
              type="color"
              value={content.style?.titleColor || '#432818'}
              onChange={(e) => onUpdate({ 
                style: { ...content.style, titleColor: e.target.value }
              })}
              className="h-8 w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="iconColor" className="text-xs text-[#8F7A6A]">
              Cor do Ícone
            </Label>
            <Input
              id="iconColor"
              type="color"
              value={content.style?.iconColor || '#B89B7A'}
              onChange={(e) => onUpdate({ 
                style: { ...content.style, iconColor: e.target.value }
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
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <Label className="text-xs text-[#8F7A6A]">Modelos Prontos</Label>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({
              title: 'Benefícios do seu estilo:',
              items: [
                'Produtos selecionados especialmente para você',
                'Desconto exclusivo de primeira compra',
                'Consultoria personalizada de estilo',
                'Garantia de satisfação de 30 dias'
              ]
            })}
            className="text-xs w-full justify-start"
          >
            Benefícios de Estilo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({
              title: 'O que você vai receber:',
              items: [
                'Análise completa do seu perfil',
                'Recomendações personalizadas',
                'Acesso vitalício ao conteúdo',
                'Suporte dedicado 24/7'
              ]
            })}
            className="text-xs w-full justify-start"
          >
            Benefícios do Produto
          </Button>
        </div>
      </div>
    </div>
  );
};
