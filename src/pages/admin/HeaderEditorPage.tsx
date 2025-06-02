
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Settings, Eye, Save } from 'lucide-react';

const HeaderEditorPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-[#432818] mb-6">
          Editor de Header
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações do Header
              </CardTitle>
              <CardDescription>
                Personalize o cabeçalho da página de resultado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Título Principal</label>
                <input 
                  type="text" 
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  defaultValue="Seu Estilo Pessoal Descoberto!"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Subtítulo</label>
                <input 
                  type="text" 
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  defaultValue="Baseado nas suas respostas, aqui está seu perfil único"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Cor do Header</label>
                <input 
                  type="color" 
                  className="w-full mt-1 h-10 border border-gray-300 rounded-md"
                  defaultValue="#B89B7A"
                />
              </div>

              <div className="flex gap-3">
                <Button className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
                <Link to="/resultado">
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview do Header</CardTitle>
              <CardDescription>
                Visualização em tempo real das suas alterações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="p-6 rounded-lg text-center text-white"
                style={{ backgroundColor: '#B89B7A' }}
              >
                <h1 className="text-2xl font-bold mb-2">
                  Seu Estilo Pessoal Descoberto!
                </h1>
                <p className="text-lg opacity-90">
                  Baseado nas suas respostas, aqui está seu perfil único
                </p>
              </div>
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

export default HeaderEditorPage;
