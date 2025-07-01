
#!/bin/bash

echo "🔍 Verificando configuração Lovable..."

# Verificar se os scripts existem e são executáveis
echo "📋 Verificando scripts:"
for script in "scripts/lovable-prepare.sh" "scripts/lovable-test.sh" "scripts/lovable-diagnose.sh"; do
    if [ -x "$script" ]; then
        echo "✅ $script - executável"
    else
        echo "❌ $script - não executável ou não encontrado"
    fi
done

# Verificar workflow
if [ -f ".github/workflows/lovable-sync.yml" ]; then
    echo "✅ Workflow lovable-sync.yml encontrado"
else
    echo "❌ Workflow não encontrado"
fi

# Verificar configuração .lovable
if [ -f ".lovable" ]; then
    echo "✅ Arquivo .lovable encontrado"
else
    echo "❌ Arquivo .lovable não encontrado"
fi

# Verificar se Node.js scripts existem
echo "📋 Verificando Node.js scripts:"
for script in "scripts/prepare-lovable.js" "scripts/test-sync.js"; do
    if [ -f "$script" ]; then
        echo "✅ $script encontrado"
    else
        echo "❌ $script não encontrado"
    fi
done

echo ""
echo "🎯 Próximos passos:"
echo "1. Commit e push das alterações"
echo "2. Verificar execução do workflow no GitHub Actions"
echo "3. Confirmar sincronização no Lovable Studio"
echo ""
echo "Comandos para executar:"
echo "git add ."
echo "git commit -m 'Fix: Scripts executáveis para sincronização Lovable'"
echo "git push origin main"
