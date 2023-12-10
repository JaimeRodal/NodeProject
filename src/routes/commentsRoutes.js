import express from "express";
import Auth from "../middlewares/auth.js";
import {
  insertCommentController,
  asnwerCommentController,
} from "../controllers/comments/index.js";

const router = express.Router();

router.post("/experience/:id/comment", Auth, insertCommentController);
router.post(
  "/experience/:id/comment/:comment_id/asnwer",
  Auth,
  asnwerCommentController
);

export default router;
