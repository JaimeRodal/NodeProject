import express from "express";
import userRoutes from "./userRoutes.js";
import webRoutes from "./webRoutes.js";
import experiencesRoutes from "./experiencesRoutes.js";
import commentsRoutes from "./commentsRoutes.js";
import votesRoutes from "./votesRoutes.js";

// Creamos el enrutador
const router = express.Router();

// Creamos las rutas
router.use(userRoutes);
router.use(webRoutes);
router.use(experiencesRoutes);
router.use(commentsRoutes);
router.use(votesRoutes);

export default router;
