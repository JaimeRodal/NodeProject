// Importaciones
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

// Importamos e usamos el gestor de conexión a la DB
const pool = await getPool();

// Creamos una función de filtrado donde busca y extrae las coincidencias en las experiencias publicadas buscando en lugares y categorías
const getExperiencesController = async (req, res, next) => {
  try {
    // Obtenemos en la variable list el tipo de listado ('search' o 'votes'), según sea una búsqueda o un listado por votos
    const list = req.query.list;

    if (list === "search") {
      // Definimos en una variable el parametro de búsqueda recibido para su uso
      const searchText = req.query.text;
      // Creamos una petición a la DB pasándole el parámetro anterior
      const [filter] = await pool.query(
        `
        SELECT 
          exp.title,
          exp.subTitle,
          exp.place,
          exp.text,
          exp.photo,
          cat.name AS category_name,
          COALESCE(COUNT(v.exp_id), 0) AS likes,
          u.name AS user_name,
          u.photo AS user_photo,
          CONCAT(
              '[',
              GROUP_CONCAT(
                  CONCAT(
                      '{"comment_text":"', c.text, '", "comment_user":"', cu.name, '", "answer_text":"', ans.text, '", "answer_user":"', au.name, '"}'
                  )
                  ORDER BY c.id, ans.id
                  SEPARATOR ','
              ),
              ']'
          ) AS comments_and_answers
              FROM 
                  experiences exp
              JOIN 
                  categories cat ON exp.category_id = cat.id 
              JOIN 
                  users u ON exp.user_id = u.id
              LEFT JOIN 
                  votes v ON exp.id = v.exp_id
              LEFT JOIN 
                  comments c ON exp.id = c.exp_id
              LEFT JOIN 
                  answercomments ans ON c.id = ans.comment_id
              LEFT JOIN 
                  users cu ON c.user_id = cu.id
              LEFT JOIN 
                  users au ON ans.user_id = au.id
              WHERE 
                  exp.place LIKE ? OR cat.name LIKE ? OR exp.title LIKE ? OR exp.subTitle LIKE ? OR exp.text LIKE ? OR u.name LIKE ?
              GROUP BY
                  exp.title, exp.subTitle, exp.place, exp.text, exp.photo, cat.name, u.name, u.photo
              ORDER BY 
                  exp.createdAt DESC;





    `,
        [
          `%${searchText}%`,
          `%${searchText}%`,
          `%${searchText}%`,
          `%${searchText}%`,
          `%${searchText}%`,
          `%${searchText}%`,
        ]
      );

      // En caso de no haber ninguna coincidencia de búsqueda genera mensaje de error
      if (!filter || filter.length === 0) {
        throw genError("No hay ninguna coincidencia", 401);
      }

      // Respuesta
      res.send({
        status: "Correcto",
        data: filter,
      });
    } else if (list === "votes") {
      let order = req.query.order;

      // Comprobamos que el parámetro pasado coincida con alguna de las dos necesarias para realizar la acción correctamente, de no ser así, generamos un error
      if (order !== "DESC" && order !== "ASC") {
        throw genError("Los valores introducidos han de ser ASC o DESC", 400);
      }

      // Creamos la query de SQL pasándole el parámetro adecuado a la petición
      const sqlQuery = `
      SELECT 
          exp.title,
          exp.subTitle,
          exp.place,
          exp.text,
          exp.photo,
          cat.name AS category_name,
          COALESCE(COUNT(v.exp_id), 0) AS likes,
          u.name AS user_name,
          u.photo AS user_photo,
          CONCAT(
              '[',
              GROUP_CONCAT(
                  CONCAT(
                      '{"comment_text":"', c.text, '", "comment_user":"', cu.name, '", "answer_text":"', ans.text, '", "answer_user":"', au.name, '"}'
                  )
                  ORDER BY c.id, ans.id
                  SEPARATOR ','
              ),
              ']'
          ) AS comments_and_answers
              FROM 
                  experiences exp
              JOIN 
                  categories cat ON exp.category_id = cat.id 
              JOIN 
                  users u ON exp.user_id = u.id
              LEFT JOIN 
                  votes v ON exp.id = v.exp_id
              LEFT JOIN 
                  comments c ON exp.id = c.exp_id
              LEFT JOIN 
                  answercomments ans ON c.id = ans.comment_id
              LEFT JOIN 
                  users cu ON c.user_id = cu.id
              LEFT JOIN 
                  users au ON ans.user_id = au.id
              GROUP BY
                  exp.title, exp.subTitle, exp.place, exp.text, exp.photo, cat.name, u.name, u.photo
              ORDER BY 
                  likes ${order === "DESC" ? "DESC" : "ASC"};
    `;

      // Realizamos la petición a la DB
      const [orderBy] = await pool.query(sqlQuery);

      // Respuesta
      res.send({
        status: "Correcto",
        data: orderBy,
      });
    }
  } catch (error) {
    // En caso de error pasamos el error al middleware de gestión de errores
    next(error);
  }
};

// Exportamos la función
export default getExperiencesController;
