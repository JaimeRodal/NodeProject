// Importaciones
import express from "express";
import fileUpload from "express-fileupload";
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

// Definimos una variable para el uso de express
const modifyApp = express();
// Definimos una variable para el gestor de conexiones con la DB
const pool = await getPool();

// Middleware para poder subir archivos
modifyApp.use(fileUpload({ createParentPath: true }));

// Función para modificar los datos
const modifyExpController = async (req, res, next) => {
  try {
    // Guardamos el id del usuario autenticado con el token en una constante
    const authUserId = req.auth;
    // Obtenemos la "id" de la experiencia que queremos modificar
    const { id } = req.params;
    // Buscamos en la DB la experiencia con la "id" de la solicitud
    const [[checkExp]] = await pool.query(
      `
    SELECT * FROM experiences WHERE id= ?`,
      [id]
    );

    // Si no se encuentra la experiencia, generamos un error
    if (!checkExp) {
      throw genError("La experiencia que intentas modificar no existe", 404);
    }

    // Comprobamos que tanto la "id" del usuario de la autentificación como la de la experiencia coinciden, de no hacerlo generamos un error
    if (String(authUserId) !== String(checkExp.user_id)) {
      throw genError("No tienes permisos para editar esta experiencia", 403);
    }

    // Guardamos la respuesta del body con los datos que nos interesa poder modificar
    const { title, subTitle, place, text } = req.body;

    // Verificamos si hay un archivo para actualizar la foto
    let photoPath = null;
    if (req.files && req.files.avatar) {
      const avatar = req.files.avatar;
      const finalFileName = Date.now() + "-" + avatar.name;
      avatar.mv(`./uploads/experiences/${finalFileName}`);
      photoPath = `../../uploads/experiences/${finalFileName}`;
    }

    // Aquí incluimos la consulta a la base de datos para actualizar los valores, donde más adelante añadimos valores a la Query según se modifiquen unos valores u otros
    let updateQuery = "UPDATE experiences SET";
    const values = [];

    // Titulo
    if (title) {
      updateQuery += " title=?,";
      values.push(title);
    }

    // Sub título
    if (subTitle) {
      updateQuery += " subTitle=?,";
      values.push(subTitle);
    }

    // Lugar
    if (place) {
      updateQuery += " place=?,";
      values.push(place);
    }

    // Texto
    if (text) {
      updateQuery += " text=?,";
      values.push(text);
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
    values.push(checkExp.id);

    // Ejecutamos la actualización
    await pool.query(updateQuery, values);

    // Respuesta
    res.status(200).json({
      message: "Experiencia modificada con éxito!",
    });
  } catch (error) {
    // En caso de error pasamos el error al middleware de gestión de errores
    next(error);
  }
};

// Exportaciones
export default modifyExpController;
