import React, { useRef, useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit3,
  Move,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Settings,
  ChevronUp,
  ChevronDown,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { VisualElement } from "@/types/visualEditor";

interface EditorCanvasProps {
  elements: VisualElement[];
  selectedElementId: string | null;
  onElementSelect: (id: string) => void;
  onElementUpdate: (id: string, updates: Partial<VisualElement>) => void;
  onElementMove: (id: string, direction: "up" | "down") => void;
  onElementDelete: (id: string) => void;
  onElementDuplicate: (id: string) => void;
  onElementAdd: (type: string, position?: number) => void;
  isPreviewMode: boolean;
  viewportMode: "desktop" | "tablet" | "mobile";
}

export const EditorCanvas: React.FC<EditorCanvasProps> = ({
  elements,
  selectedElementId,
  onElementSelect,
  onElementUpdate,
  onElementMove,
  onElementDelete,
  onElementDuplicate,
  onElementAdd,
  isPreviewMode,
  viewportMode,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "component",
    drop: (item: { type: string }, monitor) => {
      if (!monitor.didDrop()) {
        const position = draggedOverIndex ?? elements.length;
        onElementAdd(item.type, position);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  drop(canvasRef);

  const getViewportStyles = () => {
    switch (viewportMode) {
      case "mobile":
        return { width: "375px", minHeight: "667px" };
      case "tablet":
        return { width: "768px", minHeight: "1024px" };
      default:
        return { width: "100%", minHeight: "100vh" };
    }
  };

  const renderElement = (element: VisualElement, index: number) => {
    const isSelected = selectedElementId === element.id;
    const isVisible = element.visible;

    return (
      <div
        key={element.id}
        className={`relative group ${!isVisible ? "opacity-50" : ""}`}
        onMouseEnter={() => setDraggedOverIndex(index)}
        onMouseLeave={() => setDraggedOverIndex(null)}
      >
        {/* Drop Zone Indicator */}
        {!isPreviewMode && draggedOverIndex === index && isOver && (
          <div className="absolute -top-1 left-0 right-0 h-0.5 bg-purple-500 z-50" />
        )}

        {/* Element Wrapper */}
        <div
          className={`
            relative transition-all duration-200
            ${!isPreviewMode ? "hover:ring-2 hover:ring-purple-200" : ""}
            ${isSelected ? "ring-2 ring-purple-500" : ""}
            ${element.locked ? "pointer-events-none" : ""}
          `}
          onClick={() => !isPreviewMode && onElementSelect(element.id)}
        >
          {/* Element Controls */}
          {!isPreviewMode && isSelected && (
            <div className="absolute -top-10 left-0 z-50 flex items-center gap-1 bg-purple-600 text-white px-2 py-1 rounded-lg shadow-lg">
              <span className="text-xs font-medium">{element.type}</span>

              <div className="flex items-center gap-1 ml-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-6 h-6 p-0 text-white hover:bg-purple-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    onElementMove(element.id, "up");
                  }}
                  disabled={index === 0}
                >
                  <ChevronUp className="w-3 h-3" />
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  className="w-6 h-6 p-0 text-white hover:bg-purple-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    onElementMove(element.id, "down");
                  }}
                  disabled={index === elements.length - 1}
                >
                  <ChevronDown className="w-3 h-3" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-6 h-6 p-0 text-white hover:bg-purple-700"
                    >
                      <MoreVertical className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => onElementDuplicate(element.id)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        onElementUpdate(element.id, {
                          visible: !element.visible,
                        })
                      }
                    >
                      {element.visible ? (
                        <EyeOff className="w-4 h-4 mr-2" />
                      ) : (
                        <Eye className="w-4 h-4 mr-2" />
                      )}
                      {element.visible ? "Ocultar" : "Mostrar"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onElementDelete(element.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Deletar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}

          {/* Element Content */}
          <ElementRenderer
            element={element}
            isSelected={isSelected}
            isPreviewMode={isPreviewMode}
            onUpdate={(updates) => onElementUpdate(element.id, updates)}
          />
        </div>

        {/* Bottom Drop Zone */}
        {!isPreviewMode && draggedOverIndex === index + 1 && isOver && (
          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500 z-50" />
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gray-100 p-4 overflow-auto">
      <div className="mx-auto" style={getViewportStyles()}>
        <div
          ref={canvasRef}
          className={`
            bg-white shadow-lg rounded-lg overflow-hidden relative
            ${
              !isPreviewMode && isOver && canDrop
                ? "ring-2 ring-purple-300"
                : ""
            }
          `}
          style={{ minHeight: "600px" }}
        >
          {/* Empty State */}
          {elements.length === 0 && !isPreviewMode && (
            <div className="flex items-center justify-center h-96 text-gray-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Edit3 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium mb-2">Canvas Vazio</h3>
                <p className="text-sm">
                  Arraste componentes da biblioteca para começar
                </p>
              </div>
            </div>
          )}

          {/* Elements */}
          <AnimatePresence>
            {elements.map((element, index) => (
              <motion.div
                key={element.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderElement(element, index)}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Final Drop Zone */}
          {!isPreviewMode &&
            elements.length > 0 &&
            draggedOverIndex === elements.length &&
            isOver && <div className="h-0.5 bg-purple-500 mx-4" />}
        </div>
      </div>
    </div>
  );
};

// Element Renderer Component
interface ElementRendererProps {
  element: VisualElement;
  isSelected: boolean;
  isPreviewMode: boolean;
  onUpdate: (updates: Partial<VisualElement>) => void;
}

const ElementRenderer: React.FC<ElementRendererProps> = ({
  element,
  isSelected,
  isPreviewMode,
  onUpdate,
}) => {
  const handleContentEdit = useCallback(
    (newContent: string) => {
      onUpdate({ content: { ...element.content, text: newContent } });
    },
    [element.content, onUpdate]
  );

  // Render different element types
  switch (element.type) {
    case "title":
      return (
        <div className="p-4" style={element.style}>
          <h1
            className={`text-3xl font-bold ${
              isSelected && !isPreviewMode ? "outline-none" : ""
            }`}
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit(e.target.textContent || "")}
          >
            {element.content?.text || "Título Principal"}
          </h1>
        </div>
      );

    case "text":
      return (
        <div className="p-4" style={element.style}>
          <p
            className={`text-base ${
              isSelected && !isPreviewMode ? "outline-none" : ""
            }`}
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit(e.target.textContent || "")}
          >
            {element.content?.text ||
              "Este é um parágrafo de texto. Clique para editar."}
          </p>
        </div>
      );

    case "button":
      return (
        <div className="p-4 text-center">
          <button
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            style={element.style}
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit(e.target.textContent || "")}
          >
            {element.content?.text || "Clique Aqui"}
          </button>
        </div>
      );

    case "image":
      return (
        <div className="p-4">
          <img
            src={
              element.content?.src ||
              "https://via.placeholder.com/400x200?text=Imagem"
            }
            alt={element.content?.alt || "Imagem"}
            className="w-full rounded-lg"
            style={element.style}
          />
        </div>
      );

    default:
      return (
        <div className="p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 text-center">
            Componente: {element.type}
          </p>
        </div>
      );
  }
};

export default EditorCanvas;
