
import React from 'react';
import { cn } from '@/lib/utils';

interface ImageComponentProps {
  data: {
    imageUrl?: string;
    alt?: string;
    caption?: string;
    [key: string]: any;
  };
  style?: {
    backgroundColor?: string;
    textColor?: string;
    [key: string]: any;
  };
  isSelected?: boolean;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ data, style, isSelected }) => {
  return (
    <div 
      className={cn(
        "p-4 text-center",
        isSelected && "outline-dashed outline-1 outline-blue-400"
      )}
      style={{
        backgroundColor: style?.backgroundColor || 'transparent',
        color: style?.textColor || 'inherit'
      }}
    >
      <div className="relative">
        {data.imageUrl ? (
          <img 
            src={data.imageUrl} 
            alt={data.alt || 'Imagem do quiz'} 
            className="max-w-full mx-auto rounded-md"
          />
        ) : (
          <div className="bg-gray-200 text-gray-500 flex items-center justify-center h-40 rounded-md">
            <p>Imagem não disponível</p>
          </div>
        )}
      </div>
      {data.caption && (
        <p className="text-sm mt-2 opacity-75">{data.caption}</p>
      )}
    </div>
  );
};

export default ImageComponent;
