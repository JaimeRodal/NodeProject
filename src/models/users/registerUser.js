import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

const pool = await getPool();

const insertUser = async ({ name, lastName, email, hashedPass, photoPath }) => {
  try {
    const sqlQuery = `INSERT INTO users (name, lastName, email, password, photo) VALUES (?, ?, ?, ?, ?)`;
    const sqlValues = [name, lastName, email, hashedPass, photoPath];

    let sqlValues_temp = new Array(sqlValues);
    const sql = sqlQuery.replace(
      /\?/g,
      (match) => `'${sqlValues_temp.shift()}'`
    );
    console.log("Query: " + sql);

    const [{ insertId }] = await pool.query(sqlQuery, sqlValues);

    return insertId;
  } catch (error) {
    console.error("Error insertando usuario");
    throw genError("Error insertando usuario", 400);
  }
};

const emailExist = async (email) => {
  try {
    // console.log(email);
    const sqlQuery = `SELECT * FROM users WHERE email=?`;

    const sqlValues = [email];

    const [{ insertId }] = await pool.query(sqlQuery, sqlValues);
    return insertId;
  } catch (error) {
    console.error("Error buscando el usuario");
    throw genError("Error buscando el usuario", 400);
  }
};

export { insertUser, emailExist };
