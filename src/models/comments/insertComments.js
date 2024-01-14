// Importaciones
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

// Guardamos en una variable el gestor de conexión a la DB
const pool = await getPool();

// Creamos una función que inserte el comentario en la DB
const insertComment = async ({ text, exp_id, user_id }) => {
  try {
    // Guardado en una variable la query
    const sqlQuery = `INSERT INTO comments (text, exp_id, user_id) VALUES (?,?,?)`;

    // Guardamos en una variable los valores que le pasaremos a la query
    const sqlValues = [text, exp_id, user_id];

    // Hacemos la petición a la DB
    const [{ insertId }] = await pool.query(sqlQuery, sqlValues);

    return insertId;
  } catch (error) {
    // En caso de haber algún error, lo manejamos
    throw genError(`Error insertando comentario: ${error.message}`, 400);
  }
};

// Exportaciones
export default insertComment;
