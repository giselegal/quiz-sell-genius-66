// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown,
  Type,
  Image,
  ShoppingCart,
  CheckCircle,
  Star,
  Quote
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { safeLocalStorage } from '@/utils/safeLocalStorage';

interface ContentBlock {
  id: string;
  type: 'title' | 'subtitle' | 'text' | 'image' | 'button' | 'benefits' | 'testimonial' | 'price';
  content: {
    text?: string;
    imageUrl?: string;
    buttonText?: string;
    buttonLink?: string;
    price?: string;
    originalPrice?: string;
    benefits?: string[];
  };
  style: {
    textAlign?: 'left' | 'center' | 'right';
    fontSize?: string;
    color?: string;
    backgroundColor?: string;
    margin?: string;
    padding?: string;
  };
}

interface PageConfig {
  title: string;
  blocks: ContentBlock[];
  globalStyle: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    fontFamily: string;
  };
}

const defaultBlocks: ContentBlock[] = [
  {
    id: '1',
    type: 'title',
    content: { text: 'Descubra Seu Estilo Perfeito' },
    style: { textAlign: 'center', fontSize: '2.5rem', color: '#432818', margin: '2rem 0' }
  },
  {
    id: '2',
    type: 'subtitle',
    content: { text: 'Baseado nas suas respostas, encontramos o estilo ideal para você!' },
    style: { textAlign: 'center', fontSize: '1.2rem', color: '#8F7A6A', margin: '1rem 0' }
  },
  {
    id: '3',
    type: 'benefits',
    content: { 
      benefits: [
        'Consultoria personalizada de estilo',
        'Guia completo de cores que favorecem você',
        'Lista de peças essenciais para seu guarda-roupa'
      ]
    },
    style: { margin: '2rem 0' }
  },
  {
    id: '4',
    type: 'price',
    content: { 
      price: 'R$ 97,00',
      originalPrice: 'R$ 297,00',
      buttonText: 'GARANTIR MINHA CONSULTORIA',
      buttonLink: '#'
    },
    style: { textAlign: 'center', margin: '2rem 0' }
  }
];

