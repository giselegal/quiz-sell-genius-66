// src/pages/admin/BuilderDashboard.tsx
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Edit3, 
  Eye, 
  Plus, 
  ExternalLink, 
  Settings, 
  Palette, 
  FileText,
  BarChart3,
  Zap
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import BuilderQuizEditor from '@/components/builder/BuilderQuizEditor';
import BuilderResultEditor from '@/components/builder/BuilderResultEditor';
import { useQuizLogic } from '@/hooks/useQuizLogic';

const BuilderDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { quizResult } = useQuizLogic();

  // Modelos pré-configurados para o projeto
  const predefinedModels = [
    {
      id: 'quiz-page',
      name: 'Página do Quiz',
      description: 'Editor visual para as páginas de perguntas do quiz',
      type: 'quiz',
      status: 'active',
      lastModified: '2025-06-01'
    },
    {
      id: 'result-page',
      name: 'Página de Resultados',
      description: 'Editor visual para a página de resultados do quiz',
      type: 'result',
      status: 'active',
      lastModified: '2025-06-01'
    },
    {
      id: 'landing-page',
      name: 'Landing Page',
      description: 'Páginas de entrada e captura de leads',
      type: 'landing',
      status: 'draft',
      lastModified: '2025-06-01'
    }
  ];

  const handleCreateModel = () => {
    toast({
      title: "Redirecionando para Builder.io",
      description: "Você será redirecionado para o painel do Builder.io para criar um novo modelo.",
    });
    // Abrir Builder.io em nova aba
    window.open('https://builder.io/content', '_blank');
  };

  const handleEditModel = (modelId: string) => {
    toast({
      title: "Abrindo Editor",
      description: `Abrindo editor do Builder.io para o modelo: ${modelId}`,
    });
    window.open(`https://builder.io/content/${modelId}`, '_blank');
  };

  const handlePreviewModel = (modelId: string) => {
    toast({
      title: "Visualização Ativada",
      description: `Mostrando preview do modelo: ${modelId}`,
    });
    setActiveTab('preview');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#432818]">Builder.io Dashboard</h1>
            <p className="text-[#8B7355] mt-2">
              Editor visual para páginas dinâmicas e componentes do quiz
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => window.open('https://builder.io/content', '_blank')}
              className="border-[#B89B7A] text-[#432818] hover:bg-[#B89B7A] hover:text-white"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Abrir Builder.io
            </Button>
            <Button 
              onClick={handleCreateModel}
              className="bg-[#B89B7A] text-white hover:bg-[#A38A69]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Modelo
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="models">Modelos</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-[#432818]">
                    Modelos Ativos
                  </CardTitle>
                  <Palette className="h-4 w-4 text-[#B89B7A]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#432818]">3</div>
                  <p className="text-xs text-[#8B7355]">
                    Quiz, Resultado e Landing
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-[#432818]">
                    Última Atualização
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-[#B89B7A]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#432818]">Hoje</div>
                  <p className="text-xs text-[#8B7355]">
                    Página de resultados
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-[#432818]">
                    Status da API
                  </CardTitle>
                  <Zap className="h-4 w-4 text-[#B89B7A]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Online</div>
                  <p className="text-xs text-[#8B7355]">
                    Conectado ao Builder.io
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#432818]">Ações Rápidas</CardTitle>
                <CardDescription>
                  Acesse rapidamente as principais funcionalidades do Builder.io
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => handleEditModel('quiz-page')}
                  className="justify-start h-auto p-4 border-[#B89B7A]/30 hover:border-[#B89B7A]"
                >
                  <Edit3 className="w-5 h-5 mr-3 text-[#B89B7A]" />
                  <div className="text-left">
                    <div className="font-medium text-[#432818]">Editar Quiz</div>
                    <div className="text-sm text-[#8B7355]">Modificar perguntas e layout</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  onClick={() => handleEditModel('result-page')}
                  className="justify-start h-auto p-4 border-[#B89B7A]/30 hover:border-[#B89B7A]"
                >
                  <FileText className="w-5 h-5 mr-3 text-[#B89B7A]" />
                  <div className="text-left">
                    <div className="font-medium text-[#432818]">Editar Resultados</div>
                    <div className="text-sm text-[#8B7355]">Personalizar página de resultados</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  onClick={() => handlePreviewModel('quiz-page')}
                  className="justify-start h-auto p-4 border-[#B89B7A]/30 hover:border-[#B89B7A]"
                >
                  <Eye className="w-5 h-5 mr-3 text-[#B89B7A]" />
                  <div className="text-left">
                    <div className="font-medium text-[#432818]">Preview Quiz</div>
                    <div className="text-sm text-[#8B7355]">Visualizar alterações</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  onClick={() => handleEditModel('landing-page')}
                  className="justify-start h-auto p-4 border-[#B89B7A]/30 hover:border-[#B89B7A]"
                >
                  <Plus className="w-5 h-5 mr-3 text-[#B89B7A]" />
                  <div className="text-left">
                    <div className="font-medium text-[#432818]">Nova Landing</div>
                    <div className="text-sm text-[#8B7355]">Criar página de captura</div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-4">
            <div className="grid gap-4">
              {predefinedModels.map((model) => (
                <Card key={model.id} className="border-[#B89B7A]/20">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-[#432818] flex items-center gap-2">
                          {model.name}
                          <Badge 
                            variant={model.status === 'active' ? 'default' : 'secondary'}
                            className={model.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {model.status === 'active' ? 'Ativo' : 'Rascunho'}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{model.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handlePreviewModel(model.id)}
                          className="border-[#B89B7A] text-[#432818]"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleEditModel(model.id)}
                          className="bg-[#B89B7A] text-white hover:bg-[#A38A69]"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-[#8B7355]">
                      Última modificação: {model.lastModified}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#432818]">Preview do Quiz</CardTitle>
                <CardDescription>
                  Visualização do quiz com conteúdo do Builder.io
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BuilderQuizEditor 
                  modelName="quiz-page"
                  className="border rounded-lg p-4"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#432818]">Preview da Página de Resultados</CardTitle>
                <CardDescription>
                  Visualização da página de resultados com dados do quiz
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BuilderResultEditor 
                  modelName="result-page"
                  quizResult={quizResult}
                  className="border rounded-lg p-4"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#432818]">Configurações do Builder.io</CardTitle>
                <CardDescription>
                  Configurações da integração e API key
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#432818]">API Key</label>
                    <div className="mt-1 p-2 bg-gray-100 rounded text-sm text-gray-600">
                      YJIGb4i01jvw0SRdL5Bt (Demo)
                    </div>
                    <p className="text-xs text-[#8B7355] mt-1">
                      Usando chave de demonstração. Substitua pela sua API key real.
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#432818]">Status da Conexão</label>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Conectado</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#B89B7A]/20">
                  <h4 className="font-medium text-[#432818] mb-2">Componentes Registrados</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">QuizQuestion</Badge>
                    <Badge variant="outline">CustomButton</Badge>
                    <Badge variant="outline">CustomCard</Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#B89B7A]/20">
                  <Button 
                    variant="outline"
                    onClick={() => window.open('https://builder.io/account/organization', '_blank')}
                    className="border-[#B89B7A] text-[#432818]"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configurações Avançadas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default BuilderDashboard;
