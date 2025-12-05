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
