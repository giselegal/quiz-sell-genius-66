#!/bin/bash

echo "🧹 LIMPEZA DOS SCRIPTS DESNECESSÁRIOS"
echo "====================================="

echo "ℹ️ Baseado em VERDADE_SEM_TOKEN.md:"
echo "   - Lovable não precisa de token"
echo "   - Sincronização é automática"
echo "   - Scripts complexos são desnecessários"
echo ""

echo "📋 SCRIPTS MANTIDOS (ESSENCIAIS):"
echo "================================="
echo "✅ manual-sync.js - Para atualizar .lovable localmente"
echo "✅ test-sync.js - Para testar conectividade"
echo ""

echo "🗑️ SCRIPTS REMOVIDOS (DESNECESSÁRIOS):"
echo "======================================="

# Mover scripts desnecessários para uma pasta de backup
mkdir -p scripts/backup-token-scripts 2>/dev/null

SCRIPTS_TO_BACKUP=(
    "force-lovable-sync.js"
    "complete-lovable-sync.js" 
    "configure-github-token.sh"
    "validate-token.js"
    "lovable-status.js"
)

for script in "${SCRIPTS_TO_BACKUP[@]}"; do
    if [ -f "scripts/$script" ]; then
        mv "scripts/$script" "scripts/backup-token-scripts/"
        echo "📦 Movido: $script → backup-token-scripts/"
    fi
done

echo ""
echo "🔧 WORKFLOWS SIMPLIFICADOS:"
echo "==========================="

echo "✅ Mantido: lovable-sync.yml (sem token)"
echo "❌ Removido dependências de LOVABLE_TOKEN"
echo ""

echo "🎯 RESULTADO:"
echo "============="
echo "✅ Scripts essenciais mantidos"
echo "✅ Scripts de token removidos"
echo "✅ Configuração simplificada"
echo "✅ Pronto para uso direto no Lovable Studio"
echo ""
echo "📱 PRÓXIMO PASSO: https://lovable.dev/@graciele"
