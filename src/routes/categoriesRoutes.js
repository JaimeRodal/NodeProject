import express from "express";
import { getCategoriesController } from "../controllers/categories/index.js";

const router = express.Router();

router.get("/categories", getCategoriesController);

export default router;
