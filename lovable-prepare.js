#!/usr/bin/env node

/**
 * Script personalizado para preparar componentes Lovable
 * Substitui o lovable-tagger que não está funcionando
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🏷️ Preparando componentes para Lovable...');

// Função principal
async function main() {

// Função para marcar componentes React como compatíveis com Lovable
function tagLovableComponents() {
  const srcDir = path.join(__dirname, 'src');
  const componentsDir = path.join(srcDir, 'components');
  
  if (!fs.existsSync(componentsDir)) {
    console.log('❌ Diretório de componentes não encontrado');
    return;
  }

  // Criar diretório lovable se não existir
  const lovableDir = path.join(componentsDir, 'lovable');
  if (!fs.existsSync(lovableDir)) {
    fs.mkdirSync(lovableDir, { recursive: true });
    console.log('✅ Diretório lovable criado');
  }

  // Criar arquivo de configuração dos componentes Lovable
  const configContent = `// Componentes marcados para edição no Lovable
export const LOVABLE_COMPONENTS = {
  QuizCover: '/src/components/quiz/QuizCover.tsx',
  QuizQuestion: '/src/components/quiz/QuizQuestion.tsx', 
  QuizLogic: '/src/components/quiz/QuizLogic.tsx',
  ResultPageEditor: '/src/components/quiz/ResultPageEditor.tsx',
  EnchantedEffects: '/src/components/effects/EnchantedEffects.tsx'
};

export default LOVABLE_COMPONENTS;
`;

  fs.writeFileSync(path.join(lovableDir, 'config.js'), configContent);
  console.log('✅ Configuração de componentes Lovable criada');
}

// Função para verificar configuração do Lovable
function checkLovableConfig() {
  const lovableFile = path.join(__dirname, '.lovable');
  
  if (!fs.existsSync(lovableFile)) {
    console.log('❌ Arquivo .lovable não encontrado');
    return false;
  }

  try {
    const config = JSON.parse(fs.readFileSync(lovableFile, 'utf8'));
    console.log('✅ Configuração .lovable válida');
    console.log('   - Auto-sync from GitHub:', config.github?.autoSyncFromGithub ? '✅' : '❌');
    console.log('   - Auto-push to GitHub:', config.github?.autoPushToGithub ? '✅' : '❌');
    console.log('   - Branch:', config.github?.branch || 'não definida');
    return true;
  } catch (error) {
    console.log('❌ Arquivo .lovable inválido:', error.message);
    return false;
  }
}

// Função para verificar workflow do GitHub Actions
function checkGitHubWorkflow() {
  const workflowFile = path.join(__dirname, '.github/workflows/lovable-deploy.yml');
  
  if (!fs.existsSync(workflowFile)) {
    console.log('❌ Workflow lovable-deploy.yml não encontrado');
    return false;
  }

  console.log('✅ Workflow GitHub Actions configurado');
  return true;
}

// Executar verificações
console.log('\n📋 Verificando configuração do Lovable...\n');

tagLovableComponents();
const hasValidConfig = checkLovableConfig();
const hasWorkflow = checkGitHubWorkflow();

console.log('\n📊 Resumo da configuração:');
console.log('- Componentes preparados: ✅');
console.log('- Arquivo .lovable:', hasValidConfig ? '✅' : '❌');
console.log('- Workflow GitHub:', hasWorkflow ? '✅' : '❌');

if (hasValidConfig && hasWorkflow) {
  console.log('\n🎉 Configuração do Lovable está completa!');
  console.log('\n📝 Próximos passos:');
  console.log('1. Verifique se o token LOVABLE_TOKEN está configurado no GitHub');
  console.log('2. Conecte o repositório no Lovable Studio');
  console.log('3. Teste a sincronização fazendo uma alteração no Lovable Studio');
} else {
  console.log('\n⚠️ Configuração incompleta. Verificar problemas identificados.');
}

}

// Executar função principal
main().catch(console.error);
