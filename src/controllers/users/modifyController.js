// Importaciones
import express from "express";
import fileUpload from "express-fileupload";
import getPool from "../../db/getPool.js";
import bcrypt from "bcrypt";
import genError from "../../utils/helpers.js";

// Guardamos express en una variable para su uso
const modifyApp = express();
// Guardamos en una variable el gestor de conexiones a la DB para su uso
const pool = await getPool();

// Middleware para poder subir archivos
modifyApp.use(fileUpload({ createParentPath: true }));

// Función para modificar los datos
const modify = async (req, res, next) => {
  try {
    // Guardamos el id del usuario autenticado con el token en una constante
    const authUserId = req.auth;
    console.log(authUserId);

    // Guardamos el id del usuario del que quiere modificar los datos
    const modUser = req.params.id;
    console.log(modUser);

    // Comprobamos que los 2 ids coinciden, si no es así lanza un error
    if (String(authUserId) !== String(modUser)) {
      throw genError("No tienes permisos para editar este usuario", 403);
    }

    // Guardamos la respuesta del body con los datos que nos interesa poder modificar
    const { name, lastName, email, password } = req.body;

    // Verificamos si hay un archivo para actualizar la foto
    let photoPath = null;
    if (req.files && req.files.avatar) {
      const avatar = req.files.avatar;
      const finalFileName = Date.now() + "-" + avatar.name;
      avatar.mv(`./uploads/${finalFileName}`);
      photoPath = `../../uploads/${finalFileName}`;
    }

    // Hasheamos la contraseña si se proporciona
    let hashedPass = null;
    if (password) {
      hashedPass = await bcrypt.hash(password, 5);
    }

    // Aquí incluimos la consulta a la base de datos para actualizar los valores, dependiendo de los valores que le pongamos, se añadirá peticiones a la Query
    let updateQuery = "UPDATE users SET";
    const values = [];

    // Nombre
    if (name) {
      updateQuery += " name=?,";
      values.push(name);
    }

    // Apellido
    if (lastName) {
      updateQuery += " lastName=?,";
      values.push(lastName);
    }

    // Email
    if (email) {
      updateQuery += " email=?,";
      values.push(email);
    }

    // Contraseña (Hasheada)
    if (hashedPass) {
      updateQuery += " password=?,";
      values.push(hashedPass);
    }

    // Photo
    if (photoPath) {
      updateQuery += " photo=?,";
      values.push(photoPath);
    }

    // Eliminamos la coma del query de la última actualización que se haga
    updateQuery = updateQuery.slice(0, -1);

    // Agregamos la condición WHERE para el usuario específico
    updateQuery += " WHERE id=?";
    values.push(modUser);

    // Ejecutamos la actualización
    await pool.query(updateQuery, values);

    // Respuesta
    res.status(200).json({
      message: "Usuario modificado con éxito!",
    });
  } catch (error) {
    // En caso de error pasamos el error al middleware de gestión de errores
    next(error);
  }
};

// Exportaciones
export default modify;
