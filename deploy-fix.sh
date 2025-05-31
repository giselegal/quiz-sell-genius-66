#!/bin/bash

echo "🔧 DIAGNÓSTICO E CORREÇÃO DO DEPLOY"
echo "=================================="

FTP_SERVER="147.93.39.155"
FTP_USER="u116045488"
FTP_PASS="GiseleG@l0809"

echo "🔍 1. Verificando se index.html existe localmente..."
if [ -f "dist/index.html" ]; then
    echo "✅ index.html encontrado ($(du -h dist/index.html | cut -f1))"
else
    echo "❌ index.html NÃO encontrado - fazendo build..."
    npm run build
fi

echo ""
echo "🔍 2. Testando conexão FTP..."
if curl -s ftp://$FTP_SERVER --user $FTP_USER:$FTP_PASS --list-only | head -1 >/dev/null; then
    echo "✅ Conexão FTP OK"
else
    echo "❌ Problema na conexão FTP"
    exit 1
fi

echo ""
echo "🚀 3. Upload FORÇADO do index.html..."
curl -T "dist/index.html" ftp://$FTP_SERVER/index.html --user $FTP_USER:$FTP_PASS -v

echo ""
echo "🧪 4. Testando site..."
sleep 3

echo "🔍 Testando http://147.93.39.155..."
if curl -s http://147.93.39.155 | grep -q "Quiz\|React\|Vite" 2>/dev/null; then
    echo "✅ SITE FUNCIONANDO! Seu projeto está online!"
else
    echo "⚠️  Ainda mostrando página de erro da Hostinger"
    echo "🔍 Verificando se precisa aguardar cache..."
fi
npm run build

echo "📁 Verificando pasta dist..."
if [ ! -d "dist" ]; then
    echo "❌ Pasta dist não encontrada!"
    exit 1
fi

cd dist
BUILD_SIZE=$(du -sh . | cut -f1)
echo "✅ Pasta dist: $BUILD_SIZE"

echo ""
echo "🔄 Fazendo upload SEM tentar deletar arquivos antigos..."

# Upload usando lftp SEM --delete
lftp -c "
set ssl:verify-certificate false;
set ftp:passive-mode true;
set ftp:ssl-allow no;
open $FTP_HOST;
user $FTP_USER $FTP_PASS;
cd /;
lcd .;
mirror -R --verbose --only-newer --exclude=error_log* --exclude=mail.log --exclude=.logs .;
quit;
"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ DEPLOY ESPECÍFICO CONCLUÍDO!"
    echo "🌐 Site atualizado: http://147.93.39.155"
    echo "📊 Tamanho: $BUILD_SIZE"
    
    echo ""
    echo "🧪 Testando acesso ao site..."
    sleep 2
    
    # Testar se o site está acessível
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://147.93.39.155/)
    echo "🌐 Status HTTP: $HTTP_CODE"
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ Site funcionando!"
    else
        echo "⚠️  Site retornou código $HTTP_CODE"
        echo "🔍 Pode precisar aguardar alguns minutos para propagação"
    fi
else
    echo "❌ Erro no upload"
fi

cd ..

echo ""
echo "🎯 PRÓXIMOS PASSOS:"
echo "1. Testar site: http://147.93.39.155"
echo "2. Se funcionando, configurar DNS"
echo "3. Configurar secret no GitHub se ainda não fez"
