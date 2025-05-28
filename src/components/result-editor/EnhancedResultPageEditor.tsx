"use client";
import React, { useState, useEffect } from 'react';
import { StyleResult } from '@/types/quiz';
import { QuizFunnel, ResultPage, ResultPageBlock, CTABlock, TestimonialBlock } from '@/types/quizResult';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { styleConfig } from '@/config/styleConfig';
import { toast } from '@/components/ui/use-toast';
import { Save, EyeIcon, Trash2, MoveUp, MoveDown, ImageIcon, Edit, CheckCircle, Settings, Palette, PanelLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Propriedades do componente editor
interface EnhancedResultPageEditorProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  initialFunnel?: QuizFunnel;
  onSave: (funnel: QuizFunnel) => void;
}

// Componente principal do editor
export const EnhancedResultPageEditor: React.FC<EnhancedResultPageEditorProps> = ({
  primaryStyle,
  secondaryStyles,
  initialFunnel,
  onSave
}) => {
  // Estado para armazenar a página de resultados atual
  const [resultPage, setResultPage] = useState<ResultPage>(() => ({
    title: 'Resultados do seu estilo',
    blocks: [
      {
        id: `block_title_${Date.now()}`,
        type: 'title',
        content: 'Vista-se de Você — na Prática',
        order: 0,
        isVisible: true
      },
      {
        id: `block_text_${Date.now()}_1`,
        type: 'text',
        content: 'Agora que você conhece seu estilo, é hora de aplicá-lo com clareza e intenção. O Guia da Gisele Galvão foi criado para mulheres como você — que querem se vestir com autenticidade e transformar sua imagem em ferramenta de poder.',
        order: 1,
        isVisible: true
      },
      {
        id: `block_styleResult_${Date.now()}`,
        type: 'styleResult',
        content: 'Seu estilo predominante',
        order: 2,
        isVisible: true,
        settings: {
          styleCategory: primaryStyle.category,
          percentage: primaryStyle.percentage,
          description: styleConfig[primaryStyle.category as keyof typeof styleConfig]?.description || ''
        }
      },
      {
        id: `block_testimonial_${Date.now()}_1`,
        type: 'testimonial',
        content: 'O guia mudou completamente minha relação com as roupas. Agora sei exatamente o que comprar e como montar looks incríveis!',
        order: 3,
        isVisible: true,
        settings: {
          author: 'Maria Silva',
          authorImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/testimonial1.jpg'
        }
      },
      {
        id: `block_testimonial_${Date.now()}_2`,
        type: 'testimonial',
        content: 'Depois de entender meu estilo predominante, parei de gastar dinheiro com peças que não tinham nada a ver comigo.',
        order: 4,
        isVisible: true,
        settings: {
          author: 'Ana Oliveira',
          authorImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/testimonial2.jpg'
        }
      },
      {
        id: `block_cta_${Date.now()}_1`,
        type: 'cta',
        content: 'Botão de ação principal',
        order: 5,
        isVisible: true,
        settings: {
          buttonText: 'Quero meu Guia de Estilo Agora',
          url: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
          backgroundColor: '#4CAF50',
          textColor: '#FFFFFF'
        }
      },
      {
        id: `block_guarantee_${Date.now()}`,
        type: 'guarantee',
        content: 'Experimente por 7 dias sem risco. Se não ficar satisfeito, devolveremos 100% do seu dinheiro.',
        order: 6,
        isVisible: true
      }
    ],
    settings: {
      backgroundColor: '#fffaf7',
      primaryColor: '#aa6b5d',
      secondaryColor: '#B89B7A',
      fontFamily: 'inherit',
      showSecondaryStyles: true
    }
  }));
  
  // Estado para controlar o painel ativo (blocos, configurações ou estilos)
  const [activePanel, setActivePanel] = useState<'blocks' | 'settings' | 'styles'>('blocks');
  // Estado para ativar/desativar a pré-visualização
  const [previewMode, setPreviewMode] = useState(false);

  // Função para adicionar um novo bloco
  const addBlock = (type: ResultPageBlock['type']) => {
    const newBlock: ResultPageBlock = {
      id: `block_${type}_${Date.now()}`,
      type,
      content: getDefaultContent(type),
      order: resultPage.blocks.length,
      isVisible: true,
      settings: getDefaultSettings(type)
    };

    setResultPage(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock]
    }));
  };

  // Função para obter conteúdo padrão baseado no tipo do bloco
  const getDefaultContent = (type: ResultPageBlock['type']): string => {
    switch (type) {
      case 'title': return 'Novo Título';
      case 'text': return 'Novo texto explicativo...';
      case 'cta': return 'Novo botão de ação';
      case 'testimonial': return 'Novo depoimento...';
      case 'guarantee': return 'Nova garantia...';
      case 'styleResult': return 'Resultado do estilo';
      default: return 'Novo conteúdo';
    }
  };

  // Função para obter configurações padrão baseadas no tipo do bloco
  const getDefaultSettings = (type: ResultPageBlock['type']) => {
    switch (type) {
      case 'cta':
        return {
          buttonText: 'Clique aqui',
          url: '#',
          backgroundColor: '#4CAF50',
          textColor: '#FFFFFF'
        };
      case 'testimonial':
        return {
          author: 'Nome do cliente',
          authorImage: ''
        };
      case 'styleResult':
        return {
          styleCategory: primaryStyle.category,
          percentage: primaryStyle.percentage,
          description: styleConfig[primaryStyle.category as keyof typeof styleConfig]?.description || ''
        };
      default:
        return {};
    }
  };

  // Função para atualizar um bloco específico
  const updateBlock = (blockId: string, updates: Partial<ResultPageBlock>) => {
    setResultPage(prev => ({
      ...prev,
      blocks: prev.blocks.map(block =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    }));
  };

  // Função para remover um bloco
  const removeBlock = (blockId: string) => {
    setResultPage(prev => ({
      ...prev,
      blocks: prev.blocks.filter(block => block.id !== blockId)
    }));
  };

  // Função para mover um bloco para cima
  const moveBlockUp = (blockId: string) => {
    setResultPage(prev => {
      const blocks = [...prev.blocks];
      const index = blocks.findIndex(block => block.id === blockId);
      if (index > 0) {
        [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]];
        // Atualizar a ordem
        blocks.forEach((block, i) => {
          block.order = i;
        });
      }
      return { ...prev, blocks };
    });
  };

  // Função para mover um bloco para baixo
  const moveBlockDown = (blockId: string) => {
    setResultPage(prev => {
      const blocks = [...prev.blocks];
      const index = blocks.findIndex(block => block.id === blockId);
      if (index < blocks.length - 1) {
        [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
        // Atualizar a ordem
        blocks.forEach((block, i) => {
          block.order = i;
        });
      }
      return { ...prev, blocks };
    });
  };

  // Função para salvar as alterações
  const handleSave = () => {
    const funnel: QuizFunnel = {
      name: initialFunnel?.name || 'Quiz Funil',
      quizQuestions: initialFunnel?.quizQuestions || [],
      resultPage,
      createdAt: initialFunnel?.createdAt || new Date(),
      updatedAt: new Date()
    };

    onSave(funnel);
    toast({
      title: "Alterações salvas",
      description: "A página de resultados foi atualizada com sucesso.",
    });
  };

  // Função para renderizar o painel de blocos
  const renderBlocksPanel = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Blocos da Página</h3>
        <div className="flex gap-2">
          <Button onClick={() => addBlock('title')} variant="outline" size="sm">+ Título</Button>
          <Button onClick={() => addBlock('text')} variant="outline" size="sm">+ Texto</Button>
          <Button onClick={() => addBlock('cta')} variant="outline" size="sm">+ CTA</Button>
          <Button onClick={() => addBlock('testimonial')} variant="outline" size="sm">+ Depoimento</Button>
        </div>
      </div>

      <div className="space-y-2">
        {resultPage.blocks
          .sort((a, b) => a.order - b.order)
          .map((block, index) => (
            <Card key={block.id} className={`${block.isVisible ? 'border-green-200' : 'border-gray-200 opacity-50'}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={block.isVisible}
                      onCheckedChange={(checked) => updateBlock(block.id, { isVisible: checked })}
                    />
                    <span className="text-sm font-medium capitalize">{block.type}</span>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveBlockUp(block.id)}
                      disabled={index === 0}
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveBlockDown(block.id)}
                      disabled={index === resultPage.blocks.length - 1}
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBlock(block.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`content-${block.id}`}>Conteúdo</Label>
                  <Textarea
                    id={`content-${block.id}`}
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                    className="min-h-[60px]"
                  />

                  {/* Configurações específicas por tipo de bloco */}
                  {block.type === 'cta' && block.settings && (
                    <div className="space-y-2 mt-2">
                      <Label htmlFor={`buttonText-${block.id}`}>Texto do Botão</Label>
                      <Input
                        id={`buttonText-${block.id}`}
                        value={block.settings.buttonText || ''}
                        onChange={(e) => updateBlock(block.id, {
                          settings: { ...block.settings, buttonText: e.target.value }
                        })}
                      />
                      <Label htmlFor={`url-${block.id}`}>URL</Label>
                      <Input
                        id={`url-${block.id}`}
                        value={block.settings.url || ''}
                        onChange={(e) => updateBlock(block.id, {
                          settings: { ...block.settings, url: e.target.value }
                        })}
                      />
                    </div>
                  )}

                  {block.type === 'testimonial' && block.settings && (
                    <div className="space-y-2 mt-2">
                      <Label htmlFor={`author-${block.id}`}>Nome do Autor</Label>
                      <Input
                        id={`author-${block.id}`}
                        value={block.settings.author || ''}
                        onChange={(e) => updateBlock(block.id, {
                          settings: { ...block.settings, author: e.target.value }
                        })}
                      />
                      <Label htmlFor={`authorImage-${block.id}`}>URL da Imagem</Label>
                      <Input
                        id={`authorImage-${block.id}`}
                        value={block.settings.authorImage || ''}
                        onChange={(e) => updateBlock(block.id, {
                          settings: { ...block.settings, authorImage: e.target.value }
                        })}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );

  // Função para renderizar o painel de configurações
  const renderSettingsPanel = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Configurações da Página</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="pageTitle">Título da Página</Label>
          <Input
            id="pageTitle"
            value={resultPage.title}
            onChange={(e) => setResultPage(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="backgroundColor">Cor de Fundo</Label>
          <Input
            id="backgroundColor"
            type="color"
            value={resultPage.settings.backgroundColor}
            onChange={(e) => setResultPage(prev => ({
              ...prev,
              settings: { ...prev.settings, backgroundColor: e.target.value }
            }))}
          />
        </div>

        <div>
          <Label htmlFor="primaryColor">Cor Primária</Label>
          <Input
            id="primaryColor"
            type="color"
            value={resultPage.settings.primaryColor}
            onChange={(e) => setResultPage(prev => ({
              ...prev,
              settings: { ...prev.settings, primaryColor: e.target.value }
            }))}
          />
        </div>

        <div>
          <Label htmlFor="secondaryColor">Cor Secundária</Label>
          <Input
            id="secondaryColor"
            type="color"
            value={resultPage.settings.secondaryColor}
            onChange={(e) => setResultPage(prev => ({
              ...prev,
              settings: { ...prev.settings, secondaryColor: e.target.value }
            }))}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="showSecondaryStyles"
            checked={resultPage.settings.showSecondaryStyles}
            onCheckedChange={(checked) => setResultPage(prev => ({
              ...prev,
              settings: { ...prev.settings, showSecondaryStyles: checked }
            }))}
          />
          <Label htmlFor="showSecondaryStyles">Mostrar estilos secundários</Label>
        </div>
      </div>
    </div>
  );

  // Função para renderizar o painel de estilos
  const renderStylesPanel = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Estilos Detectados</h3>
      
      <div className="space-y-2">
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <span className="font-medium text-green-800">Estilo Primário</span>
            <span className="text-green-600">{primaryStyle.percentage}%</span>
          </div>
          <p className="text-sm text-green-700 mt-1">{primaryStyle.category}</p>
        </div>

        {secondaryStyles.map((style, index) => (
          <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="font-medium text-blue-800">Estilo Secundário</span>
              <span className="text-blue-600">{style.percentage}%</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">{style.category}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Função para renderizar a pré-visualização
  const renderPreview = () => (
    <div 
      className="min-h-full p-8"
      style={{ 
        backgroundColor: resultPage.settings.backgroundColor,
        fontFamily: resultPage.settings.fontFamily 
      }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {resultPage.blocks
          .filter(block => block.isVisible)
          .sort((a, b) => a.order - b.order)
          .map((block) => (
            <div key={block.id}>
              {block.type === 'title' && (
                <h1 
                  className="text-4xl font-bold text-center mb-8"
                  style={{ color: resultPage.settings.primaryColor }}
                >
                  {block.content}
                </h1>
              )}

              {block.type === 'text' && (
                <p className="text-lg text-gray-700 leading-relaxed">
                  {block.content}
                </p>
              )}

              {block.type === 'styleResult' && (
                <div className="bg-white p-6 rounded-lg shadow-md border">
                  <h3 className="text-2xl font-semibold mb-4" style={{ color: resultPage.settings.primaryColor }}>
                    Seu Estilo Predominante
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-bold" style={{ color: resultPage.settings.secondaryColor }}>
                      {primaryStyle.percentage}%
                    </div>
                    <div>
                      <div className="text-xl font-medium">{primaryStyle.category}</div>
                      <div className="text-gray-600">
                        {styleConfig[primaryStyle.category as keyof typeof styleConfig]?.description || ''}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {block.type === 'cta' && block.settings && (
                <div className="text-center">
                  <a
                    href={block.settings.url}
                    className="inline-block px-8 py-4 text-xl font-semibold rounded-lg transition-all hover:opacity-90"
                    style={{
                      backgroundColor: block.settings.backgroundColor,
                      color: block.settings.textColor
                    }}
                  >
                    {block.settings.buttonText}
                  </a>
                </div>
              )}

              {block.type === 'testimonial' && block.settings && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-lg italic mb-4">"{block.content}"</p>
                  <div className="flex items-center space-x-3">
                    {block.settings.authorImage && (
                      <img
                        src={block.settings.authorImage}
                        alt={block.settings.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium">{block.settings.author}</div>
                    </div>
                  </div>
                </div>
              )}

              {block.type === 'guarantee' && (
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <p className="text-green-800 font-medium">{block.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-white grid grid-cols-5">
      {/* Sidebar de controle */}
      <div className="col-span-2 border-r border-gray-200 flex flex-col">
        {/* Header com controles principais */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Editor de Resultados</h2>
            <div className="flex space-x-2">
              <Button onClick={handleSave} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
              >
                <EyeIcon className="h-4 w-4 mr-2" />
                {previewMode ? 'Editar' : 'Visualizar'}
              </Button>
            </div>
          </div>

          {/* Navegação entre painéis */}
          <div className="flex space-x-1">
            <Button
              variant={activePanel === 'blocks' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActivePanel('blocks')}
            >
              <PanelLeft className="h-4 w-4 mr-2" />
              Blocos
            </Button>
            <Button
              variant={activePanel === 'settings' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActivePanel('settings')}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
            <Button
              variant={activePanel === 'styles' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActivePanel('styles')}
            >
              <Palette className="h-4 w-4 mr-2" />
              Estilos
            </Button>
          </div>
        </div>

        {/* Conteúdo do painel */}
        <ScrollArea className="flex-1">
          <div className="p-4">
            {activePanel === 'blocks' && renderBlocksPanel()}
            {activePanel === 'settings' && renderSettingsPanel()}
            {activePanel === 'styles' && renderStylesPanel()}
          </div>
        </ScrollArea>
      </div>

      {/* Painel de pré-visualização */}
      <div className="col-span-3 bg-gray-50 overflow-auto">
        {renderPreview()}
      </div>
    </div>
  );
};
