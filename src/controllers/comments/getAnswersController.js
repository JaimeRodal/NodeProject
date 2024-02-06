import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

const pool = await getPool();

const getAnswersController = async (req, res, next) => {
  try {
    const { comment_id } = req.params;

    const query = `SELECT 
    u.name AS user_name,
    u.lastName AS user_lastName,
    u.photo AS user_photo,
    ans.text AS answer_text,
    ans.createdAt AS answer_created_at
FROM 
    answercomments ans
LEFT JOIN 
    users u ON u.id = ans.user_id
WHERE 
    ans.comment_id = ?;

     `;

    const [getAnswer] = await pool.query(query, [comment_id]);
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
