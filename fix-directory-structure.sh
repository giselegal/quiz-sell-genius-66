#!/bin/bash

# Script para descobrir e corrigir a estrutura de diretórios da Hostinger

echo "🔍 DESCOBRINDO ESTRUTURA HOSTINGER"
echo "=================================="

# Configurações FTP
FTP_HOST="147.93.39.155"
FTP_USER="u116045488"
FTP_PASS="GiseleG@l0809"

echo "📋 1. Listando diretório raiz..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cls -la;
quit
"

echo ""
echo "📋 2. Procurando por public_html..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cd public_html;
cls -la;
quit
" 2>/dev/null || echo "❌ public_html não encontrado no nível atual"

echo ""
echo "📋 3. Verificando onde estão nossos arquivos atualmente..."
echo "🔍 Buscando index.html..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
find index.html;
quit
"

echo ""
echo "📋 4. Tentando descobrir diretório web correto..."

# Tentar domains/dominio/public_html
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cd domains;
cls;
quit
" 2>/dev/null && echo "✅ Diretório domains encontrado"

# Tentar www
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cd www;
cls;
quit
" 2>/dev/null && echo "✅ Diretório www encontrado"

# Tentar htdocs
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cd htdocs;
cls;
quit
" 2>/dev/null && echo "✅ Diretório htdocs encontrado"

echo ""
echo "📋 5. Movendo arquivos para o diretório web correto..."

# Como estamos no diretório raiz que tem nossos arquivos, vamos tentar mover para public_html
echo "🚀 Criando public_html se não existir..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
mkdir public_html;
quit
" 2>/dev/null

echo "📦 Movendo todos os arquivos do site para public_html..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
mv index.html public_html/;
mv .htaccess public_html/;
mv assets public_html/;
mv favicon public_html/;
mv favicons public_html/;
mv lovable-uploads public_html/;
mv favicon.ico public_html/;
mv _redirects public_html/;
mv placeholder.svg public_html/;
mv robots.txt public_html/;
mv sw.js public_html/;
mv sw.js.br public_html/;
mv sw.js.gz public_html/;
mv index.html.br public_html/;
mv index.html.gz public_html/;
mv test.html public_html/;
quit
"

echo ""
echo "📋 6. Verificando se arquivos estão no local correto..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cd public_html;
cls -la;
quit
"

echo ""
echo "✅ CORREÇÃO CONCLUÍDA!"
echo "📍 Arquivos movidos para: public_html/"
echo "🌐 Teste agora: http://147.93.39.155/"
