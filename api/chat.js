export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('Falta GEMINI_API_KEY');

    const { messages } = req.body;

    const payload = {
      contents: messages,
    };

    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await geminiRes.json();

    if (!data.candidates || !data.candidates[0]) {
      return res.status(500).json({ error: 'Respuesta vacía de Gemini', detalle: data });
    }

    const text = data.candidates[0].content.parts[0].text;
    res.status(200).json({ message: text });

  } catch (err) {
    console.error('💥 Error en la API:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
