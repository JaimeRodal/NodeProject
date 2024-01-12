// Importaciones
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

// Guardamos en una variable el gestor de conexiones a la DB
const pool = await getPool();

// Creamos una función para insertar usuarios en la DB, donde le pasaremos los valores necesarios para ello por parámetros
const insertUser = async ({ name, lastName, email, hashedPass, photoPath }) => {
  try {
    // Guardamos en una variable la query
    const sqlQuery = `INSERT INTO users (name, lastName, email, password, photo) VALUES (?, ?, ?, ?, ?)`;

    // Guardamos en una variable los valores que le vamos a pasar a la query
    const sqlValues = [name, lastName, email, hashedPass, photoPath];

<<<<<<< HEAD
    let sqlValues_temp = new Array(sqlValues);
    const sql = sqlQuery.replace(
      /\?/g,
      (match) => `'${sqlValues_temp.shift()}'`
    );
    console.log("Query: " + sql);

=======
    // Realizamos la petición a DB
>>>>>>> main
    const [{ insertId }] = await pool.query(sqlQuery, sqlValues);

    return insertId;
  } catch (error) {
    // En caso de haber un error, lo manejamos
    throw genError("Error insertando usuario", 400);
  }
};

// Creamos una funcion para saber si el email introducido ya existe
const emailExist = async (email) => {
  try {
    // Guardamos en una variable la query
    const sqlQuery = `SELECT * FROM users WHERE email=?`;

    // Guardamos en una variable el parámetro que le vamos a pasar al query
    const sqlValues = [email];

    // Realizamos la petición a sql
    const [{ insertId }] = await pool.query(sqlQuery, sqlValues);
    return insertId;
  } catch (error) {
    // En caso de haber algun error, lo gestionamos
    throw genError("Error buscando el usuario", 400);
  }
};

// Exportaciones
export { insertUser, emailExist };
