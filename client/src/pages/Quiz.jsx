import { useState, useEffect } from "react";
import {
  FiClock,
  FiHelpCircle,
  FiArrowLeft,
  FiCheck,
  FiX,
  FiChevronRight,
  FiFlag,
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import handleGet from "../lib/handleGet.jsx";
import { registerGameRequest } from "../api/partida.js";
import { useAuth } from "../lib/authContext.jsx";

function QuizPage() {
  const params = useParams();
  const { user } = useAuth();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);

  const currentQuestion = questions[currentQuestionIndex] || {};
  const currentOptions = options[currentQuestionIndex] || [];
  const progress = questions.length
    ? ((currentQuestionIndex + 1) / questions.length) * 100
    : 0;

  useEffect(() => {
    handleGet(params, setQuiz, setQuestions, setOptions);
  }, [params]);

  useEffect(() => {
    if (isAnswerSubmitted || quizCompleted || !questions.length) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    isAnswerSubmitted,
    currentQuestionIndex,
    quizCompleted,
    questions.length,
  ]);

  useEffect(() => {
    if (!isAnswerSubmitted && questions.length) {
      setTimeLeft(30);
    }
  }, [currentQuestionIndex, questions.length]);

  const handleRegisterGame = async () => {
    const data = {
      usuario_id: user.id,
      quiz_id: quiz.id,
      puntaje: score,
    };
    const res = await registerGameRequest(data);
    console.log(res);
  };

  const handleSelectAnswer = (index) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null && !isAnswerSubmitted) {
      setIsAnswerSubmitted(true);
      return;
    }

    if (!isAnswerSubmitted) {
      setIsAnswerSubmitted(true);
      if (selectedAnswer === currentQuestion.es_correcta) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const formatTime = (seconds) => {
    return `${seconds}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white relative">
      {/* Fondo animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div className="absolute top-2/3 left-1/3 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
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
        <header className="bg-black/50 backdrop-blur-md border-b border-slate-800 pt-15">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link
                to="/home"
                className="flex items-center text-slate-300 hover:text-white transition-colors"
              >
                <FiArrowLeft className="mr-2" />
                Volver
              </Link>

              <div className="text-center">
                <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                  {quiz.titulo || "Cargando..."}
                </h1>
                <div className="flex items-center justify-center gap-3 text-xs text-slate-400 mt-1">
                  <span
                    className={`px-2 py-0.5 rounded-full ${
                      quiz.dificultad === "fácil"
                        ? "bg-green-500/20 text-green-400"
                        : quiz.dificultad === "medio"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {quiz.dificultad || ""}
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                    timeLeft > 10
                      ? "bg-green-500/20 text-green-400"
                      : timeLeft > 5
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400 animate-pulse"
                  }`}
                >
                  <FiClock />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {!quizCompleted ? (
            questions.length ? (
              <>
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>
                      Pregunta {currentQuestionIndex + 1} de {questions.length}
                    </span>
                    <span>
                      Puntuación: {score}/{currentQuestionIndex}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 mb-8">
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 mt-1">
                      <FiHelpCircle />
                    </div>
                    <h2 className="text-xl font-bold">
                      {currentQuestion.titulo || "Cargando..."}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {currentOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectAnswer(index)}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                          selectedAnswer === index
                            ? isAnswerSubmitted
                              ? index === currentQuestion.es_correcta
                                ? "bg-green-500/20 border-green-500"
                                : "bg-red-500/20 border-red-500"
                              : "bg-purple-500/20 border-purple-500"
                            : "border-slate-700 hover:border-slate-600"
                        }`}
                        disabled={isAnswerSubmitted}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                                selectedAnswer === index
                                  ? isAnswerSubmitted
                                    ? index === currentQuestion.es_correcta
                                      ? "bg-green-500 text-white"
                                      : "bg-red-500 text-white"
                                    : "bg-purple-500 text-white"
                                  : "bg-slate-800 text-slate-300"
                              }`}
                            >
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span>
                              {option.texto_respuesta || "Cargando opción..."}
                            </span>
                          </div>

                          {isAnswerSubmitted && (
                            <>
                              {index === currentQuestion.es_correcta && (
                                <FiCheck className="text-green-500" size={20} />
                              )}
                              {selectedAnswer === index &&
                                index !== currentQuestion.es_correcta && (
                                  <FiX className="text-red-500" size={20} />
                                )}
                            </>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => {}}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    <FiFlag />
                    <span>Reportar</span>
                  </button>

                  {isAnswerSubmitted ? (
                    <button
                      onClick={handleNextQuestion}
                      className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                    >
                      <span>Siguiente</span>
                      <FiChevronRight />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        selectedAnswer === null
                          ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-purple-500/20"
                      }`}
                    >
                      Comprobar
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center text-slate-400">
                Cargando preguntas...
              </div>
            )
          ) : (
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-8 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
                <FiCheck className="text-white" size={40} />
              </div>

              <h2 className="text-2xl font-bold mb-2">¡Quiz Completado!</h2>
              <p className="text-slate-400 mb-6">
                Has completado el quiz "{quiz.title || "Sin título"}"
              </p>

              <div className="bg-slate-800/50 rounded-lg p-4 mb-8">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-2">
                  {score}/{questions.length}
                </div>
                <p className="text-slate-400">Puntuación final</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/home"
                  className="px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                  onClick={() => {
                    handleRegisterGame();
                  }}
                >
                  Volver al inicio
                </Link>
                <button
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setSelectedAnswer(null);
                    setIsAnswerSubmitted(false);
                    setScore(0);
                    setQuizCompleted(false);
                    setTimeLeft(30);
                    handleRegisterGame();
                  }}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                  Intentar de nuevo
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default QuizPage;
