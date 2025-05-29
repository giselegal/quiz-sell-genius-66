
'use client';

import React from 'react';
import { DragDropEditor } from '@/components/result-editor/DragDropEditor';

export default function QuizzesDashboardPage() {
  const handleSave = (config: any) => {
    console.log('Configuração salva:', config);
    // Implementar lógica real de salvamento aqui
  };

  return (
    <div className="h-screen">
      <DragDropEditor onSave={handleSave} />
    </div>
  );
}
