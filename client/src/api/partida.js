import axios from "./axios";

/* Funcion para registrar una nueva partida */
export const registerGameRequest = async (data) =>
  axios.post(`/partida/register`, data);

/* Funcion para obetener todas las partidas del usuario */
export const getGamesUserRequest = async (id_usuario) => axios.get(`/partida/usuario/${id_usuario}`);

/* Funcion para obtener todas las partidas del quiz */
export const getGamesQuizRequest = async (id_quiz) => axios.get(`/partida/quiz/${id_quiz}`);

/* Funcion para obtener el ranking del juego */
export const getRankingRequest = async () => axios.get(`/partida/top-global`);