import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error('❌ Falta la variable GEMINI_API_KEY');

const genAI = new GoogleGenerativeAI(apiKey);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { messages } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent({ contents: messages });
    const text = result.response.text();
    res.status(200).json({ message: text });
  } catch (err) {
    console.error('💥 Error en Gemini:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
