#!/bin/bash

# 🚀 Script All-in-One: Build + Deploy para Hostinger
# Use: ./deploy.sh "Sua mensagem de commit"

echo "🚀 QUIZ SELL GENIUS - DEPLOY TO HOSTINGER"
echo "=========================================="

# Verificar se foi passada mensagem de commit
COMMIT_MSG="${1:-📝 Deploy automático $(date '+%d/%m/%Y %H:%M')}"

echo "📝 Mensagem do commit: $COMMIT_MSG"
echo ""

# 1. Build do projeto
echo "📦 Fazendo build do projeto..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build. Verifique os erros acima."
    exit 1
fi

echo "✅ Build concluído com sucesso!"
echo ""

# 2. Verificar tamanho da build
BUILD_SIZE=$(du -sh dist 2>/dev/null | cut -f1)
echo "📊 Tamanho da build: $BUILD_SIZE"
echo ""

# 3. Git add, commit e push
echo "🔄 Enviando para GitHub (deploy automático)..."

git add .

if git diff --cached --quiet; then
    echo "ℹ️  Nenhuma alteração detectada para commit."
else
    git commit -m "$COMMIT_MSG"
    echo "✅ Commit realizado: $COMMIT_MSG"
fi

echo "📡 Fazendo push para origin main..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 DEPLOY INICIADO COM SUCESSO!"
    echo "================================"
    echo "✅ Código enviado para GitHub"
    echo "⏳ GitHub Actions processando..."
    echo "🕐 Deploy FTP em andamento..."
    echo ""
    echo "🌐 Site será atualizado em ~2-3 minutos"
    echo "🔗 Aguarde e atualize a página da Hostinger"
    echo ""
    echo "📋 Para acompanhar:"
    echo "   - GitHub Actions: https://github.com/vdp2025/quiz-sell-genius-66/actions"
    echo "   - Site: [Seu domínio na Hostinger]"
else
    echo ""
    echo "❌ Erro no push para GitHub"
    echo "🔍 Verifique conexão e permissões"
fi

echo ""
echo "📚 Para próximos deploys, use:"
echo "   ./deploy.sh \"Sua mensagem aqui\""
