
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, Upload } from 'lucide-react';
import { QuizBuilderState } from '@/types/quizBuilder';

interface QuizTemplateImporterProps {
  isOpen: boolean;
  onClose: () => void;
  onImportTemplate: (template: QuizBuilderState) => void;
}

// Mock templates for demonstration
const templates = [
  {
    id: '1',
    name: 'Quiz de Estilo Pessoal',
    description: 'Template completo para quiz de descoberta de estilo',
    thumbnail: 'https://placehold.co/300x200',
    stages: [],
    components: []
  },
  {
    id: '2', 
    name: 'Quiz de Personalidade',
    description: 'Template para quiz de personalidade',
    thumbnail: 'https://placehold.co/300x200',
    stages: [],
    components: []
  }
];

const QuizTemplateImporter: React.FC<QuizTemplateImporterProps> = ({
  isOpen,
  onClose,
  onImportTemplate
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
  };

  const handleConfirmSelection = () => {
    const selectedTemplate = templates.find(template => template.id === selectedTemplateId);
    if (selectedTemplate) {
      const builderState: QuizBuilderState = {
        stages: selectedTemplate.stages,
        components: selectedTemplate.components
      };
      onImportTemplate(builderState);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Importar Template de Quiz</DialogTitle>
          <DialogDescription>
            Selecione um template pré-definido para começar seu quiz rapidamente.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-grow pr-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
            {templates.map((template) => (
              <Card 
                key={template.id} 
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplateId === template.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleSelectTemplate(template.id)}
              >
                <div className="relative">
                  {selectedTemplateId === template.id && (
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                  <img 
                    src={template.thumbnail} 
                    alt={template.name} 
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                </div>
                <h3 className="font-medium text-lg">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </Card>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex justify-end gap-2 mt-4 pt-2 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirmSelection} 
            disabled={!selectedTemplateId}
          >
            <Upload className="w-4 h-4 mr-2" />
            Importar Template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizTemplateImporter;
