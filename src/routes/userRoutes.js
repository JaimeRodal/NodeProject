import express from "express";
import Auth from "../middlewares/auth.js";
import {
  registerController,
  loginController,
  deleteController,
  modifyController,
} from "../controllers/users/index.js";

//Enrutador de express
const router = express.Router();

// Creamos las distintas rutas con sus métodos
router.post("/register", registerController);
router.post("/login", loginController);
router.delete("/delete/:id", Auth, deleteController);
router.put("/modify/:id", Auth, modifyController); // NOTA: Aquí no debería ser patch?

export default router;
