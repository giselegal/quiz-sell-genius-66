// Importando configuração estática
export { dynamic } from './static';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Edit3, 
  Eye, 
  Settings, 
  BarChart3, 
  Users, 
  Link2, 
  Download,
  Palette,
  FileText,
  ShoppingCart,
  Target
} from 'lucide-react';
import Link from 'next/link';

interface QuizDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// @ts-ignore - Ignorando conflito de tipos com o sistema do Next.js
export default async function QuizDetailPage({ params }: QuizDetailPageProps) {
  const { id } = await params;
  return (
    <div className="container mx-auto py-6">
      {/* Header com ações rápidas */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Meu Quiz Incrível</h1>
          <p className="text-gray-600">Criado em 15 de Nov, 2024</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Publicado
          </Badge>
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Visualizar
          </Button>
          <Button>
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Cards de estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Visualizações</p>
              <p className="text-2xl font-bold">2,847</p>
            </div>
            <Eye className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conclusões</p>
              <p className="text-2xl font-bold">1,923</p>
            </div>
            <Target className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Leads</p>
              <p className="text-2xl font-bold">1,456</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversões</p>
              <p className="text-2xl font-bold">187</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Editor Visual - Seção Principal */}
      <Card className="mb-8">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-2">🎨 Editor Visual</h2>
          <p className="text-gray-600">
            Crie e edite seu quiz, páginas de resultado e ofertas com nosso editor visual avançado
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Quiz Editor */}
            <Card className="border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">📝 Editor de Quiz</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Crie perguntas interativas e personalize o layout
                </p>
                <Link href={`/quiz/${params.id}/edit?tab=quiz`}>
                  <Button className="w-full">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Editar Quiz
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Result Editor */}
            <Card className="border-2 border-dashed border-green-200 hover:border-green-400 transition-colors">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">🎯 Editor de Resultado</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Personalize as páginas de resultado do quiz
                </p>
                <Link href={`/quiz/${params.id}/edit?tab=result`}>
                  <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50">
                    <Palette className="w-4 h-4 mr-2" />
                    Editar Resultado
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Offer Editor */}
            <Card className="border-2 border-dashed border-orange-200 hover:border-orange-400 transition-colors">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">💰 Editor de Oferta</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Crie páginas de venda e ofertas especiais
                </p>
                <Link href={`/quiz/${params.id}/edit?tab=offer`}>
                  <Button variant="outline" className="w-full border-orange-300 text-orange-700 hover:bg-orange-50">
                    <Settings className="w-4 h-4 mr-2" />
                    Editar Oferta
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Editor Completo */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-1">🚀 Editor Completo</h3>
                <p className="text-gray-600 text-sm">
                  Acesse todas as funcionalidades em uma única interface
                </p>
              </div>
              <Link href={`/quiz/${params.id}/edit`}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Palette className="w-5 h-5 mr-2" />
                  Abrir Editor Visual
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs para outras configurações */}
      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="settings">⚙️ Configurações</TabsTrigger>
          <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
          <TabsTrigger value="integrations">🔗 Integrações</TabsTrigger>
          <TabsTrigger value="share">📤 Compartilhar</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Configurações Gerais</h3>
            {/* ...existing settings content... */}
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Analytics Detalhado</h3>
            {/* ...existing analytics content... */}
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Integrações</h3>
            {/* ...existing integrations content... */}
          </Card>
        </TabsContent>

        <TabsContent value="share">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Compartilhar Quiz</h3>
            {/* ...existing share content... */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}