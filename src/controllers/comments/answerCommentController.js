// Importaciones
import insertAnswer from "../../models/comments/insertAnswer.js";
import genError from "../../utils/helpers.js";

// Creamos una función para manejar la inserción de respuestas en los comentarios, donde obtenemos la id tanto de la experiencia como del comentario al que hace mención
const answerCommentController = async (req, res, next) => {
  try {
    // "text" -> el cuerpo del comentario(texto)
    const { text } = req.body;
    // "user_id" -> obtenemos la id del usuario logeado desde la autentificación
    const user_id = req.auth;
    // "id" -> Obtenemos la id de la experiencia
    // "comment_id" -> Obtenemos la id del comentario
    const { id, comment_id } = req.params;

    //  En caso de no estar registrado y querer comentar una experiencia, te muestra el siguiente mensaje de error
    if (!user_id) {
      throw genError("Debes registrarte para comentar experiencias", 401);
    }

    // Pasamos los parámetros anteriores a la función encargada de insertarlo (Ver descripción de la función en su respectivo archivo)
    await insertAnswer({ text, comment_id, id, user_id });

    // Respuesta
    res.status(201).json({
      status: "Correcto",
      message: "Comentario publicado",
    });
  } catch (error) {
    // En caso de error pasamos el error al middleware de gestión de errores
    next(error);
  }
};

// Exportaciones
export default answerCommentController;
