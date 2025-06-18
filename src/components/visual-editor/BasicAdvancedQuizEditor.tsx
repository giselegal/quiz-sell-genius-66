import React, { useState } from "react";

// Interfaces básicas
interface QuizComponent {
  id: string;
  type: string;
  props: Record<string, unknown>;
}

interface QuizStep {
  id: string;
  name: string;
  components: QuizComponent[];
  defaultNextStepId?: string;
}

interface QuizHeaderConfig {
  showLogo: boolean;
  showProgressBar: boolean;
  allowReturnButton: boolean;
  logoUrl?: string;
  progressColor?: string;
}

interface QuizEditorState {
  steps: QuizStep[];
  headerConfig: QuizHeaderConfig;
  currentStepId: string;
}

// Componente básico da Navbar
const BasicNavbar: React.FC = () => {
  return (
    <div className="h-16 bg-zinc-800 border-b border-zinc-700 flex items-center justify-between px-4">
      <div className="text-white font-semibold">Advanced Quiz Editor</div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Salvar
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Publicar
        </button>
      </div>
    </div>
  );
};

// Componente básico de navegação de etapas
const BasicStepTabs: React.FC<{ steps: QuizStep[]; currentStepId: string }> = ({ steps, currentStepId }) => {
  return (
    <div className="bg-zinc-900 border-b border-zinc-700 px-4 py-2">
      <div className="flex items-center space-x-2">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`px-3 py-2 rounded cursor-pointer ${
              currentStepId === step.id
                ? "bg-blue-600 text-white"
                : "bg-zinc-700 text-zinc-300"
            }`}
          >
            {index + 1}. {step.name}
          </div>
        ))}
        <button className="px-3 py-2 bg-zinc-700 text-zinc-300 rounded hover:bg-zinc-600">
          + Nova Etapa
        </button>
      </div>
    </div>
  );
};

// Componente básico do canvas
const BasicCanvas: React.FC<{ currentStep: QuizStep }> = ({ currentStep }) => {
  return (
    <div className="flex-1 bg-zinc-950 p-8">
      <div className="max-w-4xl mx-auto bg-zinc-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">{currentStep.name}</h2>
        <div className="space-y-4">
          {currentStep.components.map((component, index) => (
            <div key={component.id} className="p-4 bg-zinc-800 rounded border border-zinc-700">
              <span className="text-zinc-400 text-sm">Componente {index + 1}: </span>
              <span className="text-white">{component.type}</span>
              {component.props.text && (
                <div className="mt-2 text-zinc-300">{component.props.text}</div>
              )}
            </div>
          ))}
          {currentStep.components.length === 0 && (
            <div className="text-zinc-500 text-center py-8">
              Nenhum componente nesta etapa
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente principal simplificado
const BasicAdvancedQuizEditor: React.FC = () => {
  console.log("BasicAdvancedQuizEditor está renderizando!");

  const [editorState] = useState<QuizEditorState>({
    steps: [
      {
        id: "step-1",
        name: "Primeira Etapa",
        components: [
          {
            id: "heading-1",
            type: "heading",
            props: {
              text: "Bem-vindo ao Quiz!"
            }
          },
          {
            id: "text-1",
            type: "text",
            props: {
              text: "Esta é uma versão básica do editor funcionando."
            }
          }
        ]
      },
      {
        id: "step-2",
        name: "Segunda Etapa",
        components: []
      }
    ],
    headerConfig: {
      showLogo: true,
      showProgressBar: true,
      allowReturnButton: true
    },
    currentStepId: "step-1"
  });

  const currentStep = editorState.steps.find(step => step.id === editorState.currentStepId) || editorState.steps[0];

  return (
    <div className="h-screen bg-zinc-950 flex flex-col">
      <BasicNavbar />
      <BasicStepTabs steps={editorState.steps} currentStepId={editorState.currentStepId} />
      <BasicCanvas currentStep={currentStep} />
    </div>
  );
};

export default BasicAdvancedQuizEditor;
