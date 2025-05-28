// Rota /resultado/[id]
import ResultPageContent from '@/components/ResultPage';

interface ResultPageProps {
  params: {
    id: string;
  };
}

export default function ResultadoComIdPage({ params }: ResultPageProps) {
  return <ResultPageContent id={params.id} />;
}
