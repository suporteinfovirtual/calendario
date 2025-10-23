import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Mic, Send, Square, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [messageText, setMessageText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const sendMessageMutation = trpc.messages.send.useMutation();
  const sendAudioMutation = trpc.messages.sendAudio.useMutation();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      setFeedback({ type: "error", message: "Erro ao acessar microfone" });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSendText = async () => {
    if (!messageText.trim()) return;

    setIsSending(true);
    try {
      await sendMessageMutation.mutateAsync({ text: messageText });
      setMessageText("");
      setFeedback({ type: "success", message: "Mensagem enviada com sucesso!" });
      setTimeout(() => setFeedback(null), 3000);
    } catch (error) {
      setFeedback({ type: "error", message: "Erro ao enviar mensagem" });
    } finally {
      setIsSending(false);
    }
  };

  const handleSendAudio = async () => {
    if (!audioBlob) return;

    setIsSending(true);
    try {
      const arrayBuffer = await audioBlob.arrayBuffer();
      await sendAudioMutation.mutateAsync({ audio: new Uint8Array(arrayBuffer) });
      setAudioBlob(null);
      setFeedback({ type: "success", message: "Áudio enviado com sucesso!" });
      setTimeout(() => setFeedback(null), 3000);
    } catch (error) {
      setFeedback({ type: "error", message: "Erro ao enviar áudio" });
    } finally {
      setIsSending(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md p-8 shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Webhook Messenger</h1>
            <p className="text-gray-600">Envie mensagens de texto ou áudio para seu webhook</p>
          </div>
          <Button
            onClick={() => (window.location.href = getLoginUrl())}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            size="lg"
          >
            Fazer Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8 pt-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Webhook Messenger</h1>
          <p className="text-gray-600">Olá, {user?.name || "usuário"}! Envie mensagens para seu webhook.</p>
        </div>

        {/* Feedback Messages */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              feedback.type === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {feedback.message}
          </div>
        )}

        {/* Text Message Card */}
        <Card className="p-6 mb-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Enviar Mensagem de Texto</h2>
          <div className="space-y-4">
            <Textarea
              placeholder="Digite sua mensagem aqui..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="min-h-24 resize-none"
              disabled={isSending}
            />
            <Button
              onClick={handleSendText}
              disabled={!messageText.trim() || isSending}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              size="lg"
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensagem
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Audio Message Card */}
        <Card className="p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Enviar Mensagem de Áudio</h2>
          <div className="space-y-4">
            {!audioBlob ? (
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-full text-white ${
                  isRecording
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                size="lg"
              >
                {isRecording ? (
                  <>
                    <Square className="mr-2 h-4 w-4" />
                    Parar Gravação
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-4 w-4" />
                    Iniciar Gravação
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <p className="text-gray-700 font-medium">✓ Áudio gravado com sucesso</p>
                  <p className="text-sm text-gray-500 mt-1">{(audioBlob.size / 1024).toFixed(2)} KB</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setAudioBlob(null)}
                    variant="outline"
                    className="flex-1"
                    disabled={isSending}
                  >
                    Descartar
                  </Button>
                  <Button
                    onClick={handleSendAudio}
                    disabled={isSending}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Áudio
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
