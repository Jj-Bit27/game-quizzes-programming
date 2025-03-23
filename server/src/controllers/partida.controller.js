import { pool } from "../database/db.js";

/* Registrar una nueva partida */
export const registerPartida = async (req, res) => {
  try {
    const { usuario_id, quiz_id, puntaje } = req.body;
    if (usuario_id !== 'admin') {
      const [result] = await pool.query(
        "INSERT INTO partidas (usuario_id, quiz_id, puntaje) VALUES (?, ?, ?)",
        [usuario_id, quiz_id, puntaje]
      );

      res.json({
        result
      }).status(201);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Obtener todas las partidas de un usuario */
export const getPartidasUsuario = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const [result] = await pool.query("SELECT * FROM partidas WHERE usuario_id = ? ORDER BY fecha DESC", [
      usuario_id
    ]);

    res.json({
      result
    }).status(201);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Obtener todas las partidas de un quiz */
export const getPartidasQuiz = async (req, res) => {
  try {
    const { quiz_id } = req.params;

    const [result] = await pool.query(
      "SELECT * FROM partidas WHERE quiz_id = ? ORDER BY fecha DESC",
      [quiz_id]
    );

    res.json({
      result
    }).status(201);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Obtener el ranking total */
export const getRanking = async (req, res) => {
  try {
    const [result] = await pool.query(
      `
      SELECT 
        u.id, 
        u.nombre, 
        SUM(p.puntaje) AS total_puntos, 
        COUNT(p.id) AS total_partidas
      FROM partidas p
      JOIN usuarios u ON p.usuario_id = u.id
      GROUP BY u.id, u.nombre
      ORDER BY total_puntos DESC
      LIMIT 10
      `
    );

    res.status(200).json({ result });
  } catch (error) {
    console.error("Error en la query:", error);
    return res.status(500).json({ message: error.message });
  }
};