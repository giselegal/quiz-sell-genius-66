#!/usr/bin/env node

console.log('🏷️ Preparando componentes para Lovable...');

import fs from 'fs';
import path from 'path';

const createLovableConfig = () => {
  try {
    console.log('📋 Verificando configuração do Lovable...\n');
    
    // Verificar arquivo .lovable
    if (fs.existsSync('.lovable')) {
      console.log('✅ Arquivo .lovable encontrado');
      const config = JSON.parse(fs.readFileSync('.lovable', 'utf8'));
      console.log('   - Auto-sync from GitHub:', config.github?.autoSyncFromGithub ? '✅' : '❌');
      console.log('   - Auto-push to GitHub:', config.github?.autoPushToGithub ? '✅' : '❌');
    } else {
      console.log('❌ Arquivo .lovable não encontrado');
    }
    
    // Verificar workflow
    if (fs.existsSync('.github/workflows/lovable-deploy.yml')) {
      console.log('✅ Workflow GitHub Actions configurado');
    } else {
      console.log('❌ Workflow não encontrado');
    }
    
    // Criar diretório lovable
    if (!fs.existsSync('src/components/lovable')) {
      fs.mkdirSync('src/components/lovable', { recursive: true });
      console.log('✅ Diretório lovable criado');
    }
    
    console.log('\n🎉 Preparação concluída!');
    console.log('📝 Próximos passos:');
    console.log('1. Configure LOVABLE_TOKEN no GitHub');
    console.log('2. Conecte repositório no Lovable Studio');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
};

createLovableConfig();
