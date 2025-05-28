
import React from 'react';
import { Button } from '@/components/ui/button';
import { Block } from '@/types/editor';

interface ComponentItemProps {
  type: Block['type'];
  name: string;
  description: string;
  icon: React.ReactNode;
  onSelect: (type: Block['type']) => void;
}

export function ComponentItem({ type, name, description, icon, onSelect }: ComponentItemProps) {
  return (
    <Button
      variant="outline"
      className="flex flex-col h-auto py-3 px-2 items-center justify-center text-center hover:bg-[#B89B7A]/10 hover:border-[#B89B7A]"
      onClick={() => onSelect(type)}
    >
      <div className="mb-1.5 text-[#B89B7A]">{icon}</div>
      <span className="text-xs font-medium mb-1">{name}</span>
      <p className="text-[10px] text-gray-500 leading-tight">{description}</p>
    </Button>
  );
}
