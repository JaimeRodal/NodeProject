// Importaciones
import Joi from "joi";

// Crear el esquema para insertar el comentario como un objeto Joi
const answerSchema = Joi.object({
  // Definimos los parámetros que se validarán con las caracteríscticas que requiramos
  text: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿç\s'-]+$/u)
    .min(10)
    .max(120)
    .required(),
});
// Exportamos el Schema
export default answerSchema;
