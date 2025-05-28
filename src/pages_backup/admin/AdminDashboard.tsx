"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, Settings, Eye, Plus } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
              <p className="text-gray-600 mt-2">Gerencie seu quiz e monitore resultados</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Visualizar Quiz
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Quiz
              </Button>
            </div>
          </div>
        </header>
        
        <nav className="mb-8 flex gap-4">
          <a href="/" className="text-blue-600 hover:underline">Quiz</a>
          <a href="/resultado" className="text-blue-600 hover:underline">Resultado + Oferta</a>
          <a href="/quiz-descubra-seu-estilo" className="text-blue-600 hover:underline">Quiz Descubra Seu Estilo</a>
          <a href="/admin/editor" className="text-blue-600 hover:underline">Editor Visual</a>
          <a href="/admin/analytics" className="text-blue-600 hover:underline">Métricas</a>
          <a href="/admin/abtest" className="text-blue-600 hover:underline">Teste A/B</a>
          <a href="/admin/settings" className="text-blue-600 hover:underline">Configurações</a>
        </nav>
        
        <main>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Participações</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+20.1% em relação ao mês passado</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5%</div>
                <p className="text-xs text-muted-foreground">+2.1% em relação ao mês passado</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quizzes Ativos</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 em teste A/B</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita do Mês</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 45,231</div>
                <p className="text-xs text-muted-foreground">+15.3% em relação ao mês passado</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="abtest">A/B Tests</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análise de Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Gráficos e métricas detalhadas aparecerão aqui</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="quizzes">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Quizzes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Lista de quizzes e opções de edição aparecerão aqui</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="leads">
              <Card>
                <CardHeader>
                  <CardTitle>Gestão de Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Lista de leads capturados aparecerá aqui</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="abtest">
              <Card>
                <CardHeader>
                  <CardTitle>Testes A/B</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Configuração e resultados de testes A/B aparecerão aqui</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Sistema</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Opções de configuração aparecerão aqui</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
