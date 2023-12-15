import express from "express";
import { webController, filterController } from "../controllers/web/index.js";

// Creamos el enrutador
const router = express.Router();

// Creamos la ruta
router.get("/", webController);
router.get("/search/:text", filterController);

export default router;
