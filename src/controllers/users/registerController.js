import express from "express";
import fileUpload from "express-fileupload";
import bcrypt from "bcrypt";
import sendMailUtil from "../../utils/sendMail.js";
import genError from "../../utils/helpers.js";
import { insertUser, emailExist } from "../../models/users/registerUser.js";
const app = express();

// Middleware para poder subir archivos
app.use(
  fileUpload({
    createParentPath: true,
  })
);

const register = async (req, res, next) => {
  try {

    // Obtenemos los parámetros necesarios para el registro del body de la petición
    const { name, lastName, email, password } = req.body;

    // Verificar si se cargó un archivo
    let photoPath = null;
    if (req.files && req.files.avatar) {
      // Obtener el archivo de la solicitud
      const avatar = req.files.avatar;

      // Guardar la imagen en la carpeta "uploads"
      const nombreArchivoFinal = Date.now() + "-" + avatar.name;
      avatar.mv(`./uploads/${nombreArchivoFinal}`);

      // Establecer la ruta de la foto en caso de que se haya subido
      photoPath = `../../uploads/${nombreArchivoFinal}`;
    }
    // Verificar si el email ya está en uso
    const emailExists = await emailExist(email);

    // De existir un usuario con el mismo email, generar un error con mensaje
    if (emailExists) {
      throw genError("El email ya está en uso", 400);
    }

    // Hashear la contraseña
    const hashedPass = await bcrypt.hash(password, 5);

    // Insertar el nuevo usuario en la base de datos con la ruta de la imagen de perfil
    await insertUser({ name, lastName, email, hashedPass, photoPath });

    // Nodemailer para los que se registran
    const emailSubject = "Cuenta registrada";
    const emailBody = `<h1> ¡Bienvenid@ ${name}! 😄 Esperamos que encuentres lo que buscas y tengas una experiencia positiva 😎`;

    // Enviar el correo electrónico
    await sendMailUtil(email, emailSubject, emailBody);

    res.status(200).json({
      message: "Usuario creado con éxito!",
    });
  } catch (error) {
    next(error);
  }
};

export default register;
