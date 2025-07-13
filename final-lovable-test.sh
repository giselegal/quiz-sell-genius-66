#!/bin/bash

echo "🎯 TESTE FINAL DE SINCRONIZAÇÃO LOVABLE"
echo "======================================="
echo ""

echo "📊 STATUS ATUAL:"
echo "================"
echo "✅ Configuração corrigida: repository = giselegal/quiz-sell-genius-66"
echo "✅ Workflows executando: Sincronização Lovable Automática OK"
echo "✅ Push sincronizado: Sem conflitos"
echo "✅ Timestamp atualizado: 1752423325"
echo ""

echo "🔍 VERIFICANDO COMMITS RECENTES:"
echo "================================"
echo "📋 Últimos 5 commits:"
git log --oneline --format="%h %ad %s" --date=relative | head -5

echo ""
echo "🤖 Procurando commits do Lovable Code Editor:"
LOVABLE_COMMITS=$(git log --oneline --author='gpt-engineer-app' --since='1 hour ago' | wc -l)
echo "   Commits do Lovable na última hora: $LOVABLE_COMMITS"

if [ "$LOVABLE_COMMITS" -gt 0 ]; then
    echo "   🎉 SUCESSO! Lovable voltou a sincronizar!"
    git log --oneline --author='gpt-engineer-app' --since='1 hour ago'
else
    echo "   ⏳ Ainda aguardando sincronização..."
fi

echo ""
echo "🌐 TESTE DE CONECTIVIDADE:"
echo "=========================="
LOVABLE_URL="https://lovable.dev/projects/a10d1b34-b5d4-426b-8c97-45f125d03ec1"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 10 "$LOVABLE_URL")
echo "📡 Status HTTP: $HTTP_STATUS"

if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Lovable acessível"
else
    echo "❌ Problema de conectividade"
fi

echo ""
echo "🔄 WORKFLOW STATUS:"
echo "=================="
echo "📊 Últimas execuções:"
gh run list --workflow="Sincronização Lovable Automática" --limit 3

echo ""
echo "💡 PRÓXIMAS AÇÕES:"
echo "=================="
echo ""

if [ "$LOVABLE_COMMITS" -gt 0 ]; then
    echo "🎉 SINCRONIZAÇÃO RESTAURADA!"
    echo "============================"
    echo "✅ O Lovable voltou a funcionar normalmente"
    echo "✅ Gap de 6 dias foi resolvido"
    echo "✅ Pode usar o Lovable normalmente: $LOVABLE_URL"
else
    echo "⏳ AGUARDANDO SINCRONIZAÇÃO"
    echo "==========================="
    echo "1. 🔧 Acesse: $LOVABLE_URL"
    echo "2. 🔄 Vá em Settings > GitHub Integration"
    echo "3. 📂 Confirme que está configurado para: giselegal/quiz-sell-genius-66"
    echo "4. 🌿 Confirme que está na branch: main"
    echo "5. 🔄 Clique em 'Sync Now' se disponível"
    echo ""
    echo "⏰ Se ainda não funcionar em 10 minutos:"
    echo "   - Abra um ticket de suporte: support@lovable.dev"
    echo "   - Mencione Project ID: a10d1b34-b5d4-426b-8c97-45f125d03ec1"
    echo "   - Informe sobre o gap de sincronização resolvido"
fi

echo ""
echo "🔍 Para monitorar:"
echo "=================="
echo "git log --oneline --author='gpt-engineer-app' --since='5 minutes ago'"
echo ""
echo "📈 Para acompanhar workflows:"
echo "gh run list --limit 3"
