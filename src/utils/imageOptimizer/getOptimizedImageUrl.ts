
/**
 * Function to get an optimized image URL
 * 
 * @param originalUrl - The original image URL
 * @param options - Optimization options
 * @returns Optimized image URL
 */
const getOptimizedImageUrl = (
  originalUrl: string, 
  options: { 
    width?: number; 
    height?: number; 
    quality?: number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  } = {}
): string => {
  // If no image URL provided, return empty string
  if (!originalUrl) return '';
  
  // Default options
  const width = options.width || 800;
  const height = options.height || 0;
  const quality = options.quality || 85;
  const format = options.format || 'auto';
  
  // For Cloudinary URLs
  if (originalUrl.includes('cloudinary.com')) {
    // Extract base URL and transformation string (if any)
    const baseUrlParts = originalUrl.split('/upload/');
    if (baseUrlParts.length < 2) return originalUrl;
    
    // Create transformation string
    let transformations = 'f_auto,q_' + quality;
    if (width > 0) transformations += ',w_' + width;
    if (height > 0) transformations += ',h_' + height;
    
    // Return optimized cloudinary URL
    return `${baseUrlParts[0]}/upload/${transformations}/${baseUrlParts[1]}`;
  } 
  // For local images
  else if (originalUrl.startsWith('/')) {
    // Simple parameter approach for local images
    // In a real implementation, this would connect to a server-side image processing API
    return `${originalUrl}?w=${width}&q=${quality}${height ? `&h=${height}` : ''}`;
  }
  
  // For other URLs (fallback)
  return originalUrl;
};

export default getOptimizedImageUrl;
