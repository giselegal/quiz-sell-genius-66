// Este arquivo contém configurações para geração estática
// para a rota /resultado/[id]

export function generateStaticParams() {
  // Gerando parâmetros para IDs de 1 a 20 (ou quantos resultados você tiver)
  return Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export const dynamic = 'force-static';
