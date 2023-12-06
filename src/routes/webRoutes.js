import express from "express";
import webController from "../controllers/web/index.js";

// Creamos el enrutador
const router = express.Router();

router.get("/", webController);

export default router;
