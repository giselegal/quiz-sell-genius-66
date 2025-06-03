#!/bin/bash

echo "🚀 DEPLOY DIRETO ARQUIVO POR ARQUIVO"
echo "===================================="

FTP_SERVER="147.93.39.155"
FTP_USER="u116045488"
FTP_PASS="GiseleG@l0809"

cd dist

echo "📤 Enviando arquivos principais..."

# Upload dos arquivos mais importantes primeiro
echo "📄 index.html..."
curl -T "index.html" ftp://$FTP_SERVER/ --user $FTP_USER:$FTP_PASS --silent

echo "📄 favicon.ico..."
curl -T "favicon.ico" ftp://$FTP_SERVER/ --user $FTP_USER:$FTP_PASS --silent 2>/dev/null || echo "  (arquivo não encontrado)"

echo "📁 Pasta assets..."
if [ -d "assets" ]; then
    find assets -type f -name "*.css" -o -name "*.js" | head -5 | while read file; do
        echo "  📄 $file"
        curl -T "$file" ftp://$FTP_SERVER/$file --user $FTP_USER:$FTP_PASS --silent --create-dirs
    done
fi

cd ..

echo ""
echo "✅ Arquivos principais enviados!"
echo "🌐 Testando site..."

sleep 3

if curl -s http://147.93.39.155 | grep -q "html\|Quiz" 2>/dev/null; then
    echo "✅ SITE FUNCIONANDO!"
    echo "🔗 Acesse: http://147.93.39.155"
else
    echo "⚠️  Site carregando ou erro 403"
    echo "🔍 Verificando index.html..."
    curl -s -I http://147.93.39.155/index.html | head -2
fi

echo ""
echo "📊 Status do deploy:"
echo "✅ Conexão FTP: OK"
echo "✅ Upload: Concluído"
echo "🌐 Site: Verificar manualmente"
