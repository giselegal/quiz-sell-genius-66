#!/bin/bash
# Script para restaurar o projeto para cada commit de uma lista e commitar cada restauração

# Lista de commits (adicione os hashes desejados aqui, do mais antigo para o mais recente)
COMMITS=(
3e99b9e67b8e97947ffe731d2ff682ff58323722
# Adicione outros hashes se quiser restaurar vários pontos
)

for COMMIT in "${COMMITS[@]}"; do
  echo "Restaurando arquivos do commit $COMMIT"
  git checkout $COMMIT -- .
  git add .
  git commit -m "Restaurando estado do projeto do commit $COMMIT"
done

echo "Processo concluído!"
