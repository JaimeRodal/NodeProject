import express from "express";
import Auth from "../middlewares/auth.js";
import { insertExperience } from "../models/index.js";

const router = express.Router();

router.post("/experience", Auth, insertExperience);
