#!/bin/bash

# Script de diagnóstico avançado para Hostinger
# Analisa arquivos no servidor e corrige configurações

echo "🔍 DIAGNÓSTICO AVANÇADO HOSTINGER"
echo "=================================="

# Configurações FTP
FTP_HOST="147.93.39.155"
FTP_USER="u116045488"
FTP_PASS="GiseleG@l0809"
REMOTE_DIR="/public_html"

echo "📋 1. Listando arquivos no servidor..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cd $REMOTE_DIR;
cls -la;
quit
"

echo ""
echo "📋 2. Verificando conteúdo do index.html no servidor..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cd $REMOTE_DIR;
get index.html -o /tmp/server_index.html;
quit
"

if [ -f "/tmp/server_index.html" ]; then
    echo "✅ Index.html encontrado no servidor"
    echo "📏 Tamanho: $(wc -c < /tmp/server_index.html) bytes"
    echo "🔍 Primeiras linhas:"
    head -5 /tmp/server_index.html
else
    echo "❌ Index.html NÃO encontrado no servidor"
fi

echo ""
echo "📋 3. Verificando .htaccess no servidor..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cd $REMOTE_DIR;
get .htaccess -o /tmp/server_htaccess;
quit
"

if [ -f "/tmp/server_htaccess" ]; then
    echo "✅ .htaccess encontrado no servidor"
    echo "📄 Conteúdo:"
    cat /tmp/server_htaccess
else
    echo "❌ .htaccess NÃO encontrado no servidor"
fi

echo ""
echo "📋 4. Removendo index.php que pode estar interferindo..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cd $REMOTE_DIR;
rm -f index.php;
quit
"

echo ""
echo "📋 5. Reenviando arquivos essenciais..."

# Upload forçado do index.html
echo "📤 Reenviando index.html..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cd $REMOTE_DIR;
put dist/index.html;
quit
"

# Upload forçado do .htaccess
echo "📤 Reenviando .htaccess..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cd $REMOTE_DIR;
put dist/.htaccess;
quit
"

echo ""
echo "📋 6. Criando arquivo de teste simples..."
echo "<!DOCTYPE html>
<html>
<head>
    <title>Quiz Sell Genius - Teste</title>
</head>
<body>
    <h1>🎯 Quiz Sell Genius</h1>
    <p>✅ Site funcionando na Hostinger!</p>
    <p>🌐 Servidor: $(hostname)</p>
    <p>⏰ Teste realizado em: $(date)</p>
</body>
</html>" > /tmp/test-simple.html

lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cd $REMOTE_DIR;
put /tmp/test-simple.html -o test.html;
quit
"

echo ""
echo "📋 7. Verificando permissões dos arquivos..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cd $REMOTE_DIR;
site chmod 644 index.html;
site chmod 644 .htaccess;
site chmod 644 test.html;
cls -la;
quit
"

echo ""
echo "🔍 RESULTADO DO DIAGNÓSTICO:"
echo "============================"
echo "1. ✅ Arquivo index.php removido (pode ter interferido)"
echo "2. ✅ Index.html e .htaccess reenviados"
echo "3. ✅ Arquivo test.html criado para teste"
echo "4. ✅ Permissões definidas como 644"
echo ""
echo "🌐 TESTES RECOMENDADOS:"
echo "• Acesse: http://147.93.39.155/test.html"
echo "• Acesse: http://147.93.39.155/"
echo "• Aguarde alguns minutos para propagação"
echo ""
echo "💡 Se ainda der erro 403:"
echo "• Verifique painel Hostinger → Files → File Manager"
echo "• Confirme que arquivos estão em public_html/"
echo "• Verifique se há DirectoryIndex configurado no painel"

# Limpeza
rm -f /tmp/server_index.html /tmp/server_htaccess /tmp/test-simple.html

echo ""
echo "✅ Diagnóstico concluído!"
