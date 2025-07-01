#!/bin/bash

echo "🚀 REATIVAÇÃO LOVABLE - DIAGNÓSTICO E CORREÇÃO"
echo "=============================================="

# 1. Verificar conectividade
echo "1️⃣ Testando conectividade..."
if curl -s --head https://lovable.dev > /dev/null; then
    echo "✅ lovable.dev acessível"
else
    echo "❌ lovable.dev inacessível"
fi

if curl -s --head https://api.lovable.dev > /dev/null; then
    echo "✅ api.lovable.dev acessível"
else
    echo "❌ api.lovable.dev inacessível - PROBLEMA PRINCIPAL"
fi

# 2. Verificar última sincronização
echo -e "\n2️⃣ Verificando última sincronização..."
LAST_UPDATE=$(grep -o '"lastUpdate": "[^"]*"' .lovable | cut -d'"' -f4)
echo "📅 Última atualização: $LAST_UPDATE"

# 3. Verificar workflows GitHub
echo -e "\n3️⃣ Verificando workflows GitHub..."
if [ -f ".github/workflows/lovable-sync.yml" ]; then
    echo "✅ Workflow lovable-sync.yml encontrado"
else
    echo "❌ Workflow lovable-sync.yml não encontrado"
fi

# 4. Verificar configurações
echo -e "\n4️⃣ Verificando configurações..."
if [ -f ".lovable" ]; then
    echo "✅ Arquivo .lovable presente"
    echo "📋 Auto-sync GitHub: $(grep -o '"autoPushToGithub": [^,]*' .lovable | cut -d':' -f2 | tr -d ' ')"
    echo "📋 Branch: $(grep -o '"branch": "[^"]*"' .lovable | cut -d'"' -f4)"
else
    echo "❌ Arquivo .lovable não encontrado"
fi

# 5. Soluções recomendadas
echo -e "\n🔧 SOLUÇÕES RECOMENDADAS:"
echo "========================="
echo "1. Verificar se o projeto está ativo no Lovable Studio:"
echo "   → Acesse: https://lovable.dev"
echo "   → Abra: Quiz Sell Genius"
echo "   → Settings → GitHub → Verificar auto-sync"
echo ""
echo "2. Reconfigurar GitHub Token (se necessário):"
echo "   → GitHub: Settings → Developer settings → Personal tokens"
echo "   → Gerar novo token com permissões de repo"
echo "   → Lovable: Project Settings → GitHub → Atualizar token"
echo ""
echo "3. Forçar sincronização manual:"
echo "   → Execute: ./force-lovable-update.sh"
echo "   → Ou faça uma alteração no Lovable Studio"
echo ""
echo "4. Verificar conectividade de rede:"
echo "   → Pode ser problema temporário da API"
echo "   → Tente novamente em alguns minutos"

# 6. Testar manual sync
echo -e "\n5️⃣ Testando sincronização manual..."
if [ -f "scripts/manual-sync.js" ]; then
    echo "📝 Executando sync manual..."
    node scripts/manual-sync.js 2>/dev/null && echo "✅ Sync manual OK" || echo "❌ Sync manual falhou"
else
    echo "⚠️  Script de sync manual não encontrado"
fi

echo -e "\n📊 DIAGNÓSTICO CONCLUÍDO"
echo "========================"
