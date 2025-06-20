import React from "react";
import { EditorProvider } from "./core/EditorProvider";
import { EditorToolbar } from "./core/EditorToolbar";
import { EditorCanvas } from "./core/EditorCanvas";
import { SidebarWrapper } from "./core/SidebarWrapper";
import { useEditorState, useEditorActions } from "@/store/editorStore";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { v4 as uuidv4 } from "uuid";
import "@/styles/advanced-editor.css";

interface AdvancedQuizEditorProps {
  mode?: "basic" | "advanced" | "unified";
  autoSaveInterval?: number;
  className?: string;
}

const EditorContent: React.FC = () => {
  const { steps } = useEditorState();
  const { addStep } = useEditorActions();

  const handleAddStep = () => {
    const newStep = {
      id: uuidv4(),
      name: `Nova Etapa ${steps.length + 1}`,
      type: "question" as const,
      components: [
        {
          id: uuidv4(),
          type: "heading" as const,
          props: {
            text: "Nova Pergunta",
            fontSize: 24,
            textColor: "#333333",
            alignment: "center",
          },
        },
      ],
      backgroundColor: "#ffffff",
    };

    addStep(newStep);
  };

  const handlePreview = () => {
    console.log("Preview mode toggled");
  };

  const handleSave = () => {
    console.log("Manual save triggered");
  };

  return (
    <div className="h-screen bg-zinc-900 flex flex-col overflow-hidden">
      {/* Toolbar */}
      <EditorToolbar
        onAddStep={handleAddStep}
        onPreview={handlePreview}
        onSave={handleSave}
      />

      {/* Main Editor Layout */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Canvas Area */}
          <ResizablePanel defaultSize={70} minSize={50}>
            <EditorCanvas />
          </ResizablePanel>

          {/* Resize Handle */}
          <ResizableHandle
            withHandle
            className="bg-zinc-700 hover:bg-zinc-600 transition-colors"
          />

          {/* Sidebar */}
          <ResizablePanel defaultSize={30} minSize={300} maxSize={500}>
            <SidebarWrapper />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export const AdvancedQuizEditor: React.FC<AdvancedQuizEditorProps> = ({
  mode = "advanced",
  autoSaveInterval = 5000,
  className = "",
}) => {
  return (
    <div className={`advanced-quiz-editor ${className}`}>
      <EditorProvider mode={mode} autoSaveInterval={autoSaveInterval}>
        <EditorContent />
      </EditorProvider>
    </div>
  );
};

export default AdvancedQuizEditor;
