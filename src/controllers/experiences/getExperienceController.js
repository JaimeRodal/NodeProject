import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

const pool = await getPool();

const getExperienceController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [[getId]] = await pool.query(
      `
        SELECT exp.title,exp.subTitle,exp.place,exp.text, exp.photo, cat.name FROM experiences exp, categories cat WHERE exp.id = ?
  `,
      [id]
    );

    if (!getId) {
      throw genError("No hay coincidencias en tu búsqueda", 404);
    }

    res.send({
      status: "Correcto",
      data: getId,
    });
  } catch (error) {
    next(error);
  }
};

export default getExperienceController;
