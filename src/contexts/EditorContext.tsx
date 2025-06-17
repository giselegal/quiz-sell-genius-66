import React, { useReducer, ReactNode } from "react";
import { EditorState, EditorAction } from "@/types/editor";
import { EditorContext } from "./EditorContext";

// Reducer
const editorReducer = (
  state: EditorState,
  action: EditorAction
): EditorState => {
  switch (action.type) {
    case "ADD_STEP":
      return {
        ...state,
        steps: [...state.steps, action.payload],
      };

    case "DELETE_STEP":
      return {
        ...state,
        steps: state.steps.filter((step) => step.id !== action.payload),
        currentStepId:
          state.currentStepId === action.payload
            ? state.steps[0]?.id || ""
            : state.currentStepId,
      };

    case "UPDATE_STEP":
      return {
        ...state,
        steps: state.steps.map((step) =>
          step.id === action.payload.id
            ? { ...step, ...action.payload.updates }
            : step
        ),
      };

    case "SET_CURRENT_STEP":
      return {
        ...state,
        currentStepId: action.payload,
        selectedElementId: null,
      };

    case "ADD_ELEMENT":
      return {
        ...state,
        steps: state.steps.map((step) =>
          step.id === action.payload.stepId
            ? { ...step, elements: [...step.elements, action.payload.element] }
            : step
        ),
      };

    case "UPDATE_ELEMENT":
      return {
        ...state,
        steps: state.steps.map((step) =>
          step.id === action.payload.stepId
            ? {
                ...step,
                elements: step.elements.map((element) =>
                  element.id === action.payload.elementId
                    ? { ...element, ...action.payload.updates }
                    : element
                ),
              }
            : step
        ),
      };

    case "DELETE_ELEMENT":
      return {
        ...state,
        steps: state.steps.map((step) =>
          step.id === action.payload.stepId
            ? {
                ...step,
                elements: step.elements.filter(
                  (element) => element.id !== action.payload.elementId
                ),
              }
            : step
        ),
        selectedElementId:
          state.selectedElementId === action.payload.elementId
            ? null
            : state.selectedElementId,
      };

    case "REORDER_ELEMENTS":
      return {
        ...state,
        steps: state.steps.map((step) =>
          step.id === action.payload.stepId
            ? {
                ...step,
                elements: action.payload.elementIds
                  .map((id) => step.elements.find((el) => el.id === id)!)
                  .filter(Boolean),
              }
            : step
        ),
      };

    case "SELECT_ELEMENT":
      return {
        ...state,
        selectedElementId: action.payload,
      };

    case "SAVE_TO_HISTORY":
      return {
        ...state,
        history: [
          ...state.history.slice(0, state.historyIndex + 1),
          { ...state },
        ],
        historyIndex: state.historyIndex + 1,
      };

    case "UNDO":
      if (state.historyIndex > 0) {
        return {
          ...state.history[state.historyIndex - 1],
          historyIndex: state.historyIndex - 1,
        };
      }
      return state;

    case "REDO":
      if (state.historyIndex < state.history.length - 1) {
        return {
          ...state.history[state.historyIndex + 1],
          historyIndex: state.historyIndex + 1,
        };
      }
      return state;

    default:
      return state;
  }
};

