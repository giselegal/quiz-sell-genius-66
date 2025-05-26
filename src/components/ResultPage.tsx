"use client";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ResultPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);
  
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
  }, [params]);
  
  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Carregando seu resultado...</div>;
  }

  const handleCTAClick = () => {
    // Lógica do CTA
    console.log('CTA clicado');
  };
  
  return (
    <div className="container mx-auto min-h-screen p-6">
      <h1 className="mb-8 text-center text-3xl font-bold">{result?.title}</h1>
      
      <div className="mx-auto max-w-3xl rounded-lg border bg-card p-8 shadow-lg">
        <p className="mb-6 text-lg">{result?.description}</p>
        
        <div className="mb-6">
          <span className="text-xl lg:text-2xl font-bold text-primary">
            Parabéns!
          </span>
          <div className="w-12 h-px mx-auto mt-2 bg-primary"></div>
        </div>
        
        <div className="text-center">
          <span className="text-2xl lg:text-4xl font-bold text-primary">
            Seu Estilo Ideal
          </span>
        </div>
        
        <div className="mt-4 text-center">
          <span className="text-sm font-medium uppercase text-muted-foreground">Oferta Especial</span>
        </div>
        
        <div className="mt-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Preço Normal</span>
            <span className="text-lg font-bold line-through text-muted-foreground">R$ 199,90</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Seu Preço</span>
            <span className="text-2xl font-bold text-primary">
              R$ 39,90
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Parcelas</span>
            <span className="text-2xl font-bold text-primary">
              5x R$ 8,83
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Preço à Vista</span>
            <span className="text-xs font-normal text-muted-foreground">ou R$ 39,90 à vista</span>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            onClick={handleCTAClick} 
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <span className="flex items-center justify-center gap-2">
              Adquirir Agora
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
