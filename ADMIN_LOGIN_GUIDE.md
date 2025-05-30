# 🔐 Sistema de Login Administrativo - Quiz Sell Genius

## Credenciais de Acesso

### 🎯 Credencial Principal
- **Usuário:** `admin`
- **Senha:** `quiz123`
- **Nível:** Super Administrador

### 🔄 Credenciais Alternativas
1. **Usuário:** `administrator` | **Senha:** `admin123`
2. **Usuário:** `root` | **Senha:** `root123`
3. **Usuário:** `quizadmin` | **Senha:** `genius2024`
4. **Usuário:** `manager` | **Senha:** `manager123`

## 🚀 Formas de Acesso

### 1. Login Tradicional
- Acesse: `http://localhost:8081/admin/login`
- Use qualquer uma das credenciais acima

### 2. Acesso Rápido (Sem Senha)
- Clique em "Acesso Rápido" na página de login
- OU execute no console: `enableQuickAccess()`

### 3. Acesso Direto via URL
- `http://localhost:8081/admin` (pode pedir login)
- `http://localhost:8081/login` (página de login)

### 4. Console do Navegador
```javascript
// Configuração básica
localStorage.setItem('userRole', 'admin');
localStorage.setItem('adminBypass', 'true');
window.location.href = '/admin';

// OU usando função helper
enableQuickAccess();
```

### 5. Acesso de Emergência
```javascript
// Em caso de problemas
localStorage.setItem('emergencyAccess', 'true');
localStorage.setItem('userRole', 'admin');
window.location.reload();
```

## 🛠️ Solução de Problemas

### Erro HTTP 401
1. Acesse: `http://localhost:8081/troubleshoot`
2. Use os botões de solução automática
3. OU limpe o cache: `localStorage.clear()`

### Problemas de Roteamento
- Verifique se o servidor está rodando
- Confirme a porta correta (8081)
- Teste diferentes URLs de acesso

## 📁 Estrutura do Sistema

```
src/
├── config/
│   └── adminCredentials.ts    # Configurações de login
├── pages/admin/
│   ├── LoginPage.tsx         # Página de login
│   ├── TroubleshootPage.tsx  # Diagnóstico
│   └── AdminDashboard.tsx    # Dashboard principal
└── components/admin/
    └── AdminRoute.tsx        # Proteção de rotas
```

## 🔧 Personalização

### Alterar Credenciais
Edite o arquivo: `src/config/adminCredentials.ts`

```typescript
export const AdminCredentials = {
  main: {
    username: 'SEU_USUARIO',
    password: 'SUA_SENHA',
    role: 'superadmin'
  },
  // ...
};
```

### Adicionar Novos Usuários
```typescript
alternatives: [
  {
    username: 'novo_usuario',
    password: 'nova_senha',
    role: 'admin'
  }
]
```

## 🚨 Scripts de Emergência

### Script Shell
```bash
# Execute na raiz do projeto
./quick-admin-access.sh
```

### Script JavaScript (para bookmarklet)
```javascript
javascript:(function(){
  localStorage.setItem('userRole','admin');
  localStorage.setItem('adminBypass','true');
  window.location.href='/admin';
})();
```

## 📱 URLs Úteis

- **Login:** `/admin/login`
- **Dashboard:** `/admin`
- **Diagnóstico:** `/troubleshoot`
- **Analytics:** `/admin/analytics`
- **Editor de Quiz:** `/admin/quiz-builder`
- **Configurações:** `/admin/settings`

## 🔒 Segurança

- As credenciais são armazenadas localmente para desenvolvimento
- Em produção, implemente autenticação via API
- O sistema usa localStorage para persistir sessões
- Timeout automático configurável

## 💡 Dicas

1. **Desenvolvimento:** Use "Acesso Rápido" para agilizar
2. **Teste:** Todas as credenciais funcionam igual
3. **Debug:** Console mostra logs de autenticação
4. **Backup:** Scripts de emergência sempre disponíveis

---

**Última atualização:** 30 de maio de 2025
**Versão:** 3.0 - Sistema de Login Completo
