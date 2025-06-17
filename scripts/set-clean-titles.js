#!/usr/bin/env node

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://txqljpitotmcxntprxiu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cWxqcGl0b3RtY3hudHByeGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NjI3MzQsImV4cCI6MjA2NTQzODczNH0.rHGZV47KUnSJ0fDNXbL-OjuB50BsuzT2IeO_LL-P8ok";

const supabase = createClient(supabaseUrl, supabaseKey);

// Títulos limpos e apropriados para display na interface
const cleanTitles = [
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    title:
      "🕐 Enquanto calculamos o seu resultado... queremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa!",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440013",
    title: "Como você se vê hoje?",
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
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440017",
    title:
      "Se esse conteúdo completo custasse R$ 97,00, você consideraria um bom investimento?",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440018",
    title:
      "Qual desses resultados você mais gostaria de alcançar com os Guias de Estilo e Imagem?",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440019",
    title: "Obrigada por compartilhar! 💖",
  },
];

async function setCleanTitles() {
  console.log(
    "✨ Definindo títulos limpos e elegantes para as questões estratégicas..."
  );

  try {
    for (const question of cleanTitles) {
      const { error } = await supabase
        .from("quiz_questions")
        .update({
          title: question.title,
        })
        .eq("id", question.id);

      if (error) {
        console.error(`❌ Erro ao atualizar questão ${question.id}:`, error);
      } else {
        console.log(`✅ ${question.id}`);
        console.log(`   📝 "${question.title}"`);
      }
    }

    console.log("\n🎉 Títulos elegantes definidos com sucesso!");
    console.log(
      "🚀 Agora as questões estratégicas estão com layout limpo e profissional!"
    );
  } catch (err) {
    console.error("❌ Erro geral:", err);
  }
}

setCleanTitles();
