import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from './ComponentsSidebar';
import { DraggableBlockList } from './DraggableBlockList';
import { ResultPageBlockEditor } from './ResultPageBlockEditor';
import { ResultPageDuplicator } from './ResultPageDuplicator';
import { EditorToolbar } from './EditorToolbar';
import { GlobalStylesEditor } from './GlobalStylesEditor';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { useBlockOperations } from '@/hooks/editor/useBlockOperations';
import { Block, BlockType } from '@/types/editor';
import { ResultPageBlock, QuizFunnel, ResultPage } from '@/types/quizResult';
import { StyleResult } from '@/types/quiz';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { generateId } from '@/utils/idGenerator';
import { EditorPreview } from './EditorPreview';

interface EnhancedResultPageEditorProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  initialFunnel?: QuizFunnel;
  onSave?: (funnel: QuizFunnel) => void;
}

export const EnhancedResultPageEditor: React.FC<EnhancedResultPageEditorProps> = ({
  primaryStyle,
  secondaryStyles,
  initialFunnel,
  onSave
}) => {
  // Estado para o funil atual
  const [currentFunnel, setCurrentFunnel] = useState<QuizFunnel>(
    initialFunnel || {
      id: generateId(),
      name: 'Novo Funil',
      quizQuestions: [],
      resultPage: {
        id: generateId(),
        title: 'Página de Resultados',
        blocks: [],
        settings: {
          backgroundColor: '#ffffff',
          fontFamily: 'Inter, sans-serif',
          primaryColor: '#432818',
          secondaryColor: '#B89B7A',
          showSecondaryStyles: true,
          abTestEnabled: false,
          abTestVariants: []
        }
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }
  );

  // Estados do editor
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isGlobalStylesOpen, setIsGlobalStylesOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');

  // Converter blocos entre os formatos do editor e da página de resultados
  const convertToEditorBlocks = (resultBlocks: ResultPageBlock[]): Block[] => {
    return resultBlocks.map((block, index) => ({
      id: block.id,
      type: block.type as BlockType,
      order: block.order || index,
      content: {
        text: block.content,
        imageUrl: block.imageUrl,
        // Adicionar propriedades específicas para cada tipo de bloco
        ...(block.type === 'styleResult' && {
          styleCategory: (block as any).styleCategory,
          percentage: (block as any).percentage,
          description: (block as any).description
        }),
        ...(block.type === 'cta' && {
          buttonText: (block as any).buttonText,
          url: (block as any).url,
          backgroundColor: (block as any).backgroundColor,
          textColor: (block as any).textColor
        }),
        ...(block.type === 'testimonial' && {
          author: (block as any).author,
          authorImage: (block as any).authorImage,
          rating: (block as any).rating
        }),
        ...(block.type === 'carousel' && {
          items: (block as any).items
        })
      }
    }));
  };

  const convertToResultBlocks = (editorBlocks: Block[]): ResultPageBlock[] => {
    return editorBlocks.map((block, index) => {
      const baseBlock: ResultPageBlock = {
        id: block.id,
        type: block.type as any,
        content: block.content.text || '',
        imageUrl: block.content.imageUrl,
        order: block.order || index,
        settings: {},
        isVisible: true
      };

      // Adicionar propriedades específicas para cada tipo de bloco
      switch (block.type) {
        case 'style-result':
          return {
            ...baseBlock,
            type: 'styleResult',
            styleCategory: block.content.styleCategory || primaryStyle.category,
            percentage: block.content.percentage || primaryStyle.percentage,
            description: block.content.description || ''
          } as any;

        case 'cta':
          return {
            ...baseBlock,
            buttonText: block.content.buttonText || 'Clique Aqui',
            url: block.content.url || '#',
            backgroundColor: block.content.backgroundColor,
            textColor: block.content.textColor
          } as any;

        case 'testimonial':
          return {
            ...baseBlock,
            author: block.content.author || 'Cliente Satisfeito',
            authorImage: block.content.authorImage,
            rating: block.content.rating || 5
          } as any;

        case 'carousel':
          return {
            ...baseBlock,
            items: block.content.items || []
          } as any;

        default:
          return baseBlock;
      }
    });
  };

  // Inicializar blocos do editor a partir do funil atual
  const [blocks, setBlocks] = useState<Block[]>(
    convertToEditorBlocks(currentFunnel.resultPage.blocks)
  );

  // Atualizar blocos quando o funil mudar
  useEffect(() => {
    setBlocks(convertToEditorBlocks(currentFunnel.resultPage.blocks));
  }, [currentFunnel]);

  // Funções para manipular blocos
  const handleAddBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      order: blocks.length,
      content: {}
    };

    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
    setSelectedBlockId(newBlock.id);

    // Atualizar o funil
    const updatedResultBlocks = convertToResultBlocks(updatedBlocks);
    setCurrentFunnel(prev => ({
      ...prev,
      resultPage: {
        ...prev.resultPage,
        blocks: updatedResultBlocks
      },
      updatedAt: new Date()
    }));
  };

  const handleUpdateBlock = (id: string, updatedBlock: ResultPageBlock) => {
    // Encontrar e atualizar o bloco específico
    const updatedBlocks = currentFunnel.resultPage.blocks.map(block =>
      block.id === id ? updatedBlock : block
    );

    // Atualizar o funil
    setCurrentFunnel(prev => ({
      ...prev,
      resultPage: {
        ...prev.resultPage,
        blocks: updatedBlocks
      },
      updatedAt: new Date()
    }));

    // Atualizar os blocos do editor
    setBlocks(convertToEditorBlocks(updatedBlocks));
  };

  const handleDeleteBlock = (id: string) => {
    // Filtrar o bloco a ser removido
    const filteredBlocks = currentFunnel.resultPage.blocks.filter(block => block.id !== id);

    // Atualizar o funil
    setCurrentFunnel(prev => ({
      ...prev,
      resultPage: {
        ...prev.resultPage,
        blocks: filteredBlocks
      },
      updatedAt: new Date()
    }));

    // Atualizar os blocos do editor e limpar a seleção
    setBlocks(convertToEditorBlocks(filteredBlocks));
    setSelectedBlockId(null);
  };

  const handleDuplicateBlock = (id: string) => {
    // Encontrar o bloco a ser duplicado
    const blockToDuplicate = currentFunnel.resultPage.blocks.find(block => block.id === id);
    
    if (blockToDuplicate) {
      // Criar uma cópia com novo ID
      const duplicatedBlock = {
        ...blockToDuplicate,
        id: generateId()
      };

      // Adicionar o bloco duplicado à lista
      const updatedBlocks = [...currentFunnel.resultPage.blocks, duplicatedBlock];

      // Atualizar o funil
      setCurrentFunnel(prev => ({
        ...prev,
        resultPage: {
          ...prev.resultPage,
          blocks: updatedBlocks
        },
        updatedAt: new Date()
      }));

      // Atualizar os blocos do editor e selecionar o novo bloco
      setBlocks(convertToEditorBlocks(updatedBlocks));
      setSelectedBlockId(duplicatedBlock.id);
    }
  };

  const handleReorderBlocks = (sourceIndex: number, destinationIndex: number) => {
    // Reordenar os blocos
    const reorderedBlocks = [...currentFunnel.resultPage.blocks];
    const [removed] = reorderedBlocks.splice(sourceIndex, 1);
    reorderedBlocks.splice(destinationIndex, 0, removed);

    // Atualizar a ordem
    const updatedBlocks = reorderedBlocks.map((block, index) => ({
      ...block,
      order: index
    }));

    // Atualizar o funil
    setCurrentFunnel(prev => ({
      ...prev,
      resultPage: {
        ...prev.resultPage,
        blocks: updatedBlocks
      },
      updatedAt: new Date()
    }));

    // Atualizar os blocos do editor
    setBlocks(convertToEditorBlocks(updatedBlocks));
  };

  const handleUpdateGlobalStyles = (settings: any) => {
    // Atualizar as configurações globais
    setCurrentFunnel(prev => ({
      ...prev,
      resultPage: {
        ...prev.resultPage,
        settings: {
          ...prev.resultPage.settings,
          ...settings
        }
      },
      updatedAt: new Date()
    }));
  };

  const handleDuplicateFunnel = (newFunnel: QuizFunnel) => {
    // Aqui você pode implementar a lógica para salvar o novo funil no backend
    toast({
      title: "Funil duplicado",
      description: `O funil foi duplicado com o nome: ${newFunnel.name}`,
      duration: 3000
    });
  };

  const handleUpdateAbTest = (updatedResultPage: ResultPage) => {
    // Atualizar as configurações de teste A/B
    setCurrentFunnel(prev => ({
      ...prev,
      resultPage: updatedResultPage,
      updatedAt: new Date()
    }));

    toast({
      title: "Configurações de teste A/B atualizadas",
      description: updatedResultPage.settings.abTestEnabled
        ? "O teste A/B foi ativado para esta página"
        : "O teste A/B foi desativado para esta página",
      duration: 3000
    });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(currentFunnel);
    }

    toast({
      title: "Alterações salvas",
      description: "Todas as alterações foram salvas com sucesso",
      duration: 3000
    });
  };

  // Renderizar o bloco selecionado para edição
  const renderSelectedBlockEditor = () => {
    if (!selectedBlockId) {
      return (
        <div className="h-full flex items-center justify-center p-6 text-center">
          <div>
            <p className="text-[#8F7A6A]">Selecione um bloco para editar ou adicione um novo bloco do painel de componentes</p>
          </div>
        </div>
      );
    }

    const selectedBlock = currentFunnel.resultPage.blocks.find(block => block.id === selectedBlockId);
    
    if (!selectedBlock) return null;

    return (
      <ScrollArea className="h-full p-6">
        <ResultPageBlockEditor
          block={selectedBlock}
          onUpdate={(updatedBlock) => handleUpdateBlock(selectedBlockId, updatedBlock)}
          onDelete={() => handleDeleteBlock(selectedBlockId)}
          onDuplicate={() => handleDuplicateBlock(selectedBlockId)}
          abTestVariants={currentFunnel.resultPage.settings.abTestVariants}
          abTestEnabled={currentFunnel.resultPage.settings.abTestEnabled}
        />
      </ScrollArea>
    );
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Barra de ferramentas superior */}
      <div className="border-b p-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-lg font-medium">Editor de Página de Resultados</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <ResultPageDuplicator
            currentFunnel={currentFunnel}
            onDuplicate={handleDuplicateFunnel}
            onUpdateAbTest={handleUpdateAbTest}
          />
          
          <Button variant="outline" onClick={() => setIsGlobalStylesOpen(!isGlobalStylesOpen)}>
            Estilos Globais
          </Button>
          
          <Button variant="outline" onClick={() => setIsPreviewing(!isPreviewing)}>
            {isPreviewing ? 'Editar' : 'Visualizar'}
          </Button>
          
          <Button onClick={handleSave}>
            Salvar
          </Button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="border-b px-4">
            <TabsList>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Visualização</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="editor" className="flex-1 overflow-hidden">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              {/* Painel de componentes */}
              <ResizablePanel defaultSize={20} minSize={15}>
                <ComponentsSidebar onComponentSelect={handleAddBlock} />
              </ResizablePanel>
              
              <ResizableHandle />
              
              {/* Painel de blocos */}
              <ResizablePanel defaultSize={50}>
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b">
                    <h2 className="font-medium">Blocos</h2>
                  </div>
                  
                  <ScrollArea className="flex-1">
                    <DraggableBlockList
                      blocks={blocks}
                      selectedBlockId={selectedBlockId}
                      isPreviewing={isPreviewing}
                      onSelectBlock={setSelectedBlockId}
                      onReorderBlocks={handleReorderBlocks}
                      onDuplicateBlock={handleDuplicateBlock}
                      onDeleteBlock={handleDeleteBlock}
                    />
                  </ScrollArea>
                </div>
              </ResizablePanel>
              
              <ResizableHandle />
              
              {/* Painel de propriedades */}
              <ResizablePanel defaultSize={30}>
                {isGlobalStylesOpen ? (
                  <div className="h-full flex flex-col">
                    <div className="p-4 border-b flex justify-between items-center">
                      <h2 className="font-medium">Estilos Globais</h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsGlobalStylesOpen(false)}
                      >
                        Fechar
                      </Button>
                    </div>
                    
                    <ScrollArea className="flex-1 p-6">
                      <GlobalStylesEditor
                        settings={currentFunnel.resultPage.settings}
                        onUpdate={handleUpdateGlobalStyles}
                      />
                    </ScrollArea>
                  </div>
                ) : (
                  <div className="h-full flex flex-col">
                    <div className="p-4 border-b">
                      <h2 className="font-medium">Propriedades</h2>
                    </div>
                    
                    {renderSelectedBlockEditor()}
                  </div>
                )}
              </ResizablePanel>
            </ResizablePanelGroup>
          </TabsContent>
          
          <TabsContent value="preview" className="flex-1 overflow-auto">
            <EditorPreview
              blocks={blocks}
              globalStyles={currentFunnel.resultPage.settings}
              primaryStyle={primaryStyle}
              secondaryStyles={secondaryStyles}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};