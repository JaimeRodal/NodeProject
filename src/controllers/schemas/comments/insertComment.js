// Importaciones
import Joi from "joi";

// Crear el esquema para insertar el comentario como un objeto Joi
const commentSchema = Joi.object({
  // Definimos los parámetros que se validarán con las caracteríscticas que requiramos
  text: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿç\s'0-9,.:;!¡?¿()"`~*%#-_@]+$/u)
    .min(1)
    .max(120)
    .required(),
});
// Exportamos el Schema
export default commentSchema;
