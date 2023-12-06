import express from "express";
import userRoutes from "./userRoutes.js";

// Creamos el enrutador
const router = express.Router();

// Indicamos nuestras rutas
router.use(userRoutes);

export default router;
