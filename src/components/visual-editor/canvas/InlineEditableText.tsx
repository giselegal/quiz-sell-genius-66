
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface InlineEditableTextProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  multiline?: boolean;
  disabled?: boolean;
}

export const InlineEditableText: React.FC<InlineEditableTextProps> = ({
  value,
  onChange,
  placeholder = "Clique para editar...",
  className,
  multiline = false,
  disabled = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Move cursor to end
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  const handleClick = () => {
    if (!disabled) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    onChange(editValue);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "w-full min-h-[2.5rem] resize-none border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500",
            className
          )}
          rows={Math.max(2, editValue.split('\n').length)}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "w-full border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500",
          className
        )}
      />
    );
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        "cursor-text min-h-[1.5rem] px-2 py-1 rounded hover:bg-gray-50 border border-transparent hover:border-gray-200",
        !value && "text-gray-400",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      {value || placeholder}
    </div>
  );
};
