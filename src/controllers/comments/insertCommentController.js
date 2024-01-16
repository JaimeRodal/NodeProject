// Importaciones
import insertComment from "../../models/comments/insertComments.js";
import genError from "../../utils/helpers.js";

// Creamos una función para manejar la inserción de comentarios en las experiencias, donde obtenemos tanto la id de la experiencia como la del usuario que lo realiza
const insertCommentController = async (req, res, next) => {
  try {
    // "text" -> el cuerpo del comentario(texto)
    const { text } = req.body;
    // "exp_id" -> la id de la experiencia donde se inserta el comentario
    const exp_id = req.params.id;
    // "user_id" -> obtenemos la id del usuario logeado desde la autentificación
    const user_id = req.auth;

    //  En caso de no estar registrado y querer comentar una experiencia, te muestra el siguiente mensaje de error
    if (!exp_id) {
      throw genError("No existe la experiencia en la que quieres comentar");
    }
    // Pasamos los parámetros anteriores a la función encargada de insertarlo (Ver descripción de la función en su respectivo archivo)
    await insertComment({ text, exp_id, user_id });

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

export default insertCommentController;
