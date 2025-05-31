#!/bin/bash

# Script para validar configurações antes da integração GitHub + Hostinger
echo "🔍 Validando configurações para Hostinger..."

echo ""
echo "📋 INFORMAÇÕES DO PROJETO:"
echo "========================="
echo "📁 Repositório: quiz-sell-genius-66"
echo "🌿 Branch: main"
echo "🏗️  Build Command: npm run build"
echo "📤 Output Directory: dist"
echo "🟢 Node Version: 18.x"
echo ""

echo "🧪 Testando build local..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build funcionando corretamente"
    
    if [ -d "dist" ]; then
        DIST_SIZE=$(du -sh dist | cut -f1)
        DIST_FILES=$(find dist -type f | wc -l)
        echo "📦 Pasta dist: $DIST_SIZE ($DIST_FILES arquivos)"
        
        if [ -f "dist/index.html" ]; then
            echo "✅ index.html encontrado"
        else
            echo "❌ index.html NÃO encontrado!"
        fi
        
        if [ -f "dist/.htaccess" ]; then
            echo "✅ .htaccess encontrado"
        else
            echo "⚠️  .htaccess não encontrado (será criado automaticamente)"
        fi
    else
        echo "❌ Pasta dist NÃO foi criada!"
    fi
else
    echo "❌ Erro no build!"
    exit 1
fi

echo ""
echo "🔗 PRÓXIMOS PASSOS NA HOSTINGER:"
echo "================================"
echo "1. Acesse: https://hpanel.hostinger.com"
echo "2. Websites → Create Website → GitHub"
echo "3. Conecte o repositório: quiz-sell-genius-66"
echo "4. Configure:"
echo "   - Build Command: npm run build"
echo "   - Output Directory: dist"
echo "   - Node Version: 18.x"
echo "5. Clique em 'Connect' e aguarde o deploy"
echo ""
echo "✅ Projeto pronto para integração!"
