import React from 'react';
import { useEditorState, useEditorActions, useCurrentStep } from '@/store/editorStore';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Save, 
  Undo, 
  Redo, 
  Eye, 
  EyeOff,
  Plus,
  Settings,
  Palette,
  MonitorSmartphone
} from 'lucide-react';

interface EditorToolbarProps {
  onAddStep?: () => void;
  onPreview?: () => void;
  onSave?: () => void;
  className?: string;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onAddStep,
  onPreview,
  onSave,
  className = "",
}) => {
  const { isPreviewMode, saveStatus } = useEditorState();
  const { setPreviewMode, saveState } = useEditorActions();
  const currentStep = useCurrentStep();

  const handlePreviewToggle = () => {
    const newPreviewMode = !isPreviewMode;
    setPreviewMode(newPreviewMode);
    onPreview?.();
  };

  const handleSave = () => {
    saveState();
    onSave?.();
  };

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case "saving":
        return <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />;
      case "saved":
        return <Save className="w-4 h-4 text-green-500" />;
      default:
        return <Save className="w-4 h-4" />;
    }
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case "saving":
        return "Salvando...";
      case "saved":
        return "Salvo!";
      default:
        return "Salvar";
    }
  };

  return (
    <div className={`flex items-center justify-between p-4 bg-zinc-900 border-b border-zinc-700 ${className}`}>
      {/* Lado esquerdo - Informações */}
      <div className="flex items-center gap-4">
        <div className="text-sm text-zinc-400">
          Editando: <span className="text-white font-medium">{currentStep?.name || 'Carregando...'}</span>
        </div>
      </div>

      {/* Centro - Ações principais */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onAddStep}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Nova Etapa
        </Button>

        <div className="w-px h-6 bg-zinc-700" />

        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          disabled
        >
          <Undo className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          disabled
        >
          <Redo className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-zinc-700" />

        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Settings className="w-4 h-4" />
          Configurações
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Palette className="w-4 h-4" />
          Temas
        </Button>
      </div>

      {/* Lado direito - Preview e Save */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <MonitorSmartphone className="w-4 h-4" />
          Responsivo
        </Button>

        <Button
          variant={isPreviewMode ? "default" : "outline"}
          size="sm"
          onClick={handlePreviewToggle}
          className="gap-2"
        >
          {isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {isPreviewMode ? 'Editar' : 'Preview'}
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={handleSave}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
          disabled={saveStatus === "saving"}
        >
          {getSaveStatusIcon()}
          {getSaveStatusText()}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-green-600 hover:bg-green-700 text-white border-green-600"
        >
          <Play className="w-4 h-4" />
          Testar
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
