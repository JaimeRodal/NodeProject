import Joi from "joi";

// Crear el esquema para verificar el id de una experiencia concreta como un objeto Joi
const idExperienceSchema = Joi.object({
  // Definimos los parámetros que se validarán con las caracteríscticas que requiramos
  id: Joi.number().integer().positive(),
});
// Exportamos el Schema
export default idExperienceSchema;
