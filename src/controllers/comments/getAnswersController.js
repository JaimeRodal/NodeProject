import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

const pool = await getPool();

const getAnswersController = async (req, res, next) => {
  try {
    const { comment_id } = req.params;

    const query = `SELECT u.name, ans.text FROM answercomments ans LEFT JOIN users u ON u.id = ans.user_id WHERE comment_id = ? `;

    const [[getAnswer]] = await pool.query(query, [comment_id]);
    console.log(getAnswer);

    if (!getAnswer) {
      throw genError("No hay coincidencias en tu búsqueda", 404);
    }

    res.send({
      status: "Correcto",
      data: getAnswer,
    });
  } catch (error) {
    next(error);
  }
};

export default getAnswersController;
