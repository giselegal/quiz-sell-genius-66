'use client';

import React, { useState } from 'react';
import { 
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  CreditCard,
  Database,
  Save,
  Key,
  Mail,
  Smartphone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#432818]">Configurações</h1>
          <p className="text-[#B89B7A] mt-1">
            Gerencie suas preferências e configurações do sistema
          </p>
        </div>
        
        <Button className="bg-[#432818] hover:bg-[#5C3B2A]">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>
      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-[#F5F2E9] border border-[#D4C4A0]">
          <TabsTrigger value="profile" className="data-[state=active]:bg-[#B89B7A] data-[state=active]:text-[#432818]">
            <User className="w-4 h-4 mr-2" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-[#B89B7A] data-[state=active]:text-[#432818]">
            <Bell className="w-4 h-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#B89B7A] data-[state=active]:text-[#432818]">
            <Shield className="w-4 h-4 mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-[#B89B7A] data-[state=active]:text-[#432818]">
            <Palette className="w-4 h-4 mr-2" />
            Aparência
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-[#B89B7A] data-[state=active]:text-[#432818]">
            <CreditCard className="w-4 h-4 mr-2" />
            Cobrança
          </TabsTrigger>
        </TabsList>
        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-[#D4C4A0]">
            <CardHeader>
              <CardTitle className="text-[#432818]">Informações Pessoais</CardTitle>
              <p className="text-[#B89B7A] text-sm">Atualize suas informações de perfil</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-[#432818]">Nome</Label>
                  <Input
                    id="firstName"
                    defaultValue="Desenvolvedor"
                    className="border-[#D4C4A0] focus:border-[#B89B7A]"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-[#432818]">Sobrenome</Label>
                  <Input
                    id="lastName"
                    defaultValue="Quiz Genius"
                    className="border-[#D4C4A0] focus:border-[#B89B7A]"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-[#432818]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="dev@teste.com"
                  className="border-[#D4C4A0] focus:border-[#B89B7A]"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-[#432818]">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  className="border-[#D4C4A0] focus:border-[#B89B7A]"
                />
              </div>
              <div>
                <Label htmlFor="bio" className="text-[#432818]">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Conte um pouco sobre você..."
                  rows={4}
                  className="border-[#D4C4A0] focus:border-[#B89B7A]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-[#D4C4A0]">
            <CardHeader>
              <CardTitle className="text-[#432818]">Preferências de Notificação</CardTitle>
              <p className="text-[#B89B7A] text-sm">Configure como você quer receber notificações</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#B89B7A]" />
                  <div>
                    <h4 className="font-medium text-[#432818]">Notificações por Email</h4>
                    <p className="text-sm text-[#B89B7A]">Receba atualizações importantes por email</p>
                  </div>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-[#B89B7A]" />
                  <div>
                    <h4 className="font-medium text-[#432818]">Notificações SMS</h4>
                    <p className="text-sm text-[#B89B7A]">Receba alertas críticos por SMS</p>
                  </div>
                </div>
                <Switch
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-[#B89B7A]" />
                  <div>
                    <h4 className="font-medium text-[#432818]">Auto Save</h4>
                    <p className="text-sm text-[#B89B7A]">Salvar automaticamente suas alterações</p>
                  </div>
                </div>
                <Switch
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-[#D4C4A0]">
            <CardHeader>
              <CardTitle className="text-[#432818]">Segurança da Conta</CardTitle>
              <p className="text-[#B89B7A] text-sm">Mantenha sua conta segura</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword" className="text-[#432818]">Senha Atual</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  className="border-[#D4C4A0] focus:border-[#B89B7A]"
                />
              </div>
              <div>
                <Label htmlFor="newPassword" className="text-[#432818]">Nova Senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="border-[#D4C4A0] focus:border-[#B89B7A]"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-[#432818]">Confirmar Nova Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="border-[#D4C4A0] focus:border-[#B89B7A]"
                />
              </div>
              <Button variant="outline" className="border-[#B89B7A] text-[#432818]">
                <Key className="w-4 h-4 mr-2" />
                Alterar Senha
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="border-[#D4C4A0]">
            <CardHeader>
              <CardTitle className="text-[#432818]">Personalização</CardTitle>
              <p className="text-[#B89B7A] text-sm">Customize a aparência do sistema</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label className="text-[#432818]">Tema</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="p-4 border-2 border-[#B89B7A] rounded-lg bg-white">
                  <div className="w-full h-8 bg-[#F5F2E9] rounded mb-2"></div>
                  <div className="space-y-1">
                    <div className="w-3/4 h-2 bg-[#D4C4A0] rounded"></div>
                    <div className="w-1/2 h-2 bg-[#B89B7A] rounded"></div>
                  </div>
                  <p className="text-sm font-medium text-[#432818] mt-2">Claro (Atual)</p>
                </div>
                <div className="p-4 border border-gray-300 rounded-lg bg-gray-900 opacity-50 cursor-not-allowed">
                  <div className="w-full h-8 bg-gray-800 rounded mb-2"></div>
                  <div className="w-3/4 h-2 bg-gray-700 rounded"></div>
                  <div className="w-1/2 h-2 bg-gray-600 rounded"></div>
                  <p className="text-sm font-medium text-white mt-2">Escuro (Em breve)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Billing Settings */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="border-[#D4C4A0]">
            <CardHeader>
              <CardTitle className="text-[#432818]">Plano Atual</CardTitle>
              <p className="text-[#B89B7A] text-sm">Gerencie sua assinatura</p>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-gradient-to-r from-[#F5F2E9] to-[#D4C4A0] rounded-lg">
                <div>
                  <h3 className="text-xl font-bold text-[#432818]">Professional</h3>
                  <p className="text-[#B89B7A]">Acesso completo a todas as funcionalidades</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#432818]">R$ 79</p>
                  <p className="text-sm text-[#B89B7A]">por mês</p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#B89B7A]/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#432818]">Próxima cobrança:</span>
                    <span className="text-[#B89B7A]">20 de Fevereiro, 2024</span>
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" className="border-[#B89B7A] text-[#432818]">
                    Alterar Plano
                  </Button>
                  <Button variant="outline" className="border-red-300 text-red-600">
                    Cancelar Assinatura
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
