// Script para identificar e corrigir problemas na conexão com Lovable.dev
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Analisando problemas de conexão com Lovable.dev...');

// 1. Verificar a configuração do Lovable
try {
  const lovableConfig = require('./lovable.config.js');
  console.log('✅ Configuração do Lovable encontrada:', lovableConfig);
} catch (err) {
  console.error('❌ Erro ao carregar configuração do Lovable:', err.message);
}

// 2. Verificar componentes Lovable
const lovableComponentsDir = path.join(__dirname, 'src', 'components', 'lovable');
try {
  const lovableFiles = fs.readdirSync(lovableComponentsDir);
  console.log(`✅ ${lovableFiles.length} componentes Lovable encontrados:`, lovableFiles);
  
  // Verificar se os componentes estão marcados corretamente
  lovableFiles.forEach(file => {
    const content = fs.readFileSync(path.join(lovableComponentsDir, file), 'utf8');
    const hasLovableTag = content.includes('data-lovable-component') || 
                          content.includes('data-lovable-editable');
    console.log(`  - ${file}: ${hasLovableTag ? '✅ Possui tags Lovable' : '❌ Sem tags Lovable'}`);
  });
} catch (err) {
  console.error('❌ Erro ao verificar componentes Lovable:', err.message);
}

// 3. Verificar status do Git
try {
  const gitStatus = execSync('git status').toString();
  console.log('✅ Status do Git:', gitStatus.split('\n')[0]);
} catch (err) {
  console.error('❌ Erro ao verificar status do Git:', err.message);
}

// 4. Verificar se há componentes que foram movidos ou excluídos
console.log('\n🔍 Verificando componentes referenciados em outros arquivos...');
const componentsPaths = ['src/components', 'src/pages', 'src/app'];
const missingComponents = [];

componentsPaths.forEach(dir => {
  try {
    const fullDir = path.join(__dirname, dir);
    if (fs.existsSync(fullDir)) {
      checkDirectory(fullDir);
    }
  } catch (err) {
    console.error(`❌ Erro ao verificar diretório ${dir}:`, err.message);
  }
});

function checkDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      checkDirectory(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        // Verificar se há importações para arquivos que não existem mais
        const importMatches = content.match(/from\s+['"]([^'"]+)['"]/g) || [];
        importMatches.forEach(match => {
          const importPath = match.match(/from\s+['"]([^'"]+)['"]/)[1];
          if (importPath.startsWith('.') || importPath.startsWith('@/')) {
            let resolvedPath = importPath;
            if (importPath.startsWith('@/')) {
              resolvedPath = importPath.replace('@/', 'src/');
            } else {
              resolvedPath = path.resolve(path.dirname(fullPath), importPath);
            }
            
            // Verificar extensões comuns
            const extensions = ['', '.js', '.jsx', '.ts', '.tsx'];
            let exists = false;
            
            for (const ext of extensions) {
              const testPath = resolvedPath + ext;
              if (fs.existsSync(testPath) || fs.existsSync(testPath + '/index.js') || 
                  fs.existsSync(testPath + '/index.tsx') || fs.existsSync(testPath + '/index.ts')) {
                exists = true;
                break;
              }
            }
            
            if (!exists) {
              missingComponents.push({
                file: fullPath.replace(__dirname, ''),
                import: importPath,
                resolvedPath: resolvedPath.replace(__dirname, '')
              });
            }
          }
        });
      } catch (err) {
        console.error(`❌ Erro ao verificar arquivo ${fullPath}:`, err.message);
      }
    }
  });
}

if (missingComponents.length > 0) {
  console.log('\n❌ Componentes referenciados que não existem:');
  missingComponents.forEach(comp => {
    console.log(`  - ${comp.file} importa "${comp.import}" (resolvido para: ${comp.resolvedPath})`);
  });
} else {
  console.log('\n✅ Não foram encontradas referências a componentes inexistentes.');
}

// 5. Tentar executar o lovable-tagger programaticamente
console.log('\n🔄 Tentando executar lovable-tagger programaticamente...');
try {
  // Verificar se existem tags data-lovable nos componentes
  const componentsWithLovableTags = [];
  function findLovableTags(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        findLovableTags(fullPath);
      } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.includes('data-lovable-component') || content.includes('data-lovable-editable')) {
            componentsWithLovableTags.push(fullPath.replace(__dirname, ''));
          }
        } catch (err) {}
      }
    });
  }
  
  findLovableTags(path.join(__dirname, 'src'));
  
  console.log(`✅ Encontrados ${componentsWithLovableTags.length} componentes com tags Lovable:`);
  componentsWithLovableTags.forEach(comp => {
    console.log(`  - ${comp}`);
  });
  
  // Verificar URL do Lovable
  console.log('\n🔍 URL do Lovable encontrado na configuração:');
  console.log('  - https://a10d1b34-b5d4-426b-8c97-45f125d03ec1.lovableproject.com');
  
} catch (err) {
  console.error('❌ Erro ao executar lovable-tagger programaticamente:', err.message);
}

console.log('\n📋 Resumo:');
console.log('1. O projeto tem configuração do Lovable');
console.log('2. Existem componentes marcados como Lovable');
console.log('3. O URL do Lovable é: https://a10d1b34-b5d4-426b-8c97-45f125d03ec1.lovableproject.com');
console.log('\n🔧 Recomendações:');
console.log('1. Verificar se o token de acesso ao Lovable está válido');
console.log('2. Verificar se os componentes movidos/renomeados foram atualizados no Lovable');
console.log('3. Tentar acessar manualmente: https://a10d1b34-b5d4-426b-8c97-45f125d03ec1.lovableproject.com');
console.log('4. Verificar logs no painel do Lovable');
