import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { 
  Palette, 
  Type, 
  Layout, 
  Eye, 
  Save, 
  Undo, 
  Redo,
  Download,
  Upload
} from 'lucide-react';

// Usar os tokens da ResultPage como base
const baseTokens = {
  colors: {
    primary: '#B89B7A',
    secondary: '#aa6b5d',
    background: '#fffaf7',
    text: '#432818',
    // ...complete token system from ResultPage...
  }
  // ...existing tokens...
};

interface EditorProps {
  onSave: (config: any) => void;
  initialConfig?: any;
}

export const VisualEditor: React.FC<EditorProps> = ({ onSave, initialConfig }) => {
  const [config, setConfig] = useState(initialConfig || baseTokens);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'layout' | 'preview'>('colors');
  const [history, setHistory] = useState([baseTokens]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const updateConfig = useCallback((path: string, value: any) => {
    setConfig(prev => {
      const newConfig = { ...prev };
      const keys = path.split('.');
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      
      // Add to history
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newConfig);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      return newConfig;
    });
  }, [history, historyIndex]);

  const ColorPicker: React.FC<{ label: string; path: string; value: string }> = ({ label, path, value }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => updateConfig(path, e.target.value)}
          className="w-12 h-8 rounded border cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => updateConfig(path, e.target.value)}
          className="flex-1 px-3 py-1 border rounded text-sm"
          placeholder="#000000"
        />
      </div>
    </div>
  );

  const FontSizeSlider: React.FC<{ label: string; path: string; value: number; min: number; max: number }> = ({ 
    label, path, value, min, max 
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm text-gray-500">{value}px</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([newValue]) => updateConfig(path, newValue)}
        min={min}
        max={max}
        step={1}
        className="w-full"
      />
    </div>
  );

  const PreviewFrame: React.FC = () => (
    <div className="w-full h-96 border rounded-lg overflow-hidden bg-white">
      <iframe
        src="/resultado"
        className="w-full h-full"
        style={{
          transform: 'scale(0.5)',
          transformOrigin: 'top left',
          width: '200%',
          height: '200%'
        }}
      />
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Editor Visual</h2>
          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (historyIndex > 0) {
                  setHistoryIndex(historyIndex - 1);
                  setConfig(history[historyIndex - 1]);
                }
              }}
              disabled={historyIndex === 0}
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (historyIndex < history.length - 1) {
                  setHistoryIndex(historyIndex + 1);
                  setConfig(history[historyIndex + 1]);
                }
              }}
              disabled={historyIndex === history.length - 1}
            >
              <Redo className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={() => onSave(config)}
              className="ml-auto"
            >
              <Save className="w-4 h-4 mr-1" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {[
            { id: 'colors', label: 'Cores', icon: Palette },
            { id: 'typography', label: 'Texto', icon: Type },
            { id: 'layout', label: 'Layout', icon: Layout },
            { id: 'preview', label: 'Preview', icon: Eye }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex-1 p-3 text-sm font-medium flex items-center justify-center gap-1 ${
                activeTab === id 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'colors' && (
            <>
              <h3 className="font-medium">Cores Principais</h3>
              <ColorPicker 
                label="Cor Primária" 
                path="colors.primary" 
                value={config.colors?.primary || '#B89B7A'} 
              />
              <ColorPicker 
                label="Cor Secundária" 
                path="colors.secondary" 
                value={config.colors?.secondary || '#aa6b5d'} 
              />
              <ColorPicker 
                label="Background" 
                path="colors.background" 
                value={config.colors?.background || '#fffaf7'} 
              />
              <ColorPicker 
                label="Texto Principal" 
                path="colors.text" 
                value={config.colors?.text || '#432818'} 
              />
            </>
          )}

          {activeTab === 'typography' && (
            <>
              <h3 className="font-medium">Tipografia</h3>
              <FontSizeSlider 
                label="Título Principal" 
                path="typography.h1" 
                value={config.typography?.h1 || 48} 
                min={24} 
                max={72} 
              />
              <FontSizeSlider 
                label="Título Secundário" 
                path="typography.h2" 
                value={config.typography?.h2 || 36} 
                min={18} 
                max={54} 
              />
              <FontSizeSlider 
                label="Texto Normal" 
                path="typography.body" 
                value={config.typography?.body || 16} 
                min={12} 
                max={24} 
              />
            </>
          )}

          {activeTab === 'layout' && (
            <>
              <h3 className="font-medium">Layout</h3>
              <FontSizeSlider 
                label="Espaçamento Interno" 
                path="layout.padding" 
                value={config.layout?.padding || 24} 
                min={8} 
                max={48} 
              />
              <FontSizeSlider 
                label="Largura Máxima" 
                path="layout.maxWidth" 
                value={config.layout?.maxWidth || 1200} 
                min={800} 
                max={1600} 
              />
            </>
          )}

          {activeTab === 'preview' && (
            <>
              <h3 className="font-medium">Preview</h3>
              <PreviewFrame />
            </>
          )}
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 p-6">
        <Card className="h-full p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Preview da Página</h1>
            <p className="text-gray-600 mb-8">
              As alterações aparecerão aqui em tempo real
            </p>
            
            {/* Preview em tempo real */}
            <div 
              className="p-8 rounded-lg border-2 border-dashed"
              style={{
                backgroundColor: config.colors?.background,
                color: config.colors?.text,
                borderColor: config.colors?.primary
              }}
            >
              <h1 
                style={{ 
                  fontSize: `${config.typography?.h1 || 48}px`,
                  color: config.colors?.primary 
                }}
              >
                Título Principal
              </h1>
              <h2 
                style={{ 
                  fontSize: `${config.typography?.h2 || 36}px`,
                  color: config.colors?.secondary 
                }}
              >
                Subtítulo
              </h2>
              <p 
                style={{ 
                  fontSize: `${config.typography?.body || 16}px`,
                  color: config.colors?.text 
                }}
              >
                Este é um exemplo de como o texto aparecerá na página.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VisualEditor;
