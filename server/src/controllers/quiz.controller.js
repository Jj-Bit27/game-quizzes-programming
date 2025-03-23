import { pool } from '../database/db.js';

/* Obtener todos los quizes */
export const getQuizes = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM quizzes ");
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Obtener un quiz en especifico */
export const getQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("SELECT * FROM quizzes WHERE id = ?", [id]);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Añadir un nuevo quiz */
export const addQuiz = async (req, res) => {
  try {
    const { titulo, tiempo_limite, dificultad } = req.body;
    const [result] = await pool.query(
      "INSERT INTO quizzes (titulo, tiempo_limite, dificultad) VALUES (?, ?, ?)",
      [titulo, tiempo_limite, dificultad]
    );
    res.status(201).json({ id: result.insertId, titulo, tiempo_limite, dificultad });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Editar un quiz */
export const editQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, tiempo_limite, dificultad } = req.body;
    const [result] = await pool.query(
      "UPDATE quizzes SET titulo = ?, tiempo_limite = ?, dificultad WHERE id = ?",
      [titulo, tiempo_limite, dificultad, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Respuesta no encontrada" });
    res.status(200).json({ id, titulo, tiempo_limite, dificultad });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Eliminar un quiz */
export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM quizzes WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Respuesta no encontrada" });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};