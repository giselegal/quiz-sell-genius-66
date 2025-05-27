"use client";
import { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { toast } from '../../ui/use-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AdminHeader } from '../AdminHeader';
import EditorCanvas from './EditorCanvas';
import ComponentPalette from './ComponentPalette';
import PropertyPanel from './PropertyPanel';
import { Save, Eye, Undo, Redo } from 'lucide-react';

interface Component {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: Component[];
}

interface PageData {
  id?: string;
  title: string;
  components: Component[];
}

export default function EnhancedResultPageEditorPage() {
  const { id } = useParams();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [history, setHistory] = useState<PageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  useEffect(() => {
    const fetchPageData = async () => {
      if (id) {
        try {
          const mockData: PageData = {
            id: id as string,
            title: 'Página de Resultado - ' + id,
            components: [
              {
                id: 'comp-1',
                type: 'heading',
                props: { text: 'Parabéns! Aqui está seu resultado:', level: 1 }
              },
              {
                id: 'comp-2',
                type: 'paragraph',
                props: { text: 'Com base nas suas respostas, preparamos este conteúdo especial para você.' }
              }
            ]
          };
          setPageData(mockData);
          setHistory([mockData]);
          setHistoryIndex(0);
        } catch (error) {
          console.error('Erro ao carregar dados da página:', error);
          toast({
            title: 'Erro',
            description: 'Não foi possível carregar os dados da página',
            variant: 'destructive',
          });
        }
      } else {
        const newPageData: PageData = {
          title: 'Nova Página de Resultado',
          components: []
        };
        setPageData(newPageData);
        setHistory([newPageData]);
        setHistoryIndex(0);
      }
      setLoading(false);
    };
    
    fetchPageData();
  }, [id]);

  const saveToHistory = (newPageData: PageData) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newPageData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setPageData(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setPageData(history[historyIndex + 1]);
    }
  };

  const handleComponentsChange = (newComponents: Component[]) => {
    if (!pageData) return;
    const newPageData = { ...pageData, components: newComponents };
    setPageData(newPageData);
    saveToHistory(newPageData);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Sucesso',
        description: 'Página salva com sucesso!',
      });
      
      if (!id) {
        const newId = Date.now().toString();
        router.push(`/admin/editor/${newId}`);
      }
    } catch (error) {
      console.error('Erro ao salvar página:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar a página',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    if (pageData?.id) {
      window.open(`/resultado/${pageData.id}`, '_blank');
    } else {
      toast({
        title: 'Info',
        description: 'Salve a página primeiro para visualizar',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p>Carregando editor visual...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <AdminHeader title={`Editor Visual - ${pageData?.title || 'Nova Página'}`} />
      
      <div className="flex items-center justify-between border-b bg-white px-4 py-2 shadow-sm">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={undo}
            disabled={historyIndex <= 0}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
          >
            <Redo className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Visualizar
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        <DndProvider backend={HTML5Backend}>
          <div className="w-64 border-r bg-white shadow-sm">
            <ComponentPalette />
          </div>
          
          <div className="flex-1 p-6">
            <EditorCanvas 
              components={pageData?.components || []}
              onSelectComponent={setSelectedComponent}
              onChange={handleComponentsChange}
              selectedComponent={selectedComponent}
            />
          </div>

          <div className="w-80 border-l bg-white shadow-sm">
            <PropertyPanel 
              selectedComponent={selectedComponent}
              onChange={(updatedComponent) => {
                if (!pageData || !selectedComponent) return;
                
                const updatedComponents = pageData.components.map(comp => 
                  comp.id === selectedComponent.id ? updatedComponent : comp
                );
                handleComponentsChange(updatedComponents);
                setSelectedComponent(updatedComponent);
              }}
            />
          </div>
        </DndProvider>
      </div>

      <div className="sticky bottom-0 flex justify-between border-t bg-white p-4 shadow-lg">
        <Button variant="outline" onClick={() => router.push('/admin')}>
          Voltar ao Painel
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/resultado')}>
            Ver Página de Resultados
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>
    </div>
  );
}
