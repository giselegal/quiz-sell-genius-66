
import React from 'react';
import { useSecureAuth } from '@/context/SecureAuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BarChart3, Settings, Image } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, signOut } = useSecureAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Painel Administrativo
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Olá, {user?.email}</span>
              <Button onClick={signOut} variant="outline">
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Participantes do Quiz
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Total de participantes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Analytics
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Visualizações hoje
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Banco de Imagens
                </CardTitle>
                <Image className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Imagens cadastradas
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>Funcionalidades</CardTitle>
                <CardDescription>
                  Gerencie diferentes aspectos do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-500">
                  <Settings className="h-12 w-12 mx-auto mb-4" />
                  <p>Painel administrativo em desenvolvimento</p>
                  <p className="text-sm">Novas funcionalidades serão adicionadas em breve.</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
