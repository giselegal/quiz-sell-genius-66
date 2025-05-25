'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Target, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Eye,
  Plus,
  Palette,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Zap,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function AdminDashboard() {
  // Dados mockados para demonstração
  const stats = [
    {
      title: 'Total de Quizzes',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Visualizações',
      value: '8.2K',
      change: '+23%',
      changeType: 'positive',
      icon: Eye,
      color: 'green'
    },
    {
      title: 'Leads Gerados',
      value: '1,543',
      change: '+18%',
      changeType: 'positive',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Taxa de Conversão',
      value: '3.2%',
      change: '-2%',
      changeType: 'negative',
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  const recentQuizzes = [
    {
      id: 1,
      title: 'Qual Seu Estilo de Liderança?',
      status: 'published',
      views: 1234,
      leads: 89,
      conversion: 7.2,
      lastUpdated: '2 horas atrás',
      hasVisualEditor: true
    },
    {
      id: 2,
      title: 'Descubra Seu Produto Ideal',
      status: 'draft',
      views: 0,
      leads: 0,
      conversion: 0,
      lastUpdated: '1 dia atrás',
      hasVisualEditor: false
    },
    {
      id: 3,
      title: 'Quiz de Personalidade Empresarial',
      status: 'published',
      views: 856,
      leads: 45,
      conversion: 5.3,
      lastUpdated: '3 dias atrás',
      hasVisualEditor: true
    }
  ];

  const quickActions = [
    {
      title: 'Novo Quiz com Editor Visual',
      description: 'Crie um quiz completo com nosso editor drag & drop',
      icon: Palette,
      href: '/admin/editor/new',
      color: 'bg-gradient-to-r from-blue-500 to-purple-600',
      featured: true
    },
    {
      title: 'Quiz Tradicional',
      description: 'Criar quiz com formulário padrão',
      icon: FileText,
      href: '/admin/quizzes/new',
      color: 'bg-gradient-to-r from-green-500 to-teal-600'
    },
    {
      title: 'Analytics Avançado',
      description: 'Ver relatórios detalhados',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-gradient-to-r from-orange-500 to-red-600'
    },
    {
      title: 'Gerenciar Leads',
      description: 'Visualizar e exportar leads',
      icon: Users,
      href: '/admin/leads',
      color: 'bg-gradient-to-r from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Bem-vindo de volta! Aqui está um resumo dos seus quizzes.
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Relatórios
          </Button>
          <Link href="/admin/editor/new">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Palette className="w-4 h-4 mr-2" />
              Novo Quiz Visual
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.changeType === 'positive' ? (
                        <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs. mês anterior</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} href={action.href}>
                  <Card className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${
                    action.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                  }`}>
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {action.title}
                        {action.featured && (
                          <Badge className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                            NOVO!
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Quizzes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Quizzes Recentes
            </CardTitle>
            <Link href="/admin/quizzes">
              <Button variant="outline" size="sm">
                Ver Todos
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentQuizzes.map((quiz) => (
              <div key={quiz.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{quiz.title}</h3>
                      <Badge 
                        variant={quiz.status === 'published' ? 'default' : 'secondary'}
                        className={quiz.status === 'published' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {quiz.status === 'published' ? 'Publicado' : 'Rascunho'}
                      </Badge>
                      {quiz.hasVisualEditor && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <Palette className="w-3 h-3 mr-1" />
                          Visual
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span>👁️ {quiz.views} views</span>
                      <span>👥 {quiz.leads} leads</span>
                      <span>📈 {quiz.conversion}% conversão</span>
                      <span>🕒 {quiz.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {quiz.hasVisualEditor && (
                    <Link href={`/quiz/${quiz.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Palette className="w-4 h-4 mr-1" />
                        Editor
                      </Button>
                    </Link>
                  )}
                  <Link href={`/admin/quizzes/${quiz.id}`}>
                    <Button size="sm">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Quiz de Liderança', score: 92, trend: 'up' },
                { name: 'Produto Ideal', score: 87, trend: 'up' },
                { name: 'Personalidade', score: 74, trend: 'down' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={item.score} className="w-20" />
                    <span className="text-sm font-medium">{item.score}%</span>
                    {item.trend === 'up' ? (
                      <ArrowUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status dos Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Publicados</span>
                </div>
                <span className="font-semibold">18</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">Rascunhos</span>
                </div>
                <span className="font-semibold">6</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Com Editor Visual</span>
                </div>
                <span className="font-semibold">12</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
