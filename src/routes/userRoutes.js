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
import deleteUserSchema from "../controllers/schemas/users/deleteUser.js";

//Enrutador de express
const router = express.Router();

// Creamos las distintas rutas con sus métodos
router.post("/register", validation(registerSchema), registerController);
router.post("/login", validation(loginSchema), loginController);
router.delete(
  "/user/:id",
  validation(deleteUserSchema),
  Auth,
  deleteUserController
);
router.put("/user/:id", validation(modifyUserSchema), Auth, modifyController);

// Exportaciones
export default router;
