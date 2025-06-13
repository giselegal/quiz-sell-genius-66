
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { 
  Play, 
  Save, 
  Eye, 
  Settings, 
  Sparkles, 
  Palette,
  RotateCcw,
  RotateCw,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';
import { useLiveEditor } from '@/hooks/useLiveEditor';
import StagesSidebar from './sidebar/StagesSidebar';
import ComponentsSidebar from './sidebar/ComponentsSidebar';
import SmartComponentPalette from './smart-components/SmartComponentPalette';
import PropertiesSidebar from './sidebar/PropertiesSidebar';
import TemplateLibrary from './templates/TemplateLibrary';
import InlineEditor from './inline-editor/InlineEditor';
import { toast } from '@/hooks/use-toast';

const LiveQuizEditor: React.FC = () => {
  const {
    stages,
    activeStageId,
    selectedComponentId,
    isPreviewMode,
    setActiveStage,
    setSelectedComponent,
    addStage,
    updateStage,
    deleteStage,
    addComponent,
    updateComponent,
    deleteComponent,
    togglePreview,
    saveEditor
  } = useLiveEditor();

  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [showSmartPalette, setShowSmartPalette] = useState(false);
  const [inlineEditor, setInlineEditor] = useState<{
    content: any;
    type: string;
    position: { x: number; y: number };
    componentId: string;
  } | null>(null);
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const activeStage = stages.find(stage => stage.id === activeStageId);
  const selectedComponent = activeStage?.components.find(comp => comp.id === selectedComponentId);

  const handleSaveEditor = async () => {
    try {
      await saveEditor();
      toast({
        title: "Editor salvo",
        description: "Suas alterações foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o editor.",
        variant: "destructive",
      });
    }
  };

  const handleInlineEdit = (componentId: string, event: React.MouseEvent) => {
    if (isPreviewMode) return;
    
    const component = activeStage?.components.find(comp => comp.id === componentId);
    if (!component) return;

    setInlineEditor({
      content: component.content,
      type: component.type,
      position: { x: event.clientX, y: event.clientY },
      componentId
    });
  };

  const handleInlineSave = (content: any) => {
    if (inlineEditor && activeStageId) {
      updateComponent(activeStageId, inlineEditor.componentId, { content });
      setInlineEditor(null);
    }
  };

  const handleSmartComponentSelect = (componentType: string) => {
    if (!activeStageId) return;

    const newComponent = {
      id: `component-${Date.now()}`,
      type: componentType,
      content: getDefaultContent(componentType),
      style: {},
      position: { x: 0, y: 0 },
      size: { width: 100, height: 100 }
    };

    addComponent(activeStageId, newComponent);
    setSelectedComponent(newComponent.id);
  };

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'ai-question-generator':
        return { title: 'Pergunta gerada por IA', aiGenerated: true };
      case 'smart-progress-bar':
        return { progress: 0, adaptive: true };
      case 'conversion-optimized-cta':
        return { text: 'Continuar', optimized: true };
      default:
        return {};
    }
  };

  const getViewportWidth = () => {
    switch (viewportSize) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      case 'desktop': return '100%';
      default: return '100%';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#FAF9F7] overflow-hidden">
      {/* Top Toolbar */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-[#432818]">Editor Ao Vivo</h1>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowTemplateLibrary(true)}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Templates
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowSmartPalette(!showSmartPalette)}
            >
              <Palette className="w-4 h-4 mr-2" />
              Smart
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Viewport Controls */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
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

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline">
              <RotateCw className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={togglePreview}
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreviewMode ? 'Editar' : 'Preview'}
            </Button>
            <Button
              size="sm"
              onClick={handleSaveEditor}
              className="bg-[#B89B7A] hover:bg-[#A1835D] text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              <Play className="w-4 h-4 mr-2" />
              Publicar
            </Button>
          </div>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Sidebar - Stages */}
          <ResizablePanel defaultSize={15} minSize={12} maxSize={20}>
            <StagesSidebar
              stages={stages}
              activeStageId={activeStageId}
              onStageSelect={setActiveStage}
              onAddStage={addStage}
              onUpdateStage={updateStage}
              onDeleteStage={deleteStage}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Components Sidebar */}
          <ResizablePanel defaultSize={18} minSize={15} maxSize={25}>
            {showSmartPalette ? (
              <SmartComponentPalette
                onComponentSelect={handleSmartComponentSelect}
                stageType={activeStage?.type}
              />
            ) : (
              <ComponentsSidebar
                onAddComponent={handleSmartComponentSelect}
                stageType={activeStage?.type}
              />
            )}
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Canvas/Preview Area */}
          <ResizablePanel defaultSize={49}>
            <div className="h-full bg-[#FAF9F7] flex items-center justify-center p-8">
              <div
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300"
                style={{ 
                  width: getViewportWidth(),
                  maxWidth: '100%',
                  height: '100%',
                  maxHeight: '100%'
                }}
              >
                {activeStage ? (
                  <div className="h-full overflow-y-auto">
                    {/* Render stage components */}
                    {activeStage.components.map((component) => (
                      <div
                        key={component.id}
                        className={`
                          relative cursor-pointer transition-all duration-200
                          ${selectedComponentId === component.id && !isPreviewMode ? 'ring-2 ring-[#B89B7A] ring-opacity-50' : ''}
                          ${!isPreviewMode ? 'hover:ring-1 hover:ring-[#B89B7A] hover:ring-opacity-30' : ''}
                        `}
                        onClick={(e) => {
                          if (!isPreviewMode) {
                            setSelectedComponent(component.id);
                          }
                        }}
                        onDoubleClick={(e) => handleInlineEdit(component.id, e)}
                        style={{
                          ...component.style,
                          minHeight: '50px',
                          padding: '16px'
                        }}
                      >
                        {/* Component content based on type */}
                        {component.type === 'hero' && (
                          <div className="text-center space-y-4">
                            <h1 className="text-3xl font-bold text-[#432818]">
                              {component.content.title || 'Título Principal'}
                            </h1>
                            <p className="text-lg text-gray-600">
                              {component.content.subtitle || 'Subtítulo'}
                            </p>
                            <Button className="bg-[#B89B7A] hover:bg-[#A1835D] text-white">
                              {component.content.buttonText || 'Botão'}
                            </Button>
                          </div>
                        )}
                        
                        {component.type === 'question-title' && (
                          <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-[#432818]">
                              {component.content.text || 'Pergunta do Quiz'}
                            </h2>
                            <p className="text-sm text-gray-500">
                              Selecione {component.content.selections || 3} opções
                            </p>
                          </div>
                        )}

                        {/* Selection indicator for edit mode */}
                        {selectedComponentId === component.id && !isPreviewMode && (
                          <div className="absolute top-2 right-2 bg-[#B89B7A] text-white text-xs px-2 py-1 rounded">
                            {component.type}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {activeStage.components.length === 0 && !isPreviewMode && (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        <div className="text-center">
                          <p className="text-lg mb-2">Etapa vazia</p>
                          <p className="text-sm">Adicione componentes do painel lateral</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <p className="text-lg mb-2">Nenhuma etapa selecionada</p>
                      <p className="text-sm">Selecione uma etapa para começar a editar</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Sidebar - Properties */}
          <ResizablePanel defaultSize={18} minSize={15} maxSize={25}>
            <PropertiesSidebar
              selectedComponent={selectedComponent}
              stage={activeStage}
              onUpdateComponent={(updates) => {
                if (selectedComponentId && activeStageId) {
                  updateComponent(activeStageId, selectedComponentId, updates);
                }
              }}
              onUpdateStage={(updates) => {
                if (activeStageId) {
                  updateStage(activeStageId, updates);
                }
              }}
              onDeleteComponent={() => {
                if (selectedComponentId && activeStageId) {
                  deleteComponent(activeStageId, selectedComponentId);
                }
              }}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Modals */}
      {showTemplateLibrary && (
        <TemplateLibrary
          onTemplateSelect={(template) => {
            console.log('Template selecionado:', template);
            setShowTemplateLibrary(false);
            toast({
              title: "Template aplicado",
              description: `Template "${template.name}" foi aplicado com sucesso.`,
            });
          }}
          onClose={() => setShowTemplateLibrary(false)}
        />
      )}

      {/* Inline Editor */}
      {inlineEditor && (
        <InlineEditor
          content={inlineEditor.content}
          type={inlineEditor.type}
          position={inlineEditor.position}
          onSave={handleInlineSave}
          onCancel={() => setInlineEditor(null)}
          onAIEnhance={async (text) => {
            // Mock AI enhancement - in reality this would call an AI API
            return `✨ ${text} (melhorado por IA)`;
          }}
        />
      )}
    </div>
  );
};

export default LiveQuizEditor;
