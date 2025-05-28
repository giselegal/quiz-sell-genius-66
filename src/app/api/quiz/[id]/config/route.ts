import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Adicionando configuração necessária para build estático
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidar a cada 1 hora

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { mode, ...config } = await request.json();
    const { id } = await params;
    const quizId = id;

    // Determinar qual campo atualizar baseado no modo
    const updateData: any = {
      updatedAt: new Date(),
    };

    switch (mode) {
      case 'quiz':
        updateData.quizConfig = config;
        break;
      case 'result':
        updateData.resultConfig = config;
        break;
      case 'offer':
        updateData.offerConfig = config;
        break;
      default:
        updateData.editorConfig = config;
    }

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
        quizConfig: true,
        resultConfig: true,
        offerConfig: true,
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

    // Retornar configuração baseada no modo
    let config;
    switch (mode) {
      case 'quiz':
        config = quiz.quizConfig;
        break;
      case 'result':
        config = quiz.resultConfig;
        break;
      case 'offer':
        config = quiz.offerConfig;
        break;
      default:
        config = quiz.editorConfig;
    }

    return NextResponse.json({ 
      success: true, 
      config,
      quiz: {
        title: quiz.title,
        description: quiz.description
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
