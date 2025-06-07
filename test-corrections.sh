#!/bin/bash

echo "🔍 TESTE DE CORREÇÕES - RESULTADO PAGE"
echo "======================================"

# Verificar se os arquivos corrigidos existem
echo "1. Verificando arquivos corrigidos..."
echo "   - styleConfig.ts:"
if [ -f "src/data/styleConfig.ts" ]; then
    echo "   ✅ Arquivo existe"
    echo "   📋 Categorias disponíveis:"
    grep -o '"[^"]*":' src/data/styleConfig.ts | tr -d '":' | sed 's/^/      - /'
else
    echo "   ❌ Arquivo não encontrado"
fi

echo -e "\n   - ResultPage.tsx:"
if [ -f "src/pages/ResultPage.tsx" ]; then
    echo "   ✅ Arquivo existe"
    echo "   🔍 Verificação de segurança adicionada:"
    grep -n "styleConfig\[category" src/pages/ResultPage.tsx | sed 's/^/      /'
else
    echo "   ❌ Arquivo não encontrado"
fi

echo -e "\n2. Verificando tipos..."
if [ -f "src/types/quiz.ts" ]; then
    echo "   📋 Categorias definidas em StyleResult:"
    grep -A1 "category:" src/types/quiz.ts | sed 's/^/      /'
else
    echo "   ❌ Arquivo de tipos não encontrado"
fi

echo -e "\n3. Testando build..."
npm run build:hostinger 2>&1 | tail -10

echo -e "\n✅ Teste de correções concluído!"
echo "💡 As correções aplicadas:"
echo "   • Adicionadas categorias faltantes no styleConfig"
echo "   • Adicionada verificação de segurança no ResultPage"
echo "   • Prevenção de erro quando categoria não existe"
