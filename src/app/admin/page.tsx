import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  BarChart3,
  Users,
  Target,
  TrendingUp,
  Plus,
  Palette,
  Code,
  Eye,
  Calendar,
  ArrowUp,
  ArrowDown,
  Activity
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // Redirecionar automaticamente para o editor
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/admin/editor');
    }, 100); // Redirecionamento quase imediato
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#432818]">Dashboard</h1>
          <p className="text-[#B89B7A] mt-1">
            Bem-vindo ao painel administrativo do Quiz Sell Genius
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-[#B89B7A] text-[#432818] rounded-lg hover:bg-[#F5F2E9] transition-colors">
            <Eye className="w-4 h-4 mr-2 inline" />
            Visualizar Site
          </button>
          <Link to="/admin/editor">
            <button className="px-4 py-2 bg-gradient-to-r from-[#432818] to-[#5C3B2A] text-white rounded-lg hover:from-[#5C3B2A] hover:to-[#6D4C37] transition-colors">
              <Plus className="w-4 h-4 mr-2 inline" />
              Novo Quiz
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total de Quizzes',
            value: '12',
            change: '+2',
            changeType: 'positive',
            icon: BarChart3,
            description: '2 novos este mês'
          },
          {
            title: 'Respostas Hoje',
            value: '847',
            change: '+12.5%',
            changeType: 'positive',
            icon: Users,
            description: 'vs. ontem'
          },
          {
            title: 'Taxa de Conversão',
            value: '4.8%',
            change: '+0.3%',
            changeType: 'positive',
            icon: Target,
            description: 'média geral'
          },
          {
            title: 'Revenue Hoje',
            value: 'R$ 2.847',
            change: '-5.2%',
            changeType: 'negative',
            icon: TrendingUp,
            description: 'vs. ontem'
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="border border-[#D4C4A0] rounded-lg p-6 bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#B89B7A]">{stat.title}</p>
                  <p className="text-3xl font-bold text-[#432818] mt-1">{stat.value}</p>
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
                    <span className="text-sm text-[#B89B7A] ml-1">{stat.description}</span>
                  </div>
                </div>
                <div className="p-3 bg-[#F5F2E9] rounded-full">
                  <Icon className="w-6 h-6 text-[#B89B7A]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="border border-[#D4C4A0] rounded-lg bg-white">
        <div className="p-6 border-b border-[#D4C4A0]">
          <h2 className="text-xl font-bold text-[#432818]">🚀 Ações Rápidas</h2>
          <p className="text-[#B89B7A] text-sm mt-1">Acesse rapidamente as principais funcionalidades</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Criar Quiz Visual',
                description: 'Use o novo editor drag & drop',
                icon: Palette,
                to: '/admin/editor',
                color: 'bg-blue-500',
                badge: 'NOVO'
              },
              {
                title: 'Configurar Pixels',
                description: 'Setup de tracking e conversão',
                icon: Code,
                to: '/admin/tracking',
                color: 'bg-purple-500',
                badge: 'PRO'
              },
              {
                title: 'Ver Analytics',
                description: 'Relatórios detalhados',
                icon: BarChart3,
                to: '/admin/analytics',
                color: 'bg-green-500'
              },
              {
                title: 'Gerenciar Leads',
                description: 'Todos os leads capturados',
                icon: Users,
                to: '/admin/leads',
                color: 'bg-orange-500'
              }
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} to={action.to}>
                  <div className="p-4 border border-[#D4C4A0] rounded-lg hover:shadow-md transition-all duration-200 hover:border-[#B89B7A] cursor-pointer group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      {action.badge && (
                        <span className={`px-2 py-1 text-xs font-bold rounded-full border ${
                          action.badge === 'NOVO' 
                            ? 'border-yellow-400 text-yellow-700 bg-yellow-50' 
                            : 'border-purple-400 text-purple-700 bg-purple-50'
                        }`}>
                          {action.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-[#432818] mb-1">{action.title}</h3>
                    <p className="text-sm text-[#B89B7A]">{action.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Quizzes */}
        <div className="border border-[#D4C4A0] rounded-lg bg-white">
          <div className="p-6 border-b border-[#D4C4A0]">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#432818]">Quizzes Recentes</h2>
              <Link to="/admin/quizzes">
                <button className="px-3 py-1 border border-[#B89B7A] text-[#432818] rounded text-sm hover:bg-[#F5F2E9] transition-colors">
                  Ver Todos
                </button>
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: 'Quiz de Liderança Empresarial',
                  status: 'ativo',
                  responses: 234,
                  conversions: 12,
                  rate: 5.1
                },
                {
                  id: 2,
                  title: 'Descubra Seu Produto Ideal',
                  status: 'ativo',
                  responses: 189,
                  conversions: 8,
                  rate: 4.2
                },
                {
                  id: 3,
                  title: 'Personalidade Empreendedora',
                  status: 'rascunho',
                  responses: 0,
                  conversions: 0,
                  rate: 0
                }
              ].map((quiz) => (
                <div key={quiz.id} className="flex items-center justify-between p-3 bg-[#F5F2E9] rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-[#432818] text-sm">{quiz.title}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className={`px-2 py-1 text-xs border rounded ${
                        quiz.status === 'ativo' 
                          ? 'border-green-500 text-green-700 bg-green-50' 
                          : 'border-gray-500 text-gray-700 bg-gray-50'
                      }`}>
                        {quiz.status}
                      </span>
                      <span className="text-xs text-[#B89B7A]">
                        {quiz.responses} respostas
                      </span>
                      {quiz.rate > 0 && (
                        <span className="text-xs text-green-600 font-medium">
                          {quiz.rate}% conv.
                        </span>
                      )}
                    </div>
                  </div>
                  <Link to={`/admin/quizzes/${quiz.id}`}>
                    <button className="p-2 text-[#B89B7A] hover:text-[#432818] hover:bg-white rounded transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="border border-[#D4C4A0] rounded-lg bg-white">
          <div className="p-6 border-b border-[#D4C4A0]">
            <h2 className="text-xl font-bold text-[#432818]">Performance Semanal</h2>
            <p className="text-[#B89B7A] text-sm mt-1">Conversões dos últimos 7 dias</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { day: 'Segunda', value: 85, conversions: 12 },
                { day: 'Terça', value: 92, conversions: 15 },
                { day: 'Quarta', value: 78, conversions: 9 },
                { day: 'Quinta', value: 96, conversions: 18 },
                { day: 'Sexta', value: 88, conversions: 14 },
                { day: 'Sábado', value: 65, conversions: 7 },
                { day: 'Domingo', value: 72, conversions: 8 }
              ].map((data, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[#432818]">{data.day}</span>
                    <span className="text-sm text-[#B89B7A]">{data.conversions} conversões</span>
                  </div>
                  <div className="w-full bg-[#F5F2E9] rounded-full h-2">
                    <div 
                      className="bg-[#B89B7A] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${data.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="border border-[#D4C4A0] rounded-lg bg-white">
        <div className="p-6 border-b border-[#D4C4A0]">
          <h2 className="text-xl font-bold text-[#432818] flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Atividade Recente
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                action: 'Novo quiz criado',
                details: '"Quiz de Marketing Digital" foi publicado',
                time: '2 horas atrás',
                icon: Plus,
                color: 'text-green-600'
              },
              {
                action: 'Meta atingida',
                details: '100 conversões alcançadas este mês',
                time: '4 horas atrás',
                icon: Target,
                color: 'text-blue-600'
              },
              {
                action: 'Pixel configurado',
                details: 'Facebook Pixel foi instalado com sucesso',
                time: '1 dia atrás',
                icon: Code,
                color: 'text-purple-600'
              },
              {
                action: 'Relatório gerado',
                details: 'Exportação de leads concluída',
                time: '2 dias atrás',
                icon: BarChart3,
                color: 'text-orange-600'
              }
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-3 hover:bg-[#F5F2E9] rounded-lg transition-colors">
                  <div className="p-2 rounded-full bg-gray-100">
                    <Icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#432818] text-sm">{activity.action}</p>
                    <p className="text-xs text-[#B89B7A]">{activity.details}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#B89B7A]">
                    <Calendar className="w-3 h-3" />
                    {activity.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
