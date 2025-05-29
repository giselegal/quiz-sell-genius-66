
'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Play, Pause, BarChart3 } from 'lucide-react';

export default function ABTestsPage() {
  const tests = [
    {
      id: 1,
      name: 'Título da Página Principal',
      status: 'running',
      startDate: '15/01/2024',
      variants: 2,
      traffic: 50,
      conversions: { a: 4.2, b: 5.8 },
      significance: 95
    },
    {
      id: 2,
      name: 'Botão CTA - Cores',
      status: 'draft',
      startDate: '-',
      variants: 3,
      traffic: 33,
      conversions: { a: 0, b: 0 },
      significance: 0
    },
    {
      id: 3,
      name: 'Layout da Oferta',
      status: 'completed',
      startDate: '01/01/2024',
      variants: 2,
      traffic: 50,
      conversions: { a: 3.1, b: 4.7 },
      significance: 98
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return <Badge className="bg-green-100 text-green-800">Executando</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">Rascunho</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Finalizado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#432818]">Testes A/B</h1>
          <p className="text-[#B89B7A] mt-1">Otimize suas conversões com testes A/B</p>
        </div>
        
        <Button className="bg-[#B89B7A] hover:bg-[#8F7A6A]">
          <Plus className="w-4 h-4 mr-2" />
          Novo Teste
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 border-dashed border-2 border-[#D4C4A0] flex flex-col items-center justify-center text-center">
          <Plus className="w-12 h-12 text-[#B89B7A] mb-4" />
          <h3 className="font-semibold text-[#432818] mb-2">Criar Novo Teste</h3>
          <p className="text-sm text-[#B89B7A] mb-4">
            Configure um novo teste A/B para otimizar suas conversões
          </p>
          <Button variant="outline">Começar</Button>
        </Card>

        {tests.map((test) => (
          <Card key={test.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[#432818]">{test.name}</h3>
                {getStatusBadge(test.status)}
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#B89B7A]">Variantes:</span>
                  <span className="text-[#432818]">{test.variants}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B89B7A]">Tráfego:</span>
                  <span className="text-[#432818]">{test.traffic}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B89B7A]">Início:</span>
                  <span className="text-[#432818]">{test.startDate}</span>
                </div>
                {test.status === 'running' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-[#B89B7A]">Conv. A:</span>
                      <span className="text-[#432818]">{test.conversions.a}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#B89B7A]">Conv. B:</span>
                      <span className="text-green-600 font-semibold">{test.conversions.b}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#B89B7A]">Significância:</span>
                      <span className="text-[#432818]">{test.significance}%</span>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex gap-2">
                {test.status === 'running' ? (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Pause className="w-4 h-4 mr-2" />
                    Pausar
                  </Button>
                ) : test.status === 'draft' ? (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Iniciar
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="flex-1">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Relatório
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-[#432818] mb-4">Recomendações</h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-1">Teste: Título da Página Principal</h4>
            <p className="text-sm text-blue-700">
              A variante B está performando 38% melhor. Considere finalizar o teste.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-1">Oportunidade de Teste</h4>
            <p className="text-sm text-yellow-700">
              Considere testar diferentes cores no botão CTA da página de resultado.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
