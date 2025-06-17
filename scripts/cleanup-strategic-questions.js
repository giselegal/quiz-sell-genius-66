#!/usr/bin/env node

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://txqljpitotmcxntprxiu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cWxqcGl0b3RtY3hudHByeGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NjI3MzQsImV4cCI6MjA2NTQzODczNH0.rHGZV47KUnSJ0fDNXbL-OjuB50BsuzT2IeO_LL-P8ok";

const supabase = createClient(supabaseUrl, supabaseKey);

// IDs das questões antigas para deletar
const oldQuestionIds = [
  "cccccccc-cccc-cccc-cccc-cccccccccccc",
  "dddddddd-dddd-dddd-dddd-dddddddddddd",
  "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
  "ffffffff-ffff-ffff-ffff-ffffffffffff",
  "10101010-1010-1010-1010-101010101010",
  "11110000-1111-0000-1111-000011110000",
];

// Dados corretos para as questões estratégicas
const correctQuestions = [
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    title: "Página de Transição",
    description:
      "🕐 Enquanto calculamos o seu resultado...\nQueremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa.\nA ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir com mais intenção, leveza e autenticidade.\n💬 Responda com sinceridade. Isso é só entre você e a sua nova versão.",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440013",
    title: "Como você se vê hoje?",
    subtitle:
      "Quando você se olha no espelho, como se sente com sua imagem pessoal atualmente?",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440014",
    title: "O que mais te desafia na hora de se vestir?",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440015",
    title:
      'Com que frequência você se pega pensando: "Com que roupa eu vou?" — mesmo com o guarda-roupa cheio?',
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440016",
    title:
      "Você acredita que ter acesso a um material estratégico faria diferença?",
    subtitle:
      "Pense no quanto você já gastou com roupas que não usa ou que não representam quem você é...",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440017",
    title:
      "Se esse conteúdo completo custasse R$ 97,00, você consideraria um bom investimento?",
    subtitle:
      "Incluindo Guia de Estilo, bônus especiais e um passo a passo prático para transformar sua imagem pessoal",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440018",
    title:
      "Qual desses resultados você mais gostaria de alcançar com os Guias de Estilo e Imagem?",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440019",
    title: "Mensagem de Finalização",
    description:
      "Obrigada por compartilhar.\n\nChegar até aqui já mostra que você está pronta para se olhar com mais amor, se vestir com mais intenção e deixar sua imagem comunicar quem você é de verdade — com leveza, presença e propósito.\n\nAgora, é hora de revelar o seu Estilo Predominante — e os seus Estilos Complementares.\nE, mais do que isso, uma oportunidade real de aplicar o seu Estilo com leveza e confiança — todos os dias.\n\nAh, e lembra do valor que mencionamos?\nPrepare-se para uma surpresa: o que você vai receber vale muito mais do que imagina — e vai custar muito menos do que você esperava.",
  },
];

async function cleanupAndFixQuestions() {
  console.log("🧹 Limpando questões duplicadas e corrigindo títulos...");

  try {
    // 1. Deletar questões antigas
    console.log("🗑️  Deletando questões antigas...");
    for (const id of oldQuestionIds) {
      const { error } = await supabase
        .from("quiz_questions")
        .delete()
        .eq("id", id);

      if (error) {
        console.error(`❌ Erro ao deletar questão ${id}:`, error);
      } else {
        console.log(`✅ Questão antiga ${id} deletada`);
      }
    }

    // 2. Corrigir títulos das questões estratégicas
    console.log("\n📝 Corrigindo títulos das questões estratégicas...");
    for (const question of correctQuestions) {
      const updateData = {
        title: question.title,
        updated_at: new Date().toISOString(),
      };

      if (question.subtitle) {
        updateData.subtitle = question.subtitle;
      }

      if (question.description) {
        updateData.description = question.description;
      }

      const { error } = await supabase
        .from("quiz_questions")
        .update(updateData)
        .eq("id", question.id);

      if (error) {
        console.error(`❌ Erro ao atualizar questão ${question.id}:`, error);
      } else {
        console.log(
          `✅ Questão ${question.id} atualizada: "${question.title}"`
        );
      }
    }

    console.log("\n🎉 Limpeza e correção concluídas!");
  } catch (err) {
    console.error("❌ Erro geral:", err);
  }
}

cleanupAndFixQuestions();
