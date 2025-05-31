#!/bin/bash

echo "🚀 FAZENDO DEPLOY COMPLETO PARA HOSTINGER"
echo "========================================"

# Configurações FTP
FTP_HOST="147.93.39.155"
FTP_USER="u116045488"
FTP_PASS="GiseleG@l0809"

echo "📦 Fazendo upload de todos os arquivos da pasta dist/..."

cd dist

# Upload usando lftp com mirror para sincronizar
lftp -c "
set ssl:verify-certificate false;
set ftp:passive-mode true;
open ftp://$FTP_USER:$FTP_PASS@$FTP_HOST;
mirror -R --exclude=.git* --exclude=node_modules --exclude=*.log . /;
quit;
"

if [ $? -eq 0 ]; then
    echo "✅ Deploy concluído com sucesso!"
    echo "🌐 Site disponível em: http://147.93.39.155"
else
    echo "❌ Erro no deploy. Verificando com método alternativo..."
    
    # Método alternativo usando find e curl
    echo "📤 Fazendo upload arquivo por arquivo..."
    
    find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.svg" -o -name "*.ico" -o -name "*.txt" -o -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.br" -o -name "*.gz" -o -name ".htaccess" -o -name "_redirects" \) ! -path "./.git/*" ! -path "./node_modules/*" | while read file; do
        echo "Uploading $file..."
        curl -T "$file" ftp://$FTP_HOST/$(echo "$file" | sed 's|^\./||') --user $FTP_USER:$FTP_PASS -s
    done
    
    echo "✅ Upload alternativo concluído!"
fi

cd ..

echo ""
echo "🎯 PRÓXIMOS PASSOS:"
echo "1. Configurar DNS para apontar para 147.93.39.155"
echo "2. Remover domínio do Lovable"
echo "3. Configurar secret FTP_PASSWORD no GitHub"
echo "4. Testar o site em: http://147.93.39.155"
