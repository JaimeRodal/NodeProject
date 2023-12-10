import getPool from "../db/getPool.js";
import genError from "../utils/helpers.js";

const pool = await getPool();

const insertComment = async ({ text, exp_id, user_id }) => {
  try {
    const sqlQuery = `INSERT INTO comments (text, exp_id, user_id) VALUES (?,?,?)`;

    const sqlValues = [text, exp_id, user_id];

    const [{ insertId }] = await pool.query(sqlQuery, sqlValues);

    return insertId;
  } catch (error) {
    console.error("Error insertando comentario");
    throw genError("Error insertando comentario");
  }
};

export default insertComment;
