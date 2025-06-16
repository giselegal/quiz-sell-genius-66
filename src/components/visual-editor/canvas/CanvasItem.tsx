
import React from 'react';
import { ElementRenderer } from './ElementRenderer';

interface CanvasItemProps {
  id: string;
  type: string;
  content: any;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  children?: React.ReactNode;
}

export const CanvasItem: React.FC<CanvasItemProps> = ({
  id,
  type,
  content,
  isSelected,
  isPreviewMode,
  onSelect,
  children
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-disabled="false"
      className="group/canvas-item max-w-full canvas-item min-h-[1.25rem] relative self-auto mr-auto"
      style={{ 
        transform: 'translate3d(0px, 0px, 0px) scaleX(1) scaleY(1)', 
        flexBasis: '100%' 
      }}
      onClick={!isPreviewMode ? onSelect : undefined}
    >
      <div
        id={id}
        className={`
          min-h-[1.25rem] min-w-full relative self-auto box-border customizable-gap
          ${!isPreviewMode ? 'group-hover/canvas-item:border-2 border-dashed hover:border-2' : ''}
          ${isSelected && !isPreviewMode ? 'border-2 border-blue-500' : 'border-blue-500'}
          rounded-md
        `}
        style={{ opacity: 1, willChange: 'transform' }}
      >
        {children || <ElementRenderer type={type} content={content} />}
      </div>
    </div>
  );
};
