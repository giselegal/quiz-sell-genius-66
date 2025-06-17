#!/usr/bin/env node

/**
 * Script para inserir as opções das questões estratégicas com UUIDs válidos
 */

import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

const supabaseUrl = 'https://txqljpitotmcxntprxiu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cWxqcGl0b3RtY3hudHByeGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NjI3MzQsImV4cCI6MjA2NTQzODczNH0.rHGZV47KUnSJ0fDNXbL-OjuB50BsuzT2IeO_LL-P8ok';

const supabase = createClient(supabaseUrl, supabaseKey);

// UUIDs das questões já inseridas
const questionUUIDs = {
  13: '550e8400-e29b-41d4-a716-446655440013',
  14: '550e8400-e29b-41d4-a716-446655440014',
  15: '550e8400-e29b-41d4-a716-446655440015',
  16: '550e8400-e29b-41d4-a716-446655440016',
  17: '550e8400-e29b-41d4-a716-446655440017',
  18: '550e8400-e29b-41d4-a716-446655440018',
};

const questionsWithOptions = [
  {
    order_index: 13,
    options: [
      { text: "Me sinto desconectada da mulher que sou hoje", points: 1 },
      { text: "Tenho dúvidas sobre o que realmente me valoriza", points: 2 },
      { text: "Às vezes acerto, às vezes erro", points: 3 },
      { text: "Me sinto segura, mas sei que posso evoluir", points: 4 },
    ],
  },
  {
    order_index: 14,
    options: [
      { text: "Tenho peças, mas não sei como combiná-las", points: 1 },
      { text: "Compro por impulso e me arrependo depois", points: 2 },
      { text: "Minha imagem não reflete quem eu sou", points: 3 },
      { text: "Perco tempo e acabo usando sempre os mesmos looks", points: 4 },
    ],
  },
  {
    order_index: 15,
    options: [
      { text: "Quase todos os dias — é sempre uma indecisão", points: 1 },
      { text: "Sempre que tenho um compromisso importante", points: 2 },
      { text: "Às vezes, mas me sinto limitada nas escolhas", points: 3 },
      { text: "Raramente — já me sinto segura ao me vestir", points: 4 },
    ],
  },
  {
    order_index: 16,
    options: [
      { text: "Sim! Se existisse algo assim, eu quero", points: 4 },
      { text: "Sim, mas teria que ser no momento certo", points: 3 },
      { text: "Tenho dúvidas se funcionaria pra mim", points: 2 },
      { text: "Não, prefiro continuar como estou", points: 1 },
    ],
  },
  {
    order_index: 17,
    options: [
      { text: "Sim! Por esse resultado, vale muito", points: 4 },
      { text: "Sim, mas só se eu tiver certeza de que funciona pra mim", points: 3 },
      { text: "Talvez — depende do que está incluso", points: 2 },
      { text: "Não, ainda não estou pronta para investir", points: 1 },
    ],
  },
  {
    order_index: 18,
    options: [
      { text: "Montar looks com mais facilidade e confiança", points: 1 },
      { text: "Usar o que já tenho e me sentir estilosa", points: 2 },
      { text: "Comprar com mais consciência e sem culpa", points: 3 },
      { text: "Ser admirada pela imagem que transmito", points: 4 },
      { text: "Resgatar peças esquecidas e criar novos looks com estilo", points: 5 },
    ],
  },
];

const insertOptions = async () => {
  console.log("🚀 Inserindo opções das questões estratégicas...");

  try {
    for (const questionData of questionsWithOptions) {
      const questionId = questionUUIDs[questionData.order_index];
      
      console.log(`📝 Inserindo opções para questão ${questionData.order_index}...`);
      
      for (const [index, option] of questionData.options.entries()) {
        // Gerar UUID válido para cada opção
        const optionId = randomUUID();
        
        const { error: optionError } = await supabase
          .from("question_options")
          .upsert(
            {
              id: optionId,
              question_id: questionId,
              text: option.text,
              style_code: "",
              points: option.points,
              order_index: index + 1,
            },
            {
              onConflict: "id",
            }
          );

        if (optionError) {
          console.error(
            `❌ Erro ao inserir opção ${index + 1} da questão ${questionData.order_index}:`,
            optionError
          );
        } else {
          console.log(`✅ Opção ${index + 1} da questão ${questionData.order_index} inserida`);
        }
      }
      
      console.log(`✅ ${questionData.options.length} opções inseridas para questão ${questionData.order_index}`);
    }

    console.log("🎉 Todas as opções foram inseridas com sucesso!");
    return true;
  } catch (error) {
    console.error("❌ Erro geral ao inserir opções:", error);
    return false;
  }
};

// Executar a função
const runUpdate = async () => {
  console.log('🚀 Iniciando inserção das opções das questões estratégicas...');
  
  try {
    const success = await insertOptions();
    
    if (success) {
      console.log('🎉 SUCESSO: Opções inseridas com sucesso!');
      console.log('🌐 Recarregue o site para ver as mudanças!');
      process.exit(0);
    } else {
      console.log('❌ ERRO: Falha ao inserir opções');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ ERRO CRÍTICO:', error);
    process.exit(1);
  }
};

console.log('🔧 Script de opções iniciado...');
runUpdate().catch((error) => {
  console.error('❌ Erro na execução:', error);
  process.exit(1);
});
