import getPool from "../db/getPool.js";

const pool = await getPool();

const insertExperience = async ({
  id,
  title,
  subtitle,
  place,
  text,
  photo,
  loggedUserId,
  category_id,
}) => {
  try {
    const [{ insertId }] = await pool.query(
      `INSERT INTO experiences (
        id,
        title,
        subtitle,
        place,
        text,
        photo,
        user_id,
        category_id,
        createdAt,
        updatedAt) VALUES (?,?,?,?,?,?,?,?,NOW(), NOW())`,
      [id, title, subtitle, place, text, photo, loggedUserId, category_id]
    );
    return insertId;
  } catch {
    throw new Error("Error inserting experience");
  }
};

export default insertExperience;
