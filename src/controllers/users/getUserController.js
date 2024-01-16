import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

const pool = await getPool();

const getUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const authUserId = req.auth;

    if (String(authUserId) !== String(id)) {
      throw genError("No tienes permisos para obtener este usuario", 403);
    }

    const query_select = `SELECT 
    u.*,
    CONCAT(
        '[',
        GROUP_CONCAT(
            '{"title":"', exp.title, '"}'
            SEPARATOR ','
        ),
        ']'
    ) AS experiences
        FROM 
            users u
        LEFT JOIN 
            experiences exp ON u.id = exp.user_id
        WHERE 
            u.id = ?
        GROUP BY
            u.id;


    `;

    const [[getUser]] = await pool.query(query_select, [id]);

    if (!getUser) {
      throw genError("No hay coincidencias en tu búsqueda", 404);
    }

    res.send({
      status: "Correcto",
      data: getUser,
    });
  } catch (error) {
    next(error);
  }
};

export default getUserController;
