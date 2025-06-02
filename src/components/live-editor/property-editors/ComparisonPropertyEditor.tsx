import React from 'react';
import type { Block } from '@/types/editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface ComparisonPropertyEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

export const ComparisonPropertyEditor: React.FC<ComparisonPropertyEditorProps> = ({
  block,
  onUpdate
}) => {
  const content = block.content || {
    title: 'Escolha o Plano Ideal',
    subtitle: 'Compare nossos planos e encontre o que melhor se adapta às suas necessidades',
    plans: [
      {
        name: 'Básico',
        price: 'R$ 29',
        period: '/mês',
        description: 'Perfeito para começar',
        features: [
          'Até 100 usuários',
          'Suporte por email',
          '1GB de armazenamento'
        ],
        highlighted: false,
        buttonText: 'Começar Agora'
      },
      {
        name: 'Profissional',
        price: 'R$ 59',
        period: '/mês',
        description: 'Mais popular',
        features: [
          'Até 500 usuários',
          'Suporte prioritário',
          '10GB de armazenamento',
          'Relatórios avançados'
        ],
        highlighted: true,
        buttonText: 'Teste Grátis'
      },
      {
        name: 'Empresarial',
        price: 'R$ 129',
        period: '/mês',
        description: 'Para grandes equipes',
        features: [
          'Usuários ilimitados',
          'Suporte 24/7',
          '100GB de armazenamento',
          'Relatórios personalizados',
          'API completa'
        ],
        highlighted: false,
        buttonText: 'Falar com Vendas'
      }
    ]
  };

  const updateContent = (field: string, value: any) => {
    onUpdate({
      ...content,
      [field]: value
    });
  };

  const updatePlan = (index: number, field: string, value: any) => {
    const newPlans = [...content.plans];
    newPlans[index] = {
      ...newPlans[index],
      [field]: value
    };
    updateContent('plans', newPlans);
  };

  const updatePlanFeature = (planIndex: number, featureIndex: number, value: string) => {
    const newPlans = [...content.plans];
    const newFeatures = [...newPlans[planIndex].features];
    newFeatures[featureIndex] = value;
    newPlans[planIndex] = {
      ...newPlans[planIndex],
      features: newFeatures
    };
    updateContent('plans', newPlans);
  };

  const addPlanFeature = (planIndex: number) => {
    const newPlans = [...content.plans];
    const newFeatures = [...newPlans[planIndex].features, 'Nova funcionalidade'];
    newPlans[planIndex] = {
      ...newPlans[planIndex],
      features: newFeatures
    };
    updateContent('plans', newPlans);
  };

  const removePlanFeature = (planIndex: number, featureIndex: number) => {
    const newPlans = [...content.plans];
    const newFeatures = newPlans[planIndex].features.filter((_: any, i: number) => i !== featureIndex);
    newPlans[planIndex] = {
      ...newPlans[planIndex],
      features: newFeatures
    };
    updateContent('plans', newPlans);
  };

  const addPlan = () => {
    const newPlans = [...content.plans, {
      name: 'Novo Plano',
      price: 'R$ 99',
      period: '/mês',
      description: 'Descrição do plano',
      features: ['Funcionalidade 1', 'Funcionalidade 2'],
      highlighted: false,
      buttonText: 'Escolher Plano'
    }];
    updateContent('plans', newPlans);
  };

  const removePlan = (index: number) => {
    const newPlans = content.plans.filter((_: any, i: number) => i !== index);
    updateContent('plans', newPlans);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="comparison-title">Título</Label>
        <Input
          id="comparison-title"
          value={content.title}
          onChange={(e) => updateContent('title', e.target.value)}
          placeholder="Título da comparação"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="comparison-subtitle">Subtítulo</Label>
        <Textarea
          id="comparison-subtitle"
          value={content.subtitle}
          onChange={(e) => updateContent('subtitle', e.target.value)}
          placeholder="Subtítulo da comparação"
          rows={2}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Planos</Label>
          <button
            onClick={addPlan}
            className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Adicionar Plano
          </button>
        </div>
        
        {content.plans.map((plan: any, planIndex: number) => (
          <Card key={planIndex} className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Plano {planIndex + 1}</span>
              <button
                onClick={() => removePlan(planIndex)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remover Plano
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Nome do Plano</Label>
                <Input
                  value={plan.name}
                  onChange={(e) => updatePlan(planIndex, 'name', e.target.value)}
                  placeholder="Nome do plano"
                />
              </div>
              <div className="space-y-2">
                <Label>Preço</Label>
                <Input
                  value={plan.price}
                  onChange={(e) => updatePlan(planIndex, 'price', e.target.value)}
                  placeholder="R$ 99"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Período</Label>
                <Input
                  value={plan.period}
                  onChange={(e) => updatePlan(planIndex, 'period', e.target.value)}
                  placeholder="/mês"
                />
              </div>
              <div className="space-y-2">
                <Label>Texto do Botão</Label>
                <Input
                  value={plan.buttonText}
                  onChange={(e) => updatePlan(planIndex, 'buttonText', e.target.value)}
                  placeholder="Escolher Plano"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <Input
                value={plan.description}
                onChange={(e) => updatePlan(planIndex, 'description', e.target.value)}
                placeholder="Descrição do plano"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={plan.highlighted}
                onCheckedChange={(checked) => updatePlan(planIndex, 'highlighted', checked)}
              />
              <Label>Plano em destaque</Label>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Funcionalidades</Label>
                <button
                  onClick={() => addPlanFeature(planIndex)}
                  className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Adicionar
                </button>
              </div>
              
              {plan.features.map((feature: string, featureIndex: number) => (
                <div key={featureIndex} className="flex items-center space-x-2">
                  <Input
                    value={feature}
                    onChange={(e) => updatePlanFeature(planIndex, featureIndex, e.target.value)}
                    placeholder="Funcionalidade"
                  />
                  <button
                    onClick={() => removePlanFeature(planIndex, featureIndex)}
                    className="text-xs text-red-500 hover:text-red-700 px-2 py-1"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
