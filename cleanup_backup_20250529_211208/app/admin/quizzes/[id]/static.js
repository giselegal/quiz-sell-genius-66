// Este arquivo contém configurações para geração estática
// para a rota /admin/quizzes/[id]

export function generateStaticParams() {
  // Gerando parâmetros para IDs de 1 a 20
  return Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export const dynamic = 'force-static';
