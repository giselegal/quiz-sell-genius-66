
import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlockType, ElementContent } from '@/types/visualEditor';

interface EditableElementRendererProps {
  type: BlockType;
  content: ElementContent;
  isPreviewMode: boolean;
  onUpdate: (updates: Partial<ElementContent>) => void;
}

export const EditableElementRenderer: React.FC<EditableElementRendererProps> = ({
  type,
  content,
  isPreviewMode,
  onUpdate
}) => {
  if (isPreviewMode) {
    // In preview mode, render normally without editing capabilities
    return <ElementRenderer type={type} content={content} />;
  }

  switch (type) {
    case 'title':
      return (
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs">Título</Badge>
          <InlineEditableText
            value={content.text || ''}
            onChange={(text) => onUpdate({ text })}
            placeholder="Digite o título..."
            className="text-2xl font-bold"
          />
        </div>
      );

    case 'text':
      return (
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs">Texto</Badge>
          <InlineEditableText
            value={content.text || ''}
            onChange={(text) => onUpdate({ text })}
            placeholder="Digite o texto..."
            multiline
            className="text-base"
          />
        </div>
      );

    case 'button':
      return (
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs">Botão</Badge>
          <Button 
            variant="default" 
            className="w-auto"
            onClick={(e) => e.preventDefault()}
          >
            <InlineEditableText
              value={content.text || ''}
              onChange={(text) => onUpdate({ text })}
              placeholder="Texto do botão"
              className="bg-transparent border-none text-white px-0 py-0 min-h-0"
            />
          </Button>
        </div>
      );

    case 'image':
      return (
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs">Imagem</Badge>
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
            {content.src ? (
              <div className="space-y-2">
                <img 
                  src={content.src} 
                  alt={content.alt || ''} 
                  className="max-w-full h-auto mx-auto rounded"
                />
                <InlineEditableText
                  value={content.alt || ''}
                  onChange={(alt) => onUpdate({ alt })}
                  placeholder="Texto alternativo da imagem"
                  className="text-sm text-gray-600"
                />
              </div>
            ) : (
              <div className="py-8">
                <p className="text-gray-500 mb-2">Clique para adicionar imagem</p>
                <InlineEditableText
                  value={content.src || ''}
                  onChange={(src) => onUpdate({ src })}
                  placeholder="URL da imagem"
                  className="text-sm"
                />
              </div>
            )}
          </div>
        </div>
      );

    case 'video':
      return (
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs">Vídeo</Badge>
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
            <InlineEditableText
              value={content.src || ''}
              onChange={(src) => onUpdate({ src })}
              placeholder="URL do vídeo (YouTube, Vimeo, etc.)"
              className="text-sm"
            />
          </div>
        </div>
      );

    case 'spacer':
      return (
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs">Espaçamento</Badge>
          <div 
            className="bg-gray-100 border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-500 text-sm"
            style={{ height: `${content.height || 40}px` }}
          >
            Espaço ({content.height || 40}px)
          </div>
        </div>
      );

    default:
      return (
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs">{type}</Badge>
          <InlineEditableText
            value={content.text || ''}
            onChange={(text) => onUpdate({ text })}
            placeholder={`Editar ${type}...`}
            className="text-base"
          />
        </div>
      );
  }
};

// Fallback ElementRenderer for preview mode
const ElementRenderer: React.FC<{ type: BlockType; content: ElementContent }> = ({ type, content }) => {
  switch (type) {
    case 'title':
      return <h2 className="text-2xl font-bold">{content.text || 'Título'}</h2>;
    case 'text':
      return <p className="text-base">{content.text || 'Texto'}</p>;
    case 'button':
      return <Button>{content.text || 'Botão'}</Button>;
    case 'image':
      return content.src ? (
        <img src={content.src} alt={content.alt || ''} className="max-w-full h-auto" />
      ) : (
        <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500">
          Imagem
        </div>
      );
    case 'video':
      return (
        <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-500">
          Vídeo: {content.src || 'URL não definida'}
        </div>
      );
    case 'spacer':
      return <div style={{ height: `${content.height || 40}px` }} />;
    default:
      return <div className="p-4 bg-gray-100 rounded">{content.text || type}</div>;
  }
};
