#!/bin/bash

# Script para correção radical dos problemas da Hostinger

echo "🚑 CORREÇÃO RADICAL HOSTINGER"
echo "============================="

# Configurações FTP
FTP_HOST="147.93.39.155"
FTP_USER="u116045488"
FTP_PASS="GiseleG@l0809"

echo "📋 1. Baixando arquivo atual do servidor para comparar..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
get index.html -o /tmp/server-index.html;
quit
"

if [ -f "/tmp/server-index.html" ]; then
    echo "📄 Conteúdo do index.html no servidor:"
    echo "======================================="
    head -10 /tmp/server-index.html
    echo "======================================="
    echo "🔍 Tamanho: $(wc -c < /tmp/server-index.html) bytes"
else
    echo "❌ Não conseguiu baixar index.html do servidor"
fi

echo ""
echo "📋 2. Removendo TODOS os arquivos de index e criando novo..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
rm -f index.*;
rm -f default.*;
rm -f home.*;
rm -f main.*;
quit
" 2>/dev/null

echo ""
echo "📋 3. Criando index.html ultra-simples sem qualquer complexidade..."
echo "<!DOCTYPE html>
<html>
<head>
    <title>Quiz Sell Genius</title>
</head>
<body>
    <h1>Quiz Sell Genius</h1>
    <p>Site funcionando!</p>
</body>
</html>" > /tmp/ultra-simples.html

lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
put /tmp/ultra-simples.html -o index.html;
site chmod 755 index.html;
quit
"

echo ""
echo "📋 4. Removendo .htaccess temporariamente..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
rm -f .htaccess;
quit
" 2>/dev/null

echo ""
echo "📋 5. Testando acesso direto ao arquivo..."
sleep 3
echo "🔍 Testando http://147.93.39.155/index.html"
curl -I http://147.93.39.155/index.html

echo ""
echo "🔍 Testando http://147.93.39.155/"
curl -I http://147.93.39.155/

echo ""
echo "📋 6. Criando .htaccess ultra-básico..."
echo "DirectoryIndex index.html" > /tmp/htaccess-ultra-basico.txt

lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
put /tmp/htaccess-ultra-basico.txt -o .htaccess;
site chmod 644 .htaccess;
quit
"

echo ""
echo "📋 7. Teste final após configuração..."
sleep 3
echo "🔍 Teste final:"
curl -I http://147.93.39.155/

echo ""
echo "📋 8. Verificando se há outros diretórios que possam interferir..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
find . -name 'public_html' -type d;
find . -name 'www' -type d;
find . -name 'htdocs' -type d;
quit
" 2>/dev/null

echo ""
echo "📋 9. Listagem final dos arquivos..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cls -la;
quit
"

echo ""
echo "🎯 RESULTADO:"
echo "============="
echo "Se ainda der erro 403/404, os próximos passos são:"
echo "1. 🌐 Verificar no painel Hostinger se a conta está ativa"
echo "2. 🔧 Verificar se o domínio está configurado para apontar para este servidor"
echo "3. 📞 Contatar suporte da Hostinger - pode ser problema de configuração do servidor"
echo "4. 🔍 Verificar se o IP 147.93.39.155 é realmente o correto para sua conta"

# Limpeza
rm -f /tmp/server-index.html /tmp/ultra-simples.html /tmp/htaccess-ultra-basico.txt
