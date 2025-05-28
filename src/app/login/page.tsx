'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogIn, Palette } from 'lucide-react';
export default function LoginPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const router = useRouter();
  // Se já estiver logado, redirecionar
  React.useEffect(() => {
    if (user) {
      router.push('/admin');
    }
  }, [user, router]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Nome é obrigatório');
      return;
    }

    try {
      login(name);
    } catch (err) {
      setError('Erro ao fazer login');
    }
  };
    const handleQuickLogin = (type: 'admin' | 'user') => {
    if (type === 'admin') {
      login('Admin User');
    } else {
      login('Usuário Teste');
    }
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F2E9] to-[#D4C4A0] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-[#B89B7A]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#B89B7A] to-[#D4C4A0] rounded-xl flex items-center justify-center shadow-lg">
              <Palette className="w-8 h-8 text-[#432818]" />
            </div>
          </div>
          <CardTitle className="text-2xl text-[#432818]">Quiz Sell Genius</CardTitle>
          <p className="text-[#B89B7A]">Acesse o editor visual</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}
          {/* Login Rápido para Desenvolvimento */}
          <div className="space-y-3">
            <h3 className="font-semibold text-[#432818] text-sm">🚀 Acesso Rápido (Desenvolvimento)</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => handleQuickLogin('admin')}
                variant="outline"
                className="border-[#B89B7A] text-[#432818] hover:bg-[#F5F2E9]"
              >
                👨‍💼 Admin
              </Button>
              <Button
                onClick={() => handleQuickLogin('user')}
                variant="outline"
                className="border-[#B89B7A] text-[#432818] hover:bg-[#F5F2E9]"
              >
                👤 Usuário
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#D4C4A0]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-[#B89B7A]">ou</span>
            </div>
          </div>
          {/* Formulário Manual */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-[#432818]">Nome *</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="border-[#D4C4A0] focus:border-[#B89B7A] text-[#432818]"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-[#432818]">Email (opcional)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="border-[#D4C4A0] focus:border-[#B89B7A] text-[#432818]"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-[#432818]">Senha (qualquer uma)</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Qualquer senha funciona"
                className="border-[#D4C4A0] focus:border-[#B89B7A] text-[#432818]"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#432818] hover:bg-[#5C3B2A] text-[#F5F2E9]"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Entrar
            </Button>
          </form>
          {/* Informações de Desenvolvimento */}
          <div className="bg-[#F5F2E9] p-4 rounded-lg text-sm">
            <h4 className="font-semibold text-[#432818] mb-2">💡 Para Desenvolvedores:</h4>
            <ul className="text-[#B89B7A] space-y-1 text-xs">
              <li>• Qualquer senha funciona em modo desenvolvimento</li>
              <li>• Use o login rápido para acesso imediato</li>
              <li>• Admin tem acesso total ao sistema</li>
              <li>• Usuário tem plano Professional automático</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
