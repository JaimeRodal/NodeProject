import getPool from "../db/getPool.js";
import genError from "../utils/helpers.js";
const pool = await getPool();

const insertExperience = async ({
  title,
  subtitle,
  place,
  text,
  photoPath,
  loggedUserId,
  category,
}) => {
  try {
    const sqlQuery = `
      INSERT INTO experiences (
        title,
        subtitle,
        place,
        text,
        photo,
        user_id,
        category_id
      ) VALUES (?,?,?,?,?,?,?)
    `;

    const sqlValues = [
      title,
      subtitle,
      place,
      text,
      photoPath,
      loggedUserId,
      category,
    ];

    const [{ insertId }] = await pool.query(sqlQuery, sqlValues);

    return insertId;
  } catch (error) {
    console.error("Error insertando la experiencia: " + error);
    throw genError("Error insertando la experiencia", 400);
  }
};

export default insertExperience;
