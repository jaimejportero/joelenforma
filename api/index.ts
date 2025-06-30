const express = require("express");
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent({ contents: messages });
    const text = result.response.text();
    res.status(200).json({ message: text });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exporta como handler para Vercel
module.exports = app;
