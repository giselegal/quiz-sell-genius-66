import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Share2,
  ExternalLink,
} from "lucide-react";

// Interfaces
interface OptionChoice {
  text: string;
  value: string;
  scoreValue?: number;
  imageSrc?: string;
}

interface QuizComponentProps {
  text?: string;
  src?: string;
  alt?: string;
  buttonText?: string;
  choices?: OptionChoice[];
  gridLayout?: string;
  imageRatio?: string;
  imagePosition?: string;
  imageHeight?: number;
  imageBorderRadius?: number;
  optionSpacing?: number;
  textAlignment?: string;
  optionPadding?: number;
  desktopColumns?: string;
  tabletColumns?: string;
  mobileColumns?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  fontSize?: number;
  margin?: number;
  padding?: number;
  alignment?: string;
}

interface QuizComponent {
  id: string;
  type: string;
  props: QuizComponentProps;
}

interface QuizAnswer {
  componentId: string;
  choice: OptionChoice;
}

// Dados de exemplo de um quiz completo para demonstração
const SAMPLE_QUIZ_DATA = {
  id: "demo-quiz-001",
  title: "Descubra Seu Estilo de Personalidade",
  subtitle: "Um quiz interativo para descobrir seu perfil único",
  headerConfig: {
    title: "Descubra Seu Estilo de Personalidade",
    subtitle: "Responda às perguntas e descubra seu perfil único",
    showLogo: true,
    showProgress: true,
    allowReturn: true,
    logoSrc: "https://via.placeholder.com/120x40/3b82f6/ffffff?text=LOGO",
  },
  steps: [
    {
      id: "step-1",
      name: "Introdução",
      components: [
        {
          id: "intro-heading",
          type: "heading",
          props: {
            text: "Bem-vindo ao Quiz de Personalidade!",
            fontSize: 28,
            textColor: "#1f2937",
            alignment: "center",
            margin: 20,
          },
        },
        {
          id: "intro-text",
          type: "text",
          props: {
            text: "Este quiz foi desenvolvido para ajudá-lo a descobrir seu estilo único de personalidade. Responda às perguntas com sinceridade e descubra insights valiosos sobre você mesmo.",
            fontSize: 16,
            textColor: "#4b5563",
            alignment: "center",
            margin: 16,
          },
        },
        {
          id: "start-button",
          type: "button",
          props: {
            buttonText: "Começar Quiz",
            backgroundColor: "#3b82f6",
            textColor: "#ffffff",
            borderRadius: 12,
            padding: 16,
            fontSize: 18,
          },
        },
      ],
    },
    {
      id: "step-2",
      name: "Pergunta 1 - Texto",
      components: [
        {
          id: "q1-heading",
          type: "heading",
          props: {
            text: "Como você prefere passar seu tempo livre?",
            fontSize: 24,
            textColor: "#1f2937",
            alignment: "center",
            margin: 20,
          },
        },
        {
          id: "q1-options",
          type: "options",
          props: {
            text: "Escolha a opção que mais se identifica com você:",
            choices: [
              {
                text: "Lendo um bom livro em casa",
                value: "introvert",
                scoreValue: 1,
              },
              {
                text: "Saindo com amigos para uma festa",
                value: "extrovert",
                scoreValue: 2,
              },
              {
                text: "Praticando esportes ao ar livre",
                value: "active",
                scoreValue: 3,
              },
              {
                text: "Assistindo filmes ou séries",
                value: "entertainment",
                scoreValue: 4,
              },
            ],
            gridLayout: "grid-1",
            optionSpacing: 12,
            textAlignment: "left",
            optionPadding: 16,
            desktopColumns: "1",
            tabletColumns: "1",
            mobileColumns: "1",
            backgroundColor: "#f8fafc",
            textColor: "#1f2937",
            borderRadius: 8,
          },
        },
      ],
    },
    {
      id: "step-3",
      name: "Pergunta 2 - Com Imagens",
      components: [
        {
          id: "q2-heading",
          type: "heading",
          props: {
            text: "Qual ambiente você considera mais inspirador?",
            fontSize: 24,
            textColor: "#1f2937",
            alignment: "center",
            margin: 20,
          },
        },
        {
          id: "q2-options",
          type: "options",
          props: {
            text: "Selecione o ambiente que mais desperta sua criatividade:",
            choices: [
              {
                text: "Uma biblioteca silenciosa",
                value: "library",
                scoreValue: 1,
                imageSrc:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
              },
              {
                text: "Um café movimentado",
                value: "cafe",
                scoreValue: 2,
                imageSrc:
                  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
              },
              {
                text: "Um parque natural",
                value: "nature",
                scoreValue: 3,
                imageSrc:
                  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
              },
              {
                text: "Um escritório moderno",
                value: "office",
                scoreValue: 4,
                imageSrc:
                  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
              },
            ],
            gridLayout: "grid-2",
            imageRatio: "landscape",
            imagePosition: "top",
            imageHeight: 200,
            imageBorderRadius: 8,
            optionSpacing: 16,
            textAlignment: "center",
            optionPadding: 16,
            desktopColumns: "2",
            tabletColumns: "2",
            mobileColumns: "1",
            backgroundColor: "#ffffff",
            textColor: "#1f2937",
            borderRadius: 12,
          },
        },
      ],
    },
    {
      id: "step-4",
      name: "Pergunta 3 - Grade 3x3",
      components: [
        {
          id: "q3-heading",
          type: "heading",
          props: {
            text: "Qual cor representa melhor sua personalidade?",
            fontSize: 24,
            textColor: "#1f2937",
            alignment: "center",
            margin: 20,
          },
        },
        {
          id: "q3-options",
          type: "options",
          props: {
            text: "Escolha a cor que mais ressoa com você:",
            choices: [
              { text: "Azul Serenidade", value: "blue", scoreValue: 1 },
              { text: "Verde Natureza", value: "green", scoreValue: 2 },
              { text: "Vermelho Paixão", value: "red", scoreValue: 3 },
              { text: "Amarelo Energia", value: "yellow", scoreValue: 4 },
              { text: "Roxo Criatividade", value: "purple", scoreValue: 5 },
              { text: "Laranja Dinamismo", value: "orange", scoreValue: 6 },
            ],
            gridLayout: "grid-3",
            optionSpacing: 8,
            textAlignment: "center",
            optionPadding: 12,
            desktopColumns: "3",
            tabletColumns: "2",
            mobileColumns: "2",
            backgroundColor: "#f1f5f9",
            textColor: "#1f2937",
            borderRadius: 8,
          },
        },
      ],
    },
    {
      id: "step-5",
      name: "Resultado",
      components: [
        {
          id: "result-heading",
          type: "heading",
          props: {
            text: "Seu Resultado: Personalidade Equilibrada",
            fontSize: 32,
            textColor: "#059669",
            alignment: "center",
            margin: 24,
          },
        },
        {
          id: "result-image",
          type: "image",
          props: {
            src: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&h=300&fit=crop",
            alt: "Personalidade Equilibrada",
            borderRadius: 12,
            margin: 20,
          },
        },
        {
          id: "result-text",
          type: "text",
          props: {
            text: "Parabéns! Você demonstra ter uma personalidade equilibrada, combinando características de introversão e extroversão de forma harmoniosa. Você sabe quando é hora de socializar e quando é momento de recarregar as energias sozinho.",
            fontSize: 18,
            textColor: "#374151",
            alignment: "center",
            margin: 20,
          },
        },
        {
          id: "share-button",
          type: "button",
          props: {
            buttonText: "Compartilhar Resultado",
            backgroundColor: "#10b981",
            textColor: "#ffffff",
            borderRadius: 12,
            padding: 16,
            fontSize: 16,
          },
        },
        {
          id: "restart-button",
          type: "button",
          props: {
            buttonText: "Refazer Quiz",
            backgroundColor: "#6b7280",
            textColor: "#ffffff",
            borderRadius: 12,
            padding: 16,
            fontSize: 16,
            margin: 12,
          },
        },
      ],
    },
  ],
};

