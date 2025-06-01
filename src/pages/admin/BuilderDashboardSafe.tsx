// src/pages/admin/BuilderDashboardSafe.tsx
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, Settings, FileText, Zap, Plus, ExternalLink, CheckCircle } from 'lucide-react';

const BuilderDashboardSafe = () => {
  const [apiKeyStatus, setApiKeyStatus] = useState<'demo' | 'connected' | 'error'>('demo');

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#432818]">
              Builder.io Dashboard
            </h1>
            <p className="text-[#8F7A6A] mt-1">
              Editor visual e criação de páginas dinâmicas
            </p>
          </div>
          <Badge variant={apiKeyStatus === 'demo' ? 'secondary' : 'default'}>
            {apiKeyStatus === 'demo' ? 'Modo Demo' : 'Conectado'}
          </Badge>
        </div>

        <Alert className="mb-6">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Builder.io está configurado e pronto para uso. Atualmente usando API key demo para testes.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="templates">Modelos</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-[#B89B7A]" />
                    Ações Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Nova Página
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Editar Quiz
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar Mudanças
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status da Integração</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Key</span>
                      <Badge variant="secondary">Demo</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Componentes</span>
                      <Badge variant="default">3 Registrados</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Analytics</span>
                      <Badge variant="default">Ativo</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recursos Disponíveis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1 text-[#8F7A6A]">
                    <li>✅ Editor Visual Drag & Drop</li>
                    <li>✅ Componentes Customizados</li>
                    <li>✅ Preview em Tempo Real</li>
                    <li>✅ Analytics Integrado</li>
                    <li>✅ Templates Responsivos</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Modelos Disponíveis</CardTitle>
                <CardDescription>
                  Templates e componentes para uso no editor visual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">QuizQuestion</h4>
                    <p className="text-sm text-[#8F7A6A] mt-1">
                      Componente de pergunta do quiz
                    </p>
                    <Button size="sm" className="mt-2" variant="outline">
                      Usar Template
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">CustomButton</h4>
                    <p className="text-sm text-[#8F7A6A] mt-1">
                      Botão customizado com tracking
                    </p>
                    <Button size="sm" className="mt-2" variant="outline">
                      Usar Template
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">CustomCard</h4>
                    <p className="text-sm text-[#8F7A6A] mt-1">
                      Card personalizado responsivo
                    </p>
                    <Button size="sm" className="mt-2" variant="outline">
                      Usar Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview de Conteúdo</CardTitle>
                <CardDescription>
                  Visualize e teste seu conteúdo antes de publicar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <AlertDescription>
                      Para usar o preview, conecte-se ao Builder.io com uma API key válida.
                    </AlertDescription>
                  </Alert>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Abrir Editor Builder.io
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
                <CardDescription>
                  Configure sua integração com Builder.io
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">API Key</label>
                  <div className="mt-1 flex gap-2">
                    <div className="flex-1 p-2 border rounded bg-gray-50 text-sm">
                      YJIGb4i01jvw0SRdL5Bt (Demo)
                    </div>
                    <Button variant="outline" size="sm">
                      Alterar
                    </Button>
                  </div>
                  <p className="text-xs text-[#8F7A6A] mt-1">
                    Esta é uma API key demo. Para usar em produção, registre-se no Builder.io.
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Próximos Passos</h4>
                  <ul className="text-sm text-[#8F7A6A] space-y-1">
                    <li>1. Registre-se no <a href="https://builder.io" target="_blank" rel="noopener noreferrer" className="text-[#B89B7A] hover:underline">Builder.io</a></li>
                    <li>2. Obtenha sua API key</li>
                    <li>3. Substitua a API key demo</li>
                    <li>4. Comece a criar conteúdo visual</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default BuilderDashboardSafe;
