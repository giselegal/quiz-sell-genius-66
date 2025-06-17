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
        id: "step-1",
        name: "Etapa 1",
        elements: [],
        settings: {
          showLogo: true,
          showProgress: true,
          allowReturn: true,
        },
      },
    ],
    currentStepId: "step-1",
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
