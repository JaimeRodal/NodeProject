import express from "express";
import { Auth, validation } from "../middlewares/index.js";
import {
  registerController,
  loginController,
  deleteUserController,
  modifyController,
} from "../controllers/users/index.js";
import registerSchema from "../controllers/schemas/users/registerUser.js";
import loginSchema from "../controllers/schemas/users/loginUser.js";
import modifyUserSchema from "../controllers/schemas/users/modifyUser.js";

//Enrutador de express
const router = express.Router();

// Creamos las distintas rutas con sus métodos
router.post("/register", validation(registerSchema), registerController);
router.post("/login", validation(loginSchema), loginController);
// router.delete("/delete/:id", Auth, deleteController);
// router.put("/modify/:id", validation(modifyUserSchema), Auth, modifyController);
// // NOTA: Aquí no debería ser patch?

router.delete("/user/:id", Auth, deleteUserController);
router.put("/user/:id", validation(modifyUserSchema), Auth, modifyController);

export default router;
