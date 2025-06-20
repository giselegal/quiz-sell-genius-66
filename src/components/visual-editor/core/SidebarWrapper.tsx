import React from "react";
import {
  useEditorState,
  useEditorActions,
  useCurrentComponent,
} from "@/store/editorStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Type, Image, Square, MousePointer } from "lucide-react";

interface SidebarWrapperProps {
  className?: string;
}

export const SidebarWrapper: React.FC<SidebarWrapperProps> = ({
  className = "",
}) => {
  const { selectedComponentId, saveStatus } = useEditorState();

  const { updateComponent } = useEditorActions();
  const currentComponent = useCurrentComponent();

  if (!currentComponent) {
    return (
      <div
        className={`w-full h-full bg-zinc-900 border-l border-zinc-700 ${className}`}
      >
        <div className="p-6">
          <div className="text-center text-zinc-400 mb-6">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-zinc-800 rounded-lg flex items-center justify-center">
                <MousePointer className="w-8 h-8 text-zinc-600" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2 text-white">
              Selecione um Componente
            </h3>
            <p className="text-sm">
              Clique em um componente no canvas para editá-lo
            </p>
          </div>

          {/* Status de salvamento */}
          <div className="flex items-center justify-center gap-2 text-xs">
            <div
              className={`w-2 h-2 rounded-full ${
                saveStatus === "saving"
                  ? "bg-yellow-500 animate-pulse"
                  : saveStatus === "saved"
                  ? "bg-green-500"
                  : "bg-gray-500"
              }`}
            />
            <span className="text-zinc-400">
              {saveStatus === "saving"
                ? "Salvando..."
                : saveStatus === "saved"
                ? "Salvo automaticamente"
                : "Aguardando alterações"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  const handleUpdateComponent = (field: string, value: string | number) => {
    updateComponent(currentComponent.id, { [field]: value });
  };

  const getComponentIcon = () => {
    switch (currentComponent.type) {
      case "heading":
        return <Type className="w-4 h-4" />;
      case "text":
        return <Type className="w-4 h-4" />;
      case "image":
        return <Image className="w-4 h-4" />;
      case "button":
        return <Square className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  return (
    <div
      className={`w-full h-full bg-zinc-900 border-l border-zinc-700 overflow-y-auto ${className}`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            {getComponentIcon()}
            <div>
              <h2 className="text-lg font-semibold text-white">Propriedades</h2>
              <Badge variant="secondary" className="text-xs">
                {currentComponent.type}
              </Badge>
            </div>
          </div>

          {/* Status de salvamento */}
          <div className="flex items-center gap-2 text-xs">
            <div
              className={`w-2 h-2 rounded-full ${
                saveStatus === "saving"
                  ? "bg-yellow-500 animate-pulse"
                  : saveStatus === "saved"
                  ? "bg-green-500"
                  : "bg-gray-500"
              }`}
            />
            <span className="text-zinc-400">
              {saveStatus === "saving"
                ? "Salvando..."
                : saveStatus === "saved"
                ? "Salvo!"
                : "Não salvo"}
            </span>
          </div>
        </div>

        {/* Configurações baseadas no tipo */}
        <div className="space-y-4">
          {/* Configurações de Texto */}
          {(currentComponent.type === "heading" ||
            currentComponent.type === "text") && (
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-white">Conteúdo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-zinc-300">Texto</Label>
                  <Input
                    value={currentComponent.props.text || ""}
                    onChange={(e) =>
                      handleUpdateComponent("text", e.target.value)
                    }
                    placeholder="Digite o texto..."
                    className="bg-zinc-700 border-zinc-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Tamanho da Fonte</Label>
                  <Input
                    type="number"
                    value={currentComponent.props.fontSize || 16}
                    onChange={(e) =>
                      handleUpdateComponent(
                        "fontSize",
                        parseInt(e.target.value)
                      )
                    }
                    className="bg-zinc-700 border-zinc-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Cor do Texto</Label>
                  <Input
                    type="color"
                    value={currentComponent.props.textColor || "#000000"}
                    onChange={(e) =>
                      handleUpdateComponent("textColor", e.target.value)
                    }
                    className="bg-zinc-700 border-zinc-600 h-10"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Configurações de Imagem */}
          {currentComponent.type === "image" && (
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-white">Imagem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-zinc-300">URL da Imagem</Label>
                  <Input
                    value={currentComponent.props.src || ""}
                    onChange={(e) =>
                      handleUpdateComponent("src", e.target.value)
                    }
                    placeholder="https://..."
                    className="bg-zinc-700 border-zinc-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Texto Alternativo</Label>
                  <Input
                    value={currentComponent.props.alt || ""}
                    onChange={(e) =>
                      handleUpdateComponent("alt", e.target.value)
                    }
                    placeholder="Descrição da imagem"
                    className="bg-zinc-700 border-zinc-600 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Configurações de Botão */}
          {currentComponent.type === "button" && (
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-white">Botão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-zinc-300">Texto do Botão</Label>
                  <Input
                    value={currentComponent.props.buttonText || ""}
                    onChange={(e) =>
                      handleUpdateComponent("buttonText", e.target.value)
                    }
                    placeholder="Clique aqui"
                    className="bg-zinc-700 border-zinc-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Cor de Fundo</Label>
                  <Input
                    type="color"
                    value={currentComponent.props.backgroundColor || "#3b82f6"}
                    onChange={(e) =>
                      handleUpdateComponent("backgroundColor", e.target.value)
                    }
                    className="bg-zinc-700 border-zinc-600 h-10"
                  />
                </div>
                <div>
                  <Label className="text-zinc-300">Cor do Texto</Label>
                  <Input
                    type="color"
                    value={currentComponent.props.textColor || "#ffffff"}
                    onChange={(e) =>
                      handleUpdateComponent("textColor", e.target.value)
                    }
                    className="bg-zinc-700 border-zinc-600 h-10"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Configurações Gerais de Layout */}
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white">Layout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-zinc-300">Alinhamento</Label>
                <select
                  value={currentComponent.props.alignment || "left"}
                  onChange={(e) =>
                    handleUpdateComponent("alignment", e.target.value)
                  }
                  className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded text-white"
                >
                  <option value="left">Esquerda</option>
                  <option value="center">Centro</option>
                  <option value="right">Direita</option>
                </select>
              </div>
              <div>
                <Label className="text-zinc-300">Padding</Label>
                <Input
                  type="number"
                  value={currentComponent.props.padding || 0}
                  onChange={(e) =>
                    handleUpdateComponent("padding", parseInt(e.target.value))
                  }
                  className="bg-zinc-700 border-zinc-600 text-white"
                />
              </div>
              <div>
                <Label className="text-zinc-300">Margem</Label>
                <Input
                  type="number"
                  value={currentComponent.props.margin || 0}
                  onChange={(e) =>
                    handleUpdateComponent("margin", parseInt(e.target.value))
                  }
                  className="bg-zinc-700 border-zinc-600 text-white"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SidebarWrapper;
