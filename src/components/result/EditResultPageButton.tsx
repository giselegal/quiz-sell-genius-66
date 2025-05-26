"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Edit } from 'lucide-react';

interface EditResultPageButtonProps {
  className?: string;
}
export const EditResultPageButton: React.FC<EditResultPageButtonProps> = ({ className }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/resultado/editor');
  };
  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className={className}
      title="Editar página de resultados"
    >
      <Edit className="h-4 w-4 mr-2" />
      Editar Página
    </Button>
  );
};
export default EditResultPageButton;
