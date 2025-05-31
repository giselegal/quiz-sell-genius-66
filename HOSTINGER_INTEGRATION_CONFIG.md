# Configurações para Integração GitHub + Hostinger

## Dados para Configuração no hPanel

### Repositório GitHub
- **Repository**: `quiz-sell-genius-66`
- **Branch**: `main`
- **Owner**: Seu usuário GitHub

### Build Settings
- **Framework**: `Vite` ou `Other`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node.js Version**: `18.x`
- **Package Manager**: `npm`

### Environment Variables (se necessário)
```
NODE_ENV=production
```

### Domain Settings
- **Domain**: Use o domínio temporário da Hostinger primeiro
- **SSL**: Ativar SSL automático ✅

## Checklist Pós-Integração

- [ ] Repository conectado com sucesso
- [ ] Build configurado corretamente
- [ ] Deploy automático funcionando
- [ ] SSL ativado
- [ ] Domínio personalizado configurado (opcional)
- [ ] DNS configurado (se usar domínio próprio)

## Comandos de Teste Local
```bash
npm install    # Instalar dependências
npm run build  # Testar build
npm run preview # Testar build localmente
```

## Status do Build Local ✅
- ✅ Build funcionando (5.7MB, 99 chunks)
- ✅ Compressão gzip/brotli ativa
- ✅ .htaccess configurado para SPA
- ✅ Rotas otimizadas
