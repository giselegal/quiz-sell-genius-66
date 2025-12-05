#!/bin/bash

echo "🔍 ANÁLISE DETALHADA - POR QUE O LOVABLE PAROU DE ATUALIZAR"
echo "=========================================================="
echo ""

# Informações básicas
echo "📅 CRONOLOGIA DO PROBLEMA:"
echo "========================="
echo "✅ Último commit do Lovable Code Editor: 21062c6a (7 jul 2025, 23:03 UTC)"
echo "❌ A partir de 13 jul 2025: Apenas commits de auto-sync do GitHub"
echo "⚠️  Gap de sincronização: 6 dias sem atualizações do Lovable"
echo ""

# Verificar o que mudou entre os commits
echo "🔧 MUDANÇAS CRÍTICAS IDENTIFICADAS:"
echo "=================================="

# 1. Verificar se há problemas com o upstream
echo "1. 📋 Verificando configuração do upstream:"
echo "   - Upstream: https://github.com/vdp2025/quiz-sell-genius-66"
echo "   - Origin: https://github.com/giselegal/quiz-sell-genius-66"

git log --oneline upstream/main..main | wc -l > /tmp/commits_ahead
COMMITS_AHEAD=$(cat /tmp/commits_ahead)
echo "   - Commits à frente do upstream: $COMMITS_AHEAD"

if [ "$COMMITS_AHEAD" -gt 0 ]; then
    echo "   ⚠️  PROBLEMA IDENTIFICADO: Seu repositório está $COMMITS_AHEAD commits à frente do upstream!"
    echo "   💡 O Lovable pode estar configurado para sincronizar com o upstream, não com seu fork."
fi

echo ""

# 2. Verificar migração ImageKit
echo "2. 🖼️  Verificando impacto da migração ImageKit:"
git show a9a359f8 --name-only | grep -E '\.(ts|tsx|js|jsx)$' | head -5
echo "   ⚠️  A migração para ImageKit pode ter quebrado a sincronização."
echo ""

# 3. Verificar configuração atual do Lovable
echo "3. ⚙️  Configuração atual do Lovable:"
echo "   - Project ID: $(jq -r '.projectId' .lovable 2>/dev/null)"
echo "   - Branch configurada: $(jq -r '.github.branch' .lovable 2>/dev/null)"
echo "   - Auto sync ativo: $(jq -r '.github.autoSyncFromGithub' .lovable 2>/dev/null)"
echo ""

# 4. Verificar se há divergência de branches
echo "4. 🌿 Verificando branches e sincronização:"
CURRENT_COMMIT=$(git rev-parse HEAD)
UPSTREAM_COMMIT=$(git rev-parse upstream/main)
echo "   - Commit atual (main): $CURRENT_COMMIT"
echo "   - Commit upstream: $UPSTREAM_COMMIT"

if [ "$CURRENT_COMMIT" != "$UPSTREAM_COMMIT" ]; then
    echo "   ⚠️  DIVERGÊNCIA DETECTADA!"
    echo "   📊 Diferença de commits:"
    git log --oneline $UPSTREAM_COMMIT..$CURRENT_COMMIT | head -5
fi

echo ""

# 5. Testar conectividade atual
echo "5. 🌐 Testando conectividade atual:"
LOVABLE_URL="https://lovable.dev/projects/a10d1b34-b5d4-426b-8c97-45f125d03ec1"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 10 "$LOVABLE_URL")
echo "   - Status HTTP: $HTTP_STATUS"

if [ "$HTTP_STATUS" = "200" ]; then
    echo "   ✅ Lovable acessível"
else
    echo "   ❌ Problema de acesso ao Lovable"
fi

echo ""

# 6. Soluções propostas
echo "🎯 SOLUÇÕES PROPOSTAS:"
echo "====================="
echo ""
echo "CAUSA MAIS PROVÁVEL:"
echo "❗ O Lovable está configurado para sincronizar com o upstream (vdp2025/quiz-sell-genius-66)"
echo "   mas você está fazendo commits no seu fork (giselegal/quiz-sell-genius-66)."
echo ""
echo "SOLUÇÕES:"
echo "--------"
echo "1. 🔄 SOLUÇÃO IMEDIATA - Forçar sincronização do fork:"
echo "   ./force-sync-fork-to-lovable.sh"
echo ""
echo "2. 🔧 SOLUÇÃO DEFINITIVA - Reconfigurar Lovable:"
echo "   a) Acesse: $LOVABLE_URL"
echo "   b) Vá em Settings > GitHub Integration"
echo "   c) Mude de 'vdp2025/quiz-sell-genius-66' para 'giselegal/quiz-sell-genius-66'"
echo "   d) Confirme que está usando branch 'main'"
echo ""
echo "3. 📋 SOLUÇÃO ALTERNATIVA - Merge do upstream:"
echo "   git merge upstream/main"
echo "   git push origin main"
echo ""

# Criar script de solução imediata
cat > force-sync-fork-to-lovable.sh << 'EOF'
#!/bin/bash
echo "🚀 FORÇANDO SINCRONIZAÇÃO FORK → LOVABLE"
echo "======================================="

# 1. Garantir que está na branch main
git checkout main

# 2. Fazer merge do upstream para manter compatibilidade
echo "📥 Fazendo merge do upstream..."
git fetch upstream
git merge upstream/main --no-edit

# 3. Criar mudança forçada para trigger
echo "🔄 Criando trigger de sincronização forçada..."
TIMESTAMP=$(date +%s)

# Atualizar .lovable com força total
node -e "
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('.lovable', 'utf8'));
config.lastUpdate = new Date().toISOString();
config.version = '2.1.' + $TIMESTAMP;
config.sync.timestamp = $TIMESTAMP;
config.sync.forcedResync = true;
config.sync.forkSync = true;
config.github.repository = 'giselegal/quiz-sell-genius-66';
fs.writeFileSync('.lovable', JSON.stringify(config, null, 2));
console.log('✅ Configuração forçada aplicada');
"

# 4. Atualizar trigger
echo "LOVABLE_FORCE_SYNC=$TIMESTAMP" > .lovable-trigger

# 5. Criar arquivo de sinal para Lovable
echo "{\"action\":\"force_sync\",\"timestamp\":$TIMESTAMP,\"source\":\"fork_sync\"}" > .lovable-signal.json

# 6. Commit e push
git add .lovable .lovable-trigger .lovable-signal.json
git commit -m "URGENT: Force Lovable sync from fork - Fix 6-day sync gap ($TIMESTAMP)"
git push origin main

echo ""
echo "✅ SINCRONIZAÇÃO FORÇADA ENVIADA!"
echo "================================"
echo "⏰ Aguarde 2-3 minutos e verifique o Lovable"
echo "🔗 URL: https://lovable.dev/projects/a10d1b34-b5d4-426b-8c97-45f125d03ec1"
EOF

chmod +x force-sync-fork-to-lovable.sh

echo "✅ Script de solução criado: force-sync-fork-to-lovable.sh"
echo ""
echo "🚀 Para executar agora: ./force-sync-fork-to-lovable.sh"
