// Endpoint simulado para webhook Hotmart usando Express.js
// Este arquivo deve ser usado se você quiser criar um servidor separado

import express from "express";
import cors from "cors";
import {
  hotmartWebhookManager,
  HotmartWebhookData,
} from "../src/utils/hotmartWebhook.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Endpoint do webhook Hotmart
app.post("/api/webhook/hotmart", async (req, res) => {
  try {
    console.log("[Hotmart Webhook] Webhook recebido:", {
      headers: req.headers,
      body: req.body,
    });

    // Verificar Content-Type
    const contentType = req.headers["content-type"];
    if (!contentType?.includes("application/json")) {
      return res.status(400).json({ error: "Invalid content type" });
    }

    // Parsear dados do webhook
    const webhookData: HotmartWebhookData = req.body;

    // Validar estrutura básica
    if (!webhookData.event || !webhookData.data || !webhookData.webhook_id) {
      return res.status(400).json({ error: "Invalid webhook data" });
    }

    // Log do webhook recebido
    console.log("[Hotmart Webhook] Processando:", {
      event: webhookData.event,
      transaction_id: webhookData.data.transaction?.id,
      buyer_email: webhookData.data.buyer?.email,
      webhook_id: webhookData.webhook_id,
      timestamp: webhookData.timestamp,
    });

    // Processar webhook usando nosso gerenciador
    await hotmartWebhookManager.processWebhook(webhookData);

    // Resposta de sucesso para a Hotmart
    return res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
      event: webhookData.event,
      transaction_id: webhookData.data.transaction?.id,
    });
  } catch (error) {
    console.error("[Hotmart Webhook] Erro ao processar webhook:", error);

    return res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Endpoint de teste
app.get("/api/webhook/hotmart", (req, res) => {
  res.json({
    message: "Hotmart Webhook Endpoint is working!",
    timestamp: new Date().toISOString(),
    methods: ["POST"],
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor webhook rodando na porta ${PORT}`);
  console.log(`📡 Endpoint: http://localhost:${PORT}/api/webhook/hotmart`);
});

export default app;
