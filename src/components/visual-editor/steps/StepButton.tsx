
import React, { useState } from 'react';
import { Grip, EllipsisVertical, Plus } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface StepButtonProps {
  id: string;
  title: string;
  isActive: boolean;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export const StepButton: React.FC<StepButtonProps> = ({
  id,
  title,
  isActive,
  onSelect,
  onEdit,
  onDelete,
  onDuplicate
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      className="group border-r md:border-y md:border-r-0 min-w-[10rem] -mt-[1px] flex pl-2 relative items-center cursor-pointer"
      onClick={() => onSelect(id)}
    >
      {/* Active indicator */}
      <div 
        className={`absolute bottom-0 z-[5] left-0 w-full md:w-0 md:h-full border md:border-2 ${
          isActive ? 'border-blue-600' : 'border-transparent'
        }`}
      />
      
      {/* Drag handle */}
      <span>
        <Grip className="w-4 h-4 text-zinc-100" />
      </span>
      
      {/* Step title */}
      <div className="w-full relative z-[5]">
        <span className="block h-[3rem] w-full cursor-pointer bg-transparent p-3 placeholder:italic text-zinc-100">
          {title}
        </span>
      </div>
      
      {/* Context menu */}
      {isActive && (
        <DropdownMenu open={showMenu} onOpenChange={setShowMenu}>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical className="mr-2 w-4 h-4 cursor-pointer text-zinc-100" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-800 border-zinc-700">
            <DropdownMenuItem 
              onClick={(e) => {
                e.stopPropagation();
                onEdit(id);
              }}
              className="text-zinc-100 hover:bg-zinc-700"
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate(id);
              }}
              className="text-zinc-100 hover:bg-zinc-700"
            >
              Duplicar
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              className="text-zinc-100 hover:bg-zinc-700 text-red-400"
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
