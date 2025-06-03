
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Edit, Eye, Palette, Settings } from 'lucide-react';

const ResultPageEditorPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-[#432818] mb-6">
          Editor da Página de Resultado
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Editor Visual Ao Vivo
              </CardTitle>
              <CardDescription>
                Editor moderno com interface drag & drop
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/live-editor">
                <Button className="w-full">
                  Abrir Editor Ao Vivo
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Editor Rápido
              </CardTitle>
              <CardDescription>
                Editor simplificado para mudanças rápidas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/quick-editor">
                <Button variant="outline" className="w-full">
                  Abrir Editor Rápido
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações
              </CardTitle>
              <CardDescription>
                Configurações avançadas da página
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Em Breve
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Funcionalidades mais utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link to="/resultado">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Visualizar Página Atual
              </Button>
            </Link>
            <Link to="/admin/header-editor">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Editar Header
              </Button>
            </Link>
            <Link to="/demo-blocks">
              <Button variant="outline">
                <Palette className="w-4 h-4 mr-2" />
                Demo Sistema de Blocos
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Link to="/admin" className="inline-block mt-6">
          <Button variant="outline">
            Voltar ao Painel
          </Button>
        </Link>
      </div>
    </AdminLayout>
  );
};

export default ResultPageEditorPage;
