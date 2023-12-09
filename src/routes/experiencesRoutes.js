import express from "express";
import Auth from "../middlewares/auth.js";
import {
  insertExperienceController,
  getExpById,
  deleteExpController,
  helpExperienceController,
} from "../controllers/experiences/index.js";

const router = express.Router();

router.get("/experience", helpExperienceController);

router.post("/experience", Auth, insertExperienceController);
router.get("/experience/:id", getExpById);
router.delete("/deleteExp/:id", Auth, deleteExpController);

export default router;
