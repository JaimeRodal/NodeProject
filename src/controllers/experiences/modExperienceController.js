import express from "express";
import fileUpload from "express-fileupload";
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

const modifyApp = express();
const pool = await getPool();

// Middleware para poder subir archivos
modifyApp.use(fileUpload({ createParentPath: true }));

// Función para modificar los datos
const modifyExpController = async (req, res, next) => {
  try {
    // Guardamos el id del usuario autenticado con el token en una constante
    const authUserId = req.auth;

    const { id } = req.params;
    const [[checkExp]] = await pool.query(
      `
    SELECT * FROM experiences WHERE id= ?`,
      [id]
    );

    // Comprobamos que los 2 ids coinciden, si no es así lanza un error
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

    // Aquí incluimos la consulta a la base de datos para actualizar los valores
    let updateQuery = "UPDATE experiences SET";
    const values = [];

    if (title) {
      updateQuery += " title=?,";
      values.push(title);
    }

    if (subTitle) {
      updateQuery += " subTitle=?,";
      values.push(subTitle);
    }

    if (place) {
      updateQuery += " place=?,";
      values.push(place);
    }

    if (text) {
      updateQuery += " text=?,";
      values.push(text);
    }

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

    res.status(200).json({
      message: "Experiencia modificada con éxito!",
    });
  } catch (error) {
    next(error);
  }
};

export default modifyExpController;
