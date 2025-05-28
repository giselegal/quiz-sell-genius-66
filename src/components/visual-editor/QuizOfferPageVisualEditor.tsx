
"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Save } from 'lucide-react';
import QuizOfferPageEditable from './QuizOfferPageEditable';

interface QuizOfferPageVisualEditorProps {
  onSave?: (data: any) => void;
}

const QuizOfferPageVisualEditor: React.FC<QuizOfferPageVisualEditorProps> = ({ onSave }) => {
  const [isPreview, setIsPreview] = useState(false);
  const [data, setData] = useState({
    heroTitle: 'Descubra Seu Estilo Único',
    heroSubtitle: 'Um quiz personalizado para descobrir qual estilo combina com você',
    heroCtaText: 'Fazer Quiz Agora',
    ctaUrl: '#',
    heroImage: '/lovable-uploads/hero-image.jpg',
    backgroundColor: '#FAF9F7',
    textColor: '#432818',
    primaryColor: '#B89B7A',
    secondaryColor: '#8F7A6A',
    accentColor: '#6B4F43',
    containerMaxWidth: 'max-w-6xl',
    sectionPadding: 'py-12',
    showActiveUsers: true,
    showCountdown: true,
  });

  const handleSave = () => {
    onSave?.(data);
  };

  const updateData = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  if (isPreview) {
    return (
      <div className="h-full">
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Pré-visualização</h2>
          <Button onClick={() => setIsPreview(false)} variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Voltar ao Editor
          </Button>
        </div>
        <QuizOfferPageEditable data={data} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Editor de Página de Oferta</h2>
        <div className="flex gap-2">
          <Button onClick={() => setIsPreview(true)} variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Visualizar
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <div>
              <label className="text-sm font-medium">Título Principal</label>
              <Input
                value={data.heroTitle}
                onChange={(e) => updateData('heroTitle', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subtítulo</label>
              <Textarea
                value={data.heroSubtitle}
                onChange={(e) => updateData('heroSubtitle', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Texto do Botão</label>
              <Input
                value={data.heroCtaText}
                onChange={(e) => updateData('heroCtaText', e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="design" className="space-y-4">
            <div>
              <label className="text-sm font-medium">Cor Primária</label>
              <Input
                type="color"
                value={data.primaryColor}
                onChange={(e) => updateData('primaryColor', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Cor Secundária</label>
              <Input
                type="color"
                value={data.secondaryColor}
                onChange={(e) => updateData('secondaryColor', e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.showCountdown}
                  onChange={(e) => updateData('showCountdown', e.target.checked)}
                />
                Mostrar Contador
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.showActiveUsers}
                  onChange={(e) => updateData('showActiveUsers', e.target.checked)}
                />
                Mostrar Usuários Ativos
              </label>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QuizOfferPageVisualEditor;
