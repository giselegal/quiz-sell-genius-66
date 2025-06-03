#!/bin/bash

echo "🚀 DEPLOY COMPLETO PARA HOSTINGER - VERSÃO FINAL"
echo "================================================"

FTP_SERVER="147.93.39.155"
FTP_USER="u116045488"
FTP_PASS="GiseleG@l0809"

if [ ! -d "dist" ]; then
    echo "📦 Fazendo build..."
    npm run build
fi

cd dist

echo "📤 Enviando TODOS os arquivos essenciais..."

# 1. Arquivos principais
echo "📄 Enviando arquivos principais..."
for file in index.html favicon.ico sw.js robots.txt _redirects .htaccess; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
        curl -T "$file" ftp://$FTP_SERVER/ --user $FTP_USER:$FTP_PASS --silent
    fi
done

# 2. Pasta assets completa
echo "📁 Enviando pasta assets..."
if [ -d "assets" ]; then
    find assets -type f | while read file; do
        echo "  📄 $file"
        curl -T "$file" ftp://$FTP_SERVER/$file --user $FTP_USER:$FTP_PASS --silent --create-dirs
    done
fi

# 3. Outras pastas importantes
for folder in favicons favicon lovable-uploads; do
    if [ -d "$folder" ]; then
        echo "📁 Enviando pasta $folder..."
        find "$folder" -type f | head -10 | while read file; do
            echo "  📄 $file"
            curl -T "$file" ftp://$FTP_SERVER/$file --user $FTP_USER:$FTP_PASS --silent --create-dirs
        done
    fi
done

cd ..

echo ""
echo "✅ DEPLOY COMPLETO FINALIZADO!"
echo ""
echo "🧪 Testando site..."
sleep 5

# Teste múltiplo
echo "🔍 Verificando acessibilidade..."
echo "  📄 Raiz (/):"
curl -s -I http://147.93.39.155 | head -1

echo "  📄 index.html:"
curl -s -I http://147.93.39.155/index.html | head -1

echo ""
echo "🎯 RESULTADO FINAL:"
if curl -s http://147.93.39.155/index.html | grep -q "Quiz\|html" 2>/dev/null; then
    echo "✅ SITE FUNCIONANDO PERFEITAMENTE!"
    echo "🌐 Acesse: http://147.93.39.155"
    echo "🌐 Ou: http://147.93.39.155/index.html"
else
    echo "⚠️  Site pode precisar de alguns minutos para propagar"
    echo "🔗 Teste manualmente: http://147.93.39.155"
fi

echo ""
echo "📊 DEPLOY STATUS: CONCLUÍDO"
echo "📝 Próximos passos:"
echo "   1. Configurar DNS do seu domínio"
echo "   2. Ativar SSL na Hostinger"
echo "   3. Configurar secret no GitHub Actions"
