import { DragDropEditor } from '@/components/result-editor/DragDropEditor';
import { Suspense } from 'react';

interface EditQuizPageProps {
  params: { id: string };
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

export default function EditQuizPage({ params }: EditQuizPageProps) {
  const handleSave = async (config: any) => {
    try {
      // Salvar configuração no banco de dados
      const response = await fetch(`/api/quiz/${params.id}/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        console.log('Configuração salva com sucesso!');
        // Mostrar notificação de sucesso
      } else {
        console.error('Erro ao salvar configuração');
        // Mostrar notificação de erro
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingSpinner />}>
        <DragDropEditor 
          onSave={handleSave}
          initialBlocks={[]} // Carregar configuração existente do banco
        />
      </Suspense>
    </div>
  );
}
