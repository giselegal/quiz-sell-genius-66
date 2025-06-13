
import React from 'react';
import { EditorPage, EditorElement } from './InLeadEditor';

interface InLeadCanvasProps {
  page: EditorPage | undefined;
  selectedElementId: string | null;
  onSelectElement: (elementId: string | null) => void;
  onUpdateElement: (elementId: string, updates: Partial<EditorElement>) => void;
}

export const InLeadCanvas: React.FC<InLeadCanvasProps> = ({
  page,
  selectedElementId,
  onSelectElement,
  onUpdateElement
}) => {
  if (!page) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Nenhuma página selecionada</h3>
          <p>Selecione ou crie uma página para começar</p>
        </div>
      </div>
    );
  }

  const renderElement = (element: EditorElement) => {
    const isSelected = selectedElementId === element.id;
    
    const baseStyle = {
      ...element.style,
      cursor: 'pointer',
      position: 'relative' as const,
      margin: '10px 0'
    };

    const wrapperStyle = {
      border: isSelected ? '2px solid #007bff' : '2px solid transparent',
      borderRadius: '4px',
      padding: '4px',
      transition: 'border-color 0.2s'
    };

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onSelectElement(element.id);
    };

    let content;
    switch (element.type) {
      case 'heading':
        const HeadingTag = element.content.level || 'h1';
        content = (
          <HeadingTag style={baseStyle}>
            {element.content.text || 'Título'}
          </HeadingTag>
        );
        break;
        
      case 'text':
        content = (
          <p style={baseStyle}>
            {element.content.text || 'Texto'}
          </p>
        );
        break;
        
      case 'image':
        content = (
          <img
            src={element.content.src || 'https://via.placeholder.com/400x200'}
            alt={element.content.alt || 'Imagem'}
            style={{ ...baseStyle, maxWidth: '100%', height: 'auto' }}
          />
        );
        break;
        
      case 'button':
        content = (
          <button
            style={{
              ...baseStyle,
              border: 'none',
              cursor: 'pointer',
              color: 'white'
            }}
            onClick={(e) => e.preventDefault()}
          >
            {element.content.text || 'Botão'}
          </button>
        );
        break;
        
      case 'form':
        content = (
          <div style={baseStyle}>
            <form className="space-y-4">
              {element.content.fields?.map((field: any, index: number) => (
                <div key={index}>
                  <label className="block text-sm font-medium mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required={field.required}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder={`Digite seu ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={(e) => e.preventDefault()}
              >
                Enviar
              </button>
            </form>
          </div>
        );
        break;
        
      case 'video':
        content = (
          <div style={baseStyle}>
            {element.content.url ? (
              <video
                controls
                style={{ width: '100%', maxWidth: '600px' }}
                poster={element.content.poster}
              >
                <source src={element.content.url} />
                Seu navegador não suporta vídeos.
              </video>
            ) : (
              <div className="bg-gray-200 p-8 text-center rounded">
                <p>Adicione uma URL de vídeo nas propriedades</p>
              </div>
            )}
          </div>
        );
        break;
        
      case 'quiz-question':
        content = (
          <div style={baseStyle}>
            <h3 className="text-lg font-semibold mb-4">
              {element.content.question || 'Sua pergunta aqui?'}
            </h3>
            <div className="space-y-2">
              {element.content.options?.map((option: string, index: number) => (
                <label key={index} className="flex items-center space-x-2">
                  <input type="radio" name={`question-${element.id}`} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        );
        break;
        
      default:
        content = (
          <div style={baseStyle}>
            Elemento não suportado: {element.type}
          </div>
        );
    }

    return (
      <div
        key={element.id}
        style={wrapperStyle}
        onClick={handleClick}
      >
        {content}
        {isSelected && (
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-bl transform -translate-y-full">
            {element.type}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className="p-8 min-h-full"
      onClick={() => onSelectElement(null)}
    >
      {page.elements.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <h3 className="text-xl font-medium mb-2">Página em branco</h3>
          <p>Adicione elementos usando a barra lateral</p>
        </div>
      ) : (
        <div className="space-y-4">
          {page.elements.map(renderElement)}
        </div>
      )}
    </div>
  );
};
