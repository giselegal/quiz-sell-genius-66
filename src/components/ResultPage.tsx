import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  
  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setResult({
        title: 'Seu Resultado Personalizado',
        description: 'Com base nas suas respostas, preparamos este resultado especial para você.',
        // Outros dados do resultado
      });
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Carregando seu resultado...</div>;
  }
  
  return (
    <div className="container mx-auto min-h-screen p-6">
      <h1 className="mb-8 text-center text-3xl font-bold">{result.title}</h1>
      
      <div className="mx-auto max-w-3xl rounded-lg border bg-card p-8 shadow-lg">
        <p className="mb-6 text-lg">{result.description}</p>
        
        {/* Conteúdo da página de resultados */}
        
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}
