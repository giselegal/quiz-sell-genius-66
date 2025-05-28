
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
}

interface TemplateListProps {
  onSelectTemplate: (templateId: string) => void;
}

export const TemplateList: React.FC<TemplateListProps> = ({ onSelectTemplate }) => {
  const [templates, setTemplates] = React.useState<Template[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadTemplates = async () => {
      try {
        // Simulated template data
        const mockTemplates: Template[] = [
          {
            id: 'modern',
            name: 'Moderno',
            description: 'Design moderno e clean',
            preview: '/templates/modern.jpg'
          },
          {
            id: 'classic',
            name: 'Clássico',
            description: 'Design tradicional e elegante',
            preview: '/templates/classic.jpg'
          }
        ];
        
        setTemplates(mockTemplates);
      } catch (error) {
        console.error('Erro ao carregar templates:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Carregando templates...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {templates.map((template) => (
        <Card key={template.id} className="p-4">
          <div className="space-y-2">
            <h3 className="font-medium">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
            <Button
              onClick={() => onSelectTemplate(template.id)}
              className="w-full"
            >
              Usar Template
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
