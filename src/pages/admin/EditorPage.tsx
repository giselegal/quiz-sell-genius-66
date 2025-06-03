
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Palette, Eye, Edit } from 'lucide-react';

const EditorPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-[#432818] mb-6">
          Editor Unificado
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Editor de Resultados
              </CardTitle>
              <CardDescription>
                Edite a página de resultados do quiz com interface visual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/live-editor">
                <Button className="w-full">
                  Abrir Editor Visual
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Editor Simples
              </CardTitle>
              <CardDescription>
                Editor básico para edições rápidas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/quick-editor">
                <Button variant="outline" className="w-full">
                  Abrir Editor Simples
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Preview
              </CardTitle>
              <CardDescription>
                Visualize como está a página atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/resultado">
                <Button variant="outline" className="w-full">
                  Ver Resultado
                </Button>
              </Link>
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

export default EditorPage;
