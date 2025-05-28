"use client";
import React, { useState } from 'react';
import { ResultPageBlock, StyleResultBlock, CTABlock, TestimonialBlock, CarouselBlock } from '@/types/quizResult';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, Trash2, Copy, Eye, EyeOff } from 'lucide-react';

interface ResultPageBlockEditorProps {
  block: ResultPageBlock;
  onUpdate: (updatedBlock: ResultPageBlock) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  abTestVariants?: string[];
  abTestEnabled?: boolean;
}
export const ResultPageBlockEditor: React.FC<ResultPageBlockEditorProps> = ({
  block,
  onUpdate,
  onDelete,
  onDuplicate,
  abTestVariants = [],
  abTestEnabled = false
}) => {
  const [activeTab, setActiveTab] = useState('content');
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdate({
      ...block,
      content: e.target.value
    });
  };
  const handleSettingChange = (key: string, value: any) => {
      settings: {
        ...block.settings,
        [key]: value
      }
  const handleVisibilityToggle = () => {
      isVisible: block.isVisible === undefined ? false : !block.isVisible
  const handleAbTestVariantChange = (variant: string) => {
      abTestVariant: variant
  const renderSpecificBlockEditor = () => {
    switch (block.type) {
      case 'styleResult':
        return renderStyleResultEditor(block as StyleResultBlock);
      case 'cta':
        return renderCTAEditor(block as CTABlock);
      case 'testimonial':
        return renderTestimonialEditor(block as TestimonialBlock);
      case 'carousel':
        return renderCarouselEditor(block as CarouselBlock);
      default:
        return renderDefaultEditor();
    }
  const renderStyleResultEditor = (styleBlock: StyleResultBlock) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="styleCategory">Categoria de Estilo</Label>
        <Select
          value={styleBlock.styleCategory}
          onValueChange={(value) => onUpdate({ ...styleBlock, styleCategory: value })}
        >
          <SelectTrigger id="styleCategory">
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Natural">Natural</SelectItem>
            <SelectItem value="Clássico">Clássico</SelectItem>
            <SelectItem value="Contemporâneo">Contemporâneo</SelectItem>
            <SelectItem value="Elegante">Elegante</SelectItem>
            <SelectItem value="Romântico">Romântico</SelectItem>
            <SelectItem value="Sexy">Sexy</SelectItem>
            <SelectItem value="Dramático">Dramático</SelectItem>
            <SelectItem value="Criativo">Criativo</SelectItem>
          </SelectContent>
        </Select>
      </div>
        <Label htmlFor="percentage">Porcentagem</Label>
        <Input
          id="percentage"
          type="number"
          min="0"
          max="100"
          value={styleBlock.percentage || 0}
          onChange={(e) => onUpdate({ ...styleBlock, percentage: Number(e.target.value) })}
        />
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={styleBlock.description || ''}
          onChange={(e) => onUpdate({ ...styleBlock, description: e.target.value })}
          rows={4}
    </div>
  );
  const renderCTAEditor = (ctaBlock: CTABlock) => (
        <Label htmlFor="buttonText">Texto do Botão</Label>
          id="buttonText"
          value={ctaBlock.buttonText}
          onChange={(e) => onUpdate({ ...ctaBlock, buttonText: e.target.value })}
        <Label htmlFor="url">URL</Label>
          id="url"
          value={ctaBlock.url}
          onChange={(e) => onUpdate({ ...ctaBlock, url: e.target.value })}
        <Label htmlFor="pixelId">ID do Pixel (opcional)</Label>
          id="pixelId"
          value={ctaBlock.pixelId || ''}
          onChange={(e) => onUpdate({ ...ctaBlock, pixelId: e.target.value })}
        <Label htmlFor="backgroundColor">Cor de Fundo</Label>
        <div className="flex items-center gap-2">
          <Input
            id="backgroundColor"
            type="color"
            className="w-12 h-10 p-1"
            value={ctaBlock.backgroundColor || '#000000'}
            onChange={(e) => onUpdate({ ...ctaBlock, backgroundColor: e.target.value })}
          />
            className="flex-1"
        </div>
        <Label htmlFor="textColor">Cor do Texto</Label>
            id="textColor"
            value={ctaBlock.textColor || '#ffffff'}
            onChange={(e) => onUpdate({ ...ctaBlock, textColor: e.target.value })}
  const renderTestimonialEditor = (testimonialBlock: TestimonialBlock) => (
        <Label htmlFor="content">Depoimento</Label>
          id="content"
          value={testimonialBlock.content}
          onChange={handleContentChange}
        <Label htmlFor="author">Autor</Label>
          id="author"
          value={testimonialBlock.author}
          onChange={(e) => onUpdate({ ...testimonialBlock, author: e.target.value })}
        <Label htmlFor="authorImage">Imagem do Autor (URL)</Label>
          id="authorImage"
          value={testimonialBlock.authorImage || ''}
          onChange={(e) => onUpdate({ ...testimonialBlock, authorImage: e.target.value })}
        <Label htmlFor="rating">Avaliação (1-5)</Label>
          id="rating"
          min="1"
          max="5"
          value={testimonialBlock.rating || 5}
          onChange={(e) => onUpdate({ ...testimonialBlock, rating: Number(e.target.value) })}
  const renderCarouselEditor = (carouselBlock: CarouselBlock) => {
    const addCarouselItem = () => {
      const newItem = {
        id: `item-${Date.now()}`,
        imageUrl: '',
        caption: ''
      };
      
      onUpdate({
        ...carouselBlock,
        items: [...(carouselBlock.items || []), newItem]
      });
    };
    const updateCarouselItem = (index: number, key: string, value: string) => {
      const updatedItems = [...(carouselBlock.items || [])];
      updatedItems[index] = {
        ...updatedItems[index],
        items: updatedItems
    const removeCarouselItem = (index: number) => {
      updatedItems.splice(index, 1);
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Itens do Carrossel</Label>
          <Button size="sm" variant="outline" onClick={addCarouselItem}>
            <PlusCircle className="h-4 w-4 mr-1" /> Adicionar Item
          </Button>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {(carouselBlock.items || []).map((item, index) => (
              <Card key={item.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium">Item {index + 1}</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeCarouselItem(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor={`item-${index}-image`}>URL da Imagem</Label>
                    <Input
                      id={`item-${index}-image`}
                      value={item.imageUrl}
                      onChange={(e) => updateCarouselItem(index, 'imageUrl', e.target.value)}
                    />
                  </div>
                    <Label htmlFor={`item-${index}-caption`}>Legenda</Label>
                      id={`item-${index}-caption`}
                      value={item.caption || ''}
                      onChange={(e) => updateCarouselItem(index, 'caption', e.target.value)}
              </Card>
            ))}
          </div>
        </ScrollArea>
    );
  const renderDefaultEditor = () => (
        <Label htmlFor="content">Conteúdo</Label>
          value={block.content}
          rows={6}
      {block.type === 'image' && (
        <div className="space-y-2">
          <Label htmlFor="imageUrl">URL da Imagem</Label>
            id="imageUrl"
            value={block.imageUrl || ''}
            onChange={(e) => onUpdate({ ...block, imageUrl: e.target.value })}
      )}
  return (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium capitalize">{block.type}</h3>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleVisibilityToggle}
            title={block.isVisible === false ? "Mostrar bloco" : "Ocultar bloco"}
          >
            {block.isVisible === false ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={onDuplicate}>
            <Copy className="h-4 w-4" />
          <Button size="sm" variant="outline" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="pt-4">
          {renderSpecificBlockEditor()}
        </TabsContent>
        <TabsContent value="settings" className="pt-4">
            {abTestEnabled && (
              <div className="space-y-2">
                <Label htmlFor="abTestVariant">Variante de Teste A/B</Label>
                <Select
                  value={block.abTestVariant || ''}
                  onValueChange={handleAbTestVariantChange}
                >
                  <SelectTrigger id="abTestVariant">
                    <SelectValue placeholder="Selecione a variante" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as variantes</SelectItem>
                    {abTestVariants.map((variant) => (
                      <SelectItem key={variant} value={variant}>
                        {variant}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="isVisible">Visibilidade</Label>
                <Switch
                  id="isVisible"
                  checked={block.isVisible !== false}
                  onCheckedChange={() => handleVisibilityToggle()}
                />
              <p className="text-sm text-gray-500">
                Controle se este bloco deve ser exibido na página de resultados
              </p>
            </div>
      </Tabs>
};
