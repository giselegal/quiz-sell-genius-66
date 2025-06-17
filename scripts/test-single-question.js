#!/usr/bin/env node

console.log("🔧 Script iniciado...");

import { createClient } from "@supabase/supabase-js";

console.log("📦 Supabase importado com sucesso");

const supabaseUrl = "https://txqljpitotmcxntprxiu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cWxqcGl0b3RtY3hudHByeGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NjI3MzQsImV4cCI6MjA2NTQzODczNH0.rHGZV47KUnSJ0fDNXbL-OjuB50BsuzT2IeO_LL-P8ok";

const supabase = createClient(supabaseUrl, supabaseKey);

console.log("🔗 Cliente Supabase criado");

// Primeiro, vamos inserir apenas uma questão para testar
const testQuestion = {
  order_index: 12,
  type: "text",
  title: "Etapa de Transição 1: Página Transição antes do resultado e oferta",
  description:
    "🕐 Enquanto calculamos o seu resultado...\nQueremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa.\nA ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir com mais intenção, leveza e autenticidade.\n💬 Responda com sinceridade. Isso é só entre você e a sua nova versão.",
  is_transition: true,
  options: [],
};

console.log("📝 Dados da questão teste preparados");

async function insertSingleQuestion() {
  try {
    console.log("🚀 Iniciando inserção da questão teste...");

    const quizId = "550e8400-e29b-41d4-a716-446655440000";

    const { data: question, error: questionError } = await supabase
      .from("quiz_questions")
      .upsert(
        {
          id: `q${testQuestion.order_index}`,
          quiz_id: quizId,
          title: testQuestion.title,
          subtitle: testQuestion.subtitle || null,
          description: testQuestion.description || null,
          type: testQuestion.type,
          order_index: testQuestion.order_index,
          required_selections: 1,
          is_transition: testQuestion.is_transition || false,
          button_text: testQuestion.button_text || null,
          active: true,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "id",
        }
      );

    if (questionError) {
      console.error("❌ Erro ao inserir questão:", questionError);
      return false;
    }

    console.log("✅ Questão teste inserida com sucesso!");
    console.log("📊 Resultado:", question);
    return true;
  } catch (error) {
    console.error("❌ Erro crítico:", error);
    return false;
  }
}

console.log("🏃‍♂️ Executando teste...");
insertSingleQuestion()
  .then((success) => {
    if (success) {
      console.log("🎉 TESTE PASSOU!");
    } else {
      console.log("❌ TESTE FALHOU!");
    }
  })
  .catch((error) => {
    console.error("❌ Erro na execução do teste:", error);
  });
