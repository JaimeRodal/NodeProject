import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

// Definimos el gestor de conexiones a la DB
const pool = await getPool();

// Creamos una función donde ordenaremos las experiencias por votos de mayor a menor o viceversa dependiendo del parámetro que le pasemos en la req
const votesOrderController = async (req, res, next) => {
  try {
    // Guardamos el parámetro text en variable y lo convertimos en string para su uso
    const { text } = req.params;
    const text2Str = text.toString();

    // Comprobamos que el parámetro pasado coincida con alguna de las dos necesarias para realizar la acción correctamente, de no ser así, generamos un error
    if (text2Str !== "DESC" && text2Str !== "ASC") {
      throw genError("Los valores introducidos han de ser ASC o DESC", 400);
    }

    // Creamos la query de SQL pasándole el parámetro adecuado a la petición
    const sqlQuery = `
      SELECT exp.title, exp.subTitle, exp.place, exp.text, exp.photo, cat.name, COUNT(v.exp_id) AS vote_count
      FROM experiences exp
      JOIN categories cat ON exp.category_id = cat.id
      LEFT JOIN votes v ON exp.id = v.exp_id
      GROUP BY exp.id, exp.title, exp.subTitle, exp.place, exp.text, exp.photo, cat.name
      ORDER BY vote_count ${text2Str === "DESC" ? "DESC" : "ASC"}
    `;

    // Realizamos la petición a la DB
    const [orderBy] = await pool.query(sqlQuery);

    // Respuesta
    res.send({
      status: "Correcto",
      data: orderBy,
    });
  } catch (error) {
    next(error);
  }
};

export default votesOrderController;
