import insertExperience from "../../models/insertExperience.js";
import fileUpload from "express-fileupload";
import express from "express";
import genError from "../../utils/helpers.js";

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

    // Hacemos que sea obligatorio subir una foto de tu experiencia
    if (!req.files || !req.files.photo) {
      throw genError("Es obligatorio subir una foto", 400);
    }

    // Obtener la foto
    const experiencePhoto = req.files.photo;
    const photoPath = `../../uploads/experiencePhotos/${Date.now()}-${
      experiencePhoto.name
    }`;
    experiencePhoto.mv(photoPath);

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
