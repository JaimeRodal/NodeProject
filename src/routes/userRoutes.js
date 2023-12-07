import express from "express";
import Auth from "../middlewares/auth.js";
import {
  registerController,
  loginController,
  deleteController,
} from "../controllers/users/index.js";

//Enrutador de express
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.delete("/delete/:id", Auth, deleteController);

export default router;
