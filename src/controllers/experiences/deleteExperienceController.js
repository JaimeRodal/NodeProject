// Importaciones
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

// Definimos el gestor de conexiones a la DB
const pool = await getPool();

// Creamos una función para borrar una experiencia tuya, previamente autorizado con TOKEN y en ella comprobamos si eres el dueño de la experiencia antes de poder borrarla
const deleteExperienceController = async (req, res, next) => {
  try {
    // Guardamos en una variable la id extraida de los parámetros de la request
    const { id } = req.params;

    // Guardamos en una variable la búsqueda del usuario que coincida con la id anteriormente proporcionada
    const [[getExp]] = await pool.query(
      `
        SELECT exp.title,exp.subTitle,exp.place,exp.text, exp.photo, cat.name, exp.user_id FROM experiences exp, categories cat WHERE exp.id = ?
    `,
      [id]
    );

    // En caso de no existir la experiencia, generamos mensaje de error
    if (!getExp) {
      throw genError(
        "No puedes borrar la experiencia de otro usuario o no existe",
        401
      );
    }

    // En caso de no coincidir la id del token de autorización y la id del usuario que creó la experiencia, generamos mensaje de error
    if (req.auth !== getExp.user_id) {
      throw genError("No puedes borrar la experiencia de otro usuario", 401);
    }
    // En caso de lo anteriormente comprobado estar correcto, borramos primero las respuestas que esten dentro de la experiencia y dentro de los comentarios con ese ID, además de los votos registrados (borrar en cascada por los FK)

    // Votos
    await pool.query(
      `
      DELETE FROM votes WHERE exp_id = ?
      `,
      [id]
    );

    // Respuestas de comentarios
    await pool.query(
      `
      DELETE FROM answerComments WHERE exp_id = ?
      `,
      [id]
    );

    // Luego borramos los comentarios de la experiencia con ese ID

    await pool.query(
      `
      DELETE FROM comments   WHERE exp_id = ?
      `,
      [id]
    );

    // Por ultimo borramos la experiencia
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
    // En caso de error pasamos el error al middleware de gestión de errores
    next(error);
  }
};

export default deleteExperienceController;
