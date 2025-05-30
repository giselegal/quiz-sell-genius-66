import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, User, Shield } from 'lucide-react';
import { AdminCredentials, enableQuickAccess } from '@/config/adminCredentials';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simular delay de autenticação
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Usar a função de validação das credenciais
      const validation = AdminCredentials.validateCredentials(username, password);

      if (validation.valid && validation.user) {
        // Login bem-sucedido - configurar localStorage
        localStorage.setItem('userRole', validation.user.role);
        localStorage.setItem('userName', username);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isAdminAuthenticated', 'true');
        localStorage.setItem('adminBypass', 'true');
        localStorage.setItem('loginTimestamp', Date.now().toString());
        localStorage.setItem('authMethod', 'credentials');

        // Redirecionar para admin
        navigate('/admin');
      } else {
        setError(`Usuário ou senha incorretos. Tente: ${AdminCredentials.main.username}/${AdminCredentials.main.password}`);
      }
    } catch (err) {
      setError('Erro interno. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAccess = () => {
    // Usar a função de acesso rápido
    enableQuickAccess();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F7] to-[#F5F3F0] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-[#E6D5C7]">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-[#432818] rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-[#432818]">
            Acesso Administrativo
          </CardTitle>
          <CardDescription className="text-[#8F7A6A]">
            Entre com suas credenciais para acessar o painel
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Campo Usuário */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-[#432818]">
                Usuário
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8F7A6A]" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Digite seu usuário"
                  className="pl-10 border-[#E6D5C7] focus:border-[#B89B7A]"
                  required
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#432818]">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8F7A6A]" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="pl-10 pr-10 border-[#E6D5C7] focus:border-[#B89B7A]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8F7A6A] hover:text-[#432818]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Botão Login */}
            <Button 
              type="submit" 
              className="w-full bg-[#432818] hover:bg-[#5A3A2A]"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          {/* Credenciais de Teste */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">
              📋 Credenciais de Teste:
            </h4>
            <div className="text-sm text-blue-800 space-y-1">
              <div><strong>Principal:</strong> {AdminCredentials.main.username} / {AdminCredentials.main.password}</div>
              {AdminCredentials.alternatives.slice(0, 3).map((cred, index) => (
                <div key={index}>
                  <strong>Alt {index + 1}:</strong> {cred.username} / {cred.password}
                </div>
              ))}
            </div>
          </div>

          {/* Acesso Rápido */}
          <div className="mt-4 pt-4 border-t border-[#E6D5C7]">
            <Button 
              onClick={handleQuickAccess}
              variant="outline"
              className="w-full border-[#B89B7A] text-[#432818] hover:bg-[#FAF9F7]"
            >
              🚀 Acesso Rápido (Sem Senha)
            </Button>
          </div>

          {/* Links Úteis */}
          <div className="mt-4 text-center space-y-2">
            <button 
              onClick={() => navigate('/troubleshoot')}
              className="text-sm text-[#8F7A6A] hover:text-[#432818] underline"
            >
              Problemas de acesso?
            </button>
            <div>
              <button 
                onClick={() => navigate('/')}
                className="text-sm text-[#8F7A6A] hover:text-[#432818] underline"
              >
                ← Voltar ao site
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
