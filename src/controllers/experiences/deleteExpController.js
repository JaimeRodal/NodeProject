import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

const pool = await getPool();

const deleteExpController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [[getExp]] = await pool.query(
      `
        SELECT exp.title,exp.subTitle,exp.place,exp.text, exp.photo, cat.name, exp.user_id FROM experiences exp, categories cat WHERE exp.id = ?
    `,
      [id]
    );

    if (!getExp) {
      throw genError(
        "No puedes borrar la experiencia de otro usuario o no existe",
        401
      );
    }

    if (req.auth !== getExp.user_id) {
      throw genError("No puedes borrar la experiencia de otro usuario", 401);
    }

    await pool.query(
      `
      DELETE FROM experiences WHERE id = ?
      `,
      [id]
    );

    // Respuesta
    res.send({
      status: "Correcto",
      message: `Experiencia con id ${id} borrada con éxito!`,
    });
  } catch (error) {
    next(error);
  }
};

export default deleteExpController;
