import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";
const pool = await getPool();

const insertExperience = async ({
  title,
  subTitle,
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
        subTitle,
        place,
        text,
        photo,
        user_id,
        category_id
      ) VALUES (?,?,?,?,?,?,?)
    `;

    const sqlValues = [
      title,
      subTitle,
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
    throw genError("Error insertando la experiencia", 500);
  }
};

export default insertExperience;
