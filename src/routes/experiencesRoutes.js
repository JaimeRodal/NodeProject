import express from "express";
import Auth from "../middlewares/auth.js";
// import { insertExperience } from "../models/index.js";
import insertExperienceController from "../controllers/experiences/insertExperienceController.js";

const router = express.Router();

router.post("/experience", Auth, insertExperienceController);

export default router;
