#!/bin/bash

# Script para apagar arquivos específicos do diretório Hostinger via FTP

echo "🗑️ LIMPEZA DE ARQUIVOS HOSTINGER"
echo "================================"

# Configurações FTP
FTP_HOST="147.93.39.155"
FTP_USER="u116045488"
FTP_PASS="GiseleG@l0809"

echo "📋 1. Listando arquivos atuais no servidor..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cls -la;
quit
"

echo ""
echo "📋 2. Escolha o que fazer:"
echo "1) Apagar TODOS os arquivos (CUIDADO!)"
echo "2) Apagar apenas arquivos específicos"
echo "3) Apagar arquivos de teste"
echo "4) Apagar arquivos antigos do build"
echo ""
read -p "Digite sua escolha (1-4): " choice

case $choice in
    1)
        echo "⚠️ ATENÇÃO: Isso apagará TODOS os arquivos!"
        read -p "Tem certeza? Digite 'CONFIRMO' para continuar: " confirm
        if [ "$confirm" = "CONFIRMO" ]; then
            echo "🗑️ Apagando TODOS os arquivos..."
            lftp -c "
            set ftp:ssl-allow no;
            open -u $FTP_USER,$FTP_PASS $FTP_HOST;
            rm -rf *;
            quit
            "
            echo "✅ Todos os arquivos foram removidos"
        else
            echo "❌ Operação cancelada"
        fi
        ;;
    2)
        echo "🗑️ Apagando arquivos específicos..."
        echo "Digite os nomes dos arquivos separados por espaço:"
        read -p "Arquivos: " files
        
        for file in $files; do
            echo "Removendo: $file"
            lftp -c "
            set ftp:ssl-allow no;
            open -u $FTP_USER,$FTP_PASS $FTP_HOST;
            rm -f $file;
            quit
            "
        done
        echo "✅ Arquivos específicos removidos"
        ;;
    3)
        echo "🗑️ Apagando arquivos de teste..."
        lftp -c "
        set ftp:ssl-allow no;
        open -u $FTP_USER,$FTP_PASS $FTP_HOST;
        rm -f test.html;
        rm -f teste.html;
        rm -f teste-secret.txt;
        rm -f upload-fast.sh;
        quit
        "
        echo "✅ Arquivos de teste removidos"
        ;;
    4)
        echo "🗑️ Apagando arquivos antigos do build..."
        lftp -c "
        set ftp:ssl-allow no;
        open -u $FTP_USER,$FTP_PASS $FTP_HOST;
        rm -f *.br;
        rm -f *.gz;
        rm -f .ftp-deploy-sync-state.json;
        quit
        "
        echo "✅ Arquivos antigos do build removidos"
        ;;
    *)
        echo "❌ Opção inválida"
        ;;
esac

echo ""
echo "📋 3. Listagem final dos arquivos..."
lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
cls -la;
quit
"

echo ""
echo "🎯 COMANDOS ÚTEIS PARA APAGAR ARQUIVOS:"
echo "======================================"
echo ""
echo "# Apagar arquivo específico:"
echo "lftp -c \"set ftp:ssl-allow no; open -u $FTP_USER,$FTP_PASS $FTP_HOST; rm -f arquivo.txt; quit\""
echo ""
echo "# Apagar todos arquivos .html:"
echo "lftp -c \"set ftp:ssl-allow no; open -u $FTP_USER,$FTP_PASS $FTP_HOST; rm -f *.html; quit\""
echo ""
echo "# Apagar diretório inteiro:"
echo "lftp -c \"set ftp:ssl-allow no; open -u $FTP_USER,$FTP_PASS $FTP_HOST; rm -rf pasta/; quit\""
echo ""
echo "# Apagar tudo (CUIDADO!):"
echo "lftp -c \"set ftp:ssl-allow no; open -u $FTP_USER,$FTP_PASS $FTP_HOST; rm -rf *; quit\""
