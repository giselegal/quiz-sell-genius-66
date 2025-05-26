
import React from 'react';
import Link from 'next/link';
import { Button } from './button';
import { Edit } from 'lucide-react';

const EditorButton: React.FC = () => {
  return (
    <Link href="/admin/editor?tab=result">
      <Button className="">
        <Edit className="w-5 h-5 mr-2" />
        Editor de Página de Resultados
      </Button>
    </Link>
  );
};

export default EditorButton;
