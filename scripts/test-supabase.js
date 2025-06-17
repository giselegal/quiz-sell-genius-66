#!/usr/bin/env node

/**
 * Script simples para testar a conexão com Supabase
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://txqljpitotmcxntprxiu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cWxqcGl0b3RtY3hudHByeGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NjI3MzQsImV4cCI6MjA2NTQzODczNH0.rHGZV47KUnSJ0fDNXbL-OjuB50BsuzT2IeO_LL-P8ok';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔗 Testando conexão com Supabase...');

async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Erro na conexão:', error);
      return false;
    }
    
    console.log('✅ Conexão com Supabase funcionando!');
    console.log('📊 Dados de teste:', data);
    return true;
  } catch (err) {
    console.error('❌ Erro crítico:', err);
    return false;
  }
}

testConnection();
