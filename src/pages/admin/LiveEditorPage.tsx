
import React from 'react';
import { UnifiedVisualEditor } from '@/components/unified-editor/UnifiedVisualEditor';
import { StyleResult } from '@/types/quiz';

const LiveEditorPage: React.FC = () => {
  // Default style for demo purposes
  const defaultStyle: StyleResult = {
    category: 'Elegante',
    score: 85,
    percentage: 85
  };

  return (
    <div className="h-screen w-full">
      <UnifiedVisualEditor 
        primaryStyle={defaultStyle} 
        initialActiveTab="result"
      />
    </div>
  );
};

export default LiveEditorPage;
