
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComponentItemProps {
  type: string;
  label: string;
  icon: LucideIcon;
  description: string;
  onSelect: (componentType: string) => void;
}

export const ComponentItem: React.FC<ComponentItemProps> = ({
  type,
  label,
  icon: Icon,
  description,
  onSelect
}) => {
  return (
    <Button
      variant="ghost"
      className="h-auto p-3 flex flex-col items-center gap-2 hover:bg-gray-100 border border-transparent hover:border-gray-200 rounded-lg"
      onClick={() => onSelect(type)}
    >
      <Icon className="w-6 h-6 text-gray-600" />
      <div className="text-center">
        <div className="text-xs font-medium text-gray-900">{label}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </Button>
  );
};
