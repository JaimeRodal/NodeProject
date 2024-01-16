// Importaciones
import express from "express";
import Auth from "../middlewares/auth.js";
import { votesController } from "../controllers/votes/index.js";

// Creamos el enrutador
const router = express.Router();

// RUTAS
router.post("/experience/:id/vote", Auth, votesController);

// Exportaciones
export default router;
