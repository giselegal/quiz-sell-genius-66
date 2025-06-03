import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Save,
  FolderOpen,
  MoreVertical,
  Copy,
  Download,
  Upload,
  Trash2,
  FileText,
  Calendar,
  Clock,
} from 'lucide-react';
import { EditorState } from '@/hooks/editor/useEditorPersistence';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProjectManagerProps {
  states: EditorState[];
  currentState: EditorState | null;
  onSave: (name: string, stateId?: string) => void;
  onLoad: (stateId: string) => void;
  onDelete: (stateId: string) => void;
  onDuplicate: (stateId: string) => void;
  onExport: (stateId: string) => void;
  onImport: (file: File) => void;
  hasUnsavedChanges: boolean;
}

interface SaveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  currentState: EditorState | null;
  defaultName?: string;
}

const SaveDialog: React.FC<SaveDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  currentState,
  defaultName = '',
}) => {
  const [projectName, setProjectName] = useState(defaultName || currentState?.name || '');
  
  const handleSave = () => {
    if (projectName.trim()) {
      onSave(projectName.trim());
      setProjectName('');
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {currentState ? 'Salvar Alterações' : 'Salvar Projeto'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Nome do Projeto</Label>
            <Input
              id="project-name"
              placeholder="Digite o nome do projeto..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!projectName.trim()}
            >
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface LoadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  states: EditorState[];
  onLoad: (stateId: string) => void;
  onDelete: (stateId: string) => void;
  onDuplicate: (stateId: string) => void;
  onExport: (stateId: string) => void;
  currentState: EditorState | null;
}

const LoadDialog: React.FC<LoadDialogProps> = ({
  isOpen,
  onClose,
  states,
  onLoad,
  onDelete,
  onDuplicate,
  onExport,
  currentState,
}) => {
  const [deleteStateId, setDeleteStateId] = useState<string | null>(null);

  const handleLoad = (stateId: string) => {
    onLoad(stateId);
    onClose();
  };

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: ptBR,
    });
  };

  const sortedStates = [...states].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Carregar Projeto</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-96">
            <div className="space-y-2">
              {sortedStates.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum projeto salvo encontrado</p>
                  <p className="text-sm">Crie e salve um projeto para vê-lo aqui</p>
                </div>
              ) : (
                sortedStates.map((state) => (
                  <div
                    key={state.id}
                    className={`p-4 border rounded-lg hover:bg-muted/50 transition-colors ${
                      currentState?.id === state.id ? 'border-primary bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium truncate">{state.name}</h3>
                          {currentState?.id === state.id && (
                            <Badge variant="secondary" className="text-xs">
                              Atual
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(state.updatedAt)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="h-3 w-3" />
                            <span>{state.blocks.length} bloco(s)</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>v{state.version}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleLoad(state.id)}
                          disabled={currentState?.id === state.id}
                        >
                          Carregar
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onDuplicate(state.id)}>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onExport(state.id)}>
                              <Download className="h-4 w-4 mr-2" />
                              Exportar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => setDeleteStateId(state.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Deletar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteStateId} onOpenChange={() => setDeleteStateId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Projeto</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este projeto? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteStateId) {
                  onDelete(deleteStateId);
                  setDeleteStateId(null);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const ProjectManager: React.FC<ProjectManagerProps> = ({
  states,
  currentState,
  onSave,
  onLoad,
  onDelete,
  onDuplicate,
  onExport,
  onImport,
  hasUnsavedChanges,
}) => {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = (name: string) => {
    onSave(name, currentState?.id);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      e.target.value = ''; // Reset input
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button
          variant={hasUnsavedChanges ? "default" : "outline"}
          size="sm"
          onClick={() => setSaveDialogOpen(true)}
          className={hasUnsavedChanges ? "animate-pulse" : ""}
        >
          <Save className="h-4 w-4 mr-2" />
          {hasUnsavedChanges ? 'Salvar*' : 'Salvar'}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setLoadDialogOpen(true)}
        >
          <FolderOpen className="h-4 w-4 mr-2" />
          Carregar
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleImport}
        >
          <Upload className="h-4 w-4 mr-2" />
          Importar
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <SaveDialog
        isOpen={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        onSave={handleSave}
        currentState={currentState}
      />

      <LoadDialog
        isOpen={loadDialogOpen}
        onClose={() => setLoadDialogOpen(false)}
        states={states}
        onLoad={onLoad}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        onExport={onExport}
        currentState={currentState}
      />
    </>
  );
};
