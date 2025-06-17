import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useQuizTheme,
  useQuizBehavior,
  useQuizLayout,
  useQuizConfig,
} from "@/hooks/useQuizConfig";
import {
  Palette,
  Layout,
  Settings,
  Download,
  Upload,
  RotateCcw,
} from "lucide-react";

interface QuizConfigPanelProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const QuizConfigPanel: React.FC<QuizConfigPanelProps> = ({
  isOpen = true,
  onToggle,
}) => {
  const { theme, updateTheme, isLoading: themeLoading } = useQuizTheme();
  const {
    behavior,
    updateBehavior,
    isLoading: behaviorLoading,
  } = useQuizBehavior();
  const { layout, updateLayout, isLoading: layoutLoading } = useQuizLayout();
  const { exportConfig, importConfig, resetConfig } = useQuizConfig();

  const handleColorChange = (colorKey: keyof typeof theme, value: string) => {
    updateTheme({ [colorKey]: value });
  };

  const handleFontSizeChange = (
    sizeKey: keyof typeof theme.fontSize,
    value: string
  ) => {
    updateTheme({
      fontSize: {
        ...theme.fontSize,
        [sizeKey]: value,
      },
    });
  };

  const handleExport = () => {
    const config = exportConfig();
    const blob = new Blob([config], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quiz-config.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (importConfig(content)) {
          alert("Configuração importada com sucesso!");
        } else {
          alert("Erro ao importar configuração. Verifique o arquivo.");
        }
      };
      reader.readAsText(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="space-y-4 p-4 bg-white border-l border-gray-200 w-80 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Configurações do Quiz</h3>
        <Button variant="ghost" size="sm" onClick={onToggle}>
          ×
        </Button>
      </div>

      {/* Tema - Cores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Palette size={16} />
            Tema e Cores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Fundo</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={theme.backgroundColor}
                  onChange={(e) =>
                    handleColorChange("backgroundColor", e.target.value)
                  }
                  className="w-12 h-8 p-1"
                />
                <Input
                  type="text"
                  value={theme.backgroundColor}
                  onChange={(e) =>
                    handleColorChange("backgroundColor", e.target.value)
                  }
                  className="flex-1 text-xs"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs">Primária</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) =>
                    handleColorChange("primaryColor", e.target.value)
                  }
                  className="w-12 h-8 p-1"
                />
                <Input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) =>
                    handleColorChange("primaryColor", e.target.value)
                  }
                  className="flex-1 text-xs"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs">Secundária</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={theme.secondaryColor}
                  onChange={(e) =>
                    handleColorChange("secondaryColor", e.target.value)
                  }
                  className="w-12 h-8 p-1"
                />
                <Input
                  type="text"
                  value={theme.secondaryColor}
                  onChange={(e) =>
                    handleColorChange("secondaryColor", e.target.value)
                  }
                  className="flex-1 text-xs"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs">Texto</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={theme.textColor}
                  onChange={(e) =>
                    handleColorChange("textColor", e.target.value)
                  }
                  className="w-12 h-8 p-1"
                />
                <Input
                  type="text"
                  value={theme.textColor}
                  onChange={(e) =>
                    handleColorChange("textColor", e.target.value)
                  }
                  className="flex-1 text-xs"
                />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-xs">Fonte</Label>
            <Input
              value={theme.fontFamily}
              onChange={(e) => updateTheme({ fontFamily: e.target.value })}
              placeholder="Playfair Display, serif"
            />
          </div>
        </CardContent>
      </Card>

      {/* Layout */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Layout size={16} />
            Layout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs">Tipo de Grid</Label>
            <Select
              value={layout.gridType}
              onValueChange={(value) =>
                updateLayout({
                  gridType: value as
                    | "auto"
                    | "1-column"
                    | "2-column"
                    | "3-column",
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Automático</SelectItem>
                <SelectItem value="1-column">1 Coluna</SelectItem>
                <SelectItem value="2-column">2 Colunas</SelectItem>
                <SelectItem value="3-column">3 Colunas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Estilo do Card</Label>
            <Select
              value={layout.cardStyle}
              onValueChange={(value) =>
                updateLayout({
                  cardStyle: value as "modern" | "classic" | "minimal",
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Moderno</SelectItem>
                <SelectItem value="classic">Clássico</SelectItem>
                <SelectItem value="minimal">Minimalista</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Espaçamento</Label>
            <Select
              value={layout.spacing}
              onValueChange={(value) =>
                updateLayout({
                  spacing: value as "compact" | "normal" | "spacious",
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compacto</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="spacious">Espaçoso</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Comportamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Settings size={16} />
            Comportamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Auto-avançar</Label>
            <Switch
              checked={behavior.autoAdvance}
              onCheckedChange={(checked) =>
                updateBehavior({ autoAdvance: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-xs">Mostrar progresso</Label>
            <Switch
              checked={behavior.showProgress}
              onCheckedChange={(checked) =>
                updateBehavior({ showProgress: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-xs">Navegação</Label>
            <Switch
              checked={behavior.enableNavigation}
              onCheckedChange={(checked) =>
                updateBehavior({ enableNavigation: checked })
              }
            />
          </div>

          <div>
            <Label className="text-xs">Máx. seleções normais</Label>
            <div className="mt-2">
              <Slider
                value={[behavior.selectionLimit.normal]}
                onValueChange={([value]) =>
                  updateBehavior({
                    selectionLimit: {
                      ...behavior.selectionLimit,
                      normal: value,
                    },
                  })
                }
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">
                {behavior.selectionLimit.normal}{" "}
                {behavior.selectionLimit.normal === 1 ? "seleção" : "seleções"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={handleExport}
            className="w-full text-xs"
            variant="outline"
          >
            <Download size={14} className="mr-2" />
            Exportar Config
          </Button>

          <div>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: "none" }}
              id="import-config"
            />
            <Button
              onClick={() => document.getElementById("import-config")?.click()}
              className="w-full text-xs"
              variant="outline"
            >
              <Upload size={14} className="mr-2" />
              Importar Config
            </Button>
          </div>

          <Button
            onClick={resetConfig}
            className="w-full text-xs"
            variant="destructive"
          >
            <RotateCcw size={14} className="mr-2" />
            Resetar Padrão
          </Button>
        </CardContent>
      </Card>

      {/* Status */}
      {(themeLoading || behaviorLoading || layoutLoading) && (
        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
          Salvando configurações...
        </div>
      )}
    </div>
  );
};
