import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";

const WEBHOOK_URL = "https://4f516537b972.ngrok-free.app/webhook-test/webhook";

// Helper function to send data to webhook
async function sendToWebhook(data: any) {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Webhook error:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Falha ao enviar para webhook",
    });
  }
}

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  messages: router({
    send: protectedProcedure
      .input(z.object({ text: z.string().min(1) }))
      .mutation(async ({ input, ctx }) => {
        const payload = {
          type: "text",
          message: input.text,
          userId: ctx.user.id,
          userName: ctx.user.name,
          timestamp: new Date().toISOString(),
        };

        const result = await sendToWebhook(payload);
        return { success: true, webhookResponse: result };
      }),

    sendAudio: protectedProcedure
      .input(z.object({ audio: z.instanceof(Uint8Array) }))
      .mutation(async ({ input, ctx }) => {
        // Convert audio to base64 for JSON transmission
        const audioBase64 = Buffer.from(input.audio).toString("base64");

        const payload = {
          type: "audio",
          audio: audioBase64,
          audioFormat: "webm",
          userId: ctx.user.id,
          userName: ctx.user.name,
          audioSize: input.audio.length,
          timestamp: new Date().toISOString(),
        };

        const result = await sendToWebhook(payload);
        return { success: true, webhookResponse: result };
      }),
  }),
});

export type AppRouter = typeof appRouter;

