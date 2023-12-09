import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";
import insertExperience from "../../models/insertExperience.js";

const pool = await getPool();

const insertExperienceController = async (req, res) => {
  const { title, subtitle, place, text, photo, category_id } = req.body;

  // if (req.query.help) {
  //   res.send("ayuda");
  // } else {
  // Recuperamos el id del usuario logueado para insertar la experiencia vinculada a él
  const loggedUserId = req.auth;

  await insertExperience({
    title,
    subtitle,
    place,
    text,
    photo,
    loggedUserId,
    category_id,
  });
  // }
};

export default insertExperienceController;
