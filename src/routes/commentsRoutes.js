import express from "express";
import Auth from "../middlewares/auth.js";
import { insertCommentController } from "../controllers/comments/index.js";

const router = express.Router();

router.post("/experience/:id/comment", Auth, insertCommentController);

export default router;
