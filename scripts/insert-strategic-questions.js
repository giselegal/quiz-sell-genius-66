#!/usr/bin/env node

/**
 * Script para inserir as questões estratégicas no banco de dados
 */

import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = 'https://txqljpitotmcxntprxiu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cWxqcGl0b3RtY3hudHByeGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NjI3MzQsImV4cCI6MjA2NTQzODczNH0.rHGZV47KUnSJ0fDNXbL-OjuB50BsuzT2IeO_LL-P8ok';

const supabase = createClient(supabaseUrl, supabaseKey);

const strategicQuestionsData = [
  {
    order_index: 12,
    type: "text",
    title: "Etapa de Transição 1: Página Transição antes do resultado e oferta",
    description:
      "🕐 Enquanto calculamos o seu resultado...\nQueremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa.\nA ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir com mais intenção, leveza e autenticidade.\n💬 Responda com sinceridade. Isso é só entre você e a sua nova versão.",
    is_transition: true,
    options: [],
  },
  {
    order_index: 13,
    type: "text",
    title: "Como você se vê hoje?",
    subtitle:
      "Quando você se olha no espelho, como se sente com sua imagem pessoal atualmente?",
    is_transition: false,
    options: [
      { text: "Me sinto desconectada da mulher que sou hoje", points: 1 },
      { text: "Tenho dúvidas sobre o que realmente me valoriza", points: 2 },
      { text: "Às vezes acerto, às vezes erro", points: 3 },
      { text: "Me sinto segura, mas sei que posso evoluir", points: 4 },
    ],
  },
  {
    order_index: 14,
    type: "text",
    title: "O que mais te desafia na hora de se vestir?",
    is_transition: false,
    options: [
      { text: "Tenho peças, mas não sei como combiná-las", points: 1 },
      { text: "Compro por impulso e me arrependo depois", points: 2 },
      { text: "Minha imagem não reflete quem eu sou", points: 3 },
      { text: "Perco tempo e acabo usando sempre os mesmos looks", points: 4 },
    ],
  },
  {
    order_index: 15,
    type: "text",
    title:
      'Com que frequência você se pega pensando: "Com que roupa eu vou?" — mesmo com o guarda-roupa cheio?',
    is_transition: false,
    options: [
      { text: "Quase todos os dias — é sempre uma indecisão", points: 1 },
      { text: "Sempre que tenho um compromisso importante", points: 2 },
      { text: "Às vezes, mas me sinto limitada nas escolhas", points: 3 },
      { text: "Raramente — já me sinto segura ao me vestir", points: 4 },
    ],
  },
  {
    order_index: 16,
    type: "text",
    title:
      "Pense no quanto você já gastou com roupas que não usa ou que não representam quem você é...",
    subtitle:
      "Você acredita que ter acesso a um material estratégico, direto ao ponto, que te ensina a aplicar seu estilo com clareza, faria diferença?",
    is_transition: false,
    options: [
      { text: "Sim! Se existisse algo assim, eu quero", points: 4 },
      { text: "Sim, mas teria que ser no momento certo", points: 3 },
      { text: "Tenho dúvidas se funcionaria pra mim", points: 2 },
      { text: "Não, prefiro continuar como estou", points: 1 },
    ],
  },
  {
    order_index: 17,
    type: "text",
    title:
      "Se esse conteúdo completo custasse R$ 97,00 — incluindo Guia de Estilo, bônus especiais e um passo a passo prático para transformar sua imagem pessoal — você consideraria um bom investimento?",
    is_transition: false,
    options: [
      { text: "Sim! Por esse resultado, vale muito", points: 4 },
      {
        text: "Sim, mas só se eu tiver certeza de que funciona pra mim",
        points: 3,
      },
      { text: "Talvez — depende do que está incluso", points: 2 },
      { text: "Não, ainda não estou pronta para investir", points: 1 },
    ],
  },
  {
    order_index: 18,
    type: "text",
    title:
      "Qual desses resultados você mais gostaria de alcançar com os Guias de Estilo e Imagem?",
    is_transition: false,
    options: [
      { text: "Montar looks com mais facilidade e confiança", points: 1 },
      { text: "Usar o que já tenho e me sentir estilosa", points: 2 },
      { text: "Comprar com mais consciência e sem culpa", points: 3 },
      { text: "Ser admirada pela imagem que transmito", points: 4 },
      {
        text: "Resgatar peças esquecidas e criar novos looks com estilo",
        points: 5,
      },
    ],
  },
  {
    order_index: 19,
    type: "text",
    title: "Etapa Transição 2: mensagem antes do resultado",
    description:
      "Obrigada por compartilhar.\n\nChegar até aqui já mostra que você está pronta para se olhar com mais amor, se vestir com mais intenção e deixar sua imagem comunicar quem você é de verdade — com leveza, presença e propósito.\n\nAgora, é hora de revelar o seu Estilo Predominante — e os seus Estilos Complementares.\nE, mais do que isso, uma oportunidade real de aplicar o seu Estilo com leveza e confiança — todos os dias.\n\nAh, e lembra do valor que mencionamos?\nPrepare-se para uma surpresa: o que você vai receber vale muito mais do que imagina — e vai custar muito menos do que você esperava.",
    is_transition: true,
    button_text: "Vamos ao resultado?",
    options: [],
  },
];