const QuickVisualEditor: React.FC = () => {
  const [isPreview, setIsPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'result' | 'offer'>('result');
  const [resultConfig, setResultConfig] = useState<PageConfig>({
    title: 'Página de Resultado',
    blocks: defaultBlocks,
    globalStyle: {
      primaryColor: '#B89B7A',
      secondaryColor: '#432818',
      backgroundColor: '#FAF9F7',
      fontFamily: 'Inter, sans-serif'
    }
  });
  const [offerConfig, setOfferConfig] = useState<PageConfig>({
    title: 'Página de Oferta',
    blocks: [...defaultBlocks],
    globalStyle: {
      primaryColor: '#B89B7A',
      secondaryColor: '#432818',
      backgroundColor: '#FAF9F7',
      fontFamily: 'Inter, sans-serif'
    }
  });

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  // Load saved configs
  useEffect(() => {
    const savedResult = safeLocalStorage.getItem('quick-editor-result');
    const savedOffer = safeLocalStorage.getItem('quick-editor-offer');
    
    if (savedResult) {
      try {
        setResultConfig(JSON.parse(savedResult));
      } catch (e) {
        console.warn('Error loading result config');
      }
    }
    
    if (savedOffer) {
      try {
        setOfferConfig(JSON.parse(savedOffer));
      } catch (e) {
        console.warn('Error loading offer config');
      }
    }
  }, []);

  const currentConfig = activeTab === 'result' ? resultConfig : offerConfig;
  const setCurrentConfig = activeTab === 'result' ? setResultConfig : setOfferConfig;

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: getDefaultContent(type),
      style: getDefaultStyle(type)
    };

    setCurrentConfig(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock]
    }));
  };

  const updateBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    setCurrentConfig(prev => ({
      ...prev,
      blocks: prev.blocks.map(block => 
        block.id === blockId ? { ...block, ...updates } : block
      )
    }));
  };

  const deleteBlock = (blockId: string) => {
    setCurrentConfig(prev => ({
      ...prev,
      blocks: prev.blocks.filter(block => block.id !== blockId)
    }));
    setSelectedBlockId(null);
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    setCurrentConfig(prev => {
      const blocks = [...prev.blocks];
      const index = blocks.findIndex(b => b.id === blockId);
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      
      if (newIndex >= 0 && newIndex < blocks.length) {
        [blocks[index], blocks[newIndex]] = [blocks[newIndex], blocks[index]];
      }
      
      return { ...prev, blocks };
    });
  };

  const saveConfig = () => {
    safeLocalStorage.setItem(
      activeTab === 'result' ? 'quick-editor-result' : 'quick-editor-offer',
      JSON.stringify(currentConfig)
    );
    
    toast({
      title: "Configuração salva!",
      description: `A página de ${activeTab === 'result' ? 'resultado' : 'oferta'} foi salva com sucesso.`,
    });
  };

  const getDefaultContent = (type: ContentBlock['type']) => {
    switch (type) {
      case 'title': return { text: 'Título Principal' };
      case 'subtitle': return { text: 'Subtítulo descritivo' };
      case 'text': return { text: 'Texto explicativo aqui...' };
      case 'image': return { imageUrl: 'https://via.placeholder.com/400x300', text: 'Descrição da imagem' };
      case 'button': return { buttonText: 'Clique Aqui', buttonLink: '#' };
      case 'benefits': return { benefits: ['Benefício 1', 'Benefício 2', 'Benefício 3'] };
      case 'testimonial': return { text: 'Depoimento incrível de cliente satisfeito!', buttonText: 'Cliente Satisfeito' };
      case 'price': return { price: 'R$ 97,00', originalPrice: 'R$ 297,00', buttonText: 'COMPRAR AGORA' };
      default: return {};
    }
  };

  const getDefaultStyle = (type: ContentBlock['type']) => {
    const baseStyle = { margin: '1rem 0', padding: '1rem' };
    switch (type) {
      case 'title': return { ...baseStyle, textAlign: 'center' as const, fontSize: '2rem', color: '#432818' };
      case 'subtitle': return { ...baseStyle, textAlign: 'center' as const, fontSize: '1.2rem', color: '#8F7A6A' };
      case 'price': return { ...baseStyle, textAlign: 'center' as const, backgroundColor: '#B89B7A', color: 'white' };
      default: return baseStyle;
    }
  };

  const renderBlock = (block: ContentBlock) => {
    const isSelected = selectedBlockId === block.id;
    const blockStyle = {
      textAlign: block.style.textAlign || 'left',
      fontSize: block.style.fontSize || '1rem',
      color: block.style.color || '#432818',
      backgroundColor: block.style.backgroundColor || 'transparent',
      margin: block.style.margin || '1rem 0',
      padding: block.style.padding || '1rem',
      border: isSelected ? '2px dashed #B89B7A' : '1px solid transparent',
      borderRadius: '8px',
      cursor: isPreview ? 'default' : 'pointer',
      position: 'relative' as const
    };

    const handleBlockClick = () => {
      if (!isPreview) {
        setSelectedBlockId(block.id);
      }
    };

    switch (block.type) {
      case 'title':
        return (
          <div key={block.id} style={blockStyle} onClick={handleBlockClick}>
            <h1 style={{ margin: 0, fontSize: 'inherit' }}>{block.content.text}</h1>
          </div>
        );
      
      case 'subtitle':
        return (
          <div key={block.id} style={blockStyle} onClick={handleBlockClick}>
            <h2 style={{ margin: 0, fontSize: 'inherit' }}>{block.content.text}</h2>
          </div>
        );
      
      case 'text':
        return (
          <div key={block.id} style={blockStyle} onClick={handleBlockClick}>
            <p style={{ margin: 0 }}>{block.content.text}</p>
          </div>
        );
      
      case 'image':
        return (
          <div key={block.id} style={blockStyle} onClick={handleBlockClick}>
            <img 
              src={block.content.imageUrl} 
              alt={block.content.text || 'Imagem'} 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
            />
            {block.content.text && <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', opacity: 0.8 }}>{block.content.text}</p>}
          </div>
        );
      
      case 'button':
        return (
          <div key={block.id} style={blockStyle} onClick={handleBlockClick}>
            <button 
              style={{
                backgroundColor: currentConfig.globalStyle.primaryColor,
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: block.style.textAlign === 'center' ? 'auto' : '100%'
              }}
            >
              {block.content.buttonText}
            </button>
          </div>
        );
      
      case 'benefits':
        return (
          <div key={block.id} style={blockStyle} onClick={handleBlockClick}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {block.content.benefits?.map((benefit, index) => (
                <li key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  margin: '0.5rem 0',
                  padding: '0.5rem',
                  backgroundColor: 'rgba(184, 155, 122, 0.1)',
                  borderRadius: '4px'
                }}>
                  <CheckCircle style={{ color: currentConfig.globalStyle.primaryColor, marginRight: '0.5rem', width: '20px', height: '20px' }} />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        );
      
      case 'testimonial':
        return (
          <div key={block.id} style={{ ...blockStyle, backgroundColor: '#f9f9f9', borderLeft: `4px solid ${currentConfig.globalStyle.primaryColor}` }} onClick={handleBlockClick}>
            <Quote style={{ color: currentConfig.globalStyle.primaryColor, marginBottom: '0.5rem' }} />
            <p style={{ margin: '0 0 0.5rem 0', fontStyle: 'italic' }}>{block.content.text}</p>
            <p style={{ margin: 0, fontWeight: 'bold', color: currentConfig.globalStyle.primaryColor }}>
              - {block.content.buttonText}
            </p>
          </div>
        );
      
      case 'price':
        return (
          <div key={block.id} style={blockStyle} onClick={handleBlockClick}>
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'rgba(184, 155, 122, 0.1)', borderRadius: '8px' }}>
              {block.content.originalPrice && (
                <p style={{ 
                  margin: '0 0 0.5rem 0', 
                  textDecoration: 'line-through', 
                  color: '#999',
                  fontSize: '1.2rem'
                }}>
                  De: {block.content.originalPrice}
                </p>
              )}
              <p style={{ 
                margin: '0 0 1rem 0', 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                color: currentConfig.globalStyle.primaryColor 
              }}>
                {block.content.price}
              </p>
              <button 
                style={{
                  backgroundColor: currentConfig.globalStyle.primaryColor,
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {block.content.buttonText}
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderEditor = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
      {/* Sidebar - Components */}
      <div className="lg:col-span-1 bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-4">Componentes</h3>
        <div className="space-y-2">
          {[
            { type: 'title', icon: Type, label: 'Título' },
            { type: 'subtitle', icon: Type, label: 'Subtítulo' },
            { type: 'text', icon: Type, label: 'Texto' },
            { type: 'image', icon: Image, label: 'Imagem' },
            { type: 'button', icon: ShoppingCart, label: 'Botão' },
            { type: 'benefits', icon: CheckCircle, label: 'Benefícios' },
            { type: 'testimonial', icon: Quote, label: 'Depoimento' },
            { type: 'price', icon: Star, label: 'Preço' }
          ].map(({ type, icon: Icon, label }) => (
            <Button
              key={type}
              variant="outline"
              className="w-full justify-start"
              onClick={() => addBlock(type as ContentBlock['type'])}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Canvas */}
      <div className="lg:col-span-2 bg-white border rounded-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">Preview da Página</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreview(!isPreview)}
            >
              {isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {isPreview ? 'Editar' : 'Preview'}
            </Button>
            <Button onClick={saveConfig}>
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
        <div className="p-4 min-h-[600px]" style={{ backgroundColor: currentConfig.globalStyle.backgroundColor }}>
          {currentConfig.blocks.map(block => renderBlock(block))}
        </div>
      </div>

      {/* Properties Panel */}
      <div className="lg:col-span-1 bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-4">Propriedades</h3>
        {selectedBlockId ? (
          <BlockEditor 
            block={currentConfig.blocks.find(b => b.id === selectedBlockId)!}
            onUpdate={(updates) => updateBlock(selectedBlockId, updates)}
            onDelete={() => deleteBlock(selectedBlockId)}
            onMove={(direction) => moveBlock(selectedBlockId, direction)}
          />
        ) : (
          <p className="text-gray-500 text-sm">Selecione um componente para editar</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'result' | 'offer')}>
          <TabsList>
            <TabsTrigger value="result">Página de Resultado</TabsTrigger>
            <TabsTrigger value="offer">Página de Oferta</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex-1">
        {renderEditor()}
      </div>
    </div>
  );
};

interface BlockEditorProps {
  block: ContentBlock;
  onUpdate: (updates: Partial<ContentBlock>) => void;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ block, onUpdate, onDelete, onMove }) => {
  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: { ...block.content, [key]: value }
    });
  };

  const updateStyle = (key: string, value: any) => {
    onUpdate({
      style: { ...block.style, [key]: value }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Badge>{block.type}</Badge>
        <div className="flex gap-1">
          <Button size="sm" variant="outline" onClick={() => onMove('up')}>
            <ArrowUp className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => onMove('down')}>
            <ArrowDown className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Content Fields */}
      <div className="space-y-3">
        {block.type === 'title' || block.type === 'subtitle' || block.type === 'text' ? (
          <div>
            <Label>Texto</Label>
            <Textarea
              value={block.content.text || ''}
              onChange={(e) => updateContent('text', e.target.value)}
              rows={3}
            />
          </div>
        ) : null}

        {block.type === 'image' ? (
          <>
            <div>
              <Label>URL da Imagem</Label>
              <Input
                value={block.content.imageUrl || ''}
                onChange={(e) => updateContent('imageUrl', e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Descrição</Label>
              <Input
                value={block.content.text || ''}
                onChange={(e) => updateContent('text', e.target.value)}
              />
            </div>
          </>
        ) : null}

        {block.type === 'button' ? (
          <>
            <div>
              <Label>Texto do Botão</Label>
              <Input
                value={block.content.buttonText || ''}
                onChange={(e) => updateContent('buttonText', e.target.value)}
              />
            </div>
            <div>
              <Label>Link</Label>
              <Input
                value={block.content.buttonLink || ''}
                onChange={(e) => updateContent('buttonLink', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </>
        ) : null}

        {block.type === 'benefits' ? (
          <div>
            <Label>Benefícios (um por linha)</Label>
            <Textarea
              value={block.content.benefits?.join('\n') || ''}
              onChange={(e) => updateContent('benefits', e.target.value.split('\n').filter(Boolean))}
              rows={5}
            />
          </div>
        ) : null}

        {block.type === 'price' ? (
          <>
            <div>
              <Label>Preço</Label>
              <Input
                value={block.content.price || ''}
                onChange={(e) => updateContent('price', e.target.value)}
                placeholder="R$ 97,00"
              />
            </div>
            <div>
              <Label>Preço Original</Label>
              <Input
                value={block.content.originalPrice || ''}
                onChange={(e) => updateContent('originalPrice', e.target.value)}
                placeholder="R$ 297,00"
              />
            </div>
            <div>
              <Label>Texto do Botão</Label>
              <Input
                value={block.content.buttonText || ''}
                onChange={(e) => updateContent('buttonText', e.target.value)}
              />
            </div>
          </>
        ) : null}
      </div>

      {/* Style Fields */}
      <div className="space-y-3 pt-3 border-t">
        <h4 className="font-medium">Estilo</h4>
        
        <div>
          <Label>Alinhamento</Label>
          <select
            className="w-full p-2 border rounded"
            value={block.style.textAlign || 'left'}
            onChange={(e) => updateStyle('textAlign', e.target.value)}
          >
            <option value="left">Esquerda</option>
            <option value="center">Centro</option>
            <option value="right">Direita</option>
          </select>
        </div>

        <div>
          <Label>Cor do Texto</Label>
          <Input
            type="color"
            value={block.style.color || '#432818'}
            onChange={(e) => updateStyle('color', e.target.value)}
          />
        </div>

        <div>
          <Label>Cor de Fundo</Label>
          <Input
            type="color"
            value={block.style.backgroundColor || '#ffffff'}
            onChange={(e) => updateStyle('backgroundColor', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default QuickVisualEditor;
