import getPool from "../db/getPool.js";

const pool = await getPool();

const insertExperience = async ({
  id,
  title,
  subTitle,
  place,
  text,
  loggedUserId,
  category_id,
  createdAt,
  updatedAt,
}) => {
  try {
    const [{ insertId }] = await pool.query(
      `INSERT INTO experiences (
        title,
        subTitle,
        place,
        text,
        user_id,
        category_id,
        createdAt,
        updatedAt) VALUES (?,?,?,?,DEFAULT, DEFAULT )`,
      [
        title,
        subTitle,
        place,
        text,
        photo,
        loggedUserId,
        category_id,
        createdAt,
        updatedAt,
      ]
    );
    return insertId;
  } catch {
    throw new Error("Error inserting experience");
  }
};

export default insertExperience;
