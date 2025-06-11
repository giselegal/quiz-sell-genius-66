
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RealComponentVisualEditor } from '@/components/editor/visual/RealComponentVisualEditor';
import { TemplateList } from '@/components/editor/templates/TemplateList';
import { Button } from '@/components/ui/button';

export const EditorPage = () => {
  const [showTemplates, setShowTemplates] = useState(false);
  const { style } = useParams<{ style?: string }>();
  
  const styleCategory = (style as "Natural" | "Clássico" | "Contemporâneo" | "Elegante" | "Romântico" | "Sexy" | "Dramático" | "Criativo") || 'Natural';
  
  const selectedStyle = {
    category: styleCategory,
    score: 100,
    percentage: 100
  };
  
  const secondaryStyles = [
    {
      category: "Romântico" as any,
      score: 75,
      percentage: 60
    },
    {
      category: "Clássico" as any,
      score: 50,
      percentage: 40
    }
  ];
  
  return (
    <div className="h-screen">
      {showTemplates ? (
        <div className="p-8 max-w-4xl mx-auto">
          <Button
            onClick={() => setShowTemplates(false)}
            variant="outline"
            className="mb-4"
          >
            Voltar ao Editor
          </Button>
          <TemplateList onSelectTemplate={() => setShowTemplates(false)} />
        </div>
      ) : (
        <RealComponentVisualEditor 
          primaryStyle={selectedStyle} 
          secondaryStyles={secondaryStyles}
        />
      )}
    </div>
  );
};

export default EditorPage;
