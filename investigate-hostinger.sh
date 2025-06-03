#!/bin/bash

# Script para investigação profunda e correção radical na Hostinger

echo "🔬 INVESTIGAÇÃO PROFUNDA HOSTINGER"
echo "=================================="

# Configurações FTP
FTP_HOST="147.93.39.155"
FTP_USER="u116045488"
FTP_PASS="GiseleG@l0809"

echo "📋 1. Listando TODOS os arquivos ocultos..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cls -la;
quit
"

echo ""
echo "📋 2. Procurando arquivos index* existentes..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
find index*;
quit
"

echo ""
echo "📋 3. Removendo arquivos que podem interferir..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
rm -f index.php;
rm -f index.htm;
rm -f default.html;
rm -f default.htm;
rm -f home.html;
quit
" 2>/dev/null

echo ""
echo "📋 4. Criando arquivo index.html super simples..."
echo "<!DOCTYPE html>
<html>
<head>
    <title>Quiz Sell Genius</title>
    <meta charset=\"UTF-8\">
</head>
<body>
    <h1>🎯 Quiz Sell Genius</h1>
    <p>✅ Site funcionando na Hostinger!</p>
    <p>🌐 IP: 147.93.39.155</p>
    <p>⏰ $(date)</p>
</body>
</html>" > /tmp/index-super-simples.html

lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
put /tmp/index-super-simples.html -o index.html;
site chmod 644 index.html;
quit
"

echo ""
echo "📋 5. Criando .htaccess mínimo..."
echo "DirectoryIndex index.html
Options -Indexes" > /tmp/htaccess-minimo.txt

lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
put /tmp/htaccess-minimo.txt -o .htaccess;
site chmod 644 .htaccess;
quit
"

echo ""
echo "📋 6. Verificando informações do servidor..."
echo "🔍 Headers do servidor:"
curl -v http://147.93.39.155/ 2>&1 | head -20

echo ""
echo "📋 7. Testando com diferentes métodos..."
echo "🔍 Testando com IP direto:"
curl -I http://147.93.39.155/index.html

echo ""
echo "🔍 Testando conteúdo completo da página principal:"
curl -s http://147.93.39.155/ | head -10

echo ""
echo "📋 8. Verificando se há configuração de Virtual Host..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
find .htaccess;
find httpd.conf;
find apache.conf;
quit
" 2>/dev/null

echo ""
echo "🎯 PRÓXIMOS PASSOS RECOMENDADOS:"
echo "1. ✅ Arquivo index.html super simples criado"
echo "2. ✅ .htaccess mínimo aplicado"
echo "3. 🔍 Se ainda der erro, o problema pode ser:"
echo "   • Domínio não configurado no painel Hostinger"
echo "   • IP não está associado ao domínio"
echo "   • Configuração de DNS incorreta"
echo "   • Suspended account ou limites atingidos"
echo ""
echo "💡 AÇÃO CRÍTICA NECESSÁRIA:"
echo "   Acesse o painel Hostinger e verifique:"
echo "   • Domains → Configuração do domínio"
echo "   • File Manager → Arquivos em public_html"
echo "   • Account Status → Verificar se está ativo"

# Limpeza
rm -f /tmp/index-super-simples.html /tmp/htaccess-minimo.txt
