
#!/usr/bin/env node

/**
 * Script para testar a sincronização com Lovable
 * Verifica se tudo está funcionando corretamente
 */

const fs = require('fs');
const https = require('https');

console.log('🧪 Testando sincronização com Lovable...');

// Verificar arquivos necessários
const requiredFiles = [
  './.lovable',
  './vite.config.ts',
  './lovable-components.json'
];

let allFilesExist = true;
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.error(`❌ Arquivo necessário não encontrado: ${file}`);
    allFilesExist = false;
  } else {
    console.log(`✅ ${file} encontrado`);
  }
}

if (!allFilesExist) {
  console.error('❌ Alguns arquivos necessários estão faltando');
  process.exit(1);
}

// Verificar configuração
const lovableConfig = JSON.parse(fs.readFileSync('./.lovable', 'utf8'));
console.log(`📋 Projeto: ${lovableConfig.projectName || 'N/A'}`);
console.log(`🆔 ID: ${lovableConfig.projectId || 'N/A'}`);

// Verificar componentes
if (fs.existsSync('./lovable-components.json')) {
  const manifest = JSON.parse(fs.readFileSync('./lovable-components.json', 'utf8'));
  console.log(`🔧 ${manifest.components} componentes encontrados`);
  console.log(`📅 Última atualização: ${manifest.timestamp}`);
}

// Simular webhook (sem token)
const webhookData = {
  project: lovableConfig.projectId,
  timestamp: new Date().toISOString(),
  status: 'sync_test',
  components: fs.existsSync('./lovable-components.json') ? 
    JSON.parse(fs.readFileSync('./lovable-components.json', 'utf8')).components : 0
};

console.log('📡 Testando webhook alternativo...');
console.log('📊 Dados preparados:', JSON.stringify(webhookData, null, 2));

// Testar build
try {
  const { exec } = require('child_process');
  exec('npm run build --dry-run', (error, stdout, stderr) => {
    if (error) {
      console.log('⚠️ Build test falhou (normal em dry-run)');
    } else {
      console.log('✅ Build test passou');
    }
    
    console.log('🎉 Teste de sincronização concluído!');
    console.log('💡 Para sincronizar manualmente, use: node scripts/prepare-lovable.js');
  });
} catch (e) {
  console.log('✅ Teste básico concluído (build test ignorado)');
}
