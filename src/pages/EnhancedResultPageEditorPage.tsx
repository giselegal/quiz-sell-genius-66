
import React, { useState, useEffect } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EnhancedResultPageEditorPage: React.FC = () => {
  const { questions, quizResult } = useQuiz();
  const [editableContent, setEditableContent] = useState({
    heroTitle: 'VOCÊ DESCOBRIU SEU ESTILO',
    heroSubtitle: 'Agora é hora de aplicar com clareza — e se vestir de você',
    heroImage: '',
    heroImage2: '',
    benefitsList: [
      'Looks com intenção e identidade',
      'Cores, modelagens e tecidos a seu favor',
      'Imagem alinhada aos seus objetivos',
      'Guarda-roupa funcional, sem compras por impulso'
    ]
  });

  const primaryStyle = quizResult?.primaryStyle?.category || 'Natural';
  const secondaryStyles = quizResult?.secondaryStyles?.map(s => s.category) || [];

  const updateContent = (field: string, value: any) => {
    setEditableContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Editor de Página de Resultado</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="hero" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="hero">Hero Section</TabsTrigger>
                <TabsTrigger value="style">Estilo Principal</TabsTrigger>
                <TabsTrigger value="benefits">Benefícios</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="hero" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="heroTitle">Título Principal</Label>
                  <Textarea
                    id="heroTitle"
                    rows={2}
                    value={editableContent.heroTitle}
                    onChange={(e) => updateContent('heroTitle', e.target.value)}
                    placeholder="VOCÊ DESCOBRIU SEU ESTILO"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="heroSubtitle">Subtítulo</Label>
                  <Textarea
                    id="heroSubtitle"
                    rows={2}
                    value={editableContent.heroSubtitle}
                    onChange={(e) => updateContent('heroSubtitle', e.target.value)}
                    placeholder="Agora é hora de aplicar com clareza — e se vestir de você"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="heroImage">Imagem Principal (URL)</Label>
                  <Input
                    id="heroImage"
                    value={editableContent.heroImage}
                    onChange={(e) => updateContent('heroImage', e.target.value)}
                    placeholder="URL da imagem principal"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="heroImage2">Imagem Secundária (URL)</Label>
                  <Input
                    id="heroImage2"
                    value={editableContent.heroImage2}
                    onChange={(e) => updateContent('heroImage2', e.target.value)}
                    placeholder="URL da imagem secundária"
                  />
                </div>
              </TabsContent>

              <TabsContent value="style" className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Estilo Detectado</h3>
                  <p><strong>Principal:</strong> {primaryStyle}</p>
                  <p><strong>Secundários:</strong> {secondaryStyles.join(', ')}</p>
                </div>
              </TabsContent>

              <TabsContent value="benefits" className="space-y-4">
                <div className="space-y-2">
                  <Label>Lista de Benefícios</Label>
                  {editableContent.benefitsList.map((benefit, index) => (
                    <Input
                      key={index}
                      value={benefit}
                      onChange={(e) => {
                        const newList = [...editableContent.benefitsList];
                        newList[index] = e.target.value;
                        updateContent('benefitsList', newList);
                      }}
                      placeholder={`Benefício ${index + 1}`}
                    />
                  ))}
                  <Button
                    onClick={() => updateContent('benefitsList', [...editableContent.benefitsList, 'Novo benefício'])}
                    variant="outline"
                    size="sm"
                  >
                    Adicionar Benefício
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="space-y-4">
                <div className="p-6 bg-white rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#432818] mb-2">
                      {editableContent.heroTitle}
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                      {editableContent.heroSubtitle}
                    </p>
                    
                    <div className="bg-[#B89B7A] text-white p-4 rounded-lg mb-4">
                      <h2 className="text-xl font-semibold">Seu Estilo: {primaryStyle}</h2>
                    </div>
                    
                    <div className="text-left max-w-md mx-auto">
                      <h3 className="font-semibold mb-2">Benefícios:</h3>
                      <ul className="space-y-1">
                        {editableContent.benefitsList.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedResultPageEditorPage;
