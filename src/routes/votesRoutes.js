// Importaciones
import express from "express";
import Auth from "../middlewares/auth.js";
import {
  votesController,
  getVotesController,
} from "../controllers/votes/index.js";

// Creamos el enrutador
const router = express.Router();

// RUTAS
router.post("/experience/:id/vote", Auth, votesController);
router.get("/experience/:id/vote", Auth, getVotesController);

// Exportaciones
export default router;
