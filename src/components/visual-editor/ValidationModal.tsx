import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

interface ValidationError {
  questionId?: string;
  questionTitle?: string;
  message: string;
  severity: 'error' | 'warning';
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

interface ValidationModalProps {
  validation: ValidationResult;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onFixError?: (error: ValidationError) => void;
}

export const ValidationModal: React.FC<ValidationModalProps> = ({
  validation,
  isOpen,
  onOpenChange,
  onFixError,
}) => {
  const parseError = (errorMessage: string): ValidationError => {
    const questionMatch = errorMessage.match(/Questão (\d+):\s*(.+)/);
    if (questionMatch) {
      return {
        questionId: questionMatch[1],
        questionTitle: `Questão ${questionMatch[1]}`,
        message: questionMatch[2],
        severity: 'error',
      };
    }
    
    return {
      message: errorMessage,
      severity: 'error',
    };
  };

  const errors = validation.errors.map(parseError);
  const warnings = validation.warnings?.map(warning => ({
    message: warning,
    severity: 'warning' as const,
  })) || [];

  const allIssues = [...errors, ...warnings];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {validation.isValid ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            Validação do Quiz
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Resumo */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Badge variant={validation.isValid ? "default" : "destructive"}>
                {validation.isValid ? "✓ Válido" : `${errors.length} Erro(s)`}
              </Badge>
              {warnings.length > 0 && (
                <Badge variant="secondary">
                  {warnings.length} Aviso(s)
                </Badge>
              )}
            </div>
            <div className="text-sm text-gray-600">
              {validation.isValid 
                ? "Seu quiz está pronto para ser publicado!"
                : "Corrija os erros abaixo antes de publicar."}
            </div>
          </div>

          {/* Lista de problemas */}
          {allIssues.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Problemas encontrados:</h3>
              <ScrollArea className="h-[300px] w-full border rounded-lg">
                <div className="p-4 space-y-3">
                  {allIssues.map((issue, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        issue.severity === 'error' 
                          ? 'bg-red-50 border-red-200' 
                          : 'bg-yellow-50 border-yellow-200'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {issue.severity === 'error' ? (
                          <X className="w-4 h-4 text-red-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        {issue.questionTitle && (
                          <p className="font-medium text-sm text-gray-900 mb-1">
                            {issue.questionTitle}
                          </p>
                        )}
                        <p className={`text-sm ${
                          issue.severity === 'error' ? 'text-red-700' : 'text-yellow-700'
                        }`}>
                          {issue.message}
                        </p>
                      </div>

                      {onFixError && issue.questionId && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onFixError(issue)}
                          className="flex-shrink-0"
                        >
                          Corrigir
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Dicas */}
          {!validation.isValid && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">💡 Dicas para correção:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Todas as questões devem ter título preenchido</li>
                <li>• Cada questão deve ter pelo menos 2 opções</li>
                <li>• Todas as opções devem ter texto preenchido</li>
                <li>• Verifique se não há campos em branco</li>
              </ul>
            </div>
          )}

          {/* Ações */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Fechar
            </Button>
            {!validation.isValid && (
              <Button
                onClick={() => {
                  // Aqui poderia implementar uma função para tentar corrigir automaticamente
                  console.log("Tentando corrigir automaticamente...");
                }}
              >
                Tentar Corrigir Automaticamente
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
