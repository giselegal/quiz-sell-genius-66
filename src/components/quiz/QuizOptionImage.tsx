
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { AspectRatio } from '../ui/aspect-ratio';
import { getFallbackStyle } from '@/utils/styleUtils';
import { isImagePreloaded, getOptimizedImage, getImageMetadata } from '@/utils/imageManager';
import OptimizedImage from '../ui/OptimizedImage';

interface QuizOptionImageProps {
  imageUrl: string;
  altText: string;
  styleCategory: string;
  isSelected: boolean;
  is3DQuestion: boolean;
  questionId: string;
}

export const QuizOptionImage: React.FC<QuizOptionImageProps> = ({
  imageUrl,
  altText,
  styleCategory,
  isSelected,
  is3DQuestion,
  questionId
}) => {
  const isMobile = useIsMobile();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Get image metadata from our bank if available
  const imageMetadata = useMemo(() => 
    getImageMetadata(imageUrl),
    [imageUrl]
  );
  
  // Use memoization to avoid recalculating the URL on each render
  const optimizedImageUrl = useMemo(() => 
    getOptimizedImage(imageUrl, {
      quality: 95,
      format: 'auto',
      width: imageUrl.includes('sapatos') ? 400 : 500
    }),
    [imageUrl]
  );
  
  // Check if image is already preloaded on mount
  useEffect(() => {
    if (isImagePreloaded(imageUrl)) {
      setImageLoaded(true);
    }
  }, [imageUrl]);

  if (imageError) {
    return (
      <div className="w-full h-full" style={getFallbackStyle(styleCategory)}>
        <span>{styleCategory}</span>
      </div>
    );
  }

  return (
    <div className={cn(
      "w-full relative flex-grow overflow-hidden",
      "md:mx-auto", // Center on desktop
      !isMobile && "md:max-w-[65%]" // Aumentado de 40% para 65% para imagens maiores
    )}>
      <AspectRatio 
        ratio={imageUrl.includes('sapatos') ? 1 : 3/4} 
        className="w-full h-full"
      >
        <div className={cn(
          "w-full h-full flex items-center justify-center overflow-hidden transform-gpu",
          // Efeito de seleção mais suave
          isSelected && "scale-[1.01] transition-all duration-500 ease-out"
        )}>
          {/* Use OptimizedImage component sem sombras */}
          <OptimizedImage 
            src={optimizedImageUrl}
            alt={imageMetadata?.alt || altText}
            className={cn(
              "object-cover w-full h-full transition-all duration-500 ease-out",
              // Removido todas as sombras
              // Enhanced 3D effect mais sutil
              isSelected && is3DQuestion && "transform-3d rotate-y-6"
            )}
            onLoad={() => setImageLoaded(true)}
            priority={true}
          />
        </div>
      </AspectRatio>
    </div>
  );
};
