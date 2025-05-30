#!/bin/bash

# Script para corrigir e verificar problemas de conexão do Lovable.dev

echo "🔍 Verificando a configuração do Lovable..."

# Verificar se o arquivo lovable.config.js existe
if [ -f "lovable.config.js" ]; then
  echo "✅ Arquivo lovable.config.js encontrado"
  cat lovable.config.js
else
  echo "❌ Arquivo lovable.config.js não encontrado"
fi

echo -e "\n🔍 Verificando componentes marcados como 'lovable'..."

# Contar quantos arquivos têm a tag data-lovable-component
LOVABLE_FILES=$(grep -r "data-lovable-component" src --include="*.tsx" --include="*.jsx" | wc -l)
echo "Encontrados $LOVABLE_FILES arquivos com tag data-lovable-component"

# Verificar se o acesso está funcionando
echo -e "\n🔍 Verificando acesso ao Lovable.dev..."
curl -s -I "https://a10d1b34-b5d4-426b-8c97-45f125d03ec1.lovableproject.com" | head -1

echo -e "\n🔧 Resolvendo problemas:"
echo "1. Verificando se script do Lovable está no index.html:"
grep -q "cdn.gpteng.co/gptengineer.js" index.html && echo "✅ Script lovable encontrado no index.html" || echo "❌ Script lovable NÃO encontrado no index.html"

echo -e "\n2. Verificando ResultPageWrapper.tsx:"
ls -la src/components/ResultPageWrapper.tsx && echo "✅ ResultPageWrapper.tsx existe" || echo "❌ ResultPageWrapper.tsx não existe"

echo -e "\n3. Verificando a URL no LovableClientProvider:"
grep -A 2 "apiBaseUrl" src/components/LovableClientProvider.tsx

echo -e "\n4. Verificando compilação do projeto:"
npm run build:dev || echo "❌ Falha na compilação do projeto"

echo -e "\n✅ Verificação concluída. Por favor, analise o relatório acima."
