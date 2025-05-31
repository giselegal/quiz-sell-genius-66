#!/bin/bash

# Script para preparar projeto para integração GitHub + Hostinger

echo "🚀 PREPARANDO PROJETO PARA GITHUB + HOSTINGER"
echo "=============================================="

# Verificar se estamos em um repositório Git
if [ ! -d ".git" ]; then
    echo "❌ Este diretório não é um repositório Git"
    echo "💡 Execute: git init && git remote add origin URL_DO_SEU_REPO"
    exit 1
fi

echo "✅ Repositório Git detectado"

# Verificar package.json
if [ ! -f "package.json" ]; then
    echo "❌ package.json não encontrado"
    exit 1
fi

echo "✅ package.json encontrado"

# Verificar scripts necessários
echo "🔍 Verificando scripts no package.json..."
if grep -q '"build".*"vite build"' package.json; then
    echo "✅ Script 'build' configurado corretamente"
else
    echo "⚠️  Script 'build' pode precisar de ajuste"
fi

# Verificar vite.config
if [ -f "vite.config.ts" ] || [ -f "vite.config.js" ]; then
    echo "✅ Configuração Vite encontrada"
else
    echo "❌ vite.config não encontrado"
fi

# Verificar se dist está no .gitignore
if grep -q "dist" .gitignore 2>/dev/null; then
    echo "✅ dist/ está no .gitignore"
else
    echo "⚠️  Adicionando dist/ ao .gitignore..."
    echo -e "\n# Build output\ndist/\n" >> .gitignore
fi

# Verificar .htaccess
if [ -f "public/.htaccess" ]; then
    echo "✅ .htaccess encontrado em public/"
elif [ -f "dist/.htaccess" ]; then
    echo "✅ .htaccess encontrado em dist/"
else
    echo "⚠️  Criando .htaccess para SPA..."
    mkdir -p public
    cat > public/.htaccess << 'EOF'
# Configuração para SPA na Hostinger
RewriteEngine On
RewriteBase /

# Handle Angular and React Router
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L,QSA]

# Cache control
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
</IfModule>
EOF
    echo "✅ .htaccess criado"
fi

# Verificar _redirects para Netlify/Hostinger
if [ ! -f "public/_redirects" ]; then
    echo "⚠️  Criando _redirects para fallback..."
    echo "/*    /index.html   200" > public/_redirects
    echo "✅ _redirects criado"
fi

# Teste de build
echo ""
echo "🔨 Testando build do projeto..."
if npm run build; then
    echo "✅ Build executado com sucesso!"
    
    # Verificar tamanho da pasta dist
    if [ -d "dist" ]; then
        DIST_SIZE=$(du -sh dist | cut -f1)
        echo "📦 Tamanho da pasta dist: $DIST_SIZE"
        
        # Listar arquivos principais
        echo "📋 Arquivos principais em dist/:"
        ls -la dist/ | grep -E "\.(html|js|css)$" | head -10
    fi
else
    echo "❌ Erro no build! Corrija os erros antes de continuar."
    exit 1
fi

# Verificar se há alterações não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo ""
    echo "⚠️  Há alterações não commitadas:"
    git status --short
    echo ""
    echo "💡 Deseja commitá-las agora? (y/n)"
    read -r COMMIT_NOW
    
    if [ "$COMMIT_NOW" = "y" ] || [ "$COMMIT_NOW" = "Y" ]; then
        git add .
        git commit -m "Preparação para deploy Hostinger + GitHub

- Verificado package.json com script build
- Adicionado .htaccess para SPA
- Adicionado _redirects
- Build testado com sucesso
- Projeto pronto para integração GitHub + Hostinger"
        
        echo "✅ Alterações commitadas!"
        
        echo ""
        echo "💡 Deseja fazer push agora? (y/n)"
        read -r PUSH_NOW
        
        if [ "$PUSH_NOW" = "y" ] || [ "$PUSH_NOW" = "Y" ]; then
            git push
            echo "✅ Push realizado!"
        fi
    fi
fi

echo ""
echo "🎉 PROJETO PREPARADO PARA HOSTINGER + GITHUB!"
echo "============================================="
echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo "1. 🌐 Acesse: https://hpanel.hostinger.com"
echo "2. 🔗 Clique em 'Websites' → 'Create Website'"
echo "3. 🚀 Selecione 'GitHub Integration'"
echo "4. 📂 Conecte este repositório"
echo "5. ⚙️  Configure:"
echo "   - Build Command: npm run build"
echo "   - Output Directory: dist"
echo "   - Install Command: npm install"
echo "   - Node Version: 18.x ou 20.x"
echo ""
echo "🎯 CONFIGURAÇÕES RECOMENDADAS:"
echo "   Framework: Vite"
echo "   Build Command: npm run build"
echo "   Install Command: npm install"
echo "   Output Directory: dist"
echo "   Environment: NODE_ENV=production"
echo ""
echo "✅ Após conectar, o deploy será automático a cada push!"

# Mostrar informações do repositório
echo ""
echo "📊 INFORMAÇÕES DO REPOSITÓRIO:"
echo "==============================="
echo "🔗 Remote URL: $(git config --get remote.origin.url 2>/dev/null || echo 'Não configurado')"
echo "🌿 Branch atual: $(git branch --show-current 2>/dev/null || echo 'Não configurado')"
echo "📝 Último commit: $(git log -1 --oneline 2>/dev/null || echo 'Nenhum commit')"

# Limpeza
rm -rf dist/
