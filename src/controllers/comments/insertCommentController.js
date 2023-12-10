import insertComment from "../../models/insertComments.js";
import genError from "../../utils/helpers.js";

const insertCommentController = async (req, res, next) => {
  try {
    console.log("Insert Comment Controller reached");
    const { text } = req.body;
    const exp_id = req.params.id;
    const user_id = req.auth;

    if (!user_id) {
      throw genError("Debes registrarte para comentar experiencias", 401);
    }
    const commentId = await insertComment({ text, exp_id, user_id });
    res.status(201).json({
      commentId,
      message: "Comentario publicado",
    });
  } catch (error) {
    next(error);
  }
};

export default insertCommentController;
