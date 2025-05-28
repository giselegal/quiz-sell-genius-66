"use client";

import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { StyleResult } from '@/types/quiz';
import { UnifiedComponentsSidebar } from '../sidebar/UnifiedComponentsSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { AlertCircle, Palette, Image, Type } from 'lucide-react';
import { Block, BlockType } from '@/types/editor';
interface SalesEditorPanelProps {
  isPreviewing: boolean;
  primaryStyle: StyleResult;
}
const SalesEditorPanel: React.FC<SalesEditorPanelProps> = ({ 
  isPreviewing, 
  primaryStyle 
}) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'hero' | 'content' | 'offer'>('hero');
  // Load mock blocks when component mounts
  useEffect(() => {
    setBlocks([
      {
        id: 'hero-1',
        type: 'hero-section' as BlockType, // Using the correct BlockType
        content: {
          title: 'Transforme seu Estilo Pessoal',
          subtitle: 'Descubra produtos e serviços especialmente para o seu estilo',
          imageUrl: '',
          style: {
            backgroundColor: '#F8F0E8',
            textColor: '#432818'
          }
        },
        order: 0
      }
    ]);
  }, []);
  const handleAddBlock = (type: string) => {
    // Make sure the type is a valid BlockType
    const blockType = type as BlockType;
    
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type: blockType,
      content: {
        title: blockType === 'hero-section' ? 'Título Principal' : 'Título da Seção',
        subtitle: 'Subtítulo',
        description: 'Descrição detalhada',
        style: {}
      },
      order: blocks.length
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
    toast({
      title: "Componente adicionado",
      description: `Um novo componente do tipo ${type} foi adicionado.`,
    });
  };
  const handleUpdateBlock = (id: string, content: any) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content: { ...block.content, ...content } } : block
    ));
  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
    setSelectedBlockId(null);
  const renderSalesPreview = () => {
    if (blocks.length === 0) {
      return (
        <div className="p-8 text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-amber-500 mb-4 opacity-60" />
          <h3 className="text-xl font-medium mb-2">Página de Vendas Vazia</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Adicione componentes à sua página de vendas usando o painel lateral.
            Cada componente pode ser personalizado para se adequar ao seu estilo.
          </p>
          <Button onClick={() => handleAddBlock('hero-section')}>
            Adicionar Seção Hero
          </Button>
        </div>
      );
    }
    return (
      <div className="space-y-8 mb-12 max-w-3xl mx-auto">
        {blocks.map(block => (
          <div key={block.id} 
            className={`relative ${selectedBlockId === block.id && !isPreviewing ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => !isPreviewing && setSelectedBlockId(block.id)}
          >
            {block.type === 'hero-section' && (
              <div 
                className="py-12 px-8 rounded-lg text-center"
                style={{
                  backgroundColor: block.content.style?.backgroundColor || '#F8F0E8',
                  color: block.content.style?.textColor || '#432818'
                }}
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {block.content.title || 'Título Principal'}
                </h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                  {block.content.subtitle || 'Subtítulo da sua página de vendas'}
                </p>
                {block.content.imageUrl ? (
                  <img 
                    src={block.content.imageUrl} 
                    alt="Hero" 
                    className="max-w-md mx-auto rounded-lg shadow-md" 
                  />
                ) : (
                  <div className="h-48 max-w-md mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                    <Image className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
            )}
            {block.type === 'benefits' && (
              <div className="py-8 px-6 bg-white rounded-lg">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  {block.content.title || 'Benefícios'}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {(block.content.items || [
                    { title: 'Benefício 1', description: 'Descrição do benefício' },
                    { title: 'Benefício 2', description: 'Descrição do benefício' },
                  ]).map((item, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
            {block.type === 'pricing' && (
              <div className="py-8 px-6 bg-white rounded-lg text-center">
                <h2 className="text-2xl font-semibold mb-2">
                  {block.content.title || 'Preço Especial'}
                <div className="mb-6">
                  <span className="text-3xl font-bold">{block.content.price || 'R$ 97,00'}</span>
                  {block.content.regularPrice && (
                    <span className="text-gray-500 line-through ml-2">{block.content.regularPrice}</span>
                  )}
                <Button size="lg" className="bg-[#B89B7A] hover:bg-[#8F7A6A]">
                  {block.content.buttonText || 'Comprar Agora'}
                </Button>
            {/* More block types can be added here */}
          </div>
        ))}
      </div>
    );
  const renderPropertiesPanel = () => {
    if (!selectedBlockId) {
        <div className="p-4 text-center">
          <p className="text-gray-500">
            Selecione um componente para editar suas propriedades
    const selectedBlock = blocks.find(block => block.id === selectedBlockId);
    if (!selectedBlock) return null;
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg">Propriedades</h3>
          <Button 
            onClick={() => setSelectedBlockId(null)} 
            size="sm" 
            variant="ghost"
            Fechar
          
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="content" className="flex-1">Conteúdo</TabsTrigger>
            <TabsTrigger value="style" className="flex-1">Estilo</TabsTrigger>
          </TabsList>
            
          <div className="space-y-4">
            {/* Content Tab */}
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <Input 
                value={selectedBlock.content.title || ''} 
                onChange={(e) => handleUpdateBlock(selectedBlockId, { title: e.target.value })}
                placeholder="Título" 
              />
            </div>
              
              <label className="block text-sm font-medium mb-1">Subtítulo</label>
                value={selectedBlock.content.subtitle || ''} 
                onChange={(e) => handleUpdateBlock(selectedBlockId, { subtitle: e.target.value })}
                placeholder="Subtítulo" 
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <Textarea 
                value={selectedBlock.content.description || ''} 
                onChange={(e) => handleUpdateBlock(selectedBlockId, { description: e.target.value })}
                placeholder="Descrição" 
                rows={4}
            {selectedBlock.type === 'hero-section' && (
              <div>
                <label className="block text-sm font-medium mb-1">URL da Imagem</label>
                <Input 
                  value={selectedBlock.content.imageUrl || ''} 
                  onChange={(e) => handleUpdateBlock(selectedBlockId, { imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg" 
                />
            {selectedBlock.type === 'pricing' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Preço</label>
                  <Input 
                    value={selectedBlock.content.price || ''} 
                    onChange={(e) => handleUpdateBlock(selectedBlockId, { price: e.target.value })}
                    placeholder="R$ 97,00" 
                  <label className="block text-sm font-medium mb-1">Preço Regular</label>
                    value={selectedBlock.content.regularPrice || ''} 
                    onChange={(e) => handleUpdateBlock(selectedBlockId, { regularPrice: e.target.value })}
                    placeholder="R$ 197,00" 
                  <label className="block text-sm font-medium mb-1">Texto do Botão</label>
                    value={selectedBlock.content.buttonText || ''} 
                    onChange={(e) => handleUpdateBlock(selectedBlockId, { buttonText: e.target.value })}
                    placeholder="Comprar Agora" 
              </>
        </Tabs>
        <div className="mt-6 pt-4 border-t">
            onClick={() => handleDeleteBlock(selectedBlockId)} 
            variant="destructive" 
            size="sm"
            Remover Bloco
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <UnifiedComponentsSidebar
          activeTab="sales"
          onComponentSelect={handleAddBlock}
          activeStageType={null}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={55}>
        <div className="h-full bg-gray-100 overflow-auto">
          <ScrollArea className="h-full">
            <div className="p-8 min-h-full">
              {renderSalesPreview()}
          </ScrollArea>
      <ResizablePanel defaultSize={25}>
        <div className="h-full border-l border-gray-200 bg-white overflow-auto">
          {renderPropertiesPanel()}
    </ResizablePanelGroup>
  );
};
export default SalesEditorPanel;
