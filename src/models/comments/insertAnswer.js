// Importaciones
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

// Guardamos en una variable el gestor de conexiones a la DB
const pool = await getPool();

// Creamos una función que inserta los parámetros que le demos como respuesta de un comentario
const insertAnswer = async ({ text, comment_id, id, user_id }) => {
  try {
    // Creamos el query de la petición a DB
    const sqlQuery = `INSERT INTO answerComments (text, comment_id, user_id) VALUES (?,?,?)`;

    // Valores que meteremos en la query
    const sqlValues = [text, comment_id, user_id];

    // Petición a la DB
    const [{ insertId }] = await pool.query(sqlQuery, sqlValues);

    return insertId;
  } catch (error) {
    // De haber algún error, lo manejamos
    throw genError(`Error insertando comentario: ${error.message}`, 400);
  }
};

// Exportaciones
export default insertAnswer;
