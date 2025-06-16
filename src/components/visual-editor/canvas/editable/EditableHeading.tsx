
import React, { useState, useRef, useEffect } from 'react';

interface EditableHeadingProps {
  content: {
    text?: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
  };
  isSelected: boolean;
  isPreviewMode: boolean;
  onUpdate: (content: any) => void;
}

export const EditableHeading: React.FC<EditableHeadingProps> = ({
  content,
  isSelected,
  isPreviewMode,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content.text || 'Título');
  const inputRef = useRef<HTMLElement>(null);

  const level = content.level || 1;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Selecionar todo o texto
      const range = document.createRange();
      range.selectNodeContents(inputRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
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
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setText(content.text || 'Título');
      setIsEditing(false);
    }
  };

  const getHeadingClasses = () => {
    switch (level) {
      case 1: return 'text-3xl font-bold';
      case 2: return 'text-2xl font-bold';
      case 3: return 'text-xl font-semibold';
      case 4: return 'text-lg font-semibold';
      case 5: return 'text-base font-medium';
      case 6: return 'text-sm font-medium';
      default: return 'text-3xl font-bold';
    }
  };

  const commonProps = {
    ref: inputRef,
    className: `
      min-w-full text-center transition-all duration-200
      ${getHeadingClasses()}
      ${!isPreviewMode && !isEditing ? 'hover:bg-gray-100 cursor-pointer' : ''}
      ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      ${isEditing ? 'outline-none bg-white' : ''}
    `,
    contentEditable: isEditing,
    suppressContentEditableWarning: true,
    onDoubleClick: handleDoubleClick,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    onInput: (e: React.FormEvent<HTMLElement>) => setText(e.currentTarget.textContent || ''),
    children: text
  };

  // Renderizar o heading correto baseado no level
  switch (level) {
    case 1:
      return <h1 {...commonProps} />;
    case 2:
      return <h2 {...commonProps} />;
    case 3:
      return <h3 {...commonProps} />;
    case 4:
      return <h4 {...commonProps} />;
    case 5:
      return <h5 {...commonProps} />;
    case 6:
      return <h6 {...commonProps} />;
    default:
      return <h1 {...commonProps} />;
  }
};
