import React from 'react';
import type { Block } from '@/types/editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface SocialProofPropertyEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

export const SocialProofPropertyEditor: React.FC<SocialProofPropertyEditorProps> = ({
  block,
  onUpdate
}) => {
  const content = block.content || {
    title: 'Junte-se a mais de 10.000 pessoas satisfeitas',
    subtitle: 'Veja o que nossos clientes estão dizendo',
    metrics: [
      { label: 'Clientes Satisfeitos', value: '10.000+' },
      { label: 'Avaliação Média', value: '4.9/5' },
      { label: 'Anos no Mercado', value: '5+' }
    ],
    logos: [
      { name: 'Empresa 1', url: 'https://via.placeholder.com/120x60' },
      { name: 'Empresa 2', url: 'https://via.placeholder.com/120x60' },
      { name: 'Empresa 3', url: 'https://via.placeholder.com/120x60' }
    ]
  };

  const updateContent = (field: string, value: any) => {
    onUpdate({
      ...content,
      [field]: value
    });
  };

  const updateMetric = (index: number, field: string, value: string) => {
    const newMetrics = [...content.metrics];
    newMetrics[index] = {
      ...newMetrics[index],
      [field]: value
    };
    updateContent('metrics', newMetrics);
  };

  const addMetric = () => {
    const newMetrics = [...content.metrics, { label: 'Nova Métrica', value: '100+' }];
    updateContent('metrics', newMetrics);
  };

  const removeMetric = (index: number) => {
    const newMetrics = content.metrics.filter((_: any, i: number) => i !== index);
    updateContent('metrics', newMetrics);
  };

  const updateLogo = (index: number, field: string, value: string) => {
    const newLogos = [...content.logos];
    newLogos[index] = {
      ...newLogos[index],
      [field]: value
    };
    updateContent('logos', newLogos);
  };

  const addLogo = () => {
    const newLogos = [...content.logos, { name: 'Nova Empresa', url: 'https://via.placeholder.com/120x60' }];
    updateContent('logos', newLogos);
  };

  const removeLogo = (index: number) => {
    const newLogos = content.logos.filter((_: any, i: number) => i !== index);
    updateContent('logos', newLogos);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="social-title">Título</Label>
        <Input
          id="social-title"
          value={content.title}
          onChange={(e) => updateContent('title', e.target.value)}
          placeholder="Título da prova social"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="social-subtitle">Subtítulo</Label>
        <Textarea
          id="social-subtitle"
          value={content.subtitle}
          onChange={(e) => updateContent('subtitle', e.target.value)}
          placeholder="Subtítulo da prova social"
          rows={2}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Métricas</Label>
          <button
            onClick={addMetric}
            className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Adicionar Métrica
          </button>
        </div>
        
        {content.metrics.map((metric: any, index: number) => (
          <Card key={index} className="p-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Métrica {index + 1}</span>
              <button
                onClick={() => removeMetric(index)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remover
              </button>
            </div>
            <Input
              value={metric.label}
              onChange={(e) => updateMetric(index, 'label', e.target.value)}
              placeholder="Label da métrica"
            />
            <Input
              value={metric.value}
              onChange={(e) => updateMetric(index, 'value', e.target.value)}
              placeholder="Valor da métrica"
            />
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Logos de Empresas</Label>
          <button
            onClick={addLogo}
            className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Adicionar Logo
          </button>
        </div>
        
        {content.logos.map((logo: any, index: number) => (
          <Card key={index} className="p-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Logo {index + 1}</span>
              <button
                onClick={() => removeLogo(index)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remover
              </button>
            </div>
            <Input
              value={logo.name}
              onChange={(e) => updateLogo(index, 'name', e.target.value)}
              placeholder="Nome da empresa"
            />
            <Input
              value={logo.url}
              onChange={(e) => updateLogo(index, 'url', e.target.value)}
              placeholder="URL do logo"
            />
          </Card>
        ))}
      </div>
    </Card>
  );
};
