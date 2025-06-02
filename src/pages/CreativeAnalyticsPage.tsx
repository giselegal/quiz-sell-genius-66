
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Eye, MousePointer, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreativeAnalyticsPage: React.FC = () => {
  const navigate = useNavigate();

  const creativeData = [
    {
      id: 1,
      name: "Quiz Principal",
      type: "Landing Page",
      views: "12.5k",
      clicks: "3.2k",
      conversion: "25.6%",
      status: "Ativo"
    },
    {
      id: 2,
      name: "Página de Resultados",
      type: "Results Page",
      views: "8.7k",
      clicks: "2.1k",
      conversion: "24.1%",
      status: "Ativo"
    },
    {
      id: 3,
      name: "Quiz de Oferta",
      type: "Sales Page",
      views: "5.3k",
      clicks: "1.8k",
      conversion: "34.0%",
      status: "Ativo"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => navigate('/admin')}
            variant="outline"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Analytics de Criativos
            </h1>
            <p className="text-gray-600">
              Monitoramento de performance das páginas do funil
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Visualizações
              </CardTitle>
              <Eye className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">26.5k</div>
              <p className="text-xs text-gray-600">
                +12% desde a semana passada
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Cliques
              </CardTitle>
              <MousePointer className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.1k</div>
              <p className="text-xs text-gray-600">
                +8% desde a semana passada
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Taxa Média de Conversão
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">27.9%</div>
              <p className="text-xs text-gray-600">
                +2.3% desde a semana passada
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Usuários Únicos
              </CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.3k</div>
              <p className="text-xs text-gray-600">
                +15% desde a semana passada
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance por Página</CardTitle>
            <CardDescription>
              Análise detalhada de cada página do funil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {creativeData.map((creative) => (
                <div key={creative.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{creative.name}</h3>
                    <p className="text-sm text-gray-600">{creative.type}</p>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-medium text-gray-900">{creative.views}</p>
                      <p className="text-gray-600">Visualizações</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-medium text-gray-900">{creative.clicks}</p>
                      <p className="text-gray-600">Cliques</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-medium text-green-600">{creative.conversion}</p>
                      <p className="text-gray-600">Conversão</p>
                    </div>
                    
                    <Badge className="bg-green-100 text-green-800">
                      {creative.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreativeAnalyticsPage;
