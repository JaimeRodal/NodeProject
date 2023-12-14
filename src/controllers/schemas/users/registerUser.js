import Joi from "joi";

// Crear el esquema para el registro del usuario como un objeto Joi
const registerSchema = Joi.object({
  // Definimos los parámetros que se validarán con las caracteríscticas que requiramos
  name: Joi.string().alphanum().min(3).max(300).required(),

  lastName: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "es"] },
  }),

  password: Joi.string().required(),

  photoPath: [Joi.string()],
});
// Exportamos el Schema
export default registerSchema;
