"use client";
import React, { useState, useCallback, useEffect } from 'react';
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
  Upload,
  RefreshCw,
  Monitor,
  Smartphone
} from 'lucide-react';

// Importar os tokens da ResultPage
const baseTokens = {
  colors: {
    primary: '#B89B7A',
    primaryDark: '#A1835D',
    primaryLight: '#D4B79F',
    secondary: '#aa6b5d',
    secondaryDark: '#8F5A4D',
    secondaryLight: '#C28A7D',
    background: '#fffaf7',
    backgroundCard: '#ffffff',
    backgroundAlt: '#f9f4ef',
    backgroundSection: '#fff7f3',
    text: '#432818',
    textSecondary: '#6B5B4E',
    textMuted: '#8F7A6A',
    textLight: '#A5927B',
    success: '#4CAF50',
    successDark: '#45a049',
    border: '#E5D5C8',
    borderLight: '#F0E6DC',
    borderAccent: 'rgba(184, 155, 122, 0.2)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #B89B7A 0%, #aa6b5d 100%)',
    primaryReverse: 'linear-gradient(135deg, #aa6b5d 0%, #B89B7A 100%)',
    background: 'linear-gradient(135deg, #fff7f3 0%, #f9f4ef 100%)',
    text: 'linear-gradient(135deg, #B89B7A 0%, #aa6b5d 50%, #B89B7A 100%)',
  typography: {
    h1: 48,
    h2: 36,
    h3: 24,
    body: 16,
    small: 14,
  layout: {
    padding: 24,
    maxWidth: 1200,
    borderRadius: 16,
    spacing: 16,
  }
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
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState(false);
  const updateConfig = useCallback((path: string, value: any) => {
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
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
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setConfig(history[historyIndex - 1]);
    }
  };
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setConfig(history[historyIndex + 1]);
  const resetToDefault = () => {
    setConfig(baseTokens);
    const newHistory = [...history, baseTokens];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(config);
    } finally {
      setIsLoading(false);
  const ColorPicker: React.FC<{ label: string; path: string; value: string }> = ({ label, path, value }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => updateConfig(path, e.target.value)}
          className="w-12 h-8 rounded border cursor-pointer"
        />
          type="text"
          className="flex-1 px-3 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="#000000"
      </div>
    </div>
  );
  const FontSizeSlider: React.FC<{ label: string; path: string; value: number; min: number; max: number }> = ({ 
    label, path, value, min, max 
  }) => (
      <div className="flex justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm text-gray-500">{value}px</span>
      <Slider
        value={[value]}
        onValueChange={([newValue]) => updateConfig(path, newValue)}
        min={min}
        max={max}
        step={1}
        className="w-full"
      />
  const PreviewFrame: React.FC = () => (
    <div 
      className={`border rounded-lg overflow-hidden bg-white transition-all duration-300 ${
        previewMode === 'mobile' ? 'w-80 mx-auto' : 'w-full'
      }`}
      style={{ height: previewMode === 'mobile' ? '600px' : '500px' }}
    >
      <iframe
        src="/resultado"
        className="w-full h-full"
        style={{
          transform: previewMode === 'mobile' ? 'scale(0.8)' : 'scale(0.6)',
          transformOrigin: 'top left',
          width: previewMode === 'mobile' ? '125%' : '167%',
          height: previewMode === 'mobile' ? '125%' : '167%'
        }}
  const LivePreview: React.FC = () => (
      className="p-8 rounded-lg border-2 border-dashed transition-all duration-300"
      style={{
        backgroundColor: config.colors?.background,
        color: config.colors?.text,
        borderColor: config.colors?.primary,
        maxWidth: `${config.layout?.maxWidth}px`,
        padding: `${config.layout?.padding}px`
      }}
      <h1 
        className="font-bold mb-4"
        style={{ 
          fontSize: `${config.typography?.h1}px`,
          background: config.gradients?.primary,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
      >
        Título Principal
      </h1>
      <h2 
        className="font-semibold mb-4"
          fontSize: `${config.typography?.h2}px`,
          color: config.colors?.secondary 
        Subtítulo Secundário
      </h2>
      <div 
        className="rounded-lg p-4 mb-4"
          background: config.gradients?.background,
          border: `1px solid ${config.colors?.borderLight}`
        <h3 
          className="font-medium mb-2"
          style={{ 
            fontSize: `${config.typography?.h3}px`,
            color: config.colors?.text
          }}
        >
          Card de Exemplo
        </h3>
        <p 
            fontSize: `${config.typography?.body}px`,
            color: config.colors?.textMuted,
            lineHeight: '1.6'
          Este é um exemplo de como o texto aparecerá na página com as configurações atuais.
        </p>
      <button
        className="px-6 py-3 rounded-lg font-medium transition-transform hover:scale-105"
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(184, 155, 122, 0.3)'
        Botão de Exemplo
      </button>
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Editor Visual</h2>
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              onClick={undo}
              disabled={historyIndex === 0}
              title="Desfazer"
            >
              <Undo className="w-4 h-4" />
            </Button>
              onClick={redo}
              disabled={historyIndex === history.length - 1}
              title="Refazer"
              <Redo className="w-4 h-4" />
              onClick={resetToDefault}
              title="Resetar"
              <RefreshCw className="w-4 h-4" />
              onClick={handleSave}
              disabled={isLoading}
              className="ml-auto"
              <Save className="w-4 h-4 mr-1" />
              {isLoading ? 'Salvando...' : 'Salvar'}
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
              className={`flex-1 p-3 text-xs font-medium flex items-center justify-center gap-1 ${
                activeTab === id 
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'colors' && (
            <>
              <div>
                <h3 className="font-medium mb-3">Cores Principais</h3>
                <div className="space-y-3">
                  <ColorPicker 
                    label="Cor Primária" 
                    path="colors.primary" 
                    value={config.colors?.primary || '#B89B7A'} 
                  />
                    label="Cor Secundária" 
                    path="colors.secondary" 
                    value={config.colors?.secondary || '#aa6b5d'} 
                </div>
              </div>
              
                <h3 className="font-medium mb-3">Backgrounds</h3>
                    label="Background Principal" 
                    path="colors.background" 
                    value={config.colors?.background || '#fffaf7'} 
                    label="Background Card" 
                    path="colors.backgroundCard" 
                    value={config.colors?.backgroundCard || '#ffffff'} 
                <h3 className="font-medium mb-3">Textos</h3>
                    label="Texto Principal" 
                    path="colors.text" 
                    value={config.colors?.text || '#432818'} 
                    label="Texto Secundário" 
                    path="colors.textSecondary" 
                    value={config.colors?.textSecondary || '#6B5B4E'} 
                    label="Texto Muted" 
                    path="colors.textMuted" 
                    value={config.colors?.textMuted || '#8F7A6A'} 
            </>
          )}
          {activeTab === 'typography' && (
              <h3 className="font-medium mb-3">Tamanhos de Fonte</h3>
              <div className="space-y-4">
                <FontSizeSlider 
                  label="Título H1" 
                  path="typography.h1" 
                  value={config.typography?.h1 || 48} 
                  min={24} 
                  max={72} 
                />
                  label="Título H2" 
                  path="typography.h2" 
                  value={config.typography?.h2 || 36} 
                  min={18} 
                  max={54} 
                  label="Título H3" 
                  path="typography.h3" 
                  value={config.typography?.h3 || 24} 
                  min={16} 
                  max={36} 
                  label="Texto Normal" 
                  path="typography.body" 
                  value={config.typography?.body || 16} 
                  min={12} 
                  max={24} 
          {activeTab === 'layout' && (
              <h3 className="font-medium mb-3">Espaçamentos</h3>
                  label="Padding Interno" 
                  path="layout.padding" 
                  value={config.layout?.padding || 24} 
                  min={8} 
                  max={48} 
                  label="Border Radius" 
                  path="layout.borderRadius" 
                  value={config.layout?.borderRadius || 16} 
                  min={0} 
                  max={32} 
                  label="Largura Máxima" 
                  path="layout.maxWidth" 
                  value={config.layout?.maxWidth || 1200} 
                  min={800} 
                  max={1600} 
          {activeTab === 'preview' && (
              <div className="flex gap-2 mb-4">
                <Button
                  size="sm"
                  variant={previewMode === 'desktop' ? 'default' : 'outline'}
                  onClick={() => setPreviewMode('desktop')}
                  className="flex-1"
                >
                  <Monitor className="w-4 h-4 mr-1" />
                  Desktop
                </Button>
                  variant={previewMode === 'mobile' ? 'default' : 'outline'}
                  onClick={() => setPreviewMode('mobile')}
                  <Smartphone className="w-4 h-4 mr-1" />
                  Mobile
              <PreviewFrame />
      {/* Main Area */}
      <div className="flex-1 p-6 overflow-auto">
        <Card className="h-full p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Preview em Tempo Real</h1>
            <p className="text-gray-600">
              As alterações aparecem instantaneamente
            </p>
          
          <LivePreview />
        </Card>
export default VisualEditor;
