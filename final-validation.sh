#!/bin/bash

# 🚀 VALIDAÇÃO FINAL PARA INTEGRAÇÃO GITHUB + HOSTINGER
echo "🔍 VERIFICAÇÃO FINAL ANTES DA INTEGRAÇÃO..."
echo "================================================"

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: package.json não encontrado!"
    exit 1
fi

echo "✅ Diretório do projeto: $(pwd)"
echo ""

# Verificar scripts no package.json
echo "📋 SCRIPTS DISPONÍVEIS:"
echo "======================"
grep -A 5 '"scripts"' package.json | grep -E '"(dev|build|preview)"' | sed 's/,$//' | sed 's/^    //'
echo ""

# Testar build
echo "🏗️  TESTANDO BUILD..."
echo "===================="
if npm run build > build_test.log 2>&1; then
    echo "✅ Build executado com sucesso!"
    
    # Verificar tamanho da pasta dist
    if [ -d "dist" ]; then
        DIST_SIZE=$(du -sh dist | cut -f1)
        DIST_FILES=$(find dist -type f | wc -l)
        echo "📦 Pasta dist: $DIST_SIZE ($DIST_FILES arquivos)"
        
        # Verificar arquivos essenciais
        if [ -f "dist/index.html" ]; then
            echo "✅ index.html: Encontrado"
        else
            echo "❌ index.html: NÃO encontrado!"
        fi
        
        if [ -f "dist/.htaccess" ]; then
            echo "✅ .htaccess: Encontrado"
        else
            echo "⚠️  .htaccess: Será criado automaticamente pela Hostinger"
        fi
        
        # Verificar assets
        if [ -d "dist/assets" ]; then
            ASSETS_COUNT=$(find dist/assets -name "*.js" | wc -l)
            CSS_COUNT=$(find dist/assets -name "*.css" | wc -l)
            echo "✅ Assets: $ASSETS_COUNT JS files, $CSS_COUNT CSS files"
        fi
    else
        echo "❌ Pasta dist não foi criada!"
        exit 1
    fi
else
    echo "❌ Erro no build! Verificar build_test.log"
    cat build_test.log
    exit 1
fi

echo ""
echo "🔗 INFORMAÇÕES PARA HOSTINGER:"
echo "=============================="
echo "📁 Repository: quiz-sell-genius-66"
echo "🌿 Branch: main"
echo "🏗️  Framework: Vite"
echo "📋 Build Command: npm run build"
echo "📤 Output Directory: dist"
echo "🟢 Node.js Version: 18.x"
echo "📦 Package Manager: npm"
echo ""

# Verificar status do Git
echo "📊 STATUS DO REPOSITÓRIO:"
echo "========================"
echo "🌿 Branch atual: $(git branch --show-current)"
echo "📋 Último commit: $(git log -1 --pretty=format:'%h - %s (%cr)')"
echo "📂 Status: $(git status --porcelain | wc -l) arquivos modificados"
echo ""

# URLs importantes
echo "🌐 PRÓXIMOS PASSOS:"
echo "=================="
echo "1. Acesse: https://hpanel.hostinger.com"
echo "2. Websites → Create Website → GitHub"
echo "3. Use as configurações acima ☝️"
echo "4. Aguarde o deploy (2-5 minutos)"
echo ""

echo "🎉 PROJETO 100% PRONTO PARA INTEGRAÇÃO GITHUB + HOSTINGER!"
echo "📖 Guia detalhado: HOSTINGER_STEP_BY_STEP.md"

# Limpeza
rm -f build_test.log
