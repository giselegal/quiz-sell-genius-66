
'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Target } from 'lucide-react';

export default function AnalyticsPage() {
  const metrics = [
    {
      title: 'Total de Respostas',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Taxa de Conversão',
      value: '4.8%',
      change: '+0.3%',
      changeType: 'positive',
      icon: Target
    },
    {
      title: 'Revenue Total',
      value: 'R$ 15.240',
      change: '+8.2%',
      changeType: 'positive',
      icon: TrendingUp
    },
    {
      title: 'Quizzes Ativos',
      value: '5',
      change: '+1',
      changeType: 'positive',
      icon: BarChart3
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#432818]">Analytics</h1>
        <p className="text-[#B89B7A] mt-1">Acompanhe o desempenho dos seus quizzes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#B89B7A]">{metric.title}</p>
                  <p className="text-2xl font-bold text-[#432818] mt-1">{metric.value}</p>
                  <p className={`text-sm mt-1 ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </p>
                </div>
                <div className="p-3 bg-[#F5F2E9] rounded-lg">
                  <Icon className="w-6 h-6 text-[#B89B7A]" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#432818] mb-4">
            Performance por Quiz
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Quiz de Estilo', responses: 1234, conversions: 58, rate: 4.7 },
              { name: 'Quiz de Liderança', responses: 892, conversions: 34, rate: 3.8 },
              { name: 'Quiz de Marketing', responses: 721, conversions: 41, rate: 5.7 }
            ].map((quiz, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#F5F2E9] rounded-lg">
                <div>
                  <p className="font-medium text-[#432818]">{quiz.name}</p>
                  <p className="text-sm text-[#B89B7A]">{quiz.responses} respostas</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#432818]">{quiz.conversions}</p>
                  <p className="text-sm text-green-600">{quiz.rate}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#432818] mb-4">
            Conversões por Dia
          </h3>
          <div className="space-y-2">
            {[
              { day: 'Segunda', conversions: 12 },
              { day: 'Terça', conversions: 15 },
              { day: 'Quarta', conversions: 9 },
              { day: 'Quinta', conversions: 18 },
              { day: 'Sexta', conversions: 14 },
              { day: 'Sábado', conversions: 7 },
              { day: 'Domingo', conversions: 8 }
            ].map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-[#432818]">{data.day}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-[#F5F2E9] rounded-full h-2">
                    <div 
                      className="bg-[#B89B7A] h-2 rounded-full"
                      style={{ width: `${(data.conversions / 20) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-[#B89B7A] w-8">{data.conversions}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
