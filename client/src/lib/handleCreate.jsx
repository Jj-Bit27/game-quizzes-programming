import { addQuizRequest } from "../api/quiz.js";
import { addQuestionRequest } from "../api/pregunta.js";
import { addOpcionRequest } from "../api/opcion.js";

export async function handleCreate(title, difficulty, questions, options) {
  try {
    const { data: quizData } = await addQuizRequest({
      titulo: title,
      dificultad: difficulty,
      tiempo_limite: 60,
      fecha: new Date().toISOString().slice(0, 19).replace("T", " "),
    });

    const { data: questionsData } = await addQuestionRequest({
      quiz_id: quizData.id,
      preguntas: questions.map((q) => ({
        text: q.text,
        correctAnswer: q.correctAnswer,
      })),
    });

    for (let i = 0; i < questionsData.preguntas.length; i++) {
      const pregunta = questionsData.preguntas[i];
      const preguntaOptions = options[i] || [];

      await addOpcionRequest({
        pregunta_id: pregunta.id,
        opciones: preguntaOptions,
      });
    }

    return {
      quizId: quizData.id,
      questions: questionsData.preguntas,
    };
  } catch (error) {
    console.error("Error al crear el quiz:", error);
    throw error;
  }
}
