import getPool from "../db/getPool.js";

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
    throw error;
  }
};

export default insertExperience;
