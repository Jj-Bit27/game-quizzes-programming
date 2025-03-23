import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Particulas } from "./Particulas";

export default function HeroSection({ onGetStarted }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    Particulas({ canvasRef });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="container mx-auto px-4 z-10 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Juega, Comparte y Aprende
            </span>
            <br />
            <span className="leading-tight">
              con Cuestionarios Interactivos
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Juega cuestionarios atractivos en minutos. Perfecto para educación,
            formación o simplemente divertirse con amigos.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-3 rounded-full text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              Comenzar — Es Gratis
            </Link>

            <a
              href="#como-funciona"
              className="px-8 py-3 rounded-full border border-slate-700 text-white font-medium text-lg hover:bg-white/5 transition-all"
            >
              Ver Cómo Funciona
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
