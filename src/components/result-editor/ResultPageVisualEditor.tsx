
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ResultPageVisualEditorProps {
  selectedStyle: StyleResult;
  onShowTemplates: () => void;
  initialConfig: any;
}

const ResultPageVisualEditor: React.FC<ResultPageVisualEditorProps> = ({
  selectedStyle,
  onShowTemplates,
  initialConfig
}) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Editor Visual (Legado)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Este editor foi substituído pelo Editor Unificado.
            Acesse /result-page-editor para o novo editor.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultPageVisualEditor;
