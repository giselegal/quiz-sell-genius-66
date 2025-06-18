import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { EditableQuestion } from './editable/EditableQuestion';

interface ElementRendererProps {
  type: string;
  content: any;
  isSelected?: boolean;
  isPreviewMode?: boolean;
  onUpdate?: (content: any) => void;
}

export const ElementRenderer: React.FC<ElementRendererProps> = ({
  type,
  content,
  isSelected = false,
  isPreviewMode = false,
  onUpdate = () => {}
}) => {
  switch (type) {
    case 'headline':
      return (
        <h1 
          className="min-w-full text-3xl font-bold text-center"
          data-sentry-component="EditableHeading"
        >
          {content.title || content.text || 'Título'}
        </h1>
      );
      
    case 'text':
      return (
        <p className="text-lg text-gray-700 leading-relaxed">
          {content.text || 'Texto de exemplo'}
        </p>
      );
      
    case 'question-title':
      return (
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          {content.text || 'Título da questão'}
        </h2>
      );
      
    case 'question-options':
      return (
        <EditableQuestion
          content={content}
          isSelected={isSelected}
          isPreviewMode={isPreviewMode}
          onUpdate={onUpdate}
        />
      );
      
    case 'image':
      return (
        <div className="grid" data-sentry-component="EditableImage">
          <div className="text-lg">
            <div className="text-lg flex items-center justify-center">
              <img 
                src={content.imageUrl || content.src || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjQ4MCIgdmlld0JveD0iMCAwIDY0MCA0ODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iNDgwIiBmaWxsPSIjZjFmMWYxIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkltYWdlbTwvdGV4dD4KPHN2Zz4='} 
                width="640" 
                height="480" 
                alt={content.alt || 'Imagem'} 
                className="object-cover w-full h-auto rounded-lg max-w-96"
              />
            </div>
          </div>
        </div>
      );
      
    case 'button':
      return (
        <Button 
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 min-w-full h-14"
          data-sentry-element="Button"
          data-sentry-component="EditableButton"
        >
          {content.text || 'Continuar'}
        </Button>
      );
      
    case 'form':
    case 'cta':
      return (
        <div className="grid w-full items-center gap-1.5" data-sentry-component="EditableInput">
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {content.label || 'NOME'} <span>*</span>
          </Label>
          <Input 
            className="flex h-10 w-full rounded-md border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-inherit placeholder:opacity-50 text-base text-left p-4"
            placeholder={content.placeholder || 'Digite seu nome aqui...'}
            type="text"
            value=""
          />
        </div>
      );
      
    case 'countdown':
      return (
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold text-red-600">
            {content.time || '05:00'}
          </div>
          <p className="text-sm text-gray-600">
            {content.message || 'Tempo limitado!'}
          </p>
        </div>
      );
      
    case 'pricing':
      return (
        <div className="text-center space-y-4">
          {content.regularPrice && (
            <p className="text-lg line-through text-gray-500">
              R$ {content.regularPrice}
            </p>
          )}
          <p className="text-3xl font-bold text-green-600">
            R$ {content.salePrice || '97,00'}
          </p>
        </div>
      );
      
    case 'testimonial':
      return (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="italic text-gray-700 mb-2">
            "{content.quote || 'Depoimento incrível sobre o produto...'}"
          </p>
          <p className="font-semibold text-gray-900">
            {content.author || 'Cliente Satisfeito'}
          </p>
        </div>
      );
      
    case 'rating':
      return (
        <div className="flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-yellow-400 text-xl">⭐</span>
          ))}
          <span className="ml-2 text-gray-600">
            {content.rating || '5.0'} ({content.reviews || '127'} avaliações)
          </span>
        </div>
      );
      
    case 'social-proof':
      return (
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {content.number || '1.247'}
          </div>
          <p className="text-sm text-gray-600">
            {content.label || 'pessoas já compraram'}
          </p>
        </div>
      );
      
    case 'guarantee':
      return (
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            🛡️
          </div>
          <div>
            <h4 className="font-semibold text-green-800">
              {content.title || 'Garantia de 30 dias'}
            </h4>
            <p className="text-green-700 text-sm">
              {content.description || '100% do seu dinheiro de volta'}
            </p>
          </div>
        </div>
      );
      
    case 'bonus':
      return (
        <div className="border-2 border-dashed border-yellow-400 p-4 rounded-lg bg-yellow-50">
          <h4 className="font-bold text-yellow-800 mb-2">
            🎁 {content.title || 'Bônus Exclusivo'}
          </h4>
          <p className="text-yellow-700">
            {content.description || 'Receba este bônus incrível gratuitamente!'}
          </p>
        </div>
      );
      
    case 'divider':
      return (
        <hr className="border-gray-300 my-4" />
      );
      
    case 'spacer':
      return (
        <div 
          className="w-full" 
          style={{ height: content.height || '20px' }}
        />
      );
      
    case 'container':
      return (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[100px] flex items-center justify-center"
          style={content.style}
        >
          <span className="text-gray-400">Container - Arraste componentes aqui</span>
        </div>
      );
      
    default:
      return (
        <div className="p-4 border-2 border-dashed border-red-300 rounded bg-red-50 text-red-700">
          <p>Tipo de componente não implementado: {type}</p>
        </div>
      );
  }
};
