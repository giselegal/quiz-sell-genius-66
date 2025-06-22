#!/bin/bash

# � Script para configurar token Lovable - Owner @graciele

echo "� CONFIGURADOR DE TOKEN - OWNER @graciele"
echo "=========================================="
echo ""

# Verificar se GitHub CLI está disponível
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI disponível"
    
    # Verificar se está logado
    if gh auth status &> /dev/null; then
        echo "✅ Logado no GitHub CLI"
        
        # Verificar repositório atual
        REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null)
        if [ "$REPO" = "vdp2025/quiz-sell-genius-66" ]; then
            echo "✅ Repositório correto: $REPO"
            echo ""
            
            echo "� CONFIGURAÇÃO RÁPIDA DO TOKEN:"
            echo "1. Execute: gh secret set LOVABLE_TOKEN"
            echo "2. Cole o token quando solicitado"
            echo ""
            
            # Função para configurar token
            echo "💡 Ou execute o comando abaixo para configurar agora:"
            echo "   read -s TOKEN && echo \$TOKEN | gh secret set LOVABLE_TOKEN"
            echo ""
        else
            echo "⚠️ Repositório: $REPO (diferente do esperado)"
        fi
    else
        echo "⚠️ Não logado no GitHub CLI"
        echo "   Execute: gh auth login"
    fi
else
    echo "❌ GitHub CLI não disponível"
fi

echo "🌐 MÉTODO WEB (OWNER ACCESS):"
echo "📋 Acesse diretamente: https://github.com/vdp2025/quiz-sell-genius-66/settings/secrets/actions"
echo "1. Clique em 'New repository secret'"
echo "2. Nome: LOVABLE_TOKEN"
echo "3. Valor: [seu_token_do_lovable]"
echo "4. Clique 'Add secret'"
echo ""

echo "🎯 CONSEGUIR TOKEN NO LOVABLE:"
echo "1. Acesse: https://lovable.dev"
echo "2. Login como @graciele"
echo "3. Procure 'Quiz Sell Genius' OU importe de novo"
echo "4. Import from GitHub: vdp2025/quiz-sell-genius-66"
echo "5. Settings → Integrations → Generate API Token"
echo ""

echo "📊 VERIFICAR SECRETS EXISTENTES:"
echo "🔗 https://github.com/vdp2025/quiz-sell-genius-66/settings/secrets/actions"
echo ""

echo "🚀 APÓS CONFIGURAR O TOKEN:"
echo "   npm run lovable:status"
echo "   npm run lovable:force"
