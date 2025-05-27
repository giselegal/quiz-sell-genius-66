'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Eye,
  BarChart3,
  Users,
  Calendar,
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
export default function QuizzesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const quizzes = [
    {
      id: 1,
      title: 'Quiz de Liderança Empresarial',
      status: 'ativo',
      responses: 2847,
      conversions: 156,
      conversionRate: 5.5,
      createdAt: '2024-01-15',
      type: 'personality',
      thumbnail: 'https://via.placeholder.com/100x60'
    },
    {
      id: 2,
      title: 'Descubra Seu Produto Ideal',
      status: 'ativo',
      responses: 1923,
      conversions: 89,
      conversionRate: 4.6,
      createdAt: '2024-01-12',
      type: 'product-finder',
      thumbnail: 'https://via.placeholder.com/100x60'
    },
    {
      id: 3,
      title: 'Teste de Personalidade Empreendedora',
      status: 'rascunho',
      responses: 0,
      conversions: 0,
      conversionRate: 0,
      createdAt: '2024-01-10',
      type: 'personality',
      thumbnail: 'https://via.placeholder.com/100x60'
    },
    {
      id: 4,
      title: 'Quiz de Marketing Digital',
      status: 'pausado',
      responses: 856,
      conversions: 32,
      conversionRate: 3.7,
      createdAt: '2024-01-08',
      type: 'knowledge',
      thumbnail: 'https://via.placeholder.com/100x60'
    }
  ];
  const getStatusBadge = (status: string) => {
    const styles = {
      ativo: 'bg-green-100 text-green-800 border-green-200',
      pausado: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      rascunho: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return (
      <Badge variant="outline" className={styles[status as keyof typeof styles]}>
        {status}
      </Badge>
    );
  };
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#432818]">Quizzes</h1>
          <p className="text-[#B89B7A] mt-1">
            Gerencie todos os seus quizzes e acompanhe sua performance
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="border-[#B89B7A] text-[#432818]">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Link href="/admin/quizzes/new">
            <Button className="bg-[#432818] hover:bg-[#5C3B2A]">
              <Plus className="w-4 h-4 mr-2" />
              Novo Quiz
            </Button>
          </Link>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-[#D4C4A0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#B89B7A]">Total de Quizzes</p>
                <p className="text-3xl font-bold text-[#432818]">4</p>
              </div>
              <div className="p-3 bg-[#F5F2E9] rounded-full">
                <BarChart3 className="w-6 h-6 text-[#B89B7A]" />
            </div>
          </CardContent>
        </Card>
                <p className="text-sm font-medium text-[#B89B7A]">Respostas Totais</p>
                <p className="text-3xl font-bold text-[#432818]">5,626</p>
                <Users className="w-6 h-6 text-[#B89B7A]" />
                <p className="text-sm font-medium text-[#B89B7A]">Conversões</p>
                <p className="text-3xl font-bold text-green-600">277</p>
              <div className="p-3 bg-green-50 rounded-full">
                <Star className="w-6 h-6 text-green-600" />
                <p className="text-sm font-medium text-[#B89B7A]">Taxa Média</p>
                <p className="text-3xl font-bold text-[#432818]">4.9%</p>
      {/* Search and Filters */}
      <Card className="border-[#D4C4A0]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#432818]">Todos os Quizzes</CardTitle>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B89B7A] w-4 h-4" />
              <Input
                placeholder="Buscar quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#D4C4A0] focus:border-[#B89B7A]"
              />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quiz</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Respostas</TableHead>
                <TableHead>Conversões</TableHead>
                <TableHead>Taxa Conv.</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={quiz.thumbnail}
                        alt={quiz.title}
                        className="w-12 h-8 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium text-[#432818]">{quiz.title}</p>
                        <p className="text-xs text-[#B89B7A]">
                          {quiz.type === 'personality' ? 'Personalidade' : 
                           quiz.type === 'product-finder' ? 'Produto' : 'Conhecimento'}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(quiz.status)}</TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-[#B89B7A]" />
                      {quiz.responses.toLocaleString()}
                  <TableCell className="font-medium">{quiz.conversions}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${
                      quiz.conversionRate >= 5 ? 'text-green-600' :
                      quiz.conversionRate >= 3 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {quiz.conversionRate}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-[#B89B7A]">
                      <Calendar className="w-4 h-4" />
                      {new Date(quiz.createdAt).toLocaleDateString('pt-BR')}
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
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir
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
