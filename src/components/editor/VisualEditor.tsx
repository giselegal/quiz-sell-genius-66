import React, { useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { EditorProvider } from "@/contexts/EditorContext.tsx";
import { useEditor } from "@/hooks/useEditorNew";
import { createElement, getCurrentStep } from "@/utils/editorUtils";
import { EditorNavbar } from "./EditorNavbar";
import { StepsSidebar } from "./StepsSidebar";
import { ToolbarSidebar } from "./ToolbarSidebar";
import { EditorCanvas } from "./EditorCanvas";
import { PropertiesSidebar } from "./PropertiesSidebar";
import { EditorElement } from "@/types/editor";

const EditorContent: React.FC = () => {
  const { state, dispatch } = useEditor();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    // Pode ser usado para feedback visual durante o drag
    console.log("Drag started:", event);
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    // Lógica para drag over se necessário
    console.log("Drag over:", event);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) return;

      const currentStep = getCurrentStep(state);
      if (!currentStep) return;

      // Se estamos arrastando de uma toolbar para o canvas
      if (
        active.data.current?.type === "toolbar-item" &&
        over.id === "canvas"
      ) {
        const elementType = active.data.current
          .elementType as EditorElement["type"];

        // Criar conteúdo padrão baseado no tipo
        let defaultContent;
        switch (elementType) {
          case "heading":
            defaultContent = { text: "Novo Título", level: 1 };
            break;
          case "text":
            defaultContent = { text: "Novo texto" };
            break;
          case "button":
            defaultContent = { text: "Continuar", action: "next" };
            break;
          case "input":
            defaultContent = {
              label: "Campo",
              placeholder: "Digite aqui...",
              type: "text",
              required: false,
              name: "field",
            };
            break;
          case "image":
            defaultContent = {
              src: "https://via.placeholder.com/640x480?text=Nova+Imagem",
              alt: "Nova imagem",
            };
            break;
          case "spacer":
            defaultContent = { height: 50 };
            break;
          case "video":
            defaultContent = {
              src: "https://via.placeholder.com/640x360.mp4",
              autoplay: false,
              controls: true,
            };
            break;
          default:
            defaultContent = { text: "Novo elemento" };
        }

        const newElement = createElement(elementType, defaultContent);

        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            stepId: currentStep.id,
            element: newElement,
          },
        });

        // Selecionar o novo elemento
        dispatch({
          type: "SELECT_ELEMENT",
          payload: newElement.id,
        });

        return;
      }

      // Se estamos reordenando elementos no canvas
      if (
        active.data.current?.type !== "toolbar-item" &&
        over.id !== "canvas"
      ) {
        const oldIndex = currentStep.elements.findIndex(
          (el) => el.id === active.id
        );
        const newIndex = currentStep.elements.findIndex(
          (el) => el.id === over.id
        );

        if (oldIndex !== -1 && newIndex !== -1) {
          const reorderedIds = arrayMove(
            currentStep.elements.map((el) => el.id),
            oldIndex,
            newIndex
          );

          dispatch({
            type: "REORDER_ELEMENTS",
            payload: {
              stepId: currentStep.id,
              elementIds: reorderedIds,
            },
          });
        }
      }
    },
    [state, dispatch]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <main className="relative min-h-screen h-full">
        <div className="relative overflow-hidden h-screen flex flex-col">
          <EditorNavbar />

          <div className="w-full h-full relative overflow-hidden-container">
            <div className="w-full h-full">
              <div className="flex flex-col md:flex-row h-full relative">
                {/* Steps Sidebar */}
                <StepsSidebar />

                <div className="w-full h-full">
                  <div className="w-full md:flex-row flex-col overflow-hidden-container flex h-full relative">
                    {/* Toolbar Sidebar */}
                    <ToolbarSidebar />

                    {/* Main Canvas */}
                    <EditorCanvas />

                    {/* Properties Sidebar */}
                    <PropertiesSidebar />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DndContext>
  );
};

export const VisualEditor: React.FC = () => {
  return (
    <EditorProvider>
      <EditorContent />
    </EditorProvider>
  );
};
