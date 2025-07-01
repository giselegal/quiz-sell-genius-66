
#!/usr/bin/env node

/**
 * Script para sincronização manual com Lovable
 * Execute com: node scripts/manual-sync.js
 */

const fs = require('fs');
const { exec } = require('child_process');

console.log('🔄 Iniciando sincronização manual com Lovable...');

async function manualSync() {
  try {
    // Passo 1: Preparar componentes
    console.log('📋 Preparando componentes...');
    await new Promise((resolve, reject) => {
      exec('node scripts/prepare-lovable.js', (error, stdout, stderr) => {
        if (error) reject(error);
        else {
          console.log(stdout);
          resolve();
        }
      });
    });

    // Passo 2: Testar configuração
    console.log('🧪 Testando configuração...');
    await new Promise((resolve, reject) => {
      exec('node scripts/test-sync.js', (error, stdout, stderr) => {
        if (error) reject(error);
        else {
          console.log(stdout);
          resolve();
        }
      });
    });

    // Passo 3: Atualizar manifesto
    const manifest = {
      lastSync: new Date().toISOString(),
      method: 'manual',
      status: 'completed',
      files: fs.existsSync('./lovable-components.json') ? 
        JSON.parse(fs.readFileSync('./lovable-components.json', 'utf8')).components : 0
    };

    fs.writeFileSync('./last-sync.json', JSON.stringify(manifest, null, 2));

    console.log('✅ Sincronização manual concluída!');
    console.log('📊 Status salvo em last-sync.json');
    
  } catch (error) {
    console.error('❌ Erro na sincronização:', error.message);
    process.exit(1);
  }
}

manualSync();
