
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, FileText, Users, Settings } from 'lucide-react';

interface EnhancedEditorDashboardProps {
  onNavigateToEditor: () => void;
}

export const EnhancedEditorDashboard: React.FC<EnhancedEditorDashboardProps> = ({
  onNavigateToEditor
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="h-full p-6 bg-[#FAF9F7]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#432818] mb-2">Dashboard do Editor</h1>
          <p className="text-[#8F7A6A]">Gerencie seus projetos e conteúdo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#B89B7A]/10 rounded-lg">
                <FileText className="w-6 h-6 text-[#B89B7A]" />
              </div>
              <div>
                <p className="text-sm text-[#8F7A6A]">Páginas Criadas</p>
                <p className="text-2xl font-bold text-[#432818]">12</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#B89B7A]/10 rounded-lg">
                <Users className="w-6 h-6 text-[#B89B7A]" />
              </div>
              <div>
                <p className="text-sm text-[#8F7A6A]">Visitantes</p>
                <p className="text-2xl font-bold text-[#432818]">1,234</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#B89B7A]/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-[#B89B7A]" />
              </div>
              <div>
                <p className="text-sm text-[#8F7A6A]">Conversões</p>
                <p className="text-2xl font-bold text-[#432818]">45</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#B89B7A]/10 rounded-lg">
                <Settings className="w-6 h-6 text-[#B89B7A]" />
              </div>
              <div>
                <p className="text-sm text-[#8F7A6A]">Templates</p>
                <p className="text-2xl font-bold text-[#432818]">8</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="projects">Projetos</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-[#432818] mb-4">Ações Rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={onNavigateToEditor} className="bg-[#B89B7A] hover:bg-[#8F7A6A]">
                  Criar Nova Página
                </Button>
                <Button variant="outline">Importar Template</Button>
                <Button variant="outline">Ver Relatórios</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-[#432818] mb-4">Projetos Recentes</h3>
              <p className="text-[#8F7A6A]">Nenhum projeto encontrado.</p>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-[#432818] mb-4">Templates Disponíveis</h3>
              <p className="text-[#8F7A6A]">Templates serão listados aqui.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
