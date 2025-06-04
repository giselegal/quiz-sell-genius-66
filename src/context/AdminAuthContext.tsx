import React, {
  createCon// Credenciais de administração hardcoded (mais seguro que localStorage)
const ADMIN_CREDENTIALS = {
  email: 'consultoria@giselegalvao.com.br',
  // Hash da senha "Gi$ele0809" 
  passwordHash: '$2b$10$aQdAk3NDJMhNUTuKAXaYk.4Q/I/.klvK2vB0ytfItGNPYLn/035Ka'
};  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import bcrypt from "bcryptjs";

interface AdminUser {
  email: string;
  authenticated: boolean;
  loginTime: Date;
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

// Credenciais de administração hardcoded (mais seguro que localStorage)
const ADMIN_CREDENTIALS = {
  email: "consultoria@giselegalvao.com.br",
  // Hash da senha "Gi$ele0809"
  passwordHash: "$2a$10$Kg8vXVf6bqY8r1OuGXkzIuJH4L.FnQxlQFWyRkKvU1O2xH8TZmvmW",
};

// Função para verificar se a sessão é válida (24 horas)
const isSessionValid = (loginTime: Date): boolean => {
  const now = new Date();
  const sessionDuration = 24 * 60 * 60 * 1000; // 24 horas em millisegundos
  return now.getTime() - loginTime.getTime() < sessionDuration;
};

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar sessão existente ao carregar
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const savedSession = sessionStorage.getItem("adminSession");
        if (savedSession) {
          const session = JSON.parse(savedSession);
          const loginTime = new Date(session.loginTime);

          if (
            session.email === ADMIN_CREDENTIALS.email &&
            isSessionValid(loginTime)
          ) {
            setAdminUser({
              email: session.email,
              authenticated: true,
              loginTime: loginTime,
            });
          } else {
            // Sessão expirada, limpar
            sessionStorage.removeItem("adminSession");
          }
        }
      } catch (error) {
        console.error("Erro ao verificar sessão admin:", error);
        sessionStorage.removeItem("adminSession");
      }
      setIsLoading(false);
    };

    checkExistingSession();
  }, []);

  const adminLogin = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Verificar email
      if (email !== ADMIN_CREDENTIALS.email) {
        setIsLoading(false);
        return false;
      }

      // Verificar senha com hash
      const isPasswordValid = await bcrypt.compare(
        password,
        ADMIN_CREDENTIALS.passwordHash
      );

      if (isPasswordValid) {
        const loginTime = new Date();
        const user: AdminUser = {
          email: email,
          authenticated: true,
          loginTime: loginTime,
        };

        setAdminUser(user);

        // Salvar sessão (sessionStorage é mais seguro que localStorage)
        sessionStorage.setItem(
          "adminSession",
          JSON.stringify({
            email: email,
            loginTime: loginTime.toISOString(),
          })
        );

        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Erro no login admin:", error);
      setIsLoading(false);
      return false;
    }
  };

  const adminLogout = () => {
    setAdminUser(null);
    sessionStorage.removeItem("adminSession");
  };

  const isAdminAuthenticated =
    adminUser?.authenticated === true &&
    adminUser.loginTime &&
    isSessionValid(adminUser.loginTime);

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        isLoading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
