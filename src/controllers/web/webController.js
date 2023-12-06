import getPool from "../../db/getPool.js";

const pool = getPool();

const webController = async (req, res) => {
  const loadExp = await pool.query(`
    SELECT * FROM experiences ORDER BY createdAt DESC
    `);
};
