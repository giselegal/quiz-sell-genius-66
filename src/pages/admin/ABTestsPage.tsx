import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Supondo que você tenha um componente Tabs

const ABTestsPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-[#432818] mb-6">
          Testes A/B
        </h1>
        <Tabs defaultValue="manager">
          <TabsList className="mb-4">
            <TabsTrigger value="manager">Gerenciador de Testes</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="info">Informações</TabsTrigger>
          </TabsList>
          <TabsContent value="manager">
            <p className="text-[#8F7A6A]">
              Área para gerenciar seus testes A/B. (Em construção)
            </p>
            <p className="text-[#8F7A6A] mt-2">Página A (Controle): /resultado</p>
            <p className="text-[#8F7A6A] mt-2">Página B (Variante): /quiz-descubra-seu-estilo</p>
          </TabsContent>
          <TabsContent value="settings">
            <p className="text-[#8F7A6A]">
              Área para configurar as opções dos Testes A/B. (Em construção)
            </p>
          </TabsContent>
          <TabsContent value="info">
            <p className="text-[#8F7A6A]">
              Os testes A/B são gerenciados via <code>localStorage</code> e pela ferramenta em 
              <a href="/tools-and-demos/ferramenta-abtest-prototipo.html" target="_blank" rel="noopener noreferrer" className="text-[#B89B7A] hover:underline ml-1">
                Ferramenta de Teste A/B (Protótipo)
              </a>.
            </p>
            <p className="text-[#8F7A6A] mt-2">Consulte o arquivo <code>guia-abtest-prototipo.md</code> para mais detalhes.</p>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ABTestsPage;