interface QuizProductionViewProps {
  quizData?: typeof SAMPLE_QUIZ_DATA;
}

const QuizProductionView: React.FC<QuizProductionViewProps> = ({
  quizData = SAMPLE_QUIZ_DATA,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStep = quizData.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / quizData.steps.length) * 100;

  const handleNext = () => {
    if (currentStepIndex < quizData.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setAnswers({});
    setIsCompleted(false);
  };

  const handleAnswer = (componentId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [componentId]: answer,
    }));
  };

  const renderComponent = (component: any) => {
    const { type, props } = component;

    const baseStyle = {
      margin: `${props.margin || 16}px auto`,
      padding: `${props.padding || 0}px`,
      textAlign: props.alignment || "left",
      color: props.textColor || "#000000",
      backgroundColor: props.backgroundColor || "transparent",
      borderRadius: `${props.borderRadius || 0}px`,
      fontSize: `${props.fontSize || 16}px`,
    };

    switch (type) {
      case "heading":
        return (
          <h2 key={component.id} style={baseStyle} className="font-bold">
            {props.text}
          </h2>
        );

      case "text":
        return (
          <p key={component.id} style={baseStyle} className="leading-relaxed">
            {props.text}
          </p>
        );

      case "image":
        return (
          <div
            key={component.id}
            style={{ margin: baseStyle.margin, textAlign: "center" }}
          >
            <img
              src={props.src}
              alt={props.alt || ""}
              style={{
                borderRadius: baseStyle.borderRadius,
                maxWidth: "100%",
              }}
            />
          </div>
        );

      case "button":
        return (
          <div
            key={component.id}
            style={{ margin: baseStyle.margin, textAlign: "center" }}
          >
            <button
              onClick={handleNext}
              style={{
                ...baseStyle,
                border: "none",
                cursor: "pointer",
                display: "inline-block",
                fontWeight: "bold",
                transition: "all 0.2s ease",
              }}
              className="hover:opacity-90 active:scale-95"
            >
              {props.buttonText}
            </button>
          </div>
        );

      case "options":
        return (
          <div key={component.id} style={{ margin: baseStyle.margin }}>
            {props.text && (
              <p
                style={{
                  marginBottom: "20px",
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                {props.text}
              </p>
            )}
            <div
              className={`quiz-options-grid ${props.gridLayout || "grid-1"}`}
              style={{
                gap: `${props.optionSpacing || 12}px`,
                display: "grid",
                gridTemplateColumns:
                  props.gridLayout === "grid-1"
                    ? "1fr"
                    : props.gridLayout === "grid-2"
                    ? "repeat(2, 1fr)"
                    : props.gridLayout === "grid-3"
                    ? "repeat(3, 1fr)"
                    : props.gridLayout === "grid-4"
                    ? "repeat(4, 1fr)"
                    : "1fr",
              }}
            >
              {props.choices?.map((choice: any, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    handleAnswer(component.id, choice);
                    setTimeout(handleNext, 300);
                  }}
                  className="quiz-option-button hover:scale-105 active:scale-95 transition-all"
                  style={{
                    padding: `${props.optionPadding || 16}px`,
                    backgroundColor: props.backgroundColor || "#f8fafc",
                    color: props.textColor || "#1f2937",
                    border: "2px solid #e2e8f0",
                    borderRadius: `${props.borderRadius || 8}px`,
                    textAlign: props.textAlignment || "left",
                    cursor: "pointer",
                    fontSize: "16px",
                    lineHeight: "1.5",
                  }}
                >
                  {choice.imageSrc && (
                    <div style={{ marginBottom: "12px" }}>
                      <img
                        src={choice.imageSrc}
                        alt={choice.text}
                        style={{
                          width: "100%",
                          height: `${props.imageHeight || 200}px`,
                          objectFit: "cover",
                          borderRadius: `${props.imageBorderRadius || 8}px`,
                        }}
                      />
                    </div>
                  )}
                  <div style={{ fontWeight: "500" }}>{choice.text}</div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      {quizData.headerConfig.showLogo && (
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {quizData.headerConfig.logoSrc && (
                <img
                  src={quizData.headerConfig.logoSrc}
                  alt="Logo"
                  className="h-10"
                />
              )}
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {quizData.headerConfig.title}
                </h1>
                <p className="text-sm text-gray-600">
                  {quizData.headerConfig.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Share2
                size={20}
                className="text-gray-400 cursor-pointer hover:text-gray-600"
              />
              <ExternalLink
                size={20}
                className="text-gray-400 cursor-pointer hover:text-gray-600"
              />
            </div>
          </div>

          {/* Progress Bar */}
          {quizData.headerConfig.showProgress && (
            <div className="bg-gray-200 h-2">
              <div
                className="bg-blue-600 h-2 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </header>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 min-h-[600px]">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-sm text-gray-500">
              Etapa {currentStepIndex + 1} de {quizData.steps.length}
            </div>
            <div className="text-sm text-gray-500">{currentStep.name}</div>
          </div>

          {/* Step Content */}
          <div className="space-y-6">
            {currentStep.components.map(renderComponent)}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
              Anterior
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="Reiniciar Quiz"
              >
                <RotateCcw size={18} />
                Reiniciar
              </button>
            </div>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === quizData.steps.length - 1}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Próxima
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Responsive Info */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">
            📱 Visualização Responsiva Ativa
          </h3>
          <p className="text-sm text-yellow-700">
            Este quiz se adapta automaticamente a diferentes tamanhos de tela.
            Teste redimensionando a janela do navegador ou acessando de
            dispositivos móveis.
          </p>
        </div>

        {/* Debug Info */}
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">
            🔧 Informações de Teste
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Etapa Atual:</strong> {currentStepIndex + 1}/
              {quizData.steps.length}
            </p>
            <p>
              <strong>Progresso:</strong> {Math.round(progress)}%
            </p>
            <p>
              <strong>Respostas:</strong> {Object.keys(answers).length}
            </p>
            <p>
              <strong>Layout Atual:</strong>{" "}
              {currentStep.components.find((c) => c.type === "options")?.props
                ?.gridLayout || "N/A"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizProductionView;
