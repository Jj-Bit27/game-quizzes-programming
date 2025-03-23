import axios from "./axios";

/* Funcion para obetener todas las opciones de las pregunta */
export const getOpcionesRequest = async (id_pregunta) =>
  axios.get(`/opcion/gets/${id_pregunta}`);

/* Funcion para obetener una opcion en especifico */
export const getOpcionRequest = async (id) => axios.get(`/opcion/get/${id}`);

/* Funcion para añadir una opcion */
export const addOpcionRequest = async (data) => axios.post(`/opcion/add`, data);

/* Funcion para editar una opcion */
export const editOpcionRequest = async (id, data) => axios.put(`/opcion/edit/${id}`, data);

/* Funcion para eliminar una opcion */
export const deleteOpcionRequest = async (id) => axios.delete(`/opcion/delete/${id}`);