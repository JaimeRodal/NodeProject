// Importaciones
import express from "express";
import Auth from "../middlewares/auth.js";
import validation from "../middlewares/joiValidation.js";
import {
  insertExperienceController,
  getExperienceController,
  deleteExperienceController,
  getExperiencesController,
  modifyExpController,
  voteExperienceController,
} from "../controllers/experiences/index.js";
import experienceSchema from "../controllers/schemas/experiences/insertExperience.js";
import idExperienceSchema from "../controllers/schemas/experiences/idExperience.js";

const router = express.Router();

// Endpoint de inserción de nueva experiencia
router.post(
  "/experience",
  validation(experienceSchema),
  Auth,
  insertExperienceController
);

// Endpoint de obtención de experiencia por id
router.get(
  "/experience/:id",
  validation(idExperienceSchema),
  getExperienceController
);

// Endpoint de eliminación de experiencia por id
router.delete(
  "/experience/:id",
  validation(idExperienceSchema),
  Auth,
  deleteExperienceController
);

// Endpoint de voto de experiencia
router.post(
  "/experience/:id/vote",
  validation(idExperienceSchema),
  Auth,
  voteExperienceController
);

// Endpoint de listado de experiencias: búsqueda y listado por votos
router.get(
  "/experiences",
  validation(idExperienceSchema),
  getExperiencesController
);

// Enpoint de modificación de Experiencias
router.put("/modExperience/:id", Auth, modifyExpController);

export default router;
