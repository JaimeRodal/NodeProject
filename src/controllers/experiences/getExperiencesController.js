// Importaciones
import getPool from "../../db/getPool.js";

// Importamos e usamos el gestor de conexión a la DB
const pool = await getPool();

// Creamos una función para listar experiencias con opciones de filtrado donde busca y extrae las coincidencias en las experiencias publicadas buscando en lugares y categorías, y es capaz de orodenar por votos, según los parámetros introducidos
const getExperiencesController = async (req, res, next) => {
  try {
    // declaramos las variables con partes de sql para hacer combinaciones
    let query = "";
    const query_select = `SELECT 
    exp.id,
    exp.title,
    exp.subTitle,
    exp.place,
    exp.text,
    exp.photo,
    exp.createdAt,
    exp.user_id,
    cat.name AS category_name,
    COALESCE(COUNT(DISTINCT v.id), 0) AS likes,
    u.name AS user_name,
    u.lastName AS user_lastName,
    u.photo AS user_photo,
    CONCAT(
      '[',
      GROUP_CONCAT(
        DISTINCT CONCAT(
              '{"comment_id":"', c.id, '","comment_text":"', c.text, '", "comment_user":"', cu.name, '", "comment_userLast":"', cu.lastName, '", "comment_user_photo":"', cu.photo, '", "comment_created_at":"', c.createdAt, '"}'
          )
          ORDER BY c.id DESC
          SEPARATOR ','
      ),
      ']'
  ) AS comments
  
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
    users cu ON c.user_id = cu.id`;
    const query_where = `WHERE 
            exp.place LIKE ? OR cat.name LIKE ? OR exp.title LIKE ? OR exp.subTitle LIKE ? OR exp.text LIKE ? OR u.name LIKE ?`;
    const query_group = `GROUP BY
            exp.id `;
    let query_order = ` ORDER BY 
            exp.id DESC`;

    // hay 2 opciones principales: lista simple o lista filtrada
    const query_list = query_select + "\n" + query_group;
    const query_filtered_list =
      query_select + "\n" + query_where + "\n" + query_group;

    // Obtenemos el valor de los parámetros
    const search = req.query.search;
    const orderBy = req.query.orderBy;
    const orderDirection = req.query.orderDirection;

    // si se quiere ordenar por votos, se añade el order by al final de la query
    if (orderBy === "votes" && orderDirection) {
      query_order = " ORDER BY likes " + orderDirection;
    }
    query += query_order;

    // si se va a filtrar por un texto, se elige la lista filtrada, se realiza la búsqueda y se devuelve el resultado
    if (search) {
      query = query_filtered_list + "\n" + query;
      const [list] = await pool.query(query, [
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
      ]);
      // console.log(list);
      res.send({
        status: "Correcto",
        data: list,
      });
    }
    // si no se va a filtrar por un texto, se elige la lista simple, se realiza la búsqueda y se devuelve el resultado
    else {
      query = query_list + "\n" + query;
      const [list] = await pool.query(query);
      console.log(list);
      res.send({
        status: "Correcto",
        data: list,
      });
    }

    // console.log("query: " + query);
  } catch (error) {
    // En caso de error pasamos el error al middleware de gestión de errores
    next(error);
  }
};

// Exportamos la función
export default getExperiencesController;
