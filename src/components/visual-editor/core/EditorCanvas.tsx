import React from "react";
import { useEditorState, useCurrentStep } from "@/store/editorStore";
import { ComponentRenderer } from "./ComponentRenderer";

interface EditorCanvasProps {
  className?: string;
}

export const EditorCanvas: React.FC<EditorCanvasProps> = ({
  className = "",
}) => {
  const { isPreviewMode } = useEditorState();
  const currentStep = useCurrentStep();

  if (!currentStep) {
    return (
      <div
        className={`flex-1 bg-zinc-800 flex items-center justify-center ${className}`}
      >
        <div className="text-center text-zinc-400">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-zinc-700 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-zinc-600 rounded animate-pulse" />
            </div>
          </div>
          <h3 className="text-lg font-medium mb-2">Carregando Editor...</h3>
          <p className="text-sm">Preparando seu workspace</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-1 bg-zinc-800 relative overflow-auto ${className}`}>
      {/* Header do Canvas */}
      <div className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-700 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  currentStep.type === "intro"
                    ? "bg-blue-500"
                    : currentStep.type === "question"
                    ? "bg-green-500"
                    : currentStep.type === "result"
                    ? "bg-purple-500"
                    : currentStep.type === "offer"
                    ? "bg-orange-500"
                    : "bg-gray-500"
                }`}
              />
              <span className="text-white font-medium">{currentStep.name}</span>
            </div>
            <span className="text-xs px-2 py-1 bg-zinc-700 rounded text-zinc-300 capitalize">
              {currentStep.type}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>{currentStep.components.length} componente(s)</span>
            {isPreviewMode && (
              <span className="px-2 py-1 bg-blue-600 text-white rounded">
                PREVIEW
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Canvas Content */}
      <div className="p-6">
        <div
          className="max-w-4xl mx-auto min-h-[600px] bg-white rounded-lg shadow-lg overflow-hidden"
          style={{
            backgroundColor: currentStep.backgroundColor || "#ffffff",
            backgroundImage: currentStep.backgroundImage
              ? `url(${currentStep.backgroundImage})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Canvas Custom CSS */}
          {currentStep.customCSS && (
            <style
              dangerouslySetInnerHTML={{ __html: currentStep.customCSS }}
            />
          )}

          {/* Render Components */}
          <div className="min-h-full">
            {currentStep.components.length > 0 ? (
              currentStep.components.map((component, index) => (
                <ComponentRenderer
                  key={component.id}
                  component={component}
                  index={index}
                  isPreviewMode={isPreviewMode}
                />
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 py-20">
                <div className="text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-200 rounded" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Canvas Vazio</h3>
                  <p className="text-sm">
                    Adicione componentes da barra lateral para começar
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Canvas Footer */}
        <div className="mt-4 text-center text-xs text-zinc-500">
          Canvas - {isPreviewMode ? "Modo Preview" : "Modo Edição"} • Resolução:
          Desktop (1200px) • Última modificação:{" "}
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default EditorCanvas;
