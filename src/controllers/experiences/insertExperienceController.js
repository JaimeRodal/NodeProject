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

const insertExperienceController = async (req, res) => {
  try {
    const { title, subtitle, place, text, photo, category } = req.body;
    console.log(req.body);

    const loggedUserId = req.auth;

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
    // }
  } catch (error) {
    next(error);
  }
};

export default insertExperienceController;
