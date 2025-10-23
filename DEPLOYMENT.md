# Webhook Messenger - Guia de Deployment e Uso

## 📱 Sobre o Aplicativo

O **Webhook Messenger** é um aplicativo web full-stack que permite enviar mensagens de texto ou áudio para um webhook externo. Ele foi desenvolvido com React, Node.js, Express e tRPC, oferecendo uma interface intuitiva e responsiva.

### Funcionalidades Principais

- ✅ **Envio de Mensagens de Texto**: Digite e envie mensagens de texto para o webhook
- ✅ **Gravação e Envio de Áudio**: Grave áudio do microfone e envie para o webhook
- ✅ **Autenticação**: Sistema de login integrado com Manus OAuth
- ✅ **Interface Responsiva**: Funciona em desktop, tablet e mobile
- ✅ **Feedback em Tempo Real**: Confirmação de sucesso/erro ao enviar mensagens

---

## 🚀 Como Usar o Aplicativo

### 1. Acessar a Aplicação

O aplicativo está disponível em:
```
https://3000-ixl6srpn7dhdnsygfttts-f2f7d35a.manusvm.computer
```

### 2. Fazer Login

1. Clique no botão "Fazer Login"
2. Autentique-se com sua conta Manus
3. Você será redirecionado para a página principal

### 3. Enviar Mensagem de Texto

1. Na seção "Enviar Mensagem de Texto", digite sua mensagem
2. Clique em "Enviar Mensagem"
3. Aguarde a confirmação de sucesso

### 4. Enviar Mensagem de Áudio

1. Na seção "Enviar Mensagem de Áudio", clique em "Iniciar Gravação"
2. Fale seu áudio (o microfone será acessado)
3. Clique em "Parar Gravação" quando terminar
4. Revise o áudio gravado
5. Clique em "Enviar Áudio" para enviar

---

## 📦 Estrutura do Projeto

```
webhook_messenger/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── lib/           # Utilitários (tRPC client)
│   │   └── App.tsx        # Roteamento principal
│   └── index.html         # HTML base
├── server/                 # Backend Node.js/Express
│   ├── routers.ts         # Procedimentos tRPC
│   ├── db.ts              # Helpers de banco de dados
│   └── _core/             # Configuração interna
├── drizzle/               # Schema do banco de dados
└── package.json           # Dependências
```

---

## 🔧 Configuração do Webhook

### URL do Webhook

O aplicativo está configurado para enviar dados para:
```
https://8a16d188c9ea.ngrok-free.app/webhook/webhook
```

### Formato dos Dados Enviados

#### Para Mensagens de Texto:
```json
{
  "type": "text",
  "message": "Sua mensagem aqui",
  "userId": 1,
  "userName": "Nome do Usuário",
  "timestamp": "2025-10-23T11:45:00Z"
}
```

#### Para Mensagens de Áudio:
```json
{
  "type": "audio",
  "audio": "base64-encoded-audio-data",
  "audioFormat": "webm",
  "userId": 1,
  "userName": "Nome do Usuário",
  "audioSize": 12345,
  "timestamp": "2025-10-23T11:45:00Z"
}
```

### Alterar URL do Webhook

Para usar um webhook diferente, edite o arquivo `server/routers.ts`:

```typescript
const WEBHOOK_URL = "https://seu-webhook-url.com/endpoint";
```

---

## 📱 Convertendo para APK (Android)

### Opção 1: Usando Apache Cordova

1. **Instale as dependências necessárias:**
   ```bash
   npm install -g cordova
   npm install -g android-sdk
   ```

2. **Crie um projeto Cordova:**
   ```bash
   cordova create webhook-messenger com.example.webhookmessenger "Webhook Messenger"
   cd webhook-messenger
   cordova platform add android
   ```

3. **Copie os arquivos da build:**
   ```bash
   # Faça build do projeto React
   npm run build
   
   # Copie os arquivos da pasta dist para www/
   cp -r ../webhook_messenger/dist/* www/
   ```

4. **Gere o APK:**
   ```bash
   cordova build android --release
   ```

   O APK estará em: `platforms/android/app/build/outputs/apk/release/`

### Opção 2: Usando Capacitor (Recomendado)

1. **Instale o Capacitor:**
   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init
   ```

2. **Configure para Android:**
   ```bash
   npm install @capacitor/android
   npx cap add android
   ```

3. **Faça build e sincronize:**
   ```bash
   npm run build
   npx cap sync
   ```

4. **Abra no Android Studio:**
   ```bash
   npx cap open android
   ```

5. **Gere o APK:**
   - No Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)

### Opção 3: Usando React Native (Reescrever)

Se preferir uma solução nativa pura, você pode usar React Native, mas isso requer reescrever o código.

---

## 🌐 Convertendo para PWA (Progressive Web App)

O aplicativo já está parcialmente preparado para PWA. Para completar:

1. **Crie um arquivo `manifest.json`:**
   ```json
   {
     "name": "Webhook Messenger",
     "short_name": "Messenger",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#ffffff",
     "theme_color": "#4f46e5",
     "icons": [
       {
         "src": "/icon-192x192.png",
         "sizes": "192x192",
         "type": "image/png"
       },
       {
         "src": "/icon-512x512.png",
         "sizes": "512x512",
         "type": "image/png"
       }
     ]
   }
   ```

2. **Registre o Service Worker:**
   ```typescript
   // client/src/main.tsx
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/sw.js');
   }
   ```

3. **Instale no seu dispositivo:**
   - Chrome/Edge: Menu → "Instalar app"
   - Safari: Compartilhar → "Adicionar à Tela de Início"

---

## 🔐 Variáveis de Ambiente

As seguintes variáveis estão configuradas automaticamente:

- `DATABASE_URL`: Conexão com o banco de dados
- `JWT_SECRET`: Chave para assinatura de sessões
- `VITE_APP_ID`: ID da aplicação OAuth
- `OAUTH_SERVER_URL`: URL do servidor OAuth
- `VITE_OAUTH_PORTAL_URL`: URL do portal de login

---

## 📝 Desenvolvendo Localmente

### Instalar Dependências
```bash
cd webhook_messenger
npm install
# ou
pnpm install
```

### Iniciar Servidor de Desenvolvimento
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### Build para Produção
```bash
npm run build
```

---

## 🐛 Troubleshooting

### Erro: "Webhook retornou 404"
- Verifique se o webhook está ativo e acessível
- Confirme que a URL está correta em `server/routers.ts`
- Teste o webhook com `curl`:
  ```bash
  curl -X POST https://seu-webhook.com/endpoint \
    -H "Content-Type: application/json" \
    -d '{"type":"text","message":"teste"}'
  ```

### Erro: "Erro ao acessar microfone"
- Verifique se o navegador tem permissão para acessar o microfone
- Certifique-se de que está usando HTTPS (necessário para acesso ao microfone)
- Teste em outro navegador

### Aplicativo não carrega
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Verifique se o servidor está rodando
- Verifique os logs do console (F12)

---

## 📞 Suporte

Para dúvidas ou problemas, verifique:
1. Os logs do servidor (terminal onde `npm run dev` está rodando)
2. O console do navegador (F12 → Console)
3. A aba Network para ver as requisições tRPC

---

## 📄 Licença

Este projeto é fornecido como está para uso pessoal e educacional.

---

**Última atualização:** 23 de Outubro de 2025

