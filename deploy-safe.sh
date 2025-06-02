#!/bin/bash

echo "🚀 DEPLOY SEGURO PARA HOSTINGER"
echo "==============================="

# Configurações FTP
FTP_SERVER="147.93.39.155"
FTP_USER="u116045488"
FTP_PASS="GiseleG@l0809"

# Verificar build
if [ ! -d "dist" ]; then
    echo "📦 Fazendo build..."
    npm run build
fi

BUILD_SIZE=$(du -sh dist | cut -f1)
echo "📦 Pasta dist: $BUILD_SIZE"

# Upload seguro - apenas adicionar/atualizar arquivos, sem remover
echo "🔄 Upload seguro dos arquivos..."

# Usar lftp com configuração segura
lftp -c "
set ssl:verify-certificate false
set ftp:passive-mode true
set net:timeout 30
set net:max-retries 2
open ftp://$FTP_USER:$FTP_PASS@$FTP_SERVER
cd /
lcd dist
mirror -R --verbose --only-newer --no-perms --exclude=.git* --exclude=error_log* .
quit
"

echo ""
echo "✅ Deploy concluído!"
echo "🌐 Site: http://147.93.39.155"
echo ""
echo "🔍 Verificando se está online..."
if curl -s -I http://147.93.39.155 | grep -q "200 OK"; then
    echo "✅ Site funcionando!"
else
    echo "⚠️  Site pode estar carregando (aguarde 1-2 minutos)"
fi

echo ""
echo "📋 Próximos passos:"
echo "1. Configurar DNS para seu domínio"
echo "2. Ativar SSL na Hostinger"
echo "3. Testar todas as funcionalidades"
