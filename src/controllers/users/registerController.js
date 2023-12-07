import express from "express";
import fileUpload from "express-fileupload";
import getPool from "../../db/getPool.js";
import bcrypt from "bcrypt";
import sendMailUtil from "../../utils/sendMail.js";
import genError from "../../utils/helpers.js";

const app = express();
const pool = await getPool();

// Middleware para poder subir archivos
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.post("/register", async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;

    // Verificar si se cargó un archivo
    if (!req.files || !req.files.avatar) {
      throw genError("Debes subir un archivo", 400);
    }

    // Obtener el archivo de la solicitud
    const avatar = req.files.avatar;

    // Verificar si el email ya está en uso
    const [[emailExists]] = await pool.query(
      `SELECT * FROM users WHERE email=?`,
      [email]
    );

    if (emailExists) {
      throw genError("El email ya está en uso", 400);
    }

    // Hashear la contraseña
    const hashedPass = await bcrypt.hash(password, 5);

    // Guardar la imagen en la carpeta "uploads"
    const nombreArchivoFinal = Date.now() + "-" + avatar.name;
    avatar.mv(`./uploads/${nombreArchivoFinal}`);

    // Insertar el nuevo usuario en la base de datos con la ruta de la imagen de perfil
    await pool.query(
      `INSERT INTO users (name, lastName, email, password, photo) VALUES (?, ?, ?, ?, ?)`,
      [name, lastName, email, hashedPass, `../../uploads/${nombreArchivoFinal}`]
    );

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
});

export default app;
