import { useState, useEffect } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { useAuth } from "../lib/authContext.jsx";
import { getRankingRequest } from "../api/partida.js";
import { getQuizzesRequest } from "../api/quiz.js";
import { Link } from "react-router-dom";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [players, setPlayers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const { user } = useAuth();

  const obtenerRanking = async () => {
    const res = await getRankingRequest();
    setPlayers(res.data.result);
  };

  const obtenerQuizzes = async () => {
    const res = await getQuizzesRequest();
    setQuizzes(res.data);
  };

  useEffect(() => {
    obtenerQuizzes();
    obtenerRanking();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white relative">
      {/* Fondo animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Círculos decorativos */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div className="absolute top-2/3 left-1/3 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl"></div>

          {/* Líneas de cuadrícula */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          {/* Estrellas/puntos */}
          <div className="absolute inset-0">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-30"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `twinkle ${2 + Math.random() * 3}s infinite ${
                    Math.random() * 2
                  }s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>

      <div className="relative z-10">
        <main className="container mx-auto px-4 py-8">
          {/* Tabla de Ranking */}
          <section className="mb-12 mt-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                Top 10 Jugadores
              </span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-slate-800/70">
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left">Jugador</th>
                    <th className="py-3 px-4 text-left">Puntuación</th>
                    <th className="py-3 px-4 text-left">Quizzes Completados</th>
                  </tr>
                </thead>
                <tbody>
                  {!players ? (
                    <tr>
                      <td colSpan="4" className="py-6 text-center">
                        Sin Jugadores Actualmente
                      </td>
                    </tr>
                  ) : (
                    players.map((player, index) => (
                      <tr
                        key={player.id}
                        className="border-t border-slate-800 hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="py-3 px-4">
                          {index + 1 <= 3 ? (
                            <span className="text-yellow-400 font-bold">
                              {index + 1}
                            </span>
                          ) : (
                            index + 1
                          )}
                        </td>
                        <td className="py-3 px-4 flex items-center">
                          {player.nombre}
                        </td>
                        <td className="py-3 px-4">{player.total_puntos}</td>
                        <td className="py-3 px-4">{player.total_partidas}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Filtros de Quiz */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                Quizzes Disponibles
              </span>
            </h2>

            <div className="flex justify-center gap-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 bg-slate-800/70 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {quizzes ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {quizzes.map((quiz) => (
                  <Link
                    to={`/quiz/${quiz.id}`}
                    key={quiz.id}
                    className="bg-slate-800/70 rounded-lg p-4 hover:bg-slate-800/50 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-gradient mb-2">
                      {quiz.titulo}
                    </h3>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="w-full py-6 text-3xl font-bold text-gray-300 flex items-center justify-center">
                Sin Quizzes
              </div>
            )}
            {user == "admin" && (
              <div className="flex justify-center mt-8">
                <button className="bg-gradient-to-r from-purple-500 to-cyan-500 py-3 px-6 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                  Crear Quiz
                </button>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
