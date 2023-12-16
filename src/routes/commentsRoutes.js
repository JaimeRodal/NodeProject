// Importaciones
import express from "express";
import Auth from "../middlewares/auth.js";
import validation from "../middlewares/joiValidation.js";
import {
  insertCommentController,
  answerCommentController,
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

// Exportaciones
export default router;
