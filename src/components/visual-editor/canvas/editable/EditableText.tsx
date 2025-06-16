
import React, { useState, useRef, useEffect } from 'react';

interface EditableTextProps {
  content: {
    text?: string;
    size?: 'sm' | 'base' | 'lg' | 'xl';
    align?: 'left' | 'center' | 'right';
  };
  isSelected: boolean;
  isPreviewMode: boolean;
  onUpdate: (content: any) => void;
}

export const EditableText: React.FC<EditableTextProps> = ({
  content,
  isSelected,
  isPreviewMode,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content.text || 'Texto de exemplo');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    if (!isPreviewMode) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    onUpdate({ ...content, text });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setText(content.text || 'Texto de exemplo');
      setIsEditing(false);
    }
  };

  const getSizeClasses = () => {
    switch (content.size) {
      case 'sm': return 'text-sm';
      case 'base': return 'text-base';
      case 'lg': return 'text-lg';
      case 'xl': return 'text-xl';
      default: return 'text-base';
    }
  };

  const getAlignClasses = () => {
    switch (content.align) {
      case 'left': return 'text-left';
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  if (isEditing) {
    return (
      <div className="p-2">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
        />
      </div>
    );
  }

  return (
    <p
      className={`
        transition-all duration-200 leading-relaxed
        ${getSizeClasses()}
        ${getAlignClasses()}
        ${!isPreviewMode ? 'hover:bg-gray-100 cursor-pointer p-2 rounded' : ''}
        ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      `}
      onDoubleClick={handleDoubleClick}
    >
      {text}
    </p>
  );
};
