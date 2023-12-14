import insertAnswer from "../../models/comments/insertAnswer.js";
import genError from "../../utils/helpers.js";

const answerCommentController = async (req, res, next) => {
  try {
    const { text } = req.body;
    const user_id = req.auth;
    const { id, comment_id } = req.params;

    if (!user_id) {
      throw genError("Debes registrarte para comentar experiencias", 401);
    }

    await insertAnswer({ text, comment_id, id, user_id });

    res.status(201).json({
      status: "Correcto",
      message: "Comentario publicado",
    });
  } catch (error) {
    next(error);
  }
};

export default answerCommentController;
