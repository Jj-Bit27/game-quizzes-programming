import { pool } from "../database/db.js";

/* Obtener todas las preguntas */
export const getPreguntas = async (req, res) => {
  try {
    const { id_quiz } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM preguntas WHERE quiz_id = ?",
      [id_quiz]
    );

    res
      .json(
        result,
      )
      .status(201);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Obtener una pregunta en especifico */
export const getPregunta = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("SELECT * FROM preguntas WHERE id = ?", [
      id,
    ]);

    res
      .json(
        result,
      )
      .status(201);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Añadir una nueva pregunta */
export const addPregunta = async (req, res) => {
  try {
    const { quiz_id, preguntas } = req.body;

    // Array para almacenar los resultados de las inserciones
    const resultados = [];

    // Usamos un for...of en lugar de forEach para manejar correctamente async/await
    for (const pregunta of preguntas) {
      const { text, correctAnswer } = pregunta;
      const [result] = await pool.query(
        "INSERT INTO preguntas (quiz_id, titulo, es_correcta) VALUES (?, ?, ?)",
        [quiz_id, text, correctAnswer]
      );
      resultados.push({
        id: result.insertId,
        text: text,
        correctAnswer: correctAnswer
      });
    }

    // Devolvemos todos los IDs generados
    res.status(200).json({
      preguntas: resultados,
      message: "Preguntas añadidas correctamente"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Editar una pregunta */
export const editPregunta = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, es_correcta } = req.body;

    const [resultados] = await pool.query("SELECT * FROM preguntas WHERE id = ?", [
      id,
    ]);

    if (resultados.length === 0)
      return res.status(404).json({ message: "La pregunta no se ha encontrado en la base de datos" });

    const [result] = await pool.query(
      "UPDATE preguntas SET titulo = ?, es_correcta = ? WHERE id = ?",
      [titulo, es_correcta, id]
    );

    res.status(200).json({ id, titulo, dificultad });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Eliminar una pregunta */
export const deletePregunta = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultados] = await pool.query("DELETE FROM preguntas WHERE id = ?", [
      id,
    ]);

    if (resultados.affectedRows === 0)
      return res.status(404).json({ message: "No se encontro la pregunta que se desea eliminar" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
