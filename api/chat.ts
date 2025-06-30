export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Solo POST permitido' });
  }

  try {
    const { messages } = req.body;

    const promptBase = messages
      .map((m: any) => `- ${m.role.toUpperCase()}: ${m.content}`)
      .join('\n');

    const prompt = `
Eres un nutricionista profesional. A partir de los productos, filtros, calorías y número de comidas, crea una dieta semanal equilibrada y detallada.

🔒 Reglas estrictas:
- Usa solo datos nutricionales realistas y verificables.
- Las cantidades deben ser coherentes (por ejemplo, un plátano pesa entre 100 y 150g, no 1g).
- Las calorías deben ser proporcionales a la cantidad del alimento.
- No inventes valores ni uses redondeos extremos.
- Mantén los valores coherentes entre días y comidas.

📦 Formato de respuesta (obligatorio, sin explicaciones):
{
  "Lunes": {
    "Desayuno": [
      { "nombre": "Plátano", "cantidad": 120, "calorias": 105 }
    ],
    "Almuerzo": [...],
    ...
  },
  "Martes": {...},
  ...
}

Solo responde con el JSON. No incluyas texto adicional fuera del JSON.

📋 Datos del usuario:
${promptBase}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!text) {
      console.warn('⚠️ Gemini no devolvió texto. Respuesta:', JSON.stringify(data, null, 2));
    }

    return res.status(200).json({ message: text });
  } catch (error) {
    console.error('❌ Error al llamar a Gemini:', error);
    return res.status(500).json({ error: 'Error al procesar la petición' });
  }
}
