import React, { useState } from "react";
import {
  ArrowDown,
  Proportions,
  List,
  TriangleAlert,
  Palette,
  PencilRuler,
  Code,
  Cog,
  Plus,
} from "lucide-react";

// --- Interfaces ---
interface OptionChoice {
  text: string;
  value: string;
  nextStepId?: string;
  scoreValue?: number;
  imageSrc?: string;
}

interface QuizComponentProps {
  text?: string;
  src?: string;
  alt?: string;
  label?: string;
  placeholder?: string;
  buttonText?: string;
  choices?: OptionChoice[];
  direction?: string;
  layout?: string;
  alignment?: string;
  multipleChoice?: boolean;
  required?: boolean;
  autoAdvance?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  shadow?: number;
  padding?: number;
  margin?: number;
  fontSize?: number;
  customCSS?: string;
  customId?: string;
  [key: string]: unknown;
}

interface QuizComponent {
  id: string;
  type: string;
  props: QuizComponentProps;
}

interface QuizStep {
  id: string;
  name: string;
  components: QuizComponent[];
}

interface QuizEditorState {
  headerConfig: {
    title: string;
    subtitle: string;
    showLogo: boolean;
    showProgress: boolean;
    allowReturn: boolean;
    logoSrc?: string;
  };
}

interface AdvancedConfigSidebarProps {
  selectedComponent: QuizComponent | null;
  selectedComponentId: string | null;
  headerConfig: QuizEditorState["headerConfig"];
  onComponentUpdate: (
    targetId: string,
    newProps:
      | Partial<QuizComponentProps>
      | Partial<QuizEditorState["headerConfig"]>
  ) => void;
  onStepRename: (stepId: string, newName: string) => void;
  currentStep: QuizStep | null;
}

