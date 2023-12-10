import getPool from "../db/getPool.js";
import genError from "../utils/helpers.js";

const pool = await getPool();

const insertAnswer = async ({ text, comment_id, user_id }) => {
  try {
    const sqlQuery = `INSERT INTO answercomments (text, comment_id, user_id) VALUES (?,?,?)`;

    const sqlValues = [text, comment_id, user_id];

    const [{ insertId }] = await pool.query(sqlQuery, sqlValues);

    return insertId;
  } catch (error) {
    console.error("Error insertando comentario");
    throw genError("Error insertando comentario", 400);
  }
};

export default insertAnswer;
