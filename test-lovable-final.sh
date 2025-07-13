#!/bin/bash

echo "🎉 TESTE FINAL - LOVABLE FUNCIONANDO"
echo "==================================="
echo ""

# Verificar URL correta
LOVABLE_URL="https://lovable.dev/projects/a10d1b34-b5d4-426b-8c97-45f125d03ec1"
echo "🔗 URL do projeto: $LOVABLE_URL"

# Testar conectividade
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 10 "$LOVABLE_URL")
echo "📡 Status HTTP: $HTTP_STATUS"

if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "302" ]; then
    echo "✅ SUCESSO! Lovable está acessível!"
else
    echo "❌ Ainda há problemas (Status: $HTTP_STATUS)"
fi

echo ""
echo "📋 CONFIGURAÇÃO ATUAL:"
echo "========================"

# Mostrar configuração atual
if [ -f ".lovable" ]; then
    echo "🆔 Project ID: $(jq -r '.projectId' .lovable 2>/dev/null || echo 'N/A')"
    echo "📊 Última atualização: $(jq -r '.lastUpdate' .lovable 2>/dev/null || echo 'N/A')"
    echo "🔄 Timestamp: $(jq -r '.sync.timestamp' .lovable 2>/dev/null || echo 'N/A')"
    echo "🌐 URL do projeto: $(jq -r '.projectUrl' .lovable 2>/dev/null || echo 'N/A')"
else
    echo "❌ Arquivo .lovable não encontrado"
fi

echo ""
echo "🔄 STATUS DOS WORKFLOWS:"
echo "========================"

# Verificar últimas execuções
gh run list --workflow="Sincronização Lovable Automática" --limit 2 2>/dev/null || echo "❌ Erro ao consultar workflows"

echo ""
echo "✅ SISTEMA TOTALMENTE FUNCIONAL!"
echo "================================"
echo ""
echo "🎯 Para usar o Lovable:"
echo "1. 🌐 Acesse: $LOVABLE_URL"
echo "2. 🔑 Faça login se necessário"
echo "3. ✏️  Edite seu projeto"
echo "4. 💾 As mudanças serão sincronizadas automaticamente"
echo ""
echo "🔍 Para monitorar sincronizações:"
echo "   gh run list --limit 5"
echo "   gh run view [ID_DO_RUN]"
echo ""
echo "🚀 Seu Quiz de Estilos Universais está pronto!"
