// Importaciones
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";
import { insertExperience } from "../../models/experiences/index.js";
import fileUpload from "express-fileupload";
import express from "express";
import { nanoid } from "nanoid";
import { HOST_DB, PORT } from "../../../env.js";

// Importamos e usamos el gestor de conexión a la DB
const pool = await getPool();

// Definimos express en una variable para su uso
const app = express();

// Middleware para poder subir archivos
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// Creamos una función para manejar la inserción de experiencias
const insertExperienceController = async (req, res, next) => {
  try {
    // Obtenemos los parámetros necesarios para realizar la inserción de una experiencia
    const { title, subTitle, place, text, category } = req.body;
    // Obtenemos la "id" del usuario loggeado
    const loggedUserId = req.auth;

    // Verificar si se cargó una imagen
    if (!req.files || !req.files.photo) {
      throw genError("Es obligatorio subir una foto", 400);
    }

    // Obtener la imagen
    const photo = req.files.photo;
    const photoN = photo.name;

    const photoFormat = photoN.split(".");

    // Guardar la imagen en la carpeta "uploads"
    const nombreArchivoFinal =
      nanoid() + "." + photoFormat[photoFormat.length - 1];
    photo.mv(`./uploads/experiences/${nombreArchivoFinal}`);

    // Establecer la ruta de la foto en caso de que se haya subido
    const photoPath = `http://${HOST_DB}:${PORT}/experiences/${nombreArchivoFinal}`;

    // Validar que el ID de la categoría existe antes de insertar la experiencia
    const categoryExistsQuery = `
      SELECT id FROM categories WHERE id = ?
    `;
    const [categoryResult] = await pool.query(categoryExistsQuery, [category]);

    if (!categoryResult.length) {
      throw genError("La categoría especificada no existe", 400);
    }

    // Llamamos a la función encargada de insertar los datos de la experiencia(Ver explicación en su respectivo lugar)
    await insertExperience({
      title,
      subTitle,
      place,
      text,
      photoPath,
      loggedUserId,
      category,
    });

    // Respuesta
    res.status(200).json({
      message: "Experiencia insertada con éxito!",
    });
  } catch (error) {
    const statusCode = error.httpStatus || 500;
    res.status(statusCode).json({
      status: "error",
      message: error.message || "Error del servidor",
    });
  }
};

// Exportaciones
export default insertExperienceController;
