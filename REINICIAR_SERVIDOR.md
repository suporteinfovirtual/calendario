# 🔄 Como Reiniciar o Servidor

Depois de mudar o webhook no GitHub, você precisa reiniciar o servidor para ele carregar as mudanças.

---

## Opção 1: Pelo Terminal (Mais Fácil) ⭐

Se você tem acesso ao terminal onde o servidor está rodando:

### Passo 1: Abra o Terminal
- **Windows:** CMD ou PowerShell
- **Mac:** Terminal
- **Linux:** Terminal

### Passo 2: Vá para a Pasta do Projeto
```bash
cd /home/ubuntu/webhook_messenger
```

### Passo 3: Puxe as Mudanças do GitHub
```bash
git pull origin master
```

Você verá algo como:
```
Updating 78cf0ce..84e3af2
Fast-forward
 server/routers.ts | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

### Passo 4: Reinicie o Servidor

**Se o servidor está rodando com `npm run dev`:**

1. Pressione **Ctrl+C** para parar o servidor
2. Aguarde até ver `ubuntu@...$ ` novamente
3. Digite:
   ```bash
   npm run dev
   ```
4. Aguarde até ver `Server running on http://localhost:3000/`

**Pronto!** O servidor está rodando com o novo webhook! ✅

---

## Opção 2: Sem Terminal (Mais Simples)

Se você não tem acesso ao terminal, você pode:

1. **Fazer a mudança no GitHub** (como você já faz)
2. **Chamar-me** para reiniciar o servidor
3. **Ou esperar 5-10 minutos** (às vezes o servidor reinicia sozinho)

---

## 🧪 Como Testar se Funcionou

Depois de reiniciar:

1. Abra: https://3000-ixl6srpn7dhdnsygfttts-f2f7d35a.manusvm.computer
2. Faça login
3. Envie uma mensagem de teste
4. Verifique se chegou no seu novo webhook

Se chegou = **Sucesso!** 🎉

---

## 📝 Resumo dos Passos

```
1. Mude o webhook no GitHub (server/routers.ts linha 8)
2. Commit e push
3. Abra o terminal
4. cd /home/ubuntu/webhook_messenger
5. git pull origin master
6. Ctrl+C (para o servidor)
7. npm run dev (reinicia)
8. Aguarde "Server running..."
9. Pronto! Teste enviando uma mensagem
```

---

## 🆘 Problemas?

### "Não consigo parar o servidor"
- Pressione **Ctrl+C** várias vezes
- Ou feche a janela do terminal

### "npm: command not found"
- Você precisa ter Node.js instalado
- Baixe em: https://nodejs.org/

### "git: command not found"
- Você precisa ter Git instalado
- Baixe em: https://git-scm.com/

### "Permission denied"
- Tente com `sudo`:
  ```bash
  sudo npm run dev
  ```

---

## 💡 Dica Extra

Se você mudar o webhook frequentemente, pode criar um script para automatizar:

**Crie um arquivo `restart.sh`:**
```bash
#!/bin/bash
cd /home/ubuntu/webhook_messenger
git pull origin master
npm run dev
```

Depois é só rodar:
```bash
bash restart.sh
```

---

**Agora você consegue reiniciar o servidor sozinho!** 🚀

