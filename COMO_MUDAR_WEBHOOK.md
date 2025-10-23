# 🔗 Como Mudar o URL do Webhook - Guia Simples

## Método 1: Pelo GitHub (Mais Fácil) ⭐

### Passo 1: Abra o GitHub
Acesse: https://github.com/suporteinfovirtual/calendario

### Passo 2: Procure o Arquivo
1. Clique em **"Code"** (aba azul)
2. Procure a pasta **`server`**
3. Clique em **`routers.ts`**

### Passo 3: Edite o Arquivo
1. Clique no ícone de **✏️ (lápis)** no canto superior direito
2. Procure pela linha que começa com:
   ```
   const WEBHOOK_URL = "https://...
   ```

### Passo 4: Mude a URL
Você vai ver algo assim:
```typescript
const WEBHOOK_URL = "https://8a16d188c9ea.ngrok-free.app/webhook-test/webhook";
```

**Mude para seu novo webhook:**
```typescript
const WEBHOOK_URL = "https://seu-novo-webhook.com/endpoint";
```

### Passo 5: Salve as Mudanças
1. Role para baixo
2. Clique em **"Commit changes"** (botão verde)
3. Escreva uma mensagem (ex: "Alterar webhook URL")
4. Clique em **"Commit changes"** novamente

### Passo 6: Aguarde
- O servidor vai reiniciar automaticamente (2-3 minutos)
- Depois teste enviando uma mensagem

---

## Método 2: Pelo Terminal (Se Souber Git)

```bash
# 1. Clone o repositório
git clone https://github.com/suporteinfovirtual/calendario.git
cd calendario

# 2. Edite o arquivo
nano server/routers.ts
# Ou use seu editor favorito (VSCode, etc)

# 3. Mude a linha 8:
# const WEBHOOK_URL = "https://seu-novo-webhook.com/endpoint";

# 4. Salve e faça commit
git add server/routers.ts
git commit -m "Alterar webhook URL"
git push
```

---

## 📝 Exemplos de URLs

### Webhook Original:
```
https://8a16d188c9ea.ngrok-free.app/webhook/webhook
```

### Webhook de Teste:
```
https://8a16d188c9ea.ngrok-free.app/webhook-test/webhook
```

### Seu Webhook Customizado:
```
https://seu-dominio.com/api/webhook
```

---

## ✅ Como Saber se Funcionou

Depois de mudar:

1. Abra o app: https://3000-ixl6srpn7dhdnsygfttts-f2f7d35a.manusvm.computer
2. Faça login
3. Envie uma mensagem de teste
4. Verifique se chegou no seu novo webhook

Se chegou = **Sucesso!** 🎉

---

## 🆘 Problemas?

### "Não consigo encontrar o arquivo"
- Certifique-se de estar no repositório correto: https://github.com/suporteinfovirtual/calendario
- Procure por `server` → `routers.ts`

### "Não consigo editar"
- Verifique se você está logado no GitHub
- Você precisa ter permissão no repositório

### "Mudei mas não funcionou"
- Aguarde 2-3 minutos para o servidor reiniciar
- Recarregue a página (Ctrl+F5)
- Faça logout e login novamente

---

## 💡 Dica Extra

Se você mudar frequentemente o webhook, pode criar uma **variável de ambiente** para não precisar editar o código toda vez.

Mas por enquanto, esse método é o mais simples! 😊

---

**Precisa de ajuda?** Chama que eu ajudo! 🚀

