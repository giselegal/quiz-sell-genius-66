#!/usr/bin/env node

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://txqljpitotmcxntprxiu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cWxqcGl0b3RtY3hudHByeGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NjI3MzQsImV4cCI6MjA2NTQzODczNH0.rHGZV47KUnSJ0fDNXbL-OjuB50BsuzT2IeO_LL-P8ok";

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTableStructure() {
  try {
    console.log("🔍 Verificando estrutura da tabela quiz_questions...");

    const { data, error } = await supabase
      .from("quiz_questions")
      .select("*")
      .limit(1);

    if (error) {
      console.error("❌ Erro:", error);
      return;
    }

    if (data && data.length > 0) {
      console.log("📊 Estrutura da tabela (baseado no primeiro registro):");
      console.log("📝 Colunas disponíveis:", Object.keys(data[0]));
      console.log("📄 Exemplo de registro:", data[0]);
    } else {
      console.log("📋 Tabela vazia");
    }
  } catch (error) {
    console.error("❌ Erro crítico:", error);
  }
}

checkTableStructure();
