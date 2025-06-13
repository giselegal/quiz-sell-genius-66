
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Eye, 
  Save, 
  Smartphone,
  Monitor,
  Tablet,
  Plus
} from 'lucide-react';
import { InLeadSidebar } from './InLeadSidebar';
import { InLeadCanvas } from './InLeadCanvas';
import { InLeadPreview } from './InLeadPreview';

export interface EditorPage {
  id: string;
  name: string;
  type: 'landing' | 'quiz' | 'result' | 'thankyou';
  elements: EditorElement[];
}

export interface EditorElement {
  id: string;
  type: 'heading' | 'text' | 'image' | 'button' | 'form' | 'video' | 'quiz-question';
  content: any;
  style: any;
  position: { x: number; y: number };
}

const InLeadEditor: React.FC = () => {
  const [pages, setPages] = useState<EditorPage[]>([
    {
      id: 'landing',
      name: 'Página Inicial',
      type: 'landing',
      elements: []
    }
  ]);
  
  const [activePageId, setActivePageId] = useState('landing');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [viewportSize, setViewportSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const activePage = pages.find(p => p.id === activePageId);
  const selectedElement = activePage?.elements.find(e => e.id === selectedElementId);

  const handleAddElement = (type: EditorElement['type']) => {
    if (!activePage) return;

    const newElement: EditorElement = {
      id: `element-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      style: getDefaultStyle(type),
      position: { x: 50, y: 50 }
    };

    setPages(prev => prev.map(page => 
      page.id === activePageId 
        ? { ...page, elements: [...page.elements, newElement] }
        : page
    ));

    setSelectedElementId(newElement.id);
  };

  const handleUpdateElement = (elementId: string, updates: Partial<EditorElement>) => {
    setPages(prev => prev.map(page => 
      page.id === activePageId 
        ? {
            ...page,
            elements: page.elements.map(el => 
              el.id === elementId ? { ...el, ...updates } : el
            )
          }
        : page
    ));
  };

  const handleDeleteElement = (elementId: string) => {
    setPages(prev => prev.map(page => 
      page.id === activePageId 
        ? { ...page, elements: page.elements.filter(el => el.id !== elementId) }
        : page
    ));
    
    if (selectedElementId === elementId) {
      setSelectedElementId(null);
    }
  };

  const handleAddPage = () => {
    const newPage: EditorPage = {
      id: `page-${Date.now()}`,
      name: `Página ${pages.length + 1}`,
      type: 'landing',
      elements: []
    };
    
    setPages(prev => [...prev, newPage]);
    setActivePageId(newPage.id);
  };

  const handleSave = () => {
    localStorage.setItem('inlead_editor_data', JSON.stringify({ pages }));
    console.log('Projeto salvo!');
  };

  const getDefaultContent = (type: EditorElement['type']) => {
    const defaults = {
      heading: { text: 'Novo Título', level: 'h1' },
      text: { text: 'Digite seu texto aqui...' },
      image: { src: '', alt: 'Imagem' },
      button: { text: 'Clique aqui', action: 'link', url: '' },
      form: { fields: [{ type: 'email', label: 'Email', required: true }] },
      video: { url: '', poster: '' },
      'quiz-question': { question: 'Sua pergunta aqui?', options: ['Opção 1', 'Opção 2'] }
    };
    return defaults[type] || {};
  };

  const getDefaultStyle = (type: EditorElement['type']) => {
    return {
      fontSize: type === 'heading' ? '32px' : '16px',
      color: '#333333',
      backgroundColor: type === 'button' ? '#007bff' : 'transparent',
      padding: '12px 24px',
      borderRadius: '8px',
      textAlign: 'center'
    };
  };

  const getViewportClasses = () => {
    switch (viewportSize) {
      case 'mobile': return 'max-w-sm mx-auto';
      case 'tablet': return 'max-w-2xl mx-auto';
      default: return 'w-full max-w-6xl mx-auto';
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">Editor InLead</h1>
            <div className="flex items-center gap-2">
              {pages.map(page => (
                <Button
                  key={page.id}
                  size="sm"
                  variant={activePageId === page.id ? 'default' : 'outline'}
                  onClick={() => setActivePageId(page.id)}
                >
                  {page.name}
                </Button>
              ))}
              <Button size="sm" variant="ghost" onClick={handleAddPage}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Viewport Controls */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                size="sm"
                variant={viewportSize === 'desktop' ? 'default' : 'ghost'}
                onClick={() => setViewportSize('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={viewportSize === 'tablet' ? 'default' : 'ghost'}
                onClick={() => setViewportSize('tablet')}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={viewportSize === 'mobile' ? 'default' : 'ghost'}
                onClick={() => setViewportSize('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            <Button
              size="sm"
              variant={isPreviewMode ? 'default' : 'outline'}
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreviewMode ? 'Editando' : 'Preview'}
            </Button>

            <Button size="sm" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <InLeadSidebar
          selectedElement={selectedElement}
          onAddElement={handleAddElement}
          onUpdateElement={(updates) => {
            if (selectedElementId) {
              handleUpdateElement(selectedElementId, updates);
            }
          }}
          onDeleteElement={() => {
            if (selectedElementId) {
              handleDeleteElement(selectedElementId);
            }
          }}
        />

        {/* Canvas */}
        <div className="flex-1 bg-gray-100 overflow-auto">
          <div className={`min-h-full p-8 ${getViewportClasses()}`}>
            <div className="bg-white rounded-lg shadow-sm min-h-screen">
              {isPreviewMode ? (
                <InLeadPreview page={activePage} />
              ) : (
                <InLeadCanvas
                  page={activePage}
                  selectedElementId={selectedElementId}
                  onSelectElement={setSelectedElementId}
                  onUpdateElement={handleUpdateElement}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InLeadEditor;
