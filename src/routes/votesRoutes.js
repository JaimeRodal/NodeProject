import express from "express";
import Auth from "../middlewares/auth.js";
import {
  votesController,
  votesOrderController,
} from "../controllers/votes/index.js";

const router = express.Router();

router.post("/experience/:id/vote", Auth, votesController);
router.get("/experience/orderByVotes/:text", votesOrderController);

export default router;
