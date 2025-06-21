import React from "react";
import "@/styles/advanced-editor.css";

const SimpleWorkingEditor: React.FC = () => {
  return (
    <div className="advanced-quiz-editor">
      <div className="editor-layout">
        {/* Coluna 1: Componentes */}
        <div className="editor-column palette-column">
          <div style={{ padding: "20px" }}>
            <h3>🧩 Componentes</h3>
            <div>Editor funcionando!</div>
            <button
              style={{
                marginTop: "10px",
                padding: "8px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Teste
            </button>
          </div>
        </div>

        {/* Coluna 2: Estrutura */}
        <div className="editor-column tree-column">
          <div style={{ padding: "20px" }}>
            <h3>📋 Estrutura</h3>
            <div>Etapas do quiz</div>
          </div>
        </div>

        {/* Coluna 3: Canvas */}
        <div className="editor-column canvas-column">
          <div style={{ padding: "20px" }}>
            <h3>🎨 Canvas</h3>
            <div
              style={{
                background: "#f0f0f0",
                padding: "20px",
                borderRadius: "8px",
                margin: "10px 0",
              }}
            >
              <strong>Status:</strong> Editor carregado com sucesso!
            </div>
          </div>
        </div>

        {/* Coluna 4: Propriedades */}
        <div className="editor-column properties-column">
          <div style={{ padding: "20px" }}>
            <h3>⚙️ Propriedades</h3>
            <div>Configurações</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleWorkingEditor;
