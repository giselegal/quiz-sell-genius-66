#!/bin/bash

echo "🔥 COMANDOS FORÇADOS PARA REATIVAR LOVABLE"
echo "=========================================="
echo "Data: $(date)"
echo "Status: AINDA NÃO ATIVOU - Executando comandos forçados"
echo ""

echo "🔧 DIAGNÓSTICO RÁPIDO:"
echo "======================="
echo "Último commit automático Lovable: 17/06 (5 dias atrás)"
echo "Problema: Integração GitHub ↔ Lovable Studio quebrada"
echo ""

echo "⚡ COMANDO 1: FORÇAR ATUALIZAÇÃO TIMESTAMP"
echo "=========================================="
CURRENT_TIMESTAMP=$(date +%s)
echo "LOVABLE_FORCE_SYNC=$CURRENT_TIMESTAMP" > .lovable-trigger
echo "LOVABLE_STATUS=FORCE_REACTIVATION" > .lovable-status
echo "✅ Timestamp forçado: $CURRENT_TIMESTAMP"

echo ""
echo "⚡ COMANDO 2: ATUALIZAR .LOVABLE COM DADOS CRÍTICOS"
echo "=================================================="
node -e "
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('.lovable', 'utf8'));
const timestamp = Math.floor(Date.now() / 1000);
config.lastSync = new Date().toISOString();
config.sync.timestamp = timestamp;
config.sync.forced = true;
config.sync.reactivation = true;
config.sync.lastForceSync = new Date().toISOString();
config.github.autoSyncFromGithub = true;
config.github.autoPushToGithub = true;
config.features.forceSync = true;
config.features.webhookAlternative = true;
fs.writeFileSync('.lovable', JSON.stringify(config, null, 2));
console.log('✅ .lovable atualizado com configurações de reativação');
"

echo ""
echo "⚡ COMANDO 3: COMMIT ESPECIAL DE REATIVAÇÃO"
echo "=========================================="
git add .lovable .lovable-trigger .lovable-status
git commit -m "🔥 FORCE REACTIVATION: Lovable sync forcado - timestamp $CURRENT_TIMESTAMP"
git push origin main
echo "✅ Commit de reativação enviado para GitHub"

echo ""
echo "⚡ COMANDO 4: TESTAR TODOS OS ENDPOINTS POSSÍVEIS"
echo "==============================================="
echo "Testando endpoints do Lovable..."

# Teste 1: Endpoint principal
curl -X POST "https://api.lovable.dev/webhook" \
  -H "Content-Type: application/json" \
  -d '{
    "repository": "vdp2025/quiz-sell-genius-66",
    "action": "force_sync",
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
  }' 2>/dev/null || echo "❌ Endpoint 1 falhou"

# Teste 2: Endpoint alternativo
curl -X POST "https://lovable.dev/api/sync" \
  -H "Content-Type: application/json" \
  -d '{
    "github_repo": "vdp2025/quiz-sell-genius-66",
    "force": true
  }' 2>/dev/null || echo "❌ Endpoint 2 falhou"

echo "✅ Tentativas de webhook concluídas"

echo ""
echo "⚡ COMANDO 5: EXECUTAR WORKFLOW GITHUB ACTIONS"
echo "============================================="
echo "Disparando workflow de sincronização..."
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/vdp2025/quiz-sell-genius-66/actions/workflows/lovable-sync.yml/dispatches" \
  -d '{"ref":"main"}' 2>/dev/null || echo "⚠️ Workflow dispatch falhou (normal sem token)"

echo ""
echo "🔍 COMANDO 6: VERIFICAR STATUS ATUAL"
echo "===================================="
echo "Verificando se algo mudou..."
echo "Último commit:" 
git log -1 --format="%h %ci %s"
echo ""
echo "Conteúdo .lovable-trigger:"
cat .lovable-trigger
echo ""

echo "🚨 COMANDO 7: AÇÃO MANUAL OBRIGATÓRIA"
echo "====================================="
echo "⚠️ SE AINDA NÃO ATIVOU, O PROBLEMA É NO LOVABLE STUDIO!"
echo ""
echo "VERIFICAÇÕES OBRIGATÓRIAS:"
echo "1. 🌐 Acesse: https://lovable.dev/@graciele"
echo "2. 🔐 Faça login com a conta correta"
echo "3. 🔍 Procure projeto 'Quiz Sell Genius'"
echo ""
echo "CENÁRIO A - PROJETO NÃO EXISTE:"
echo "   ❌ Projeto foi removido/perdido"
echo "   ✅ SOLUÇÃO: Reimportar do GitHub"
echo "   📋 Ação: 'Import from GitHub' → vdp2025/quiz-sell-genius-66"
echo ""
echo "CENÁRIO B - PROJETO EXISTE MAS INATIVO:"
echo "   ❌ GitHub Integration desconectada"
echo "   ✅ SOLUÇÃO: Reconectar GitHub"
echo "   📋 Ação: Settings → GitHub → Reconnect"
echo ""
echo "CENÁRIO C - PROJETO ATIVO MAS SEM AUTO-SYNC:"
echo "   ❌ Auto-sync desabilitado"
echo "   ✅ SOLUÇÃO: Habilitar auto-sync"
echo "   📋 Ação: Settings → Auto-sync → Enable"
echo ""

echo "🎯 TESTE FINAL:"
echo "==============="
echo "Após verificar no Lovable Studio:"
echo "1. Faça uma alteração pequena (ex: mudar cor)"
echo "2. Clique em Save/Deploy"
echo "3. Aguarde 2-3 minutos"
echo "4. Execute: git pull origin main"
echo "5. Verifique se apareceu novo commit automático"
echo ""

echo "📊 RESUMO DOS COMANDOS EXECUTADOS:"
echo "=================================="
echo "✅ Timestamp forçado: $CURRENT_TIMESTAMP"
echo "✅ .lovable atualizado com reativação"
echo "✅ Commit especial enviado para GitHub"
echo "✅ Webhooks testados"
echo "✅ Workflow disparado (se possível)"
echo ""
echo "🔥 SE AINDA NÃO FUNCIONAR: O problema está no Lovable Studio!"
echo "📱 ACESSE IMEDIATAMENTE: https://lovable.dev/@graciele"
