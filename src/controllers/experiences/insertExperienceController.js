import genError from "../../utils/helpers.js";
import insertExperience from "../../models/insertExperience.js";
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
    const { title, subtitle, place, text, category } = req.body;
    const loggedUserId = req.auth;

    // Verificar si se cargó un archivo
    console.log(req.body);
    if (!req.files || !req.files.avatar) {
      throw genError("Es obligatorio subir una foto", 400);
    }

    // Obtener el archivo de la solicitud
    const avatar = req.files.avatar;

    // Guardar la imagen en la carpeta "uploads"
    const nombreArchivoFinal = Date.now() + "-" + avatar.name;
    avatar.mv(`./uploads/${nombreArchivoFinal}`);

    // Establecer la ruta de la foto en caso de que se haya subido
    const photoPath = `../../uploads/${nombreArchivoFinal}`;

    await insertExperience({
      title,
      subtitle,
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
    next(error);
  }
};

export default insertExperienceController;