const AdvancedConfigSidebar: React.FC<AdvancedConfigSidebarProps> = ({
  selectedComponent,
  selectedComponentId,
  headerConfig,
  onComponentUpdate,
  onStepRename,
  currentStep,
}) => {
  const generateUniqueId = (): string =>
    `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Estados para os cards expandidos
  const [expandedCards, setExpandedCards] = useState({
    layout: true,
    options: false,
    validation: false,
    styling: false,
    customization: false,
    advanced: false,
    general: false,
    optionsLayout: false,
    basic: false,
    header: false,
  });

  // Estado para feedback de salvamento
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  // Função para simular salvamento com feedback
  const handleSaveWithFeedback = (updateFn: () => void) => {
    setSaveStatus("saving");
    updateFn();
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 1000);
    }, 300);
  };

  const toggleCard = (cardName: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardName]: !prev[cardName as keyof typeof prev],
    }));
  };

  const ConfigCard = ({
    title,
    children,
    cardKey,
    icon,
  }: {
    title: string;
    children: React.ReactNode;
    cardKey: string;
    icon: React.ReactNode;
  }) => {
    const isExpanded = expandedCards[cardKey as keyof typeof expandedCards];
    return (
      <div className="rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 shadow-sm overflow-hidden">
        <div
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-750 transition-colors"
          onClick={() => toggleCard(cardKey)}
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 text-zinc-400">{icon}</div>
            <h3 className="text-sm font-medium">{title}</h3>
          </div>
          <div
            className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
          >
            <ArrowDown size={16} className="text-zinc-400" />
          </div>
        </div>
        {isExpanded && (
          <div className="p-4 pt-0 space-y-4 border-t border-zinc-700">
            {children}
          </div>
        )}
      </div>
    );
  };

  const FieldGroup = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <label className="text-xs font-medium text-zinc-300 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );

  const ColorPicker = ({
    value,
    onChange,
    label,
  }: {
    value?: string;
    onChange: (color: string) => void;
    label: string;
  }) => (
    <FieldGroup label={label}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || "#3b82f6"}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-8 rounded border border-zinc-600 bg-transparent cursor-pointer"
        />
        <input
          type="text"
          value={value || "#3b82f6"}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 h-8 rounded border border-zinc-600 bg-zinc-700 px-2 text-sm text-zinc-100"
          placeholder="#3b82f6"
        />
      </div>
    </FieldGroup>
  );

  const SliderControl = ({
    label,
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    unit = "",
  }: {
    label: string;
    value?: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
  }) => (
    <FieldGroup label={label}>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value || min}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="min-w-[3rem] text-right">
          <span className="text-sm text-zinc-300">
            {value || min}
            {unit}
          </span>
        </div>
      </div>
    </FieldGroup>
  );

  const SelectControl = ({
    label,
    value,
    onChange,
    options,
  }: {
    label: string;
    value?: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
  }) => (
    <FieldGroup label={label}>
      <select
        value={value || options[0]?.value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldGroup>
  );

  const SwitchControl = ({
    label,
    checked,
    onChange,
  }: {
    label: string;
    checked?: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <div className="flex items-center justify-between">
      <label className="text-xs font-medium text-zinc-300 uppercase tracking-wide">
        {label}
      </label>
      <div
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
          checked ? "bg-blue-600" : "bg-zinc-600"
        }`}
        onClick={() => onChange(!checked)}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full md:max-w-[24rem] bg-zinc-950 border-l border-zinc-700 overflow-y-auto hidden md:block">
      <div className="sticky top-0 bg-zinc-950 border-b border-zinc-700 p-4 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
            <Cog size={16} />
            Configurações
          </h2>
          {saveStatus !== "idle" && (
            <div className="flex items-center gap-2 text-xs">
              {saveStatus === "saving" && (
                <>
                  <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-blue-400">Salvando...</span>
                </>
              )}
              {saveStatus === "saved" && (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-400">Salvo!</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Configurações da Etapa */}
        {currentStep && (
          <ConfigCard
            title="Configurações da Etapa"
            cardKey="general"
            icon={<Cog size={16} />}
          >
            <FieldGroup label="Nome da Etapa">
              <input
                type="text"
                value={currentStep.name}
                onChange={(e) =>
                  handleSaveWithFeedback(() =>
                    onStepRename(currentStep.id, e.target.value)
                  )
                }
                className="w-full h-10 rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
                placeholder="Nome da etapa"
              />
            </FieldGroup>
          </ConfigCard>
        )}

        {/* Configurações do Componente Selecionado */}
        {selectedComponentId && selectedComponent ? (
          <>
            {/* Card Layout */}
            <ConfigCard
              title="Layout"
              cardKey="layout"
              icon={<Proportions size={16} />}
            >
              {selectedComponent.type === "options" && (
                <>
                  {/* Detecta se tem imagens nas opções */}
                  {(() => {
                    const hasImages = selectedComponent.props.choices?.some(
                      (choice: OptionChoice) => choice.imageSrc
                    );
                    const hasOnlyText = selectedComponent.props.choices?.every(
                      (choice: OptionChoice) => !choice.imageSrc
                    );

                    return (
                      <>
                        <div className="mb-4 p-3 bg-zinc-900/50 rounded-md border border-zinc-700">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-xs font-medium text-zinc-300">
                              {hasImages && !hasOnlyText
                                ? "Modo: Texto + Imagem"
                                : hasOnlyText
                                ? "Modo: Apenas Texto"
                                : "Modo: Misto"}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400">
                            {hasImages && !hasOnlyText
                              ? "Opções com imagens detectadas. Layout otimizado para texto + imagem."
                              : hasOnlyText
                              ? "Opções apenas com texto. Mais opções de layout disponíveis."
                              : "Opções mistas detectadas. Configure individualmente cada opção."}
                          </p>
                        </div>

                        {/* Layout para questões apenas com texto */}
                        {hasOnlyText && (
                          <SelectControl
                            label="Layout das Opções"
                            value={
                              selectedComponent.props.optionsLayout || "grid-2"
                            }
                            onChange={(value) =>
                              onComponentUpdate(selectedComponent.id, {
                                optionsLayout: value,
                              })
                            }
                            options={[
                              {
                                value: "grid-1",
                                label: "1 Coluna (Lista Vertical)",
                              },
                              { value: "grid-2", label: "2 Colunas" },
                              { value: "grid-3", label: "3 Colunas" },
                              { value: "grid-4", label: "4 Colunas" },
                              {
                                value: "flex-wrap",
                                label: "Flexível (Quebra Automática)",
                              },
                              { value: "list", label: "Lista Compacta" },
                            ]}
                          />
                        )}

                        {/* Layout para questões com imagem */}
                        {hasImages && (
                          <SelectControl
                            label="Layout das Opções"
                            value={
                              selectedComponent.props.optionsLayout || "grid-2"
                            }
                            onChange={(value) =>
                              onComponentUpdate(selectedComponent.id, {
                                optionsLayout: value,
                              })
                            }
                            options={[
                              {
                                value: "grid-1",
                                label: "1 Coluna (Imagem Grande)",
                              },
                              {
                                value: "grid-2",
                                label: "2 Colunas (Recomendado)",
                              },
                              {
                                value: "grid-3",
                                label: "3 Colunas (Imagem Pequena)",
                              },
                              { value: "carousel", label: "Carrossel" },
                            ]}
                          />
                        )}

                        {/* Configurações específicas para texto apenas */}
                        {hasOnlyText && (
                          <>
                            <SelectControl
                              label="Tamanho dos Botões"
                              value={
                                selectedComponent.props.buttonSize || "medium"
                              }
                              onChange={(value) =>
                                onComponentUpdate(selectedComponent.id, {
                                  buttonSize: value,
                                })
                              }
                              options={[
                                { value: "small", label: "Pequeno (Compacto)" },
                                { value: "medium", label: "Médio" },
                                { value: "large", label: "Grande" },
                                { value: "auto", label: "Automático" },
                              ]}
                            />

                            <SelectControl
                              label="Estilo do Texto"
                              value={
                                selectedComponent.props.textStyle || "center"
                              }
                              onChange={(value) =>
                                onComponentUpdate(selectedComponent.id, {
                                  textStyle: value,
                                })
                              }
                              options={[
                                { value: "center", label: "Centralizado" },
                                { value: "left", label: "Alinhado à Esquerda" },
                                { value: "justified", label: "Justificado" },
                              ]}
                            />
                          </>
                        )}

                        {/* Configurações específicas para imagem */}
                        {hasImages && (
                          <>
                            <SelectControl
                              label="Proporção da Imagem"
                              value={
                                selectedComponent.props.imageRatio || "square"
                              }
                              onChange={(value) =>
                                onComponentUpdate(selectedComponent.id, {
                                  imageRatio: value,
                                })
                              }
                              options={[
                                { value: "square", label: "Quadrada (1:1)" },
                                {
                                  value: "landscape",
                                  label: "Paisagem (16:9)",
                                },
                                { value: "portrait", label: "Retrato (3:4)" },
                                { value: "auto", label: "Automática" },
                              ]}
                            />

                            <SelectControl
                              label="Posição do Texto"
                              value={
                                selectedComponent.props.textPosition || "bottom"
                              }
                              onChange={(value) =>
                                onComponentUpdate(selectedComponent.id, {
                                  textPosition: value,
                                })
                              }
                              options={[
                                { value: "bottom", label: "Embaixo da Imagem" },
                                { value: "top", label: "Acima da Imagem" },
                                {
                                  value: "overlay",
                                  label: "Sobreposto à Imagem",
                                },
                                { value: "side", label: "Ao Lado da Imagem" },
                              ]}
                            />
                          </>
                        )}
                      </>
                    );
                  })()}
                </>
              )}

              {/* Layout geral para outros tipos de componente */}
              {selectedComponent.type !== "options" && (
                <>
                  <SelectControl
                    label="Direção"
                    value={selectedComponent.props.direction || "column"}
                    onChange={(value) =>
                      onComponentUpdate(selectedComponent.id, {
                        direction: value,
                      })
                    }
                    options={[
                      { value: "column", label: "Vertical" },
                      { value: "row", label: "Horizontal" },
                    ]}
                  />
                  <SelectControl
                    label="Disposição"
                    value={selectedComponent.props.layout || "default"}
                    onChange={(value) =>
                      onComponentUpdate(selectedComponent.id, { layout: value })
                    }
                    options={[
                      { value: "default", label: "Padrão" },
                      { value: "grid", label: "Grade" },
                      { value: "flex", label: "Flexível" },
                    ]}
                  />
                  <SelectControl
                    label="Alinhamento"
                    value={selectedComponent.props.alignment || "center"}
                    onChange={(value) =>
                      onComponentUpdate(selectedComponent.id, {
                        alignment: value,
                      })
                    }
                    options={[
                      { value: "left", label: "Esquerda" },
                      { value: "center", label: "Centro" },
                      { value: "right", label: "Direita" },
                    ]}
                  />
                </>
              )}

              {/* Configurações de espaçamento */}
              <SliderControl
                label="Espaçamento entre Opções"
                value={selectedComponent.props.optionsGap || 8}
                onChange={(value) =>
                  onComponentUpdate(selectedComponent.id, { optionsGap: value })
                }
                min={0}
                max={32}
                unit="px"
              />
            </ConfigCard>

            {/* Card Opções (apenas para componente options) */}
            {selectedComponent.type === "options" && (
              <ConfigCard
                title="Opções"
                cardKey="options"
                icon={<List size={16} />}
              >
                <FieldGroup label="Texto da Pergunta">
                  <input
                    type="text"
                    value={selectedComponent.props.text || ""}
                    onChange={(e) =>
                      onComponentUpdate(selectedComponent.id, {
                        text: e.target.value,
                      })
                    }
                    className="w-full h-10 rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
                    placeholder="Qual é a sua pergunta?"
                  />
                </FieldGroup>

                <div className="space-y-3">
                  <label className="text-xs font-medium text-zinc-300 uppercase tracking-wide">
                    Lista de Opções
                  </label>
                  {selectedComponent.props.choices?.map(
                    (choice: OptionChoice, index: number) => (
                      <div
                        key={index}
                        className="p-3 border border-zinc-700 rounded-md bg-zinc-900/50 space-y-2"
                      >
                        <input
                          type="text"
                          value={choice.text}
                          onChange={(e) => {
                            const updatedChoices = [
                              ...(selectedComponent.props.choices || []),
                            ];
                            updatedChoices[index].text = e.target.value;
                            onComponentUpdate(selectedComponent.id, {
                              choices: updatedChoices,
                            });
                          }}
                          className="w-full h-9 rounded border border-zinc-600 bg-zinc-700 px-2 text-sm text-zinc-100"
                          placeholder={`Opção ${index + 1}`}
                        />
                        <input
                          type="text"
                          value={choice.imageSrc || ""}
                          onChange={(e) => {
                            const updatedChoices = [
                              ...(selectedComponent.props.choices || []),
                            ];
                            updatedChoices[index].imageSrc = e.target.value;
                            onComponentUpdate(selectedComponent.id, {
                              choices: updatedChoices,
                            });
                          }}
                          className="w-full h-9 rounded border border-zinc-600 bg-zinc-700 px-2 text-sm text-zinc-100"
                          placeholder="URL da Imagem (opcional)"
                        />
                        <button
                          onClick={() => {
                            const updatedChoices = (
                              selectedComponent.props.choices || []
                            ).filter((_, i) => i !== index);
                            onComponentUpdate(selectedComponent.id, {
                              choices: updatedChoices,
                            });
                          }}
                          className="w-full bg-red-600/20 text-red-400 hover:bg-red-600/30 px-2 py-1 rounded text-xs transition-colors"
                        >
                          Remover
                        </button>
                      </div>
                    )
                  )}
                  <button
                    onClick={() => {
                      const updatedChoices = [
                        ...(selectedComponent.props.choices || []),
                        {
                          text: "Nova Opção",
                          value: `option-${generateUniqueId()}`,
                        },
                      ];
                      onComponentUpdate(selectedComponent.id, {
                        choices: updatedChoices,
                      });
                    }}
                    className="w-full bg-green-600/20 text-green-400 hover:bg-green-600/30 px-3 py-2 rounded text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={14} />
                    Adicionar Opção
                  </button>

                  {/* Botões de teste rápido */}
                  <div className="mt-4 p-3 bg-zinc-900/50 rounded-md border border-zinc-700">
                    <label className="text-xs font-medium text-zinc-300 uppercase tracking-wide mb-2 block">
                      Testes Rápidos
                    </label>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          const testChoices = [
                            {
                              text: "Opção 1",
                              value: "opt1",
                              imageSrc:
                                "https://picsum.photos/300/200?random=1",
                            },
                            {
                              text: "Opção 2",
                              value: "opt2",
                              imageSrc:
                                "https://picsum.photos/300/200?random=2",
                            },
                            {
                              text: "Opção 3",
                              value: "opt3",
                              imageSrc:
                                "https://picsum.photos/300/200?random=3",
                            },
                            {
                              text: "Opção 4",
                              value: "opt4",
                              imageSrc:
                                "https://picsum.photos/300/200?random=4",
                            },
                          ];
                          handleSaveWithFeedback(() =>
                            onComponentUpdate(selectedComponent.id, {
                              choices: testChoices,
                              gridLayout: "grid-2",
                              imageHeight: 160,
                              imageRatio: "landscape",
                            })
                          );
                        }}
                        className="text-xs bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-2 py-1 rounded transition-colors"
                      >
                        4 Opções com Imagens
                      </button>

                      <button
                        onClick={() => {
                          const testChoices = [
                            {
                              text: "Texto Longo para Testar Quebra de Linha",
                              value: "opt1",
                            },
                            { text: "Curto", value: "opt2" },
                            {
                              text: "Texto Médio para Visualização",
                              value: "opt3",
                            },
                          ];
                          handleSaveWithFeedback(() =>
                            onComponentUpdate(selectedComponent.id, {
                              choices: testChoices,
                              gridLayout: "grid-3",
                              textAlignment: "center",
                            })
                          );
                        }}
                        className="text-xs bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 px-2 py-1 rounded transition-colors"
                      >
                        3 Opções Texto
                      </button>
                    </div>
                  </div>
                </div>
              </ConfigCard>
            )}

            {/* Card Layout Específico para Opções */}
            {selectedComponent.type === "options" && (
              <ConfigCard
                title="Layout Avançado das Opções"
                cardKey="optionsLayout"
                icon={<Proportions size={16} />}
              >
                {(() => {
                  // Detecta automaticamente se tem imagens
                  const hasImages = selectedComponent.props.choices?.some(
                    (choice: OptionChoice) => choice.imageSrc
                  );
                  const choicesCount =
                    selectedComponent.props.choices?.length || 0;

                  return (
                    <>
                      <div className="p-3 bg-zinc-900/30 rounded-md border border-zinc-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-zinc-300">
                            Tipo Detectado:
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              hasImages
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-green-600/20 text-green-400"
                            }`}
                          >
                            {hasImages ? "Texto + Imagem" : "Apenas Texto"}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-400">
                          {choicesCount} opções • Layout adaptativo baseado no
                          conteúdo
                        </div>
                      </div>

                      <SelectControl
                        label="Disposição da Grade"
                        value={
                          selectedComponent.props.gridLayout ||
                          (hasImages ? "grid-2" : "grid-1")
                        }
                        onChange={(value) =>
                          onComponentUpdate(selectedComponent.id, {
                            gridLayout: value,
                          })
                        }
                        options={[
                          { value: "grid-1", label: "1 Coluna" },
                          { value: "grid-2", label: "2 Colunas" },
                          { value: "grid-3", label: "3 Colunas" },
                          { value: "grid-4", label: "4 Colunas" },
                          { value: "flex", label: "Flexível" },
                          { value: "list", label: "Lista Vertical" },
                        ]}
                      />

                      <SliderControl
                        label="Espaçamento entre Opções"
                        value={
                          selectedComponent.props.optionSpacing ||
                          (hasImages ? 8 : 4)
                        }
                        onChange={(value) =>
                          onComponentUpdate(selectedComponent.id, {
                            optionSpacing: value,
                          })
                        }
                        min={0}
                        max={24}
                        unit="px"
                      />

                      {hasImages && (
                        <>
                          <SelectControl
                            label="Proporção da Imagem"
                            value={
                              selectedComponent.props.imageRatio || "square"
                            }
                            onChange={(value) =>
                              onComponentUpdate(selectedComponent.id, {
                                imageRatio: value,
                              })
                            }
                            options={[
                              { value: "square", label: "Quadrado (1:1)" },
                              { value: "landscape", label: "Paisagem (16:9)" },
                              { value: "portrait", label: "Retrato (4:5)" },
                              { value: "wide", label: "Largo (21:9)" },
                              { value: "auto", label: "Automático" },
                            ]}
                          />

                          <SelectControl
                            label="Posição da Imagem"
                            value={
                              selectedComponent.props.imagePosition || "top"
                            }
                            onChange={(value) =>
                              onComponentUpdate(selectedComponent.id, {
                                imagePosition: value,
                              })
                            }
                            options={[
                              { value: "top", label: "Acima do Texto" },
                              { value: "bottom", label: "Abaixo do Texto" },
                              { value: "left", label: "Esquerda do Texto" },
                              { value: "right", label: "Direita do Texto" },
                              { value: "background", label: "Como Fundo" },
                            ]}
                          />

                          <SliderControl
                            label="Altura da Imagem"
                            value={selectedComponent.props.imageHeight || 160}
                            onChange={(value) =>
                              onComponentUpdate(selectedComponent.id, {
                                imageHeight: value,
                              })
                            }
                            min={80}
                            max={400}
                            unit="px"
                          />

                          <SliderControl
                            label="Raio da Borda da Imagem"
                            value={
                              selectedComponent.props.imageBorderRadius || 8
                            }
                            onChange={(value) =>
                              onComponentUpdate(selectedComponent.id, {
                                imageBorderRadius: value,
                              })
                            }
                            min={0}
                            max={24}
                            unit="px"
                          />
                        </>
                      )}

                      <SelectControl
                        label="Alinhamento do Texto"
                        value={
                          selectedComponent.props.textAlignment || "center"
                        }
                        onChange={(value) =>
                          onComponentUpdate(selectedComponent.id, {
                            textAlignment: value,
                          })
                        }
                        options={[
                          { value: "left", label: "Esquerda" },
                          { value: "center", label: "Centro" },
                          { value: "right", label: "Direita" },
                          { value: "justify", label: "Justificado" },
                        ]}
                      />

                      <SliderControl
                        label="Padding da Opção"
                        value={
                          selectedComponent.props.optionPadding ||
                          (hasImages ? 12 : 16)
                        }
                        onChange={(value) =>
                          onComponentUpdate(selectedComponent.id, {
                            optionPadding: value,
                          })
                        }
                        min={4}
                        max={32}
                        unit="px"
                      />

                      <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-300 uppercase tracking-wide">
                          Layout Responsivo
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-center">
                            <label className="text-xs text-zinc-400">
                              Desktop
                            </label>
                            <select
                              value={
                                selectedComponent.props.desktopColumns || "2"
                              }
                              onChange={(e) =>
                                onComponentUpdate(selectedComponent.id, {
                                  desktopColumns: e.target.value,
                                })
                              }
                              className="w-full h-8 text-xs rounded border border-zinc-600 bg-zinc-700 text-zinc-100"
                            >
                              <option value="1">1 Col</option>
                              <option value="2">2 Cols</option>
                              <option value="3">3 Cols</option>
                              <option value="4">4 Cols</option>
                            </select>
                          </div>
                          <div className="text-center">
                            <label className="text-xs text-zinc-400">
                              Tablet
                            </label>
                            <select
                              value={
                                selectedComponent.props.tabletColumns || "2"
                              }
                              onChange={(e) =>
                                onComponentUpdate(selectedComponent.id, {
                                  tabletColumns: e.target.value,
                                })
                              }
                              className="w-full h-8 text-xs rounded border border-zinc-600 bg-zinc-700 text-zinc-100"
                            >
                              <option value="1">1 Col</option>
                              <option value="2">2 Cols</option>
                              <option value="3">3 Cols</option>
                            </select>
                          </div>
                          <div className="text-center">
                            <label className="text-xs text-zinc-400">
                              Mobile
                            </label>
                            <select
                              value={
                                selectedComponent.props.mobileColumns || "1"
                              }
                              onChange={(e) =>
                                onComponentUpdate(selectedComponent.id, {
                                  mobileColumns: e.target.value,
                                })
                              }
                              className="w-full h-8 text-xs rounded border border-zinc-600 bg-zinc-700 text-zinc-100"
                            >
                              <option value="1">1 Col</option>
                              <option value="2">2 Cols</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </ConfigCard>
            )}

            {/* Card Validações */}
            <ConfigCard
              title="Validações"
              cardKey="validation"
              icon={<TriangleAlert size={16} />}
            >
              <SwitchControl
                label="Múltipla Escolha"
                checked={selectedComponent.props.multipleChoice || false}
                onChange={(checked) =>
                  onComponentUpdate(selectedComponent.id, {
                    multipleChoice: checked,
                  })
                }
              />
              <SwitchControl
                label="Obrigatório"
                checked={selectedComponent.props.required || false}
                onChange={(checked) =>
                  onComponentUpdate(selectedComponent.id, { required: checked })
                }
              />
              <SwitchControl
                label="Auto-avançar"
                checked={selectedComponent.props.autoAdvance || false}
                onChange={(checked) =>
                  onComponentUpdate(selectedComponent.id, {
                    autoAdvance: checked,
                  })
                }
              />
            </ConfigCard>

            {/* Card Estilização */}
            <ConfigCard
              title="Estilização"
              cardKey="styling"
              icon={<Palette size={16} />}
            >
              <ColorPicker
                label="Cor de Fundo"
                value={selectedComponent.props.backgroundColor || "#1f2937"}
                onChange={(color) =>
                  onComponentUpdate(selectedComponent.id, {
                    backgroundColor: color,
                  })
                }
              />
              <ColorPicker
                label="Cor do Texto"
                value={selectedComponent.props.textColor || "#f9fafb"}
                onChange={(color) =>
                  onComponentUpdate(selectedComponent.id, { textColor: color })
                }
              />
              <SliderControl
                label="Raio da Borda"
                value={selectedComponent.props.borderRadius || 8}
                onChange={(value) =>
                  onComponentUpdate(selectedComponent.id, {
                    borderRadius: value,
                  })
                }
                min={0}
                max={24}
                unit="px"
              />
              <SliderControl
                label="Sombra"
                value={selectedComponent.props.shadow || 0}
                onChange={(value) =>
                  onComponentUpdate(selectedComponent.id, { shadow: value })
                }
                min={0}
                max={10}
              />
            </ConfigCard>

            {/* Card Personalização */}
            <ConfigCard
              title="Personalização"
              cardKey="customization"
              icon={<PencilRuler size={16} />}
            >
              <SliderControl
                label="Espaçamento Interno"
                value={selectedComponent.props.padding || 16}
                onChange={(value) =>
                  onComponentUpdate(selectedComponent.id, { padding: value })
                }
                min={0}
                max={48}
                unit="px"
              />
              <SliderControl
                label="Espaçamento Externo"
                value={selectedComponent.props.margin || 8}
                onChange={(value) =>
                  onComponentUpdate(selectedComponent.id, { margin: value })
                }
                min={0}
                max={48}
                unit="px"
              />
              <SliderControl
                label="Tamanho da Fonte"
                value={selectedComponent.props.fontSize || 16}
                onChange={(value) =>
                  onComponentUpdate(selectedComponent.id, { fontSize: value })
                }
                min={12}
                max={32}
                unit="px"
              />
            </ConfigCard>

            {/* Card Avançado */}
            <ConfigCard
              title="Avançado"
              cardKey="advanced"
              icon={<Code size={16} />}
            >
              <FieldGroup label="CSS Personalizado">
                <textarea
                  value={selectedComponent.props.customCSS || ""}
                  onChange={(e) =>
                    onComponentUpdate(selectedComponent.id, {
                      customCSS: e.target.value,
                    })
                  }
                  className="w-full h-20 rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 font-mono"
                  placeholder="/* CSS personalizado */"
                />
              </FieldGroup>
              <FieldGroup label="ID Personalizado">
                <input
                  type="text"
                  value={selectedComponent.props.customId || ""}
                  onChange={(e) =>
                    onComponentUpdate(selectedComponent.id, {
                      customId: e.target.value,
                    })
                  }
                  className="w-full h-10 rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
                  placeholder="meu-componente"
                />
              </FieldGroup>
            </ConfigCard>

            {/* Propriedades básicas específicas do tipo de componente */}
            <ConfigCard
              title="Propriedades Básicas"
              cardKey="basic"
              icon={<Cog size={16} />}
            >
              {(selectedComponent.type === "heading" ||
                selectedComponent.type === "text") && (
                <FieldGroup label="Texto">
                  <input
                    type="text"
                    value={selectedComponent.props.text || ""}
                    onChange={(e) =>
                      onComponentUpdate(selectedComponent.id, {
                        text: e.target.value,
                      })
                    }
                    className="w-full h-10 rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
                    placeholder="Digite o texto"
                  />
                </FieldGroup>
              )}

              {selectedComponent.type === "image" && (
                <>
                  <FieldGroup label="URL da Imagem">
                    <input
                      type="text"
                      value={selectedComponent.props.src || ""}
                      onChange={(e) =>
                        onComponentUpdate(selectedComponent.id, {
                          src: e.target.value,
                        })
                      }
                      className="w-full h-10 rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
                      placeholder="https://exemplo.com/imagem.png"
                    />
                  </FieldGroup>
                  <FieldGroup label="Texto Alternativo">
                    <input
                      type="text"
                      value={selectedComponent.props.alt || ""}
                      onChange={(e) =>
                        onComponentUpdate(selectedComponent.id, {
                          alt: e.target.value,
                        })
                      }
                      className="w-full h-10 rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
                      placeholder="Descrição da imagem"
                    />
                  </FieldGroup>
                </>
              )}

              {selectedComponent.type === "button" && (
                <FieldGroup label="Texto do Botão">
                  <input
                    type="text"
                    value={selectedComponent.props.buttonText || ""}
                    onChange={(e) =>
                      onComponentUpdate(selectedComponent.id, {
                        buttonText: e.target.value,
                      })
                    }
                    className="w-full h-10 rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
                    placeholder="Clique aqui"
                  />
                </FieldGroup>
              )}

              {selectedComponent.type === "input" && (
                <>
                  <FieldGroup label="Rótulo">
                    <input
                      type="text"
                      value={selectedComponent.props.label || ""}
                      onChange={(e) =>
                        onComponentUpdate(selectedComponent.id, {
                          label: e.target.value,
                        })
                      }
                      className="w-full h-10 rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
                      placeholder="Nome do campo"
                    />
                  </FieldGroup>
                  <FieldGroup label="Placeholder">
                    <input
                      type="text"
                      value={selectedComponent.props.placeholder || ""}
                      onChange={(e) =>
                        onComponentUpdate(selectedComponent.id, {
                          placeholder: e.target.value,
                        })
                      }
                      className="w-full h-10 rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
                      placeholder="Digite aqui..."
                    />
                  </FieldGroup>
                </>
              )}
            </ConfigCard>
          </>
        ) : (
          <div className="text-center py-12 text-zinc-500 bg-zinc-800 rounded-lg p-6">
            <p>Nenhum componente selecionado para configurar.</p>
            <p className="mt-2 text-sm">
              Clique em um componente no canvas para editar suas propriedades.
            </p>
          </div>
        )}

        {/* Card Header Config */}
        <ConfigCard
          title="Configurações do Cabeçalho"
          cardKey="header"
          icon={<Cog size={16} />}
        >
          <SwitchControl
            label="Mostrar Logotipo"
            checked={headerConfig.showLogo}
            onChange={(checked) =>
              onComponentUpdate("headerConfig", { showLogo: checked })
            }
          />
          {headerConfig.showLogo && (
            <FieldGroup label="URL do Logotipo">
              <input
                type="text"
                value={headerConfig.logoSrc || ""}
                onChange={(e) =>
                  onComponentUpdate("headerConfig", { logoSrc: e.target.value })
                }
                className="w-full h-10 rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
                placeholder="https://exemplo.com/logo.png"
              />
            </FieldGroup>
          )}
          <SwitchControl
            label="Mostrar Progresso"
            checked={headerConfig.showProgress}
            onChange={(checked) =>
              onComponentUpdate("headerConfig", { showProgress: checked })
            }
          />
          <SwitchControl
            label="Permitir Voltar"
            checked={headerConfig.allowReturn}
            onChange={(checked) =>
              onComponentUpdate("headerConfig", { allowReturn: checked })
            }
          />
        </ConfigCard>
      </div>
    </div>
  );
};

export default AdvancedConfigSidebar;
