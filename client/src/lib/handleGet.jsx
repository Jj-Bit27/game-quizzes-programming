import { useState } from "react";
import { getQuizRequest } from "../api/quiz.js";
import { getQuestionsRequest } from "../api/pregunta.js";
import { getOpcionesRequest } from "../api/opcion.js";

async function handleGet(params, setQuiz, setQuestions, setOptions) {
  if (params.id) {
    try {
      const { data: dataExam } = await getQuizRequest(params.id);
      setQuiz(dataExam[0]);

      const { data: dataQuestion } = await getQuestionsRequest(dataExam[0].id);
      const questions = dataQuestion.result || dataQuestion;
      setQuestions(questions);

      const optionsPerQuestion = await Promise.all(
        questions.map(async (question) => {
          const { data: dataOptions } = await getOpcionesRequest(question.id);
          return dataOptions.result || dataOptions;
        })
      );
      setOptions(optionsPerQuestion);
    } catch (error) {
      console.error("Error en handleGet:", error);
    }
  }
}

export default handleGet;
