import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const config = await request.json();
    const quizId = params.id;

    // Salvar configuração no banco
    const updatedQuiz = await prisma.quiz.update({
      where: { id: quizId },
      data: {
        editorConfig: config,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Configuração salva com sucesso!' 
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
  { params }: { params: { id: string } }
) {
  try {
    const quizId = params.id;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      select: { 
        editorConfig: true,
        title: true,
        description: true 
      },
    });

    if (!quiz) {
      return NextResponse.json(
        { success: false, message: 'Quiz não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      config: quiz.editorConfig 
    });
  } catch (error) {
    console.error('Erro ao carregar configuração:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
