import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  FunnelChart, 
  Funnel, 
  LabelList,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
  TrendingDown, 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  Clock,
  ArrowDown,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface AdvancedFunnelProps {
  analyticsData: any;
  loading?: boolean;
}
export const AdvancedFunnel: React.FC<AdvancedFunnelProps> = ({ analyticsData, loading = false }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | 'all'>('7d');
  const [comparisonMode, setComparisonMode] = useState<'previous' | 'target'>('previous');
  // Cores para diferentes estágios do funil
  const stageColors = {
    visitors: '#8B5CF6',     // Roxo
    quiz_start: '#3B82F6',   // Azul
    quiz_complete: '#10B981', // Verde
    result_view: '#F59E0B',   // Amarelo
    lead_generated: '#EF4444', // Vermelho
    sale: '#059669'          // Verde escuro
  };
  // Calcular dados do funil
  const funnelData = useMemo(() => {
    if (!analyticsData?.events) return [];
    const events = analyticsData.events || [];
    
    // Simular dados de visitantes (em produção viria do analytics)
    const totalVisitors = 1000 + events.length * 5;
    const stages = [
      {
        name: 'Visitantes',
        stage: 'visitors',
        value: totalVisitors,
        percentage: 100,
        description: 'Usuários que visitaram a página',
        color: stageColors.visitors,
        icon: Users
      },
        name: 'Iniciaram Quiz',
        stage: 'quiz_start',
        value: events.filter(e => e.type === 'quiz_start').length,
        percentage: 0,
        description: 'Usuários que começaram o quiz',
        color: stageColors.quiz_start,
        icon: Target
        name: 'Completaram Quiz',
        stage: 'quiz_complete', 
        value: events.filter(e => e.type === 'quiz_complete').length,
        description: 'Usuários que finalizaram o quiz',
        color: stageColors.quiz_complete,
        icon: CheckCircle
        name: 'Visualizaram Resultado',
        stage: 'result_view',
        value: events.filter(e => e.type === 'result_view').length,
        description: 'Usuários que viram os resultados',
        color: stageColors.result_view,
        name: 'Geraram Lead',
        stage: 'lead_generated',
        value: events.filter(e => e.type === 'lead_generated').length,
        description: 'Usuários que deixaram contato',
        color: stageColors.lead_generated,
        name: 'Realizaram Compra',
        stage: 'sale',
        value: events.filter(e => e.type === 'sale').length,
        description: 'Usuários que efetivaram compra',
        color: stageColors.sale,
        icon: DollarSign
      }
    ];
    // Calcular percentuais relativos ao estágio anterior
    stages.forEach((stage, index) => {
      if (index === 0) {
        stage.percentage = 100;
      } else {
        const previousStage = stages[index - 1];
        stage.percentage = previousStage.value > 0 
          ? (stage.value / previousStage.value) * 100 
          : 0;
    });
    return stages;
  }, [analyticsData]);
  // Calcular taxa de conversão geral
  const overallConversionRate = useMemo(() => {
    if (funnelData.length < 2) return 0;
    const visitors = funnelData[0]?.value || 0;
    const sales = funnelData[funnelData.length - 1]?.value || 0;
    return visitors > 0 ? (sales / visitors) * 100 : 0;
  }, [funnelData]);
  // Identificar gargalos (maiores quedas no funil)
  const bottlenecks = useMemo(() => {
    const drops = [];
    for (let i = 1; i < funnelData.length; i++) {
      const current = funnelData[i];
      const previous = funnelData[i - 1];
      const dropPercentage = 100 - current.percentage;
      
      drops.push({
        from: previous.name,
        to: current.name,
        dropPercentage,
        severity: dropPercentage > 70 ? 'high' : dropPercentage > 50 ? 'medium' : 'low'
      });
    }
    return drops.sort((a, b) => b.dropPercentage - a.dropPercentage);
  // Dados para gráfico de barras comparativo
  const comparisonData = funnelData.map(stage => ({
    name: stage.name.replace(' ', '\n'),
    atual: stage.value,
    // Simular dados anteriores (em produção viria de dados históricos)
    anterior: Math.floor(stage.value * (0.8 + Math.random() * 0.4)),
    meta: Math.floor(stage.value * 1.2)
  }));
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Funil de Conversão Detalhado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="space-y-6">
      {/* Header com métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa de Conversão Geral</p>
                <p className="text-3xl font-bold text-green-600">{overallConversionRate.toFixed(2)}%</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Visitantes → Vendas
            </p>
          </CardContent>
        </Card>
                <p className="text-sm font-medium text-muted-foreground">Maior Gargalo</p>
                <p className="text-lg font-bold text-red-600">
                  {bottlenecks[0]?.dropPercentage.toFixed(1)}% queda
                </p>
                <p className="text-sm text-muted-foreground">
                  {bottlenecks[0]?.from} → {bottlenecks[0]?.to}
              <AlertTriangle className="w-8 h-8 text-red-600" />
                <p className="text-sm font-medium text-muted-foreground">Total de Vendas</p>
                <p className="text-3xl font-bold text-blue-600">
                  {funnelData[funnelData.length - 1]?.value || 0}
              <DollarSign className="w-8 h-8 text-blue-600" />
              Conversões confirmadas
      </div>
      {/* Funil visual principal */}
          <CardTitle>Funil de Conversão Visual</CardTitle>
          <CardDescription>
            Visualização do caminho completo do usuário desde a visita até a compra
          </CardDescription>
          <div className="space-y-4">
            {funnelData.map((stage, index) => {
              const Icon = stage.icon;
              const dropFromPrevious = index > 0 ? 100 - stage.percentage : 0;
              
              return (
                <div key={stage.stage} className="relative">
                  {/* Linha de conexão */}
                  {index > 0 && (
                    <div className="absolute left-1/2 -top-2 transform -translate-x-1/2 w-px h-4 bg-gray-300"></div>
                  )}
                  
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border-2 border-gray-100 hover:border-gray-200 transition-colors">
                    {/* Ícone do estágio */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: stage.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    {/* Informações do estágio */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{stage.name}</h3>
                      <p className="text-sm text-muted-foreground">{stage.description}</p>
                    {/* Métricas */}
                    <div className="text-right space-y-1">
                      <div className="text-2xl font-bold">{stage.value.toLocaleString()}</div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {stage.percentage.toFixed(1)}% do anterior
                        </Badge>
                        {dropFromPrevious > 0 && (
                          <Badge variant="destructive">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            -{dropFromPrevious.toFixed(1)}%
                          </Badge>
                        )}
                      </div>
                  </div>
                  {/* Barra de progresso visual */}
                  <div className="mt-2 mx-4">
                    <Progress 
                      value={stage.percentage} 
                      className="h-2"
                      style={{ 
                        backgroundColor: `${stage.color}20`,
                      }}
                    />
                </div>
              );
            })}
      {/* Análise de gargalos */}
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Análise de Gargalos
          </CardTitle>
            Identifica onde estão as maiores perdas no funil de conversão
          <div className="space-y-3">
            {bottlenecks.map((bottleneck, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  bottleneck.severity === 'high' 
                    ? 'border-red-200 bg-red-50' 
                    : bottleneck.severity === 'medium'
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-green-200 bg-green-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">
                      {bottleneck.from} → {bottleneck.to}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Perda de {bottleneck.dropPercentage.toFixed(1)}% dos usuários
                    </p>
                  <Badge 
                    variant={
                      bottleneck.severity === 'high' 
                        ? 'destructive' 
                        : bottleneck.severity === 'medium' 
                        ? 'default' 
                        : 'secondary'
                    }
                  >
                    {bottleneck.severity === 'high' && 'Crítico'}
                    {bottleneck.severity === 'medium' && 'Moderado'}
                    {bottleneck.severity === 'low' && 'Baixo'}
                  </Badge>
            ))}
      {/* Gráficos comparativos */}
      <Tabs defaultValue="comparison" className="space-y-4">
        <TabsList>
          <TabsTrigger value="comparison">Comparação Temporal</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
        </TabsList>
        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Comparação com Período Anterior</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="anterior" fill="#94A3B8" name="Período Anterior" />
                    <Bar dataKey="atual" fill="#3B82F6" name="Período Atual" />
                    <Bar dataKey="meta" fill="#10B981" name="Meta" />
                  </BarChart>
                </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends">
              <CardTitle>Tendências de Conversão</CardTitle>
                  <LineChart data={comparisonData}>
                    <Line 
                      type="monotone" 
                      dataKey="atual" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      name="Conversões Atuais"
                  </LineChart>
      </Tabs>
    </div>
  );
};
