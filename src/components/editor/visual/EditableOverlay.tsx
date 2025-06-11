
import React from 'react';
import { Edit3, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditableOverlayProps {
  isSelected: boolean;
  onSelect: () => void;
  sectionName: string;
}

export const EditableOverlay: React.FC<EditableOverlayProps> = ({
  isSelected,
  onSelect,
  sectionName
}) => {
  return (
    <div
      className={`absolute inset-0 z-10 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'ring-2 ring-blue-500 bg-blue-500/5' 
          : 'hover:ring-2 hover:ring-blue-300 hover:bg-blue-300/5'
      }`}
      onClick={onSelect}
    >
      {/* Section Label */}
      <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium transition-all ${
        isSelected 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-800 text-white opacity-0 group-hover:opacity-100'
      }`}>
        {sectionName}
      </div>
      
      {/* Edit Button */}
      {isSelected && (
        <div className="absolute top-2 right-2">
          <Button size="sm" variant="outline" className="bg-white">
            <Edit3 className="w-3 h-3 mr-1" />
            Editar
          </Button>
        </div>
      )}
    </div>
  );
};
