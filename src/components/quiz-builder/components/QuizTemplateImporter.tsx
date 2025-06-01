import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface QuizTemplate {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  questions: any[];
}

interface QuizTemplateImporterProps {
  onImportTemplate: (template: QuizTemplate) => void;
  isOpen: boolean;
  onClose: () => void;
}

const QuizTemplateImporter: React.FC<QuizTemplateImporterProps> = ({
  onImportTemplate,
  isOpen,
  onClose
}) => {
  const [templates, setTemplates] = useState<QuizTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [importingTemplate, setImportingTemplate] = useState<string | null>(null);

  useEffect(() => {
    const loadTemplates = async () => {
      setIsLoading(true);
      // Mock templates for now
      const mockTemplates: QuizTemplate[] = [
        {
          id: '1',
          name: 'Template 1',
          description: 'Descrição do Template 1',
          imageUrl: 'https://via.placeholder.com/150',
          questions: [{ id: 'q1', text: 'Pergunta 1' }, { id: 'q2', text: 'Pergunta 2' }]
        },
        {
          id: '2',
          name: 'Template 2',
          description: 'Descrição do Template 2',
          imageUrl: 'https://via.placeholder.com/150',
          questions: [{ id: 'q3', text: 'Pergunta 3' }, { id: 'q4', text: 'Pergunta 4' }]
        },
        {
          id: '3',
          name: 'Template 3',
          description: 'Descrição do Template 3',
          imageUrl: 'https://via.placeholder.com/150',
          questions: [{ id: 'q5', text: 'Pergunta 5' }, { id: 'q6', text: 'Pergunta 6' }]
        }
      ];
      setTemplates(mockTemplates);
      setIsLoading(false);
    };

    loadTemplates();
  }, []);

  const handleImportTemplate = async (template: QuizTemplate) => {
    setImportingTemplate(template.id);
    // Simulate import process
    await new Promise(resolve => setTimeout(resolve, 1000));
    onImportTemplate(template);
    setImportingTemplate(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Importar Template de Quiz</DialogTitle>
          <DialogDescription>
            Selecione um template para importar para o seu quiz.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-w-16 aspect-h-9 mb-2">
                  <img
                    src={template.imageUrl}
                    alt={template.name}
                    className="object-cover rounded-md"
                  />
                </div>
                <h3 className="text-lg font-semibold">{template.name}</h3>
                <p className="text-sm text-gray-500">{template.description}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <LoadingSpinner 
                      size="sm"
                      className={importingTemplate === template.id ? '' : 'hidden'}
                    />
                    <span className="text-sm text-gray-600">
                      {template.questions.length} perguntas
                    </span>
                  </div>
                  
                  <Button
                    size="sm"
                    onClick={() => handleImportTemplate(template)}
                    disabled={importingTemplate === template.id}
                  >
                    {importingTemplate === template.id ? 'Importando...' : 'Importar'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
        
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2">
            <LoadingSpinner 
              size="sm"
              className={isLoading ? '' : 'hidden'}
            />
            <span className="text-sm text-gray-500">
              {isLoading ? 'Carregando templates...' : `${templates.length} templates disponíveis`}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizTemplateImporter;
