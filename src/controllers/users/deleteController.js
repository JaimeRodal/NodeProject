import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

const pool = await getPool();

const deleteController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [[user]] = await pool.query(
      `
    SELECT * FROM users WHERE id = ?
    `,
      [id]
    );
    if (req.auth !== user.id) {
      throw genError("No puedes borrar el perfíl de otro usuario", 401);
    }

    await pool.query(
      `
    DELETE FROM users WHERE id = ?
    `,
      [id]
    );

    res.send({
      status: "ok",
      message: `Usuario con id ${id} borrado con éxito!`,
    });
  } catch (error) {
    next(error);
  }
};

export default deleteController;
