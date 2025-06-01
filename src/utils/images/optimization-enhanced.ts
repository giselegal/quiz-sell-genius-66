
import { ImageSettings, ImageOptimizationOptions } from './types';
import { getOptimizedImageUrl } from './optimization';

const DEFAULT_SETTINGS: ImageSettings = {
  quality: 80,
  format: 'auto' as const,
  responsive: false,
  sizes: [400, 800, 1200],
  lazy: true
};

export const enhancedOptimizeImage = (
  url: string, 
  options: ImageOptimizationOptions = {}
): string => {
  const settings = { ...DEFAULT_SETTINGS, ...options };
  return getOptimizedImageUrl(url, settings.quality, settings.format);
};

export const generateResponsiveSources = (
  url: string,
  sizes: number[] = [400, 800, 1200]
): string => {
  return sizes
    .map(size => `${getOptimizedImageUrl(url, 80, 'auto')} ${size}w`)
    .join(', ');
};
