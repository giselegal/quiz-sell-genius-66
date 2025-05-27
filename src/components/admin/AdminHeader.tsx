import Link from 'next/link';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  showBackButton?: boolean;
  backTo?: string;
}
export function AdminHeader({ 
  title, 
  showBackButton = true, 
  backTo = '/admin' 
}: AdminHeaderProps) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background p-4">
      <div className="flex items-center gap-2">
        {showBackButton && (
          <Button variant="ghost" size="icon" asChild>
            <Link href={backTo}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Voltar</span>
            </Link>
          </Button>
        )}
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin">Painel</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/">Ver Site</Link>
        </Button>
      </div>
    </div>
  );
}
