#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://txqljpitotmcxntprxiu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cWxqcGl0b3RtY3hudHByeGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NjI3MzQsImV4cCI6MjA2NTQzODczNH0.rHGZV47KUnSJ0fDNXbL-OjuB50BsuzT2IeO_LL-P8ok';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStrategicQuestions() {
  console.log('🔍 Verificando questões estratégicas...');
  
  try {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .gte('order_index', 12)
      .order('order_index', { ascending: true });
    
    if (error) {
      console.error('❌ Erro ao buscar questões:', error);
      return;
    }
    
    console.log('📊 Questões estratégicas encontradas:');
    data.forEach((q, index) => {
      console.log(`\n${index + 1}. [${q.order_index}] ${q.id}`);
      console.log(`   Título: ${q.title}`);
      console.log(`   Tipo: ${q.type}`);
      console.log(`   Ativa: ${q.active}`);
      
      // Verificar se o título contém texto de comando indevido
      const hasCommandText = q.title.includes('Etapa de Transição') || 
                           q.title.includes('🕐 Enquanto calculamos') ||
                           q.title.includes(' - ');
      
      if (hasCommandText) {
        console.log('   ⚠️  PROBLEMA: Título contém texto de comando ou separadores');
      }
    });
    
  } catch (err) {
    console.error('❌ Erro:', err);
  }
}

checkStrategicQuestions();
