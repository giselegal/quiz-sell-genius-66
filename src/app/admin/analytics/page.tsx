'use client';

import React, { useState } from 'react';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const overviewStats = [
    {
      title: 'Visitantes Únicos',
      value: '12,847',
      change: '+12.3%',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Quizzes Iniciados',
      value: '8,956',
      change: '+8.7%',
      icon: Target
    },
    {
      title: 'Taxa de Conclusão',
      value: '68.4%',
      change: '-2.1%',
      changeType: 'negative',
      icon: BarChart3
    },
    {
      title: 'Conversões Totais',
      value: '1,247',
      change: '+15.8%',
      icon: TrendingUp
    }
  ];
  const topQuizzes = [
    { name: 'Quiz de Liderança', views: 3420, conversions: 156, rate: 4.6 },
    { name: 'Produto Ideal', views: 2840, conversions: 98, rate: 3.4 },
    { name: 'Personalidade Emp.', views: 2150, conversions: 87, rate: 4.0 },
    { name: 'Marketing Digital', views: 1680, conversions: 52, rate: 3.1 }
  ];
  const trafficSources = [
    { source: 'Orgânico', visitors: 5240, percentage: 40.8 },
    { source: 'Facebook Ads', visitors: 3180, percentage: 24.8 },
    { source: 'Google Ads', visitors: 2450, percentage: 19.1 },
    { source: 'Instagram', visitors: 1320, percentage: 10.3 },
    { source: 'Direto', visitors: 657, percentage: 5.1 }
  ];
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#432818]">Analytics</h1>
          <p className="text-[#B89B7A] mt-1">
            Acompanhe o desempenho geral dos seus quizzes
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <Button variant="outline" className="border-[#B89B7A] text-[#432818]">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="outline" className="border-[#B89B7A] text-[#432818]">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-[#D4C4A0] rounded-md bg-white text-[#432818]"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
          </select>
        </div>
      </div>
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-[#D4C4A0]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#B89B7A]">{stat.title}</p>
                    <p className="text-3xl font-bold text-[#432818] mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.changeType === 'negative' ? (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'negative' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-[#F5F2E9] rounded-full">
                    <Icon className="w-6 h-6 text-[#B89B7A]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {/* Detailed Analytics */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="bg-[#F5F2E9] border border-[#D4C4A0]">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="traffic">Tráfego</TabsTrigger>
          <TabsTrigger value="conversions">Conversões</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="space-y-6">
          <Card className="border-[#D4C4A0]">
            <CardHeader>
              <CardTitle className="text-[#432818]">Top Quizzes por Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topQuizzes.map((quiz, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#F5F2E9] rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-[#432818]">{quiz.name}</h4>
                      <p className="text-sm text-[#B89B7A]">
                        {quiz.views.toLocaleString()} visualizações
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#432818]">{quiz.conversions} conversões</p>
                      <Badge 
                        variant="outline"
                        className={`$ {
                          quiz.rate >= 4 ? 'border-green-500 text-green-700' :
                          quiz.rate >= 3 ? 'border-yellow-500 text-yellow-700' :
                          'border-red-500 text-red-700'
                        }`}
                      >
                        {quiz.rate}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="traffic" className="space-y-6">
          <Card className="border-[#D4C4A0]">
            <CardHeader>
              <CardTitle className="text-[#432818]">Fontes de Tráfego</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-[#432818]">{source.source}</span>
                      <span className="text-sm text-[#B89B7A]">
                        {source.visitors.toLocaleString()} ({source.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#F5F2E9] rounded-full h-2">
                      <div 
                        className="bg-[#B89B7A] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="conversions" className="space-y-6">
          <Card className="border-[#D4C4A0]">
            <CardHeader>
              <CardTitle className="text-[#432818]">Funil de Conversão Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { step: 'Visitantes', value: 12847, percentage: 100 },
                  { step: 'Iniciaram Quiz', value: 8956, percentage: 69.7 },
                  { step: 'Completaram Quiz', value: 6124, percentage: 47.7 },
                  { step: 'Deixaram Email', value: 2847, percentage: 22.2 },
                  { step: 'Converteram', value: 1247, percentage: 9.7 }
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-[#432818]">{step.step}</span>
                      <span className="text-sm text-[#B89B7A]">{step.value.toLocaleString()} ({step.percentage}%)</span>
                    </div>
                    <div className="w-full bg-[#F5F2E9] rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-[#B89B7A] to-[#D4C4A0] h-4 rounded-full transition-all duration-500"
                        style={{ width: `${step.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
