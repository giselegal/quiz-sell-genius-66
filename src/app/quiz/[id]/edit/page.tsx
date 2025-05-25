import { DragDropEditor } from '@/components/result-editor/DragDropEditor';

export default function EditQuizPage({ params }: { params: { id: string } }) {
  const handleSave = (config: any) => {
    // Salvar no banco de dados
    console.log('Salvando configuração:', config);
  };

  return (
    <div className="min-h-screen">
      <DragDropEditor 
        onSave={handleSave}
        initialBlocks={[]} // Carregar do banco
      />
    </div>
  );
}
