# 🚀 Quick Start - Webhook Messenger

## O que é?

Um aplicativo web que envia **mensagens de texto** ou **áudio** para um webhook externo. Perfeito para integração com automações, bots e workflows.

## ⚡ Começar em 2 Minutos

### 1. Acessar a Aplicação
```
https://3000-ixl6srpn7dhdnsygfttts-f2f7d35a.manusvm.computer
```

### 2. Fazer Login
Clique em "Fazer Login" e autentique-se

### 3. Enviar Mensagem
- **Texto**: Digite e clique "Enviar Mensagem"
- **Áudio**: Clique "Iniciar Gravação", fale, e clique "Enviar Áudio"

## 📱 Converter para APK (Android)

### Método Rápido com Capacitor:
```bash
# 1. Instale dependências
npm install @capacitor/core @capacitor/cli @capacitor/android

# 2. Inicialize
npx cap init

# 3. Build e sincronize
npm run build
npx cap sync

# 4. Abra no Android Studio
npx cap open android

# 5. Build → Build APK(s)
```

## 🌐 Usar como PWA (Web App)

Abra no navegador e:
- **Chrome**: Menu → "Instalar app"
- **Safari**: Compartilhar → "Adicionar à Tela de Início"
- **Android**: Abra em navegador → Menu → "Instalar"

## 📊 Dados Enviados

### Texto:
```json
{
  "type": "text",
  "message": "Sua mensagem",
  "userId": 1,
  "userName": "Seu Nome",
  "timestamp": "2025-10-23T11:45:00Z"
}
```

### Áudio:
```json
{
  "type": "audio",
  "audio": "base64-encoded-data",
  "audioFormat": "webm",
  "audioSize": 12345,
  "userId": 1,
  "userName": "Seu Nome",
  "timestamp": "2025-10-23T11:45:00Z"
}
```

## ⚙️ Mudar URL do Webhook

Edite `server/routers.ts`:
```typescript
const WEBHOOK_URL = "https://seu-webhook-url.com/endpoint";
```

Depois reinicie o servidor.

## 🆘 Problemas?

| Problema | Solução |
|----------|---------|
| Webhook retorna 404 | Verifique se está ativo e a URL está correta |
| Sem acesso ao microfone | Use HTTPS e permita acesso no navegador |
| Aplicativo não carrega | Limpe cache (Ctrl+Shift+Delete) |

## 📚 Documentação Completa

Veja `DEPLOYMENT.md` para guias detalhados de deployment e desenvolvimento.

---

**Pronto para usar!** 🎉

