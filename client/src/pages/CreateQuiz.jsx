import { useState } from "react";
import {
  FiPlus,
  FiTrash2,
  FiSave,
  FiEdit3,
  FiHelpCircle,
  FiCheck,
  FiX,
  FiAlertCircle,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { handleCreate } from "../lib/handleCreate.jsx";

function CreateQuizPage() {
  const navigate = useNavigate();
  const difficulties = ["fácil", "medio", "difícil"];

  // Estados separados
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState(difficulties[0]);
  const [questions, setQuestions] = useState([
    { text: "", correctAnswer: null },
  ]);
  const [options, setOptions] = useState([["", "", "", ""]]);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Manejar cambios en el título de la pregunta
  const handleQuestionTextChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = value;
    setQuestions(updatedQuestions);

    // Limpiar error si existe
    if (errors.questions?.[index]?.text) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (newErrors.questions && newErrors.questions[index]) {
          delete newErrors.questions[index].text;
        }
        return newErrors;
      });
    }
  };

  // Manejar cambios en las opciones de respuesta
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedOptions = [...options];
    updatedOptions[questionIndex][optionIndex] = value;
    setOptions(updatedOptions);

    // Limpiar error si existe
    if (errors.questions?.[questionIndex]?.options?.[optionIndex]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (newErrors.questions?.[questionIndex]?.options) {
          newErrors.questions[questionIndex].options[optionIndex] = "";
        }
        return newErrors;
      });
    }
  };

  // Establecer la respuesta correcta
  const setCorrectAnswerHandler = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = optionIndex;
    setQuestions(updatedQuestions);

    // Limpiar error si existe
    if (errors.questions?.[questionIndex]?.correctAnswer) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (newErrors.questions && newErrors.questions[questionIndex]) {
          delete newErrors.questions[questionIndex].correctAnswer;
        }
        return newErrors;
      });
    }
  };

  // Añadir nueva pregunta
  const addQuestion = () => {
    setQuestions([...questions, { text: "", correctAnswer: null }]);
    setOptions([...options, ["", "", "", ""]]);
  };

  // Eliminar pregunta
  const removeQuestion = (questionIndex) => {
    if (questions.length <= 1) return; // Mantener al menos una pregunta

    setQuestions(questions.filter((_, idx) => idx !== questionIndex));
    setOptions(options.filter((_, idx) => idx !== questionIndex));

    // Limpiar errores para esta pregunta
    if (errors.questions?.[questionIndex]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (newErrors.questions) {
          delete newErrors.questions[questionIndex];
        }
        return newErrors;
      });
    }
  };

  // Añadir opción a una pregunta
  const addOption = (questionIndex) => {
    const updatedOptions = [...options];
    updatedOptions[questionIndex].push("");
    setOptions(updatedOptions);
  };

  // Eliminar opción de una pregunta
  const removeOption = (questionIndex, optionIndex) => {
    const questionOptions = options[questionIndex];
    if (!questionOptions || questionOptions.length <= 2) return;

    let newCorrectAnswer = questions[questionIndex].correctAnswer;
    if (newCorrectAnswer === optionIndex) {
      newCorrectAnswer = null;
    } else if (newCorrectAnswer !== null && newCorrectAnswer > optionIndex) {
      newCorrectAnswer -= 1;
    }

    const updatedOptions = [...options];
    updatedOptions[questionIndex] = questionOptions.filter(
      (_, idx) => idx !== optionIndex
    );
    setOptions(updatedOptions);

    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = newCorrectAnswer;
    setQuestions(updatedQuestions);
  };

  // Validar el quiz
  const validateQuiz = () => {
    const newErrors = {};

    // Validar título
    if (!title.trim()) {
      newErrors.title = "El título es obligatorio";
    }

    // Validar preguntas y opciones
    questions.forEach((question, index) => {
      const questionErrors = {};

      // Validar texto de la pregunta
      if (!question.text.trim()) {
        questionErrors.text = "La pregunta es obligatoria";
      }

      // Validar opciones
      const optionErrors = [];
      let hasEmptyOption = false;

      options[index].forEach((option, optIdx) => {
        if (!option.trim()) {
          optionErrors[optIdx] = "La opción no puede estar vacía";
          hasEmptyOption = true;
        } else {
          optionErrors[optIdx] = "";
        }
      });

      if (hasEmptyOption) {
        questionErrors.options = optionErrors;
      }

      // Validar respuesta correcta
      if (question.correctAnswer === null) {
        questionErrors.correctAnswer =
          "Debes seleccionar una respuesta correcta";
      }

      // Añadir errores de esta pregunta si existen
      if (Object.keys(questionErrors).length > 0) {
        if (!newErrors.questions) {
          newErrors.questions = {};
        }
        newErrors.questions[index] = questionErrors;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Guardar quiz
  const handleSaveQuiz = () => {
    if (validateQuiz()) {
      handleCreate(title, difficulty, questions, options);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/home");
      }, 3000);
    }
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
        </div>
      </div>

      <div className="relative z-10">
        <main className="container mx-auto px-6 pt-20 pb-4">
          {showSuccess && (
            <div className="fixed top-20 right-4 bg-green-500/90 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in-out">
              <FiCheck />
              <span>¡Quiz guardado correctamente!</span>
            </div>
          )}

          <section className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <FiEdit3 className="mr-2 text-purple-400" />
              <span>Información del Quiz</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-slate-400 mb-1"
                >
                  Título del Quiz*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Historia Mundial"
                  className={`w-full bg-slate-800/50 border ${
                    errors.title ? "border-red-500" : "border-slate-700"
                  } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500 error-message">
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="difficulty"
                  className="block text-sm font-medium text-slate-400 mb-1"
                >
                  Dificultad
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  {difficulties.map((diff) => (
                    <option key={diff} value={diff}>
                      {diff}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <FiHelpCircle className="mr-2 text-purple-400" />
                <span>Preguntas</span>
              </h2>

              <button
                onClick={addQuestion}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <FiPlus />
                <span>Añadir Pregunta</span>
              </button>
            </div>

            {questions.map((question, questionIndex) => (
              <div
                key={questionIndex}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 mb-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <span className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mr-2">
                      {questionIndex + 1}
                    </span>
                    <span>Pregunta</span>
                  </h3>

                  <button
                    onClick={() => removeQuestion(questionIndex)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                    title="Eliminar pregunta"
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor={`question-${questionIndex}`}
                    className="block text-sm font-medium text-slate-400 mb-1"
                  >
                    Texto de la pregunta*
                  </label>
                  <input
                    type="text"
                    id={`question-${questionIndex}`}
                    value={question.text}
                    onChange={(e) =>
                      handleQuestionTextChange(questionIndex, e.target.value)
                    }
                    placeholder="Ej: ¿Cuál es la capital de Francia?"
                    className={`w-full bg-slate-800/50 border ${
                      errors.questions?.[questionIndex]?.text
                        ? "border-red-500"
                        : "border-slate-700"
                    } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                  />
                  {errors.questions?.[questionIndex]?.text && (
                    <p className="mt-1 text-sm text-red-500 error-message">
                      {errors.questions[questionIndex].text}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-slate-400">
                      Opciones de respuesta*
                    </label>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          removeOption(
                            questionIndex,
                            options[questionIndex].length - 1
                          )
                        }
                        className={`text-xs px-2 py-1 rounded ${
                          options[questionIndex].length <= 2
                            ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        } transition-colors`}
                        disabled={options[questionIndex].length <= 2}
                      >
                        - Opción
                      </button>

                      <button
                        onClick={() => addOption(questionIndex)}
                        className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                      >
                        + Opción
                      </button>
                    </div>
                  </div>

                  {errors.questions?.[questionIndex]?.correctAnswer && (
                    <p className="mb-2 text-sm text-red-500 flex items-center error-message">
                      <FiAlertCircle className="mr-1" />
                      {errors.questions[questionIndex].correctAnswer}
                    </p>
                  )}

                  <div className="space-y-3">
                    {options[questionIndex].map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex items-center gap-3"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setCorrectAnswerHandler(questionIndex, optionIndex)
                          }
                          className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${
                            question.correctAnswer === optionIndex
                              ? "bg-green-500 text-white"
                              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                          } transition-colors`}
                          title="Marcar como respuesta correcta"
                        >
                          {question.correctAnswer === optionIndex ? (
                            <FiCheck size={14} />
                          ) : (
                            ""
                          )}
                        </button>

                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(
                              questionIndex,
                              optionIndex,
                              e.target.value
                            )
                          }
                          placeholder={`Opción ${optionIndex + 1}`}
                          className={`flex-grow bg-slate-800/50 border ${
                            errors.questions?.[questionIndex]?.options?.[
                              optionIndex
                            ]
                              ? "border-red-500"
                              : "border-slate-700"
                          } rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        />

                        <button
                          onClick={() =>
                            removeOption(questionIndex, optionIndex)
                          }
                          className={`text-slate-400 hover:text-red-500 transition-colors ${
                            options[questionIndex].length <= 2
                              ? "invisible"
                              : ""
                          }`}
                          disabled={options[questionIndex].length <= 2}
                          title="Eliminar opción"
                        >
                          <FiX />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addQuestion}
              className="w-full py-3 rounded-lg border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition-all flex items-center justify-center gap-2"
            >
              <FiPlus />
              <span>Añadir otra pregunta</span>
            </button>
          </section>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSaveQuiz}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              <FiSave />
              <span>Guardar Quiz</span>
            </button>
          </div>
        </main>
      </div>

      <style jsx global>
        {`
          @keyframes fade-in-out {
            0% {
              opacity: 0;
              transform: translateY(-10px);
            }
            10% {
              opacity: 1;
              transform: translateY(0);
            }
            90% {
              opacity: 1;
              transform: translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateY(-10px);
            }
          }

          .animate-fade-in-out {
            animation: fade-in-out 3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}

export default CreateQuizPage;
