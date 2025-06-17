import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rbnqfgdpcktwjwrfkgby.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibnFmZ2RwY2t0d2p3cmZrZ2J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MDI4NjUsImV4cCI6MjA1MDQ3ODg2NX0.Rz3BHoEtfJjRJnJpVFFAEczd9jd2gTJQJh8vSw5-c0c";

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixFirstStrategicTitle() {
  try {
    console.log("🔄 Corrigindo título da primeira questão estratégica...");

    // Corrigir o título da primeira questão estratégica
    const { data, error } = await supabase
      .from("quiz_questions")
      .update({
        title: "Como você se vê hoje?",
      })
      .eq("id", "550e8400-e29b-41d4-a716-446655440012");

    if (error) {
      console.error("❌ Erro ao atualizar título:", error);
      return;
    }

    console.log(
      "✅ Título da primeira questão estratégica corrigido com sucesso!"
    );

    // Verificar a correção
    const { data: updatedQuestion, error: fetchError } = await supabase
      .from("quiz_questions")
      .select("*")
      .eq("id", "550e8400-e29b-41d4-a716-446655440012")
      .single();

    if (fetchError) {
      console.error("❌ Erro ao verificar correção:", fetchError);
      return;
    }

    console.log("📋 Questão atualizada:");
    console.log(`   ID: ${updatedQuestion.id}`);
    console.log(`   Título: ${updatedQuestion.title}`);
    console.log(`   Tipo: ${updatedQuestion.type}`);
  } catch (error) {
    console.error("❌ Erro geral:", error);
  }
}

fixFirstStrategicTitle();
