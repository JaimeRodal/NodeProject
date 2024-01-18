// Importaciones
import express from "express";
import Auth from "../middlewares/auth.js";
import validation from "../middlewares/joiValidation.js";
import {
  insertCommentController,
  answerCommentController,
  deleteCommentController,
  deleteAnswerCommentController,
  getAnswersController,
} from "../controllers/comments/index.js";
import commentSchema from "../controllers/schemas/comments/insertComment.js";
import answerSchema from "../controllers/schemas/comments/insertAnswer.js";

// Guardamos en una variable el gestor de rutas
const router = express.Router();

// RUTAS
router.post(
  "/experience/:id/comment",
  validation(commentSchema),
  Auth,
  insertCommentController
);
router.post(
  "/experience/:id/comment/:comment_id/answer",
  validation(answerSchema),
  Auth,
  answerCommentController
);

router.delete(
  "/experience/:id/comment/:comment_id",
  Auth,
  deleteCommentController
);

router.delete(
  "/experience/:id/comment/:comment_id/answerComment/answerComment_id",
  Auth,
  deleteAnswerCommentController
);

router.get("/comment/:comment_id/answer", getAnswersController);

// Exportaciones
export default router;
