
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { FUNNEL_CONFIGS, getCurrentFunnel } from '@/services/pixelManager';

interface FunnelComparisonTabProps {
  analyticsData: any;
  loading: boolean;
}

export const FunnelComparisonTab: React.FC<FunnelComparisonTabProps> = ({ analyticsData, loading }) => {
  const [activeTab, setActiveTab] = useState('comparison');
  
  // Get metrics from analytics data
  const metrics = analyticsData?.metrics;
  
  // Prepare comparison data between funnels
  const funnelData = React.useMemo(() => {
    // This would be replaced with real metrics in a production app
    return [
      {
        name: 'Quiz como Isca',
        pixelId: FUNNEL_CONFIGS.default.pixelId,
        startCount: metrics?.funnel1?.totalStarts || 120,
        completeCount: metrics?.funnel1?.totalCompletes || 85,
        resultCount: metrics?.funnel1?.totalResultViews || 75,
        conversionCount: metrics?.funnel1?.totalSales || 12,
        conversionRate: metrics?.funnel1?.salesRate || 16
      },
      {
        name: 'Quiz Embutido',
        pixelId: FUNNEL_CONFIGS['quiz-descubra-seu-estilo'].pixelId,
        startCount: metrics?.funnel2?.totalStarts || 95,
        completeCount: metrics?.funnel2?.totalCompletes || 72,
        resultCount: metrics?.funnel2?.totalResultViews || 68,
        conversionCount: metrics?.funnel2?.totalSales || 18,
        conversionRate: metrics?.funnel2?.salesRate || 26
      }
    ];
  }, [metrics]);
  
  // Prepare data for completion rate comparison
  const completionRateData = funnelData.map(funnel => ({
    name: funnel.name,
    value: (funnel.completeCount / funnel.startCount) * 100
  }));
  
  // Prepare data for conversion rate comparison
  const conversionRateData = funnelData.map(funnel => ({
    name: funnel.name,
    value: funnel.conversionRate
  }));
  
  // Prepare data for steps comparison
  const stepsComparisonData = [
    { name: 'Início', 'Quiz Isca': funnelData[0].startCount, 'Quiz Embutido': funnelData[1].startCount },
    { name: 'Conclusão', 'Quiz Isca': funnelData[0].completeCount, 'Quiz Embutido': funnelData[1].completeCount },
    { name: 'Resultado', 'Quiz Isca': funnelData[0].resultCount, 'Quiz Embutido': funnelData[1].resultCount },
    { name: 'Conversão', 'Quiz Isca': funnelData[0].conversionCount, 'Quiz Embutido': funnelData[1].conversionCount }
  ];
  
  // Define colors for charts
  const COLORS = ['#4f46e5', '#10b981'];
  
  // Custom tooltip renderer for pie charts
  const renderCustomTooltip = (props: any) => {
    if (!props.active || !props.payload) return null;
    
    const data = props.payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-100 shadow-lg rounded-md">
        <p className="text-xs font-medium">{data.name}</p>
        <p className="text-xs font-bold">{data.value.toFixed(1)}%</p>
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-muted-foreground">Carregando dados de comparação...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border border-border/40 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Comparação de Funis</CardTitle>
              <CardDescription>Análise comparativa entre os dois funis de vendas</CardDescription>
            </div>
            <div>
              <Button variant="outline" size="sm" className="text-xs">
                Exportar Dados
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 gap-2">
              <TabsTrigger value="comparison">Visão Geral</TabsTrigger>
              <TabsTrigger value="completion">Taxa de Conclusão</TabsTrigger>
              <TabsTrigger value="conversion">Taxa de Conversão</TabsTrigger>
            </TabsList>
            
            <TabsContent value="comparison" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border border-border/60">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Configuração dos Funis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    {funnelData.map((funnel, index) => (
                      <div key={funnel.name} className="space-y-1.5">
                        <h4 className="text-sm font-medium">{funnel.name}</h4>
                        <div className="bg-muted/30 rounded p-2 text-xs space-y-1">
                          <p>Pixel ID: <span className="font-mono">{funnel.pixelId}</span></p>
                          <p>Campanha: <span className="font-mono">{FUNNEL_CONFIGS[index === 0 ? 'default' : 'quiz-descubra-seu-estilo'].utmCampaign}</span></p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card className="border border-border/60">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Comparativo de Etapas</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={stepsComparisonData}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                          barGap={2}
                          barSize={15}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Tooltip />
                          <Legend wrapperStyle={{ fontSize: 10 }} />
                          <Bar dataKey="Quiz Isca" fill={COLORS[0]} />
                          <Bar dataKey="Quiz Embutido" fill={COLORS[1]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="border border-border/60">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Análise de Funil Atual</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs mb-2">
                    Funil atual detectado: <span className="font-medium">{getCurrentFunnel() === 'default' ? 'Quiz como Isca' : 'Quiz Embutido'}</span>
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {['Início', 'Conclusão', 'Resultado', 'Conversão'].map((step, i) => (
                      <Card key={step} className="border border-border/40">
                        <CardContent className="p-3">
                          <p className="text-xs text-muted-foreground">{step}</p>
                          <p className="text-sm font-bold mt-1">
                            {getCurrentFunnel() === 'default' 
                              ? [funnelData[0].startCount, funnelData[0].completeCount, funnelData[0].resultCount, funnelData[0].conversionCount][i]
                              : [funnelData[1].startCount, funnelData[1].completeCount, funnelData[1].resultCount, funnelData[1].conversionCount][i]
                            }
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="completion">
              <Card className="border border-border/60">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Taxa de Conclusão do Quiz</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-center">
                    <div className="h-[220px] w-full max-w-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={completionRateData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                          >
                            {completionRateData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip content={renderCustomTooltip} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {completionRateData.map((data, index) => (
                      <Card key={data.name} className="border border-border/40">
                        <CardContent className="p-3">
                          <p className="text-xs text-muted-foreground">{data.name}</p>
                          <p className="text-sm font-bold mt-1">{data.value.toFixed(1)}%</p>
                          <p className="text-xs mt-1">
                            {funnelData[index].completeCount} de {funnelData[index].startCount} concluíram
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="conversion">
              <Card className="border border-border/60">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Taxa de Conversão (Venda)</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-center">
                    <div className="h-[220px] w-full max-w-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={conversionRateData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                          >
                            {conversionRateData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip content={renderCustomTooltip} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {conversionRateData.map((data, index) => (
                      <Card key={data.name} className="border border-border/40">
                        <CardContent className="p-3">
                          <p className="text-xs text-muted-foreground">{data.name}</p>
                          <p className="text-sm font-bold mt-1">{data.value.toFixed(1)}%</p>
                          <p className="text-xs mt-1">
                            {funnelData[index].conversionCount} vendas de {funnelData[index].resultCount} visualizações
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FunnelComparisonTab;
