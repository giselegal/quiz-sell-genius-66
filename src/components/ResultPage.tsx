import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Editable } from '@lovable/react';

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
        {user?.userName && (
          <div className="mb-6">
            <Editable id="result-greeting">
              <span className="text-xl lg:text-2xl font-bold"
                    style={{ background: tokens.gradients.primary, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                Parabéns, {user.userName}!
              </span>
            </Editable>
            <div className="w-12 h-px mx-auto mt-2" style={{ background: tokens.gradients.primary }}></div>
          </div>
        )}
        
        <div className="text-center">
          <Editable id="result-category">
            <span className="text-2xl lg:text-4xl font-bold" style={{ background: tokens.gradients.primary, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              {category}
            </span>
          </Editable>
        </div>
        
        <div className="mt-4 text-center">
          <span className="text-sm font-medium uppercase" style={{ color: tokens.colors.textMuted }}>Oferta Especial</span>
        </div>
        
        <div className="mt-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Preço Normal</span>
            <span className="text-lg font-bold" style={{ textDecoration: 'line-through', color: tokens.colors.textMuted }}>R$ 199,90</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Seu Preço</span>
            <span className="text-2xl font-bold" style={{ color: tokens.colors.primary }}>
              R$ 39,90
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Parcelas</span>
            <Editable id="offer-installments">
              <span className="text-2xl font-bold whitespace-nowrap" 
                    style={{ background: tokens.gradients.primary, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                5x R$ 8,83
              </span>
            </Editable>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Preço à Vista</span>
            <Editable id="offer-total-price">
              <span className="text-xs font-normal whitespace-nowrap" style={{ color: tokens.colors.textMuted }}>ou R$ 39,90 à vista</span>
            </Editable>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            onClick={handleCTAClick} 
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Editable id="cta-button-text">
              <span className="flex items-center justify-center gap-2">
                <ShoppingCart className="h-4 w-4" /> 
                Adquirir Agora
              </span>
            </Editable>
          </Button>
        </div>
      </div>
    </div>
  );
}
