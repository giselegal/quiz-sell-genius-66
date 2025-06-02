
import { ImageSettings, ImageOptimizationOptions } from './types';
import { optimizeCloudinaryUrl } from './optimization';

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
  return optimizeCloudinaryUrl(url, {
    quality: settings.quality,
    format: settings.format,
    width: settings.width,
    height: settings.height
  });
};

export const generateResponsiveSources = (
  url: string,
  sizes: number[] = [400, 800, 1200]
): string => {
  return sizes
    .map(size => `${optimizeCloudinaryUrl(url, { quality: 80, format: 'auto', width: size })} ${size}w`)
    .join(', ');
};
