import express from "express";
import {Auth, validation} from "../middlewares/auth.js";
import {
  insertExperienceController,
  getExpById,
  deleteExpController,
  helpExperienceController,
} from "../controllers/experiences/index.js";
import {
  votesController,
  votesOrderController,
} from "../controllers/votes/index.js";
import experienceSchema from "../controllers/schemas/experiences/insertExperience.js";

const router = express.Router();

router.get("/experienceHTML", helpExperienceController);
router.post("/experience", validation(experienceSchema), Auth, insertExperienceController);
router.get("/experience/:id", getExpById);
router.delete("/deleteExp/:id", Auth, deleteExpController);
router.post("/experience/:id/vote", Auth, votesController);
router.get("/experience/orderByVotes/:text", votesOrderController);

export default router;
