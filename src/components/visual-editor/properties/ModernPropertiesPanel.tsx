
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Trash2, Settings, Eye, EyeOff, Copy } from 'lucide-react';
import { EditorElement } from '@/hooks/useModernEditor';

interface ModernPropertiesPanelProps {
  selectedElement: EditorElement | null;
  onUpdateElement: (id: string, updates: Partial<EditorElement>) => void;
  onDeleteElement: (id: string) => void;
  onDuplicateElement: () => void;
}

export const ModernPropertiesPanel: React.FC<ModernPropertiesPanelProps> = ({
  selectedElement,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'advanced'>('content');

  if (!selectedElement) {
    return (
      <div className="h-full bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-gray-900">Propriedades</h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center text-gray-500">
            <Settings className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Selecione um elemento para editar suas propriedades</p>
          </div>
        </div>
      </div>
    );
  }

  const updateContent = (updates: any) => {
    onUpdateElement(selectedElement.id, {
      content: { ...selectedElement.content, ...updates }
    });
  };

  const updateStyle = (updates: any) => {
    onUpdateElement(selectedElement.id, {
      style: { ...selectedElement.style, ...updates }
    });
  };

  const renderMarqueeProperties = () => {
    const testimonials = selectedElement.content.testimonials || [];
    
    const addTestimonial = () => {
      const newTestimonials = [...testimonials, {
        id: Date.now().toString(),
        name: 'Nome',
        username: '@usuario',
        avatar: `https://avatar.vercel.sh/${Date.now()}`,
        content: 'Depoimento aqui...'
      }];
      updateContent({ testimonials: newTestimonials });
    };

    const updateTestimonial = (index: number, updates: any) => {
      const newTestimonials = [...testimonials];
      newTestimonials[index] = { ...newTestimonials[index], ...updates };
      updateContent({ testimonials: newTestimonials });
    };

    const removeTestimonial = (index: number) => {
      const newTestimonials = testimonials.filter((_: any, i: number) => i !== index);
      updateContent({ testimonials: newTestimonials });
    };

    return (
      <div className="space-y-6">
        {/* Animation Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Animação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="duration">Duração</Label>
              <Input
                id="duration"
                value={selectedElement.content.duration || '40s'}
                onChange={(e) => updateContent({ duration: e.target.value })}
                placeholder="40s"
              />
            </div>
            
            <div>
              <Label htmlFor="gap">Espaçamento</Label>
              <Input
                id="gap"
                value={selectedElement.content.gap || '1rem'}
                onChange={(e) => updateContent({ gap: e.target.value })}
                placeholder="1rem"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="pauseOnHover"
                checked={selectedElement.content.pauseOnHover !== false}
                onCheckedChange={(checked) => updateContent({ pauseOnHover: checked })}
              />
              <Label htmlFor="pauseOnHover">Pausar no hover</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showGradients"
                checked={selectedElement.content.showGradients !== false}
                onCheckedChange={(checked) => updateContent({ showGradients: checked })}
              />
              <Label htmlFor="showGradients">Mostrar gradientes</Label>
            </div>

            <div>
              <Label htmlFor="cardWidth">Largura dos cards</Label>
              <Input
                id="cardWidth"
                value={selectedElement.content.cardWidth || '256px'}
                onChange={(e) => updateContent({ cardWidth: e.target.value })}
                placeholder="256px"
              />
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Depoimentos</CardTitle>
            <Button onClick={addTestimonial} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Adicionar
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {testimonials.map((testimonial: any, index: number) => (
              <Card key={testimonial.id || index} className="relative">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      #{index + 1}
                    </Badge>
                    <Button
                      onClick={() => removeTestimonial(index)}
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Nome</Label>
                      <Input
                        value={testimonial.name}
                        onChange={(e) => updateTestimonial(index, { name: e.target.value })}
                        placeholder="Nome"
                        className="text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Username</Label>
                      <Input
                        value={testimonial.username}
                        onChange={(e) => updateTestimonial(index, { username: e.target.value })}
                        placeholder="@usuario"
                        className="text-xs"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-xs">Avatar URL</Label>
                    <Input
                      value={testimonial.avatar}
                      onChange={(e) => updateTestimonial(index, { avatar: e.target.value })}
                      placeholder="https://avatar.vercel.sh/nome"
                      className="text-xs"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs">Depoimento</Label>
                    <Textarea
                      value={testimonial.content}
                      onChange={(e) => updateTestimonial(index, { content: e.target.value })}
                      placeholder="Escreva o depoimento aqui..."
                      className="text-xs"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {testimonials.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                <p className="text-sm">Nenhum depoimento adicionado</p>
                <p className="text-xs">Clique em "Adicionar" para criar o primeiro</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderContentTab = () => {
    if (selectedElement.type === 'marquee') {
      return renderMarqueeProperties();
    }

    return (
      <div className="space-y-4">
        {/* Standard content properties */}
        {(['text', 'heading', 'button'].includes(selectedElement.type)) && (
          <div>
            <Label htmlFor="text">Texto</Label>
            <Textarea
              id="text"
              value={selectedElement.content.text || ''}
              onChange={(e) => updateContent({ text: e.target.value })}
              placeholder="Digite o texto aqui..."
              rows={3}
            />
          </div>
        )}

        {selectedElement.type === 'heading' && (
          <div>
            <Label htmlFor="level">Nível</Label>
            <Select 
              value={selectedElement.content.level || 'h2'}
              onValueChange={(value) => updateContent({ level: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="h1">H1 - Título Principal</SelectItem>
                <SelectItem value="h2">H2 - Subtítulo</SelectItem>
                <SelectItem value="h3">H3 - Título Menor</SelectItem>
                <SelectItem value="h4">H4 - Título Pequeno</SelectItem>
                <SelectItem value="h5">H5 - Título Muito Pequeno</SelectItem>
                <SelectItem value="h6">H6 - Título Mínimo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {['image', 'video'].includes(selectedElement.type) && (
          <div>
            <Label htmlFor="src">URL</Label>
            <Input
              id="src"
              value={selectedElement.content.src || ''}
              onChange={(e) => updateContent({ src: e.target.value })}
              placeholder="https://exemplo.com/arquivo"
            />
          </div>
        )}

        {selectedElement.type === 'image' && (
          <div>
            <Label htmlFor="alt">Texto Alternativo</Label>
            <Input
              id="alt"
              value={selectedElement.content.alt || ''}
              onChange={(e) => updateContent({ alt: e.target.value })}
              placeholder="Descrição da imagem"
            />
          </div>
        )}

        {selectedElement.type === 'spacer' && (
          <div>
            <Label htmlFor="height">Altura</Label>
            <Input
              id="height"
              value={selectedElement.content.height || '2rem'}
              onChange={(e) => updateContent({ height: e.target.value })}
              placeholder="2rem"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Propriedades</h2>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUpdateElement(selectedElement.id, { visible: !selectedElement.visible })}
            >
              {selectedElement.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={onDuplicateElement}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            {selectedElement.type}
          </Badge>
          <span className="text-xs text-gray-500">#{selectedElement.id.slice(0, 8)}</span>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {['content', 'style', 'advanced'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-3 py-2 text-xs font-medium capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'content' ? 'Conteúdo' : tab === 'style' ? 'Estilo' : 'Avançado'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'content' && renderContentTab()}
        
        {activeTab === 'style' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Configurações de estilo em desenvolvimento...</p>
          </div>
        )}
        
        {activeTab === 'advanced' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="visible"
                checked={selectedElement.visible}
                onCheckedChange={(checked) => onUpdateElement(selectedElement.id, { visible: checked })}
              />
              <Label htmlFor="visible">Visível</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="locked"
                checked={selectedElement.locked}
                onCheckedChange={(checked) => onUpdateElement(selectedElement.id, { locked: checked })}
              />
              <Label htmlFor="locked">Bloqueado</Label>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="border-t p-4">
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => onDeleteElement(selectedElement.id)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Excluir Elemento
        </Button>
      </div>
    </div>
  );
};
