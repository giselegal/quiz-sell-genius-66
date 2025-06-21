



import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Save, 
  Trash2,
  Copy,
  Monitor,
  Smartphone,
  Tablet,
  ChevronUp,
  ChevronDown,
  Type,
  Image as ImageIcon,
  MousePointer,
  Layout,
  GripVertical
} from "lucide-react";

// CSS simplificado
const SIMPLE_CSS = `
  .simple-editor {
    font-family: 'Inter', sans-serif;
  }
  
  .component-item {
    cursor: grab;
    transition: all 0.2s ease;
    border: 2px dashed transparent;
  }
  
  .component-item:hover {
    background: #e2e8f0;
    border-color: #3b82f6;
    transform: translateY(-1px);
  }
  
  .drop-zone {
    min-height: 40px;
    border: 2px dashed #cbd5e1;
    border-radius: 8px;
    margin: 8px 0;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    font-size: 0.875rem;
  }
  
  .drop-zone.drag-over {
    border-color: #3b82f6;
    background: rgba(59, 130, 246, 0.05);
  }
  
  .component-wrapper {
    position: relative;
    margin: 8px 0;
    border: 2px solid transparent;
    border-radius: 8px;
    padding: 8px;
    transition: all 0.2s ease;
  }
  
  .component-wrapper:hover {
    border-color: #e2e8f0;
  }
  
  .component-wrapper.selected {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .quiz-preview {
    background: linear-gradient(135deg, #FFFBF7 0%, #FDF8F3 100%);
    min-height: 100vh;
    padding: 1rem;
  }
`;

// Interfaces simplificadas
interface SimpleComponent {
  id: string;
  type: 'title' | 'subtitle' | 'text' | 'image' | 'button' | 'spacer';
  data: {
    text?: string;
    src?: string;
    alt?: string;
    height?: number;
  };
  style: {
    fontSize?: string;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
    color?: string;
  };
}

interface SimplePage {
  id: string;
  title: string;
  components: SimpleComponent[];
}

interface ComponentType {
  type: SimpleComponent['type'];
  name: string;
  icon: any;
  description: string;
}

// Componentes disponíveis
const COMPONENTS: ComponentType[] = [
  {
    type: 'title',
    name: 'Título',
    icon: Type,
    description: 'Título principal'
  },
  {
    type: 'subtitle',
    name: 'Subtítulo',
    icon: Type,
    description: 'Texto secundário'
  },
  {
    type: 'text',
    name: 'Texto',
    icon: Type,
    description: 'Parágrafo normal'
  },
  {
    type: 'image',
    name: 'Imagem',
    icon: ImageIcon,
    description: 'Imagem responsiva'
  },
  {
    type: 'button',
    name: 'Botão',
    icon: MousePointer,
    description: 'Botão de ação'
  },
  {
    type: 'spacer',
    name: 'Espaço',
    icon: Layout,
    description: 'Espaçamento vertical'
  }
];

