import HeroSection from "../components/HeroSection.jsx";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center pointer-events-none"></div>
      <div className="relative z-10">
        <main>
          <HeroSection />

          <section id="como-funciona" className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                  Cómo Funciona
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                  Jugar y compartir cuestionarios nunca ha sido tan fácil
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  {
                    number: "1",
                    title: "Ingresa a la Plataforma",
                    description:
                      "Crea una cuenta o inicia sesión con Google o Facebook.",
                  },
                  {
                    number: "2",
                    title: "Responde Formularios",
                    description:
                      "Responde formularios interactivos y consigue ser el top 1 en el ranking.",
                  },
                  {
                    number: "3",
                    title: "Se el Mejor",
                    description:
                      "Supera a tus amigos y conviértete en el mejor en cada categoría.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-purple-500">
                        {item.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <footer className="py-8 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center text-center">
              <p className="text-slate-400 text-sm">
                © {new Date().getFullYear()} QuizMaster. Todos los derechos
                reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
