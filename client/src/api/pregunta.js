import axios from "./axios";

/* Funcion para obtener todas las preguntas */
export const getQuestionsRequest = async (id_quiz) =>
  axios.get(`/pregunta/gets/${id_quiz}`);

/* Funcion para obetener una pregunta */
export const getQuestionRequest = async (id) => axios.get(`/pregunta/get/${id}`);

/* Funcion para añadir una pregunta */
export const addQuestionRequest = async (data) => axios.post(`/pregunta/add`, data);

/* Funcion para editar una pregunta */
export const editQuestionRequest = async (id, data) => axios.put(`/pregunta/edit/${id}`, data);

/* Funcion para eliminar una pregunta */
export const deleteQuestionRequest = async (id) => axios.delete(`/pregunta/delete/${id}`);