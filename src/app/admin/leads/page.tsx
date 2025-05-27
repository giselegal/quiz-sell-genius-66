'use client';

import React, { useState } from 'react';
import { 
  Download,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  Tag,
  MoreHorizontal,
  UserPlus,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const leads = [
    {
      id: 1,
      name: 'Maria Silva',
      email: 'maria@exemplo.com',
      phone: '(11) 99999-9999',
      quiz: 'Quiz de Liderança',
      score: 85,
      quality: 'hot',
      createdAt: '2024-01-20',
      converted: true
    },
    {
      id: 2,
      name: 'João Santos',
      email: 'joao@exemplo.com',
      phone: '',
      quiz: 'Produto Ideal',
      score: 72,
      quality: 'warm',
      createdAt: '2024-01-19',
      converted: false
    },
    {
      id: 3,
      name: 'Ana Costa',
      email: 'ana@exemplo.com',
      phone: '(21) 88888-8888',
      quiz: 'Personalidade Emp.',
      score: 68,
      quality: 'warm',
      createdAt: '2024-01-18',
      converted: false
    },
    {
      id: 4,
      name: 'Pedro Lima',
      email: 'pedro@exemplo.com',
      phone: '',
      quiz: 'Marketing Digital',
      score: 45,
      quality: 'cold',
      createdAt: '2024-01-17',
      converted: false
    }
  ];
  const getQualityBadge = (quality: string) => {
    const styles = {
      hot: 'bg-red-100 text-red-800 border-red-200',
      warm: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cold: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    
    const labels = { hot: 'Quente', warm: 'Morno', cold: 'Frio' };
    return (
      <Badge variant="outline" className={styles[quality as keyof typeof styles]}>
        {labels[quality as keyof typeof labels]}
      </Badge>
    );
  };
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#432818]">Leads</h1>
          <p className="text-[#B89B7A] mt-1">
            Gerencie todos os leads capturados pelos seus quizzes
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-[#B89B7A] text-[#432818]">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" className="border-[#B89B7A] text-[#432818]">
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-[#D4C4A0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#B89B7A]">Total de Leads</p>
                <p className="text-3xl font-bold text-[#432818]">2,847</p>
              </div>
              <div className="p-3 bg-[#F5F2E9] rounded-full">
                <UserPlus className="w-6 h-6 text-[#B89B7A]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#D4C4A0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#B89B7A]">Leads Quentes</p>
                <p className="text-3xl font-bold text-red-600">458</p>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <Star className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#D4C4A0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#B89B7A]">Taxa de Conversão</p>
                <p className="text-3xl font-bold text-green-600">18.5%</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <Tag className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#D4C4A0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#B89B7A]">Hoje</p>
                <p className="text-3xl font-bold text-[#432818]">47</p>
              </div>
              <div className="p-3 bg-[#F5F2E9] rounded-full">
                <Calendar className="w-6 h-6 text-[#B89B7A]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Leads Table */}
      <Card className="border-[#D4C4A0]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#432818]">Todos os Leads</CardTitle>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B89B7A] w-4 h-4" />
              <Input
                placeholder="Buscar leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#D4C4A0] focus:border-[#B89B7A]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Quiz</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Qualidade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-[#432818]">{lead.name}</p>
                      <div className="flex items-center gap-3 text-sm text-[#B89B7A] mt-1">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{lead.quiz}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#F5F2E9] flex items-center justify-center">
                        <span className="text-xs font-bold text-[#432818]">{lead.score}</span>
                      </div>
                      <span className="text-sm text-[#B89B7A]">pontos</span>
                    </div>
                  </TableCell>
                  <TableCell>{getQualityBadge(lead.quality)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={lead.converted ? 'border-green-500 text-green-700 bg-green-50' : 'border-gray-500 text-gray-700 bg-gray-50'}
                    >
                      {lead.converted ? 'Convertido' : 'Novo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-[#B89B7A]">
                      <Calendar className="w-4 h-4" />
                      {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          Enviar Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Tag className="w-4 h-4 mr-2" />
                          Marcar como Convertido
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Exportar Dados
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
