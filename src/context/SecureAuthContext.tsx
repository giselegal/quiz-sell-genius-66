
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';

interface SecureAuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  isLoading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  refreshUserRole: () => Promise<void>;
}

const SecureAuthContext = createContext<SecureAuthContextType | undefined>(undefined);

export const SecureAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchUserRole = async (userId: string) => {
    try {
      // Use the existing profiles table to check if user is admin
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
        return 'user';
      }

      // Return 'admin' if is_admin is true, otherwise 'user'
      return data?.is_admin ? 'admin' : 'user';
    } catch (error) {
      console.error('Error fetching user role:', error);
      return 'user';
    }
  };

  const refreshUserRole = async () => {
    if (user) {
      const role = await fetchUserRole(user.id);
      setUserRole(role);
    }
  };

  useEffect(() => {
    // Check for localStorage admin access as fallback
    const localAdminRole = localStorage.getItem('userRole');
    const localUserName = localStorage.getItem('userName');
    
    if (localAdminRole === 'admin') {
      // Create a mock user for localStorage admin access
      const mockUser = {
        id: 'local-admin',
        email: localUserName || 'admin@local.dev',
        role: 'admin'
      } as any;
      
      setUser(mockUser);
      setUserRole('admin');
      setIsLoading(false);
      return;
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer role fetching to prevent deadlocks
          setTimeout(async () => {
            const role = await fetchUserRole(session.user.id);
            setUserRole(role);
            setIsLoading(false);
          }, 0);
        } else {
          setUserRole(null);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(async () => {
          const role = await fetchUserRole(session.user.id);
          setUserRole(role);
          setIsLoading(false);
        }, 0);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) throw error;
      
      // Clear all state
      setUser(null);
      setSession(null);
      setUserRole(null);
      
      // Clear any remaining localStorage items
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      localStorage.removeItem('quizResult');
      
      toast({
        title: "Logout realizado com sucesso",
        description: "Você foi desconectado da sua conta.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao fazer logout",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    }
  };

  const isAdmin = userRole === 'admin';

  return (
    <SecureAuthContext.Provider value={{
      user,
      session,
      userRole,
      isLoading,
      isAdmin,
      signOut,
      refreshUserRole
    }}>
      {children}
    </SecureAuthContext.Provider>
  );
};

export const useSecureAuth = () => {
  const context = useContext(SecureAuthContext);
  if (context === undefined) {
    throw new Error('useSecureAuth must be used within a SecureAuthProvider');
  }
  return context;
};
