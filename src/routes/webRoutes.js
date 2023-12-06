import express from "express";
import { webController } from "../controllers/web/index.js";

// Creamos el enrutador
const router = express.Router();

// Creamos la ruta
router.get("/", webController);

export default router;
