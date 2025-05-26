import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Configuração para rota dinâmica
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { mode, ...config } = await request.json();
    const { id } = await params;
    const quizId = id;

    // Por enquanto, apenas atualizamos o updatedAt até o schema ser expandido
    const updateData: any = {
      updatedAt: new Date(),
    };

    const updatedQuiz = await prisma.quiz.update({
      where: { id: Number(quizId) },
      data: updateData,
    });

    return NextResponse.json({ 
      success: true, 
      message: `Configuração de ${mode} salva com sucesso!` 
    });
  } catch (error) {
    console.error('Erro ao salvar configuração:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const quizId = id;
    const url = new URL(request.url);
    const mode = url.searchParams.get('mode') || 'quiz';

    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(quizId) },
      select: { 
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true
      },
    });

    if (!quiz) {
      return NextResponse.json(
        { success: false, message: 'Quiz não encontrado' },
        { status: 404 }
      );
    }

    // Por enquanto, retornar configuração vazia até o schema ser atualizado
    const config = {};

    return NextResponse.json({ 
      success: true, 
      config,
      quiz: {
        title: quiz.title
      }
    });
  } catch (error) {
    console.error('Erro ao carregar configuração:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
