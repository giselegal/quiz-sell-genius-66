#!/bin/bash

echo "🔍 DIAGNÓSTICO LOVABLE REAL (SEM TOKEN)"
echo "======================================"

echo "1. ✅ O Lovable funciona via: https://lovable.dev/@graciele"
echo "2. ❌ NÃO precisa de LOVABLE_TOKEN no GitHub"
echo "3. ✅ Funciona via GitHub App ou webhook automático"
echo ""

echo "📋 CHECKLIST DE VERIFICAÇÃO:"
echo "============================"

echo "☐ 1. Acesse: https://lovable.dev/@graciele"
echo "☐ 2. Verifique se projeto Quiz Sell Genius está listado"
echo "☐ 3. Abra o projeto e vá em Settings"
echo "☐ 4. Verifique GitHub Integration:"
echo "   ☐ Repository conectado: vdp2025/quiz-sell-genius-66"
echo "   ☐ Auto-sync: ENABLED"
echo "   ☐ Branch: main"
echo "   ☐ Status: Connected"
echo ""

echo "🧪 TESTE DE FUNCIONAMENTO:"
echo "=========================="

echo "1. No Lovable Studio:"
echo "   - Faça uma alteração pequena (ex: mudar cor)"
echo "   - Clique em 'Save' ou 'Deploy'"
echo ""

echo "2. No GitHub:"
echo "   - Aguarde 1-2 minutos"
echo "   - Verifique se apareceu novo commit"
echo "   - Commit deve ter origem: Lovable Studio"
echo ""

echo "🔧 ARQUIVOS LOCAIS (ATUALIZADOS):"
echo "=================================="

if [ -f ".lovable" ]; then
    echo "✅ .lovable encontrado"
    TIMESTAMP=$(cat .lovable | grep -o '"timestamp":[^,]*' | cut -d':' -f2)
    echo "   Timestamp: $TIMESTAMP"
else
    echo "❌ .lovable não encontrado"
fi

if [ -f ".lovable-trigger" ]; then
    echo "✅ .lovable-trigger encontrado"
    cat .lovable-trigger
else
    echo "❌ .lovable-trigger não encontrado"
fi

echo ""
echo "🎯 CONCLUSÃO:"
echo "============="
echo "✅ Sistema local configurado"
echo "❓ Verificar Lovable Studio manualmente"
echo "❓ Testar sincronização real"
echo ""
echo "📱 ACESSE AGORA: https://lovable.dev/@graciele"
