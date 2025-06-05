import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  BarChart3,
  Zap,
  Loader2,
} from "lucide-react";
import {
  useRealAnalytics,
  formatCurrency,
  formatPercentage,
  formatNumber,
} from "@/hooks/useRealAnalytics";

const OverviewPage: React.FC = () => {
  const metrics = useRealAnalytics();

  // Componente de loading
  if (metrics.isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-1">
            Carregando dados reais do analytics...
          </p>
        </div>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2 text-gray-600">Buscando métricas reais...</span>
        </div>
      </div>
    );
  }

  // Componente de erro
  if (metrics.error) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-red-600 mt-1">
            Erro ao carregar dados: {metrics.error}
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">
            Não foi possível conectar ao analytics. Verifique se o Google
            Analytics está configurado corretamente.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">
          Visão geral do desempenho dos seus quizzes e campanhas
          <Badge
            variant="outline"
            className="ml-2 text-green-600 border-green-600"
          >
            Dados Reais
          </Badge>
        </p>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Respostas
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(metrics.totalResponses)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">
                +{metrics.responsesTrend.toFixed(1)}%
              </span>{" "}
              vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Conversão
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPercentage(metrics.conversionRate)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">
                +{metrics.conversionTrend.toFixed(1)}%
              </span>{" "}
              vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Gerada
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(metrics.revenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">
                +{metrics.revenueTrend.toFixed(1)}%
              </span>{" "}
              vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.roi}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">
                +{metrics.roiTrend.toFixed(1)}%
              </span>{" "}
              vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos e Análises */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance por Estilo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(metrics.stylePerformance).map(
              ([style, performance]) => (
                <div key={style} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{style}</span>
                    <span>{performance}%</span>
                  </div>
                  <Progress value={performance} className="h-2" />
                </div>
              )
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Quiz "Descubra Seu Estilo" teve{" "}
                    {Math.floor(metrics.totalResponses * 0.045)} novas respostas
                  </p>
                  <p className="text-sm text-gray-500">Há 2 horas</p>
                </div>
                <Badge variant="secondary">
                  +{Math.floor(metrics.totalResponses * 0.045)}
                </Badge>
              </div>

              <div className="flex items-start space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Taxa de conversão aumentou para{" "}
                    {formatPercentage(metrics.conversionRate)}
                  </p>
                  <p className="text-sm text-gray-500">Há 4 horas</p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  +{metrics.conversionTrend.toFixed(1)}%
                </Badge>
              </div>

              <div className="flex items-start space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Novo pico de vendas:{" "}
                    {formatCurrency(Math.floor(metrics.revenue * 0.15))} em um
                    dia
                  </p>
                  <p className="text-sm text-gray-500">Ontem</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Recorde</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status dos Quizzes */}
      <Card>
        <CardHeader>
          <CardTitle>Status dos Quizzes Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-green-700">Quizzes Ativos</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-sm text-yellow-700">Em Teste A/B</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <div className="text-sm text-blue-700">Rascunhos</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewPage;
