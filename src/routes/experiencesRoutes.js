import express from "express";
import Auth from "../middlewares/auth.js";
import validation from "../middlewares/joiValidation.js";
import {
  insertExperienceController,
  getExperienceController,
  deleteExperienceController,
  helpExperienceController,
  getExperiencesController,
  voteExperienceController,
} from "../controllers/experiences/index.js";
import experienceSchema from "../controllers/schemas/experiences/insertExperience.js";

const router = express.Router();

// Endpoint de inserción de nueva experiencia
router.post(
  "/experience",
  validation(experienceSchema),
  Auth,
  insertExperienceController
);

// Endpoint de obtención de experiencia por id
router.get("/experience/:id", getExperienceController);

// Endpoint de eliminación de experiencia por id
router.delete("/experience/:id", Auth, deleteExperienceController);

// Endpoint de voto de experiencia
router.post("/experience/:id/vote", Auth, voteExperienceController);

// Endpoint de listado de experiencias: búsqueda y listado por votos
router.get("/experiences", getExperiencesController);

// Endpoint de ayuda de experiencias
router.get("/experienceHTML", helpExperienceController);

// router.delete("/deleteExp/:id", Auth, deleteExpController);
// NOTA: para estandarizar la sintaxis

// router.get("/experience/orderByVotes/:text", votesOrderController);
// router.get("/search/:text", filterController);

export default router;
