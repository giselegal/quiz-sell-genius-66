#!/usr/bin/env bash
set -euo pipefail

# Quiz Sell Genius - Limpeza segura de arquivos de backup e artefatos
# Esta limpeza NÃO remove fontes em src/ nem configs essenciais.
# Use --dry-run para apenas listar, ou --confirm para executar.

DRY_RUN=true
if [[ ${1:-} == "--confirm" ]]; then
  DRY_RUN=false
elif [[ ${1:-} == "--dry-run" ]]; then
  DRY_RUN=true
else
  echo "Uso: $0 [--dry-run|--confirm]"
  echo "Default: --dry-run"
fi

ROOT_DIR="$(cd "$(dirname "$0")"/.. && pwd)"
cd "$ROOT_DIR"

# Listas de padrões seguros para remoção
patterns=(
  "*.bak"                # backups
  "*.old"                # antigos
  "*.orig"               # merges
  "*.tmp"                # temporários
  "*.log"                # logs soltos
  "*.br"                 # brotli gerado
  "*.gz"                 # gzip gerado
)

# Diretórios/arquivos específicos (artefatos ou backups)
specific=(
  ".lovable.backup"
  ".lovable.backup.*"
  "Build"                # saída antiga
  "index.html.br"
  "index.html.gz"
  "favicon-injector.js.br"
  "favicon-injector.js.gz"
  "sw.js.bak"
  "sw.js.br"
  "sw.js.gz"
  "eslint.config.js.bak"
  ".eslintrc.js.bak"
  "package.json.merged"  # artefato de merge
  "google-chrome.deb"    # binário externo
)

shopt -s globstar nullglob

remove_list=()

# Padrões gerais
for pat in "${patterns[@]}"; do
  while IFS= read -r -d '' f; do
    # Evitar limpar dentro de node_modules para ganhar tempo: ainda assim são artefatos
    remove_list+=("$f")
  done < <(printf '%s\0' **/$pat)
done

# Alvos específicos
for sp in "${specific[@]}"; do
  while IFS= read -r -d '' f; do
    remove_list+=("$f")
  done < <(printf '%s\0' $sp)
done

# Filtrar itens sensíveis que não devem ser removidos
filtered=()
for f in "${remove_list[@]}"; do
  case "$f" in
    *.ts|*.tsx|*.js|*.jsx|*.html|*.css|*.md|*.json)
      # não remover fontes por engano
      if [[ "$f" == *.bak || "$f" == *.orig || "$f" == *.old || "$f" == *.tmp ]]; then
        filtered+=("$f")
      fi
      ;;
    *)
      filtered+=("$f")
      ;;
  esac
done

# Remover duplicados
mapfile -t unique < <(printf '%s\n' "${filtered[@]}" | awk '!(seen[$0]++)')

if $DRY_RUN; then
  echo "Itens que seriam removidos (${#unique[@]}):"
  printf ' - %s\n' "${unique[@]}"
  echo "\nExecute: scripts/cleanup-safe.sh --confirm para aplicar."
else
  echo "Removendo ${#unique[@]} itens..."
  for f in "${unique[@]}"; do
    if [[ -d "$f" ]]; then
      rm -rf "$f"
    else
      rm -f "$f"
    fi
    echo "removido: $f"
  done
  echo "\nConcluído."
fi
