# 🎙️ Integrar com n8n para Transcrever Áudio

## 📊 O que Você Recebe no Webhook

Quando alguém envia áudio, você recebe assim:

```json
{
  "type": "audio",
  "audio": "UklGRi4A...(base64 muito longo)...==",
  "audioFormat": "webm",
  "userId": 90001,
  "userName": "Roberto Seifert",
  "audioSize": 57374,
  "timestamp": "2025-10-23T12:28:03.519Z",
  "webhookUrl": "https://8a16d188c9ea.ngrok-free.app/webhook-test/webhook"
}
```

---

## 🔧 Como Configurar no n8n

### Passo 1: Criar um Webhook no n8n

1. Abra seu workflow no n8n
2. Clique em **"+"** para adicionar um nó
3. Procure por **"Webhook"** e clique
4. Configure:
   - **HTTP Method:** POST
   - **Authentication:** None (ou adicione segurança depois)
5. Copie a URL do webhook gerado

### Passo 2: Atualizar o Webhook no Aplicativo

Você tem duas opções:

**Opção A: Usar o webhook do n8n diretamente**
1. Copie a URL do webhook do n8n
2. Vá em: https://github.com/suporteinfovirtual/calendario
3. Edite `server/routers.ts` linha 8
4. Cole a URL do n8n
5. Commit e pronto!

**Opção B: Manter o webhook atual e redirecionar no n8n**
- Mantenha como está
- Configure o n8n para chamar a URL atual

### Passo 3: Processar o Áudio no n8n

Adicione estes nós em sequência:

#### Nó 1: **Function** (Decodificar Base64)

```javascript
// Decodificar o áudio de base64 para buffer
const audioBase64 = $input.first().json.audio;
const audioBuffer = Buffer.from(audioBase64, 'base64');

return {
  json: {
    audioBuffer: audioBuffer.toString('binary'),
    audioFormat: $input.first().json.audioFormat,
    userName: $input.first().json.userName,
    userId: $input.first().json.userId,
    timestamp: $input.first().json.timestamp
  }
};
```

#### Nó 2: **HTTP Request** (Salvar Arquivo Temporário)

Se você quiser salvar o arquivo:

1. Clique em **"+"**
2. Procure por **"HTTP Request"**
3. Configure:
   - **Method:** POST
   - **URL:** `https://seu-storage.com/upload` (ou use S3, Google Drive, etc)
   - **Body:** Envie o audioBuffer

#### Nó 3: **OpenAI Whisper** (Transcrever)

1. Clique em **"+"**
2. Procure por **"OpenAI"**
3. Selecione **"Transcribe Audio"**
4. Configure:
   - **API Key:** Sua chave OpenAI
   - **File:** Use o arquivo salvo ou o buffer
   - **Model:** whisper-1
   - **Language:** pt (para português)

#### Nó 4: **Function** (Processar Resultado)

```javascript
const transcription = $input.first().json.text;
const userName = $input.first().json.userName;
const userId = $input.first().json.userId;

return {
  json: {
    transcription: transcription,
    userName: userName,
    userId: userId,
    timestamp: new Date().toISOString()
  }
};
```

#### Nó 5: **Seu Destino Final**

Escolha o que fazer com a transcrição:
- Salvar em banco de dados
- Enviar email
- Postar em Slack
- Salvar em Google Sheets
- Etc.

---

## 📝 Exemplo Completo de Workflow

```
Webhook (Receber áudio)
    ↓
Function (Decodificar base64)
    ↓
OpenAI Whisper (Transcrever)
    ↓
Function (Processar resultado)
    ↓
Google Sheets (Salvar transcrição)
    ↓
Slack (Notificar usuário)
```

---

## 🔑 Alternativas para Transcrição

Se não quiser usar OpenAI, pode usar:

### 1. **Google Cloud Speech-to-Text**
- Mais barato que OpenAI
- Suporta 125+ idiomas
- Integração nativa no n8n

### 2. **AssemblyAI**
- Especializado em transcrição
- Muito preciso
- Tem integração no n8n

### 3. **Deepgram**
- Rápido e preciso
- Bom custo-benefício
- Integração no n8n

---

## 💡 Dicas Importantes

1. **Base64 é pesado:** O áudio em base64 fica ~33% maior. Se quiser otimizar, pode enviar como arquivo direto.

2. **Formato WebM:** O áudio vem em WebM, que é suportado por todas as APIs de transcrição.

3. **Tamanho:** O áudio no seu exemplo tem 57KB, o que é bem pequeno (menos de 1 segundo).

4. **Custo:** OpenAI Whisper custa $0.02 por minuto de áudio. Para 1 minuto = $0.02.

---

## 🚀 Próximos Passos

1. **Crie um workflow no n8n** com os nós acima
2. **Teste com um áudio** do seu app
3. **Salve a transcrição** onde quiser
4. **Automatize tudo** (respostas automáticas, etc)

---

## 📞 Precisa de Ajuda?

Se tiver dúvidas sobre:
- Como configurar OpenAI no n8n
- Como salvar em banco de dados
- Como integrar com outras ferramentas

É só chamar! 😊

---

**Boa sorte com a transcrição!** 🎉

