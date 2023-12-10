import getPool from "../db/getPool.js";

const pool = await getPool();

const insertComment = async ({ text, exp_id, user_id }) => {
  try {
    const sqlQuery = `INSER INTO comments (text, exp_id, user_id) VALUES (?,?,?)`;

    const sqlValues = [text, exp_id, user_id];

    const [{ insertId }] = await pool.query(sqlQuery, sqlValues);

    return insertId;
  } catch (error) {
    console.error("Error insertando comentario");
    next(error);
  }
};

export default insertComment;
