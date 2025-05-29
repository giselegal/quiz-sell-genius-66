# Gisele Galvão Website

This repository contains the source code for the Gisele Galvão website.

## CI/CD Setup

This project is configured with continuous integration and continuous deployment (CI/CD) using GitHub Actions. When changes are pushed to the `main` branch, the site is automatically built and deployed to Hostinger.

### Setup Instructions

1. **Connect Lovable to GitHub**
   - In the Lovable editor, click on the GitHub button in the top right corner
   - Connect your GitHub account if not already connected
   - Create a new repository or connect to an existing one
   - Push your code to GitHub

2. **Configure GitHub Secrets**
   To deploy to Hostinger via FTP, you need to add the following secrets in your GitHub repository:
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `FTP_SERVER`: Your Hostinger FTP server (e.g., `ftp.giselegalvao.com.br`)
     - `FTP_USERNAME`: Your Hostinger FTP username
     - `FTP_PASSWORD`: Your Hostinger FTP password
     - `FTP_SERVER_DIR`: The directory to deploy to (e.g., `/public_html/` or `/`)

3. **Test the Workflow**
   - Make a small change to your code in Lovable
   - Push the changes to GitHub
   - Go to the "Actions" tab in your GitHub repository to monitor the workflow
   - Once completed, verify that your changes are live on your website

### Workflow Details

The CI/CD workflow consists of two jobs:
- `build`: Checks out the code, installs dependencies, and builds the project
- `deploy`: Takes the build artifacts and deploys them to Hostinger via FTP

To manually trigger a deployment, you can use the "Run workflow" button on the Actions tab in GitHub.

# Limpeza de Rotas e Variantes de ResultPage

Em 29/05/2025, todas as variantes e backups de ResultPage e BeforeAfterTransformation foram movidos para a pasta `_legacy_utils/` para evitar duplicidade de rotas e facilitar a manutenção do SPA.

- A página principal de resultado do SPA é: `/src/pages/resultado.tsx` (rota `/resultado`)
- Todos os acessos e testes devem ser feitos por essa rota.
- O ambiente Lovable.dev pode ser acessado conforme instruções em `acesso-lovable-dev.html` (agora também em `_legacy_utils/`).
- Para consultar ou restaurar variantes antigas, veja `_legacy_utils/ARQUIVOS_RESULTADO_VARIANTES_BACKUP.txt`.

## Rotas principais do SPA
- `/resultado` — Página de resultado principal
- `/resultado/editor` — Editor visual aprimorado
- `/quiz` — Interface do quiz
- `/admin` — Painel administrativo

## Ambiente Lovable.dev
Consulte o arquivo `acesso-lovable-dev.html` para bookmarklets e instruções rápidas de acesso ao ambiente Lovable.

---

**Atenção:** Não edite ou utilize arquivos de backup/variantes para produção. Use sempre a rota e arquivo principal do SPA.
