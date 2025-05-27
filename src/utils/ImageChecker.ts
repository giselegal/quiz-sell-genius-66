
export interface ImageDiagnostics {
  totalImages: number;
  blurryImages: number;
  missingImages: number;
  optimizedImages: number;
  issues: string[];
}

export class ImageChecker {
  static checkImageQuality(img: HTMLImageElement): boolean {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return false;
      
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Simple blur detection based on edge detection
      let edgeCount = 0;
      const threshold = 50;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Calculate luminance
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        
        // Check neighboring pixels for edges
        if (i > canvas.width * 4) {
          const prevR = data[i - canvas.width * 4];
          const prevG = data[i - canvas.width * 4 + 1];
          const prevB = data[i - canvas.width * 4 + 2];
          const prevLuminance = 0.299 * prevR + 0.587 * prevG + 0.114 * prevB;
          
          if (Math.abs(luminance - prevLuminance) > threshold) {
            edgeCount++;
          }
        }
      }
      
      // If edge count is below threshold, image might be blurry
      const edgeRatio = edgeCount / (canvas.width * canvas.height);
      return edgeRatio > 0.01; // Adjust threshold as needed
      
    } catch (error) {
      console.error('Error checking image quality:', error);
      return true; // Assume it's fine if we can't check
    }
  }

  static diagnoseImages(): ImageDiagnostics {
    const images = document.querySelectorAll('img');
    const diagnostics: ImageDiagnostics = {
      totalImages: images.length,
      blurryImages: 0,
      missingImages: 0,
      optimizedImages: 0,
      issues: []
    };

    images.forEach((img, index) => {
      if (!img.src || img.src === '') {
        diagnostics.missingImages++;
        diagnostics.issues.push(`Image ${index + 1}: Missing src attribute`);
        return;
      }

      if (img.complete && img.naturalHeight !== 0) {
        if (!this.checkImageQuality(img)) {
          diagnostics.blurryImages++;
          diagnostics.issues.push(`Image ${index + 1}: Potentially blurry (${img.src})`);
        } else {
          diagnostics.optimizedImages++;
        }
      }
    });

    return diagnostics;
  }
}
