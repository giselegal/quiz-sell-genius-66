'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Palette, 
  FileText, 
  Target, 
  ShoppingCart,
  Sparkles,
  Zap,
  Rocket,
  Eye,
  Copy,
  Edit3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
export default function EditorHub() {
  const editorOptions = [
    {
      id: 'quiz',
      title: 'Editor de Quiz',
      description: 'Crie quizzes interativos com perguntas personalizadas',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      features: ['Perguntas múltipla escolha', 'Lógica condicional', 'Personalização visual'],
      href: '/admin/editor/quiz/new'
    },
      id: 'result',
      title: 'Editor de Resultado',
      description: 'Desenhe páginas de resultado atrativas e personalizadas',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      features: ['Resultados dinâmicos', 'Personalização completa', 'Call-to-actions'],
      href: '/admin/editor/result/new'
      id: 'offer',
      title: 'Editor de Oferta',
      description: 'Crie páginas de venda e ofertas irresistíveis',
      icon: ShoppingCart,
      color: 'from-orange-500 to-red-500',
      features: ['Páginas de venda', 'Urgência e escassez', 'Checkout integrado'],
      href: '/admin/editor/offer/new'
    }
  ];
  const templates = [
      id: 1,
      name: 'Lead Magnet Pro',
      category: 'Marketing',
      preview: '🧲',
      description: 'Quiz otimizado para captura de leads',
      mode: 'quiz'
      id: 2,
      name: 'Resultado Impactante',
      category: 'Resultado',
      preview: '🎯',
      description: 'Página de resultado com alta conversão',
      mode: 'result'
      id: 3,
      name: 'Oferta Relâmpago',
      category: 'Vendas',
      preview: '⚡',
      description: 'Página de oferta com urgência',
      mode: 'offer'
  const recentProjects = [
      title: 'Quiz de Liderança',
      mode: 'quiz',
      lastEdited: '2 horas atrás',
      status: 'published'
      title: 'Resultado Personalidade',
      mode: 'result',
      lastEdited: '1 dia atrás',
      status: 'draft'
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <Palette className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Editor Visual Profissional
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Crie quizzes, resultados e ofertas incríveis com nosso editor drag & drop avançado
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            Novo!
          </Badge>
          <Badge variant="outline">
            <Zap className="w-3 h-3 mr-1" />
            Drag & Drop
            <Rocket className="w-3 h-3 mr-1" />
            Profissional
      </div>
      {/* Editor Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {editorOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Card key={option.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <CardHeader className="relative">
                <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
                <p className="text-gray-600">{option.description}</p>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-2 mb-6">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link href={option.href}>
                  <Button className={`w-full bg-gradient-to-r ${option.color} hover:opacity-90 transition-opacity`}>
                    <Plus className="w-4 h-4 mr-2" />
                    Começar Agora
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      {/* Templates Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-500" />
            Templates Prontos
          </CardTitle>
          <p className="text-gray-600">Comece rapidamente com nossos templates profissionais</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{template.preview}</div>
                  <h3 className="font-semibold mb-1">{template.name}</h3>
                  <Badge variant="outline" className="mb-2">{template.category}</Badge>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <Link href={`/admin/editor/${template.mode}/template/${template.id}`}>
                    <Button size="sm" variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-1" />
                      Usar Template
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
        </CardContent>
      </Card>
      {/* Recent Projects */}
            <Edit3 className="w-5 h-5 text-blue-500" />
            Projetos Recentes
          {recentProjects.length > 0 ? (
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{project.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Badge variant="outline" className="text-xs">{project.mode}</Badge>
                        <span>•</span>
                        <span>{project.lastEdited}</span>
                        <Badge variant={project.status === 'published' ? 'default' : 'secondary'} className="text-xs">
                          {project.status === 'published' ? 'Publicado' : 'Rascunho'}
                        </Badge>
                      </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4" />
                    <Link href={`/admin/editor/${project.mode}/${project.id}`}>
                      <Button size="sm">
                        <Edit3 className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                    </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Palette className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="mb-4">Nenhum projeto ainda</p>
              <p className="text-sm">Comece criando seu primeiro quiz com o editor visual!</p>
          )}
      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-8 text-center">
          <Rocket className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Pronto para começar?</h2>
          <p className="text-blue-100 mb-6">
            Escolha um dos editores acima e crie experiências incríveis para seus usuários!
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/admin/editor/quiz/new">
              <Button variant="secondary" size="lg">
                <FileText className="w-5 h-5 mr-2" />
                Novo Quiz
              </Button>
            </Link>
            <Link href="/admin/templates">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
                <Eye className="w-5 h-5 mr-2" />
                Ver Templates
    </div>
  );
}
