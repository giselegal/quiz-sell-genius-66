import React from 'react';
import type { Block } from '@/types/editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NewsletterPropertyEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

export const NewsletterPropertyEditor: React.FC<NewsletterPropertyEditorProps> = ({
  block,
  onUpdate
}) => {
  const content = block.content || {
    title: 'Fique por dentro das novidades',
    subtitle: 'Receba dicas exclusivas e atualizações em primeira mão',
    placeholder: 'Digite seu melhor e-mail',
    buttonText: 'Quero receber',
    benefits: [
      'Conteúdo exclusivo toda semana',
      'Dicas práticas e atualizadas',
      'Acesso antecipado a novos produtos'
    ],
    disclaimer: 'Não enviamos spam. Cancele a qualquer momento.',
    style: 'modern'
  };

  const updateContent = (field: string, value: any) => {
    onUpdate({
      ...content,
      [field]: value
    });
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...content.benefits];
    newBenefits[index] = value;
    updateContent('benefits', newBenefits);
  };

  const addBenefit = () => {
    const newBenefits = [...content.benefits, 'Novo benefício'];
    updateContent('benefits', newBenefits);
  };

  const removeBenefit = (index: number) => {
    const newBenefits = content.benefits.filter((_: any, i: number) => i !== index);
    updateContent('benefits', newBenefits);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="newsletter-title">Título</Label>
        <Input
          id="newsletter-title"
          value={content.title}
          onChange={(e) => updateContent('title', e.target.value)}
          placeholder="Título da newsletter"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newsletter-subtitle">Subtítulo</Label>
        <Textarea
          id="newsletter-subtitle"
          value={content.subtitle}
          onChange={(e) => updateContent('subtitle', e.target.value)}
          placeholder="Subtítulo da newsletter"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newsletter-placeholder">Placeholder do E-mail</Label>
        <Input
          id="newsletter-placeholder"
          value={content.placeholder}
          onChange={(e) => updateContent('placeholder', e.target.value)}
          placeholder="Texto do placeholder"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newsletter-button">Texto do Botão</Label>
        <Input
          id="newsletter-button"
          value={content.buttonText}
          onChange={(e) => updateContent('buttonText', e.target.value)}
          placeholder="Texto do botão"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newsletter-style">Estilo</Label>
        <Select
          value={content.style}
          onValueChange={(value) => updateContent('style', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Escolha o estilo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modern">Moderno</SelectItem>
            <SelectItem value="minimal">Minimalista</SelectItem>
            <SelectItem value="classic">Clássico</SelectItem>
            <SelectItem value="bold">Destacado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Benefícios</Label>
          <button
            onClick={addBenefit}
            className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Adicionar Benefício
          </button>
        </div>
        
        {content.benefits.map((benefit: string, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              value={benefit}
              onChange={(e) => updateBenefit(index, e.target.value)}
              placeholder="Benefício"
            />
            <button
              onClick={() => removeBenefit(index)}
              className="text-xs text-red-500 hover:text-red-700 px-2 py-1"
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="newsletter-disclaimer">Disclaimer</Label>
        <Textarea
          id="newsletter-disclaimer"
          value={content.disclaimer}
          onChange={(e) => updateContent('disclaimer', e.target.value)}
          placeholder="Texto de disclaimer"
          rows={2}
        />
      </div>
    </Card>
  );
};
