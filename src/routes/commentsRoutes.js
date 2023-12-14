import express from "express";
import {Auth, validation} from "../middlewares/auth.js";
import {
  insertCommentController,
  answerCommentController,
} from "../controllers/comments/index.js";
import commentSchema from "../controllers/schemas/comments/insertComment.js";
import answerSchema from "../controllers/schemas/comments/insertAnswer.js";

const router = express.Router();

router.post("/experience/:id/comment", validation(commentSchema), Auth, insertCommentController);
router.post(
  "/experience/:id/comment/:comment_id/answer", validation(answerSchema),
  Auth,
  answerCommentController
);

export default router;
