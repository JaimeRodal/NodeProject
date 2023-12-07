import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";
import insertExperience from "../../models/insertExperience.js";

const pool = await getPool();

const insertExperienceController = async (req, res) => {
  const { title, subtitle, place, text, photo } = req.body;
  const id = 1;
  const loggedUserId = 1;
  const category_id = 1;

  // console.log(title + subtitle + place + text);
  await insertExperience({
    id,
    title,
    subtitle,
    place,
    text,
    photo,
    loggedUserId,
    category_id,
  });
};

export default insertExperienceController;
