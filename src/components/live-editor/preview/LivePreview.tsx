
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EditorStage, EditorComponent } from '@/hooks/useLiveEditor';
import { Eye, EyeOff, Smartphone, Tablet, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LivePreviewProps {
  stage?: EditorStage;
  selectedComponentId: string | null;
  onSelectComponent: (componentId: string | null) => void;
  onUpdateComponent: (componentId: string, updates: Partial<EditorComponent>) => void;
  isPreviewMode: boolean;
}

const LivePreview: React.FC<LivePreviewProps> = ({
  stage,
  selectedComponentId,
  onSelectComponent,
  onUpdateComponent,
  isPreviewMode
}) => {
  const [viewportMode, setViewportMode] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getViewportClasses = () => {
    switch (viewportMode) {
      case 'mobile': return 'max-w-sm mx-auto';
      case 'tablet': return 'max-w-2xl mx-auto';
      default: return 'w-full';
    }
  };

  const renderComponent = (component: EditorComponent) => {
    const isSelected = selectedComponentId === component.id;
    
    return (
      <div
        key={component.id}
        className={`relative p-4 border-2 border-dashed transition-all cursor-pointer ${
          isSelected 
            ? 'border-[#B89B7A] bg-[#B89B7A]/5' 
            : 'border-transparent hover:border-gray-300'
        }`}
        onClick={() => onSelectComponent(component.id)}
      >
        {/* Component Content */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          {component.type === 'heading' && (
            <h2 className="text-2xl font-bold text-[#432818]">
              {component.content.text || 'Título do Componente'}
            </h2>
          )}
          
          {component.type === 'text' && (
            <p className="text-[#432818]/80">
              {component.content.text || 'Texto do componente. Clique para editar.'}
            </p>
          )}
          
          {component.type === 'image' && (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              {component.content.src ? (
                <img 
                  src={component.content.src} 
                  alt={component.content.alt || ''} 
                  className="max-w-full h-auto mx-auto"
                />
              ) : (
                <div className="text-gray-500">
                  📷 Clique para adicionar imagem
                </div>
              )}
            </div>
          )}
          
          {component.type === 'button' && (
            <Button className="bg-[#B89B7A] hover:bg-[#A1835D] text-white">
              {component.content.text || 'Botão'}
            </Button>
          )}
          
          {component.type === 'hero' && (
            <div className="text-center py-12">
              <h1 className="text-4xl font-bold text-[#432818] mb-4">
                {component.content.title || 'Descubra Seu Estilo Único'}
              </h1>
              <p className="text-xl text-[#432818]/80 mb-8">
                {component.content.subtitle || 'Responda ao quiz e encontre sua identidade visual'}
              </p>
              <Button size="lg" className="bg-[#B89B7A] hover:bg-[#A1835D] text-white">
                {component.content.buttonText || 'Começar Quiz'}
              </Button>
            </div>
          )}
          
          {component.type === 'question-title' && (
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#432818] mb-4">
                {component.content.text || 'Qual dessas opções mais combina com você?'}
              </h2>
              <p className="text-[#432818]/70">
                Escolha {component.content.selections || 3} opções
              </p>
            </div>
          )}
          
          {component.type === 'options-grid' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-200 transition-colors">
                  <div className="aspect-square bg-gray-200 rounded mb-2"></div>
                  <p className="text-sm font-medium">Opção {i + 1}</p>
                </div>
              ))}
            </div>
          )}
          
          {component.type === 'style-card' && (
            <div className="bg-gradient-to-br from-[#B89B7A]/10 to-[#B89B7A]/5 rounded-xl p-8 text-center">
              <div className="w-24 h-24 bg-[#B89B7A] rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl text-white">🎨</span>
              </div>
              <h2 className="text-3xl font-bold text-[#432818] mb-4">
                {component.content.styleName || 'Seu Estilo: Elegante'}
              </h2>
              <p className="text-[#432818]/80 text-lg">
                {component.content.description || 'Você tem um gosto refinado e sofisticado'}
              </p>
            </div>
          )}
          
          {component.type === 'pricing' && (
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#B89B7A]">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#432818] mb-2">
                  {component.content.title || 'Oferta Especial'}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-[#B89B7A]">
                    R$ {component.content.price || '197'}
                  </span>
                  {component.content.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      R$ {component.content.originalPrice}
                    </span>
                  )}
                </div>
              </div>
              <Button size="lg" className="w-full bg-[#B89B7A] hover:bg-[#A1835D] text-white">
                {component.content.buttonText || 'Comprar Agora'}
              </Button>
            </div>
          )}
        </div>
        
        {/* Selection Indicator */}
        {isSelected && !isPreviewMode && (
          <div className="absolute -top-2 -left-2 bg-[#B89B7A] text-white px-2 py-1 rounded text-xs font-medium">
            {component.type}
          </div>
        )}
      </div>
    );
  };

  if (!stage) {
    return (
      <div className="h-full flex items-center justify-center bg-[#FAF9F7] text-gray-500">
        <div className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-medium mb-2">Selecione uma etapa</h3>
          <p>Escolha uma etapa na sidebar para começar a editar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#FAF9F7]">
      {/* Preview Toolbar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-[#432818]">
              {stage.name}
            </h2>
            <Badge variant="secondary">
              {stage.type}
            </Badge>
            {stage.components.length > 0 && (
              <Badge variant="outline">
                {stage.components.length} componentes
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Viewport Controls */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewportMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewportMode('desktop')}
                className="w-8 h-8 p-0"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewportMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewportMode('tablet')}
                className="w-8 h-8 p-0"
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewportMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewportMode('mobile')}
                className="w-8 h-8 p-0"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className={`transition-all duration-300 ${getViewportClasses()}`}>
          <div className="bg-white rounded-lg shadow-sm min-h-96">
            {stage.components.length > 0 ? (
              <div className="space-y-2">
                {stage.components.map(renderComponent)}
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <div className="text-4xl mb-4">📦</div>
                  <h3 className="text-lg font-medium mb-2">Nenhum componente</h3>
                  <p>Adicione componentes da sidebar para começar</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
