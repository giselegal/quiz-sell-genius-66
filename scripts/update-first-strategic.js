const supabaseUrl = "https://rbnqfgdpcktwjwrfkgby.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibnFmZ2RwY2t0d2p3cmZrZ2J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MDI4NjUsImV4cCI6MjA1MDQ3ODg2NX0.Rz3BHoEtfJjRJnJpVFFAEczd9jd2gTJQJh8vSw5-c0c";

async function updateFirstStrategicTitle() {
  try {
    console.log("🔄 Atualizando título da primeira questão estratégica...");

    const response = await fetch(
      `${supabaseUrl}/rest/v1/quiz_questions?id=eq.550e8400-e29b-41d4-a716-446655440012`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
          apikey: supabaseKey,
        },
        body: JSON.stringify({
          title: "Como você se vê hoje?",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("✅ Título atualizado com sucesso!");

    // Verificar a atualização
    const checkResponse = await fetch(
      `${supabaseUrl}/rest/v1/quiz_questions?id=eq.550e8400-e29b-41d4-a716-446655440012&select=*`,
      {
        headers: {
          Authorization: `Bearer ${supabaseKey}`,
          apikey: supabaseKey,
        },
      }
    );

    if (checkResponse.ok) {
      const data = await checkResponse.json();
      if (data.length > 0) {
        console.log("📋 Questão atualizada:");
        console.log(`   ID: ${data[0].id}`);
        console.log(`   Título: ${data[0].title}`);
        console.log(`   Tipo: ${data[0].type}`);
      }
    }
  } catch (error) {
    console.error("❌ Erro ao atualizar:", error);
  }
}

updateFirstStrategicTitle();