const insertStrategicQuestions = async () => {
  console.log("🚀 Inserindo questões estratégicas...");

  try {
    const quizId = "550e8400-e29b-41d4-a716-446655440000";

    for (const questionData of strategicQuestionsData) {
      // Inserir/atualizar questão
      const { data: question, error: questionError } = await supabase
        .from("quiz_questions")
        .upsert(
          {
            id: `q${questionData.order_index}`,
            quiz_id: quizId,
            title: questionData.title,
            subtitle: questionData.subtitle || null,
            description: questionData.description || null,
            type: questionData.type,
            order_index: questionData.order_index,
            required_selections: 1,
            is_transition: questionData.is_transition || false,
            button_text: questionData.button_text || null,
            active: true,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "id",
          }
        );

      if (questionError) {
        console.error(
          `❌ Erro ao inserir questão ${questionData.order_index}:`,
          questionError
        );
        continue;
      }

      console.log(`✅ Questão ${questionData.order_index} inserida`);

      // Inserir opções se existirem
      if (questionData.options && questionData.options.length > 0) {
        for (const [index, option] of questionData.options.entries()) {
          const { error: optionError } = await supabase
            .from("question_options")
            .upsert(
              {
                id: `q${questionData.order_index}_opt${index + 1}`,
                question_id: `q${questionData.order_index}`,
                text: option.text,
                style_code: "",
                points: option.points,
                order_index: index + 1,
                updated_at: new Date().toISOString(),
              },
              {
                onConflict: "id",
              }
            );

          if (optionError) {
            console.error(
              `❌ Erro ao inserir opção ${index + 1} da questão ${
                questionData.order_index
              }:`,
              optionError
            );
          }
        }
        console.log(
          `✅ ${questionData.options.length} opções inseridas para questão ${questionData.order_index}`
        );
      }
    }

    console.log(
      "🎉 Todas as questões estratégicas foram inseridas com sucesso!"
    );
    return true;
  } catch (error) {
    console.error("❌ Erro geral ao inserir questões:", error);
    return false;
  }
};

// Executar a função
const runUpdate = async () => {
  console.log('🚀 Iniciando atualização das questões estratégicas...');
  console.log('📊 Total de questões a inserir:', strategicQuestionsData.length);
  
  try {
    const success = await insertStrategicQuestions();
    
    if (success) {
      console.log('🎉 SUCESSO: Questões estratégicas atualizadas com sucesso!');
      process.exit(0);
    } else {
      console.log('❌ ERRO: Falha ao atualizar questões estratégicas');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ ERRO CRÍTICO:', error);
    process.exit(1);
  }
};

console.log('🔧 Script iniciado...');
runUpdate().catch((error) => {
  console.error('❌ Erro na execução:', error);
  process.exit(1);
});
