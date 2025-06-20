import React from 'react';
import { useEditorState, useEditorActions, type QuizComponent } from '@/store/editorStore';

interface ComponentRendererProps {
  component: QuizComponent;
  index: number;
  isPreviewMode: boolean;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  index,
  isPreviewMode,
}) => {
  const { selectedComponentId } = useEditorState();
  const { setSelectedComponentId } = useEditorActions();

  const isSelected = selectedComponentId === component.id;

  const handleClick = (e: React.MouseEvent) => {
    if (!isPreviewMode) {
      e.stopPropagation();
      setSelectedComponentId(component.id);
    }
  };

  const renderComponent = () => {
    const { props } = component;
    const baseStyle: React.CSSProperties = {
      backgroundColor: props.backgroundColor,
      color: props.textColor,
      borderRadius: props.borderRadius,
      fontSize: props.fontSize,
      padding: props.padding,
      margin: props.margin,
      textAlign: (props.alignment as 'left' | 'center' | 'right') || 'left',
      boxShadow: props.shadow ? `0 ${props.shadow}px ${props.shadow * 2}px rgba(0,0,0,0.1)` : undefined,
    };

    switch (component.type) {
      case 'heading':
        return (
          <h1 style={baseStyle} className="font-bold">
            {props.text || 'Título'}
          </h1>
        );

      case 'text':
        return (
          <p style={baseStyle}>
            {props.text || 'Texto do parágrafo'}
          </p>
        );

      case 'image':
        return (
          <div style={{ textAlign: (props.alignment as 'left' | 'center' | 'right') || 'center' }}>
            <img
              src={props.src || 'https://via.placeholder.com/400x200?text=Imagem'}
              alt={props.alt || 'Imagem'}
              style={{
                ...baseStyle,
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
        );

      case 'button':
        return (
          <div style={{ textAlign: (props.alignment as 'left' | 'center' | 'right') || 'center' }}>
            <button
              style={{
                ...baseStyle,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-block',
              }}
              className="hover:opacity-90 transition-opacity"
            >
              {props.buttonText || 'Botão'}
            </button>
          </div>
        );

      case 'input':
        return (
          <div style={baseStyle}>
            {props.label && (
              <label className="block mb-2 font-medium">
                {props.label}
                {props.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
            <input
              type="text"
              placeholder={props.placeholder || 'Digite aqui...'}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: props.borderRadius || 4,
                fontSize: props.fontSize || 14,
              }}
              disabled={!isPreviewMode}
            />
          </div>
        );

      case 'options':
        return (
          <div style={baseStyle}>
            <div className="space-y-3">
              {props.choices?.map((choice, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  style={{
                    borderRadius: props.borderRadius || 8,
                    padding: props.optionPadding || 12,
                    gap: props.optionsGap || 12,
                  }}
                >
                  {choice.imageSrc && (
                    <img
                      src={choice.imageSrc}
                      alt=""
                      className="w-12 h-12 object-cover rounded"
                      style={{
                        borderRadius: props.imageBorderRadius || 6,
                        height: props.imageHeight || 48,
                        width: props.imageHeight || 48,
                      }}
                    />
                  )}
                  <span style={{ fontSize: props.fontSize || 14 }}>
                    {choice.text || `Opção ${idx + 1}`}
                  </span>
                </div>
              )) || (
                <div className="text-gray-500 text-center py-4">
                  Nenhuma opção configurada
                </div>
              )}
            </div>
          </div>
        );

      case 'video':
        return (
          <div style={{ textAlign: (props.alignment as 'left' | 'center' | 'right') || 'center' }}>
            <div
              style={{
                ...baseStyle,
                width: '100%',
                maxWidth: '600px',
                aspectRatio: '16/9',
                backgroundColor: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                margin: '0 auto',
              }}
            >
              {props.src ? (
                <iframe
                  src={props.src}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allowFullScreen
                />
              ) : (
                <div className="text-center">
                  <div className="mb-2">📹</div>
                  <div>Vídeo</div>
                </div>
              )}
            </div>
          </div>
        );

      case 'spacer':
        return (
          <div
            style={{
              height: props.value || 40,
              backgroundColor: props.backgroundColor,
            }}
          />
        );

      default:
        return (
          <div
            style={baseStyle}
            className="p-4 border-2 border-dashed border-gray-300 text-center text-gray-500"
          >
            Componente: {component.type}
            <br />
            <small>Não implementado</small>
          </div>
        );
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative transition-all duration-200 ${
        !isPreviewMode ? 'hover:ring-2 hover:ring-blue-300' : ''
      } ${
        !isPreviewMode && isSelected 
          ? 'ring-2 ring-blue-500 shadow-lg' 
          : ''
      }`}
      style={{
        outline: !isPreviewMode && isSelected ? '2px solid #3b82f6' : 'none',
        outlineOffset: '2px',
      }}
    >
      {/* Selection Indicator */}
      {!isPreviewMode && isSelected && (
        <div className="absolute -top-6 left-0 px-2 py-1 bg-blue-500 text-white text-xs rounded z-10">
          {component.type} #{index + 1}
        </div>
      )}

      {/* Component Content */}
      <div className={!isPreviewMode ? 'cursor-pointer' : ''}>
        {renderComponent()}
      </div>

      {/* Custom CSS */}
      {component.props.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: component.props.customCSS }} />
      )}
    </div>
  );
};

export default ComponentRenderer;
