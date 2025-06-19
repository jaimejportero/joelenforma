import React from 'react';

const App: React.FC = () => {
  const whatsappURL = (mensaje: string) =>
    `https://wa.me/34644213025?text=${encodeURIComponent(mensaje)}`; // reemplaza por su número real

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#1F1F1F] font-sans">
      <header className="bg-[#717A3E] text-white p-6 shadow">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Joel Jiménez Portero</h1>
          <p className="text-sm">Dietista y acompañante nutricional</p>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-10">
        {/* Descripción */}
        <section className="text-center max-w-3xl mx-auto">
          <p className="text-lg">
            Te ayudo a mejorar tu salud y bienestar a través de una alimentación
            personalizada, sin dietas restrictivas, sin sufrimiento y adaptada a tu estilo de vida.
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <a href="https://www.instagram.com/joelnutri" target="_blank" className="text-[#717A3E] underline">Instagram</a>
            <a href="https://www.tiktok.com/@joelnutri" target="_blank" className="text-[#717A3E] underline">TikTok</a>
          </div>
        </section>

        {/* Servicios */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primera Consulta */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#717A3E] mb-2">🧑‍⚕️ Primera consulta - 50€</h2>
              <p>
                En esta primera sesión nos conoceremos, exploraremos tus hábitos, tus objetivos, tu historial médico y empezaremos a trabajar en un plan totalmente personalizado.
              </p>
              <p className="mt-2 text-sm text-gray-600">Duración: 60 min. Videollamada o llamada telefónica.</p>
            </div>
            <a
              href={whatsappURL("Hola Joel, quiero agendar una primera consulta nutricional")}
              target="_blank"
              className="mt-4 inline-block bg-[#717A3E] text-white text-center py-2 px-4 rounded hover:bg-[#5f6733] transition"
            >
              Reservar por WhatsApp
            </a>
          </div>

          {/* Seguimiento / Dieta */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#717A3E] mb-2">🥗 Dieta personalizada - 30€</h2>
              <p>
                Consulta de seguimiento con dieta adaptada a tus avances, objetivos y sensaciones. Incluye asesoramiento y resolución de dudas.
              </p>
              <p className="mt-2 text-sm text-gray-600">Duración: 30 min. Videollamada o llamada telefónica.</p>
            </div>
            <a
              href={whatsappURL("Hola Joel, quiero una consulta de dieta personalizada")}
              target="_blank"
              className="mt-4 inline-block bg-[#717A3E] text-white text-center py-2 px-4 rounded hover:bg-[#5f6733] transition"
            >
              Pedir por WhatsApp
            </a>
          </div>
        </section>

        {/* Contacto */}
        <section className="text-center mt-12">
          <h3 className="text-xl font-semibold text-[#717A3E] mb-2">📞 Contacto directo</h3>
          <p>Escríbeme sin compromiso para cualquier duda o consulta</p>
          <a
            href={whatsappURL("Hola Joel, tengo una consulta sobre tus servicios")}
            target="_blank"
            className="mt-3 inline-block text-[#717A3E] underline"
          >
            Contactar por WhatsApp
          </a>
        </section>
      </main>

      <footer className="text-center text-sm text-gray-500 p-4 mt-12">
        © {new Date().getFullYear()} Joel Jiménez Portero - Dietista | Desarrollado por Jaime
      </footer>
    </div>
  );
};

export default App;
