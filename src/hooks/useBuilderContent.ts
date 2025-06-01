// src/hooks/useBuilderContent.ts
import { useState, useEffect } from 'react';
import { builder } from '@builder.io/react';

interface UseBuilderContentOptions {
  model: string;
  userAttributes?: Record<string, any>;
  enableAbTesting?: boolean;
  fallbackToOriginal?: boolean;
}

export const useBuilderContent = ({
  model,
  userAttributes = {},
  enableAbTesting = true,
  fallbackToOriginal = true
}: UseBuilderContentOptions) => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBuilderVersion, setIsBuilderVersion] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar conteúdo do Builder.io
        const builderContent = await builder
          .get(model, {
            userAttributes,
            // Se A/B testing está habilitado, incluir configurações
            ...(enableAbTesting && {
              includeUnpublished: false,
              preview: false
            })
          })
          .toPromise();

        if (builderContent) {
          setContent(builderContent);
          setIsBuilderVersion(true);
        } else if (!fallbackToOriginal) {
          setError('Conteúdo não encontrado no Builder.io');
        }
      } catch (err) {
        console.warn('Erro ao buscar conteúdo do Builder.io:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        
        // Se fallback está habilitado, não considera erro
        if (fallbackToOriginal) {
          setError(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [model, userAttributes, enableAbTesting, fallbackToOriginal]);

  return {
    content,
    loading,
    error,
    isBuilderVersion,
    // Função para forçar recarga do conteúdo
    refetch: () => {
      setLoading(true);
      // Re-executar o useEffect
    }
  };
};
