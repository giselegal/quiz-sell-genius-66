
import React from 'react';
import { useSecureAuth } from '@/context/SecureAuthContext';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminButtonProps {
  to: string;
  children: React.ReactNode;
}

const AdminButton: React.FC<AdminButtonProps> = ({ to, children }) => {
  const { isAdmin } = useSecureAuth();

  if (!isAdmin) {
    return null;
  }

  return (
    <Link to={to}>
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <Edit className="h-4 w-4" />
        {children}
      </Button>
    </Link>
  );
};

export default AdminButton;
