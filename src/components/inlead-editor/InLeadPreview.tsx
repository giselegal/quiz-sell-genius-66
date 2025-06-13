
import React from 'react';
import { EditorPage } from './InLeadEditor';

interface InLeadPreviewProps {
  page: EditorPage | undefined;
}

export const InLeadPreview: React.FC<InLeadPreviewProps> = ({ page }) => {
  if (!page) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Nenhuma página para visualizar</p>
      </div>
    );
  }

  const renderElement = (element: any) => {
    const style = element.style;

    switch (element.type) {
      case 'heading':
        const HeadingTag = element.content.level || 'h1';
        return (
          <HeadingTag key={element.id} style={style}>
            {element.content.text}
          </HeadingTag>
        );
        
      case 'text':
        return (
          <p key={element.id} style={style}>
            {element.content.text}
          </p>
        );
        
      case 'image':
        return (
          <img
            key={element.id}
            src={element.content.src}
            alt={element.content.alt}
            style={{ ...style, maxWidth: '100%', height: 'auto' }}
          />
        );
        
      case 'button':
        return (
          <button
            key={element.id}
            style={{
              ...style,
              border: 'none',
              cursor: 'pointer',
              color: 'white'
            }}
            onClick={() => {
              if (element.content.url) {
                window.open(element.content.url, '_blank');
              }
            }}
          >
            {element.content.text}
          </button>
        );
        
      case 'form':
        return (
          <div key={element.id} style={style}>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              alert('Formulário enviado! (modo preview)');
            }}>
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
              >
                Enviar
              </button>
            </form>
          </div>
        );
        
      case 'video':
        return (
          <div key={element.id} style={style}>
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
                <p>Vídeo não configurado</p>
              </div>
            )}
          </div>
        );
        
      case 'quiz-question':
        return (
          <div key={element.id} style={style}>
            <h3 className="text-lg font-semibold mb-4">
              {element.content.question}
            </h3>
            <div className="space-y-2">
              {element.content.options?.map((option: string, index: number) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name={`question-${element.id}`} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <div className="space-y-6">
        {page.elements.map(renderElement)}
      </div>
    </div>
  );
};
