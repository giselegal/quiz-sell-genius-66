import React from "react";

interface ComponentPaletteProps {
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    componentType: string
  ) => void;
}

const ComponentPalette: React.FC<ComponentPaletteProps> = ({ onDragStart }) => {
  const components = [
    { type: "heading", label: "Título", icon: "📝" },
    { type: "text", label: "Texto", icon: "📄" },
    { type: "image", label: "Imagem", icon: "🖼️" },
    { type: "button", label: "Botão", icon: "🔘" },
    { type: "input", label: "Campo de Entrada", icon: "📝" },
    { type: "options", label: "Múltipla Escolha", icon: "☑️" },
    { type: "alert", label: "Alerta", icon: "⚠️" },
    { type: "video", label: "Vídeo", icon: "📹" },
    { type: "carousel", label: "Carrossel", icon: "🎠" },
    { type: "spacer", label: "Espaçador", icon: "⬜" },
    { type: "testimonials", label: "Depoimentos", icon: "💬" },
  ];

  return (
    <div className="component-palette">
      <h3 className="palette-title">🧩 Componentes</h3>
      <div className="components-grid">
        {components.map((component) => (
          <div
            key={component.type}
            className="draggable-component"
            draggable
            onDragStart={(e) => onDragStart(e, component.type)}
          >
            <span className="component-icon">{component.icon}</span>
            <span className="component-label">{component.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentPalette;
