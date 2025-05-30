
import React, { useEffect } from 'react';
import { useSecureAuth } from '@/context/SecureAuthContext';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { user, isLoading, isAdmin } = useSecureAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate('/auth');
        return;
      }
      
      if (requireAdmin && !isAdmin) {
        navigate('/');
        return;
      }
    }
  }, [user, isLoading, isAdmin, requireAdmin, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user || (requireAdmin && !isAdmin)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
