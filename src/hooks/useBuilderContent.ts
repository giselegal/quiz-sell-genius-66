// src/hooks/useBuilderContent.ts
import { useState, useEffect } from 'react';
import { builder } from '@builder.io/react';
import { BUILDER_CONFIG } from '../config/builderConfig.js';

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

        // Verificar se estamos no modo offline
        if (BUILDER_CONFIG.isOfflineMode()) {
          console.log('🔧 Modo offline ativo - usando conteúdo de fallback');
          const offlineContent = BUILDER_CONFIG.OFFLINE_CONTENT[model];
          if (offlineContent) {
            setContent(offlineContent);
            setIsBuilderVersion(false);
          }
          return;
        }

        // Log do modo atual
        console.log(`🔧 Builder.io Mode: ${BUILDER_CONFIG.CURRENT_MODE} para modelo: ${model}`);

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
          console.log(`✅ Conteúdo Builder.io carregado para: ${model}`);
        } else if (!fallbackToOriginal) {
          setError('Conteúdo não encontrado no Builder.io');
        } else {
          console.log(`📄 Usando página original para: ${model} (sem conteúdo Builder.io)`);
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
