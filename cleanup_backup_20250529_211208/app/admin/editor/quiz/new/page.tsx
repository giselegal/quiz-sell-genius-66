'use client';

import { DragDropEditor } from '@/components/result-editor/DragDropEditor';
export default function NewQuizEditor() {
  const handleSave = (config: any) => {
    console.log('Salvando configuração do quiz:', config);
    // Implementar salvamento da configuração
  };
  return (
    <div className="h-screen -m-6">
      <DragDropEditor
        mode="quiz"
        onSave={handleSave}
        quizId="new"
      />
    </div>
  );
}
