import genError from "../../utils/helpers.js";
import insertExperience from "../../models/insertExperience.js";
import fileUpload from "express-fileupload";
import express from "express";
import { nanoid } from "nanoid";

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

    console.log(req.body);
    // Verificar si se cargó una imagen
    if (!req.files || !req.files.avatar) {
      throw {
        httpStatus: 400,
        message: "Es obligatorio subir una foto",
      };
    }

    // Obtener la imagen
    const avatar = req.files.avatar;
    const nombreAvatar = nanoid(15);
    // Guardar la imagen en la carpeta "uploads"
    const nombreArchivoFinal = Date.now() + "-" + nombreAvatar;
    avatar.mv(`../../uploads/${nombreArchivoFinal}`);

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
