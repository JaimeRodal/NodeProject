import Joi from "joi";

// Crear el esquema para insertar una experiencia como un objeto Joi
const experienceSchema = Joi.object({
  // Definimos los parámetros que se validarán con las caracteríscticas que requiramos
  title: Joi.string().alphanum().min(3).max(75).required(),

  subTitle: Joi.string().alphanum().min(3).max(50).required(),

  place: Joi.string().alphanum().min(3).max(50).required(),

  text: Joi.string().alphanum().min(20).max(250).required(),

  photoPath: [Joi.string()],

  category: Joi.number().integer().positive().required(),

  // Mirar qué datos son required y cuales no
});
// Exportamos el Schema
export default experienceSchema;