// Provider
export const EditorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialState: EditorState = {
    steps: [
      {
        id: "intro",
        name: "Introdução",
        elements: [
          {
            id: "intro-title",
            type: "text",
            content: "Descubra Seu Estilo Único",
            style: { fontSize: "2rem", fontWeight: "bold", textAlign: "center" },
            position: { x: 0, y: 0 },
          },
          {
            id: "intro-subtitle",
            type: "text",
            content: "Responda algumas perguntas e encontre o estilo perfeito para você",
            style: { fontSize: "1.2rem", textAlign: "center" },
            position: { x: 0, y: 80 },
          },
          {
            id: "start-button",
            type: "button",
            content: "Iniciar Quiz",
            style: { backgroundColor: "#007bff", color: "white", padding: "12px 24px" },
            position: { x: 0, y: 160 },
          },
        ],
        settings: {
          showLogo: true,
          showProgress: false,
          allowReturn: false,
        },
      },
      {
        id: "question-1",
        name: "Pergunta 1: Tipo de Roupa",
        elements: [
          {
            id: "q1-title",
            type: "text",
            content: "QUAL O SEU TIPO DE ROUPA FAVORITA?",
            style: { fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" },
            position: { x: 0, y: 0 },
          },
        ],
        settings: {
          showLogo: true,
          showProgress: true,
          allowReturn: true,
        },
      },
      {
        id: "question-2",
        name: "Pergunta 2: Personalidade",
        elements: [
          {
            id: "q2-title",
            type: "text",
            content: "COMO VOCÊ SE DESCREVERIA?",
            style: { fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" },
            position: { x: 0, y: 0 },
          },
        ],
        settings: {
          showLogo: true,
          showProgress: true,
          allowReturn: true,
        },
      },
      {
        id: "question-3",
        name: "Pergunta 3: Estilo de Roupas",
        elements: [
          {
            id: "q3-title",
            type: "text",
            content: "QUE TIPO DE ROUPAS MAIS TE ATRAI?",
            style: { fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" },
            position: { x: 0, y: 0 },
          },
        ],
        settings: {
          showLogo: true,
          showProgress: true,
          allowReturn: true,
        },
      },
      {
        id: "question-4",
        name: "Pergunta 4: Preferências",
        elements: [
          {
            id: "q4-title",
            type: "text",
            content: "SUAS PREFERÊNCIAS DE ESTILO",
            style: { fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" },
            position: { x: 0, y: 0 },
          },
        ],
        settings: {
          showLogo: true,
          showProgress: true,
          allowReturn: true,
        },
      },
      {
        id: "question-5",
        name: "Pergunta 5: Estilo Pessoal",
        elements: [
          {
            id: "q5-title",
            type: "text",
            content: "QUAL ESTILO MAIS COMBINA COM VOCÊ?",
            style: { fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" },
            position: { x: 0, y: 0 },
          },
        ],
        settings: {
          showLogo: true,
          showProgress: true,
          allowReturn: true,
        },
      },
      {
        id: "question-6",
        name: "Pergunta 6: Casacos",
        elements: [
          {
            id: "q6-title",
            type: "text",
            content: "QUAL TIPO DE CASACO PREFERE?",
            style: { fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" },
            position: { x: 0, y: 0 },
          },
        ],
        settings: {
          showLogo: true,
          showProgress: true,
          allowReturn: true,
        },
      },
      {
        id: "question-7",
        name: "Pergunta 7: Jaquetas",
        elements: [
          {
            id: "q7-title",
            type: "text",
            content: "QUE TIPO DE JAQUETA MAIS GOSTA?",
            style: { fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" },
            position: { x: 0, y: 0 },
          },
        ],
        settings: {
          showLogo: true,
          showProgress: true,
          allowReturn: true,
        },
      },
      {
        id: "question-8",
        name: "Pergunta 8: Acessórios",
        elements: [
          {
            id: "q8-title",
            type: "text",
            content: "QUAIS ACESSÓRIOS MAIS USA?",
            style: { fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" },
            position: { x: 0, y: 0 },
          },
        ],
        settings: {
          showLogo: true,
          showProgress: true,
          allowReturn: true,
        },
      },
      {
        id: "question-9",
        name: "Pergunta 9: Estilo de Acessórios",
        elements: [
          {
            id: "q9-title",
            type: "text",
            content: "SEU ESTILO DE ACESSÓRIOS",
            style: { fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" },
            position: { x: 0, y: 0 },
          },
        ],
        settings: {
          showLogo: true,
          showProgress: true,
          allowReturn: true,
        },
      },
      {
        id: "question-10",
        name: "Pergunta 10: Preferências Finais",
        elements: [
          {
            id: "q10-title",
            type: "text",
            content: "ÚLTIMAS PREFERÊNCIAS",
            style: { fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" },
            position: { x: 0, y: 0 },
          },
        ],
        settings: {
          showLogo: true,
          showProgress: true,
          allowReturn: true,
        },
      },
      {
        id: "result",
        name: "Resultado",
        elements: [
          {
            id: "result-title",
            type: "text",
            content: "Seu Estilo Único Foi Descoberto!",
            style: { fontSize: "2rem", fontWeight: "bold", textAlign: "center" },
            position: { x: 0, y: 0 },
          },
          {
            id: "result-description",
            type: "text",
            content: "Baseado nas suas respostas, identificamos o estilo perfeito para você.",
            style: { fontSize: "1.2rem", textAlign: "center" },
            position: { x: 0, y: 80 },
          },
          {
            id: "result-image",
            type: "image",
            content: "https://via.placeholder.com/400x300",
            style: { width: "400px", height: "300px" },
            position: { x: 0, y: 140 },
          },
        ],
        settings: {
          showLogo: true,
          showProgress: false,
          allowReturn: false,
        },
      },
      {
        id: "capture",
        name: "Captura de Leads",
        elements: [
          {
            id: "capture-title",
            type: "text",
            content: "Receba Seu Guia de Estilo Personalizado",
            style: { fontSize: "1.8rem", fontWeight: "bold", textAlign: "center" },
            position: { x: 0, y: 0 },
          },
          {
            id: "capture-subtitle",
            type: "text",
            content: "Digite seu nome e email para receber dicas exclusivas",
            style: { fontSize: "1.1rem", textAlign: "center" },
            position: { x: 0, y: 60 },
          },
          {
            id: "name-input",
            type: "input",
            content: "Nome",
            style: { width: "100%", padding: "12px", marginBottom: "16px" },
            position: { x: 0, y: 120 },
          },
          {
            id: "email-input",
            type: "input",
            content: "Email",
            style: { width: "100%", padding: "12px", marginBottom: "16px" },
            position: { x: 0, y: 180 },
          },
          {
            id: "submit-button",
            type: "button",
            content: "Receber Guia Gratuito",
            style: { backgroundColor: "#28a745", color: "white", padding: "12px 24px", width: "100%" },
            position: { x: 0, y: 240 },
          },
        ],
        settings: {
          showLogo: true,
          showProgress: false,
          allowReturn: false,
        },
      },
    ],
    currentStepId: "intro",
    selectedElementId: null,
    history: [],
    historyIndex: -1,
  };

  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
};
