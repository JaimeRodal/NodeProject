import genError from "../../utils/helpers.js";
import { insertExperience } from "../../models/index.js";
import fileUpload from "express-fileupload";
import express from "express";

const app = express();

// Middleware para poder subir archivos
app.use(
  fileUpload({
    createParentPath: true,
  })
);

const insertExperienceController = async (req, res, next) => {
  try {
    const { title, subTitle, place, text, category } = req.body;
    const loggedUserId = req.auth;

    // Verificar si se cargó una imagen
    if (!req.files || !req.files.photo) {
      throw genError("Es obligatorio subir una foto", 400);
    }

    // Obtener la imagen
    const photo = req.files.photo;

    // Guardar la imagen en la carpeta "uploads"
    const nombreArchivoFinal = Date.now() + "-" + photo.name;
    photo.mv(`../../uploads/${nombreArchivoFinal}`);

    // Establecer la ruta de la foto en caso de que se haya subido
    const photoPath = `../../uploads/${nombreArchivoFinal}`;

    await insertExperience({
      title,
      subTitle,
      place,
      text,
      photoPath,
      loggedUserId,
      category,
    });

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

export default insertExperienceController;
