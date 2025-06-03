
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUniversalNavigation } from '@/hooks/useUniversalNavigation';
import { Save, Eye, RotateCcw } from 'lucide-react';
import { useResultPageConfig } from '@/hooks/useResultPageConfig';

interface EditorUltraSimplesProps {
  styleType: string;
}

const EditorUltraSimples: React.FC<EditorUltraSimplesProps> = ({ styleType }) => {
  const { navigate } = useUniversalNavigation();
  const { resultPageConfig, updateSection, saveConfig, loading } = useResultPageConfig(styleType);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !resultPageConfig) {
      console.warn('Configuração não carregada a tempo.');
    }
  }, [loading, resultPageConfig]);

  const handleInputChange = (section: string, field: string, value: any) => {
    updateSection(`${section}.${field}`, value);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveConfig();
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar as configurações:', error);
      alert('Erro ao salvar as configurações.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !resultPageConfig) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Editor Simplificado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="hero" className="space-y-4">
            <TabsList>
              <TabsTrigger value="hero">Hero Section</TabsTrigger>
              <TabsTrigger value="about">About Section</TabsTrigger>
            </TabsList>
            <TabsContent value="hero" className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={resultPageConfig.heroSection?.title || ''}
                  onChange={(e) => handleInputChange('heroSection', 'title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subtítulo</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={resultPageConfig.heroSection?.subtitle || ''}
                  onChange={(e) => handleInputChange('heroSection', 'subtitle', e.target.value)}
                />
              </div>
            </TabsContent>
            <TabsContent value="about" className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Título da Seção About</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={resultPageConfig.aboutSection?.title || ''}
                  onChange={(e) => handleInputChange('aboutSection', 'title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descrição da Seção About</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={resultPageConfig.aboutSection?.description || ''}
                  onChange={(e) => handleInputChange('aboutSection', 'description', e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/admin/editor')}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditorUltraSimples;
