import React from 'react';
import type { Block } from '@/types/editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FeatureGridPropertyEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

export const FeatureGridPropertyEditor: React.FC<FeatureGridPropertyEditorProps> = ({
  block,
  onUpdate
}) => {
  const content = block.content || {
    title: 'Principais Funcionalidades',
    subtitle: 'Descubra tudo o que oferecemos para você',
    columns: 3,
    features: [
      {
        icon: 'star',
        title: 'Qualidade Premium',
        description: 'Produtos e serviços de alta qualidade para sua satisfação'
      },
      {
        icon: 'shield',
        title: 'Segurança Garantida',
        description: 'Seus dados estão protegidos com nossa tecnologia avançada'
      },
      {
        icon: 'clock',
        title: 'Suporte 24/7',
        description: 'Atendimento disponível a qualquer hora do dia ou da noite'
      },
      {
        icon: 'heart',
        title: 'Satisfação Total',
        description: 'Garantia de satisfação ou seu dinheiro de volta'
      },
      {
        icon: 'trending-up',
        title: 'Resultados Comprovados',
        description: 'Milhares de clientes satisfeitos com resultados reais'
      },
      {
        icon: 'users',
        title: 'Comunidade Ativa',
        description: 'Faça parte de uma comunidade engajada e colaborativa'
      }
    ]
  };

  const updateContent = (field: string, value: any) => {
    onUpdate({
      ...content,
      [field]: value
    });
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const newFeatures = [...content.features];
    newFeatures[index] = {
      ...newFeatures[index],
      [field]: value
    };
    updateContent('features', newFeatures);
  };

  const addFeature = () => {
    const newFeatures = [...content.features, {
      icon: 'star',
      title: 'Nova Funcionalidade',
      description: 'Descrição da nova funcionalidade'
    }];
    updateContent('features', newFeatures);
  };

  const removeFeature = (index: number) => {
    const newFeatures = content.features.filter((_: any, i: number) => i !== index);
    updateContent('features', newFeatures);
  };

  const iconOptions = [
    { value: 'star', label: 'Estrela' },
    { value: 'shield', label: 'Escudo' },
    { value: 'clock', label: 'Relógio' },
    { value: 'heart', label: 'Coração' },
    { value: 'trending-up', label: 'Gráfico' },
    { value: 'users', label: 'Usuários' },
    { value: 'check-circle', label: 'Check' },
    { value: 'zap', label: 'Raio' },
    { value: 'globe', label: 'Globo' },
    { value: 'lock', label: 'Cadeado' },
    { value: 'smartphone', label: 'Smartphone' },
    { value: 'wifi', label: 'WiFi' }
  ];

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="feature-grid-title">Título</Label>
        <Input
          id="feature-grid-title"
          value={content.title}
          onChange={(e) => updateContent('title', e.target.value)}
          placeholder="Título do grid de funcionalidades"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="feature-grid-subtitle">Subtítulo</Label>
        <Textarea
          id="feature-grid-subtitle"
          value={content.subtitle}
          onChange={(e) => updateContent('subtitle', e.target.value)}
          placeholder="Subtítulo do grid"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="feature-grid-columns">Número de Colunas</Label>
        <Select
          value={content.columns.toString()}
          onValueChange={(value) => updateContent('columns', parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Escolha o número de colunas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Coluna</SelectItem>
            <SelectItem value="2">2 Colunas</SelectItem>
            <SelectItem value="3">3 Colunas</SelectItem>
            <SelectItem value="4">4 Colunas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Funcionalidades</Label>
          <button
            onClick={addFeature}
            className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Adicionar Funcionalidade
          </button>
        </div>
        
        {content.features.map((feature: any, index: number) => (
          <Card key={index} className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Funcionalidade {index + 1}</span>
              <button
                onClick={() => removeFeature(index)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remover
              </button>
            </div>

            <div className="space-y-2">
              <Label>Ícone</Label>
              <Select
                value={feature.icon}
                onValueChange={(value) => updateFeature(index, 'icon', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Escolha um ícone" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={feature.title}
                onChange={(e) => updateFeature(index, 'title', e.target.value)}
                placeholder="Título da funcionalidade"
              />
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                value={feature.description}
                onChange={(e) => updateFeature(index, 'description', e.target.value)}
                placeholder="Descrição da funcionalidade"
                rows={3}
              />
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
