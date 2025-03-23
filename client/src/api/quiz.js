import axios from "./axios";

/* Funcion para obtener todos los questionario */
export const getQuizzesRequest = async () =>
  axios.get(`/quiz/gets`);

/* Funcion para obetener un questionario */
export const getQuizRequest = async (id) => axios.get(`/quiz/get/${id}`);

/* Funcion para añadir un questionario */
export const addQuizRequest = async (data) => axios.post(`/quiz/add`, data);

/* Funcion para editar un questionario */
export const editQuizRequest = async (id, data) => axios.put(`/quiz/edit/${id}`, data);

/* Funcion para eliminar un questionario */
export const deleteQuizRequest = async (id) => axios.delete(`/quiz/delete/${id}`);