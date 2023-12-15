// Importamos los distintos tipos de funciones y las exportamos desde un mismo archivo
import registerController from "./registerController.js";
import loginController from "./loginController.js";
import deleteController from "./deleteController.js";
import modifyController from "./modifyController.js";

export {
  registerController,
  loginController,
  deleteController,
  modifyController,
};
