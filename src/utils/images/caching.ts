
import { ImageMetadata, ImageCacheEntry } from './types';

// Singleton cache for images
const imageCache = new Map<string, ImageCacheEntry>();

/**
 * Inicializa o cache de imagens
 */
export const initializeImageCache = (): void => {
  if (imageCache.size === 0) {
    console.log('[Image Cache] Initialized');
  }
};

/**
 * Verifica se uma imagem existe no cache com o status especificado
 * @param url URL da imagem
 * @param status Status de carregamento
 * @returns Booleano indicando se a imagem existe no cache com o status
 */
export const hasImageWithStatus = (url: string, status: 'loading' | 'loaded' | 'error'): boolean => {
  if (!url) return false;
  
  const cacheEntry = imageCache.get(url);
  return cacheEntry !== undefined && cacheEntry.loadStatus === status;
};

/**
 * Obtém metadados de uma imagem
 * @param url URL da imagem
 * @returns Metadados ou undefined se não encontrado
 */
export const getImageMetadata = (url: string): ImageMetadata | undefined => {
  const cacheEntry = imageCache.get(url);
  return cacheEntry?.metadata;
};

/**
 * Atualiza o cache de imagens
 * @param url URL da imagem
 * @param entry Nova entrada de cache ou propriedades parciais
 */
export const updateImageCache = (url: string, entry: Partial<ImageCacheEntry>): void => {
  if (!url) return;
  
  const now = Date.now();
  const existing = imageCache.get(url);
  
  if (existing) {
    // Atualiza a entrada existente
    imageCache.set(url, {
      ...existing,
      ...entry,
      lastAccessed: now,
    });
  } else {
    // Cria uma nova entrada
    imageCache.set(url, {
      url,
      loadStatus: 'idle',
      lastAccessed: now,
      ...entry,
    });
  }
};

/**
 * Limpa imagens antigas do cache
 * @param olderThanMs Tempo em ms para considerar imagens antigas
 * @param preserveStatuses Estatutos de carregamento que devem ser preservados
 */
export const cleanImageCache = (
  olderThanMs = 60 * 60 * 1000, // 1 hora
  preserveStatuses: Array<'loading' | 'loaded' | 'error'> = ['loaded']
): void => {
  const now = Date.now();
  let removed = 0;
  
  imageCache.forEach((entry, url) => {
    if (
      now - entry.lastAccessed > olderThanMs &&
      !preserveStatuses.includes(entry.loadStatus as 'loading' | 'loaded' | 'error')
    ) {
      imageCache.delete(url);
      removed++;
    }
  });
  
  if (removed > 0) {
    console.log(`[Image Cache] Removed ${removed} stale entries. Current size: ${imageCache.size}`);
  }
};
