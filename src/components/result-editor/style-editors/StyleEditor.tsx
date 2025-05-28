
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StyleEditorProps {
  globalStyles: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
    backgroundColor?: string;
  };
  onUpdate: (styles: any) => void;
}

const StyleEditor: React.FC<StyleEditorProps> = ({ globalStyles, onUpdate }) => {
  const handleStyleChange = (key: string, value: string) => {
    onUpdate({
      ...globalStyles,
      [key]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estilos Globais</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="colors">Cores</TabsTrigger>
            <TabsTrigger value="typography">Tipografia</TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Cor Primária</Label>
              <Input
                id="primaryColor"
                type="color"
                value={globalStyles.primaryColor || '#B89B7A'}
                onChange={(e) => handleStyleChange('primaryColor', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Cor Secundária</Label>
              <Input
                id="secondaryColor"
                type="color"
                value={globalStyles.secondaryColor || '#aa6b5d'}
                onChange={(e) => handleStyleChange('secondaryColor', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Cor de Fundo</Label>
              <Input
                id="backgroundColor"
                type="color"
                value={globalStyles.backgroundColor || '#ffffff'}
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="typography" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fontFamily">Família da Fonte</Label>
              <Input
                id="fontFamily"
                value={globalStyles.fontFamily || 'Inter, sans-serif'}
                onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
                placeholder="Inter, sans-serif"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StyleEditor;
