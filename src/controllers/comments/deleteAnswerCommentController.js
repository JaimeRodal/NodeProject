// Importaciones
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

// Definimos el gestor de conexiones a la DB
const pool = await getPool();

// Creamos una función para borrar un comentario, siendo previamente autorizado por el middleware de autorización
const deleteAnswerCommentController = async (req, res, next) => {
  try {
    // Obtenemos el id parámetro de la petición
    const { id } = req.params;
    // Obtenemos el comentario que tenga esa id
    const [[answerComment]] = await pool.query(
      `
    SELECT * FROM answerComments WHERE id = ?
    `,
      [id]
    );

    // Comprobamos si el comentario autorizado y el que se va a borrar son los mismos
    if (!answerComment) {
      throw genError("El comentario no existe", 404);
    }

    if (req.auth !== answerComment.user_id) {
      throw genError("No puedes borrar el comentario de otro usuario", 401);
    }

    // Si la comprobación anterior es correcta, procedemos a borrar el comentario

    await pool.query(
      `
    DELETE FROM answerComments WHERE id = ?
    `,
      [id]
    );

    // Respuesta
    res.send({
      status: "Correcto",
      message: `La respuesta con id ${id} borrado con éxito!`,
    });
  } catch (error) {
    // En caso de error pasamos el error al middleware de gestión de errores
    next(error);
  }
};

// Exportamos la función
export default deleteAnswerCommentController;
