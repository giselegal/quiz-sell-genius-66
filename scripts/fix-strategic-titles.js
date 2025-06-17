#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://txqljpitotmcxntprxiu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cWxqcGl0b3RtY3hudHByeGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NjI3MzQsImV4cCI6MjA2NTQzODczNH0.rHGZV47KUnSJ0fDNXbL-OjuB50BsuzT2IeO_LL-P8ok';

const supabase = createClient(supabaseUrl, supabaseKey);

// Títulos corretos e limpos para as questões estratégicas
const correctTitles = [
  {
    id: '550e8400-e29b-41d4-a716-446655440012',
    title: 'Página de Transição - Enquanto calculamos o seu resultado... Queremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa. A ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir com mais intenção, leveza e autenticidade. Responda com sinceridade. Isso é só entre você e a sua nova versão.'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440013', 
    title: 'Como você se vê hoje? - Quando você se olha no espelho, como se sente com sua imagem pessoal atualmente?'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440014',
    title: 'O que mais te desafia na hora de se vestir?'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440015',
    title: 'Com que frequência você se pega pensando: "Com que roupa eu vou?" — mesmo com o guarda-roupa cheio?'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440016',
    title: 'Pense no quanto você já gastou com roupas que não usa... Você acredita que ter acesso a um material estratégico, direto ao ponto, que te ensina a aplicar seu estilo com clareza, faria diferença?'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440017',
    title: 'Se esse conteúdo completo custasse R$ 97,00 — incluindo Guia de Estilo, bônus especiais e um passo a passo prático para transformar sua imagem pessoal — você consideraria um bom investimento?'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440018',
    title: 'Qual desses resultados você mais gostaria de alcançar com os Guias de Estilo e Imagem?'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440019',
    title: 'Mensagem de Finalização - Obrigada por compartilhar. Chegar até aqui já mostra que você está pronta para se olhar com mais amor, se vestir com mais intenção e deixar sua imagem comunicar quem você é de verdade — com leveza, presença e propósito. Agora, é hora de revelar o seu Estilo Predominante — e os seus Estilos Complementares. E, mais do que isso, uma oportunidade real de aplicar o seu Estilo com leveza e confiança — todos os dias. Ah, e lembra do valor que mencionamos? Prepare-se para uma surpresa: o que você vai receber vale muito mais do que imagina — e vai custar muito menos do que você esperava.'
  }
];

async function fixQuestionTitles() {
  console.log('📝 Corrigindo títulos das questões estratégicas...');
  
  try {
    for (const question of correctTitles) {
      const { error } = await supabase
        .from('quiz_questions')
        .update({ 
          title: question.title
        })
        .eq('id', question.id);
      
      if (error) {
        console.error(`❌ Erro ao atualizar questão ${question.id}:`, error);
      } else {
        console.log(`✅ Questão ${question.id} atualizada`);
        console.log(`   Novo título: "${question.title.substring(0, 80)}..."`);
      }
    }
    
    console.log('\n🎉 Títulos corrigidos com sucesso!');
    
  } catch (err) {
    console.error('❌ Erro geral:', err);
  }
}

fixQuestionTitles();
