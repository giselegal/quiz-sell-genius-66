
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TestTube, Plus, BarChart3 } from 'lucide-react';

const ABTestsPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-[#432818]">
            Testes A/B
          </h1>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Teste
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Teste de Headline
              </CardTitle>
              <CardDescription>
                Testando diferentes títulos na página de resultado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-green-600">Ativo</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversões A:</span>
                  <span>12.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversões B:</span>
                  <span>15.2%</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <BarChart3 className="w-4 h-4 mr-2" />
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Teste de CTA
              </CardTitle>
              <CardDescription>
                Testando diferentes botões de call-to-action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-yellow-600">Pausado</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversões A:</span>
                  <span>8.3%</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversões B:</span>
                  <span>9.1%</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <BarChart3 className="w-4 h-4 mr-2" />
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>
        </div>

        <Link to="/admin" className="inline-block mt-6">
          <Button variant="outline">
            Voltar ao Painel
          </Button>
        </Link>
      </div>
    </AdminLayout>
  );
};

export default ABTestsPage;
