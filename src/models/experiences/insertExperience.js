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
    const sqlQuery = `INSERT INTO experiences (title,
        subTitle,
        place,
        text,
        photo,
        user_id,
        category_id) VALUES (?,?,?,?,?,?,?)`;

    const title = "Sample Title";
    const subTitle = "Sample Subtitle";
    const place = "Sample Place";
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const photoPath = "gggggg";
    const loggedUserId = "1";
    const category = "3";

    const sqlValues = [
      title,
      subTitle,
      place,
      text,
      photoPath,
      loggedUserId,
      category,
    ];

    const sql = sqlQuery.replace(/\?/g, (match) => `'${sqlValues.shift()}'`);
    console.log("Query: " + sql);

    // const [{ insertId }] = await pool.query(sqlQuery, sqlValues);

    const [{ insertId }] = await pool.query(sqlQuery, sqlValues);

    return insertId;
  } catch (error) {
    console.error("Error insertando la experiencia: " + error);
    throw genError("Error insertando la experiencia", 500);
  }
};

export default insertExperience;
