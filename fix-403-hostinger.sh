#!/bin/bash

# Script específico para resolver erro 403 na Hostinger

echo "🚀 RESOLUÇÃO ERRO 403 HOSTINGER"
echo "==============================="

# Configurações FTP
FTP_HOST="147.93.39.155"
FTP_USER="u116045488"
FTP_PASS="GiseleG@l0809"

echo "📋 1. Backup do .htaccess atual..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
get .htaccess -o /tmp/htaccess-backup.txt;
quit
" 2>/dev/null

echo "📋 2. Removendo .htaccess problemático..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
rm -f .htaccess;
quit
"

echo "📋 3. Testando acesso sem .htaccess..."
sleep 2
curl -I http://147.93.39.155/ | head -3

echo ""
echo "📋 4. Subindo .htaccess simplificado..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
put dist/.htaccess-hostinger -o .htaccess;
quit
"

echo "📋 5. Configurando permissões corretas..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
site chmod 644 index.html;
site chmod 644 .htaccess;
site chmod 755 assets;
site chmod 755 favicon;
site chmod 755 favicons;
site chmod 755 lovable-uploads;
quit
"

echo "📋 6. Criando arquivo de teste mais simples..."
echo "<!DOCTYPE html>
<html>
<head><title>Teste Hostinger</title></head>
<body>
<h1>✅ Site funcionando!</h1>
<p>Teste realizado em: $(date)</p>
<script>console.log('JavaScript funcionando!');</script>
</body>
</html>" > /tmp/teste-simples.html

lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
put /tmp/teste-simples.html -o teste.html;
site chmod 644 teste.html;
quit
"

echo ""
echo "📋 7. Testando todos os acessos..."
echo "🔍 Testando arquivo teste.html:"
curl -I http://147.93.39.155/teste.html | head -3

echo ""
echo "🔍 Testando página principal:"
curl -I http://147.93.39.155/ | head -3

echo ""
echo "🔍 Testando index.html direto:"
curl -I http://147.93.39.155/index.html | head -3

echo ""
echo "📋 8. Verificando se existem conflitos..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cls -la | grep -E '(index|default|home)'
quit
"

echo ""
echo "✅ RESOLUÇÃO CONCLUÍDA!"
echo "🌐 URLs para testar:"
echo "  • http://147.93.39.155/teste.html"
echo "  • http://147.93.39.155/"
echo "  • http://147.93.39.155/index.html"
echo ""
echo "💡 Se ainda der erro 403:"
echo "  • Aguarde 5-10 minutos para propagação"
echo "  • Verifique painel Hostinger"
echo "  • Confirme se domínio está apontado"

# Limpeza
rm -f /tmp/teste-simples.html
