
/**
 * Function to get a low quality image placeholder URL
 * 
 * @param originalUrl - The original image URL
 * @returns Low quality placeholder image URL
 */
const getLowQualityPlaceholder = (originalUrl: string): string => {
  // If no image URL provided, return empty string
  if (!originalUrl) return '';
  
  // For Cloudinary URLs
  if (originalUrl.includes('cloudinary.com')) {
    // Extract base URL and transformation string (if any)
    const baseUrlParts = originalUrl.split('/upload/');
    if (baseUrlParts.length < 2) return originalUrl;
    
    // Create transformation string for tiny placeholder
    // Very low quality (q_10), small width (w_20), blur effect (e_blur:500)
    const transformations = 'f_auto,q_20,w_60,e_blur:200';
    
    // Return low quality placeholder URL
    return `${baseUrlParts[0]}/upload/${transformations}/${baseUrlParts[1]}`;
  } 
  // For local images
  else if (originalUrl.startsWith('/')) {
    // Simple parameter approach for local images
    return `${originalUrl}?w=60&q=20&blur=200`;
  }
  
  // For other URLs (fallback)
  return originalUrl;
};

export default getLowQualityPlaceholder;