const SimpleDragDropEditor: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<SimplePage>({
    id: "page-1",
    title: "Nova Página",
    components: []
  });

  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [deviceView, setDeviceView] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [draggedType, setDraggedType] = useState<ComponentType | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Aplicar CSS
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = SIMPLE_CSS;
    document.head.appendChild(styleElement);
    
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  // Funções de drag & drop
  const handleDragStart = (e: React.DragEvent, componentType: ComponentType) => {
    setDraggedType(componentType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(null);
    
    if (draggedType) {
      const newComponent: SimpleComponent = {
        id: `${draggedType.type}-${Date.now()}`,
        type: draggedType.type,
        data: getDefaultData(draggedType.type),
        style: getDefaultStyle(draggedType.type)
      };

      setCurrentPage(prev => {
        const newComponents = [...prev.components];
        newComponents.splice(index, 0, newComponent);
        return {
          ...prev,
          components: newComponents
        };
      });

      setSelectedComponent(newComponent.id);
      setDraggedType(null);
    }
  };

  const getDefaultData = (type: string) => {
    switch (type) {
      case 'title':
        return { text: 'Novo Título' };
      case 'subtitle':
        return { text: 'Novo Subtítulo' };
      case 'text':
        return { text: 'Digite seu texto aqui...' };
      case 'image':
        return { 
          src: 'https://via.placeholder.com/400x300/B89B7A/FFFFFF?text=Nova+Imagem', 
          alt: 'Nova imagem' 
        };
      case 'button':
        return { text: 'CLIQUE AQUI' };
      case 'spacer':
        return { height: 32 };
      default:
        return {};
    }
  };

  const getDefaultStyle = (type: string) => {
    switch (type) {
      case 'title':
        return { fontSize: '2.5rem', fontWeight: '700', textAlign: 'center' as const, color: '#432818' };
      case 'subtitle':
        return { fontSize: '1.25rem', textAlign: 'center' as const, color: '#6B4F43' };
      case 'text':
        return { fontSize: '1rem', textAlign: 'left' as const, color: '#374151' };
      default:
        return {};
    }
  };

  // Funções de edição
  const updateComponent = (componentId: string, newData: any) => {
    setCurrentPage(prev => ({
      ...prev,
      components: prev.components.map(comp =>
        comp.id === componentId
          ? { ...comp, data: { ...comp.data, ...newData } }
          : comp
      )
    }));
  };

  const deleteComponent = (componentId: string) => {
    setCurrentPage(prev => ({
      ...prev,
      components: prev.components.filter(comp => comp.id !== componentId)
    }));
    setSelectedComponent(null);
  };

  const duplicateComponent = (componentId: string) => {
    const component = currentPage.components.find(c => c.id === componentId);
    if (component) {
      const newComponent: SimpleComponent = {
        ...component,
        id: `${component.type}-${Date.now()}`,
        data: { ...component.data }
      };
      
      const index = currentPage.components.findIndex(c => c.id === componentId);
      setCurrentPage(prev => {
        const newComponents = [...prev.components];
        newComponents.splice(index + 1, 0, newComponent);
        return {
          ...prev,
          components: newComponents
        };
      });
    }
  };

  // Renderização de componentes
  const renderComponent = (component: SimpleComponent, index: number) => {
    const isSelected = selectedComponent === component.id;

    return (
      <div key={component.id} className="relative">
        {/* Drop Zone */}
        <div
          className={`drop-zone ${dragOverIndex === index ? 'drag-over' : ''}`}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
        >
          {dragOverIndex === index ? 'Solte aqui' : 'Arraste componentes aqui'}
        </div>

        {/* Component Wrapper */}
        <div
          className={`component-wrapper ${isSelected ? 'selected' : ''}`}
          onClick={() => setSelectedComponent(component.id)}
        >
          {/* Toolbar */}
          {isSelected && (
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  duplicateComponent(component.id);
                }}
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteComponent(component.id);
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}

          {/* Content */}
          {renderComponentContent(component)}
        </div>
      </div>
    );
  };

  const renderComponentContent = (component: SimpleComponent) => {
    const { type, data, style } = component;

    switch (type) {
      case 'title':
      case 'subtitle':
      case 'text':
        return (
          <div
            style={{
              fontSize: style.fontSize || '1rem',
              fontWeight: style.fontWeight || 'normal',
              textAlign: style.textAlign || 'left',
              color: style.color || '#000000',
              padding: '8px 0'
            }}
          >
            {data.text || 'Clique para editar...'}
          </div>
        );

      case 'image':
        return (
          <div className="text-center" style={{ padding: '16px 0' }}>
            <img
              src={data.src || 'https://via.placeholder.com/400x300'}
              alt={data.alt || 'Imagem'}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px'
              }}
            />
          </div>
        );

      case 'button':
        return (
          <div style={{ textAlign: 'center', margin: '16px 0' }}>
            <button
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #B89B7A 0%, #aa6b5d 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {data.text || 'BOTÃO'}
            </button>
          </div>
        );

      case 'spacer':
        return (
          <div
            style={{
              height: `${data.height || 32}px`,
              border: '1px dashed #cbd5e1',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              fontSize: '0.75rem',
              opacity: 0.5
            }}
          >
            Espaçamento ({data.height || 32}px)
          </div>
        );

      default:
        return <div>Componente não reconhecido</div>;
    }
  };

  const renderPropertiesPanel = () => {
    const component = currentPage.components.find(c => c.id === selectedComponent);
    if (!component) return null;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Propriedades</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {['title', 'subtitle', 'text', 'button'].includes(component.type) && (
            <div>
              <Label>Texto</Label>
              <Textarea
                value={component.data.text || ''}
                onChange={(e) => updateComponent(component.id, { text: e.target.value })}
                rows={3}
              />
            </div>
          )}

          {component.type === 'image' && (
            <div>
              <Label>URL da Imagem</Label>
              <Input
                value={component.data.src || ''}
                onChange={(e) => updateComponent(component.id, { src: e.target.value })}
              />
            </div>
          )}

          {component.type === 'spacer' && (
            <div>
              <Label>Altura (px)</Label>
              <Input
                type="number"
                value={component.data.height || 32}
                onChange={(e) => updateComponent(component.id, { height: parseInt(e.target.value) || 32 })}
              />
            </div>
          )}

          <Separator />
          <Button
            variant="destructive"
            onClick={() => deleteComponent(component.id)}
            className="w-full"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remover
          </Button>
        </CardContent>
      </Card>
    );
  };

  const getDeviceClass = () => {
    switch (deviceView) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-md mx-auto';
      case 'desktop':
        return 'max-w-2xl mx-auto';
      default:
        return 'max-w-2xl mx-auto';
    }
  };

  return (
    <div className="h-screen flex bg-background simple-editor">
      {/* Painel Lateral */}
      <div className="w-80 border-r bg-muted/30 overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-4">Editor Simples</h2>
          
          <div className="flex gap-1 mb-4">
            <Button
              variant={deviceView === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDeviceView('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
            <Button
              variant={deviceView === 'tablet' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDeviceView('tablet')}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={deviceView === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDeviceView('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {/* Componentes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Componentes</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Arraste e solte no editor
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {COMPONENTS.map((componentType) => {
                    const Icon = componentType.icon;
                    return (
                      <div
                        key={componentType.type}
                        className="component-item p-3 rounded-lg border cursor-grab"
                        draggable
                        onDragStart={(e) => handleDragStart(e, componentType)}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <div>
                            <div className="font-medium text-sm">{componentType.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {componentType.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Painel de Propriedades */}
            {selectedComponent && renderPropertiesPanel()}
          </div>
        </ScrollArea>
      </div>

      {/* Editor Principal */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge>Editor</Badge>
              <span className="font-medium">{currentPage.title}</span>
            </div>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>

          {/* Preview Area */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className={`quiz-preview ${getDeviceClass()}`}>
              {/* Content Area */}
              <div className="max-w-600px mx-auto">
                {/* Drop Zone inicial */}
                {currentPage.components.length === 0 && (
                  <div
                    className="drop-zone"
                    style={{ minHeight: '200px' }}
                    onDragOver={(e) => handleDragOver(e, 0)}
                    onDrop={(e) => handleDrop(e, 0)}
                  >
                    Arraste componentes aqui para começar
                  </div>
                )}

                {/* Componentes */}
                {currentPage.components.map((component, index) => 
                  renderComponent(component, index)
                )}

                {/* Drop zone final */}
                {currentPage.components.length > 0 && (
                  <div
                    className={`drop-zone ${dragOverIndex === currentPage.components.length ? 'drag-over' : ''}`}
                    onDragOver={(e) => handleDragOver(e, currentPage.components.length)}
                    onDrop={(e) => handleDrop(e, currentPage.components.length)}
                  >
                    Adicionar mais componentes
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDragDropEditor;
