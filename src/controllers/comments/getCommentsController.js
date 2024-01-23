import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

const pool = await getPool();

const getCommentsController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = `SELECT u.name, com.text, com.exp_id
    FROM comments com
    LEFT JOIN users u ON u.id = com.user_id
    WHERE com.id = ?
     `;

    const [getComment] = await pool.query(query, [id]);
    // console.log(getComment);

    if (!getComment) {
      throw genError("No hay coincidencias en tu búsqueda", 404);
    }

    res.send({
      status: "Correcto",
      data: getComment,
    });
  } catch (error) {
    next(error);
  }
};

export default getCommentsController;
