
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MainContentEditorProps {
  config: {
    mainContent: {
      description?: string;
      customImage?: string;
    };
  };
  onUpdate: (section: string, content: any) => void;
}

const MainContentEditor: React.FC<MainContentEditorProps> = ({ config, onUpdate }) => {
  const handleDescriptionChange = (value: string) => {
    onUpdate('mainContent', {
      ...config.mainContent,
      description: value
    });
  };

  const handleImageChange = (value: string) => {
    onUpdate('mainContent', {
      ...config.mainContent,
      customImage: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conteúdo Principal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Descrição do Estilo</Label>
          <Textarea
            id="description"
            value={config.mainContent.description || ''}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="Descrição personalizada para o estilo predominante"
            rows={5}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="customImage">URL da Imagem Personalizada</Label>
          <Input
            id="customImage"
            value={config.mainContent.customImage || ''}
            onChange={(e) => handleImageChange(e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
          />
          
          {config.mainContent.customImage && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Pré-visualização:</p>
              <div className="p-2 bg-gray-50 rounded">
                <img 
                  src={config.mainContent.customImage} 
                  alt="Imagem do estilo" 
                  className="h-40 object-contain mx-auto" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/400x300?text=Imagem+Inválida';
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MainContentEditor;
