#!/bin/bash

echo "🔍 VERIFICAÇÃO FINAL - SINCRONIZAÇÃO LOVABLE"
echo "============================================"
echo ""

# Informações do commit urgente
URGENT_COMMIT="94393648"
echo "📋 COMMIT URGENTE ENVIADO:"
echo "========================="
echo "🆔 Commit ID: $URGENT_COMMIT"
echo "⏰ Timestamp: 1752423239"
echo "📝 Mensagem: URGENT: Force Lovable sync from fork - Fix 6-day sync gap"
echo ""

# Verificar workflows executados
echo "🔄 STATUS DOS WORKFLOWS:"
echo "======================="
gh run list --limit 5

echo ""

# Testar conectividade
LOVABLE_URL="https://lovable.dev/projects/a10d1b34-b5d4-426b-8c97-45f125d03ec1"
echo "🌐 TESTANDO ACESSO AO LOVABLE:"
echo "=============================="
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 10 "$LOVABLE_URL")
echo "📡 Status HTTP: $HTTP_STATUS"

if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Lovable acessível"
    echo "🔗 URL: $LOVABLE_URL"
else
    echo "❌ Problema de acesso"
fi

echo ""

# Verificar configuração atual
echo "⚙️  CONFIGURAÇÃO ATUAL:"
echo "======================"
echo "🆔 Project ID: $(jq -r '.projectId' .lovable 2>/dev/null)"
echo "📊 Última atualização: $(jq -r '.lastUpdate' .lovable 2>/dev/null)"
echo "🔄 Timestamp: $(jq -r '.sync.timestamp' .lovable 2>/dev/null)"
echo "🔧 Fork sync ativo: $(jq -r '.sync.forkSync' .lovable 2>/dev/null)"
echo "📂 Repositório: $(jq -r '.github.repository' .lovable 2>/dev/null)"

echo ""

# Instruções finais
echo "📋 PRÓXIMOS PASSOS:"
echo "=================="
echo ""
echo "1. ⏰ AGUARDE 2-3 MINUTOS para que a sincronização seja processada"
echo ""
echo "2. 🌐 ACESSE O LOVABLE:"
echo "   $LOVABLE_URL"
echo ""
echo "3. 🔍 VERIFIQUE SE AS MUDANÇAS APARECERAM:"
echo "   - Procure pelo commit: $URGENT_COMMIT"
echo "   - Verifique se os arquivos estão atualizados"
echo "   - Teste se as funcionalidades funcionam"
echo ""
echo "4. 🔧 SE AINDA NÃO FUNCIONOU:"
echo "   a) Vá em Settings > GitHub Integration no Lovable"
echo "   b) Mude de 'vdp2025/quiz-sell-genius-66' para 'giselegal/quiz-sell-genius-66'"
echo "   c) Clique em 'Sync Now' ou 'Force Sync'"
echo ""
echo "5. 📞 SE PRECISAR DE SUPORTE:"
echo "   - Email: support@lovable.dev"
echo "   - Mencione Project ID: a10d1b34-b5d4-426b-8c97-45f125d03ec1"
echo "   - Informe sobre o gap de sincronização de 6 dias"
echo ""

# Criar monitoramento contínuo
echo "🔄 MONITORAMENTO AUTOMÁTICO:"
echo "============================"
echo "Para monitorar continuamente:"
echo "watch -n 30 'echo \"⏰ \$(date)\" && gh run list --limit 3'"
echo ""

# Verificar se há commits do Lovable nos próximos minutos
echo "👀 PARA VERIFICAR SE O LOVABLE VOLTOU A FUNCIONAR:"
echo "=================================================="
echo "Execute em 5 minutos:"
echo "git log --oneline --author='gpt-engineer-app' --since='5 minutes ago'"
echo ""
echo "Se aparecer um novo commit do 'gpt-engineer-app[bot]', a sincronização foi restaurada! 🎉"
