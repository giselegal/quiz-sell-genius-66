
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
interface ComponentItemProps {
  type: string;
  label: string;
  icon: LucideIcon;
  description: string;
  onSelect: (type: string) => void;
}
export function ComponentItem({
  type,
  label,
  icon: Icon,
  description,
  onSelect
}: ComponentItemProps) {
  return (
    <Button
      variant="outline"
      className="flex flex-col h-auto py-3 px-2 items-center justify-center text-center hover:bg-[#B89B7A]/10 hover:border-[#B89B7A] w-full"
      onClick={() => onSelect(type)}
    >
      <div className="mb-1.5 text-[#B89B7A]">
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-xs font-medium mb-1">{label}</span>
      <p className="text-[10px] text-gray-500 leading-tight">{description}</p>
    </Button>
  );
