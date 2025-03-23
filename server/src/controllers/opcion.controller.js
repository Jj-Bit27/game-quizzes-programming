import { pool } from "../database/db.js";

/* Obtener todas las opciones de la pregunta */
export const getOpciones = async (req, res) => {
  try {
    const { id_pregunta } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM opciones_respuesta WHERE pregunta_id = ?",
      [id_pregunta]
    );

    res
      .json({
        id: result.insertId,
        result,
      })
      .status(201);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Obtener una opcion en especifico */
export const getOpcion = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("SELECT * FROM opciones_respuesta WHERE id = ?", [
      id,
    ]);

    res
      .json({
        id: result.insertId,
        result,
      })
      .status(201);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Añadir una nueva opcion a la pregunta */
export const addOpcion = async (req, res) => {
  try {
    const { pregunta_id, opciones } = req.body;

    const flatOptions = opciones.flat();

    // Array para almacenar los resultados de las opciones
    const resultadosOpciones = [];

    for (const opcion of flatOptions) {
      const [result] = await pool.query(
        "INSERT INTO opciones_respuesta (pregunta_id, texto_respuesta) VALUES (?, ?)",
        [pregunta_id, opcion]
      );
      resultadosOpciones.push({
        id: result.insertId,
        texto_respuesta: opcion
      });
    }

    res.status(201).json({
      opciones: resultadosOpciones,
      message: "Opciones añadidas correctamente"
    });
  } catch (error) {
    console.error("Error al añadir opciones:", error);
    return res.status(500).json({ message: error.message });
  }
};

/* Editar una opcion */
export const editOpcion = async (req, res) => {
  try {
    const { id } = req.params;
    const { texto_respuesta } = req.body;

    const [resultados] = await pool.query("SELECT * FROM opciones_respuesta WHERE id = ?", [
      id,
    ]);

    if (resultados.length === 0)
      return res.status(404).json({ message: "La opcion no se ha encontrado en la base de datos" });

    const [result] = await pool.query(
      "UPDATE opciones_respuesta SET texto_respuesta = ? WHERE id = ?",
      [texto_respuesta, id]
    );

    res.status(200).json({ id, texto_respuesta });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Eliminar una opcion */
export const deleteOpcion = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultados] = await pool.query("DELETE FROM opciones_respuesta WHERE id = ?", [
      id,
    ]);

    if (resultados.affectedRows === 0)
      return res.status(404).json({ message: "No se encontro la opcion que se desea eliminar" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
