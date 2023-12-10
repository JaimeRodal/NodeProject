import getPool from "../db/getPool.js";
import mysql from "mysql2";

const pool = await getPool();

const insertExperience = async ({
  title,
  subtitle,
  place,
  text,
  photo,
  loggedUserId,
  category_id,
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
      photo,
      loggedUserId,
      category_id,
    ];

    console.log("Query: " + mysql.format(sqlQuery, sqlValues));
    const [{ insertId }] = await pool.query(
      `INSERT INTO experiences (
        title,
        subtitle,
        place,
        text,
        photo,
        user_id,
        category_id) VALUES (?,?,?,?,?,?,?)`,
      [title, subtitle, place, text, photo, loggedUserId, category_id]
    );
    return insertId;
  } catch (error) {
    // throw new Error("Error inserting experience: " + error);
    console.error("Error inserting experience: " + error);
  }
};

export default insertExperience;
