
"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

const ABTestPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Testes A/B</h1>
        <p className="text-gray-600">Gerencie e monitore seus experimentos de conversão</p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="active">Testes Ativos</TabsTrigger>
          <TabsTrigger value="completed">Concluídos</TabsTrigger>
          <TabsTrigger value="create">Criar Teste</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Estatísticas Gerais</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">5</div>
                <p className="text-sm text-gray-600">Testes Ativos</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <p className="text-sm text-gray-600">Testes Concluídos</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">+15%</div>
                <p className="text-sm text-gray-600">Melhoria Média</p>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <Card className="p-6">
            <p>Lista de testes A/B ativos aparecerá aqui</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card className="p-6">
            <p>Histórico de testes concluídos aparecerá aqui</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="create">
          <Card className="p-6">
            <p>Formulário para criar novos testes A/B aparecerá aqui</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ABTestPage;
