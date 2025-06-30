import { useState } from 'react';

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const filtrosDisponibles = [
  { key: 'sinLactosa', label: 'Sin lactosa' },
  { key: 'sinGluten', label: 'Sin gluten' },
  { key: 'diabetico', label: 'Diabético' },
  { key: 'alergias', label: 'Alergias específicas' },
];

const todosLosProductos = [
  { nombre: 'Pollo', emoji: '🍗' },
  { nombre: 'Ternera', emoji: '🥩' },
  { nombre: 'Huevo', emoji: '🥚' },
  { nombre: 'Atún', emoji: '🐟' },
  { nombre: 'Arroz integral', emoji: '🍚' },
  { nombre: 'Pasta integral', emoji: '🍝' },
  { nombre: 'Pan integral', emoji: '🍞' },
  { nombre: 'Patata', emoji: '🥔' },
  { nombre: 'Manzana', emoji: '🍎' },
  { nombre: 'Plátano', emoji: '🍌' },
  { nombre: 'Fresas', emoji: '🍓' },
  { nombre: 'Kiwi', emoji: '🥝' },
  { nombre: 'Zanahoria', emoji: '🥕' },
  { nombre: 'Espinacas', emoji: '🥬' },
  { nombre: 'Brócoli', emoji: '🥦' },
  { nombre: 'Tomate', emoji: '🍅' },
  { nombre: 'Queso fresco', emoji: '🧀' },
  { nombre: 'Yogur natural', emoji: '🍶' },
  { nombre: 'Leche sin lactosa', emoji: '🧻' },
  { nombre: 'Almendras', emoji: '🌰' },
  { nombre: 'Aceite de oliva', emoji: '🧪' },
  { nombre: 'Aguacate', emoji: '🥑' },
];

export default function DietaAI() {
  const [productosSeleccionados, setProductosSeleccionados] = useState<string[]>([]);
  const [filtros, setFiltros] = useState<Record<string, boolean>>({});
  const [caloriasTotales, setCaloriasTotales] = useState('');
  const [comidasPorDia, setComidasPorDia] = useState('3');
  const [dieta, setDieta] = useState<Record<string, any[][]>>({});

  const handleFiltroChange = (key: string) => {
    setFiltros((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleProducto = (nombre: string) => {
    setProductosSeleccionados((prev) =>
      prev.includes(nombre) ? prev.filter((p) => p !== nombre) : [...prev, nombre]
    );
  };

  const generarDieta = async () => {
  const margen = 100;
  const minKcal = Math.max(0, Number(caloriasTotales) - margen);
  const maxKcal = Number(caloriasTotales) + margen;

  const prompt = `Eres un nutricionista profesional. A partir de los productos, filtros, calorías y número de comidas, crea una dieta semanal equilibrada y detallada.

🔒 Reglas estrictas:
- Usa solo datos nutricionales realistas y verificables.
- Las cantidades deben ser coherentes (por ejemplo, un plátano pesa entre 100 y 150g, no 1g).
- Las calorías deben ser proporcionales a la cantidad del alimento.
- No inventes valores ni uses redondeos extremos.
- Mantén los valores coherentes entre días y comidas.
- Cada día debe tener entre ${minKcal} y ${maxKcal} kcal aproximadamente.

Tengo estos productos: ${productosSeleccionados.join(', ')}.
Filtros: ${Object.entries(filtros).filter(([_, v]) => v).map(([k]) => k).join(', ') || 'ninguno'}.
Calorías totales diarias: entre ${minKcal} y ${maxKcal} kcal.
Número de comidas por día: ${comidasPorDia}.
Genera una dieta semanal completa con estructura:
{
  "Lunes": { "Desayuno": [...], "Almuerzo": [...], ... },
  "Martes": {...}
}`;

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ]
    })
  });

  const data = await res.json();
  try {
    const textoLimpio = data.message
      .replace(/^```json/, '')
      .replace(/^```/, '')
      .replace(/```$/, '')
      .trim();
      console.log(textoLimpio);
    const jsonOriginal = JSON.parse(textoLimpio);
    const jsonAdaptado: Record<string, any[][]> = {};
    for (const dia in jsonOriginal) {
      const comidas = jsonOriginal[dia];
      jsonAdaptado[dia] = Object.values(comidas);
    }
    setDieta(jsonAdaptado);
  } catch (e) {
    alert('No se pudo interpretar la respuesta de la IA. Intenta ajustar el prompt o volver a generar.');
  }
};


  const calcularTotalDia = (dia: string) => {
    const comidas = dieta[dia] || [];
    return comidas.reduce(
      (totalDia, comida) => totalDia + comida.reduce((suma, item) => suma + Number(item.calorias || 0), 0),
      0
    );
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Creador de Dietas Semanales</h1>

      <div className="space-y-2">
        <label>Filtros:</label>
        <div className="flex flex-wrap gap-4">
          {filtrosDisponibles.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!filtros[key]}
                onChange={() => handleFiltroChange(key)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium">Selecciona productos:</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {todosLosProductos.map((prod) => (
            <div
              key={prod.nombre}
              className={`text-center border rounded p-2 cursor-pointer hover:shadow ${
                productosSeleccionados.includes(prod.nombre) ? 'bg-green-200' : ''
              }`}
              onClick={() => toggleProducto(prod.nombre)}
            >
              <div className="text-3xl mb-1">{prod.emoji}</div>
              <span>{prod.nombre}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div>
          <label>Calorías diarias totales:</label>
          <input
            type="number"
            className="border p-2 rounded w-32"
            value={caloriasTotales}
            onChange={(e) => setCaloriasTotales(e.target.value)}
          />
        </div>

        <div>
          <label>Comidas al día:</label>
          <select
            className="border p-2 rounded w-32"
            value={comidasPorDia}
            onChange={(e) => setComidasPorDia(e.target.value)}
          >
            {[2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
        onClick={generarDieta}
      >
        Generar dieta semanal con IA 🧠
      </button>

      <div className="overflow-auto">
        <table className="min-w-full table-auto border mt-6 text-sm">
          <thead>
            <tr>
              <th className="border px-2 py-1">Comida</th>
              {diasSemana.map((dia) => (
                <th key={dia} className="border px-2 py-1">{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(Number(comidasPorDia))].map((_, comidaIndex) => (
              <tr key={comidaIndex}>
                <td className="border px-2 py-1 font-semibold">Comida {comidaIndex + 1}</td>
                {diasSemana.map((dia) => {
                  const alimentos = dieta[dia]?.[comidaIndex] || [];
                  const totalKcal = alimentos.reduce((acc, cur) => acc + Number(cur.calorias || 0), 0);
                  return (
                    <td key={dia} className="border px-2 py-1 align-top">
                      {alimentos.map((item: any, i: number) => (
                        <div key={i} className="mb-1">
                          🍽️ {item.nombre} – {item.cantidad}g – {item.calorias} kcal
                        </div>
                      ))}
                      <div className="text-xs font-semibold mt-1">Total: {totalKcal} kcal</div>
                    </td>
                  );
                })}
              </tr>
            ))}
             <tr>
              <td className="border px-2 py-1 font-semibold bg-gray-100">Total día</td>
              {diasSemana.map((dia) => (
                <td key={dia} className="border px-2 py-1 font-bold bg-gray-100">
                  {calcularTotalDia(dia)} kcal
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
