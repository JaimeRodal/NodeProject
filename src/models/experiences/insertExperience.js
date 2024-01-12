// Importaciones
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

// Guardamos en una variable el gestor de conexiones a la DB
const pool = await getPool();

// Creamos una función para insertar una experiencia en la DB
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
    // Guardamos en una variable la query
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

    // Guardamos en una variable los parámetros que le pasaremos a la query
    const sqlValues = [
      title,
      subTitle,
      place,
      text,
      photoPath,
      loggedUserId,
      category,
    ];

<<<<<<< HEAD
    let sqlValues_temp = new Array(sqlValues);
    const sql = sqlQuery.replace(
      /\?/g,
      (match) => `'${sqlValues_temp.shift()}'`
    );
    console.log("Query: " + sql);

=======
    // Realizamos la petición a la DB
>>>>>>> main
    const [{ insertId }] = await pool.query(sqlQuery, sqlValues);

    return insertId;
  } catch (error) {
    // En caso de haber algun error, lo manejamos
    throw genError("Error insertando la experiencia", 500);
  }
};

// Exportaciones
export default insertExperience;
