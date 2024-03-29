import express from "express";
import userRoutes from "./userRoutes.js";
import experiencesRoutes from "./experiencesRoutes.js";
import commentsRoutes from "./commentsRoutes.js";
import votesRoutes from "./votesRoutes.js";
import categoriesRoutes from "./categoriesRoutes.js";

// Creamos el enrutador
const router = express.Router();

// Creamos las rutas
router.use(userRoutes);
router.use(experiencesRoutes);
router.use(commentsRoutes);
router.use(votesRoutes);
router.use(categoriesRoutes);
export default router;
