import express from "express";
import userRoutes from "./userRoutes.js";
import webRoutes from "./webRoutes.js";

// Creamos el enrutador
const router = express.Router();

// Creamos las rutas
router.use(userRoutes);
router.use(webRoutes);

export default router;
