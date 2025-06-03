import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, X, Trash } from 'lucide-react';
import { Block } from '@/types/editor';

interface AntesDepoisTransformacaoBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const AntesDepoisTransformacaoBlockEditor: React.FC<AntesDepoisTransformacaoBlockEditorProps> = ({ 
  block, 
  onUpdate 
}) => {
  const content = block.content || {};
  const [newBenefit, setNewBenefit] = useState('');
  const [newTransformation, setNewTransformation] = useState({
    image: '',
    name: '',
    width: 600,
    height: 750
  });

  // Dados padrão
  const defaultTransformations = [
    {
      image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745519979/Captura_de_tela_2025-03-31_034324_pmdn8y.webp",
      name: "Adriana",
      id: "transformation-adriana",
      width: 600,
      height: 750
    }, 
    {
      image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_85,w_600/v1745522326/Captura_de_tela_2025-03-31_034324_cpugfj.webp",
      name: "Mariangela", 
      id: "transformation-mariangela",
      width: 600,
      height: 750
    }
  ];

  const defaultBenefits = [
    "Looks que expressam sua verdadeira essência",
    "Cores e modelagens que realçam sua beleza natural",
    "Imagem profissional alinhada aos seus objetivos",
    "Guarda-roupa inteligente e sem desperdícios"
  ];

  const transformations = content.transformations || defaultTransformations;
  const benefits = content.benefits || defaultBenefits;

  // Funções para gerenciar transformações
  const handleAddTransformation = () => {
    if (newTransformation.image && newTransformation.name) {
      const transformation = {
        ...newTransformation,
        id: `transformation-${Date.now()}`
      };
      
      onUpdate({
        ...content,
        transformations: [...transformations, transformation]
      });
      
      setNewTransformation({
        image: '',
        name: '',
        width: 600,
        height: 750
      });
    }
  };

  const handleUpdateTransformation = (index: number, field: string, value: any) => {
    const updatedTransformations = [...transformations];
    updatedTransformations[index] = {
      ...updatedTransformations[index],
      [field]: value
    };
    
    onUpdate({
      ...content,
      transformations: updatedTransformations
    });
  };

  const handleRemoveTransformation = (index: number) => {
    const updatedTransformations = transformations.filter((_, i) => i !== index);
    onUpdate({
      ...content,
      transformations: updatedTransformations
    });
  };

  // Funções para gerenciar benefícios
  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      onUpdate({
        ...content,
        benefits: [...benefits, newBenefit.trim()]
      });
      setNewBenefit('');
    }
  };

  const handleUpdateBenefit = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index] = value;
    
    onUpdate({
      ...content,
      benefits: updatedBenefits
    });
  };

  const handleRemoveBenefit = (index: number) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    onUpdate({
      ...content,
      benefits: updatedBenefits
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddBenefit();
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="transformations">Transformações</TabsTrigger>
          <TabsTrigger value="benefits">Benefícios</TabsTrigger>
          <TabsTrigger value="cta">CTA</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={content.title || ''}
              onChange={(e) => onUpdate({ ...content, title: e.target.value })}
              placeholder="Transformações Que Inspiram"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Input
              id="subtitle"
              value={content.subtitle || ''}
              onChange={(e) => onUpdate({ ...content, subtitle: e.target.value })}
              placeholder="Mulheres que Aprenderam e Praticam no dia a dia Seu Estilo de Ser"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              rows={3}
              value={content.description || ''}
              onChange={(e) => onUpdate({ ...content, description: e.target.value })}
              placeholder="Seu estilo é muito mais que roupas — é a expressão da sua personalidade e o reflexo dos seus sonhos e objetivos."
            />
          </div>
        </TabsContent>

        <TabsContent value="transformations" className="space-y-4 mt-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Transformações Existentes</h3>
            {transformations.map((transformation, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Transformação {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveTransformation(index)}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Nome da Pessoa</Label>
                    <Input
                      value={transformation.name}
                      onChange={(e) => handleUpdateTransformation(index, 'name', e.target.value)}
                      placeholder="Nome da transformação"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>URL da Imagem</Label>
                    <Input
                      value={transformation.image}
                      onChange={(e) => handleUpdateTransformation(index, 'image', e.target.value)}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label>Largura</Label>
                      <Input
                        type="number"
                        value={transformation.width}
                        onChange={(e) => handleUpdateTransformation(index, 'width', parseInt(e.target.value))}
                        placeholder="600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Altura</Label>
                      <Input
                        type="number"
                        value={transformation.height}
                        onChange={(e) => handleUpdateTransformation(index, 'height', parseInt(e.target.value))}
                        placeholder="750"
                      />
                    </div>
                  </div>
                  
                  {transformation.image && (
                    <div className="mt-2">
                      <img 
                        src={transformation.image} 
                        alt={transformation.name}
                        className="w-16 h-20 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-4">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-sm">Adicionar Nova Transformação</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              <div className="space-y-2">
                <Label>Nome da Pessoa</Label>
                <Input
                  value={newTransformation.name}
                  onChange={(e) => setNewTransformation({ ...newTransformation, name: e.target.value })}
                  placeholder="Nome da transformação"
                />
              </div>
              
              <div className="space-y-2">
                <Label>URL da Imagem</Label>
                <Input
                  value={newTransformation.image}
                  onChange={(e) => setNewTransformation({ ...newTransformation, image: e.target.value })}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Largura</Label>
                  <Input
                    type="number"
                    value={newTransformation.width}
                    onChange={(e) => setNewTransformation({ ...newTransformation, width: parseInt(e.target.value) })}
                    placeholder="600"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Altura</Label>
                  <Input
                    type="number"
                    value={newTransformation.height}
                    onChange={(e) => setNewTransformation({ ...newTransformation, height: parseInt(e.target.value) })}
                    placeholder="750"
                  />
                </div>
              </div>
              
              <Button 
                type="button" 
                onClick={handleAddTransformation}
                className="w-full"
                disabled={!newTransformation.image || !newTransformation.name}
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Transformação
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-4 mt-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Benefícios</h3>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  value={benefit}
                  onChange={(e) => handleUpdateBenefit(index, e.target.value)}
                  placeholder="Benefício"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveBenefit(index)}
                  className="h-8 w-8 text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Adicionar novo benefício"
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <Button type="button" onClick={handleAddBenefit}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="cta" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="ctaText">Texto do Botão</Label>
            <Input
              id="ctaText"
              value={content.ctaText || ''}
              onChange={(e) => onUpdate({ ...content, ctaText: e.target.value })}
              placeholder="Quero Meu Guia de Estilo"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ctaUrl">URL do Botão</Label>
            <Input
              id="ctaUrl"
              value={content.ctaUrl || ''}
              onChange={(e) => onUpdate({ ...content, ctaUrl: e.target.value })}
              placeholder="https://pay.hotmart.com/..."
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-[#8F7A6A]">
          <strong>Nota:</strong> Este componente exibe transformações em formato carrossel com navegação automática.
          Personalize o conteúdo, imagens e benefícios conforme necessário.
        </p>
      </div>
    </div>
  );
};

export default AntesDepoisTransformacaoBlockEditor;
